import { useSession } from 'next-auth/react';
import { ChangeEvent, FunctionComponent, useId, useState } from 'react';
import Button from '../components/Button/Button';
import Camera from '../components/Camera/Camera';
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
  const [videoBlob, setVideoBlob] = useState<Blob>();
  const [uploadingState, setUploadingState] = useState<'loading' | 'error' | 'success'>();
  const [showCamera, setShowCamera] = useState(false);
  const id = useId();

  const handleUpload = async () => {
    if (videoBlob == null) {
      console.error('Upload not possible, no video found');
    }

    const file = new File([videoBlob!], id);

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

  return (
    <Page>
      <h1>Upload a Video</h1>
      <p>Upload a new Video with your account</p>
      {videoBlob && (
        <video src={URL.createObjectURL(videoBlob)} autoPlay loop style={{ width: '100%' }}/>
      )}
      <Input label="Beschreibung" onChange={setDescription} />
      {showCamera && (
        <Camera showCamera={showCamera} onCancel={() => setShowCamera(false)} handleChange={setVideoBlob} />
      )}
      <Button title="Record a Video" onClick={() => setShowCamera(true)} />
      <Button title="Post Video" onClick={handleUpload} />
      {uploadingState === 'loading' && <span>Loading</span>}
    </Page>
  );
};

export default Upload;
