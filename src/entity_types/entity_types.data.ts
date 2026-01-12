export type AccountType =
  | 'CASH'
  | 'E_WALLET'
  | 'TRADITIONAL_BANK'
  | 'DIGITAL_BANK'
  | 'INVESTMENT'
  | 'CREDIT_CARD';

// can have nickname, and icon
export const ACCOUNT_CLASSES: {
  name: string;
  accent_color: string;
  type: AccountType;
}[] = [
  // --- Physical Cash ---
  { name: 'Cash on Hand', accent_color: '#10B981', type: 'CASH' },
  { name: 'Petty Cash', accent_color: '#64748B', type: 'CASH' },

  // --- Digital Wallets (E-Wallets) ---
  { name: 'GCash', accent_color: '#007DFF', type: 'E_WALLET' },
  { name: 'Maya Wallet', accent_color: '#1E1E1E', type: 'E_WALLET' },
  { name: 'GrabPay', accent_color: '#00B14F', type: 'E_WALLET' },
  { name: 'ShopeePay', accent_color: '#EE4D2D', type: 'E_WALLET' },

  // --- Traditional Banks (Philippines) ---
  { name: 'BDO', accent_color: '#003366', type: 'TRADITIONAL_BANK' },
  { name: 'BPI', accent_color: '#B10022', type: 'TRADITIONAL_BANK' },
  { name: 'Metrobank', accent_color: '#003087', type: 'TRADITIONAL_BANK' },
  { name: 'UnionBank', accent_color: '#FF5800', type: 'TRADITIONAL_BANK' },
  { name: 'Landbank', accent_color: '#2F7C31', type: 'TRADITIONAL_BANK' },
  { name: 'Security Bank', accent_color: '#007CC3', type: 'TRADITIONAL_BANK' },
  { name: 'RCBC', accent_color: '#004D99', type: 'TRADITIONAL_BANK' },
  { name: 'PNB', accent_color: '#9C7C36', type: 'TRADITIONAL_BANK' },
  { name: 'Chinabank', accent_color: '#BC202A', type: 'TRADITIONAL_BANK' },
  { name: 'EastWest', accent_color: '#76236C', type: 'TRADITIONAL_BANK' },

  // --- Digital Banks ---
  { name: 'SeaBank', accent_color: '#FF5300', type: 'DIGITAL_BANK' },
  { name: 'GoTyme', accent_color: '#6242FC', type: 'DIGITAL_BANK' },
  { name: 'CIMB', accent_color: '#EC1C24', type: 'DIGITAL_BANK' },
  { name: 'Tonik', accent_color: '#6F2C91', type: 'DIGITAL_BANK' },
  { name: 'Maya Bank', accent_color: '#000000', type: 'DIGITAL_BANK' },
  { name: 'Uno Digital Bank', accent_color: '#FF671F', type: 'DIGITAL_BANK' },
  { name: 'OwnBank', accent_color: '#F7931E', type: 'DIGITAL_BANK' },
  { name: 'Netbank', accent_color: '#00AEEF', type: 'DIGITAL_BANK' },

  // --- Investments / Trading ---
  { name: 'Pag-IBIG MP2', accent_color: '#00458C', type: 'INVESTMENT' },
  { name: 'SSS', accent_color: '#0055A5', type: 'INVESTMENT' },
  { name: 'Stocks (COL/PSE)', accent_color: '#22C55E', type: 'INVESTMENT' },
  { name: 'Crypto Wallet', accent_color: '#F7931A', type: 'INVESTMENT' },
  { name: 'GoTrade', accent_color: '#00D632', type: 'INVESTMENT' },
  { name: 'eToro', accent_color: '#66CC33', type: 'INVESTMENT' },
  { name: 'Interactive Brokers', accent_color: '#DA291C', type: 'INVESTMENT' },
  { name: 'DragonFi', accent_color: '#000000', type: 'INVESTMENT' },
  { name: 'Shari-Shari', accent_color: '#5D3FD3', type: 'INVESTMENT' },

  // --- Credit Cards ---
  { name: 'BDO Credit Card', accent_color: '#003366', type: 'CREDIT_CARD' },
  { name: 'BPI Credit Card', accent_color: '#B10022', type: 'CREDIT_CARD' },
  { name: 'Metrobank Card', accent_color: '#003087', type: 'CREDIT_CARD' },
  {
    name: 'Citibank (UnionBank)',
    accent_color: '#0054A6',
    type: 'CREDIT_CARD',
  },
  { name: 'HSBC', accent_color: '#DB0011', type: 'CREDIT_CARD' },
  { name: 'RCBC Bankard', accent_color: '#004D99', type: 'CREDIT_CARD' },
  { name: 'Security Bank Card', accent_color: '#007CC3', type: 'CREDIT_CARD' },
  {
    name: 'UnionBank Credit Card',
    accent_color: '#FF5800',
    type: 'CREDIT_CARD',
  },
  { name: 'PNB Credit Card', accent_color: '#9C7C36', type: 'CREDIT_CARD' },
  {
    name: 'EastWest Credit Card',
    accent_color: '#76236C',
    type: 'CREDIT_CARD',
  },
  { name: 'American Express', accent_color: '#267AC3', type: 'CREDIT_CARD' },
  { name: 'Atome', accent_color: '#FBF047', type: 'CREDIT_CARD' },
];

export const TRANSACTION_TYPES = [
  { name: 'EXPENSE' },
  { name: 'INCOME' },
  { name: 'SAVINGS' },
  { name: 'TRANSFER' },
  { name: 'INSTALLMENT' },
];

export const TRANSACTION_CATEGORIES = [
  // INCOME
  { name: 'Salary', type: 'INCOME' },
  { name: 'Freelance', type: 'INCOME' },
  { name: 'Dividends', type: 'INCOME' },
  { name: 'Refunds', type: 'INCOME' },

  // --- EXPENSE: Essential ---
  { name: 'Groceries', type: 'EXPENSE' },
  { name: 'Rent', type: 'EXPENSE' },
  { name: 'Utilities', type: 'EXPENSE' },
  { name: 'Healthcare', type: 'EXPENSE' },
  { name: 'Medicine & Pharmacy', type: 'EXPENSE' },

  // --- EXPENSE: Lifestyle & Entertainment ---
  { name: 'Dining Out', type: 'EXPENSE' },
  { name: 'Food Takeout', type: 'EXPENSE' },
  { name: 'Subscriptions', type: 'EXPENSE' },
  { name: 'Entertainment', type: 'EXPENSE' },
  { name: 'Shopping', type: 'EXPENSE' },
  { name: 'Gifts', type: 'EXPENSE' },
  { name: 'Travel', type: 'EXPENSE' },

  // --- EXPENSE: Financial ---
  { name: 'Bank Fees', type: 'EXPENSE' },
  { name: 'Taxes', type: 'EXPENSE' },

  // SAVINGS
  { name: 'Emergency Fund', type: 'SAVINGS' },
  { name: 'Vacation Fund', type: 'SAVINGS' },
  { name: 'Retirement', type: 'SAVINGS' },
  { name: 'Investments', type: 'SAVINGS' },

  // TRANSFER
  { name: 'Bank Transfer', type: 'TRANSFER' },
  { name: 'Peer-to-Peer', type: 'TRANSFER' },
  { name: 'Wallet Top-up', type: 'TRANSFER' },
  { name: 'Withdrawal', type: 'TRANSFER' },

  // INSTALLMENT
  { name: 'Vehicle Loan', type: 'INSTALLMENT' },
  { name: 'Mortgage', type: 'INSTALLMENT' },
  { name: 'Credit Card EMI', type: 'INSTALLMENT' },
  { name: 'Gadget', type: 'INSTALLMENT' },
];

export const CARD_NETWORKS = [
  { name: 'Visa' },
  { name: 'Mastercard' },
  { name: 'American Express' },
  { name: 'Discover' },
  { name: 'JCB' },
  { name: 'UnionPay' },
  { name: 'Diners Club' },
  { name: 'BancNet' },
];
