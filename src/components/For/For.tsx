/**
 *
 * 2021. Pol Moneys
 * For 1.0.0
 * Convenience for mapping Array<T>.
 * Feedback at polmoneys on github
 *
 */

import isNil from "lodash.isnil";
import {
  ElementType,
  Fragment,
  memo,
  ReactElement,
  ReactNode,
  useMemo,
} from "react";

import useStyles from "@/hooks/UseStyles/UseStyles";

import styles from "./For.module.css";

export type ObjectLike = Record<string, unknown>;

interface Props {
  /** Content */
  of: Array<ObjectLike>;
  children: (item: ObjectLike) => void;
  /** Dynamic Content */
  loading?: boolean;
  empty?: ReactNode | ReactElement;
  as?: "section" | "article" | "ul" | "ol" | "div";
  className?: string;
}

const For = (props: Props) => {
  const {
    as,
    of,
    children,
    className,
    empty = "No results",
    loading = false,
  } = props;

  const items = of?.map((item: ObjectLike, position) =>
    children({ item, key: position, loading } as ObjectLike)
  );

  const amount = useMemo(() => items.length, [items]);
  const { output } = useStyles(loading && styles.loading, className);
  const display = amount > 0 ? items : empty;

  if (isNil(as)) {
    return <Fragment>{display}</Fragment>;
  }
  const Tag = as || ("div" as ElementType);
  return <Tag className={output}>{display}</Tag>;
};

const avoidRerenderIf = (prevProps: Props, nextProps: Props) => {
  return prevProps.of.length === nextProps.of.length;
};

For.Freeze = memo((props: Props) => <For {...props} />, avoidRerenderIf);

export default For;
