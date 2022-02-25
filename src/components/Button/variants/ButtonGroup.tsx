import { FocusScope, useFocusManager } from "@react-aria/focus";

import useStyles from "../../../hooks/UseStyles/UseStyles";
import { DefaultProps } from "../../types";
import Button, { Props as ButtonProps } from "../Button";
import styles from "../Button.module.css";

interface Props extends Pick<DefaultProps, "children" | "className"> {
  /** Defaults to horizontal */
  direction?: "horizontal" | "vertical";
  /** Selected button, can be 'unselected' initially */
  initial?: number | undefined;
}

function ButtonGroup(props: Props) {
  const { children, direction, className } = props;
  const isVertical = direction === "vertical";
  const { output } = useStyles(
    styles.buttonGroup,
    className,
    isVertical && styles.buttonGroupVertical
  );
  return (
    <div className={output}>
      <FocusScope>{children}</FocusScope>
    </div>
  );
}

export default ButtonGroup;

function ButtonInGroup(props: ButtonProps) {
  const { children } = props;
  const focusManager = useFocusManager();
  const onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowRight":
        focusManager.focusNext({ wrap: true });
        break;
      case "ArrowLeft":
        focusManager.focusPrevious({ wrap: true });
        break;
      default:
        return;
    }
  };
  return (
    <Button {...props} ring={false} onKeyDown={onKeyDown}>
      {children}
    </Button>
  );
}

ButtonGroup.Button = ButtonInGroup;
