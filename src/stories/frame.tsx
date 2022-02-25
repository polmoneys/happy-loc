import { ReactNode } from "react";

import { HelveticaNeue, HelveticaNeueBold } from "@/components/Font/Font";
import Shelf from "@/components/Shelf/Shelf";

import styles from "./frame.module.css";

interface Props {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const Frame = (props: Props) => {
  const { children, title, subtitle } = props;
  return (
    <Shelf
      as="section"
      className={styles.root}
      gap="var(--gap-5)"
      direction="column"
    >
      <Shelf pb={4} className={styles.title}>
        <HelveticaNeueBold> {title}</HelveticaNeueBold>
        <HelveticaNeue className="ml-auto"> {subtitle}</HelveticaNeue>
      </Shelf>
      {children}
    </Shelf>
  );
};

export default Frame;
