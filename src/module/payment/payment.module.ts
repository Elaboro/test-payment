import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentHistoryEntity } from './entity/payment-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentHistoryEntity,
    ])
  ],
  controllers: [],
  providers: [],
})
export class PaymentModule {}
