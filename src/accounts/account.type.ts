export interface Account {
  id: number;
  name: string;
  account_class_id: number;
  account_class_name: string;
  account_type_id: number;
  account_type_name: string;
  current_balance: number;
  interest_rate?: number | null;
  goal_amount?: number | null;
  network_id?: number | null;
  network_name?: string | null;
  credit_limit?: number | null;
  cash_advance_limit?: number | null;
  billing_date?: Date | null;
  due_date?: Date | null;
  start_date?: Date | null;
  end_date?: Date | null;
  user_id: number;
}
