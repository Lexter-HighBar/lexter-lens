import { Box, Grid2, Link, Typography } from '@mui/material'
import AddCommentIcon from '@mui/icons-material/AddComment'
import { useState } from 'react'
import { useComments } from '../../hooks/useComments'
import { Comment, Question } from '../../lib/types'
import AddCommentDialog from './AddCommentDialog'

interface Props {
  question: Question
}

const CommentList = ({ question }: Props) => {
  const [showComments, setShowComments] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const { comments, createComment } = useComments()

  const questionComments: Comment[] = Array.isArray(comments)
    ? comments.filter((comment) => comment.parentId === question.QuestionId)
    : []

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
    <Grid2 mt="1" display={'flex'} flexDirection="column" gap="1" width={'100%'}>
      <Box gap={3} mt={2} display={'flex'} justifyContent={'end'}>
        <Link
          underline="hover"
          alignContent="end"
          onClick={() => handleOpenDialog(question)}
        >
          <Box display={'flex'} gap={1}>
            <AddCommentIcon /> <Typography> Add comment</Typography>
          </Box>
        </Link>
        <Link underline="hover" onClick={toggleComments}>
          {showComments ? 'Hide' : 'Show all comments'} (
          {questionComments.length})
        </Link>
      </Box>
      {showComments && (
        <Box mt={2} display={'flex'} flexDirection="column" gap={1}>
          {questionComments.map((comment) => (
            <Box
              sx={{ backgroundColor: 'grey.100' }}
              key={comment._id}
              mt={2}
              p={2}
              border={1}
              borderRadius={2}
              borderColor={'grey.300'}
            >
              <Typography variant="body1">{comment.userName}</Typography>
              <Typography variant="body1">{comment.content}</Typography>
              <Typography variant="body2">{comment.createdOn}</Typography>
            </Box>
          ))}
          <Link
            underline="hover"
            alignContent="end"
            onClick={() => handleOpenDialog(question)}
          ></Link>
          <Link underline="hover" alignContent="end" onClick={toggleComments}>
            {showComments ? 'Hide' : 'Show all comments'} (
            {questionComments.length})
          </Link>
        </Box>
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
    </Grid2>
  )
}

export default CommentList
