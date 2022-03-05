import { ReactNode } from "react";

import useStyles from "@/hooks/UseStyles/UseStyles";

import styles from "./stat.module.css";

interface Props {
  children: ReactNode;
  className?: string;
}
const Stat = (props: Props) => {
  const { children, className } = props;
  const { output } = useStyles(styles.root, className, "p $$");
  return <div className={output}>{children}</div>;
};

export default Stat;
