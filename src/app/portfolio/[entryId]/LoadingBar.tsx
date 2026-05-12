'use client';

import { usePlaySound } from '@/hooks/usePlaySound';
import { RefObject, useEffect, useRef } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import styles from './LoadingBar.module.scss';

export interface LoadingBarProps {
  message: string;
  onFinish?: () => void;
}

function LoadingBar ({
  message,
  onFinish,
}: LoadingBarProps) {
  const sound = usePlaySound("/sfx/loading.ogg");
  const soundRef = useRef(sound);

  const containerRef = useRef<HTMLDivElement>(null);
  const percRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    soundRef.current = sound;
  });

  useEffect(() => {
    if (!containerRef.current) return;

    function handle (evt: AnimationEvent) {
      if (!onFinish) return;

      if (evt.animationName === styles.endLoadAnim) {
        setTimeout(() => onFinish?.(), 200);
      }
    }

    containerRef.current.addEventListener('animationend', handle);

    return () => {
      containerRef.current?.removeEventListener('animationend', handle);
    }
  }, [containerRef.current]);

  useEffect(() => {
    const timeout = setTimeout(() => soundRef.current.play(), 200);
    return () => {
      soundRef.current.stop();
      clearTimeout(timeout);
    }
  }, []);

  return (
    <div className={styles.screen}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.box}>
          <div className={styles.info}>
            <div className={styles.message}>
              <Typewriter
                words={[message]}
                cursor
                cursorStyle="_"
                typeSpeed={35}
              />
            </div>
            <div className={styles.perc}>
              <div ref={percRef} className={styles.value}>0 %</div>
            </div>
          </div>
          <div className={styles.loadingBar}>
            <_LoadingBar textRef={percRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

// This is done in a weird way so <Typewriter /> doesn't break (it breaks if we
// change a state too often in its component).
interface _LoadingBarProps {
  textRef: RefObject<HTMLDivElement>;
}

function _LoadingBar ({
  textRef,
}: _LoadingBarProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;

    function update () {
      if (progressRef.current && textRef.current) {
        const value = getComputedStyle(progressRef.current)
          .getPropertyValue("--progress");
        const progress = Math.round(parseFloat(value));

        textRef.current.textContent = progress + " %";
      }
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div ref={progressRef} className={styles.progress} />
  );
}

export default LoadingBar;
