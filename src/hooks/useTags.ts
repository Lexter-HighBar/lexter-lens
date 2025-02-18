import { useQuery } from '@tanstack/react-query'
import { Tag } from '../lib/types'
import { useUserContext } from '../lib/hooks/UserContext'

export type UseTagsParams = {
  id?: string
}

export const useTags = (params: UseTagsParams | null = {}) => {
  const { id } = params || {}
  const api = useUserContext()

  const { data, isLoading, error } = useQuery<Tag | Tag[]>({
    queryKey: id ? ['tag', id] : ['tags'], // Unique key for caching based on ID
    queryFn: async () => {
      if (!api) {
        throw new Error('API is not available')
      }

      if (id) {
        // Fetch a single tag if an ID is provided
        return await api.get<Tag>(`/tags/${id}`)
      } else {
        // Fetch all tags if no ID is provided
        return await api.get<Tag[]>('/tags')
      }
    },
    enabled: !!api,
  })

  return {
    tags: Array.isArray(data) ? data : data ? [data] : [], // Always return an array
    loading: isLoading,
    error,
  }
}
