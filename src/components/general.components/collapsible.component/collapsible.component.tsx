import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { faAngleDown, faAngleUp } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Row from "../../layout.components/row.component/row.component";

interface CollapsibleProps {
  key?: string;
  trigger:
    | string
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  transitionTime?: number;
  overflowWhenOpen?:
    | "hidden"
    | "initial"
    | "visible"
    | "auto"
    | "scroll"
    | "inherit"
    | "unset";
  className?: string;
  openedClassName?: string;
  children?: React.ReactNode;
  onOpening?: () => void;
  isOpened?: boolean;
}

const CollapsibleComponent = ({
  key,
  trigger,
  transitionTime = 200,
  overflowWhenOpen = "initial",
  className,
  openedClassName,
  children,
  onOpening,
  isOpened,
}: CollapsibleProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false as any);

  useEffect(() => {
    setIsOpen(isOpened);
  }, [isOpened]);

  return (
    <Collapsible
      key={key}
      trigger={
        <Row
          className="cursor-pointer"
          justifyContent="space-between"
          alignItems="center"
        >
          {trigger}
          <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
        </Row>
      }
      transitionTime={transitionTime}
      overflowWhenOpen={overflowWhenOpen}
      className={className}
      openedClassName={openedClassName}
      open={isOpen}
      onOpening={() => {
        if (onOpening) {
          onOpening();
        }
      }}
      onClosing={() => {
        setIsOpen(false);
      }}
    >
      {children}
    </Collapsible>
  );
};

export default CollapsibleComponent;
