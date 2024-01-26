import OutlinedTextInput from "../outlined.text.input.component/outlined.text.input.component";
import "./color.input.component.scss";
import classNames from "classnames";

interface ColorInputProps {
  label: string;
  value?: string;
  onChange?: (value: string | null) => void;
  validationMessage?: string;
  inputRef?: any;
  className?: string;
}

const ColorInput = ({
  label,
  value,
  onChange,
  validationMessage,
  inputRef,
  className,
}: ColorInputProps): JSX.Element => {
  const colorInputClassName = classNames(
    {
      "color-input-container": true,
    },
    className
  );
  return (
    <OutlinedTextInput
      className={colorInputClassName}
      label={label}
      type="color"
      value={value}
      onChange={onChange}
      validationMessage={validationMessage}
      inputRef={inputRef}
    />
  );
};

export default ColorInput;

interface ColorInputPropsReadOnly {
  value?: string;
  className?: string;
}

export const ColorInputReadOnly = ({
  value,
  className,
}: ColorInputPropsReadOnly): JSX.Element => {
  if (value == null || value === "") {
    value = "#30d598";
  }

  const style = {
    background: value,
  };

  const colorInputReadonlyClassName = classNames(
    {
      "color-input-circle": true,
    },
    className
  );
  return <div className={colorInputReadonlyClassName} style={style}></div>;
};
