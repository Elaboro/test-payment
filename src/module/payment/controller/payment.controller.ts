import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { BuyItemDto } from "../dto/buy-item.dto";
import { TopUpBalanceDto } from "../dto/top-up-balance.dto";
import { PaymentService } from "../service/payment.service";

@ApiTags("payment")
@Controller()
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
  ) {}

  @ApiOperation({ summary: 'Top Up user balance' })
  @Post("/payment/balance/top-up")
  async topUpbalance(@Body() topUpBalanceDto: TopUpBalanceDto) {
    return this.paymentService.topUpBalance(topUpBalanceDto);
  }

  @ApiOperation({ summary: 'Buy item by user' })
  @Post("/payment/buy-item")
  async buyItem(@Body() buyItemDto: BuyItemDto) {
    return this.paymentService.buyItem(buyItemDto);
  }
}
