import { Fragment } from "react";

import { DefaultProps } from "../types";
import useStyles from "../../hooks/UseStyles/UseStyles";

import styles from "./Card.module.css";

interface CardMediaProps extends Pick<DefaultProps, "className"> {
  alt?: string;
  src: string;
  height?: string;
  sources?: Record<string, string>;
}
const CardMedia = (props: CardMediaProps) => {
  const { height, sources, src, alt = "", className } = props;

  const { output } = useStyles(styles.media, className);
  let sourcesTags: unknown = <Fragment />;

  if (sources !== undefined) {
    sourcesTags = Object.keys(sources).map(key => {
      const hasSource = sources?.[key] !== undefined;

      return hasSource ? (
        <source key={key} type={`image/${key}`} srcSet={sources[key]} />
      ) : (
        <Fragment />
      );
    });
  }

  return (
    <picture className={output} {...(height && { style: { height: height } })}>
      {sourcesTags}
      <img src={src} alt={alt} />
    </picture>
  );
};
export default CardMedia;
