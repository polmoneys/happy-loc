import { ReactNode } from "react";

import { HelveticaNeue, HelveticaNeueBold } from "@/components/Font/Font";
import Shelf from "@/components/Shelf/Shelf";
import useStyles from "@/hooks/UseStyles/UseStyles";
import useSx from "@/hooks/UseSx/UseSx";

import styles from "./frame.module.css";

interface Props {
  children: ReactNode;
  title: string;
  subtitle?: string;
  noGap?: boolean;
  single?: boolean;
}

const Frame = (props: Props) => {
  const { children, title, subtitle, noGap = false, single = false } = props;

  const { output } = useSx({ minFix: "width" });
  const { output: outputRoot } = useStyles(
    styles.root,
    !single && styles.maxHeight
  );

  return (
    <div className={output} style={{ height: single ? "auto" : "100%" }}>
      <Shelf
        className={outputRoot}
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
