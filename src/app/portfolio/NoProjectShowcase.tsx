import styles from './NoProjectShowcase.module.scss';

export interface NoProjectShowcaseProps {
  message?: string;
}

function NoProjectShowcase ({
  message = "OFFLINE"
}: NoProjectShowcaseProps) {

  return (
    <div className={styles.viewport}>
      <div className={styles.v2}>
        <div className={styles.offline}>
          <div>{message}</div>
          <div>{message}</div>
          <div>{message}</div>
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
}

export default NoProjectShowcase;
