import { Box, Divider, Grid, Typography } from '@mui/material'
import { Question } from '../lib/types'
import Masonry from '@mui/lab/Masonry';
import QuestionCard from './QuestionCard';

interface InsightSectionProps {
  questions: Question[]
}

const InsightSection: React.FC<InsightSectionProps> = ({ questions }) => {
  return (
    <Box sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Discover the most insightful questions:
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {questions.length > 0 ? (
        <Masonry   columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
          {questions.map((question, index) => (
            <QuestionCard key={index} question={question} />
          ))}
        </Masonry>
      ) : (
        <Grid item xs={12}>
          <Typography variant="body1">
            No questions found based on your tags.
          </Typography>
          <Typography variant="body1">Please try again later.</Typography>
        </Grid>
      )}
    </Box>
  )
}


export default InsightSection

