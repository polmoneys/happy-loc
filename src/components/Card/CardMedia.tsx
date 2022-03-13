/**
 *
 * WIP
  let skipRendering = false;
  const connection = window?.navigator && window?.connection;
  if (connection) {
    if (["slow-2g", "2g", "3g"].includes(connection?.effectiveType)) {
      skipRendering = true;
    }
  }
 *
 */

import isNil from "lodash.isnil";
import { Fragment, useState } from "react";

import useStyles from "@/hooks/UseStyles/UseStyles";

import { DefaultProps } from "../types";
import styles from "./Card.module.css";

interface CardMediaProps extends Pick<DefaultProps, "className"> {
  alt?: string;
  src: string;
  height?: string;
  sources?: Record<string, string>;
  eager?: boolean;
}
const CardMedia = (props: CardMediaProps) => {
  const { height, sources, src, alt = "", className, eager = false } = props;

  const { output } = useStyles(styles.media, className);
  const [hasError, setError] = useState(false);
  const onErrorImage = () => {
    setError(true);
  };

  let sourcesTags: unknown = <Fragment />;

  if (!isNil(sources)) {
    sourcesTags = Object.keys(sources).map(key => {
      const hasSource = !isNil(sources?.[key]);

      return hasSource ? (
        <source key={key} type={`image/${key}`} srcSet={sources[key]} />
      ) : (
        <Fragment />
      );
    });
  }

  return (
    <picture
      className={output}
      {...(height && { style: { height: height } })}
      onError={onErrorImage}
    >
      {hasError ? (
        <img
          src={fallback("600px", height ?? "200px", "currentColor")}
          alt="Loading error"
        />
      ) : (
        <Fragment>
          {sourcesTags}
          <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} />
        </Fragment>
      )}
    </picture>
  );
};
export default CardMedia;

type Size = number | string;

const fallback = (width: Size, height: Size, fill: string) =>
  `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect  fill='%23${fill}' width="${width}" height="${height}"/></svg>`;
