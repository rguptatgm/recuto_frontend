import React from "react";
import classNames from "classnames";
import { SmallText } from "../../text.components/small.text.component/small.text.component";

interface OutlinedTextAreaProps {
  className?: string;
  inputRef?: any;
  label?: string;
  placeholder?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  validationMessage?: string;
  value?: string;
  initialValue?: string;
  onChange?: (value: string | null) => void;
  infoLabel?: string;
  onInfoLabelClick?: () => void;
  disabled?: boolean;
  rows?: number;
}

const OutlinedTextArea = ({
  className,
  label,
  inputRef,
  placeholder,
  onClick,
  validationMessage,
  value,
  initialValue,
  onChange,
  infoLabel,
  onInfoLabelClick,
  disabled = false,
  rows = 5,
}: OutlinedTextAreaProps): JSX.Element => {
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
    "default-input-field default-input-area-field": true,
    "default-input-field--error": validationMessage != null,
    "default-input-field--info-label-active":
      infoLabel != null && infoLabel.length > 0,
  });

  // input label color on validation error
  const inputLabelClass = classNames({
    "default-input-field-label default-area-field-label": label != null,
    "default-input-field-label--error": validationMessage != null,
  });

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
        <textarea
          style={{ resize: "vertical" }}
          rows={rows}
          {...inputRef}
          className={inputFieldClass}
          type="text"
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

export default OutlinedTextArea;
