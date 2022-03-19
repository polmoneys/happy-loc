import isNil from "lodash.isnil";
import {
  ChangeEvent,
  DetailedHTMLProps,
  forwardRef,
  Fragment,
  InputHTMLAttributes,
  useState,
} from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

import { HelveticaNeue } from "@/components/Font/Font";
import Shelf from "@/components/Shelf/Shelf";
import useStyles from "@/hooks/UseStyles/UseStyles";

import { DefaultProps, SlotsProps } from "../types";
import styles from "./Input.module.css";

type BaseProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface Props
  extends Pick<SlotsProps, "start">,
    Pick<DefaultProps, "className" | "id"> {
  name: string;
  label: string;
  value?: string | number;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation?: any;
  required?: boolean;
  autofocus?: boolean;
  autocomplete?:
    | "off"
    | "on"
    | "honorific-prefix"
    | "new-password"
    | "current-password"
    | "one-time-code"
    | "cc-name"
    | "cc-number"
    | "cc-exp"
    | "cc-exp-month"
    | "cc-exp-year"
    | "cc-csc";
  inputmode?: "text" | "numeric" | "tel" | "search" | "email" | "url";
  enterkeyhint?:
    | "enter"
    | "done"
    | "go"
    | "next"
    | "previous"
    | "search"
    | "send";
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onPaste?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, Props & BaseProps>(
  (props: Props & BaseProps, ref) => {
    const {
      id,
      className,
      value,
      onChange,
      start,
      label,
      placeholder = null,
      name,
      autocomplete = "off",
      inputmode = "text",
      enterkeyhint,
      autofocus = false,
      required = false,
      validation,
      type = "text",
      onBlur = () => ({}),
      onPaste = () => ({}),
    } = props;

    const [valid, setStatus] = useState(!isNil(validation) ? false : true);
    const { output } = useStyles(
      styles.root,
      !valid && styles.invalid,
      required && styles.required,
      className
    );

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (!isNil(validation)) {
        return validation.isValid(value).then((valid: boolean) => {
          if (valid) {
            setStatus(true);
            if (onChange) {
              onChange?.(event);
            }
          } else {
            setStatus(false);
          }
        });
      }
      onChange?.(event);
    };

    return (
      <Shelf direction="column" className={output} gap="var(--gap-1)">
        <label htmlFor={id}>{label}</label>
        <Shelf balanced>
          {!isNil(start) && start}
          <input
            ref={ref}
            id={id}
            defaultValue={value}
            name={name}
            required={required}
            autoComplete={autocomplete}
            aria-required={!!required}
            aria-describedby={`${id}-error`}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autofocus}
            enterKeyHint={enterkeyhint}
            inputMode={inputmode}
            type={type}
            onChange={handleChange}
            onBlur={onBlur}
            onPaste={onPaste}
            {...(placeholder && { placeholder })}
          />
          {!isNil(validation) ? (
            <HelveticaNeue id={`${id}-error`} aria-live="polite">
              {valid ? (
                <FiCheckCircle
                  size="28px"
                  color="var(--teal-3)"
                  aria-label="valid input"
                />
              ) : (
                <FiXCircle
                  size="28px"
                  color="var(--red-3)"
                  aria-label="invalid input"
                />
              )}
            </HelveticaNeue>
          ) : (
            <Fragment />
          )}
        </Shelf>
      </Shelf>
    );
  }
);

export default Input;
