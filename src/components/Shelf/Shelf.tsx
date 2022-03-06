/**
 *
 * 2022. Pol Moneys
 * Shelf 1.0.0
 * Shelf is a box with direction and gap to provide space around content.
 * Feedback at polmoneys on github
 *
 */
import isNil from "lodash.isnil";
import { ElementType } from "react";

import useStyles from "../../hooks/UseStyles/UseStyles";
import { CSSProps, DefaultProps } from "../types";
import styles from "./Shelf.module.css";

export interface Props
  extends Pick<DefaultProps, "as" | "className" | "children"> {
  gap?: string;
  direction?: "row" | "column" | "colToRow";
  balanced?: boolean;
  wrap?: boolean;
  /* Padding */
  p?: 1 | 2 | 3 | 4 | 5;
  py?: 1 | 2 | 3 | 4 | 5;
  px?: 1 | 2 | 3 | 4 | 5;
  pt?: 1 | 2 | 3 | 4 | 5;
  pb?: 1 | 2 | 3 | 4 | 5;
}

const Shelf = (props: Props) => {
  const {
    as,
    className,
    children,
    gap,
    direction,
    wrap,
    p,
    px,
    py,
    pt,
    pb,
    balanced = false,
  } = props;

  const isColToRow = direction === "colToRow";

  const { output } = useStyles(
    styles.root,
    isColToRow && styles.colToRow,
    className,
    balanced && styles.rowYCenter,
    !isNil(p) && `p ${[...Array(p).keys()].map(k => "$").join("")}`,
    !isNil(px) && `px ${[...Array(px).keys()].map(k => "$").join("")}`,
    !isNil(py) && `py ${[...Array(py).keys()].map(k => "$").join("")}`,
    !isNil(pb) && `py ${[...Array(pb).keys()].map(k => "$").join("")}`,
    !isNil(pt) && `py ${[...Array(pt).keys()].map(k => "$").join("")}`
  );

  let propsToStyles: CSSProps = {};

  if (!isNil(gap)) {
    propsToStyles = {
      ...propsToStyles,
      ...{ "--space-gap": gap },
    };
  }
  if (!isNil(direction)) {
    if (!isColToRow) {
      propsToStyles = {
        ...propsToStyles,
        ...{ "--space-direction": direction },
      };
    }
  }

  if (!isNil(wrap)) {
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
