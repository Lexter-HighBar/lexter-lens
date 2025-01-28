import { useQuery } from '@tanstack/react-query'
import { Comment, UseCommentsParams } from '../lib/types'
import { useUserContext } from '../lib/hooks/UserContext';


export const useComments = (params: UseCommentsParams | null = {}) => {
  const { id } = params || {};
  const api = useUserContext()

  // Define the query function based on whether an ID is provided
  const { data, isLoading, error } = useQuery<Comment | Comment[]>({
    queryKey: id ? ['comment', id] : ['comments'], // Unique key for caching based on ID
    queryFn: () => {
      if (!api) {
        return Promise.reject(new Error('API is not available'))
      }

      if (id) {
        // Fetch a single comment if an ID is provided
        return api.get<Comment>(`/userdata/${id}`)
      } else {
        // Fetch all comments if no ID is provided
        return api.get<Comment[]>('/userdata')
      }
    },
  })

  return {
    comments: data || (id ? null : []), // Return null if a specific comment is not found
    loading: isLoading,
    error: error,
  }
}
