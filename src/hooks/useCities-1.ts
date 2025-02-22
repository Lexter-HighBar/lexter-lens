import { useQuery } from '@tanstack/react-query'
import { City } from '../lib/types'
import { useUserContext } from '../lib/hooks/UserContext'
import { AxiosError } from 'axios'

export type UseCitiesParams = {
  id?: string
}

export const useCities = (params?: UseCitiesParams) => {
  const { id } = params || {}
  const api = useUserContext()

  const { data, isLoading, error } = useQuery<City[] | City, AxiosError>({
    queryKey: id ? ['city', id] : ['cities'],
    queryFn: async () => {
      if (!api) {
        throw new Error('API is not available')
      }

        return api.get<City>('/cities')
    },
    enabled: !!api,
  })

  return {
    cities: Array.isArray(data) ? data : data ? [data] : [], // ✅ Always return an array
    loading: isLoading,
    error,
  }
}