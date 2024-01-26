import React from "react";
import classNames from "classnames";
import "./small.headline.component.scss";

interface SmallHeadlineProps {
  children: React.ReactNode;
  className?: string;
}

const SmallHeadline = ({
  children,
  className,
}: SmallHeadlineProps): JSX.Element => {
  const smallHeadlineClassName = classNames(
    {
      "small-headline": true,
    },
    className
  );

  return <p className={smallHeadlineClassName}>{children}</p>;
};

export default SmallHeadline;
