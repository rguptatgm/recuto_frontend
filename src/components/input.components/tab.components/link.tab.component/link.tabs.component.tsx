import classNames from "classnames";
import "./link.tabs.component.scss";
import { useParams } from "react-router-dom";

interface TabsProps {
  className?: string;
  tabs: JSX.Element[];
  actions?: JSX.Element[];
  children?: JSX.Element | JSX.Element[];
}

const LinkTabs = ({
  className,
  tabs,
  children,
  actions,
}: TabsProps): JSX.Element => {
  const params = useParams();

  const tabsClassName = classNames(
    {
      "link-tabs-component-wrapper": true,
    },
    className
  );

  return (
    <div className={tabsClassName}>
      <div className="link-tabs-list-wrapper">
        <div className="link-tabs-list-container"> {tabs}</div>
        {actions != null && (
          <div className="link-tabs-list-container-actions">
            {actions.filter((action, index) => {
              if (action.key == null || params == null || params["*"] == null) {
                return null;
              }

              if (
                action.key.toString().split(",").includes(params["*"]) ||
                action.key
                  .toString()
                  .split(",")
                  .findIndex((key) => key.includes("*"))
              ) {
                return action;
              } else {
                return null;
              }
            })}
          </div>
        )}
      </div>
      <div className="link-tabs-content-container">{children}</div>
    </div>
  );
};

export default LinkTabs;
