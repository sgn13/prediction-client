import { toast } from 'sonner'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { POST, GET } from '@/api/axiosConfig'
import { url } from '@/utils/url'

interface AuthParams {
  values: Record<string, any>
  enqueueSnackbar?: (
    message: string,
    options?: { variant: 'success' | 'error' }
  ) => void
  token?: string
}

interface ErrorObject {
  message?: string
  code?: number
  details?: string
}

interface AppStore {
  isLoading: boolean
  errMessage: ErrorObject | null
  user: any | null

  login: (params: AuthParams) => Promise<any>
  register: (params: AuthParams) => Promise<any>
  verify: (params: AuthParams) => Promise<any>
  verifyOtp: (params: AuthParams) => Promise<any>
  logout: () => void
  setError: (errMessage: ErrorObject | null) => void
}

const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      isLoading: false,
      user: null,
      errMessage: null,

      setError: (error) => {
        set({ errMessage: error, isLoading: false })
      },

      login: async ({ values, enqueueSnackbar }) => {
        try {
          set({ isLoading: true })

          const response: any = await POST({
            values,
            url: url?.login,
          })

          if (response?.data?.access) {
            // store tokens
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)

            // store user in zustand
            set({
              user: response.data.user,
              errMessage: null,
              isLoading: false,
            })

            enqueueSnackbar?.('Login successful!', {
              variant: 'success',
            })

            return response
          } else {
            throw new Error('Invalid login response')
          }
        } catch (error: any) {
          const message =
            error?.response?.data?.msg || error?.message || 'Login failed'

          set({
            errMessage: { message },
            isLoading: false,
          })
          throw error

          // enqueueSnackbar?.(message, { variant: "error" });
        }
      },

      register: async ({ values }) => {
        try {
          set({ isLoading: true })

          const response = await POST({
            values,
            url: url?.register,
          })

          set({ isLoading: false })
          if (response) {
            toast.success(response.msg)
          }
          return response
        } catch (error: any) {
          const message =
            error?.response?.data?.msg || error?.message || 'Signup  failed'
          toast.error(message)

          set({
            errMessage: { message },
            isLoading: false,
          })
        }
      },

      verify: async ({ token }) => {
        try {
          set({ isLoading: true })

          const response = await GET({
            url: `${url?.verify}/${token}`,
          })

          set({ isLoading: false })
          return response
        } catch (error: any) {
          set({
            errMessage: { message: error?.message || 'Verification failed' },
            isLoading: false,
          })
        }
      },

      verifyOtp: async ({ values }) => {
        try {
          set({ isLoading: true })

          const response = await POST({
            values,
            url: url?.verifyOtp,
          })

            if (response) {
              set({ isLoading: false })
            toast.success(response.msg)
          }

          return response
        } catch (error: any) {
         const message =
            error?.response?.data?.msg || error?.message || 'Verification  failed'
          toast.error(message)

          set({
            errMessage: { message },
            isLoading: false,
          })
        }
      },

      logout: () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')

        set({
          user: null,
          errMessage: null,
        })
      },
    }),
    {
      name: 'auth-storage', // 👈 localStorage key
      partialize: (state) => ({
        user: state.user, // only persist user
      }),
    }
  )
)

export default useAppStore
