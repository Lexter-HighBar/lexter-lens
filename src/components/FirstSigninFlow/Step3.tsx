import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Question, SuggestedQuestions } from '../../lib/types'
import { useQuestions } from '../../hooks/useQuestions'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/clerk-react'
import { useComments } from '../../hooks/useComments'

interface Step3Props {
  tags: string[]
  suggestedQuestions: SuggestedQuestions | null
  loading: boolean
  error: string | null
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Step3: React.FC<Step3Props> = ({
  tags,
  suggestedQuestions,
  loading,
  error,
}) => {
  const api = useQuestions()
  const { createComment } = useComments()
  const [newQuestion, setNewQuestion] = useState<Question>({
    QuestionId: '',
    ownerId: '',
    userName: '',
    profilePicture: '',
    createdOn: '',
    content: '',
    tags: [],
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showSuggestedQuestion, setShowSuggestedQuestion] = useState(true) // Track visibility of suggested question

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value, // Dynamically update the field
    }))
  }

  const { user } = useUser()

  const handleCreateQuestion = async () => {
    if (!user) {
      setErrorMessage('User is not logged in')
      return
    }

    const { content } = newQuestion

    if (!content.trim() || tags.length !== 0) {
      setErrorMessage('Tags and content are required.')
      return
    }

    setErrorMessage(null) // Clear any previous error messages

    try {
      if (!api) {
        throw new Error('API is not available')
      }

      // Create the new question object
      const questionPayload: Question = {
        QuestionId: uuidv4(),
        ownerId: 'anonymousId',
        userName: `'Anonymous'`,
        profilePicture: '../../assets/anonymous.png',
        createdOn: new Date().toISOString(),
        content: suggestedQuestions?.question1 || '',
        tags: tags.map((tag: string) => tag.trim()),
      }

      const newComment = {
        ownerId: user.id,
        parentId: questionPayload.QuestionId,
        content: content,
        userName: (user.unsafeMetadata?.userName as string) ?? '',
        createdOn: new Date().toISOString(),
        tags: [],
        profilePicture: user.imageUrl ?? '',
      }
      // Send the new question to the API
      await api.createQuestion.mutateAsync(questionPayload)
      createComment.mutate(newComment)

      // Hide suggested question after posting
      setShowSuggestedQuestion(false)
    } catch (err) {
      console.error('Unexpected error:', err)
      setErrorMessage('Unexpected error occurred while creating the question.')
    }
  }

  const handleSkip = () => {
    setShowSuggestedQuestion(false) // Hide suggested question and show input to ask a question
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Box>
      {showSuggestedQuestion && suggestedQuestions && (
        <>
          <Typography>
            Based on your tags, you may be able to help other legal
            professionals.
          </Typography>

          <Box
            sx={{
              border: '1px solid grey',
              borderRadius: '4px',
              padding: '16px',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              mb: -1,
            }}
          >
            <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
              {suggestedQuestions?.question1 || ''}
            </Typography>
          </Box>
          <TextField
            fullWidth
            margin="normal"
            placeholder="Have a contribution? Share it now."
            name="content"
            onChange={handleInputChange}
          />
          <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
            <Button onClick={handleCreateQuestion} variant="contained">
              Post
            </Button>
            <Button onClick={handleSkip} variant="outlined">
              Skip
            </Button>
          </Box>
        </>
      )}

      {/* Display error message if any */}
      {errorMessage && (
        <Typography sx={{ color: 'red', fontWeight: 'bold' }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  )
}

export default Step3
