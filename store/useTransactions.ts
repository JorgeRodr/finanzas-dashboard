import { Transaction, TransactionFirebaseData } from '@/interfaces/transaction'
import { addTransactionToFirestore, deleteTransactionFromFirestore, getTransactionsFromFirestore, updateTransactionOnFirestore } from '@/services/transactionsService'
import { AxiosResponse } from 'axios'
import { create } from 'zustand'

type State = {
  transactions: any[]
  loading: boolean
  success: boolean
  error: boolean
  fetchTransactions: () => void
  addTransaction: (transaction: Transaction) => Promise<void>
  updateTransaction: (transaction: TransactionFirebaseData) => Promise<void>
  deleteTransaction: (id: TransactionFirebaseData['id']) => Promise<void>
}

export const useTransactions = create<State>((set, get) => ({
  transactions: [],
  loading: false,
  success: false,
  error: false,

  fetchTransactions: async () => {
    try {
      set({ loading: true })
      const transactions: AxiosResponse<TransactionFirebaseData[]> = await getTransactionsFromFirestore();
      set({ transactions: transactions.data, loading: false })
    } catch(e) {
      // error
    }
  },

  addTransaction: async (transaction) => {
    try {
      const doc: any = await addTransactionToFirestore(transaction);
      set((state: State) => ({
        transactions: [...state.transactions, {id: doc.id, ...transaction}],
        success: true,
      }))
    } catch(e) {
      set({error: true})
    }
  },
  updateTransaction: async (transaction) => {
    await updateTransactionOnFirestore(transaction)
  },
  deleteTransaction: async (id) => {
    await deleteTransactionFromFirestore(id);
  }
}))
