'use client';

import { useEffect, useRef } from 'react';
import styles from './EntryContainer.module.scss';

const MAX_INDEX = 16; // inclusive

export interface EntryContainer_BackgroundProps {
  
}

function EntryContainer_Background (props: EntryContainer_BackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const index = Math.floor(Math.random() * (MAX_INDEX + 1));

    ref.current?.style.setProperty(
      "--bg-url",
      `url(/img/portfolio/bg-${index}.jpg)`
    );
  }, []);

  return (
    <div ref={ref} className={styles.bg} />
  );
}

export default EntryContainer_Background;
