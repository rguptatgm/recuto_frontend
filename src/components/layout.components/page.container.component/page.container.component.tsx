import classNames from "classnames";
import React from "react";
import "./page.container.component.scss";

interface PageContainerProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  backgroundColor?: "color-surface" | "color-background";
}

const PageContainer = ({
  children,
  className,
  backgroundColor,
}: PageContainerProps): JSX.Element => {
  const pageContainerClassName = classNames(
    {
      "page-container-body-content-wrapper": true,
      "page-container-body-content-wrapper--color-surface":
        backgroundColor === "color-surface",
      "page-container-body-content-wrapper--color-background":
        backgroundColor === "color-background",
    },
    className
  );

  return <div className={pageContainerClassName}>{children}</div>;
};

export default PageContainer;
