import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './Label.module.css';

interface LabelProps extends PropsWithChildren {
  text: string;
}

const Label: FunctionComponent<LabelProps> = ({ text, children }) => {
  return (
    <label htmlFor={text} className={styles.wrapper}>
      <span className={styles.label}>{text}</span>
      {children}
    </label>
  );
};

export default Label;
