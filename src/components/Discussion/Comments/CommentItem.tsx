import { Box, Divider, Typography, TextField, IconButton } from "@mui/material";
import { formatCreatedOnDate } from "../../../services/formatCreatedOnDate";
import { Comment } from "../../../lib/types";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { RepliesList } from "./RepliesList";

interface CommentItemProps {
  comment: Comment;
  onCreateReply: (newComment: Comment) => void;
}

export const CommentItem = ({ comment, onCreateReply }: CommentItemProps) => {
  const formattedDate = formatCreatedOnDate(new Date(comment.createdOn));
  const [replyContent, setReplyContent] = useState('');
  
  const { user } = useUser();
  const handleReply = () => {
    const newComment = {
    
      ownerId: user?.id ?? '',
      parentId: comment._id ?? '',
      content: replyContent,
      userName: user?.unsafeMetadata.userName?.toString() ?? '',
      createdOn: new Date().toISOString(),
      tags: [], // Initialize the tags array as empty
      profilePicture: user?.imageUrl ?? '',
    };
    onCreateReply(newComment);
    setReplyContent(''); // Clear the text input field
  };

  return (
    <Box sx={{ backgroundColor: 'grey.50' }} key={comment._id} mt={2} p={2} borderRadius={2}>
      <Typography py={1} variant="body1">
        {comment.userName}
      </Typography>
      <Typography py={1} variant="body1">
        {comment.content}
      </Typography>
      <Typography variant="body2">{formattedDate}</Typography>
      <Divider />
      <RepliesList comment={comment} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
      </Box>
      <Divider />
     
    </Box>
  );
};