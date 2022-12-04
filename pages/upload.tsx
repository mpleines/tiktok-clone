import { useSession } from 'next-auth/react';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Page from '../components/Page/Page';

interface UploadProps {}

export function toBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

const Upload: FunctionComponent<UploadProps> = () => {
  const session = useSession();
  const [description, setDescription] = useState<string>();
  const [file, setFile] = useState<File | undefined>();
  const [uploadingState, setUploadingState] = useState<'loading' | 'error' | 'success'>();

  const handleUpload = async () => {
    if (file == null) {
      return;
    }

    const base64 = await toBase64(file);

    const fileWithMeta = {
      mimeType: file.type,
      base64,
    }

    setUploadingState('loading');

    fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
        file: fileWithMeta,
        authorName: session?.data?.user.fullname,
        authorId: session.data?.user.id,
      }),
    })
      .then(() => setUploadingState('success'))
      .catch((err) => setUploadingState('error'));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null && e.target.files.length === 0) {
      setFile(undefined);
      return;
    }

    const file = e.target.files![0];
    setFile(file);
  }

  return (
    <Page>
      <h1>Upload a Video</h1>
      <p>Upload a new Video with your account</p>
      <Input label="Beschreibung" onChange={setDescription} />
      <input type="file" onChange={handleFileChange} accept="video/*" />
      <Button title="Veröffentlichen" onClick={handleUpload} />
      {uploadingState === 'loading' && <span>Loading</span>}
    </Page>
  );
};

export default Upload;
