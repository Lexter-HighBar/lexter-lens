import { useState } from 'react';
import { Page } from '../components/layout/Page';
import { Typography } from '@mui/material';
import PostList from './PostList';
import PostDialog from './PostDialog';
import CreatePost from './CreatePost';
import Filter from './Filter';

export const Discussion = () => {
  const [posts, setPosts] = useState<Post[]>([]); // State for all posts
  const [currentPost, setCurrentPost] = useState<Post | null>(null); // Selected post
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog visibility
  const [filter, setFilter] = useState<string>('newest'); // Current filter
  const [selectedTag, setSelectedTag] = useState<string | null>('All'); // Current tag filter

  const openDialog = (post: Post) => {
    setCurrentPost(post);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Page sx={{ height: '100%', overflowY: 'auto', padding: '20px', overflowX: 'hidden' }}>
      <Typography variant="h4" gutterBottom>
        Discussion
      </Typography>
      <Filter filter={filter} setFilter={setFilter} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      <CreatePost posts={posts} setPosts={setPosts} />
      <PostList
        posts={posts}
        filter={filter}
        selectedTag={selectedTag}
        openDialog={openDialog}
      />
      <PostDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        currentPost={currentPost}
        setPosts={setPosts}
      />
    </Page>
  );
};
