import QuestionItem from './QuestionItem';
import QuestionDialog from './AddCommentDialog';
import { Question , Comment } from '../../lib/types';
import { useState } from 'react';
import { useComments } from '../../hooks/useComments';
import { useQuestions } from '../../hooks/useQuestions';
import { Box } from '@mui/material';
interface Props {
  questions: Question[];
}

const QuestionsList = ({ questions }: Props) => {
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

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error loading questions</div>;
  }

  return (
    <Box
      width={'100%'}
      display="flex"
      flexDirection="column"
      alignItems="center"
      >
      {questions.map((question) => (
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