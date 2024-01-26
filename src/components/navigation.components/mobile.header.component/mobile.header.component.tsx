import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-regular-svg-icons";
import { useEffect } from "react";
import "./mobile.header.comonent.scss";
import { useLocation } from "react-router-dom";
import Row from "../../layout.components/row.component/row.component";
import CompanyLogo from "../../general.components/company.logo.component/company.logo.component";

const MobileHeader = (): JSX.Element => {
  if (window.innerWidth >= 471) {
    return <></>;
  }

  const navigation = document.getElementById("navigation-bar");
  const location = useLocation();

  useEffect(() => {
    if (navigation == null) {
      return;
    }

    navigation.style.display = "none";
  }, [location]);

  const showMobileNavigation = (): void => {
    if (navigation == null) {
      return;
    }

    navigation.style.display = "flex";
  };

  if (
    location.pathname === "/" ||
    location.pathname === "/sign-in" ||
    location.pathname === "/sign-up"
  ) {
    return <></>;
  }

  return (
    <Row
      className="mobile-header-container"
      justifyContent="space-between"
      alignItems="center"
    >
      <CompanyLogo size={30} />
      <FontAwesomeIcon
        className="mobile-header-container-burger"
        onClick={showMobileNavigation}
        icon={faBars}
      />
    </Row>
  );
};

export default MobileHeader;
