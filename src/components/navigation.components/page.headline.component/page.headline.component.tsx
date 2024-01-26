import classNames from "classnames";
import React from "react";
import "./page.headline.component.scss";
import BackButton from "../back.button.component/back.button.component";
import Row from "../../layout.components/row.component/row.component";
import Headline from "../../text.components/headline.component/headline.component";

interface PageHeadlineProps {
  title?: string;
  actions?: JSX.Element | JSX.Element[];
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  classNameActions?: string;
  showBackButton?: boolean;
  rootPath?: string;
  showBorderBottom?: boolean;
  hideBackground?: boolean;
  disablePadding?: boolean;
}

const PageHeadline = ({
  title,
  children,
  actions,
  className,
  classNameActions,
  showBackButton = false,
  showBorderBottom = true,
  rootPath,
  hideBackground = false,
  disablePadding = false,
}: PageHeadlineProps): JSX.Element => {
  const pageHeadlineClassName = classNames(
    {
      "page-headline-container": true,
      "page-headline-container-border-bottom": showBorderBottom,
      "page-headline-container-background": !hideBackground,
      "page-headline-container-padding": !disablePadding,
    },
    className
  );

  const pageHeadlineActionsClassName = classNames(
    {
      "page-headline-left-actions": true,
    },
    classNameActions
  );

  const _buildBackButton = (): JSX.Element => {
    return <BackButton className="mr-20" rootPath={rootPath} />;
  };

  return (
    <Row
      className={pageHeadlineClassName}
      alignItems="center"
      justifyContent="space-between"
    >
      <Row alignItems="center" className={pageHeadlineActionsClassName}>
        {showBackButton && _buildBackButton()}
        {title != null && <Headline>{title}</Headline>}
        {children}
      </Row>
      {actions && (
        <Row
          className="page-headline-container-actions"
          justifyContent="flex-end"
        >
          {actions}
        </Row>
      )}
    </Row>
  );
};

export default PageHeadline;
