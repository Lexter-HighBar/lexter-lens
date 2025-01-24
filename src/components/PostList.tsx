import PostItem from './PostItem';
import { useQuestions } from '../hooks/useQuestions';
import { Question } from '../lib/types';


type Props = {
  posts: Question[]
  filter: string
  selectedTag: string | null
  openDialog: (post: Question) => void
}

const PostList = ({  openDialog }: Props) => {
  // Fetch questions using the custom hook
  const { questions, loading, error } = useQuestions();
console.log(questions)
  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return <p>Error loading questions: {error.message}</p>;
  }


  return (
    <>
    awdawdawd
    {questions && Array.isArray(questions) && questions.length > 0 && (
      <PostItem post={questions[0]} openDialog={openDialog} key={questions[0]._id} />
    )}
    awdawda
    </>
  );
};

export default PostList;
