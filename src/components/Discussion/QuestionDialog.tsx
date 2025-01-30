import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from '@mui/material';
import {  Question } from '../../lib/types';



type Props = {
  isOpen: boolean; // Whether the dialog is open
  onClose: () => void; // Callback to close the dialog
  currentQuestion?: Question; // The post to edit (if editing), undefined for creating
  isEditing: boolean; // Whether the dialog is in edit mode
  onSubmit: (updatedPost: { comment: string}) => void; // Callback for submitting the post
};

const QuestionDialog = ({ isOpen, onClose, currentQuestion, isEditing, onSubmit }: Props) => {
  const [comment, setComment] = useState<string>(currentQuestion?.content || '');
  

  const handleSubmit = () => {
    if (comment.trim() === '' ) {
      alert('Content is required.');
      return;
    }

    onSubmit({ comment });
    setComment(''); // Reset fields after submission
   
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>{isEditing ? 'Edit Post' : 'add a comment'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant="outlined"
          label="content"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} >
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEditing ? 'Save Changes' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionDialog;
