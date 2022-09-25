import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FunctionComponent } from 'react';
import { IconType } from 'react-icons';
import useMediaQuery from '../../hooks/useMediaQuery';
import styles from './SidebarLink.module.css';

interface SidebarLinkProps {
  href: string;
  title?: string;
  Icon?: IconType;
}

const SidebarLink: FunctionComponent<SidebarLinkProps> = ({
  title,
  href,
  Icon,
}) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  const isSmallScreen = useMediaQuery('(max-width: 700px)');

  const color = isActive ? 'var(--primary-color)' : 'initial';

  return (
    <Link href={href}>
      <a
        className={styles.wrapper}
        style={{ justifyContent: isSmallScreen ? 'center' : 'initial' }}
      >
        <>
          {Icon && <Icon color={color} />}
          {title && (
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
          )}
        </>
      </a>
    </Link>
  );
};

export default SidebarLink;
