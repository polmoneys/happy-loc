import { Fragment } from "react";
import { FiCrosshair, FiHeart } from "react-icons/fi";
import * as yup from "yup";

import { HelveticaNeue } from "@/components/Font/Font";
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

export const DEMO_LISTBOX = {
  tacos: [
    {
      id: 0,
      value: "asada",
      disabled: false,
      children: <Fragment>Tira Asada</Fragment>,
    },
    {
      id: 1,
      value: "pollo",
      disabled: false,
      children: (
        <Fragment>
          Pollo <HelveticaNeue>Sold Out!</HelveticaNeue>
        </Fragment>
      ),
    },
    {
      id: 2,
      value: "pastor",
      disabled: false,
      children: (
        <Fragment>
          Pastor
          <FiHeart />
        </Fragment>
      ),
    },
    { id: 3, value: "lengua", disabled: false, children: "Lengua" },
  ],
  catalan: [
    { id: 4, value: "sobrassada", disabled: false, children: "Sobrassada" },
    {
      id: 5,
      value: "ensaimada",
      disabled: false,
      children: "Ensaimada cabell àngel",
    },
    { id: 6, value: "buti", disabled: false, children: "BotifarraNegre" },
  ],
};

export const VALIDATE_URL = yup.string().url();
export const VALIDATE_USERNAME = yup.string().max(8, "8 chars max");
export type SchemaURL = yup.InferType<typeof VALIDATE_URL>;
export type SchemaUsername = yup.InferType<typeof VALIDATE_USERNAME>;

export const DEMO_FOLDER_CATEGORIES = [
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 },
];
export const DEMO_FOLDER = {
  name: "Desktop folder",
  children: [
    {
      name: "Pics",
      children: [
        {
          name: "Cats",
        },
      ],
    },
    {
      name: "Important stuff",
      children: [
        {
          name: "Memes",
        },
        {
          name: "Funny pics",
        },
      ],
    },
    {
      name: "Blog post drafts",
    },
  ],
};
