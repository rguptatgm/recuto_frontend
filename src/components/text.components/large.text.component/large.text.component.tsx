import React from "react";
import classNames from "classnames";
import "./large.text.component.scss";
import Skeleton from "react-loading-skeleton";

interface LargeTextProps {
  children: React.ReactNode;
  className?: string;
}

export const LargeText = ({
  children,
  className,
}: LargeTextProps): JSX.Element => {
  const largeTextClassName = classNames(
    {
      "large-text": true,
    },
    className
  );

  return <p className={largeTextClassName}>{children}</p>;
};

export const LargeTextSkeleton = ({
  className,
}: {
  className?: string;
}): JSX.Element => {
  const largeTextSkeletonClassName = classNames(
    {
      "large-text": true,
    },
    className
  );
  return <Skeleton count={1} className={largeTextSkeletonClassName} />;
};
