export interface Transaction {
  id: number;
  transaction_no: string;
  total_amount: number;
  active: boolean;
  user_id: number;
  createdAt: string;
  updatedAt: string;
}

export type TransactionStatus = true | false;
