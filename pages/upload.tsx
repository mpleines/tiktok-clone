import { useSession } from 'next-auth/react';
import { FunctionComponent, useState } from 'react';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Page from '../components/Page/Page';

interface UploadProps {}

const Upload: FunctionComponent<UploadProps> = () => {
  const session = useSession();
  const [description, setDescription] = useState<string>();
  const [videoUrl, setVideoUrl] = useState<string>('');

  const handleUpload = async () => {
    await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
        videoUrl,
        authorName: session?.data?.user.fullname,
        authorId: session.data?.user.id,
      }),
    });
  };

  return (
    <Page>
      <h1>Video hochladen</h1>
      <p>Veröffentliche ein Video bei deinem Konto</p>
      <Input label="Beschreibung" onChange={setDescription} />
      <input type="file" onChange={console.log} accept="video/*" />
      <Button title="Veröffentlichen" onClick={handleUpload} />
    </Page>
  );
};

export default Upload;
