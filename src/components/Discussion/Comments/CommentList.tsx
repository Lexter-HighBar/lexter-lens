import {
  Alert,
  Box,
  Divider,
  Grid2,
  IconButton,
  Snackbar,
  Typography,
} from '@mui/material'
import { Comment, Question } from '../../../lib/types'
import { useEffect, useState } from 'react'
import { useComments } from '../../../hooks/useComments'
import { CommentListContainer } from './CommentListContainer'
import {
  CopyIcon,
  ExternalLink,
  MessageCircleMore,
  MessageCirclePlus,
} from 'lucide-react'
import AddCommentDialog from '../AddCommentDialog'
import { useNavigate } from 'react-router'
import VoteComponent from '../Votes/VoteComponent'

interface CommentListProps {
  question: Question
  defaultOpen?: boolean
  showShareLink?: boolean
}

export const CommentList = ({
  question,
  defaultOpen,
  showShareLink,
}: CommentListProps) => {
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

  const handleToggleComments = () => {
    setShowComments(!showComments)
  }

  const handleOpenDialog = (question: Question) => {
    setCurrentQuestion(question)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
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
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} >
        <Box display={'flex'} justifyContent={'start'} >
          <VoteComponent
            questionId={question.QuestionId}
            ownerId={question.ownerId}
          />
        </Box>
        <Box gap={3} mt={2} display={'flex'} justifyContent={'end'}>
          <IconButton onClick={() => handleOpenDialog(question)}>
            <Box display={'flex'} justifyContent={'end'} gap={1}>
              <MessageCirclePlus size={25} />

              <Typography
                sx={{
                  display: { xs: 'none', md: 'flex' },
                }}
                variant="subtitle2"
                fontWeight={500}
              >
                Add Comment
              </Typography>
            </Box>
          </IconButton>

          {questionComments.length > 0 && (
            <>
              <Divider orientation="vertical" flexItem />
              <IconButton onClick={handleToggleComments}>
                <Box display={'flex'} gap={1}>
                  {showComments && questionComments.length > 0 ? (
                    <IconButton
                      size="small"
                      type="button"
                      onClick={handleToggleComments}
                    >
                      <Typography variant="subtitle2">Close</Typography>
                    </IconButton>
                  ) : (
                    <>
                      {' '}
                      <MessageCircleMore size={25} />
                      <Typography fontWeight={500} variant="subtitle2">
                        {' '}
                        {questionComments.length}{' '}
                      </Typography>
                      <Typography
                        sx={{
                          display: { xs: 'none', md: 'flex' },
                          fontWeight: '500',
                        }}
                        variant="subtitle2"
                      >
                        comments
                      </Typography>{' '}
                    </>
                  )}
                </Box>
              </IconButton>
              {showShareLink ? (
                <IconButton onClick={handleRedirect}>
                  <ExternalLink size={25} />
                </IconButton>
              ) : (
                <IconButton onClick={handleCopyLink}>
                  <CopyIcon size={25} />
                </IconButton>
              )}
            </>
          )}
        </Box>
      </Box>
      {showComments && questionComments.length > 0 && (
        <CommentListContainer
          comments={questionComments}
          showComments={showComments}
          toggleComments={handleToggleComments}
        />
      )}
      {isDialogOpen && (
        <AddCommentDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          currentQuestion={question}
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
