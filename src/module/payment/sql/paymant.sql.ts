import { EntityManager } from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";

type CalculateBalanceByUserIdQueryParam = [UserEntity["user_id"]];

interface ItemQueryResult {
  user_id: string,
  balance: number,
}

export const calculateBalanceByUserId = async (
  entityManager: EntityManager,
  param: CalculateBalanceByUserIdQueryParam
): Promise<ItemQueryResult[]> => {
  const sql = `
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
  `;

  return await entityManager.query(sql, param);
};
