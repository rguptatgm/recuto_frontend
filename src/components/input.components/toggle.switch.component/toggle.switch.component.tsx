import classNames from "classnames";
import "./toggle.switch.component.scss";

interface ToggleSwitchProps {
  className?: string;
  onChange?: () => void;
}

const ToggleSwitch = ({
  className,
  onChange,
}: ToggleSwitchProps): JSX.Element => {
  const toggleSwitchClassName = classNames(
    {
      "toggle-switch-wrapper": true,
    },
    className
  );

  return (
    <div className={toggleSwitchClassName}>
      <input type="checkbox" id="cbx" style={{ display: "none" }} />
      <label htmlFor="cbx" className="toggle">
        <span></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
