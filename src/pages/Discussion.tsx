import { useState } from 'react'

import { Page } from '../components/layout/Page'
import QuestionDialog from '../components/Discussion/QuestionDialog'
import QuestionList from '../components/Discussion/QuestionsList'
import { Post, Question } from '../lib/types'
import { useQuestions } from '../hooks/useQuestions'

import CreateQuestion from '../components/Discussion/CreateQuestion'

// Discussion page component
export const Discussion = () => {
  // State to manage all posts
  const { questions } = useQuestions()
  const [posts, setPosts] = useState<Post[]>([])

  // State to manage the visibility of the post details dialog
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  // State to store the currently selected post
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)

  // State to manage the content of a new post
  const [newPostContent, setNewPostContent] = useState<string | null>('')

  // Function to open the dialog for a specific post
  const handleOpenDialog = (question: Question) => {
    setCurrentQuestion(question)
    setIsDialogOpen(true)
  }

  // Function to close the post dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  // Function to close the "create post" dialog
  const handleClosePostDialog = () => {
    // setIsPostDialogOpen(false)
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
      {/* Dialog to create a new post */}
      <CreateQuestion />
      <QuestionList
        posts={questions as Question[]}
        filter={''}
        selectedTag={''}
        openDialog={handleOpenDialog}
      />
      {/* Dialog to show/api/comments post details and comments */}

      <QuestionDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        isEditing={false}
        onSubmit={handleAddNewPost}
        currentQuestion={currentQuestion as Question}
      />
    </Page>
  )
}

export default Discussion
