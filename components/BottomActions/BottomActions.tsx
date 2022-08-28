import React, { FunctionComponent, ReactNode } from 'react';
import styles from './BottomActions.module.css';

interface BottomActionsProps {
  children: ReactNode;
  justify?: 'start' | 'end';
}

const BottomActions: FunctionComponent<BottomActionsProps> = ({
  children,
  justify = 'end',
}) => {
  return (
    <div
      className={styles.wrapper}
      style={{ '--justify': justify } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default BottomActions;
