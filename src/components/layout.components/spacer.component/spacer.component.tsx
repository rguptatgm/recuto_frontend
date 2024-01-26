import classNames from "classnames";
import "./spacer.component.scss";

interface SpacerProps {
  width?: string;
  className?: string;
}

const Spacer = ({ width, className }: SpacerProps): JSX.Element => {
  const spacerClassName = classNames(
    {
      spacer: true,
    },
    className
  );

  return <div className={spacerClassName} style={{ width }} />;
};

export default Spacer;
