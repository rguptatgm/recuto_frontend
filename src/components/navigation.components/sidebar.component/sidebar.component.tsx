import classNames from "classnames";
import "./sidebar.component.scss";
import SidebarNavigationItem from "../sidebar.item.comonent/sidebar.item.component";
import SidebarItemGroup from "../sidebar.item.group.component/sidebar.item.group.component";
import { faClose, faInfoSquare } from "@fortawesome/pro-regular-svg-icons";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Row from "../../layout.components/row.component/row.component";
import CompanyLogo from "../../general.components/company.logo.component/company.logo.component";
import Column from "../../layout.components/column.component/column.component";
import { inject, observer } from "mobx-react";
import ProjectStore from "../../../stores/project.store";
import { faHouse, faPen, faCamera, faStar, faBook } from "@fortawesome/free-solid-svg-icons";
import LoggedInUserDropdown from "../../general.components/dropdown.components/logged.in.user.dropdown.component/logged.in.user.dropdown.component";

interface SidebarNavigationProps {
  className?: string;
  projectStore?: ProjectStore;
}

const SidebarNavigation = ({
  className,
  projectStore,
}: SidebarNavigationProps): JSX.Element => {
  const { projectID } = useParams();
  const navigate = useNavigate();

  const sidebarNavigationClassName = classNames(
    {
      "sidebar-navigation-wrapper": true,
    },
    className
  );

  if (projectID == null) {
    return <Navigate to="/" replace />;
  }

  const getPath = (path: string): string => {
    return `/projects/${projectID}/${path}`;
  };

  const closeMobileNavigation = (): void => {
    const navigation = document.getElementById("navigation-bar");
    if (navigation == null) {
      return;
    }

    navigation.style.display = "none";
  };

  return (
    <div className={sidebarNavigationClassName} id="navigation-bar">
      <div className="sidebar-navigation-body">
        <Row justifyContent="space-between">
          <CompanyLogo
            className="sidebar-header-logo"
            size={30}
            onClick={() => {
              projectStore?.setCurrentProject(undefined);
              navigate("/projects");
            }}
          />

          <FontAwesomeIcon
            className="sidebar-header-close hide-on-desktop"
            icon={faClose}
            onClick={closeMobileNavigation}
          />
        </Row>
        <div className="sidebar-navigation-content">
          <SidebarItemGroup label="Group">
            <SidebarNavigationItem icon={faHouse} path={getPath("home")}>
              Home
            </SidebarNavigationItem>

            <SidebarNavigationItem icon={faPen} path={getPath("interview-create")}>
              Interview erstellen
            </SidebarNavigationItem>

            <SidebarNavigationItem icon={faBook} path={getPath("interview-create-question")}>
              Frage erstellen
            </SidebarNavigationItem>

            <SidebarNavigationItem icon={faCamera} path={getPath("interview-participate")}>
              Interview halten
            </SidebarNavigationItem>

            <SidebarNavigationItem icon={faStar} path={getPath("interview-review")}>
              Interview bewerten
            </SidebarNavigationItem>

            <SidebarNavigationItem
              icon={faInfoSquare}
              path={getPath("example")}
              permissionAlias="USER_PROFILE_MENU"
            >
              Examples
            </SidebarNavigationItem>
          </SidebarItemGroup>
        </div>
      </div>
      <Column>
        <LoggedInUserDropdown />
      </Column>
    </div>
  );
};

export default inject("projectStore")(observer(SidebarNavigation));
