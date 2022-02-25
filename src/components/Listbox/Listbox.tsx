/**
 *
 * 2020. Pol Moneys
 * ListBox 1.0.0
 * Like a Select with super powers.
 * Feedback at polmoneys on github
 *
 */

import "@reach/listbox/styles.css";

import {
  ListboxButton,
  ListboxGroup,
  ListboxGroupLabel,
  ListboxInput,
  ListboxList,
  ListboxOption,
  ListboxPopover,
} from "@reach/listbox";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import {
  cloneElement,
  Fragment,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import { HelveticaNeue } from "@/components/Font/Font";

import { DefaultProps, SlotsProps } from "../types";
import styles from "./Listbox.module.css";

interface Props extends Pick<DefaultProps, "className" | "id">, SlotsProps {
  /** a11y */
  label: string;
  /** Initial selected item */
  initial: string;
  /** Flat items */
  items?: Array<{
    id: number;
    value: string;
    disabled?: boolean;
    children?: string | ReactElement | HTMLElement;
  }>;
  /** Grouped items */
  groups?: {
    [key: string]: Array<any>;
  };
  /** cb */
  onSelect: (item?: any) => void;
}

const ListBox = (props: Props) => {
  const {
    initial,
    items,
    onSelect,
    label,
    groups = undefined,
    start = undefined,
    end = undefined,
    id = " ",
  } = props;
  const [value, setValue] = useState(initial);

  useEffect(() => {
    if (value !== initial) {
      onSelect(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, initial]);

  const LabelHiddenIfGroup = (
    <WrapIf
      condition={groups !== undefined}
      container={children => <VisuallyHidden>{children}</VisuallyHidden>}
    >
      <HelveticaNeue className={styles.label} id={id}>
        {label}
      </HelveticaNeue>
    </WrapIf>
  );

  return (
    <div className={styles.root}>
      {LabelHiddenIfGroup}
      <ListboxInput
        aria-labelledby={id}
        value={value}
        onChange={value => setValue(value)}
      >
        {({ value, valueLabel, isExpanded }) => (
          <Fragment>
            {start && start}
            <ListboxButton>
              <HelveticaNeue
                as="span"
                data-value={value}
                className={styles.capitalize}
              >
                {value}
              </HelveticaNeue>
              {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
            </ListboxButton>
            <ListboxPopover className={styles.portal}>
              <ListboxList className={styles.portal}>
                {groups
                  ? Object.entries(groups).map(([value, state]) => (
                      <ListboxGroup key={value}>
                        <ListboxGroupLabel className={styles.portal}>
                          {value}
                        </ListboxGroupLabel>
                        {state?.map(option => (
                          <ListboxOption
                            key={option.value}
                            className={styles.portal}
                            value={option.value}
                          >
                            {option.children}
                          </ListboxOption>
                        ))}
                      </ListboxGroup>
                    ))
                  : items?.map(item => (
                      <ListboxOption
                        key={item.id}
                        className={styles.portal}
                        value={item.value}
                      >
                        {item.children}
                      </ListboxOption>
                    ))}
              </ListboxList>
              {end && end}
            </ListboxPopover>
          </Fragment>
        )}
      </ListboxInput>
    </div>
  );
};

export default ListBox;

export type WrapIfProps = {
  /* If true, wrap with container */
  condition: boolean;
  /* Wrapper/Container */
  container: (child: JSX.Element) => JSX.Element;
  /* JSX */
  children: JSX.Element;
};

const WrapIf = (args: WrapIfProps) => {
  const { condition, children, container } = args;
  return condition ? cloneElement(container(children)) : children;
};
