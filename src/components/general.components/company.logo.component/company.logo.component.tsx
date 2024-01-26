import "./company.logo.component.scss";
import classNames from "classnames";
import { ICONS } from "../../../assets/icons/icons";

interface CompanyLogoProps {
  className?: string;
  size?: number;
  onClick?: () => void;
}

const CompanyLogo = ({
  className,
  size = 50,
  onClick,
}: CompanyLogoProps): JSX.Element => {
  const companyLogoClass = classNames(
    {
      "company-icon": true,
      "company-icon--cursor-pointer": onClick != null,
    },
    className
  );

  return (
    <img
      onClick={onClick}
      className={companyLogoClass}
      style={{ height: size }}
      src={ICONS.companyLogo}
    />
  );
};

export default CompanyLogo;
