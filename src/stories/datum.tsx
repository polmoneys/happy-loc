import { FiCrosshair } from "react-icons/fi";

import { ObjectLike } from "@/components/For/For";

import styles from "./frame.module.css";

export const DEMO_BUTTON_GROUP = [
  { id: "1", label: "0%", value: "a" },
  { id: "2", label: "25%", value: "b" },
  { id: "3", label: "50%", value: "c" },
  { id: "4", label: "75%", value: "d" },
  { id: "5", label: "100%", value: "e" },
];

export const DEMO_BUTTON_SPLIT = [
  {
    id: "0",
    children: "PEACE NOW",
    onClassName: styles.onSplitMain,
    offClassName: styles.offSplitMain,
  },
  {
    id: "1",
    children: "WAR",
    start: <FiCrosshair />,
    onClassName: styles.onSplitSecondary,
    offClassName: styles.offSplitSecondary,
  },
];

export const DEMO_CHECKBOXES = {
  mayo: true,
  mustard: true,
  ketchup: false,
};

export const DEMO_FOR: Array<ObjectLike> = [
  {
    id: 3,
    name: "Triangle",
  },
  {
    id: 4,
    name: "Square",
  },
  {
    id: 5,
    name: "Pentagon",
  },
  {
    id: 6,
    name: "Hexagon",
  },
  {
    id: 7,
    name: "Heptagon",
  },
  {
    id: 8,
    name: "Ocatagon",
  },
  {
    id: 22,
    name: "Circle",
  },
];
