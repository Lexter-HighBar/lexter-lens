import { useQueryClient } from '@tanstack/react-query'
import { Lawyer } from '../types'
import { keyBy } from 'lodash'
import { useApiContext } from './useApiContext'

export const useLawyers = () => {
  const api = useApiContext()
  const queryClient = useQueryClient()

  const query = queryClient.useQuery<Lawyer[]>({
    queryKey: ['lawyers'],
    queryFn: () => api.get('/lawyers'),
  })

  // other mutations that can be served through this hook
  const create = queryClient.useMutation({
    mutationKey: ['lawyers', 'create'],
    mutationFn: (lawyer: Lawyer) => api.post('/lawyers', lawyer),
  })

  // optional indexing for quick o1 lookups
  const index = keyBy(query.data, 'id')

  return { ...query, index, create }
}
