import Column from "../../layout.components/column.component/column.component";
import Row from "../../layout.components/row.component/row.component";
import Headline from "../../text.components/headline.component/headline.component";
import { RunningText } from "../../text.components/running.text.component/running.text.component";
import "./modal.header.component.scss";

interface ModalHeaderProps {
  title?: string | undefined;
  description?: string | undefined;
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

const ModalHeader = ({
  title,
  description,
  children,
  className,
}: ModalHeaderProps): JSX.Element => {
  return (
    <Column className="modal-header">
      {title != null && <Headline className="mb-10">{title}</Headline>}
      {description != null && (
        <RunningText className="mb-10">{description}</RunningText>
      )}
      <Row className={className}>{children}</Row>
    </Column>
  );
};

export default ModalHeader;
