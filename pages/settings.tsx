import { signOut, useSession } from 'next-auth/react';
import { FunctionComponent } from 'react';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Page from '../components/Page/Page';

interface SettingsProps {}

const Settings: FunctionComponent<SettingsProps> = () => {
  const session = useSession();
  const user = session?.data?.user;

  return (
    <Page sessionRequired>
      <h2>Profile</h2>

      <Input
        label="Username"
        value={user.username}
        onChange={() => null}
        type="text"
      />
      <Input
        label="Full Name"
        value={user.name}
        onChange={() => null}
        type="text"
      />
      <div>
        <Button title="Save" onClick={() => null} />
        <Button title="Logout" onClick={signOut} />
      </div>
    </Page>
  );
};

export default Settings;
