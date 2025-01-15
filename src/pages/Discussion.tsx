import React, { useState } from 'react';
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Page } from '../components/layout/Page';

// Type definition for a comment
// Includes user, date, content, and optional replies
type Comment = {
  user: string;
  date: string;
  content: string;
  replies?: Comment[];
};

// Type definition for a post
// Includes user, date, title, content, tags, likes, and comments
type Post = {
  user: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: Comment[];
};

export const Discussion = () => {
  // State to manage all posts
  const [posts, setPosts] = useState<Post[]>([
    {
      user: 'John Doe',
      date: '2022-02-04T12:00:00',
      title: 'Do the lawyer-inc ??',
      content:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      tags: ['Legal', 'Review', 'Feedback'],
      likes: 14,
      comments: [
        {
          user: 'Anonymous',
          date: '2022-02-05T12:00:00',
          content: 'Great post!',
          replies: [],
        },
      ],
    },
  ]);

  // State for the current filter type
  const [filter, setFilter] = useState('newest');

  // State for the currently selected tag filter
  const [selectedTag, setSelectedTag] = useState<string | null>('All');

  // State to manage the visibility of the post details dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State to store the currently selected post
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  // State to manage the content of a new comment
  const [popupComment, setPopupComment] = useState('');

  // State to manage the content of replies for each comment
  const [replyInputs, setReplyInputs] = useState<{ [key: number]: string }>({});

  // State to manage the visibility of the "create post" dialog
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);

  // State to manage the content of a new post
  const [newPostContent, setNewPostContent] = useState('');

  // Function to filter posts by tag
  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  // Function to open the dialog for a specific post
  const handleOpenDialog = (post: Post) => {
    setCurrentPost(post);
    setIsDialogOpen(true);
  };

  // Function to close the post dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setPopupComment('');
  };

  // Function to add a new comment to the current post
  const handleAddPopupComment = () => {
    if (popupComment.trim() && currentPost) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post === currentPost
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  { user: 'Anonymous', date: new Date().toISOString(), content: popupComment, replies: [] },
                ],
              }
            : post
        )
      );
      handleCloseDialog();
    }
  };

  // Function to handle changes to the reply input
  const handleReplyChange = (index: number, value: string) => {
    setReplyInputs((prev) => ({ ...prev, [index]: value }));
  };

  // Function to add a reply to a specific comment
  const handleAddReply = (commentIndex: number) => {
    if (currentPost && replyInputs[commentIndex]?.trim()) {
      const newReply: Comment = {
        user: 'Anonymous',
        date: new Date().toISOString(),
        content: replyInputs[commentIndex],
      };

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post === currentPost
            ? {
                ...post,
                comments: post.comments.map((comment, index) =>
                  index === commentIndex
                    ? { ...comment, replies: [...(comment.replies || []), newReply] }
                    : comment
                ),
              }
            : post
        )
      );

      setReplyInputs((prev) => {
        const updated = { ...prev };
        delete updated[commentIndex];
        return updated;
      });
    }
  };

  // Function to open the "create post" dialog
  const handleOpenPostDialog = () => {
    setIsPostDialogOpen(true);
  };

  // Function to close the "create post" dialog
  const handleClosePostDialog = () => {
    setIsPostDialogOpen(false);
    setNewPostContent('');
  };

  // Function to add a new post to the discussion
  const handleAddNewPost = () => {
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
      handleClosePostDialog();
    }
  };

  // Filter and sort the posts based on the selected filter and tag
  const filteredPosts = [...posts]
    .filter((post) =>
      selectedTag && selectedTag !== 'All' ? post.tags.includes(selectedTag) : true
    )
    .sort((a, b) => {
      switch (filter) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'mostRelevant':
          return b.likes - a.likes;
        case 'mostActive':
          return b.comments.length - a.comments.length;
        default:
          throw new Error(`Unknown filter type: ${filter}`);
      }
    });

  return (
    <Page sx={{ height: '100%', overflowY: 'auto', padding: '20px', overflowX: 'hidden' }}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom>
        Discussion
      </Typography>
      
      {/* Dropdown to filter posts */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="mostRelevant">Most Relevant</MenuItem>
          <MenuItem value="mostActive">Most Active</MenuItem>
        </Select>
      </FormControl>
      
      {/* Tag filters */}
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
      
      {/* Placeholder for creating a new post */}
      <Card
        sx={{
          width: '100%',
          padding: 2,
          marginBottom: 2,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: '#f5f5f5',
        }}
        onClick={handleOpenPostDialog}
      >
        <Typography variant="body1" color="textSecondary">
          Click here to create a post...
        </Typography>
      </Card>
      
      {/* List of filtered posts */}
      {filteredPosts.map((post, index) => (
        <Card key={index} sx={{ width: '100%', padding: 2, marginBottom: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">
            {post.user} • {new Date(post.date).toLocaleString()}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            {post.title}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            {post.content.length > 100
              ? `${post.content.slice(0, 100)}...`
              : post.content}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            <IconButton onClick={() => handleOpenDialog(post)}>
              💬 {post.comments.length} Comments
            </IconButton>
            <IconButton>👍 {post.likes} Likes</IconButton>
          </div>
        </Card>
      ))}
      
      {/* Dialog to show post details and comments */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>{currentPost?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {currentPost?.user} • {currentPost && new Date(currentPost.date).toLocaleString()}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {currentPost?.content}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Comments
          </Typography>
          {currentPost?.comments.map((comment, index) => (
            <Card key={index} sx={{ padding: 2, marginBottom: 1 }}>
              <Typography variant="subtitle2">{comment.user}</Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(comment.date).toLocaleString()}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {comment.content}
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <IconButton
                  size="small"
                  onClick={() =>
                    setReplyInputs((prev) => ({
                      ...prev,
                      [index]: prev[index] !== undefined ? undefined : '',
                    }))
                  }
                >
                  💬 Reply
                </IconButton>
                <IconButton size="small">👍 Like</IconButton>
              </div>
              {replyInputs[index] !== undefined && (
                <div
                  style={{
                    marginTop: 10,
                    paddingLeft: 16,
                    borderLeft: '2px solid #e0e0e0',
                  }}
                >
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    variant="outlined"
                    placeholder="Write your reply..."
                    value={replyInputs[index]}
                    onChange={(e) => handleReplyChange(index, e.target.value)}
                    sx={{ marginBottom: 1 }}
                  />
                  <div style={{ display: 'flex', gap: '10px', marginTop: 5 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() =>
                        setReplyInputs((prev) => {
                          const updated = { ...prev };
                          delete updated[index];
                          return updated;
                        })
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddReply(index)}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              )}
              {comment.replies && comment.replies.length > 0 && (
                <div style={{ marginTop: 10, paddingLeft: 16, borderLeft: '2px solid #e0e0e0' }}>
                  {comment.replies.map((reply, replyIndex) => (
                    <Card key={replyIndex} sx={{ padding: 1, marginBottom: 1, backgroundColor: '#f9f9f9' }}>
                      <Typography variant="subtitle2">{reply.user}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {new Date(reply.date).toLocaleString()}
                      </Typography>
                      <Typography variant="body2">{reply.content}</Typography>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <IconButton size="small">👍 Like</IconButton>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          ))}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Add a Comment
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Write your comment here..."
            value={popupComment}
            onChange={(e) => setPopupComment(e.target.value)}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddPopupComment} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialog to create a new post */}
      <Dialog open={isPostDialogOpen} onClose={handleClosePostDialog} fullWidth>
        <DialogTitle>Create a New Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Write your post here..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePostDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddNewPost} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
};

export default Discussion;