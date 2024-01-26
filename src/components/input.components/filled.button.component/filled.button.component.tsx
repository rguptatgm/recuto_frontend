import React from "react";
import classNames from "classnames";
import "./filled.button.component.scss";
// import Loading from "components/general.compoenents/loading.components/loading.component/loading.component";

interface FilledButtonProps {
  color?: "primary" | "secondary" | "danger" | "warning";
  className?: string;
  label: string;
  disabled?: boolean;
  onClick?: (event: any) => void | Promise<void>;
  type?: "submit" | "button";
  form?: string;
  isLoading?: boolean;
  backgroundColor?: string;
}

const FilledButton = ({
  className,
  label,
  onClick,
  disabled = false,
  color = "secondary",
  type = "button",
  form,
  isLoading = false,
  backgroundColor,
}: FilledButtonProps): JSX.Element => {
  const style = backgroundColor ? { backgroundColor } : {};

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation(); // disable event bubbling
    if (onClick) {
      onClick(event);
    }
  };

  const filledButtonClassName = classNames(
    {
      "filled-button": true,
      "filled-button--loading": isLoading,
      "filled-button--disabled": disabled,
      "filled-button--secondary": color === "secondary",
      "filled-button--danger": color === "danger",
      "filled-button--warning": color === "warning",
    },
    className
  );

  return (
    <button
      style={style}
      type={type}
      form={form}
      className={filledButtonClassName}
      onClick={handleClick}
      disabled={disabled}
    >
      {/* {isLoading && <Loading className="button-loading" />} */}
      {isLoading && <>Loading...</>}
      {!isLoading ? label : ""}
    </button>
  );
};

export default FilledButton;
