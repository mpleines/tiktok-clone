import { FunctionComponent, useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import styles from './Camera.module.css';

const mediaOptions = {
  audio: true,
  video: true,
};

interface CameraProps {
  showCamera: boolean;
  onCancel: () => void;
  handleChange: (blob: Blob) => void;
}

const Camera: FunctionComponent<CameraProps> = ({
  showCamera,
  onCancel,
  handleChange,
}) => {
  const preview = useRef<HTMLVideoElement>(null);
  const mediaStream = useRef<MediaStream>();
  const recorder = useRef<MediaRecorder>();
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (!showCamera) {
      return;
    }

    navigator.mediaDevices.getUserMedia(mediaOptions).then((stream) => {
      mediaStream.current = stream;

      if (preview.current == null) {
        return;
      }

      preview.current.srcObject = stream;
    });
  }, [showCamera]);

  const startRecording = () => {
    if (mediaStream.current == null) {
      console.error('MediaStream is null');
      return;
    }

    recorder.current = new MediaRecorder(mediaStream.current, {
      mimeType: 'video/webm',
    });
    recorder.current.start();

    recorder.current.ondataavailable = (event) => {
      handleChange(event.data);
    };

    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recorder.current == null) {
      console.error('recorder is null');
      return;
    }

    recorder.current!.stop();

    setIsRecording(false);
    closeCameraStopMediaStream();
  };

  const closeCameraStopMediaStream = () => {
    if (mediaStream.current == null) {
      return;
    }

    mediaStream.current.getTracks().forEach((track) => track.stop());
    onCancel();
  };

  return (
    <div className={styles.wrapper}>
      <video
        ref={preview}
        className={styles.camera}
        autoPlay
        muted
        playsInline
        controls={false}
      />
      <div className={styles.actions}>
        <Button
          onClick={() => (isRecording ? stopRecording() : startRecording())}
          title={isRecording ? 'Stop' : 'Start'}
        />
      </div>
      <div className={styles.topActions}>
        <Button onClick={closeCameraStopMediaStream} title="Close" />
      </div>
    </div>
  );
};

export default Camera;
