import React from "react";
import classNames from "classnames";
import "./date.text.component.scss";
import Moment from "react-moment";

interface DateTextProps {
  children: React.ReactNode;
  className?: string;
  format?: string;
}

const DateText = ({
  children,
  className,
  format = "",
}: DateTextProps): JSX.Element => {
  const dateTextClassName = classNames(
    {
      "running-text": true,
    },
    className
  );

  return (
    <Moment format={format} className={dateTextClassName}>
      {children as any}
    </Moment>
  );
};

export default DateText;
