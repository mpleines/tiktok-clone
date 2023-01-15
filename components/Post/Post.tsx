import { Post } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import UserInfo from '../UserInfo/UserInfo';
import Video from '../Video/Video';
import styles from './Post.module.css';
import { FiCheck } from 'react-icons/fi';
import { useIsFollowing } from '../../hooks/useIsFollowing';

interface PostProps {
  post: Post;
  avatarUrl?: string;
  onDelete?: () => void;
  onFollow?: (userId: number) => void;
  withHeader?: boolean;
}

const Post: FunctionComponent<PostProps> = ({
  post,
  onDelete,
  onFollow,
  avatarUrl,
  withHeader = true,
}) => {
  const user = useSession().data?.user;
  const isFollowing = useIsFollowing(post.authorId!);
  const isOwnPost = user?.id === post?.authorId;

  return (
    <div className={styles.wrapper}>
      {withHeader && (
        <div className={styles.header}>
          <UserInfo
            authorId={post.authorId!}
            authorName={post.authorName!}
            avatarUrl={avatarUrl}
          />
          {isOwnPost ? null : onDelete ? (
            <Button onClick={onDelete} title="Delete" />
          ) : (
            <Button
              onClick={() => post.authorId && onFollow?.(post.authorId)}
              title={isFollowing ? 'Following' : 'Follow'}
              icon={isFollowing ? <FiCheck /> : null}
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
