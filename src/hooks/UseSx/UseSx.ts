import isNil from "lodash.isnil";
import { useMemo } from "react";

import styles from "./UseSx.module.css";

/**
 *
 * 2021. Pol Moneys
 * useSx 1.0.0
 * Like Mui's sx prop for own css utility classes
 * Feedback at polmoneys on github
 *
 */

type PaperScale = 1 | 2 | 3 | 4;
type PaddingScale = PaperScale | 5;
type FontScale = PaddingScale | 6;

interface Props {
  p?: PaddingScale;
  py?: PaddingScale;
  px?: PaddingScale;
  pt?: PaddingScale;
  pb?: PaddingScale;
  f?: FontScale;
  push?: "top" | "left" | "right";
  colToRow?: boolean;
  hideOn?: "portrait" | "landscape";
  portraitOrderPromote?: boolean;
  fit?: boolean;
  minFix?: "width" | "height";
  paper?: PaperScale;
}

function useSx(props: Props): {
  output: string;
} {
  const output = useMemo(() => {
    const {
      push,
      p,
      px,
      py,
      pt,
      pb,
      colToRow,
      hideOn,
      portraitOrderPromote,
      f,
      fit,
      minFix,
      paper,
    } = props;
    return _clxs([
      !isNil(p) && `p ${[...Array(p).keys()].map(k => "$").join("")}`,
      !isNil(px) && `px ${[...Array(px).keys()].map(k => "$").join("")}`,
      !isNil(py) && `py ${[...Array(py).keys()].map(k => "$").join("")}`,
      !isNil(pb) && `py ${[...Array(pb).keys()].map(k => "$").join("")}`,
      !isNil(pt) && `py ${[...Array(pt).keys()].map(k => "$").join("")}`,
      !isNil(f) && `f ${[...Array(f).keys()].map(k => "#").join("")}`,
      !isNil(paper) &&
        `paper ${[...Array(paper).keys()].map(k => "!").join("")}`,
      !isNil(push) && push === "left" && "ml-auto",
      !isNil(push) && push === "top" && "mt-auto",
      !isNil(push) && push === "right" && "mr-auto",
      !isNil(colToRow) && colToRow && "flex-landscape",
      !isNil(hideOn) && hideOn === "portrait" && "only-landscape",
      !isNil(hideOn) && hideOn === "landscape" && "only-portrait",
      !isNil(portraitOrderPromote) && portraitOrderPromote && "first-portrait",
      !isNil(fit) && styles.fit,
      !isNil(minFix) && minFix === "width" && styles.minWidthFix,
      !isNil(minFix) && minFix === "height" && styles.minHeightFix,
    ]);
  }, [props]);

  return { output };
}

export default useSx;

function _clxs(predicate: Array<unknown>) {
  return predicate.filter(Boolean).join(" ");
}
