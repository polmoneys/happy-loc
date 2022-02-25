import "@reach/checkbox/styles.css";

import { CustomCheckbox } from "@reach/checkbox";
import { ChangeEvent, ReactElement, ReactNode } from "react";
import { FiCheck, FiMinus } from "react-icons/fi";

import useStyles from "../../hooks/UseStyles/UseStyles";
import styles from "./Checkbox.module.css";

interface FormElementProps {
  /** a11y */
  label: string;
  /** Input  */
  placeholder?: string;
}

interface Props extends Partial<FormElementProps> {
  checked?: boolean | "mixed";
  value: string | number;
  id?: string | number;
  /** Can be null */
  children?:
    | ((...args: any[]) => ReactElement | null)
    | HTMLElement
    | ReactElement
    | ReactNode
    | string
    | null;
  /** Accepts module style.xxxx */
  className?: string;
  required?: boolean;
  onError?: () => void;
  onSuccess?: () => void;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = (props: Props) => {
  const {
    children,
    className,
    // onSuccess,
    // onError,
    checked = false,
    onChange,
    value,
    name,
    // required,
  } = props;

  // const [inputError, setError] = useState<{ input: string; message: string }>({
  //   input: name,
  //   message: "Accept it",
  // });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // const target = event.target;
    // const isChecked = target.checked as boolean;

    onChange && onChange(event);
  };
  const { output } = useStyles(
    styles.root,
    checked && styles.checked,
    className
  );

  return (
    <div className={output}>
      {checked && checked !== "mixed" && <FiCheck size={24} />}
      {checked && checked === "mixed" && <FiMinus size={24} />}
      <label htmlFor={name}>
        <CustomCheckbox
          value={value}
          name={name}
          checked={checked}
          onChange={handleChange}
        />
        {children}
      </label>
    </div>
  );
};

export default CheckBox;
