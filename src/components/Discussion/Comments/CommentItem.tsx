import { Box, Typography, InputBase, IconButton } from '@mui/material'
import { formatCreatedOnDate } from '../../../services/formatCreatedOnDate'
import { Comment } from '../../../lib/types'
import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { RepliesList } from './RepliesList'
import { SendIcon } from 'lucide-react'

interface CommentItemProps {
  comment: Comment
  onCreateReply: (newComment: Comment) => void
}

export const CommentItem = ({ comment, onCreateReply }: CommentItemProps) => {
  const formattedDate = formatCreatedOnDate(new Date(comment.createdOn))
  const [replyContent, setReplyContent] = useState('')

  const { user } = useUser()
  const handleReply = () => {
    const newComment = {
      ownerId: user?.id ?? '',
      parentId: comment._id ?? '',
      content: replyContent,
      userName: user?.unsafeMetadata.userName?.toString() ?? '',
      createdOn: new Date().toISOString(),
      tags: [], // Initialize the tags array as empty
      profilePicture: user?.imageUrl ?? '',
    }
    onCreateReply(newComment)
    setReplyContent('') // Clear the text input field
  }

  return (
    <Box
      sx={{ backgroundColor: 'grey.50' }}
      key={comment._id}
      mt={2}
      p={2}
      borderRadius={2}
    >
      <Typography fontWeight={500} py={1} variant="body1">
        {comment.userName}
      </Typography>
      <Typography py={1} variant="body1">
        {comment.content}
      </Typography>
      <Typography variant="body2">{formattedDate}</Typography>

      <RepliesList comment={comment} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'space-between',
          p: 1,
          border: '1px solid rgb(211, 211, 211)',
          borderRadius: 2,
        }}
      >
        <InputBase
          multiline
          size="small"
          fullWidth
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Enter your reply"
          sx={{ mr: 2 }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault() // Prevents adding a new line
              handleReply() // Call the function
            }
          }}
        />

        <IconButton onClick={handleReply} disabled={!replyContent}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}