import { Post as PostType, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import useSWR from "swr";
import Avatar from "../../components/Avatar/Avatar";
import Page from "../../components/Page/Page";
import Post from "../../components/Post/Post";
import RouteGuard from "../../components/RouteGuard/RouteGuard";
import { fetcher } from "../../services/ApiService";
import Button from "../../components/Button/Button";

const MyPosts: FunctionComponent = () => {
  const session = useSession();
  const userId = session.data?.user.id;
  const router = useRouter();
  const { id: authorId } = router.query;

  const isOwnProfile = userId === Number(authorId);

  const { data, error } = useSWR<{ posts: PostType[]; user: User }>(
    authorId ? [`/api/profile/${authorId}`, authorId] : null,
    fetcher
  );

  const { posts, user } = data ?? {};

  const deletePost = async (postId: Number) => {
    fetch(`api/posts/${postId}`, { method: "DELETE" });
  };

  return (
    <RouteGuard>
      <Page>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "32px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Avatar avatarUrl={user?.avatar} size="large" />
            <div>
              <h3 style={{ padding: 0, margin: 0 }}>{user?.name}</h3>
              <div style={{ color: "lightgrey" }}>{user?.username}</div>
            </div>
          </div>
          <Button title="Follow" onClick={() => null} />
        </div>

        {error ? (
          <span>Something went wrong</span>
        ) : posts?.length === 0 ? (
          <span>No posts yet</span>
        ) : (
          posts?.map((post) => (
            <Post
              key={post.id}
              withHeader={false}
              post={post}
              onDelete={isOwnProfile ? () => deletePost(post.id) : undefined}
            />
          ))
        )}
      </Page>
    </RouteGuard>
  );
};

export default MyPosts;
