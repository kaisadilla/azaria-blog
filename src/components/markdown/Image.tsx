import { DivProps } from '@/props_types';
import { $cl } from '@/utils';
import styles from './Image.module.scss';

export interface ImageProps extends DivProps {
  src: string;
  footnote?: string;
}

function Image ({
  src,
  footnote,
  className,
  ...divProps
}: ImageProps) {

  return (
    <div
      className={$cl(styles.container, className)}
      {...divProps}
    >
      <img src={src} />
      {footnote && <div
        className={styles.footnote}
      >
        {footnote}
      </div>}
    </div>
  );
}

export default Image;
