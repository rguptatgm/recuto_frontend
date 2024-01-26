import classNames from "classnames";
import "./icon.button.component.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IconButtonProps {
  className?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  form?: string;
  icon: IconProp;
}

const IconButton = ({
  className,
  onClick,
  type = "button",
  form,
  icon,
}: IconButtonProps): JSX.Element => {
  const iconButtonClassName = classNames(
    {
      "icon-button": true,
    },
    className
  );

  return (
    <FontAwesomeIcon
      className={iconButtonClassName}
      icon={icon}
      onClick={onClick}
      type={type}
      from={form}
    />
  );
};

export default IconButton;
