export type Account = {
  id: string;
  name: string;
  account_type: string;
  provider: string;
  initial_balance: number;
  current_balance: number;
  created_at: Date;
  updated_at: Date;
  user_id: string;
};
