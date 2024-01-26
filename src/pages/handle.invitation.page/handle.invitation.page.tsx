import { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import "./handle.invitation.page.scss";
import { useNavigate } from "react-router-dom";
import UserStore from "../../stores/user.store";
import { HttpInvitationService } from "../../services/http.clients/http.invitation.client";
import { HttpAuthService } from "../../services/http.clients/http.auth.client";
import Column from "../../components/layout.components/column.component/column.component";
import SizedContainer from "../../components/layout.components/sized.container.component/sized.container.component";
import { ContainerSizes } from "../../globals/enums/global.enum";
import ComponentWrapper from "../../components/general.components/component.wrapper.component/component.wrapper.component";
import SmallHeadline from "../../components/text.components/small.headline.component/small.headline.component";
import { RunningText } from "../../components/text.components/running.text.component/running.text.component";
import Row from "../../components/layout.components/row.component/row.component";
import LinkButton from "../../components/input.components/link.button.component/link.button.component";
import FilledButton from "../../components/input.components/filled.button.component/filled.button.component";
import Headline from "../../components/text.components/headline.component/headline.component";
import CompanyLogo from "../../components/general.components/company.logo.component/company.logo.component";

interface HandleInvitationPageProps {
  userStore?: UserStore;
}

const HandleInvitationPage = ({
  userStore,
}: HandleInvitationPageProps): JSX.Element => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const invitations = userStore?.projectUserInvitations;

  useEffect(() => {
    userStore?.fetchAndSetUserProjectInvitations();
  }, []);

  const acceptStudioInvitation = async (
    invitationId: string
  ): Promise<void> => {
    setIsLoading(true);
    await HttpInvitationService.getInstance().acceptInvitation(invitationId);
    await HttpAuthService.getInstance().refreshToken();
    setIsLoading(false);
    navigate("/");
  };

  const declineStudioInvitation = async (
    invitationId: string
  ): Promise<void> => {
    setIsLoading(true);
    await HttpInvitationService.getInstance().declineInvitation(invitationId);
    setIsLoading(false);
    navigate("/");
  };

  const _buildHandleInvitationContent = (): JSX.Element => {
    return (
      <Column justifyContent="center" alignItems="center">
        {invitations?.data.map((invitation, index) => (
          <SizedContainer
            className="mb-15"
            key={`invitation-${index}`}
            size={ContainerSizes.M}
          >
            <ComponentWrapper>
              <SmallHeadline className="mb-10">
                {invitation.resource?.name}
              </SmallHeadline>
              <RunningText>
                You have been invited to join the project{" "}
                {invitation.resource?.name}.
              </RunningText>
              <Row
                className="mt-15"
                justifyContent="space-between"
                alignItems="center"
              >
                <LinkButton
                  className="decline-button"
                  label="Decline"
                  disabled={isLoading}
                  onClick={() => {
                    if (invitation._id == null) {
                      return;
                    }
                    declineStudioInvitation(invitation._id);
                  }}
                />
                <FilledButton
                  isLoading={isLoading}
                  label="Accept invitation"
                  onClick={() => {
                    if (invitation._id == null) {
                      return;
                    }
                    acceptStudioInvitation(invitation._id);
                  }}
                />
              </Row>
            </ComponentWrapper>
          </SizedContainer>
        ))}
      </Column>
    );
  };

  const _buildPreview = (): JSX.Element => {
    return (
      <div className="handle-invitation-preview-container">
        <CompanyLogo className="mb-20" size={150} />
        <Headline className="handle-invitation-header">
          You have been invited to join a project.
        </Headline>
      </div>
    );
  };

  return (
    <Row className="handle-invitation-page">
      <div className="handle-invitation-page-wrapper">
        {_buildPreview()}
        <div className="handle-invitation-form-wrapper">
          {_buildHandleInvitationContent()}
        </div>
      </div>
    </Row>
  );
};

export default inject("userStore")(observer(HandleInvitationPage));
