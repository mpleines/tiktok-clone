import { FunctionComponent } from 'react';
import Page from '../components/Page/Page';

interface FollowingProps {}

const Following: FunctionComponent<FollowingProps> = () => {
  return (
    <Page sessionRequired>
      <div>
        <span> Coming soon...</span>
      </div>
    </Page>
  );
};

export default Following;
