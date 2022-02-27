import { MouseEventHandler, ReactElement, ReactNode } from "react";

/**
 * Components might want to extend/Pick/Omit from it.
 */

export interface DefaultProps {
  /** subset of HTML tags */
  as?:
    | "section"
    | "article"
    | "nav"
    | "aside"
    | "header"
    | "footer"
    | "label"
    | "span"
    | "p"
    | "b"
    | "em"
    | "strong"
    | "time"
    | "h1"
    | "h2"
    | "h3"
    | "ul"
    | "li"
    | "wbr"
    | "div";
  /** Base for composition */
  children:
    | HTMLElement
    | ReactElement
    | ReactNode
    | Array<ReactNode>
    | string
    | null;
  /** Accepts utility string css class or styles from *.module.css */
  className?: string;
  /** Available for advanced composition */
  compose?: unknown;
  /** Adds to 'root' element */
  id?: string;
  /** A11y can be multiple id "myBillingId myNameId" */
  ariaLabelledby?: string;
  /** Don't unless you must */
  discouragedStyle?: CSSProps;
}

/**
 * Components can extend Props with events
 */

export interface EventCbProps {
  /** OnClick callback  */
  onClick?: (event?: MouseEvent | MouseEventHandler<HTMLSpanElement>) => void;
  /** Start callback  */
  onStartHover?: () => void;
  /** End callback   */
  onEndHover?: () => void;
}

/**
 * Types css custom properties, TS complaints if
 * React.CSSProperties unless we broaden the typing.
 */
export type CSSProps = {
  /** CSSProperties */
  [key: string]: string;
};

export interface SlotsProps {
  /** Slot to pre-pend content  */
  start?: string | ReactElement | ReactNode | HTMLElement | null;
  /** Slot to append content  */
  end?: string | ReactElement | ReactNode | HTMLElement | null;
}

export type ChildrenProp<T = Record<string, unknown>> = T & {
  children?:
    | ((...args: any[]) => ReactElement | null)
    | HTMLElement
    | ReactElement
    | ReactNode
    | string
    | null;
};

/**
 * For data-driven components.
 */

export interface ActionItem
  extends Pick<DefaultProps, "id" | "children">,
    EventCbProps {
  disabled?: boolean;
  label: string | HTMLSpanElement;
  to?: string;
}

export type ActionItems = Array<ActionItem>;
