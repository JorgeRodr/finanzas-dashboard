import { Transaction, TransactionCreationData, TransactionFirebaseData } from '@/interfaces/transaction'
import { User } from '@/interfaces/user'
import { registerUser } from '@/services/registerService'
import { addTransactionToFirestore, deleteTransactionFromFirestore, getTransactionsFromFirestore, updateTransactionOnFirestore } from '@/services/transactionsService'
import { create } from 'zustand'

type State = {
  loading: boolean
  success: boolean
  error: boolean
  addUser: (user: User) => Promise<void>
}

export const useRegister = create<State>((set, get) => ({
  loading: false,
  success: false,
  error: false,

  addUser: async (user) => {
    try {
      set({ success: false, loading: true, error: false })
      await registerUser(user);
      set({ success: true, loading: false })
    } catch (e) {
      // error
      set({ success: false, loading: false, error: true })
    }
  },
}))
