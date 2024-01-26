import React from "react";
import classNames from "classnames";
import "./small.text.component.scss";
import Skeleton from "react-loading-skeleton";

interface SmallTextProps {
  children: React.ReactNode;
  className?: string;
}

export const SmallText = ({
  children,
  className,
}: SmallTextProps): JSX.Element => {
  const smallTextClassName = classNames(
    {
      "small-text": true,
    },
    className
  );

  return <p className={smallTextClassName}>{children}</p>;
};

export const SmallTextSkeleton = ({
  className,
}: {
  className?: string;
}): JSX.Element => {
  const smallTextSkeletonClassName = classNames(
    {
      "small-text": true,
    },
    className
  );
  return (
    <Skeleton width="100%" count={1} className={smallTextSkeletonClassName} />
  );
};
