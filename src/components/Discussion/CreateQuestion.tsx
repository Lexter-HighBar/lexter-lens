import { useState } from 'react'
import { useQuestions } from '../../hooks/useQuestions'
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { Flex } from '@radix-ui/themes'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const CreateQuestion = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    content: '',
    tags: '',
  })
  const [error, setError] = useState<string | null>(null)

  const api = useQuestions() // Access API context

  const handleCreateQuestion = async () => {
    const { content, tags } = newQuestion

    if (!content.trim() || !content.trim()) {
      setError('Title and content are required.')
      return
    }

    try {
      if (!api) {
        throw new Error('API is not available')
      }

      // Create the new question object
      const questionPayload = {
        question_id: uuidv4(), // Generate a unique ID for the question
        content,
        owner_id: 'user123', // To be Replace with actual owner_id form user context Clerk
        tags: tags.split(',').map((tag) => tag.trim()), // Convert comma-separated tags to an array
      }

      // Send the new question to the API
      await api.createQuestion.mutateAsync(questionPayload)

      setIsDialogOpen(false)
      setNewQuestion({ content: '', tags: '' })
      setError(null) // Clear any errors
    } catch (err: any) {
      setError(err.message || 'Failed to create the question.')
    }
  }

  return (
    <>
      <Flex gap="1" align="center">
        <Button onClick={() => setIsDialogOpen(true)}>
          <AddCircleIcon /> Ask a question
        </Button>
      </Flex>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        fullWidth
      >
        <DialogTitle>Create a New Question</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Content"
            multiline
            rows={4}
            value={newQuestion.content}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, content: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Tags (comma-separated)"
            value={newQuestion.tags}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, tags: e.target.value })
            }
          />
          {error && (
            <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateQuestion}>Post</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateQuestion
