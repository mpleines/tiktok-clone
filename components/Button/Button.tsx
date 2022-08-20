import React, { FunctionComponent, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  title: string;
  onClick: () => void;
  icon?: ReactNode;
  color?: 'primary';
}

const Button: FunctionComponent<ButtonProps> = ({
  title,
  onClick,
  icon,
  color = 'primary',
}) => {
  return (
    <button onClick={onClick} className={styles[color]}>
      {icon && icon}
      {title}
    </button>
  );
};

export default Button;
