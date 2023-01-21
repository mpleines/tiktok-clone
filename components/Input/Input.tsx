import { FunctionComponent, ReactNode } from 'react';
import styles from './Input.module.css';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password';
  label?: string;
}

const Input: FunctionComponent<InputProps> = ({
  type = 'text',
  label,
  onChange,
  value,
}) => {
  return (
    <label htmlFor={label} className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id={label}
      />
    </label>
  );
};

export default Input;
