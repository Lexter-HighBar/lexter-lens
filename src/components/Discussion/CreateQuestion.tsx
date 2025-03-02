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
  Select,
  FormControl,
  MenuItem,
} from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useUser } from '@clerk/clerk-react'
import { Question } from '../../lib/types'
import { isMobile } from 'react-device-detect'
import ChipGenerator from '../ChipGenerateur'
import { useState } from 'react'
import FilterComponent from './FilterComponent'

interface CreateQuestionProps {
  setFilter: (filter: string) => void
}

const CreateQuestion: React.FC<CreateQuestionProps> = ({ setFilter }) => {
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
  const [anonymous, setAnonymous] = useState(false)
  const api = useQuestions() // Access API context
  const { user } = useUser()
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
  }
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
        ownerId: anonymous ? `anonymous-${uuidv4()}` : user?.id || '',
        userName: anonymous
          ? 'Anonymous'
          : typeof user?.unsafeMetadata.userName === 'string'
            ? user.unsafeMetadata.userName
            : '',
        profilePicture: anonymous
          ? 'https://raw.githubusercontent.com/Lexter-HighBar/lexter-lens/refs/heads/main/assets/anonymous.png'
          : typeof user?.imageUrl === 'string'
            ? user.imageUrl
            : '',
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
     
        <Box maxWidth={785} width={'89dvw'} m={1} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ced4da',
              borderRadius: 4,
            }}
           width={'100%'}
          >
            <IconButton
              onClick={() => setIsDialogOpen(true)}
              color="primary"
              sx={{ p: '10px' }}
              aria-label="directions"
            >
              <AddCircleIcon />
              <Divider sx={{ height: 30, mx: 2 }} orientation="vertical" />
            </IconButton>
            <InputBase
              onClick={() => setIsDialogOpen(true)}
              fullWidth
              placeholder="Something in mind? Type it here..."
              inputProps={{
                'aria-label': 'Something in mind? Type it here...',
              }}
            />
            <FilterComponent onFilterChange={handleFilterChange} />
          </Box>
        </Box>


      <Dialog
        fullWidth
        fullScreen={isMobile}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        {/* Anonymouse logic  */}
        <DialogTitle>
          Post as
          <FormControl fullWidth variant="standard">
            <img
              src={
                anonymous
                  ? 'https://raw.githubusercontent.com/Lexter-HighBar/lexter-lens/refs/heads/main/assets/anonymous.png'
                  : user?.imageUrl || ''
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
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Type here..."
            multiline
            rows={4}
            value={newQuestion.content}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, content: e.target.value })
            }
          />

          <ChipGenerator
            inputText={newQuestion.content}
            onTagChange={(tags) => setNewQuestion({ ...newQuestion, tags })}
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
