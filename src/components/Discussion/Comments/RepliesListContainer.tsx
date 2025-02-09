import { Box } from '@mui/material'
import { useComments } from '../../../hooks/useComments'
import { Comment } from '../../../lib/types'
import { ReplyItem } from './ReplyItem'

interface RepliesListContainerProps {
  comments: Comment[] // Assuming comments is an array of objects
  showReplies: boolean
  toggleReplies: () => void
}
export const RepliesListContainer = ({
  comments,
}: RepliesListContainerProps) => {
  const { createComment } = useComments()

  const handleCreateReply = (newComment: Comment) => {
    createComment.mutate(newComment)
  }

  return (
    <Box
      m={1}
      borderRadius={2}
      maxHeight={400}
      display={'flex'}
      flexDirection="column"
      gap={1}
      sx={{ overflowY: 'scroll', scrollbarWidth: 'thin' }}
    >
      {comments.map((comment) => (
        <ReplyItem
          key={comment._id}
          comment={comment}
          onCreateReply={handleCreateReply}
        />
      ))}
    </Box>
  )
}
