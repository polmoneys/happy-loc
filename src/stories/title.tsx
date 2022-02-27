import { ReactNode } from "react";

import { HelveticaNeue, HelveticaNeueBold } from "@/components/Font/Font";
import Button from "@/components/Button/Button";
import Shelf from "@/components/Shelf/Shelf";
import useNewBrowserTab from "@/hooks/UseNewBrowserTab/UseNewBrowserTab";

import styles from "./title.module.css";

interface Props {
  children: string | ReactNode;
  "data-testid"?: string;
}

const Title = (props: Props) => {
  const { children, ...rest } = props;
  const trigger = useNewBrowserTab({
    url: "https://polmoneys.com",
    title: "pol moneys",
    width: 700,
    config: {
      menubar: "yes",
      location: "yes",
      resizable: "yes",
      scrollbars: "yes",
      status: "yes",
    },
  });
  return (
    <Shelf balanced p={3} className={styles.root}>
      <HelveticaNeueBold size={6} className="mr-auto" {...rest}>
        {children}
      </HelveticaNeueBold>
      <Button color="text" onClick={trigger}>
        <HelveticaNeue>V 1.0</HelveticaNeue>
      </Button>
    </Shelf>
  );
};

export default Title;
