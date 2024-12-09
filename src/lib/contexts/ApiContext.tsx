import { useAuth } from '@clerk/clerk-react'
import Axios from 'axios'
import { ReactNode, createContext } from 'react'

export const ApiContext = createContext<{
  get: <T, S = T>(url: string, search?: Partial<S>) => Promise<T>
  post: <T>(url: string, body?: any) => Promise<T>
  patch: <T>(url: string, body?: any) => Promise<T>
  destroy: <T>(url: string) => Promise<T>
} | null>(null)

type Props = {
  children: ReactNode
}

export const ApiContextProvider = ({ children }: Props) => {
  const { getToken } = useAuth()
  const axios = Axios.create()

  axios.defaults.baseURL = '/api'

  axios.interceptors.request.use(async (config) => {
    const token = await getToken()
    config.headers['Content-Type'] = 'application/json'
    if (token) config.headers.Authorization = token
    return config
  })

  async function get<T, S = T>(path: string, search?: Partial<S>) {
    const params = new URLSearchParams(
      search as Record<string, string>,
    ).toString()
    const url = `${path}${params ? `?${params}` : ''}`

    const res = await axios.get<T>(url)
    return res.data
  }

  async function post<T, E>(url: string, body: E) {
    const res = await axios.post<T>(url, body)
    return res.data
  }

  async function patch<T, E>(url: string, body: E) {
    const res = await axios.patch<T>(url, body)
    return res.data
  }

  async function destroy<T>(url: string) {
    const res = await axios.delete<T>(url)
    return res.data
  }

  return (
    <ApiContext.Provider value={{ get, post, patch, destroy }}>
      {children}
    </ApiContext.Provider>
  )
}
