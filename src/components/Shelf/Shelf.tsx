/**
 *
 * 2022. Pol Moneys
 * Shelf 1.0.0
 * Shelf is a box with direction and gap to provide space around content.
 * Feedback at polmoneys on github
 *
 */
import { ElementType } from "react";

import useStyles from "../../hooks/UseStyles/UseStyles";
import { CSSProps, DefaultProps } from "../types";
import styles from "./Shelf.module.css";

export interface Props
  extends Pick<DefaultProps, "as" | "className" | "children"> {
  gap?: string;
  direction?: "row" | "column";
  wrap?: boolean;
  p?: 1 | 2 | 3 | 4 | 5;
  py?: 1 | 2 | 3 | 4 | 5;
  px?: 1 | 2 | 3 | 4 | 5;
  pt?: 1 | 2 | 3 | 4 | 5;
  pb?: 1 | 2 | 3 | 4 | 5;
}

const Shelf = (props: Props) => {
  const { as, className, children, gap, direction, wrap, p, px, py, pt, pb } =
    props;
  const { output } = useStyles(
    styles.root,
    className,
    p !== undefined && `p ${[...Array(p).keys()].map(k => "$").join("")}`,
    px !== undefined && `px ${[...Array(px).keys()].map(k => "$").join("")}`,
    py !== undefined && `py ${[...Array(py).keys()].map(k => "$").join("")}`,
    pb !== undefined && `py ${[...Array(pb).keys()].map(k => "$").join("")}`,
    pt !== undefined && `py ${[...Array(pt).keys()].map(k => "$").join("")}`
  );

  let propsToStyles: CSSProps = {};

  if (gap !== undefined) {
    propsToStyles = {
      ...propsToStyles,
      ...{ "--space-gap": gap },
    };
  }
  if (direction !== undefined) {
    propsToStyles = {
      ...propsToStyles,
      ...{ "--space-direction": direction },
    };
  }
  if (wrap !== undefined) {
    propsToStyles = {
      ...propsToStyles,
      ...{ "--space-wrap": wrap ? "wrap" : "nowrap" },
    };
  }

  const Tag = as || ("div" as ElementType);

  return (
    <Tag className={output} style={propsToStyles}>
      {children}
    </Tag>
  );
};

export default Shelf;
