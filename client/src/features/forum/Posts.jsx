import { useNavigate } from "react-router-dom";

// Forum post list component
// Displays posts under a specific topic
export default function PostList() {
  let nav = useNavigate();
  return (
    <div>
      <h2>Posts</h2>
      <p>Posts for the selected topic will appear here</p>
      <button onClick={() => nav(-1)}>Go Back</button>
    </div>
  );
}
