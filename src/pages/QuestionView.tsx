import { useParams } from 'react-router-dom'
import { Typography, Chip, Box, IconButton } from '@mui/material'
import { formatCreatedOnDate } from '../services/formatCreatedOnDate'

import { useQuestions } from '../hooks/useQuestions'
import { Page } from '../components/layout/Page'
import { ChevronLeft } from 'lucide-react'
import { CommentList } from '../components/Discussion/Comments/CommentList'


const QuestionView = () => {
  const { id } = useParams()
  const { questions, loading, error } = useQuestions({ id })

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography>Error loading question.</Typography>
  if (!questions) return <Typography>Question not found.</Typography>

  const question = Array.isArray(questions) ? questions[0] : questions
  const formattedDate = formatCreatedOnDate(new Date(question.createdOn))

  return (
    <Page
      sx={{
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <Box maxWidth={750} width={'89dvw'} m={1} p={2} key={question.QuestionId}>
        <Box display="flex" flexDirection="row" alignItems="center" pb={2} >
          <IconButton >
          <ChevronLeft onClick={() => window.history.back()}  size={40} />
          </IconButton>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
          <img
            src={question.profilePicture || ''}
            alt="Profile Picture"
            style={{ width: '60px', height: '60px', borderRadius: '50%' }}
          />
          <Box>
            <Typography variant="body1">{question.userName}</Typography>
            <Typography variant="body2">{formattedDate}</Typography>
          </Box>
        </Box>

        <Typography mt={2} fontWeight={400} variant="body1">
          {question.content}
        </Typography>

        <Box maxWidth={750} mt={2}>
          {question.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              variant="outlined"
              size="small"
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>

        <CommentList question={question} defaultOpen showShareLink={false} />
      </Box>
    </Page>
  )
}

export default QuestionView