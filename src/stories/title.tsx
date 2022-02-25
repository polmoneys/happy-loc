import { ReactNode } from "react";

import { HelveticaNeue, HelveticaNeueBold } from "@/components/Font/Font";
import Shelf from "@/components/Shelf/Shelf";

import styles from "./title.module.css";

interface Props {
  children: string | ReactNode;
  "data-testid"?: string;
}

const Title = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <Shelf p={3} className={styles.root}>
      <HelveticaNeueBold size={6} className="mr-auto" {...rest}>
        {children}
      </HelveticaNeueBold>
      <HelveticaNeue>V 1.0</HelveticaNeue>
    </Shelf>
  );
};

export default Title;
