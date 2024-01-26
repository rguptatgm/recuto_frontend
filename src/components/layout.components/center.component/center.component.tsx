import classNames from "classnames";
import React from "react";
import "./center.component.scss";

interface CenterProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
}

const Center = ({ children, className, style }: CenterProps): JSX.Element => {
  const centerClassName = classNames(
    {
      "center-wrapper": true,
    },
    className
  );

  return (
    <div className={centerClassName} style={style}>
      {children}
    </div>
  );
};

export default Center;
