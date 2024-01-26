import React from "react";
import classNames from "classnames";
import "./sidebar.item.group.component.scss";
import { inject, observer } from "mobx-react";
import UserStore from "../../../stores/user.store";
import { RunningText } from "../../text.components/running.text.component/running.text.component";

interface SidebarItemGroupProps {
  label: string;
  children: React.ReactNode[];
  className?: string;
  userStore?: UserStore;
}

const SidebarItemGroup = ({
  label,
  children,
  className,
  userStore,
}: SidebarItemGroupProps): JSX.Element => {
  const sidebarItemGroupClassName = classNames(
    {
      group_wrapper: true,
    },
    className
  );

  return (
    <div>
      {React.Children.toArray(children).filter((child) => {
        if (!React.isValidElement(child)) {
          return false;
        }
        const hasPermission = child.props.permissionAlias
          ? userStore?.checkIfUserHasPermission({
              alias: child.props.permissionAlias,
            })
          : true;
        return hasPermission;
      }).length > 0 && (
        <div className={sidebarItemGroupClassName}>
          <RunningText className="group-wrapper-label ml-10 mb-5">
            {label.toUpperCase()}
          </RunningText>
          <div className="group_content">{children}</div>
        </div>
      )}
    </div>
  );
};

export default inject("userStore")(observer(SidebarItemGroup));
