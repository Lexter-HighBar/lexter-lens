import { useParams } from 'react-router-dom'
import { Typography, Chip, Box } from '@mui/material'
import { formatCreatedOnDate } from '../services/formatCreatedOnDate'
import CommentList from '../components/Discussion/CommentList'
import { useQuestions } from '../hooks/useQuestions'
import { Page } from '../components/layout/Page'

const QuestionView = () => {
  const { id } = useParams() // Get the ID from the URL
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
      <Box
        maxWidth={750}
        width={'89dvw'}
        m={1}
        p={2}
        border={1}
        borderRadius={2}
        borderColor={'grey.300'}
        key={question.QuestionId}
      >
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

        <Box width={'89dvw'} mt={2}>
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
        <CommentList question={question} defaultOpen={true} />
      </Box>
    </Page>
  )
}

export default QuestionView
