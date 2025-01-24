import { useState } from 'react'
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Page } from '../components/layout/Page'
import PostDialog from '../components/PostDialog'
import PostList from '../components/PostList'
import { Post, Question } from '../lib/types'
import { useQuestions } from '../hooks/useQuestions';
import Comments from '../components/Comments'

// Discussion page component
export const Discussion = () => {
  // State to manage all posts
  const { questions  } = useQuestions()
  const [posts, setPosts] = useState<Post[]>([])


  // State for the current filter type
  const [filter, setFilter] = useState<string>('All')

  // State for the currently selected tag filter
  const [selectedTag, setSelectedTag] = useState<string | null>('All')

  // State to manage the visibility of the post details dialog
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  // State to store the currently selected post
  const [currentPost, setCurrentPost] = useState<Question | null>(null)

  // State to manage the content of a new comment
  // const [popupComment, setPopupComment] = useState<string | null>('')

  // State to manage the visibility of the "create post" dialog
  const [isPostDialogOpen, setIsPostDialogOpen] = useState<boolean>(false)

  // State to manage the content of a new post
  const [newPostContent, setNewPostContent] = useState<string | null>('')

  // Function to filter posts by tag
  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag)
  }

  // Function to open the dialog for a specific post
  const handleOpenDialog = (question: Question) => {
    setCurrentPost(question)
    setIsDialogOpen(true)
  }

  // Function to close the post dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    // setPopupComment('')
  }

 
  // Function to open the "create post" dialog
  const handleOpenPostDialog = () => {
    setIsPostDialogOpen(true)
  }

  // Function to close the "create post" dialog
  const handleClosePostDialog = () => {
    setIsPostDialogOpen(false)
    setNewPostContent('')
  }

  // Function to add a new post to the discussion
  const handleAddNewPost = () => {
    const newPost: Post = {
      id: (posts.length + 1).toString(),
      user: 'Anonymous',
      date: new Date().toISOString(),
      title: 'New Post',
      content: newPostContent || '',
      tags: ['General'],
      likes: 0,
      comments: [],
    }
    setPosts([newPost, ...posts])
    handleClosePostDialog()
  }


  return (
    <Page
      sx={{
        height: '100%',
        overflowY: 'auto',
        padding: '20px',
        overflowX: 'hidden',
      }}
    >
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
        {['Legal', 'Review', 'Feedback', 'Client', 'Service'].map(
          (tag, index) => (
            <Chip
              key={index}
              label={tag}
              color={selectedTag === tag ? 'primary' : 'default'}
              onClick={() => handleTagFilter(tag)}
            />
          ),
        )}
      </Stack>

      {/* Placeholder for creating a new post */}
      <Paper
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
      </Paper>

      {/* List of filtered posts */}
      <Comments />
      <PostList
        posts={questions }
        filter={filter}
        selectedTag={selectedTag}
        openDialog={handleOpenDialog}
      />

      {/* Dialog to show/api/comments post details and comments */}

      <PostDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        isEditing={false}
        onSubmit={handleAddNewPost}
        currentPost={currentPost as Question}
      />

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
          <Button
            onClick={handleAddNewPost}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  )
}

export default Discussion
