'use client';

import { useState } from 'react';
import EntryContainer_Background from './EntryContainer.Background';
import styles from './EntryContainer.module.scss';
import LoadingBar from './LoadingBar';

export interface EntryContainerProps {
  children: React.ReactNode;
}

function EntryContainer ({
  children,
}: EntryContainerProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.viewport}>
      <EntryContainer_Background />
      <div className={styles.transformedViewport}>
        {loaded === false && <LoadingBar
          message="Decrypting content"
          onFinish={() => setLoaded(true)}
        />}
        <div
          className={styles.container}
          style={{
            visibility: loaded ? 'visible' : 'hidden',
          }}
        >
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryContainer;
