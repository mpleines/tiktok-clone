import Image from "next/image";
import { FunctionComponent } from "react";
import styles from "./Avatar.module.css";
import Placeholder from "./placeholder.png";

interface AvatarProps {
  avatarUrl: string | null | undefined;
  size?: "medium" | "large";
}

const Avatar: FunctionComponent<AvatarProps> = ({
  avatarUrl,
  size = "medium",
}) => {
  const img = avatarUrl ?? Placeholder;

  return (
    <Image
      alt="User Avatar"
      src={img}
      className={styles.wrapper}
      width={size === "large" ? "64" : "32"}
      height={size === "large" ? "64" : "32"}
    />
  );
};

export default Avatar;
