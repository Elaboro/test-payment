import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";
import { IPaymentHistory, PaymentAction } from "../interface";

@Entity({ name: "payment_history" })
export class PaymentHistoryEntity extends BaseEntity implements IPaymentHistory {
  @PrimaryGeneratedColumn("uuid")
  payment_history_id: string;

  @Column({ type: "uuid" })
  user_id: string;

  @Column({
    type: "enum",
    enum: PaymentAction,
  })
  action: PaymentAction;

  @Column({
    type: "numeric",
  })
  amount: number;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => UserEntity, (user) => user.payment_history, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: UserEntity
}
