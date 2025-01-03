import React, { useState } from 'react';
import { Card, Typography, TextField, Button, Chip, Select, MenuItem, FormControl, Stack } from '@mui/material';
import { Page } from '../components/layout/Page';

type Comment = {
  user: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
};

export const QA = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      user: 'John Doe',
      date: '4 Feb 2022',
      title: 'Do the lawyer-inc ??',
      content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      tags: ['Legal', 'Review', 'Feedback'],
      likes: 14,
      comments: 14,
    },
    {
      user: 'Lexter',
      date: '4 Feb 2022',
      title: 'Do the lawyer-inc ??',
      content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      tags: ['Feedback', 'Client', 'Service'],
      likes: 14,
      comments: 14,
    },
  ]);

  const [newComment, setNewComment] = useState('');
  const [filter, setFilter] = useState('oldToNew');
  const [selectedTag, setSelectedTag] = useState<string | null>('All'); // 預設顯示所有評論

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag); // 點擊相同的標籤會取消篩選
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          user: 'Anonymous',
          date: new Date().toLocaleString(),
          title: 'New Comment',
          content: newComment.trim(),
          tags: ['General'],
          likes: 0,
          comments: 0,
        },
      ]);
      setNewComment('');
    }
  };

  const filteredComments = comments.filter((comment) =>
    selectedTag && selectedTag !== 'All' ? comment.tags.includes(selectedTag) : true
  );

  return (
    <Page>
      <Typography variant="h4" gutterBottom>
        Q&A Comments
      </Typography>

      {/* 篩選區：日期排序 */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="oldToNew">Old to New</MenuItem>
          <MenuItem value="newToOld">New to Old</MenuItem>
        </Select>
      </FormControl>

      {/* 篩選區：Tag 按鈕 */}
      <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
        {/* "All" 按鈕 */}
        <Chip
          label="All"
          color={selectedTag === 'All' ? 'primary' : 'default'}
          onClick={() => handleTagFilter('All')}
        />
        {/* 其他標籤按鈕 */}
        {['Legal', 'Review', 'Feedback', 'Client', 'Service'].map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            color={selectedTag === tag ? 'primary' : 'default'}
            onClick={() => handleTagFilter(tag)}
          />
        ))}
      </Stack>

      {/* 評論區 */}
      {filteredComments.map((comment, index) => (
        <Card key={index} sx={{ width: '100%', padding: 2, marginBottom: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">
            {comment.user} • {comment.date}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            {comment.title}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            {comment.content}
          </Typography>
          <div style={{ marginTop: 10 }}>
            {/* 卡片內的可點擊 Chip */}
            {comment.tags.map((tag, idx) => (
              <Chip
                key={idx}
                label={tag}
                color={selectedTag === tag ? 'primary' : 'default'}
                onClick={() => handleTagFilter(tag)} // 點擊後篩選
                sx={{ marginRight: 1 }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            <Typography variant="body2" color="textSecondary">
              💬 {comment.comments} Comments
            </Typography>
            <Typography variant="body2" color="textSecondary">
              👍 {comment.likes} Likes
            </Typography>
          </div>
        </Card>
      ))}

      {/* 新增評論區 */}
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
