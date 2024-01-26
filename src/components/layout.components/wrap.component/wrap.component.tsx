import classNames from "classnames";
import React from "react";
import "./wrap.component.scss";

interface WrapProps {
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "stretch";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  onClick?: () => void;
}

const Wrap = ({
  justifyContent,
  alignItems,
  children,
  className,
  onClick,
}: WrapProps): JSX.Element => {
  const wrapContainerClassName = classNames(
    {
      "wrap-container": true,
    },
    className
  );

  return (
    <div
      className={wrapContainerClassName}
      style={{ justifyContent, alignItems }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Wrap;
