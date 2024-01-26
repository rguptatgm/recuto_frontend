import { inject, observer } from "mobx-react";
import { useState } from "react";
import "./user.setup.page.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import UserStore from "../../../stores/user.store";
import { User } from "../../../schemas/user.schemas/user.schema";
import Center from "../../../components/layout.components/center.component/center.component";
import Column from "../../../components/layout.components/column.component/column.component";
import SizedContainer from "../../../components/layout.components/sized.container.component/sized.container.component";
import { ContainerSizes } from "../../../globals/enums/global.enum";
import Headline from "../../../components/text.components/headline.component/headline.component";
import { RunningText } from "../../../components/text.components/running.text.component/running.text.component";
import OutlinedTextInput from "../../../components/input.components/outlined.text.input.component/outlined.text.input.component";
import Row from "../../../components/layout.components/row.component/row.component";
import FilledButton from "../../../components/input.components/filled.button.component/filled.button.component";
import SplitLayout from "../../../components/layout.components/split.layout/split.layout";
import ProjectStore from "../../../stores/project.store";
import CompanyLogo from "../../../components/general.components/company.logo.component/company.logo.component";
import { HttpInvitationService } from "../../../services/http.clients/http.invitation.client";

interface UserSetupPageProps {
  userStore?: UserStore;
  projectStore?: ProjectStore;
}

const UserSetupPage = ({
  userStore,
  projectStore,
}: UserSetupPageProps): JSX.Element => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: userStore?.user,
  });

  const completeUserSetup = async (data: any): Promise<void> => {
    setIsLoading(true);

    const user: User = { ...userStore?.user, ...data, setupCompleted: true };

    const updatedUser = await userStore?.updateCurrentUser(user);

    if (updatedUser != null) {
      // Check if user got invitated to a studio
      const userInvitations =
        await HttpInvitationService.getInstance().getInvitationsOfCurrentUser();

      if (userInvitations.length > 0) {
        return navigate("/handle-invitations");
      } else {
        const initialProject = await projectStore?.createInitialProject();

        if (initialProject != null) {
          navigate(`/projects/${initialProject._id}/project-setup`);
        }
      }
    }

    setIsLoading(false);
  };

  const _buildForm = (): JSX.Element => {
    return (
      <Center>
        <SizedContainer size={ContainerSizes.L}>
          <Column>
            <Headline className="mt-15">
              Tell us a bit about <span className="color-primary">you.</span>
            </Headline>
            <RunningText className="mb-20">Sign up to get started.</RunningText>
            <form
              className="user-setup-form"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit(completeUserSetup, (errors) => {
                toast.error("Please check your input");
              })}
              noValidate
            >
              <OutlinedTextInput
                label="First Name"
                inputRef={register("firstName", {
                  required: "First Name is required",
                })}
                validationMessage={errors.firstName?.message?.toString()}
              />
              <OutlinedTextInput
                className="mt-30"
                label="Last Name"
                inputRef={register("lastName", {
                  required: "Last Name is required",
                })}
                validationMessage={errors.lastName?.message?.toString()}
              />
              <OutlinedTextInput
                className="mt-30"
                label="Date of Birth"
                type="date"
                inputRef={register("dateOfBirth", {
                  required: "Date of Birth is required",
                })}
                validationMessage={errors.dateOfBirth?.message?.toString()}
              />
              <Row className="mt-5 mb-5">
                <input
                  type="checkbox"
                  checked={privacyPolicyAccepted}
                  onChange={(event) => {
                    setPrivacyPolicyAccepted(event.target.checked);
                  }}
                />
                <RunningText className="ml-10">
                  With signing up you agree to our{" "}
                  <span
                    className="color-primary cursor-pointer"
                    onClick={() => {
                      window.open("www.vondot.at", "_blank");
                    }}
                  >
                    Data Privacy Policy
                  </span>{" "}
                  and{" "}
                  <span
                    className="color-primary cursor-pointer"
                    onClick={() => {
                      window.open("www.vondot.at", "_blank");
                    }}
                  >
                    Terms of Service
                  </span>
                  .
                </RunningText>
              </Row>
              <FilledButton
                type="submit"
                label="Save and continue"
                className="mt-15 full-width"
                disabled={!privacyPolicyAccepted}
                isLoading={isLoading}
              />
            </form>
          </Column>
        </SizedContainer>
      </Center>
    );
  };

  const _buildPreview = (): JSX.Element => {
    return (
      <div className="user-setup-preview-container">
        <CompanyLogo className="ml-10" size={180} />
      </div>
    );
  };

  return (
    <SplitLayout
      leftChild={_buildPreview()}
      leftGrow={1}
      rightChild={_buildForm()}
      rightGrow={1}
    />
  );
};

export default inject("userStore", "projectStore")(observer(UserSetupPage));
