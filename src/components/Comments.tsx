import { useState } from "react";
import { useComments } from "../hooks/useComments";

const Comments = () => {
  const { comments, loading, error } = useComments(); // Custom hook
  const [fetchTriggered, setFetchTriggered] = useState<boolean>(false); // Track manual fetch

  console.log("Comments:", comments);
  console.log("Fetch Triggered:", fetchTriggered); 

  const fetchComments = () => {
    setFetchTriggered(true);
  };

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>Comments</h3>
      <button onClick={fetchComments}>Fetch Comments</button>

      <p>Fetch Triggered: {fetchTriggered ? "Yes" : "No"}</p> {/* ✅ Used in JSX */}

      <ul>
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment._id}>
              <strong>{comment.content}</strong>: {comment.parentId}
            </li>
          ))
        ) : (
          <p>No zcomments available</p>
        )}
      </ul>
    </div>
  );
};

export default Comments;