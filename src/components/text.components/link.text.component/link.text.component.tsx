import React from "react";
import classNames from "classnames";
import "./link.text.component.scss";

interface LinkTextProps {
  children: React.ReactNode;
  className?: string;
  url: string;
}

const LinkText = ({ children, className, url }: LinkTextProps): JSX.Element => {
  const LinkTextClassName = classNames(
    {
      "link-text": true,
    },
    className
  );

  return (
    <a className={LinkTextClassName} href={url}>
      {children}
    </a>
  );
};

export default LinkText;
