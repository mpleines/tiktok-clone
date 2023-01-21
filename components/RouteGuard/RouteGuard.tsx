import { useSession } from 'next-auth/react';
import { FunctionComponent, ReactNode } from 'react';
import Welcome from '../Welcome/Welcome';

interface RouteGuardProps {
  children: ReactNode;
}

const RouteGuard: FunctionComponent<RouteGuardProps> = ({ children }) => {
  const { data: session } = useSession();

  if (session == null) {
    return <Welcome />;
  }

  return <>{children}</>;
};

export default RouteGuard;
