import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import MaxWidth from '../MaxWidth/MaxWidth';
import styles from './Navigation.module.css';

interface NavigationProps {
  openLoginModal: () => void;
}

const Navigation: FunctionComponent<NavigationProps> = ({ openLoginModal }) => {
  const session = useSession();
  const router = useRouter();

  return (
    <nav className={styles.wrapper}>
      <MaxWidth>
        <div className={styles.flex}>
          <div>
            <h1 className={styles.title}>ShigTok</h1>
          </div>
          <div className={styles.actions}>
            {session.data == null ? (
              <Button title="Sign In" onClick={openLoginModal} />
            ) : (
              <>
                <Button
                  title="Hochladen"
                  onClick={() => router.push('/upload')}
                />
                <Link href="/settings" className={styles.avatarLink}>
                  <Avatar />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidth>
    </nav>
  );
};

export default Navigation;
