import classNames from "classnames";
import React from "react";
import "./row.component.scss";

interface RowProps {
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

const Row = ({
  justifyContent,
  alignItems,
  children,
  className,
  onClick,
}: RowProps): JSX.Element => {
  const rowContainerClassName = classNames(
    {
      "row-container": true,
    },
    className
  );

  return (
    <div
      className={rowContainerClassName}
      style={{ justifyContent, alignItems }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Row;
