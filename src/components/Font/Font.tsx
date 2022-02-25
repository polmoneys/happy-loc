/**
 *
 * 2021. Pol Moneys
 * Font 1.0.0
 * Primitive & examples of 'variants', the way it should be consumed.
 * Feedback at polmoneys on github
 *
 */

import isNil from "lodash.isnil";
import {
  AriaAttributes,
  ElementType,
  Fragment,
  ReactElement,
  ReactNode,
} from "react";

import useStyles from "../../hooks/UseStyles/UseStyles";
import styles from "./Font.module.css";

interface Props extends AriaAttributes {
  size?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  /** Base for composition */
  children:
    | HTMLElement
    | ReactElement
    | ReactNode
    | Array<ReactNode>
    | string
    | null;
  /** subset of HTML tags */
  as?:
    | "label"
    | "span"
    | "p"
    | "b"
    | "em"
    | "strong"
    | "time"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";
  /** Accepts utility string css class or styles from *.module.css */
  className?: string;
  /** Dangerous as in avoid */
  dangerousColor?: string;
  /** Dangerous as in avoid */
  dangerousTransform?: string;
  /** Available for advanced composition */
  compose?: unknown;
  /** Word wrap */
  wrapLength?: number;
  /** Word wrap should break longer words ? defaults to false */
  wrapBreak?: boolean;
  /** Is children a number ? */
  num?: boolean;
  /** Hyphens ? */
  flow?: boolean;
}

const Font = (props: Props) => {
  const {
    as,
    className,
    compose,
    children,
    size = 1,
    dangerousColor,
    dangerousTransform,
    num = false,
    flow = true,
    wrapLength,
    ...rest
  } = props;
  const { output } = useStyles(
    compose,
    className,
    `f ${[...Array(size).keys()].map(k => "#").join("")}`,
    num && styles.fontNumber,
    flow && styles.fontFlow,
    wrapLength && styles.fontBreak
  );
  const Tag = as || ("p" as ElementType);

  if (isNil(children)) {
    return <Fragment />;
  }

  return (
    <Tag
      className={output}
      style={{
        ...(wrapLength && { width: `${wrapLength}px` }),
        ...(dangerousColor && { color: dangerousColor }),
        ...(dangerousTransform && { transform: dangerousTransform }),
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const HelveticaNeue = (props: Props) => (
  <Font {...props} compose={styles.helveticaNeue} />
);
const HelveticaNeueMedium = (props: Props) => (
  <Font {...props} compose={styles.medium} />
);
const HelveticaNeueBold = (props: Props) => (
  <Font {...props} compose={styles.bold} />
);
const HelveticaNeueThin = (props: Props) => (
  <Font {...props} compose={styles.thin} />
);
const Grotesk = (props: Props) => <Font {...props} compose={styles.grotesk} />;

export {
  Grotesk,
  HelveticaNeue,
  HelveticaNeueBold,
  HelveticaNeueMedium,
  HelveticaNeueThin,
};
