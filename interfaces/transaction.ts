export interface Transaction {
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
}

export interface TransactionFirebaseData extends Transaction {
  userId: string | null;
  id: string;
}

