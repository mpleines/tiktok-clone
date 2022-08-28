import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import styles from './Avatar.module.css';
import Placeholder from './placeholder.png';

interface AvatarProps {
  imgSrc?: string;
}

const Avatar: FunctionComponent<AvatarProps> = ({ imgSrc = Placeholder }) => {
  const session = useSession();
  const { image } = session.data?.user;

  const img = session.status === 'loading' ? undefined : image ? image : imgSrc;

  return (
    <Image
      alt="User Avatar"
      src={img}
      className={styles.wrapper}
      width="32"
      height="32"
    />
  );
};

export default Avatar;
