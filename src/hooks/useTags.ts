import { useQuery } from '@tanstack/react-query'
import { Tag, UseTagsParams } from '../lib/types'

import { useContext } from 'react';
import { UserdataApiContext } from '../lib/contexts/UserdataApiContext';


export const useTags = (params: UseTagsParams | null = {}) => {
  const { id } = params || {};
  const api = useContext(UserdataApiContext);

  // Define the query function based on whether an ID is provided
  const { data, isLoading, error } = useQuery<Tag | Tag[]>({
    queryKey: id ? ['tag', id] : ['tags'], // Unique key for caching based on ID
    queryFn: () => {
      if (!api) {
        return Promise.reject(new Error('API is not available'))
      }

      if (id) {
        // Fetch a single tag if an ID is provided
        return api.get<Tag>(`/tags/${id}`)
      } else {
        // Fetch all tags if no ID is provided
        return api.get<Tag[]>('/tags')
      }
    },
  })

  return {
    tags: data || (id ? null : []), // Return null if a specific tag is not found
    loading: isLoading,
    error: error,
  }
}
