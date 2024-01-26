import classNames from "classnames";
import "./link.button.component.scss";

interface LinkButtonProps {
  color?: "primary" | "secondary" | "danger" | "warning";
  className?: string;
  label: string;
  disabled?: boolean;
  onClick?: (event: any) => void | Promise<void>;
  type?: "submit" | "button";
  form?: string;
}

const LinkButton = ({
  className,
  label,
  onClick,
  disabled = false,
  color = "primary",
  type = "button",
  form,
}: LinkButtonProps): JSX.Element => {
  const linkButtonClassName = classNames(
    {
      "link-button": true,
      "link-button--disabled": disabled,
      "link-button--secondary": color === "secondary",
      "link-button--danger": color === "danger",
      "link-button--warning": color === "warning",
    },
    className
  );

  return (
    <button
      type={type}
      form={form}
      className={linkButtonClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default LinkButton;
