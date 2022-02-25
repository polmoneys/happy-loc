import { ReactNode } from "react";

import useStyles from "../../../hooks/UseStyles/UseStyles";
import { DefaultProps, SlotsProps } from "../../types";
import styles from "../Button.module.css";
import ButtonGroup from "./ButtonGroup";

interface SplitItems extends SlotsProps {
  id: string;
  children: ReactNode;
  onClassName?: string;
  offClassName?: string;
}

interface Props extends Pick<DefaultProps, "className"> {
  items: Array<SplitItems>;
  /** import type Id[] */
  selection: Array<string>;
  /** update */
  onChange: (id: string) => void;
}

function ButtonSplit(props: Props) {
  const { items, selection, onChange } = props;
  const { make } = useStyles(null);
  return (
    <ButtonGroup className={styles.buttonSplit}>
      {items?.map(item => {
        const { children, id, start, end, onClassName, offClassName } = item;
        const itemStyles = make(
          selection.includes(id) ? onClassName : offClassName
        );
        return (
          <ButtonGroup.Button
            key={id}
            className={itemStyles}
            end={end}
            start={start}
            onClick={() => onChange(id)}
          >
            {children}
          </ButtonGroup.Button>
        );
      })}
    </ButtonGroup>
  );
}

export default ButtonSplit;
