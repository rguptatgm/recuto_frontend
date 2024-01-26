import classNames from "classnames";
import React from "react";
import "./sized.container.component.scss";
import { ContainerSizes } from "../../../globals/enums/global.enum";

interface SizedContainerProps {
  children?: React.ReactNode | React.ReactNode[];
  size: ContainerSizes;
  className?: string;
  customSize?: number;
}

const SizedContainer = ({
  children,
  size,
  className,
  customSize,
}: SizedContainerProps): JSX.Element => {
  const contentContainerClassName = classNames(
    "sized-container",
    `sized-container--${size}`,
    className
  );

  if (size === ContainerSizes.CUSTOM) {
    return (
      <div className="sized-container" style={{ maxWidth: `${customSize}px` }}>
        {children}
      </div>
    );
  }

  return <div className={contentContainerClassName}>{children}</div>;
};

export default SizedContainer;
