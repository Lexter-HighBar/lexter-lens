import QuestionItem from './QuestionItem';
import { Question } from '../../lib/types';
import { Box } from '@mui/material';

interface Props {
  questions: Question[];
  filter: string; // Added filter prop
}

const QuestionsList = ({ questions, filter }: Props) => {
  // Sort and filter questions on the frontend
  const sortedQuestions = [...questions].sort((a, b) => {
    if (filter === 'new') {
      return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
    }
    if (filter === 'relevant') {
      return b.tags.length - a.tags.length; // Sort by tag count
    }
    if (filter === 'trending') {
      return Math.random() - 0.5; // Placeholder for trending logic
    }
    return 0;
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {sortedQuestions.map((question) => (
        <QuestionItem key={question.QuestionId} question={question} />
      ))}
    </Box>
  );
};

export default QuestionsList;

