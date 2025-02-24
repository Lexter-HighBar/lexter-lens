import { Box, Button, Typography } from "@mui/material"
import { Question } from "../lib/types"
import { formatCreatedOnDate } from "../services/formatCreatedOnDate"
import { useNavigate } from 'react-router-dom';


const QuestionCard = ({ question }: { question: Question }) => {
    const navigate = useNavigate();

    return (
      <Box
        sx={{
          padding: 2,
          backgroundColor: 'primary.contrastText',
          borderRadius: 2,
          boxShadow: 1,
          borderColor: 'primary.main',
          borderStyle: 'solid',
          cursor: 'pointer',
          gap: 2
        }}
        onClick={() => navigate(`/question/${question._id}`)}
      >  <Box mb={2}>
        <Typography variant="h6">{question.content}</Typography>
        </Box>
      
        <Typography variant="subtitle2">
            <strong>Tags: </strong> {question.tags.join(', ')}<br />
          <strong>Asked by: </strong> {question.userName}
        </Typography>
      
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>    <Typography variant="caption">
          <strong>On: </strong> {formatCreatedOnDate(new Date(question.createdOn))}
        </Typography>
        <Button variant="text" onClick={() => navigate(`/question/${question._id}`)}> See more </Button>
        </Box>
      </Box>
    )
  }
  export default QuestionCard