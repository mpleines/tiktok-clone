import Image from 'next/image';
import { FunctionComponent } from 'react';
import styles from './Avatar.module.css';
import Placeholder from './placeholder.png';

interface AvatarProps {
  imgSrc?: string;
}

const Avatar: FunctionComponent<AvatarProps> = ({ imgSrc = Placeholder }) => {
  return (
    <Image
      alt="User Avatar"
      src={imgSrc}
      className={styles.wrapper}
      width="32"
      height="32"
    />
  );
};

export default Avatar;
