export type Transaction = {
  id: string;
  datetime: Date;
  transaction_category: string;
  amount: number;
  note?: string;
  transaction_type: string;
  transaction_account?: string;
  receiving_account?: string;
  receiving_category?: string;
  saving_name?: string;
  fee?: number;
};
