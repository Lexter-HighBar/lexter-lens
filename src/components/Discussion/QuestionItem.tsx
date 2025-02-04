import { Typography, Chip, Box } from '@mui/material'
import { Question } from '../../lib/types'

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
        width={'89dvw'}
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
            <Typography variant="body1"> {question.userName}</Typography>
            <Typography variant="body2">{`${formattedDate}`}</Typography>
          </Box>
        </Box>
        <Typography mt={2} fontWeight={400} variant="body1">
          {question.content}
        </Typography>
       
          <Box width={'89dvw'} mt={2}>
         
            {question.tags.map((tag, index) => (
              <Chip key={index} label={tag} variant='outlined' size='small' sx={{ mr:1 , mb:1 }} />
            ))}

        </Box>
    
          <CommentList showShareLink question={question} />
        
      </Box>
    </>
  )
}

export default QuestionItem