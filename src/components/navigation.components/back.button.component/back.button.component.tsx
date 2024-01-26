import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/pro-regular-svg-icons";
import "./back.button.component.scss";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

interface BackButtonProps {
  onClick?: () => void;
  rootPath?: string;
  className?: string;
}

const BackButton = ({
  onClick,
  rootPath,
  className,
}: BackButtonProps): JSX.Element => {
  const navigate = useNavigate();

  const actionBackButtonClassName = classNames(
    {
      "action-back-button": true,
    },
    className
  );

  return (
    <div
      className={actionBackButtonClassName}
      onClick={() => {
        if (onClick) return onClick();

        if (rootPath != null) {
          const preparedPathName = location.pathname.substring(
            0,
            location.pathname.indexOf(rootPath) + rootPath.length
          );

          navigate(preparedPathName);
        } else {
          navigate(-1);
        }
      }}
    >
      <FontAwesomeIcon
        icon={faChevronLeft}
        className="back-icon text-color-inverted"
      />
    </div>
  );
};

export default BackButton;
