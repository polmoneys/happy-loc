import { ElementType, Fragment, useEffect, useRef } from "react";

import { DefaultProps } from "../types";
import { CreateSlider } from "./Draggable";
import styles from "./HorizontalScroll.module.css";

export interface Props
  extends Pick<DefaultProps, "as" | "className" | "children"> {
  progress?: boolean;
  container?: string | HTMLElement | null;
  slider?: string | HTMLElement | null;
  hasTouchEvent?: boolean;
  smoothAmount?: string | number;
  dragSpeed?: string | number;
  getScrollPercent?: (p: number) => void;
  mouseEnter?: () => void;
  mouseUp?: () => void;
  mouseLeave?: () => void;
  mouseDown?: () => void;
}

const HorizontalScroll = (props: Props) => {
  const { className, children, progress = true, as, ...rest } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const slideableRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let instance: CreateSlider;
    if (containerRef.current !== null && slideableRef.current !== null) {
      instance = new CreateSlider({
        container: containerRef.current,
        slider: slideableRef.current,
        hasTouchEvent: true,
        dragSpeed: 2,
        smoothAmount: 0.1,
        getScrollPercent: (p: number) => {
          if (progress && progressRef.current !== null) {
            progressRef.current.style.width = `${p}%`;
          }
        },
        ...rest,
      });
    }
    return () => {
      instance.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const containerClassName = [styles.root, className].filter(Boolean).join(" ");
  const Tag = as || ("nav" as ElementType);
  return (
    <Fragment>
      <Tag ref={containerRef} className={containerClassName}>
        <div ref={slideableRef} className={styles.viewport}>
          {children}
        </div>
      </Tag>
      <div className={styles.progress} aria-hidden={!progress}>
        <div ref={progressRef} className={styles.bar}></div>
      </div>
    </Fragment>
  );
};

export default HorizontalScroll;
