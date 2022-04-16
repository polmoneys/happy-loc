import { Fragment, ReactNode } from "react";
import { InView } from "react-intersection-observer";

interface Props {
  children: ReactNode;
  start?: ReactNode;
  sticky?: boolean;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  initialInView?: boolean;
  onExplode?: (on: boolean) => void;
}

function Mine(props: Props) {
  const {
    start,
    threshold = 0.1,
    rootMargin = "0px",
    children,
    onExplode,
    triggerOnce = true,
    sticky = false,
  } = props;

  const content = (
    <Fragment>
      {start !== undefined && (
        <InView
          as="div"
          rootMargin={rootMargin}
          triggerOnce={triggerOnce}
          threshold={threshold}
          onChange={(inView, entry) => onExplode?.(inView)}
        >
          {start}
        </InView>
      )}
      {children}
    </Fragment>
  );
  if (sticky) {
    return (
      <div style={{ position: "sticky", top: 0, width: "100%" }}>{content}</div>
    );
  }
  return content;
}

export default Mine;
