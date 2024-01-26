import classNames from "classnames";
import React from "react";
import { RunningText } from "../running.text.component/running.text.component";
import "./highlighted.info.text.component.scss";

interface HighlightedInfoTextProps {
  children: React.ReactNode;
  className?: string;
  color?: "success" | "error" | "warning";
}

const HighlightedInfoText = ({
  children,
  className,
  color: status = "success",
}: HighlightedInfoTextProps): JSX.Element => {
  const highlightedInfoTextClass = classNames(
    {
      "highlighted-info-text": true,
      "highlighted-info-text-success": status === "success",
      "highlighted-info-text-error": status === "error",
      "highlighted-info-text-warning": status === "warning",
    },
    className
  );
  return (
    <div className={highlightedInfoTextClass}>
      <RunningText className="highlighted-info-text-pargraph">
        {children}
      </RunningText>
    </div>
  );
};

export default HighlightedInfoText;
