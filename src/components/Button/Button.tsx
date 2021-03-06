/**
 *
 * 2021. Pol Moneys
 * Button 1.0.0
 * Primitive, most likely you want to craft 'variants' with it, the way it should be consumed.
 * Feedback at polmoneys on github
 *
 */

import { FocusRing } from "@react-aria/focus";
import { useHover, usePress } from "@react-aria/interactions";
import isNil from "lodash.isnil";
import { ForwardedRef, forwardRef, useMemo } from "react";

import useStyles from "@/hooks/UseStyles/UseStyles";

import { DefaultProps, EventCbProps, SlotsProps } from "../types";
import styles from "./Button.module.css";

export interface Props
  extends Pick<
      DefaultProps,
      "children" | "className" | "compose" | "discouragedStyle"
    >,
    SlotsProps,
    EventCbProps {
  /** IconButton  */
  label?: string;
  /** Width 100% */
  stretch?: boolean;
  /** defaults to center */
  align?: "start" | "center" | "evenly" | "end";
  disabled?: boolean;
  /** Buttons inside Form should be type="submit" */
  type?: "button" | "submit" | "reset";
  /** A11y */
  ring?: boolean;
  preventFocusOnPress?: boolean;
  /** ButtonGroupButton event  */
  onKeyDown?: (event: KeyboardEvent) => void;
  /** Base style variants  */
  color?: "secondary" | "text";
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (props: Props, ref: ForwardedRef<HTMLButtonElement | null>) => {
    const {
      className,
      compose,
      children,
      disabled = false,
      type = "button",
      start,
      end,
      ring = true,
      onStartHover,
      onEndHover,
      preventFocusOnPress = false,
      onClick,
      stretch,
      label,
      align = "center",
      color,
      discouragedStyle,
    } = props;

    const { pressProps, isPressed } = usePress({
      onPress: () => (!isNil(onClick) ? onClick?.() : {}),
      preventFocusOnPress,
    });

    const { hoverProps, isHovered } = useHover({
      onHoverStart: () => (!isNil(onStartHover) ? onStartHover?.() : {}),
      onHoverEnd: () => (!isNil(onEndHover) ? onEndHover?.() : {}),
    });

    const eventHandlers = disabled
      ? {}
      : {
          ...(!isNil(onClick) && { ...pressProps }),
          ...(!isNil(onStartHover) && { ...hoverProps }),
        };

    const alignClass = useMemo(() => {
      if (align === "center") return styles.center;
      if (align === "evenly") return styles.evenly;
      if (align === "start") return styles.start;
      if (align === "end") return styles.end;
    }, [align]);

    const hasColor = !isNil(color);
    const { output } = useStyles(
      styles.root,
      className,
      alignClass,
      isPressed && styles.pressed,
      isHovered && styles.hovered,
      (!isNil(start) || !isNil(end)) && styles.buttonIcon,
      stretch && styles.stretch,
      hasColor && color === "secondary" && styles.secondary,
      hasColor && color === "text" && styles.text,
      compose
    );

    return (
      <FocusRing focusRingClass={ring ? "ring" : "no-ring"}>
        <button
          ref={ref}
          className={output}
          type={type}
          disabled={disabled}
          {...eventHandlers}
          {...(label && { "aria-label": label })}
          data-testid="button"
          {...(!isNil(discouragedStyle) && {
            style: discouragedStyle,
          })}
        >
          {!isNil(start) && start} {children} {!isNil(end) && end}
        </button>
      </FocusRing>
    );
  }
);

export default Button;
