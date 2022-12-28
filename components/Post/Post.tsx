import { Post } from "@prisma/client";
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
  withHeader?: boolean;
}

const Post: FunctionComponent<PostProps> = ({
  post,
  onDelete,
  avatarUrl,
  withHeader = true,
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
          ) : (
            <Button onClick={() => null} title="Follow" />
          )}
        </div>
      )}

      <div className={styles.description}>{post.description}</div>
      <Video src={post.videoUrl} />
    </div>
  );
};

export default Post;
