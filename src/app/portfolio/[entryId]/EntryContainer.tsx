import EntryContainer_Background from './EntryContainer.Background';
import styles from './EntryContainer.module.scss';

export interface EntryContainerProps {
  children: React.ReactNode;
}

function EntryContainer ({
  children,
}: EntryContainerProps) {
  return (
    <div className={styles.viewport}>
      <EntryContainer_Background />
      <div className={styles.v2}>
        <div className={styles.container}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryContainer;
