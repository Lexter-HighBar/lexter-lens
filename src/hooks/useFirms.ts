import { useQuery } from '@tanstack/react-query'
import { Firm } from '../lib/types'
import { useUserContext } from '../lib/hooks/UserContext'
import { AxiosError } from 'axios'

export type UseFirmsParams = {
  id?: string
}

export const useCities = (params?: UseFirmsParams) => {
  const { id } = params || {}
  const api = useUserContext()

  const { data, isLoading, error } = useQuery<Firm[] | Firm, AxiosError>({
    queryKey: id ? ['firm', id] : ['firms'],
    queryFn: async () => {
      if (!api) {
        throw new Error('API is not available')
      }

        return api.get<Firm>('/firms')
    },
    enabled: !!api,
  })

  return {
    cities: Array.isArray(data) ? data : data ? [data] : [], // ✅ Always return an array
    loading: isLoading,
    error,
  }
}