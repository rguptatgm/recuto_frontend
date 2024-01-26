import React from "react";
import classNames from "classnames";
import "./running.text.component.scss";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

interface RunningTextProps {
  children: React.ReactNode;
  className?: string;
  navLink?: string;
}

export const RunningText = ({
  children,
  className,
  navLink,
}: RunningTextProps): JSX.Element => {
  const runningTextClassName = classNames(
    {
      "running-text": true,
    },
    className
  );

  if (navLink == null) {
    return <p className={runningTextClassName}>{children}</p>;
  }

  return (
    <Link className={runningTextClassName} to={navLink}>
      {children}
    </Link>
  );
};

export const RunningTextSkelton = ({
  className,
}: {
  className?: string;
}): JSX.Element => {
  const runningTextSkelton = classNames(
    {
      "running-text": true,
    },
    className
  );

  return <Skeleton count={1} width="100%" className={runningTextSkelton} />;
};
