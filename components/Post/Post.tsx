import { Post } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FunctionComponent } from "react";
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import UserInfo from "../UserInfo/UserInfo";
import Video from "../Video/Video";
import styles from "./Post.module.css";

interface PostProps {
  post: Post;
  avatarUrl?: string;
  onDelete?: () => void;
  isFollowing?: boolean;
  onFollow?: (userId: number) => void;
  withHeader?: boolean;
}

const Post: FunctionComponent<PostProps> = ({
  post,
  onDelete,
  onFollow,
  avatarUrl,
  withHeader = true,
  isFollowing = false,
}) => {
  return (
    <div className={styles.wrapper}>
      {withHeader && (
        <div className={styles.header}>
          <UserInfo
            authorId={post.authorId!}
            authorName={post.authorName!}
            avatarUrl={avatarUrl}
          />
          {onDelete ? (
            <Button onClick={onDelete} title="Delete" />
          ) : isFollowing ? (
            <span>Following</span>
          ) : (
            <Button
              onClick={() => post.authorId && onFollow?.(post.authorId)}
              title="Follow"
            />
          )}
        </div>
      )}

      <div className={styles.description}>{post.description}</div>
      <Video src={post.videoUrl} />
    </div>
  );
};

export default Post;
