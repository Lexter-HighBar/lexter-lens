import  { useState } from 'react';
import { 
  Card,
  Typography,
  TextField, 
  Button, 
  Chip, 
  Select, 
  MenuItem, 
  FormControl, 
  Stack, 
  IconButton 
} from '@mui/material';
import { Page } from '../components/layout/Page';

// Define the Comment type
type Comment = {
  user: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
};

export const Discussion = () => {
  // State to hold the list of comments
  const [comments, setComments] = useState<Comment[]>([
    {
      user: 'John Doe',
      date: '2022-02-04T12:00:00',
      title: 'Do the lawyer-inc ??',
      content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      tags: ['Legal', 'Review', 'Feedback'],
      likes: 14,
      comments: 14,
    },
    {
      user: 'Lexter',
      date: '2022-02-03T12:00:00',
      title: 'Do the lawyer-inc ??',
      content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      tags: ['Feedback', 'Client', 'Service'],
      likes: 14,
      comments: 14,
    },
  ]);
  // State to hold the new comment text
  const [newComment, setNewComment] = useState('');
  // State to manage the sorting option
  const [filter, setFilter] = useState('oldToNew');
  // State to track the currently selected tag
  const [selectedTag, setSelectedTag] = useState<string | null>('All');

  // Handle tag selection for filtering
  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  // Add a new comment to the list
  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          user: 'Anonymous',
          date: new Date().toISOString(), // Automatically set the current timestamp
          title: 'New Comment',
          content: newComment.trim(),
          tags: ['General'], // Default tag for new comments
          likes: 0,
          comments: 0,
        },
      ]);
      setNewComment(''); // Clear the input field after adding
    }
  };

  // Handle the "Like" button click
  const handleLike = (index: number) => {
    const updatedComments = [...comments];
    updatedComments[index].likes += 1; // Increment the like count
    setComments(updatedComments); // Update the state with the modified comments
  };

  // Handle the "Comments" button click
  const handleCommentClick = (index: number) => {
    alert(`Comments clicked for: ${comments[index].title}`);
  };

  // Filter and sort comments
  const filteredComments = [...comments]
    .filter((comment) =>
      selectedTag && selectedTag !== 'All' ? comment.tags.includes(selectedTag) : true
    )
    .sort((a, b) => {
      switch (filter) {
        case 'newToOld':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldToNew':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        default:
          throw new Error(`Unknown filter type: ${filter}`);
      }
    });

  return (
    <Page sx={{ height: '100%', overflowY: 'auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Discussion
      </Typography>
      {/* Dropdown to select sorting option */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="oldToNew">Old to New</MenuItem>
          <MenuItem value="newToOld">New to Old</MenuItem>
        </Select>
      </FormControl>
      {/* Tag filtering buttons */}
      <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
        <Chip
          label="All"
          color={selectedTag === 'All' ? 'primary' : 'default'}
          onClick={() => handleTagFilter('All')}
        />
        {['Legal', 'Review', 'Feedback', 'Client', 'Service'].map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            color={selectedTag === tag ? 'primary' : 'default'}
            onClick={() => handleTagFilter(tag)}
          />
        ))}
      </Stack>
      {/* Render the list of filtered and sorted comments */}
      {filteredComments.map((comment, index) => (
        <Card key={index} sx={{ width: '100%', padding: 2, marginBottom: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">
            {comment.user} • {new Date(comment.date).toLocaleString()}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            {comment.title}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            {comment.content.length > 100
              ? `${comment.content.slice(0, 100)}...`
              : comment.content}
          </Typography>
          {/* Display tags */}
          <div style={{ marginTop: 10 }}>
            {comment.tags.map((tag, idx) => (
              <Chip
                key={idx}
                label={tag}
                color={selectedTag === tag ? 'primary' : 'default'}
                onClick={() => handleTagFilter(tag)}
                sx={{ marginRight: 1 }}
              />
            ))}
          </div>
          {/* Like and Comment buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            <IconButton onClick={() => handleCommentClick(index)}>
              💬 {comment.comments} Comments
            </IconButton>
            <IconButton onClick={() => handleLike(index)}>
              👍 {comment.likes} Likes
            </IconButton>
          </div>
        </Card>
      ))}
      {/* Form to add a new comment */}
      <Card sx={{ width: '100%', padding: 2, marginTop: 2 }}>
        <Typography variant="h6" gutterBottom>
          Add a Comment
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={handleAddComment}>
          Submit
        </Button>
      </Card>
    </Page>
  );
};

export default Discussion;
