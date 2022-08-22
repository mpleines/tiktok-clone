import React, { FunctionComponent, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  title: string;
  onClick?: () => void;
  icon?: ReactNode;
  color?: 'primary';
  type?: 'button' | 'submit';
}

const Button: FunctionComponent<ButtonProps> = ({
  title,
  onClick,
  icon,
  color = 'primary',
  type = 'button',
}) => {
  return (
    <button onClick={onClick} className={styles[color]} type={type}>
      {icon && icon}
      {title}
    </button>
  );
};

export default Button;
