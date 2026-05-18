import { DivProps } from "@/props_types";
import { $cl } from "@/utils";
import styles from "./Video.module.scss";

export interface VideoProps extends DivProps {
  src: string;
  footnote?: string;
}

function Video ({
  src,
  footnote,
  className,
  ...divProps
}: VideoProps) {

  return (
    <div
      className={$cl(styles.container, className)}
      {...divProps}
    >
      <video controls>
        <source src={src} />
      </video>
      {footnote && <div
        className={styles.footnote}
      >
        {footnote}
      </div>}
    </div>
  );
}

export default Video;
