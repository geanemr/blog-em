import { useQuery } from "@tanstack/react-query";
import { fetchComments, fetchPosts } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation }) {
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
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isPending && (
          <p className="loading">Deleting the post</p>
        )}
        {deleteMutation.isError && (
          <p className="error">
            Error deleting the post: {deleteMutation.error.toString()}{" "}
          </p>
        )}
         {deleteMutation.isSuccess && (
          <p className="loading">The post was (not) deleted!</p>
        )}
      </div>
      <div>
        <button>Update title</button>
      </div>
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
