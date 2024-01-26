import classNames from "classnames";
import React from "react";
import "./title.text.component.scss";

interface TitleTextProps {
  children: React.ReactNode;
  className?: string;
  color?: "text-secondary" | "text-primary";
}

const TitleText = ({
  children,
  className,
  color = "text-primary",
}: TitleTextProps): JSX.Element => {
  const titleTextClassName = classNames(
    {
      "title-text": true,
      "title-text--color-secondary": color === "text-secondary",
    },
    className
  );

  return <h3 className={titleTextClassName}>{children}</h3>;
};

export default TitleText;
