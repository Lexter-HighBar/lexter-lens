import { useQuery } from '@tanstack/react-query';
import { useUserContext } from '../lib/hooks/UserContext';

// Define types for Questions
export interface Question {
  _id: string;
  title: string;
  content: string;
  tags: string[];
}

export interface UseQuestionsParams {
  id?: string; // Optional ID to fetch a specific question
  tag?: string; // Optional tag to filter questions
}

export const useQuestions = (params: UseQuestionsParams | null = {}) => {
  const { id, tag } = params || {};
  const api = useUserContext();

  // Define the query function based on whether an ID or tag is provided
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

  return {
    questions: data || (id ? null : []),
    loading: isLoading,
    error: error,
  };
};
