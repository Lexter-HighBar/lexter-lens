import QuestionItem from './QuestionItem';
import QuestionDialog from './AddCommentDialog';
import { Question, Comment } from '../../lib/types';
import { useState } from 'react';
import { useComments } from '../../hooks/useComments';
import { useQuestions } from '../../hooks/useQuestions';
import { Box } from '@mui/material';
import { LoadingSkelton } from './LoadingSkelton';

interface Props {
  questions: Question[];
  filter: string;
}

const QuestionsList = ({ questions, filter }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const { createComment } = useComments();
  const { loading, error } = useQuestions();

  const handleOpenDialog = (question: Question) => {
    setCurrentQuestion(question);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentQuestion(null);
  };

  const handleSubmitComment = (updateComment: { comment: Comment }) => {
    if (!currentQuestion) {
      return;
    }

    createComment.mutate({ _id: currentQuestion?.QuestionId, ...updateComment });
    console.log('Submitted comment:', updateComment);
  };

  // Sorting based on the selected filter
  const sortedQuestions = [...questions].sort((a, b) => {
    if (filter === 'new') {
      return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
    } else if (filter === 'trending') {
      return (b.likes || 0) - (a.likes || 0);
    }
    return 0;
  });

  if (loading) {
    return <LoadingSkelton />;
  } else if (error) {
    return <Box p={6}>Error loading questions</Box>;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {sortedQuestions.map((question) => (
        <QuestionItem
          key={question.QuestionId}
          question={question}
          onAddComment={() => handleOpenDialog(question)}
        />
      ))}
      {currentQuestion && (
        <QuestionDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          currentQuestion={currentQuestion}
          isEditing={false}
          onSubmit={handleSubmitComment}
        />
      )}
    </Box>
  );
};

export default QuestionsList;
