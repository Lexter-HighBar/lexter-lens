import { Box, Typography } from "@mui/material";
import { Comment } from "../../../lib/types";

import { RepliesList } from "./RepliesList";



interface CommentItemProps {
  comment: Comment;
  onCreateReply: (newComment: Comment) => void;
}

export const ReplyItem = ({ comment }: CommentItemProps) => {
  // const [replyContent, setReplyContent] = useState('');
  
  // const { user } = useUser();
  // const handleReply = () => {
  //   const newComment = {
    
  //     ownerId: user?.id ?? '',
  //     parentId: comment._id ?? '',
  //     content: replyContent,
  //     userName: user?.unsafeMetadata.userName?.toString() ?? '',
  //     createdOn: new Date().toISOString(),
  //     tags: [], // Initialize the tags array as empty
  //     profilePicture: user?.imageUrl ?? '',
  //   };
  //   onCreateReply(newComment);
  //   setReplyContent(''); // Clear the text input field
  // };

  return (
    <Box key={comment._id}  borderRadius={2} sx={{border: '1px solid #e0e0e0', backgroundColor: 'grey.100', p: 1 }}>
      <Box  sx={{ display: 'flex', alignItems: 'start', gap: 2, alignSelf: 'flex-start' }} >
      <Typography fontWeight={500} variant="body1">
        {comment.userName}:
      </Typography>
      <Typography py={1} variant="body1">
        {comment.content}
      </Typography>
      </Box>
      <RepliesList comment={comment} />
      
      {
      // reply on reply in case we want to activate this feature
      /* <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          id="outlined-multiline-static"
          label="Reply"
          multiline
           variant="standard"
          size="small"
          fullWidth
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Enter your reply"
          sx={{ mr: 2 }}
        />
        <IconButton onClick={handleReply}>
          <Typography>Reply</Typography>
        </IconButton>
      </Box> */}

     
    </Box>
  );
};