import { useEffect, useState } from "react";
import "./loading.page.scss";
import { useNavigate } from "react-router-dom";
import UserStore from "../../stores/user.store";
import { getRefreshToken } from "../../globals/helpers/storage.helper";
import { inject, observer } from "mobx-react";
import { HttpInvitationService } from "../../services/http.clients/http.invitation.client";
import Column from "../../components/layout.components/column.component/column.component";
import Row from "../../components/layout.components/row.component/row.component";
import CompanyLogo from "../../components/general.components/company.logo.component/company.logo.component";
import SmallHeadline from "../../components/text.components/small.headline.component/small.headline.component";
import ProjectStore from "../../stores/project.store";

interface LoadingPageProps {
  userStore?: UserStore;
  projectStore?: ProjectStore;
}

const LoadingPage = ({ userStore, projectStore }: LoadingPageProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handleState();
    }, 1200);
  }, [userStore?.user]);

  const handleState = async (): Promise<void> => {
    const user = userStore?.user;

    // User exists, navigate to studios
    if (user != null) {
      if (!user.setupCompleted) {
        return navigate("/user-setup");
      }

      // Check if user got invitated to a studio
      const userInvitations =
        await HttpInvitationService.getInstance().getInvitationsOfCurrentUser();

      if (userInvitations.length > 0) {
        return navigate("/handle-invitations");
      }

      // fetch all projects for the current user
      const projects = await projectStore?.fetchAndSetProjects();

      // fetch client roles and set them
      await userStore?.fetchAndSetClientRoles();

      if (projects == null) {
        return navigate("/user-setup");
      }

      navigate(`/projects`);
    }
  };

  const initialize = async (): Promise<void> => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    // Check if auth token exists
    const refreshToken = getRefreshToken();
    if (refreshToken == null) {
      userStore?.clear();
      return navigate("/sign-in");
    }

    // Try getting user
    const user = await userStore?.fetchAndSetCurrentUser();

    if (user == null) {
      userStore?.clear();
      return navigate("/sign-in");
    }
  };

  return (
    <Column justifyContent="center" className="full-height">
      <Row justifyContent="center">
        <CompanyLogo size={150} />
      </Row>
      <Row justifyContent="center">
        <SmallHeadline>Loading ...</SmallHeadline>
      </Row>
    </Column>
  );
};

export default inject("userStore", "projectStore")(observer(LoadingPage));
