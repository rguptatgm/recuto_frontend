import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import "./tab.component.scss";
import { inject, observer } from "mobx-react";
import UserStore from "../../../../stores/user.store";
import { ModalStore } from "../../../../stores/modal.store";

interface TabProps {
  label: string;
  path?: string;
  rootPath?: string;
  children?: JSX.Element;
  className?: string;
  disabled?: boolean;
  userStore?: UserStore;
  permissionAlias?: string;
  onClick?: () => void;
  dirty?: boolean;
  active?: boolean;
  modalStore?: ModalStore;
}

const Tab = ({
  label,
  path,
  onClick,
  rootPath,
  className,
  disabled = false,
  userStore,
  permissionAlias,
  dirty,
  active,
  modalStore,
}: TabProps): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const hasPermission = userStore?.checkIfUserHasPermission({
    alias: permissionAlias,
  });

  const handleClick = (): void => {
    if (path != null && !disabled) {
      if (rootPath != null) {
        const preparedPathName = location.pathname.substring(
          0,
          location.pathname.indexOf(rootPath) + rootPath.length
        );

        return navigate(`${preparedPathName}/${path}`);
      }

      navigate(location.pathname.replace(/\/[^/]*$/, `/${path}`));
    }
    if (onClick != null && !disabled) {
      onClick();
    }
  };

  const tabClassName = classNames(
    {
      "tab-component": true,
      "tab-component--disabled": disabled,
      "active-tab-component":
        (path != null && location.pathname.includes(`/${path}`)) || active,
    },
    className
  );

  if (!hasPermission) return <></>;

  return (
    <button
      className={tabClassName}
      onClick={() => {
        if (dirty) {
          modalStore?.showConfirmAlert({
            title: "Weiter ohne Speichern?",
            description:
              "Es sind noch nicht gespeicherte Änderungen vorhanden. Möchten Sie wirklich fortfahren?",
            confirmLabel: "Weiter",
            onConfirm: () => {
              handleClick();
            },
          });
        } else {
          handleClick();
        }
      }}
    >
      {label}
    </button>
  );
};

export default inject("userStore", "modalStore")(observer(Tab));
