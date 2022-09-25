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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 1,
      }
    );

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, [videoElement]);

  useEffect(() => {
    if (isVisible) {
      videoElement!.currentTime = 0;
      videoElement?.play();
      setIsPlaying(true);
    } else {
      videoElement?.pause();
      setIsPlaying(false);
    }
  }, [isVisible, videoElement]);

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
