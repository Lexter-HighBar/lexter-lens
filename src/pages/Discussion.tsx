import { Page } from '../components/layout/Page';
import QuestionsList from '../components/Discussion/QuestionsList';
import { Question } from '../lib/types';
import { useQuestions } from '../hooks/useQuestions';
import CreateQuestion from '../components/Discussion/CreateQuestion';
import { useState } from 'react';

// Discussion page component
export const Discussion = () => {
  // Fetch all questions
  const { questions } = useQuestions();
  
  // Manage selected filter state
  const [filter, setFilter] = useState('new');

  // Handle filter change from the dropdown menu
 

  return (
    <Page sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
      
        <CreateQuestion setFilter={setFilter} />
        {/* Filter dropdown component */}
    

      {/* Pass filter state to the questions list */}
      <QuestionsList questions={questions as Question[]} filter={filter} />
    </Page>
  );
};

export default Discussion;

