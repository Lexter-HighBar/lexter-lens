import PostItem from './QuestionItem';
import { useQuestions } from '../../hooks/useQuestions';
import { Question } from '../../lib/types';


type Props = {
  posts: Question[]
  filter: string
  selectedTag: string | null
  openDialog: (post: Question) => void
}

const QuestionList = ({  openDialog }: Props) => {
  // Fetch questions using the custom hook
  const { questions, loading, error } = useQuestions();

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return <p>Error loading questions: {error.message}</p>;
  }


  return (
    <>
      {Array.isArray(questions) && questions.map((question) => (
        <PostItem key={question.question_id} post={question} openDialog={openDialog}  />
      ))}
    </>
  );
};

export default QuestionList;
