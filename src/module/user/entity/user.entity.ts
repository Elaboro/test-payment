import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PaymentHistoryEntity } from "../../payment/entity/payment-history.entity";
import { IUser } from "../interface";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column({
    type: "numeric",
    default: 0,
  })
  balance: number = 0;

  @OneToMany(() => PaymentHistoryEntity, (item) => item.user)
  payment_history?: PaymentHistoryEntity[]
}
