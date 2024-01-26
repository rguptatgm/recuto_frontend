import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import "./logged.in.user.dropdown.component.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faFolderBlank,
  faSlidersUp,
} from "@fortawesome/pro-regular-svg-icons";
import { inject, observer } from "mobx-react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectStore from "../../../../stores/project.store";
import UserStore from "../../../../stores/user.store";
import Image from "../../image.component/image.component";
import { SmallText } from "../../../text.components/small.text.component/small.text.component";
import { RunningText } from "../../../text.components/running.text.component/running.text.component";
import { ICONS } from "../../../../assets/icons/icons";

interface LoggedInUserDropdownProps {
  className?: string;
  userStore?: UserStore;
  projectStore?: ProjectStore;
}

const LoggedInUserDropdown = ({
  className,
  userStore,
  projectStore,
}: LoggedInUserDropdownProps): JSX.Element => {
  const navigate = useNavigate();
  const { projectID } = useParams();
  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const ImageDropdownPropsClassName = classNames(
    {
      "dropdown-wrapper": true,
    },
    className
  );

  const handleClickOutside = (event: any): void => {
    if (ref.current && !(ref.current as any).contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  // handle logout
  const handleLogout = (): void => {
    setIsOpen(false);
    userStore?.clear();
  };

  const getPath = (path: string): string => {
    return `/projects/${projectID}/${path}`;
  };

  const _buildPreview = (): JSX.Element => {
    return (
      <div
        className="dropdown-element"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {userStore?.user?.profileImageUrl == null ||
        userStore?.user?.profileImageUrl?.trim().length === 0 ? (
          <Image imageUrl={ICONS.companyLogo} className="user-profile-image" />
        ) : (
          <Image
            imageUrl={userStore?.user?.profileImageUrl}
            className="user-profile-image"
          />
        )}

        <div className="user-info-wrapper">
          <RunningText className="user-info-wrapper-username text-color-inverted bold">
            {userStore?.user?.firstName ?? "-"} {userStore?.user?.lastName}
          </RunningText>
          <SmallText className="text-color-inverted">
            hardcoded subtitle
          </SmallText>
        </div>
      </div>
    );
  };

  const _buildDropUpContent = (): JSX.Element => {
    if (!isOpen) return <></>;

    return (
      <div className="dropdown-content">
        <div className="dropdown-content-container top-container">
          <div
            className="dropdown-down-item"
            onClick={() => navigate(getPath("settings"))}
          >
            <div className="dropdown-down-item-icon">
              <FontAwesomeIcon
                className="sidebar-item-icon"
                icon={faSlidersUp}
              />
            </div>
            <RunningText className="dropdown-down-item-label">
              Settings
            </RunningText>
          </div>
          <div className="dropdown-down-item" onClick={() => handleLogout()}>
            <div className="dropdown-down-item-icon">
              <FontAwesomeIcon
                className="sidebar-item-icon"
                icon={faArrowRightFromBracket}
              />
            </div>
            <RunningText className="dropdown-down-item-label">
              Logout
            </RunningText>
          </div>
        </div>

        <div
          className="dropdown-content-container bottom-container"
          onClick={() => navigate(getPath("settings"))}
        >
          <div
            className="dropdown-down-item"
            onClick={() => {
              if (projectStore?.currentProject?._id != null) {
                // setIsOpen(false);
                // navigate(
                //   `/studios/${studioStore?.studio?._id}/account/my-studio`
                // );
              }
            }}
          >
            <div className="dropdown-down-item-icon">
              <FontAwesomeIcon
                className="sidebar-item-icon"
                icon={faFolderBlank}
              />
            </div>

            <RunningText className="dropdown-down-item-label">
              {projectStore?.currentProject?.name ?? "Mein Project"}
            </RunningText>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={ImageDropdownPropsClassName} ref={ref}>
      {_buildDropUpContent()}
      {_buildPreview()}
    </div>
  );
};

export default inject(
  "userStore",
  "projectStore"
)(observer(LoggedInUserDropdown));
