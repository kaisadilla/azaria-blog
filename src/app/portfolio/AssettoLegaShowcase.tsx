import styles from './Showcase.module.scss';

export interface AssettoLegaShowcaseProps {
  
}

function AssettoLegaShowcase (props: AssettoLegaShowcaseProps) {

  return (
    <div className={styles.viewport}>
      <div className={styles.v2}>
        <div className={styles.content}>
          <h1>Assetto Lega</h1>
          <p>
            <strong>Assetto Lega</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AssettoLegaShowcase;
