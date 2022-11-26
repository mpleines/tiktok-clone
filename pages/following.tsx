import { FunctionComponent } from 'react';
import Page from '../components/Page/Page';
import RouteGuard from '../components/RouteGuard/RouteGuard';

interface FollowingProps {}

const Following: FunctionComponent<FollowingProps> = () => {
  return (
    <RouteGuard>
      <Page>
        <div>
          <span> Coming soon...</span>
        </div>
      </Page>
    </RouteGuard>
  );
};

export default Following;
