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
    queryFn: async () => {
      if (!api) {
        return Promise.reject(new Error('API is not available'));
      }
  
      let fetchedData: Question[] | Question;
      if (id) {
        // Fetch a single question by ID
        fetchedData = await api.get<Question>(`/questions/${id}`);
        return fetchedData;
      } else if (tag) {
        // Fetch questions filtered by tag
        fetchedData = await api.get<Question[]>(`/questions?tag=${tag}`);
        // Sort the questions by 'createdOn' in descending order
        return fetchedData.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
      } else {
        // Fetch all questions
        fetchedData = await api.get<Question[]>('/questions');
        // Sort the questions by 'createdOn' in descending order
        return fetchedData.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
      }
    },
  });
  // Create a new question
  type CreateQuestionVariables = Omit<Question, '_id'>;

  type CreateQuestionContext = unknown;

  const createQuestion = useMutation<Question, Error, CreateQuestionVariables, CreateQuestionContext>(
    {
      mutationFn: (newQuestion: CreateQuestionVariables) => {
        if (!api) {
          return Promise.reject(new Error('API is not available'));
        }
        console.log('newQuestion:', newQuestion);
        return api.post<Question, unknown>('/questions', newQuestion) ;
        
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
      return api.patch<Question, unknown>(`/questions/${updatedQuestion.QuestionId}`, updatedQuestion);
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
