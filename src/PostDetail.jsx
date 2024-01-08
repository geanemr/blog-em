import { useQuery } from "@tanstack/react-query";
import { fetchComments, fetchPosts } from "./api";
import "./PostDetail.css";

export function PostDetail({ post }) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchPosts(post.id),
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    <>
      return <h3>Oops, something went wrong!</h3>
      <p>{error.toString()}</p>
    </>;
  }
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
