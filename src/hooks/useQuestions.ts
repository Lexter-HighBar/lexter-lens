import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserdataApiContext } from '../lib/contexts/UserdataApiContext';
import { useContext } from 'react';
import { Question } from '../lib/types';


export interface UseQuestionsParams {
  id?: string; // Optional ID to fetch a specific question
  tag?: string; // Optional tag to filter questions
}

// Custom hook to fetch questions
export const useQuestions = (params: UseQuestionsParams | null = {}) => {
  const { id, tag } = params || {};
  const queryClient = useQueryClient();
  const api = useContext(UserdataApiContext);

  // Fetch Questions
  const { data, isLoading, error } = useQuery<Question | Question[]>({
    queryKey: id ? ['question', id] : tag ? ['questions', tag] : ['questions'], // Dynamic key for caching
    queryFn: () => {
      if (!api) {
        return Promise.reject(new Error('API is not available'));
      }

      if (id) {
        // Fetch a single question by ID
        return api.get<Question>(`/questions/${id}`);
      } else if (tag) {
        // Fetch questions filtered by tag
        return api.get<Question[]>(`/questions?tag=${tag}`);
      } else {
        // Fetch all questions
        return api.get<Question[]>('/questions');
      }
    },
  });

  // Create a new question
  interface CreateQuestionVariables extends Omit<Question, '_id'> {}

  interface CreateQuestionContext {}

  const createQuestion = useMutation<Question, Error, CreateQuestionVariables, CreateQuestionContext>(
    {
      mutationFn: (newQuestion: CreateQuestionVariables) => {
        if (!api) {
          return Promise.reject(new Error('API is not available'));
        }
        console.log('newQuestion:', newQuestion);
        return api.post<Question>('/questions', newQuestion) ;
        
      },
      onSuccess: () => {
        // Refetch questions after creating a new one
        queryClient.invalidateQueries({ queryKey: ['questions'] });
      },
    }
  );

  // Update an existing question
  const updateQuestion = useMutation<Question, Error, Question>({
    mutationFn: (updatedQuestion: Question) => {
      if (!api) {
        return Promise.reject(new Error('API is not available'));
      }
      return api.patch<Question>(`/questions/${updatedQuestion.QuestionId}`, updatedQuestion);
    },
    onSuccess: (data) => {
      // Refetch specific question or all questions if necessary
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      queryClient.invalidateQueries({ queryKey: ['question', data.QuestionId] });
    },
  });

  // Delete a question
  const deleteQuestion = useMutation<void, Error, string>({
    mutationFn: (questionId: string) => {
      if (!api) {
        return Promise.reject(new Error('API is not available'));
      }
      return api.destroy(`/questions/${questionId}`);
    },
    onSuccess: () => {
      // Refetch questions after deleting
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });

  return {
    questions: data || (id ? null : []),
    loading: isLoading,
    error: error,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  };
};
