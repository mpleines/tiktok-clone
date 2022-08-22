import { FunctionComponent } from 'react';
import Page from '../components/Page/Page';

interface FollowingProps {}

const Following: FunctionComponent<FollowingProps> = () => {
  return (
    <Page sessionRequired>
      <span> Coming soon...</span>
    </Page>
  );
};

export default Following;
