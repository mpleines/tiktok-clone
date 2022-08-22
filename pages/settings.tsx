import { signOut, useSession } from 'next-auth/react';
import { FunctionComponent } from 'react';
import Button from '../components/Button/Button';
import Page from '../components/Page/Page';

interface SettingsProps {}

const Settings: FunctionComponent<SettingsProps> = () => {
  const session = useSession();

  return (
    <Page sessionRequired>
      <h2>Settings</h2>
      <span>Logged in as {session.data?.user?.email}</span>
      <Button title="Logout" onClick={signOut} />
    </Page>
  );
};

export default Settings;
