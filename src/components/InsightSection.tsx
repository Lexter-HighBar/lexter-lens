import { Box, Divider, Grid2, Typography } from '@mui/material'
import { Question } from '../lib/types'
import Masonry from '@mui/lab/Masonry'
import QuestionCard from './QuestionCard'

interface InsightSectionProps {
  questions: Question[]
}

const InsightSection: React.FC<InsightSectionProps> = ({ questions }) => {
  return (
    <Box sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
     
      <Typography variant="h6" gutterBottom>
        Discover the most insightful questions:
      </Typography>
    

      {questions.length > 0 ? (
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
          {questions.map((question, index) => (
            <QuestionCard key={index} question={question} />
          ))}
        </Masonry>
      ) : (
        <Grid2 container>
          <Grid2>
            <Typography variant="body1">
              No questions found based on your tags.
            </Typography>
            <Typography variant="body1">Please try again later.</Typography>
          </Grid2>
        </Grid2>
      )}
        <Divider sx={{ mb: 2 }} />
    </Box>
  )
}

export default InsightSection
