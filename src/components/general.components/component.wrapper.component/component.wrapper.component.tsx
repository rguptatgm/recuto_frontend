import classNames from "classnames";
import React from "react";
import "./component.wrapper.component.scss";
import Column from "../../layout.components/column.component/column.component";
import TitleText from "../../text.components/title.text.component/title.text.component";

interface ComponentWrapperProps {
  title?: string;
  children: JSX.Element | JSX.Element[] | any;
  actions?: JSX.Element | JSX.Element[];
  noPadding?: boolean;
  noBorderRadius?: boolean;
  className?: string;
  disabled?: boolean;
  autoWidth?: boolean;
  key?: React.Key | null | undefined;
  draggable?: boolean;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
}

const ComponentWrapper = ({
  title,
  children,
  actions,
  noPadding = false,
  noBorderRadius = false,
  className,
  disabled = false,
  autoWidth = false,
  key,
  draggable = false,
  onDragStart,
}: ComponentWrapperProps): JSX.Element => {
  const componenContainerClassName = classNames(
    {
      "component-container": true,
      "component-container--auto-width": autoWidth,
    },
    className
  );

  const componentWrapperClassName = classNames(
    {
      "component-wrapper-container": true,
      "component-wrapper-container--no-padding": noPadding,
      "component-wrapper-container--no-border-radius": noBorderRadius,
    },
    className
  );

  const componentWrapperContentClassName = classNames({
    "component-wrapper-container-content": true,
    "component-wrapper-container-content--disabled": disabled,
  });

  return (
    <Column
      className={componenContainerClassName}
      key={key}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      {(title != null || actions != null) && (
        <div className="component-wrapper-container-header">
          <TitleText>{title}</TitleText>
          {actions}
        </div>
      )}
      <div className={componentWrapperClassName}>
        <div className={componentWrapperContentClassName}>{children}</div>
      </div>
    </Column>
  );
};

export default ComponentWrapper;
