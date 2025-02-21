import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Comment } from '../lib/types';
import { useContext } from 'react';
import { UserdataApiContext } from '../lib/contexts/UserdataApiContext';

export type UseCommentsParams = {
  id?: string
}

export const useComments = (params: UseCommentsParams | null = {}) => {
  const { id } = params || {};
  const api = useContext(UserdataApiContext);
  const queryClient = useQueryClient();

  if (!api) {
    throw new Error('UserdataApiContext is not available.');
  }

  const { get, post, patch, destroy } = api;

  // Fetch comments (single or all)
  const { data, isLoading, error } = useQuery<Comment | Comment[]>({
    queryKey: id ? ['comment', id] : ['comments'], // Unique key for caching based on ID
    queryFn: async () => {
      let fetchedData;
      if (id) {
        // Fetch a single comment if an ID is provided
        fetchedData = await get<Comment>(`/comments/${id}`);
        return fetchedData;
      } else {
        // Fetch all comments if no ID is provided
        fetchedData = await get<Comment[]>('/comments');
        // Sort the comments by 'createdOn' in descending order
        return fetchedData.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
      }
    },
  });
  
  // Add a comment (POST)
  const createComment = useMutation({
    mutationFn: (newComment: Partial<Comment>) => post<Comment, unknown>('/comments', newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] }); // Refresh comments list
    },
  });

  // Update a comment (PATCH)
  const updateComment = useMutation({
    mutationFn: (updatedComment: { id: string; data: Partial<Comment> }) => {
      const { id, data } = updatedComment;
      return patch<Comment, unknown>(`/comments/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] }); // Refresh comments list
    },
  });

  // Delete a comment (DELETE)
  const deleteComment = useMutation({
    mutationFn: (commentId: string) => destroy<Comment>(`/comments/${commentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] }); // Refresh comments list
    },
  });

  return {
    comments: data || (id ? null : []), // Return null if a specific comment is not found
    loading: isLoading,
    error: error,
    createComment, // Add this to use POST functionality
    updateComment, // Add this to use PATCH functionality
    deleteComment, // Add this to use DELETE functionality
  };
};
