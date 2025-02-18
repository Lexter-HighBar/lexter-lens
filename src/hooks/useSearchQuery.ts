import { useState, useEffect, useCallback, useContext } from 'react';
import { UserdataApiContext } from '../lib/contexts/UserdataApiContext';
import { Question } from '../lib/types';

type SearchParams = {
  q?: string;
  tags?: string;
  searchIn?: string;
};

export const useSearchQuery = (initialParams?: SearchParams) => {
  const context = useContext(UserdataApiContext);
  if (!context) {
    throw new Error('UserdataApiContext is not provided');
  }
  const { get } = context;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<SearchParams>(initialParams || {});

  // Update params and merge with existing ones
  const updateParams = (newParams: Partial<SearchParams>) => {
    setParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  // Construct query string based on available params
 

  const search = useCallback(async () => {
    setLoading(true);
    setError(null);
    setQuestions([]); // Reset questions before a new search
    const buildQueryString = () => {
        const queryParts: string[] = [];
    
        if (params.q) {
          queryParts.push(`q=${params.q}`);
        }
        if (params.tags) {
          queryParts.push(`tags=${encodeURIComponent(params.tags)}`);
        }
        if (params.searchIn) {
          const searchInArray = params.searchIn.split(',').map((item) => item.trim());
          const validOptions = ['questions', 'comments'];
          const filteredOptions = searchInArray.filter((option) => validOptions.includes(option));
          if (filteredOptions.length > 0) {
            queryParts.push(`searchIn=${filteredOptions.join(',')}`);
          }
        }
    
        return queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
      };
    try {
      const queryString = buildQueryString();
      const response = await get(`/search${queryString}`);
      const data = response as { questions: Question[] };

      // Safely handle questions from the response
      setQuestions(data.questions || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
}, [get, params.q, params.searchIn, params.tags]);
  useEffect(() => {
    if (Object.keys(params).length > 0) {
      search();
    }
  }, [params, search]);

  return {
    questions,
    loading,
    error,
    setParams: updateParams, // Use updateParams to merge new parameters
    search,
  };
};
