import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './controller/payment.controller';
import { PaymentHistoryEntity } from './entity/payment-history.entity';
import { PaymentRepository } from './repository/payment.repository';
import { PaymentService } from './service/payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentHistoryEntity,
    ])
  ],
  controllers: [
    PaymentController,
  ],
  providers: [
    PaymentService,
    PaymentRepository,
  ],
})
export class PaymentModule {}
