import { Box, Link } from '@mui/material';
import { useComments } from '../../../hooks/useComments';
import { Comment } from '../../../lib/types';
import { CommentItem } from './CommentItem';

interface CommentListContainerProps {
    comments: Comment[]; // Assuming comments is an array of objects
    showComments: boolean;
    toggleComments: () => void;
  }
export const CommentListContainer = ({ comments, showComments, toggleComments }: CommentListContainerProps) => {
  const { createComment } = useComments();

  const handleCreateReply = (newComment: Comment) => {
    createComment.mutate(newComment);
  };

  return (
    <Box maxHeight={600} mt={2} display={'flex'} flexDirection="column" gap={1} sx={{ overflowY: 'scroll', scrollbarWidth: 'thin' }}>
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} onCreateReply={handleCreateReply} />
      ))}
      <Link underline="hover" alignContent="end" onClick={toggleComments}>
        {showComments ? 'Hide' : 'Show all comments'} ({comments.length})
      </Link>
    </Box>
  );
};