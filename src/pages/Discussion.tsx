import { Page } from '../components/layout/Page'

import QuestionsList from '../components/Discussion/QuestionsList'
import { Question } from '../lib/types'
import { useQuestions } from '../hooks/useQuestions'
import CreateQuestion from '../components/Discussion/CreateQuestion'
import { Box } from '@radix-ui/themes'

// Discussion page component
export const Discussion = () => {
  // State to manage all questions
  const { questions } = useQuestions()
  return (
    <Page
      sx={{
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      {/* Dialog to create a new question */}
      <Box> 
      <CreateQuestion  />
      </Box>
      
      <QuestionsList  questions={questions as Question[]} />
    
    </Page>
  )
}

export default Discussion
