import { PrismaClient } from '@prisma/client';
import { signOut, useSession } from 'next-auth/react';
import { FunctionComponent, useEffect, useState } from 'react';
import BottomActions from '../components/BottomActions/BottomActions';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Page from '../components/Page/Page';

interface SettingsProps {}

const Settings: FunctionComponent<SettingsProps> = () => {
  const session = useSession();
  const user = session?.data?.user;

  const [username, setUsername] = useState<string>();
  const [fullName, setFullName] = useState<string>();

  useEffect(() => {
    setUsername(user.username);
    setFullName(user.name);
  }, [user]);

  return (
    <Page sessionRequired>
      <h1>Settings</h1>

      <Input
        label="Username"
        value={username}
        onChange={() => null}
        type="text"
      />
      <Input
        label="Full Name"
        value={fullName}
        onChange={() => null}
        type="text"
      />
      <BottomActions>
        <Button title="Save" onClick={() => null} />
        <Button title="Logout" onClick={() => signOut({ callbackUrl: '/' })} />
      </BottomActions>
    </Page>
  );
};

export default Settings;
