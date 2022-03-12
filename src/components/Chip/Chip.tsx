import isNil from "lodash.isnil";

import Button from "@/components/Button/Button";
import useStyles from "@/hooks/UseStyles/UseStyles";

import { Action } from "../types";
import styles from "./Chip.module.css";

const tagVariants = ["pill", "text"] as const;
type Variants = typeof tagVariants[number];

interface Props extends Action {
  fill?: string;
  color?: string;
  variant?: Variants;
  className?: string;
}

const Chip = (props: Props) => {
  const {
    label,
    className,
    fill,
    color,
    variant = "text",
    onClick,
    disabled,
  } = props;

  const isDisabled = isNil(onClick) || (!isNil(disabled) && disabled === true);
  const isPill = variant === "pill";

  const { output } = useStyles(styles.root, className, isPill && styles.pill);

  return (
    <Button
      ring
      data-chip=""
      className={output}
      discouragedStyle={{
        ...(fill && {
          backgroundColor: fill,
        }),
        ...(color && {
          color,
        }),
        ...(!isDisabled && {
          cursor: "pointer",
        }),
      }}
      disabled={isDisabled}
      {...(onClick && { onClick: () => onClick?.() })}
    >
      {label}
    </Button>
  );
};

export default Chip;
