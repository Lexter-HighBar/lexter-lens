import { useQuery } from '@tanstack/react-query'
import { useApiContext } from '../lib/hooks/useApiContext'
import { Lawyer, PaginatedResponse, PaginationParams } from '../lib/types'

export const useLawyers = (params: PaginationParams) => {
  const api = useApiContext()

  const query = useQuery<PaginatedResponse<Lawyer>>({
    queryKey: ['lawyers', params],
    queryFn: () => api.get('/lawyers', params),
  })

  return query
}
