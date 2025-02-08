import {
  Alert,
  Box,
  Divider,
  Grid2,
  IconButton,
  Link,
  Snackbar,
  Typography,
} from '@mui/material'
import {
  CopyIcon,
  ExternalLink,
  MessageCircleMore,
  MessageCirclePlus,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useComments } from '../../hooks/useComments'
import { Comment, Question } from '../../lib/types'
import AddCommentDialog from './AddCommentDialog'
import { formatCreatedOnDate } from '../../services/formatCreatedOnDate'
import { useNavigate } from 'react-router'

interface Props {
  question: Question
  defaultOpen?: boolean // optional prop
  showShareLink?: boolean
}

const CommentList = ({ question, defaultOpen, showShareLink }: Props) => {
  const [showComments, setShowComments] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const { comments, createComment } = useComments()
  const questionComments: Comment[] = Array.isArray(comments)
    ? comments.filter((comment) => comment.parentId === question.QuestionId)
    : []
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate(`/question/${question._id}`)
  }

  const handleCopyLink = () => {
    const link = window.location.href
    navigator.clipboard.writeText(link).then(() => {
      setOpenSnackBar(true)
    })
  }

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
        {showShareLink ? (
          <IconButton onClick={handleRedirect}>
            <ExternalLink size={20} />
          </IconButton>
        ) : (
          <IconButton onClick={handleCopyLink}>
            <CopyIcon size={20} />
          </IconButton>
        )}
        {/* Comment list goes here */}
      </Box>
      {showComments && questionComments.length > 0 && (
        <Box
          maxHeight={500}
          mt={2}
          display={'flex'}
          flexDirection="column"
          gap={1}
          sx={{ overflowY: 'scroll', scrollbarWidth: 'thin' }}
        >
          {questionComments.map((comment) => {
            const formattedDate = formatCreatedOnDate(
              new Date(comment.createdOn),
            )
            return (
              <Box
                sx={{ backgroundColor: 'grey.50' }}
                key={comment._id}
                mt={2}
                p={2}
                borderRadius={2}
              >
                <Typography py={1} variant="body1">
                  {comment.userName}
                </Typography>
                <Typography py={1} variant="body1">
                  {comment.content}
                </Typography>

                <Typography variant="body2">{formattedDate}</Typography>
                <Divider />
              </Box>
            )
          })}

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
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2000} // 2 seconds
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Grid2>
  )
}

export default CommentList
