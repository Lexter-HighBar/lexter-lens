import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from '@mui/material';
import {  Question } from '../lib/types';



type Props = {
  isOpen: boolean; // Whether the dialog is open
  onClose: () => void; // Callback to close the dialog
  currentPost?: Question; // The post to edit (if editing), undefined for creating
  isEditing: boolean; // Whether the dialog is in edit mode
  onSubmit: (updatedPost: { title: string; content: string }) => void; // Callback for submitting the post
};

const PostDialog = ({ isOpen, onClose, currentPost, isEditing, onSubmit }: Props) => {
  const [title, setTitle] = useState<string>(currentPost?.title || '');
  const [content, setContent] = useState<string>(currentPost?.content || '');

  const handleSubmit = () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Both title and content are required.');
      return;
    }

    onSubmit({ title, content });
    setTitle(''); // Reset fields after submission
    setContent('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>{isEditing ? 'Edit Post' : 'Create a New Post'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant="outlined"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post here..."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEditing ? 'Save Changes' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDialog;
