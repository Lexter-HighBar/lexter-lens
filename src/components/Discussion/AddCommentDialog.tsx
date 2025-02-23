import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'
import { Question, Comment } from '../../lib/types'
import { useUser } from '@clerk/clerk-react'


type Props = {
   anonymous: boolean
  setAnonymous: (anonymous: boolean) => void
  isOpen: boolean // Whether the dialog is open
  onClose: () => void // Callback to close the dialog
  currentQuestion?: Question // The post to edit (if editing), undefined for creating
  isEditing: boolean // Whether the dialog is in edit mode
  onSubmit: (updateComment: { comment: Comment }) => void // Callback for submitting the post
}

const AddCommentDialog = ({
  
  anonymous,
  setAnonymous,
  isOpen,
  onClose,
  currentQuestion,
  isEditing,
  onSubmit,
}: Props) => {
  const [comment, setComment] = useState<Comment>({
    content: '',
  } as Comment)
 const { user } = useUser()
  useEffect(() => {
    if (currentQuestion) {
      setComment({ content: '' } as Comment)
    }
  }, [currentQuestion])

  const handleSubmit = async () => {
    if (comment.content.trim() === '') {
      alert('Content is required.')
      return
    }

    try {
      if (
        currentQuestion &&
        currentQuestion.QuestionId &&
        currentQuestion.ownerId
      ) {
        await onSubmit({ comment })
        setComment({ content: '' } as Comment)
        onClose()
      } else {
        alert('Question ID and Owner ID are required.')
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
      alert('Failed to submit comment. Please try again.')
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>{isEditing ? 'Edit Comment' : 'Add a Comment'}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth variant="standard">
          <img
            src={
              anonymous
                ? 'https://raw.githubusercontent.com/Lexter-HighBar/lexter-lens/refs/heads/main/assets/anonymous.png'
                : (user?.imageUrl || '' )
            }
            alt="Profile Picture"
            style={{ width: '50px', height: 'auto', borderRadius: '50%' }}
          />

          <Select
            value={anonymous ? 'Anonymous' : 'Me'}
            onChange={(event) => {
              setAnonymous(event.target.value === 'Anonymous')
            }}
          >
            <MenuItem value="Anonymous">Anonymous</MenuItem>
            <MenuItem value="Me">
              {String(user?.unsafeMetadata?.userName) || 'Unknown User'}
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          multiline
          fullWidth
          variant="outlined"
          label="Content"
          value={comment.content}
          onChange={(e) => setComment({ content: e.target.value } as Comment)}
          sx={{ marginBottom: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEditing ? 'Save Changes' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddCommentDialog
