import { ReactNode } from "react";

import { HelveticaNeue, HelveticaNeueBold } from "@/components/Font/Font";
import Shelf from "@/components/Shelf/Shelf";

import styles from "./frame.module.css";

interface Props {
  children: ReactNode;
  title: string;
  subtitle?: string;
  noGap?: boolean;
}

const Frame = (props: Props) => {
  const { children, title, subtitle, noGap = false } = props;
  return (
    <div className="fix">
      <Shelf
        className={styles.root}
        gap={noGap ? "0" : "var(--gap-5)"}
        direction="column"
      >
        <Shelf pb={4} className={styles.title}>
          <HelveticaNeueBold> {title}</HelveticaNeueBold>
          <HelveticaNeue className="ml-auto"> {subtitle}</HelveticaNeue>
        </Shelf>
        {children}
      </Shelf>
    </div>
  );
};

export default Frame;
