import React from "react";
import classNames from "classnames";
import "./large.headline.component.scss";

interface LargeHeadlineProps {
  children: React.ReactNode;
  className?: string;
}

const LargeHeadline = ({
  children,
  className,
}: LargeHeadlineProps): JSX.Element => {
  const largeHeadlineClassName = classNames(
    {
      "large-headline": true,
    },
    className
  );

  return <p className={largeHeadlineClassName}>{children}</p>;
};

export default LargeHeadline;
