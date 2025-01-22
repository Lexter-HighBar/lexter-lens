import { useContext, useState, useEffect } from 'react';
import { UserDataApiContext } from '../lib/contexts/UserDataApiContext'; // Import the new context

type Comment = {
  _id: string;
  Username: string;
  Comment: string;
  createdAt: string;
  updatedAt: string;
};

const Comments = () => {
  const api = useContext(UserDataApiContext); // Use the new context
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [fetchTriggered, setFetchTriggered] = useState<boolean>(false); // Track if fetch is triggered

  // Function to fetch comments manually
  const fetchComments = async () => {
    if (api) {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const data = await api.get<Comment[]>('/userdata'); // Make request to the proxy
        console.log('Fetched data:', data); // Debugging the fetched data
        setComments(data);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching comments:', err); // Debugging the error
      } finally {
        setLoading(false); // Set loading to false once done
      }
    }
  };
  

  // Automatically fetch comments on component mount if not triggered manually
  useEffect(() => {
    if (!fetchTriggered) {
      fetchComments(); // Fetch comments initially if not manually triggered
    }
  }, [api, fetchTriggered]);

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>Comments</h3>
      <button onClick={() => { setFetchTriggered(true); fetchComments(); }}>
        Fetch Comments
      </button>

      {/* Optional: Debugging output */}
      <pre>{JSON.stringify({ comments, loading, error }, null, 2)}</pre>

      <ul>
        {comments.length > 0 ? (
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
