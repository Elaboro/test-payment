import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";
import { BuyItemDto } from "../dto/buy-item.dto";
import { TopUpBalanceDto } from "../dto/top-up-balance.dto";
import { PaymentHistoryEntity } from "../entity/payment-history.entity";
import { PaymentAction } from "../interface";

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(PaymentHistoryEntity)
    private readonly paymentHistoryRepository: Repository<PaymentHistoryEntity>
  ) {}

  async addBalance({user_id, amount}: TopUpBalanceDto) {
    await this.paymentHistoryRepository.manager.transaction(
      async (transactionManager) => {
        const qb_user = transactionManager.createQueryBuilder().from(UserEntity, "t");
        qb_user.setLock("pessimistic_write");
        qb_user.where("t.user_id = :user_id", { user_id: user_id });
        const user = await qb_user.getRawOne<UserEntity>();

        if(!user) {
          throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }

        const payment_history = new PaymentHistoryEntity();
        payment_history.action = PaymentAction.INCOME;
        payment_history.amount = amount;
        payment_history.user_id = user_id;
        await transactionManager.save(PaymentHistoryEntity, payment_history);

        const qb_payment_history = transactionManager.createQueryBuilder().from(PaymentHistoryEntity, "t");
        qb_payment_history.setLock("pessimistic_read");
        qb_payment_history.where("t.user_id = :user_id", { user_id });

        const [{ balance }] = await transactionManager.query<{
          user_id: string,
          balance: number,
        }[]>(`
          select
            user_id,
            SUM(
              case 
                when "action" = 'INCOME' then amount
                when "action" = 'EXPENSE' then -amount 
              end
            ) as balance
          from public.payment_history ph
          where ph.user_id = $1
          group by user_id
        `, [user_id]);

        user.balance = balance;

        await transactionManager.save(UserEntity, user);
      }
    );

    return;
  }

  async takeAwayBalance({ user_id, amount }: BuyItemDto) {
    await this.paymentHistoryRepository.manager.transaction(
      async (transactionManager) => {
        const qb_user = transactionManager.createQueryBuilder().from(UserEntity, "t");
        qb_user.setLock("pessimistic_write");
        qb_user.where("t.user_id = :user_id", { user_id });
        const user = await qb_user.getRawOne<UserEntity>();

        if(!user) {
          throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }

        const { balance: old_balance } = user;
        const new_balance = old_balance - amount;
        const isNegativeBalance = new_balance < 0 ? true : false;
        
        if(isNegativeBalance) {
          throw new HttpException("Insufficient funds", HttpStatus.BAD_REQUEST);
        }

        const payment_history = new PaymentHistoryEntity();
        payment_history.action = PaymentAction.EXPENSE;
        payment_history.amount = amount;
        payment_history.user_id = user_id;
        await transactionManager.save(PaymentHistoryEntity, payment_history);

        const [{ balance }] = await transactionManager.query<{
          user_id: string,
          balance: number,
        }[]>(`
          select
            user_id,
            SUM(
              case 
                when "action" = 'INCOME' then amount
                when "action" = 'EXPENSE' then -amount 
              end
            ) as balance
          from public.payment_history ph
          where ph.user_id = $1
          group by user_id
        `, [user_id]);

        user.balance = balance;

        await transactionManager.save(UserEntity, user);
      }
    );

    return;
  }
}
