import { Post as PostType} from "@prisma/client";
import { useSession } from "next-auth/react";
import { FunctionComponent } from "react";
import useSWR from "swr";
import Page from "../components/Page/Page";
import Post from "../components/Post/Post";
import RouteGuard from "../components/RouteGuard/RouteGuard";
import { fetcher } from "../services/ApiService";

const MyPosts: FunctionComponent = () => {
  const { data } = useSession();
  const userId = data?.user?.id as string;
  const { data: posts, error, } = useSWR<PostType[]>(userId ? ['/api/posts', userId] : null, fetcher);

  const deletePost = async (postId: Number) => {
    fetch(`api/posts/${postId}`, { method: "DELETE" });
  };

  return (
    <RouteGuard>
      <Page>
        <h1>My Posts</h1>
         {error  ? (
          <span>Something went wrong</span>
         ) : posts?.length === 0 ? (
          <span>No posts yet</span>
         ) : (
          posts?.map((post) => (
            <Post
              key={post.id}
              description={post.description}
              videoUrl={post.videoUrl}
              author={post.authorName!}
              tags={[]}
              onDelete={() => deletePost(post.id)}/>
          )
        ))}
      </Page>
    </RouteGuard>
  );
}

export default MyPosts;