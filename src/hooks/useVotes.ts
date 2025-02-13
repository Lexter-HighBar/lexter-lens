import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserdataApiContext } from '../lib/contexts/UserdataApiContext';
import { Vote } from '../lib/types';

export const useVotes = () => {
  const api = useContext(UserdataApiContext);
  const queryClient = useQueryClient();

  if (!api) {
    throw new Error('API is not available');
  }

  // Fetch votes for a question and owner
  const useVotes = (questionId: string, ownerId: string) => {
    return useQuery<Vote>({
      queryKey: ['votes', questionId, ownerId],
      queryFn: () => api.get<Vote>(`/votes/${questionId}/${ownerId}`),
    });
  };

  // Vote on a question (upvote or downvote)
  const voteOnQuestion = useMutation({
    mutationFn: (voteData: { questionId: string; ownerId: string; value: string }) =>
      api.post(`/votes/${voteData.questionId}/${voteData.ownerId}/${voteData.value}`, {
        // Provide the data to be sent in the request body
        value: voteData.value,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['votes', variables.questionId, variables.ownerId] });
    },
  });

  return {
    useVotes,
    voteOnQuestion,
  };
};
