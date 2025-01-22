import { useState } from 'react';
import { useComments } from '../hooks/useComments';



const Comments = () => {
  const { comments, loading, error } = useComments(); //the custom hook
  const [fetchTriggered, setFetchTriggered] = useState<boolean>(false); // Testing: track manual fetch

  fetchTriggered

  const fetchComments = () => {
    setFetchTriggered(true);
  };

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>Comments</h3>
      <button onClick={fetchComments}>Fetch Comments</button>

      <ul>
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment._id}>
              <strong>{comment.Username}</strong>: {comment.Comment}
            </li>
          ))
        ) : (
          <p>No comments available</p>
        )}
      </ul>
    </div>
  );
};

export default Comments;
