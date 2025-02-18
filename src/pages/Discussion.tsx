import { Page } from '../components/layout/Page'
import QuestionsList from '../components/Discussion/QuestionsList'
import { Question } from '../lib/types'
import { useQuestions } from '../hooks/useQuestions'
import CreateQuestion from '../components/Discussion/CreateQuestion'
import FilterComponent from '../components/Discussion/FilterComponent';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

// Discussion page component
export const Discussion = () => {
  // State to manage all questions
  const { questions } = useQuestions();
  const [filter, setFilter] = useState('new');

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <Page
      sx={{
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <Box>
        <CreateQuestion />
        {/* add filter dropdown */}
        <FilterComponent onFilterChange={handleFilterChange} />
      </Box>
      
      <QuestionsList questions={questions as Question[]} filter={filter} />
    </Page>
  );
};

export default Discussion;
