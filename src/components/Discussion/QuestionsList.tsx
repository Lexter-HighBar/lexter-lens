import QuestionItem from './QuestionItem'

import { Question } from '../../lib/types'

import { useQuestions } from '../../hooks/useQuestions'
import { Box } from '@mui/material'
import { LoadingSkelton } from './LoadingSkelton'

interface Props {
  questions: Question[]
}

const QuestionsList = ({ questions }: Props) => {
  const { loading, error } = useQuestions()

  if (loading) {
    return (
      <>
        <LoadingSkelton />
      </>
    )
  } else if (error) {
    return <Box p={6}>Error loading questions</Box>
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {questions.map((question) => (
        <QuestionItem key={question.QuestionId} question={question} />
      ))}
    </Box>
  )
}

export default QuestionsList
