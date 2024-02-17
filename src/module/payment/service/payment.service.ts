import { Injectable } from "@nestjs/common";
import { BuyItemDto } from "../dto/buy-item.dto";
import { TopUpBalanceDto } from "../dto/top-up-balance.dto";
import { PaymentRepository } from "../repository/payment.repository";

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async topUpBalance(topUpBalanceDto: TopUpBalanceDto) {
    return this.paymentRepository.addBalance(topUpBalanceDto);
  }

  buyItem(buyItemDto: BuyItemDto) {
    return this.paymentRepository.takeAwayBalance(buyItemDto);
  }
}
