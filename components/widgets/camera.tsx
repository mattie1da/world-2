import { useEffect, useRef } from 'react';
import styles from '../../styles/widgets/camera.module.css';
import { cameraReveal } from '../animations/cameraReveal';

import { Polaroids } from '../partials';

export const CameraWidget = () => {
  const promptRef = useRef();

  useEffect(() => {
    cameraReveal(promptRef.current);
  });

  return (
    <>
      <div className={styles.polaroids}>
        <Polaroids positionToCamera />
      </div>
      <p className={styles.polaroidsPrompt} ref={promptRef}>
        hey, take a picture!
      </p>
    </>
  );
};
