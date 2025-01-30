import QuestionItem from './QuestionItem';
import QuestionDialog from './AddCommentDialog';
import { Question , Comment } from '../../lib/types';
import { useState } from 'react';
import { useComments } from '../../hooks/useComments';
import { useQuestions } from '../../hooks/useQuestions';
import { Box, CircularProgress, Grid2, Skeleton, Stack } from '@mui/material';
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
    return <Grid2  display={'flex'} alignItems={'center'} flexDirection="column" gap="1" width={'100%'}>
      <Box sx={{marginTop: 2}}>
      <Stack spacing={1}>
     {/* For other variants, adjust the size with `width` and `height` */}
     
     <Box display={'flex'} gap={2} alignItems={'center'}>
      <Skeleton variant="circular" width={50} height={50} />
      <Skeleton variant="text" width={80} height={20} />
      </Box>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="rounded" width={'80vw'} sx={{maxWidth: '750px'}} height={120} />
      <Box display={'flex'}  gap={1} alignItems={'center'}>
      <Skeleton variant='text' width={60}  height={45} sx={{borderRadius:'15px'}} /> 
      <Skeleton variant='text' width={60}  height={45} sx={{borderRadius:'15px'}} />
      <Skeleton variant='text' width={60}  height={45} sx={{borderRadius:'15px'}} />
      </Box>
      <Box display={'flex'} gap={2} alignItems={'center'}>
      <Skeleton variant="circular" width={50} height={50} />
      <Skeleton variant="text" width={80} height={20} />
      </Box>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="rounded" width={'80vw'} sx={{maxWidth: '750px'}} height={120} />
      <Skeleton variant="rounded" width={'80vw'} sx={{maxWidth: '750px'}} height={120} />
    </Stack></Box>
    </Grid2>;
  } else if (error) {
    return <div>Error loading questions</div>;
  }

  return (
    <Box
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