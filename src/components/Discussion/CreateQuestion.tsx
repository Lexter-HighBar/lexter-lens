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
  IconButton,
  InputBase,
  Divider,
  Box,
} from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { Flex } from '@radix-ui/themes'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useUser } from '@clerk/clerk-react'
import { Question } from '../../lib/types'
import { isMobile } from 'react-device-detect';

const CreateQuestion = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newQuestion, setNewQuestion] = useState<Question>({
    QuestionId: '',
    ownerId: '',
    userName: '',
    profilePicture: '',
    createdOn: '',
    content: '',
    tags: [],
  })
  const [error, setError] = useState<string | null>(null)

  const api = useQuestions() // Access API context
  const { user } = useUser()
  console.log('user', user)

  const handleCreateQuestion = async () => {
    const { content, tags } = newQuestion

    if (!content.trim() || tags.length === 0) {
      setError('Tags and content are required.')
      return
    }

    try {
      if (!api) {
        throw new Error('API is not available')
      }

      // Create the new question object
      const questionPayload: Question = {
        QuestionId: uuidv4(),
        ownerId: user?.id || '',
        userName:
          typeof user?.unsafeMetadata.userName === 'string'
            ? user.unsafeMetadata.userName
            : '',
        profilePicture: typeof user?.imageUrl === 'string' ? user.imageUrl : '',
        createdOn: new Date().toISOString(),
        content: content,
        tags: tags.map((tag: string) => tag.trim()), // Ensure tags are trimmed
      }

      // Send the new question to the API

      await api.createQuestion.mutateAsync(questionPayload)

      setIsDialogOpen(false)
      setNewQuestion({
        QuestionId: '',
        ownerId: '',
        content: '',
        tags: [],
        createdOn: '',
        userName: '',
        profilePicture: '',
      })
      setError(null) // Clear any errors
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to create the question.')
      } else {
        setError('Failed to create the question.')
      }
    }
  }

  return (
    <>
      <Flex gap="1" align="center">
        <Box sx={{ width: '80vw', maxWidth: '750px' }}>
          <Box
            onClick={() => setIsDialogOpen(true)}
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ced4da',
              borderRadius: 4,
            }}
          >
            <IconButton
              color="primary"
              sx={{ p: '10px' }}
              aria-label="directions"
            >
              <AddCircleIcon />
              <Divider sx={{ height: 30, mx: 2 }} orientation="vertical" />
            </IconButton>
            <InputBase
              fullWidth
              placeholder="Question in mind ...?"
              inputProps={{ 'aria-label': 'Question in mind ...?' }}
            />
          </Box>
        </Box>
      </Flex>
    

        <Dialog
          fullWidth
          fullScreen={isMobile}
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        >
          <DialogTitle>New Question</DialogTitle>
          <DialogContent>
            <TextField
          fullWidth
          margin="normal"
          label="Question"
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
            setNewQuestion({
              ...newQuestion,
              tags: e.target.value.split(',').map((tag) => tag.trim()),
            })
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
