import React from "react";
import classNames from "classnames";
import "./sidebar.item.component.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useLocation, useNavigate } from "react-router-dom";
import { inject, observer } from "mobx-react";
import UserStore from "../../../stores/user.store";
import { RunningText } from "../../text.components/running.text.component/running.text.component";

interface SidebarNavigationItemProps {
  className?: string;
  id?: string;
  children: React.ReactNode;
  icon: IconProp;
  path: string;
  permissionAlias?: string;
  userStore?: UserStore;
}

const SidebarNavigationItem = ({
  className,
  id,
  children,
  icon,
  path,
  permissionAlias,
  userStore,
}: SidebarNavigationItemProps): JSX.Element => {
  const hasPermission = userStore?.checkIfUserHasPermission({
    alias: permissionAlias,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const sidebarNavigationItemClassName = classNames(
    {
      "navigation-item-wrapper": true,
      "navigation-item-wrapper--active": location.pathname.includes(path),
    },
    className
  );

  if (!hasPermission) return <></>;

  return (
    <div
      className={sidebarNavigationItemClassName}
      id={id}
      onClick={() => {
        navigate(path);
      }}
    >
      <FontAwesomeIcon className="sidebar-item-icon" icon={icon} />
      <RunningText className="sidebar-item-label">{children}</RunningText>
    </div>
  );
};

export default inject("userStore")(observer(SidebarNavigationItem));
