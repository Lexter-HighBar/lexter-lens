import { Question } from "../../lib/types";
import { useVotes } from '../../hooks/useVotes';
import { Typography } from "@mui/material";

const VotePreview = ({ question }: { question: Question }) => {
    const { useVotes: useVotesHook } = useVotes()
    const { data } = useVotesHook(question.QuestionId, question.ownerId)
    console.log('data:', data)
  
    return (
        data && (
            <Typography pl={2} fontWeight={500} variant="caption">
              Votes: {(data?.totalUps ?? 0) + (data?.totalDowns ?? 0) === 0 ? 'No votes yet' : 
                `${(data?.totalUps ?? 0) !== 0 ? `${data?.totalUps} up` : ''} ${(data?.totalDowns ?? 0) !== 0 ? `${data?.totalDowns} down` : ''}` 
              }
            </Typography>
        )
    );
};

export default VotePreview