import classNames from "classnames";
import React from "react";
import "./split.layout.scss";

interface Splitlayout {
  leftChild: React.ReactNode;
  leftGrow?: number;
  rightChild: React.ReactNode;
  rightGrow?: number;
  flexDirection?: "row" | "column";
  className?: string;
  maxWidthLeft?: number;
  maxWidthRight?: number;
  minWidthLeft?: number;
  minWidthRight?: number;
  useAsPage?: boolean;
  collapseable?: boolean;
  placeholder?: React.ReactNode;
}

const SplitLayout = ({
  leftChild,
  leftGrow = 1,
  rightChild,
  rightGrow = 1,
  flexDirection = "row",
  maxWidthLeft,
  maxWidthRight,
  minWidthLeft,
  minWidthRight,
  useAsPage = false,
  collapseable = false,
  placeholder,
  className,
}: Splitlayout): JSX.Element => {
  const splitLayoutClassName = classNames(
    {
      "split-layout-wrapper": true,
      "split-layout-flex-column": flexDirection === "column",
    },
    className
  );

  return (
    <div className={splitLayoutClassName}>
      {((useAsPage && rightChild == null) ||
        window.innerWidth > 830 ||
        !useAsPage) && (
        <div
          className="split-container-wrapper"
          style={{
            flex:
              collapseable && useAsPage && rightChild != null ? 0 : leftGrow,
            maxWidth: window.innerWidth > 830 ? maxWidthLeft ?? "none" : "none",
            opacity:
              collapseable && useAsPage && rightChild != null ? "0" : "1",
            minWidth:
              collapseable && useAsPage && rightChild != null
                ? "0px"
                : minWidthLeft ?? "none",
          }}
        >
          {leftChild}
        </div>
      )}
      {(rightChild != null || window.innerWidth > 830) && (
        <div
          className="split-container-wrapper"
          style={{
            flex: rightGrow,
            maxWidth:
              window.innerWidth > 830 ? maxWidthRight ?? "none" : "none",
            minWidth: minWidthRight ?? "none",
            zIndex: 2,
          }}
        >
          {rightChild ?? placeholder}
        </div>
      )}
    </div>
  );
};

export default SplitLayout;
