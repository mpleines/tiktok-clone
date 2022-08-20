import { FunctionComponent, ReactNode } from 'react';

interface ButtonProps {
  title: string;
  onClick: () => void;
  icon?: ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({ title, onClick, icon }) => {
  return (
    <button onClick={onClick}>
      {icon && icon}
      {title}
    </button>
  );
};

export default Button;
