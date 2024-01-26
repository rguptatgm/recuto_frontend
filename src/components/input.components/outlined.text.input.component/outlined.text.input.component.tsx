import React, { useState } from "react";
import classNames from "classnames";
import "./outlined.text.input.component.scss";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SmallText } from "../../text.components/small.text.component/small.text.component";

interface OutlinedTextInputProps {
  className?: string;
  inputRef?: any;
  label?: string;
  name?: string;
  placeholder?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  suffixIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  validationMessage?: string;
  value?: string | number | Date;
  initialValue?: string;
  onChange?: (value: string | null) => void;
  infoLabel?: string;
  onInfoLabelClick?: () => void;
  disabled?: boolean;
  allowDecimalNumbers?: boolean;
}

const OutlinedTextInput = ({
  className,
  label,
  name,
  inputRef,
  placeholder,
  type = "text",
  suffixIcon,
  onClick,
  validationMessage,
  value,
  initialValue,
  onChange,
  infoLabel,
  onInfoLabelClick,
  disabled = false,
  allowDecimalNumbers = false,
}: OutlinedTextInputProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(true);
  const [inputType, setInputType] = useState(type);

  const outlinedTextInputClassName = classNames(
    {
      "outlined-text-input-container": true,
      "valiadtion-border": validationMessage != null,
      "mt-10 mb-15": label != null,
    },
    className
  );

  const inputFieldClass = classNames({
    "default-input-field--disabled": disabled,
    "default-input-field": true,
    "default-input-field--error": validationMessage != null,
    "default-input-field--info-label-active":
      infoLabel != null && infoLabel.length > 0,
  });

  // input label color on validation error
  const inputLabelClass = classNames({
    "default-input-field-label": label != null,
    "default-input-field-label--error": validationMessage != null,
  });

  // if input type is password then show suffix icon depending on showPassword state
  if (type === "password") {
    suffixIcon = showPassword ? (
      <FontAwesomeIcon icon={faEye} />
    ) : (
      <FontAwesomeIcon icon={faEyeSlash} />
    );
  }

  return (
    <div className={outlinedTextInputClassName}>
      {infoLabel != null && (
        <div
          className="outlined-text-input-container-info-tag"
          onClick={onInfoLabelClick}
        >
          {infoLabel}
        </div>
      )}
      <div className="outlined-text-input-container-wrapper">
        <div
          className="suffix-icon"
          onClick={() => {
            // when input type is password, toggle the password visibility
            // otherwise handle onClick event from OutlinedTextInputProps
            if (type !== "password") {
              return onClick;
            } else {
              setShowPassword(!showPassword);
              setInputType(showPassword ? "text" : "password");
            }
          }}
        >
          {suffixIcon}
        </div>
        <input
          step={
            inputType === "number" && allowDecimalNumbers ? 0.01 : undefined
          }
          name={name}
          {...inputRef}
          className={inputFieldClass}
          type={inputType}
          placeholder={placeholder}
          value={value}
          readOnly={disabled}
          defaultValue={initialValue}
          onChange={(event) => {
            if (onChange != null) {
              onChange(event.target.value);
            }
          }}
        />
        {label != null && <label className={inputLabelClass}> {label}</label>}
      </div>
      {validationMessage != null && (
        <SmallText className="validation-message ml-5">
          {validationMessage}
        </SmallText>
      )}
    </div>
  );
};

export default OutlinedTextInput;
