import { FunctionComponent, useEffect, useState } from 'react';
import { FiPlayCircle, FiStopCircle } from 'react-icons/fi';
import styles from './Video.module.css';

interface VideoProps {
  src: string;
}

const Video: FunctionComponent<VideoProps> = ({ src }) => {
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null
  );

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePausePlay = async () => {
    if (videoElement == null) {
      return;
    }

    if (videoElement.paused) {
      await videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={styles.videoWrapper}>
      <button className={styles.playButton} onClick={togglePausePlay}>
        {isPlaying ? (
          <FiStopCircle size="32" color="white" />
        ) : (
          <FiPlayCircle size="32" color="white" />
        )}
      </button>
      <video
        ref={(ref) => setVideoElement(ref)}
        src={src}
        loop
        crossOrigin="true"
        onClick={togglePausePlay}
        className={styles.video}
      />
    </div>
  );
};

export default Video;
