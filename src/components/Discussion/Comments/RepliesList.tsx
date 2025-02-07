import { Box, Divider, Grid2, IconButton, Typography } from '@mui/material'
import { Comment } from '../../../lib/types'
import { useEffect, useState } from 'react'
import { useComments } from '../../../hooks/useComments'
import { RepliesListContainer } from './RepliesListContainer'

interface CommentListProps {
  comment: Comment
  defaultOpen?: boolean
  showShareLink?: boolean
}

export const RepliesList = ({ comment, defaultOpen }: CommentListProps) => {
  const [showReplies, setShowReplies] = useState(false)
  const { comments } = useComments()
  const questionComments: Comment[] = Array.isArray(comments)
    ? comments.filter(
        (currentComment) => comment._id === currentComment.parentId,
      )
    : []

  useEffect(() => {
    setShowReplies(defaultOpen || false)
  }, [defaultOpen])

  const handleToggleReplies = () => {
    setShowReplies(!showReplies)
  }

  return (
    <Grid2
      mt="1"
      display={'flex'}
      flexDirection="column"
      gap="1"
      width={'100%'}
    >
      <Box gap={3} display={'flex'} justifyContent={'end'}>
        {questionComments.length > 0 && (
          <>
            <Divider orientation="vertical" flexItem />

            <Box display={'flex'} gap={1}>
              {showReplies && questionComments.length > 0 ? (
                <IconButton
                  size="small"
                  type="button"
                  onClick={handleToggleReplies}
                >
                  <Typography variant="subtitle2">Close</Typography>
                </IconButton>
              ) : (
                <>
                  <IconButton size="small" onClick={handleToggleReplies}>
                    <Typography variant="subtitle2">
                    {' '}{questionComments.length}{'   '}
                
                    Replies</Typography>{' '}
                  </IconButton>
                </>
              )}
            </Box>
          </>
        )}
      </Box>
      {showReplies && questionComments.length > 0 && (
        <RepliesListContainer
          showReplies={showReplies}
          comments={questionComments}
          toggleReplies={handleToggleReplies}
        />
      )}
    </Grid2>
  )
}
