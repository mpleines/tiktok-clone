import { FunctionComponent, ReactNode } from 'react';

interface MaxWidthProps {
  children: ReactNode;
  maxWidth?: number;
}

const MaxWidth: FunctionComponent<MaxWidthProps> = ({
  children,
  maxWidth = 1200,
}) => {
  return (
    <div style={{ maxWidth: `${maxWidth}px`, margin: '0 auto' }}>
      {children}
    </div>
  );
};

export default MaxWidth;
