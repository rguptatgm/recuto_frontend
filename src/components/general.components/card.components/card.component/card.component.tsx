import Column from "../../../layout.components/column.component/column.component";
import { RunningText } from "../../../text.components/running.text.component/running.text.component";
import SmallHeadline from "../../../text.components/small.headline.component/small.headline.component";
import "./card.component.scss";

interface CardComponentProps {
  title: string;
  value: string | undefined;
  onClick?: () => void;
}

const CardComponent = ({
  title,
  value,
  onClick,
}: CardComponentProps): JSX.Element => {
  return (
    <Column className="fact-card-wrapper" onClick={onClick}>
      <SmallHeadline className="mb-5">{title}</SmallHeadline>
      <RunningText>{value}</RunningText>
    </Column>
  );
};

export default CardComponent;
