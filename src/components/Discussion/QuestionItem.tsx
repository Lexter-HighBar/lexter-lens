import { Typography, Chip, Box, Grid2 } from '@mui/material'
import { Question } from '../../lib/types'
import { Flex } from '@radix-ui/themes'
import { formatCreatedOnDate } from '../../services/formatCreatedOnDate'
import CommentList from './CommentList'

interface Props {
  question: Question
  onAddComment: () => void
}

const QuestionItem = ({ question }: Props) => {
  const formattedDate = formatCreatedOnDate(new Date(question.createdOn))

  return (
    <>
      <Box
        maxWidth={750}
        width={'80%'}
        m={1}
        p={2}
        border={1}
        borderRadius={2}
        borderColor={'grey.300'}
        key={question.QuestionId}
      >
        <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
          {' '}
          <img
            src={question?.profilePicture || ''}
            alt="Profile Picture"
            style={{ width: '50px', height: 'auto', borderRadius: '50%' }}
          />
          <Box>
            <Typography variant="h6"> {question.userName}</Typography>
            <Typography variant="body2">{`${formattedDate}`}</Typography>
          </Box>
        </Box>
        <Typography mt={2} variant="h6">
          {question.content}
        </Typography>
        <Grid2 mt="1" gap="1">
          <CommentList question={question} />
        </Grid2>
        <Flex>
          {question.tags.map((tag, index) => (
            <Chip key={index} label={tag} color="primary" />
          ))}
        </Flex>
      </Box>
    </>
  )
}

export default QuestionItem
