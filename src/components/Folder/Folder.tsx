import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

import Button from "@/components/Button/Button";
import { HelveticaNeue } from "@/components/Font/Font";
import Shelf from "@/components/Shelf/Shelf";
import Stack from "@/components/Stack/Stack";

import styles from "./Folder.module.css";

interface Props {
  folder: Unit;
  initialState?: boolean;
}

interface Unit {
  name: string;
  children?: Array<Unit>;
}

const Folder = (props: Props) => {
  const { folder, initialState = false } = props;
  const [open, setOpen] = useState(initialState);

  const hasChildren = !!folder.children;

  return (
    <Shelf direction="column" as="ul" className={styles.root}>
      <Shelf
        balanced
        as="li"
        className={hasChildren ? styles.parent : styles.noParent}
      >
        <HelveticaNeue className="mr-auto">{folder.name}</HelveticaNeue>
        {hasChildren && (
          <FolderButton open={open} onClick={() => setOpen(o => !o)} />
        )}
      </Shelf>
      {open && hasChildren
        ? folder?.children?.map(subFolder => (
            <Folder key={subFolder.name} folder={subFolder} />
          ))
        : null}
    </Shelf>
  );
};

const FolderButton = ({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) => {
  return (
    <Button color="text" onClick={onClick}>
      <Stack>
        <FiMinus aria-hidden={!open} />
        <FiPlus aria-hidden={open} />
      </Stack>
    </Button>
  );
};

export default Folder;
