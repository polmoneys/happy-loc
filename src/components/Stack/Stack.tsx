/**
 *
 * 2021. Pol Moneys
 * Stack 1.0.0
 * Stack one item over the other. First children will be on top. No positioning involved, magic is CSS Grid.
 * Feedback at polmoneys on github
 *
 */
import { ElementType } from "react";

import useStyles from "../../hooks/UseStyles/UseStyles";
import { DefaultProps } from "../types";
import styles from "./Stack.module.css";

interface Props extends Pick<DefaultProps, "as" | "children"> {
  align?: "start" | "end" | "center";
}

const Stack = (props: Props) => {
  const { as, children, align = "center" } = props;
  const Tag = as || ("div" as ElementType);

  const isStart = align === "start";
  const isEnd = align === "end";

  const { output } = useStyles(
    styles.root,
    isStart && styles.start,
    isEnd && styles.end
  );

  return <Tag className={output}>{children}</Tag>;
};

export default Stack;
