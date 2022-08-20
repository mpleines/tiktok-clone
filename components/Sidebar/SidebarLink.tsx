import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FunctionComponent } from 'react';
import { IconType } from 'react-icons';
import styles from './SidebarLink.module.css';

interface SidebarLinkProps {
  title: string;
  href: string;
  Icon?: IconType;
}

const SidebarLink: FunctionComponent<SidebarLinkProps> = ({
  title,
  href,
  Icon,
}) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  const color = isActive ? 'var(--primary-color)' : 'initial';

  return (
    <Link href={href}>
      <a className={styles.wrapper}>
        <>
          {Icon && <Icon color={color} />}
          <div
            className={styles.title}
            style={
              {
                '--color': color,
              } as React.CSSProperties
            }
          >
            {title}
          </div>
        </>
      </a>
    </Link>
  );
};

export default SidebarLink;
