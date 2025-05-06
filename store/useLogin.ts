import { Login } from '@/interfaces/login'
import { logIn } from '@/services/loginService'
import { create } from 'zustand'

type State = {
  loading: boolean
  success: boolean
  error: boolean
  login: (data: Login) => Promise<void>
}

export const useLogin = create<State>((set, get) => ({
  loading: false,
  success: false,
  error: false,

  login: async (data) => {
    try {
      set({ success: false, loading: true, error: false })
      await logIn(data)
      set({ success: true, loading: false })
    } catch (e) {
      // error
      set({ success: false, loading: false, error: true })
    }
  },
}))
