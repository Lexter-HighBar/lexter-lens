import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from '@mui/material';
import { Question, Comment } from '../../lib/types';

type Props = {
  isOpen: boolean; // Whether the dialog is open
  onClose: () => void; // Callback to close the dialog
  currentQuestion?: Question; // The post to edit (if editing), undefined for creating
  isEditing: boolean; // Whether the dialog is in edit mode
  onSubmit: (updateComment: { comment: Comment }) => void; // Callback for submitting the post
};

const AddCommentDialog = ({
  isOpen,
  onClose,
  currentQuestion,
  isEditing,
  onSubmit,
}: Props) => {
  const [comment, setComment] = useState<Comment>({
    content: '',
  } as Comment);

  useEffect(() => {
    if (currentQuestion) {
      setComment({ content: '' } as Comment);
    }
  }, [currentQuestion]);

  const handleSubmit = async () => {
    if (comment.content.trim() === '') {
      alert('Content is required.');
      return;
    }

    try {
      if (currentQuestion && currentQuestion.QuestionId && currentQuestion.ownerId) {
        await onSubmit({ comment });
        setComment({ content: '' } as Comment);
        onClose();
      } else {
        alert('Question ID and Owner ID are required.');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>{isEditing ? 'Edit Comment' : 'Add a Comment'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant="outlined"
          label="Content"
          value={comment.content}
          onChange={(e) => setComment({ content: e.target.value } as Comment)}
          sx={{ marginBottom: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEditing ? 'Save Changes' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCommentDialog;