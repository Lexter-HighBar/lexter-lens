import { Box, Typography } from "@mui/material";
import { Comment } from "../../../lib/types";

import { RepliesList } from "./RepliesList";
import { Flex } from "@radix-ui/themes";


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
    <Box sx={{ backgroundColor: 'grey.50' }} key={comment._id} p={1} borderRadius={2}>
      <Flex >
      <Typography fontWeight={500} variant="body1">
        {comment.userName}
      </Typography>
      <Typography py={1} variant="body1">
        {comment.content}
      </Typography>
      </Flex>
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