import { SpanProps } from '@/types';
import { $cl } from '@/utils';
import styles from './GlitchText.module.scss';

export interface GlitchTextProps extends SpanProps {
  text: string;
}

function GlitchText ({
  text,
  className,
  ...spanProps
}: GlitchTextProps) {

  return (
    <span
      className={$cl(styles.span, styles.pathxs, className)}
      data-text={text}
      {...spanProps}
    >
      <span>{text}</span>
      <span>{text}</span>
      <span>{text}</span>
      <span>{text}</span>
    </span>
  );
}

export default GlitchText;
