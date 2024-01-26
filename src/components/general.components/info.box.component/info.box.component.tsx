import React from "react";
import classNames from "classnames";
import {
  faCircleInfo,
  IconDefinition,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./info.box.component.scss";

interface InfoBoxProps {
  title?: string;
  icon?: IconDefinition;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const InfoBox = ({
  title = "Info",
  children,
  className,
}: InfoBoxProps): JSX.Element => {
  const infoBoxClass = classNames(
    {
      "info-box": true,
    },
    className
  );

  return (
    <div className={infoBoxClass}>
      <div className="info-box-icon">
        <FontAwesomeIcon className="icon" icon={faCircleInfo} />
        <span>{title}</span>
      </div>
      <div className="info-box-content">{children}</div>
    </div>
  );
};

export default InfoBox;
