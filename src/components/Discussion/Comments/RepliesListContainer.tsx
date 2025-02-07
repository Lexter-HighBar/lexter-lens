import { Box } from '@mui/material';
import { useComments } from '../../../hooks/useComments';
import { Comment } from '../../../lib/types';
import { CommentItem } from './CommentItem';

interface RepliesListContainerProps {
    comments: Comment[]; // Assuming comments is an array of objects
    showReplies: boolean;
    toggleReplies: () => void;
  }
export const RepliesListContainer = ({ comments }: RepliesListContainerProps) => {
  const { createComment } = useComments();

  const handleCreateReply = (newComment: Comment) => {
    createComment.mutate(newComment);
  };

  return (
    <Box border={1} borderRadius={2} maxHeight={600} display={'flex'} flexDirection="column" gap={1} sx={{ overflowY: 'scroll', scrollbarWidth: 'thin' }}>
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} onCreateReply={handleCreateReply} />
      ))}
     
    </Box>
  );
};