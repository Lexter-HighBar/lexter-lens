import { Paper, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Post } from '../lib/types';
import { useState } from 'react';

type Props = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

const CreatePost = ({ posts, setPosts }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState<string>('');

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newPost: Post = {
        user: 'Anonymous',
        date: new Date().toISOString(),
        title: 'New Post',
        content: newPostContent,
        tags: ['General'],
        likes: 0,
        comments: [],
      };
      setPosts([newPost, ...posts]);
      setIsDialogOpen(false);
      setNewPostContent('');
    }
  };

  return (
    <>
      <Paper
        sx={{
          width: '100%',
          padding: 2,
          marginBottom: 2,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: '#f5f5f5',
        }}
        onClick={() => setIsDialogOpen(true)}
      >
        <Typography variant="body1" color="textSecondary">
          Click here to create a post...
        </Typography>
      </Paper>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth>
        <DialogTitle>Create a New Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="What's on your mind?"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreatePost}>Post</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreatePost;
