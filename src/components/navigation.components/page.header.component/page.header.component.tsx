import React from "react";
import "./page.header.component.scss";
import Row from "../../layout.components/row.component/row.component";
import Headline from "../../text.components/headline.component/headline.component";
import BackButton from "../back.button.component/back.button.component";

interface PageHeaderProps {
  label: string;
  showBackButton?: boolean;
  children?: React.ReactNode | React.ReactNode[];
}

const PageHeader = ({
  label,
  children,
  showBackButton,
}: PageHeaderProps): JSX.Element => {
  return (
    <Row
      className="page-header-container"
      justifyContent="space-between"
      alignItems="center"
    >
      <Row className="action-row" alignItems="center">
        {showBackButton && <BackButton className="mr-20" />}
        <Headline>{label}</Headline>
      </Row>
      <Row className="action-row" alignItems="center" justifyContent="flex-end">
        {children}
      </Row>
    </Row>
  );
};

export default PageHeader;
