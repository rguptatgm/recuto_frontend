import React from "react";
import "./main.layout.scss";

interface MainLayoutProps {
  sideBars?: React.ReactNode[];
  topBars?: React.ReactNode[];
  children: React.ReactNode;
}

const MainLayout = ({
  sideBars = [],
  topBars = [],
  children,
}: MainLayoutProps): JSX.Element => {
  return (
    <div className="page-container-wrapper">
      {sideBars.map((sideBar, index) => (
        <div key={index} className="page-container-sidebar">
          {sideBar}
        </div>
      ))}
      <div className="topbars-body-container">
        {topBars.map((topBar, index) => (
          <div key={index} className="page-container-topbar">
            {topBar}
          </div>
        ))}
        <div className="page-container-body">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
