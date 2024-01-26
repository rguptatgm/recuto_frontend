import classNames from "classnames";
import "./filled.checkbox.component.scss";

interface FilledCheckboxProps {
  className?: string;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  isDisabled?: boolean;
}

const FilledCheckbox = ({
  className,
  onChange,
  checked,
  isDisabled,
}: FilledCheckboxProps): JSX.Element => {
  const filledCheckboxClassName = classNames(
    {
      "filled-checkbox-wrapper": true,
    },
    className
  );

  if (isDisabled === true) {
    return (
      <label className={filledCheckboxClassName}>
        <input type="checkbox" disabled={true} />
        <span className="filled-checkbox-input"></span>
      </label>
    );
  } else {
    return (
      <label className={filledCheckboxClassName}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            if (onChange != null && checked != null) {
              onChange(!checked);
            }
          }}
        />
        <span className="filled-checkmark-container"></span>
      </label>
    );
  }
};

export default FilledCheckbox;
