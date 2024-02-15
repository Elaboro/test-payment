
export interface IPaymentHistory {
  payment_history_id: string;
  user_id: string;
  action: PaymentAction;
  amount: number;
  timestamp: Date;
}

export enum PaymentAction {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
};
