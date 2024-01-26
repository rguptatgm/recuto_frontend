import React from "react";
import classNames from "classnames";
import "./headline.component.scss";

interface HeadlineProps {
  children: React.ReactNode;
  className?: string;
}

const Headline = ({ children, className }: HeadlineProps): JSX.Element => {
  const headlineClassName = classNames(
    {
      headline: true,
    },
    className
  );

  return <p className={headlineClassName}>{children}</p>;
};

export default Headline;
