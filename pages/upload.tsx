import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  ChangeEvent,
  FunctionComponent,
  useId,
  useMemo,
  useState,
} from 'react';
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
}

const Upload: FunctionComponent<UploadProps> = () => {
  const session = useSession();
  const [description, setDescription] = useState<string>('');
  const [videoBlob, setVideoBlob] = useState<Blob>();
  const [uploadingState, setUploadingState] = useState<
    'loading' | 'error' | 'success'
  >();
  const [showCamera, setShowCamera] = useState(false);
  const id = useId();
  const router = useRouter();

  const videoUrl = useMemo(
    () => (videoBlob ? URL.createObjectURL(videoBlob) : undefined),
    [videoBlob]
  );

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
    };

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
      .then(() => router.push('/'))
      .catch((err) => setUploadingState('error'));
  };

  return (
    <Page>
      <h1>Upload a Video</h1>
      <p>Upload a new Video with your account</p>
      {videoUrl == null && (
        <div
          style={{
            width: '100%',
            height: '500px',
            borderRadius: '5px',
            background: 'var(--grey)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
          }}
        >
          <Button title="Record a Video" onClick={() => setShowCamera(true)} />
        </div>
      )}
      {videoUrl != null && (
        <video
          src={videoUrl}
          autoPlay
          loop
          style={{ width: '100%', marginBottom: '16px' }}
        />
      )}
      <Input
        label="Beschreibung"
        onChange={setDescription}
        value={description}
      />
      {showCamera && (
        <Camera
          showCamera={showCamera}
          onCancel={() => setShowCamera(false)}
          handleChange={setVideoBlob}
        />
      )}
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button title="Post Video" onClick={handleUpload} />
      </div>
      {uploadingState === 'loading' && <span>Loading</span>}
    </Page>
  );
};

export default Upload;
