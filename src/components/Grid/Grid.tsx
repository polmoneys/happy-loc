/**
 *
 * 2021. Pol Moneys
 * Grid 1.0.0
 * Feedback at polmoneys on github
 *
 */

import { ElementType, useMemo } from "react";

import useStyles from "../../hooks/UseStyles/UseStyles";
import { CSSProps, DefaultProps } from "../types";
import styles from "./Grid.module.css";

interface Props extends DefaultProps {
  /** Defaults to 0 max(5vw, 2rem);*/
  gap?: string;
  /** 🚨 Min size of a column, defaults to 400px */
  size?: string;
  /** Stretch children to equalize their height*/
  stretch?: boolean;
  /** Dense grid */
  masonry?: boolean;
}

const Grid = (props: Props): JSX.Element => {
  const {
    as,
    className,
    children,
    gap,
    discouragedStyle,
    size,
    stretch = false,
    masonry = false,
  } = props;

  const gridConfig: CSSProps = useMemo(() => {
    return {
      "--grid-item-width": size ?? "400px",
      "--grid-gap": gap ?? "var(--gap-5)",
    };
  }, [size, gap]);

  const { output } = useStyles(
    styles.root,
    className,
    stretch && styles.stretch,
    masonry && styles.masonry
  );
  const Tag = as || ("div" as ElementType);
  return (
    <Tag className={output} style={{ ...discouragedStyle, ...gridConfig }}>
      {children}
    </Tag>
  );
};

export default Grid;
