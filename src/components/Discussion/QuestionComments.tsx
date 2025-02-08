import {
  Alert,
  Box,
  Divider,
  Grid2,
  IconButton,

  Snackbar,
  Typography,
} from '@mui/material'
import {
  MessageCircleMore,
  MessageCirclePlus,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useComments } from '../../hooks/useComments'
import { Comment, Question } from '../../lib/types'
import AddCommentDialog from './AddCommentDialog'
import { CommentList } from './Comments/CommentList'



interface Props {
  question: Question
  defaultOpen?: boolean // optional prop
}

const QuestionComments = ({ question, defaultOpen }: Props) => {
  
  const [showComments, setShowComments] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const { comments, createComment } = useComments()
  const questionComments: Comment[] = Array.isArray(comments)
    ? comments.filter((comment) => comment.parentId === question.QuestionId)
    : []




  useEffect(() => {
    setShowComments(defaultOpen || false)
    
  }, [defaultOpen])
  const toggleComments = () => {
    setShowComments(!showComments)
  }

  const handleOpenDialog = (question: Question) => {
    setCurrentQuestion(question)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setCurrentQuestion(null)
  }

  const handleSubmitComment = async (newComment: { comment: Comment }) => {
    try {
      await createComment.mutateAsync({
        ...newComment.comment,
        parentId: currentQuestion?.QuestionId,
        ownerId: currentQuestion?.ownerId,
        userName: currentQuestion?.userName,
        profilePicture: currentQuestion?.profilePicture,
        createdOn: new Date().toISOString(),
      })
      handleCloseDialog()
    } catch (error) {
      console.error('Error submitting comment:', error)
      alert('Failed to submit comment. Please try again.')
    }
  }

  return (
    <Grid2
      mt="1"
      display={'flex'}
      flexDirection="column"
      gap="1"
      width={'100%'}
    >
      <Box gap={3} mt={2} display={'flex'} justifyContent={'end'}>
        <IconButton onClick={() => handleOpenDialog(question)}>
          <Box display={'flex'} justifyContent={'end'} gap={1}>
            <MessageCirclePlus size={20} />
            <Typography variant="subtitle2">Add Comment</Typography>
          </Box>
        </IconButton>

        {questionComments.length > 0 && (
          <>
            <Divider orientation="vertical" flexItem />
            <IconButton onClick={toggleComments}>
              <Box display={'flex'} gap={1}>
                {showComments && questionComments.length > 0 ? (
                  <IconButton
                    size="small"
                    type="button"
                    onClick={toggleComments}
                  >
                    <Typography variant="subtitle2">Close</Typography>
                  </IconButton>
                ) : (
                  <>
                    {' '}
                    <MessageCircleMore size={20} />
                    <Typography variant="subtitle2">
                      {' '}
                      {questionComments.length}{' '}
                    </Typography>
                    <Typography variant="subtitle2">comments</Typography>{' '}
                  </>
                )}
              </Box>
            </IconButton>
          </>
        )}
      
        {/* Comment list goes here */}
      </Box>
      {questionComments.length > 0 && showComments && (
          <CommentList question={question} defaultOpen={showComments}  showShareLink={false}/>
        
      )}
      
   

      {currentQuestion && (
        <AddCommentDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          currentQuestion={currentQuestion}
          isEditing={false}
          onSubmit={handleSubmitComment}
        />
      )}
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2000} 
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Grid2>
  )
}

export default QuestionComments