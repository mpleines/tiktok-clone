import { FunctionComponent } from 'react';
import { FiHome, FiUser } from 'react-icons/fi';
import styles from './Sidebar.module.css';
import SidebarLink from './SidebarLink';

interface SidebarProps {}

const Sidebar: FunctionComponent<SidebarProps> = () => {
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
