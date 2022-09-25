import { FunctionComponent } from 'react';
import { FiHome, FiUser } from 'react-icons/fi';
import useMediaQuery from '../../hooks/useMediaQuery';
import styles from './Sidebar.module.css';
import SidebarLink from './SidebarLink';

interface SidebarProps {}

const Sidebar: FunctionComponent<SidebarProps> = () => {
  const isSmallScreen = useMediaQuery('(max-width: 700px)');

  if (isSmallScreen) {
    return (
      <aside className={styles.smallSidebar}>
        <div className={styles.smallSidebarForYouSection}>
          <SidebarLink href="/" Icon={FiHome} />
          <SidebarLink href="/following" Icon={FiUser} />
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.wrapper}>
      <div className={styles.forYouSection}>
        <SidebarLink title="Für dich" href="/" Icon={FiHome} />
        <SidebarLink title="Folge ich" href="/following" Icon={FiUser} />
      </div>
    </aside>
  );
};

export default Sidebar;
