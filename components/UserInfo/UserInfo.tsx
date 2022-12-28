import { Post } from "@prisma/client";
import Link from "next/link";
import { FunctionComponent } from "react";
import Avatar from "../Avatar/Avatar";
import styles from "./UserInfo.module.css";

interface UserInfoProps {
  authorId: number;
  authorName: string;
  avatarUrl?: string;
}

const UserInfo: FunctionComponent<UserInfoProps> = ({
  authorId,
  authorName,
  avatarUrl,
}) => {
  return (
    <div className={styles.userLink}>
      <Link href={`/profile/${authorId}`}>
        <Avatar avatarUrl={avatarUrl} />
      </Link>
      <Link href={`/profile/${authorId}`}>
        <h3 className={styles.authorName}>{authorName}</h3>
      </Link>
    </div>
  );
};

export default UserInfo;
