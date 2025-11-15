
export type TransactionType = 'income' | 'expense' | 'transfer';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  date: string; // ISO format "YYYY-MM-DD"
  fromAccountId?: string;
  toAccountId?: string;
  categoryId: string;
  payee?: string;
  note?: string;
}

export interface Account {
  id: string;
  name: string;
  currency: string;
  balance: number;
  groupId: string;
  icon: string;
  color?: string;
  isDefault?: boolean;
  isPending?: boolean;
  includeInStatistics?: boolean;
}

export interface AccountGroup {
    id: string;
    name: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Icon component name as string
  groupId: string;
  color?: string;
}

export interface CategoryGroup {
    id: string;
    name: string;
}

export interface AiParsedTransaction {
  type: TransactionType;
  amount: number;
  currency?: string;
  date?: string;
  fromAccountName?: string;
  toAccountName?: string;
  categoryName?: string;
  payeeName?: string;
  note?: string;
}