import { Paper, Typography, IconButton } from '@mui/material';
import { Question } from '../lib/types';

interface Props {
  post: Question;
  openDialog: (post: Question) => void;
  key : string;
}


const PostItem = ({ post, openDialog }: Props) => (
  <Paper sx={{ width: '100%', padding: 2, marginBottom: 2 }}>
    <Typography variant="subtitle2" color="textSecondary">
      {post.content}
    </Typography>
    <Typography variant="h6" sx={{ marginTop: 1 }}>
      {post.title} and {post.content}
    </Typography>
   
    <IconButton
      onClick={() => openDialog(post)}
      sx={{ position: 'absolute', right: 8, bottom: 8 }}/>
  </Paper>
);

export default PostItem;
