import { DivProps } from "@/props_types";
import { $cl } from "@/utils";
import styles from "./Video.module.scss";

export interface VideoProps extends DivProps {
  src: string;
}

function Video ({
  src,
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
    </div>
  );
}

export default Video;
