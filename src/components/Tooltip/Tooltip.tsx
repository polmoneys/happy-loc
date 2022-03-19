/**
 *
 * 2021. Pol Moneys
 * Tooltip 1.0.0
 * Feedback at polmoneys on github
 *
 */
import { Popover } from "@headlessui/react";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import isNil from "lodash.isnil";
import { Fragment, ReactNode, useEffect, useRef } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import Button from "@/components/Button/Button";
import { HelveticaNeue } from "@/components/Font/Font";
import useStyles from "@/hooks/UseStyles/UseStyles";

import { CSSProps, DefaultProps } from "../types";
import styles from "./Tooltip.module.css";

const { Group } = Popover;

interface Props extends Pick<DefaultProps, "className" | "children"> {
  label: string | ReactNode;
  closeLabel?: string | ReactNode;
  variant?: "inline" | "input" | "ghost";
  onHoverIn?: () => void;
  onHoverOut?: () => void;
  offset?: {
    start?: string;
    x?: string;
    y?: string;
  };
}

const Tooltip = (props: Props) => {
  const {
    children,
    label,
    onHoverIn,
    onHoverOut,
    variant = "input",
    offset,
    className,
    closeLabel,
  } = props;

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { isFocusVisible, focusProps } = useFocusRing();

  const { hoverProps, isHovered } = useHover({
    onHoverStart: event => onHoverIn?.(),
    onHoverEnd: event => onHoverOut?.(),
  });

  useEffect(() => {
    if (isHovered && buttonRef?.current !== null) {
      buttonRef?.current.click();
    }
  }, [isHovered]);

  let propsToStyles: CSSProps = {};

  if (offset !== undefined) {
    propsToStyles = {
      ...(!isNil(offset.start) && {
        "--tooltip-offset-start": offset.start,
      }),
      ...(!isNil(offset.x) && { "--tooltip-offset-x": offset.x }),
      ...(!isNil(offset.y) && { "--tooltip-offset-y": offset.y }),
    };
  }

  const isInput = variant === "input";
  const isInline = variant === "inline";
  const isGhost = variant === "ghost";

  const { output: triggerClassNames } = useStyles(
    styles.button,
    isInput && styles.input,
    isGhost && styles.ghost,
    isInline && styles.inline
  );

  const { output: rootClassNames } = useStyles(className, styles.root);
  const idleChevronColor = isFocusVisible
    ? "var(--teal-5)"
    : isInput
    ? "currentColor"
    : "var(--gray-4)";
  return (
    <Popover className={rootClassNames}>
      {({ open }) => (
        <Fragment>
          <Popover.Button
            {...hoverProps}
            {...focusProps}
            ref={buttonRef}
            className={triggerClassNames}
          >
            <HelveticaNeue as="span">{label}</HelveticaNeue>
            {!isGhost && (
              <Fragment>
                {open ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown color={idleChevronColor} />
                )}
              </Fragment>
            )}
          </Popover.Button>
          {/* <Popover.Overlay className="overlay" /> */}

          <Popover.Panel
            className={styles.content}
            style={{
              ...propsToStyles,
            }}
          >
            {({ close }) => (
              <Fragment>
                {children}
                {closeLabel !== undefined ? (
                  <Button
                    color="text"
                    className={styles.close}
                    onClick={() => {
                      close();
                    }}
                  >
                    {closeLabel}
                  </Button>
                ) : (
                  <Fragment />
                )}
              </Fragment>
            )}
          </Popover.Panel>
        </Fragment>
      )}
    </Popover>
  );
};

export default Tooltip;
export { Group as TooltipGroup };
