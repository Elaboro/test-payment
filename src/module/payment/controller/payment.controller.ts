import { Body, Injectable } from "@nestjs/common";
import { BuyItemDto } from "../dto/buy-item.dto";
import { TopUpBalanceDto } from "../dto/top-up-balance.dto";
import { PaymentService } from "../service/payment.service";

@Injectable()
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
  ) {}

  async topUpbalance(@Body() topUpBalanceDto: TopUpBalanceDto) {
    return this.paymentService.topUpBalance(topUpBalanceDto);
  }

  async buyItem(@Body() buyItemDto: BuyItemDto) {
    return this.paymentService.buyItem(buyItemDto);
  }
}
