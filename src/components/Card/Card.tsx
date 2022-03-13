/**
 *
 * 2021. Pol Moneys
 * Card 1.0.0
 * Feedback at polmoneys on github
 *
 */

import { useFocusWithin, useHover, usePress } from "@react-aria/interactions";
import isNil from "lodash.isnil";
import { ElementType, forwardRef, useState } from "react";

import useStyles from "@/hooks/UseStyles/UseStyles";

import { CSSProps, DefaultProps, EventCbProps } from "../types";
import styles from "./Card.module.css";

type RatiosTypes = "square" | "classic" | "portrait" | "landscape";

interface Props extends Omit<DefaultProps, "discouragedStyle">, EventCbProps {
  /** Gradient overlay */
  gradient?: {
    position: "start" | "end";
    color?: string;
  };
  /** Shadow */
  shadowless?: boolean;
  /** 🚨 Ratio of the content */
  ratio?: RatiosTypes;
}

const matchRatioToValue = {
  square: {
    start: 1,
    end: 1,
  },
  classic: {
    start: 4,
    end: 3,
  },
  portrait: {
    start: 9,
    end: 16,
  },
  landscape: {
    start: 16,
    end: 9,
  },
};

const Card = forwardRef((props: Props, ref) => {
  const {
    as,
    children,
    ratio,
    className,
    compose,
    onClick,
    onEndHover,
    onStartHover,
    gradient,
    shadowless = true,
    /* Same 'id' as the title of 'children' */
    ariaLabelledby,
  } = props;

  const { pressProps, isPressed } = usePress({
    onPress: event => (!isNil(onClick) ? onClick?.() : {}),
  });

  const { hoverProps, isHovered } = useHover({
    onHoverStart: event => (!isNil(onStartHover) ? onStartHover?.() : {}),
    onHoverEnd: event => (!isNil(onEndHover) ? onEndHover?.() : {}),
  });

  const [isFocusWithin, setFocusWithin] = useState(false);

  const { focusWithinProps } = useFocusWithin({
    onBlurWithin: () => setFocusWithin(false),
    onFocusWithinChange: isFocusWithin => setFocusWithin(isFocusWithin),
  });

  let customStyles: CSSProps = {};
  if (!isNil(ratio)) {
    customStyles = {
      "--card-ratio": `${matchRatioToValue[ratio].start}/${matchRatioToValue[ratio].end}`,
    };
  }

  if (gradient?.color) {
    customStyles = {
      ...customStyles,
      "--card-bg-gradient": gradient?.color,
    };
  }

  const { output } = useStyles(
    styles.root,
    isFocusWithin && styles.focusWithin,
    !isNil(gradient) && gradient.position === "start" && styles.top,
    !isNil(gradient) && gradient.position === "end" && styles.bottom,
    isPressed && styles.pressed,
    isHovered && styles.hovered,
    ratio && styles.ratio,
    shadowless && styles.noShadow,
    className,
    compose
  );
  const Tag = as || ("div" as ElementType);
  return (
    <Tag
      ref={ref}
      className={output}
      style={customStyles}
      {...(onClick && { ...pressProps })}
      {...(onStartHover && { ...hoverProps })}
      aria-labelledby={ariaLabelledby}
      {...focusWithinProps}
    >
      {children}
    </Tag>
  );
});

export default Card;
