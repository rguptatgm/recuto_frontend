import { inject, observer } from "mobx-react";
import { useState } from "react";
import "./project.setup.page.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Center from "../../../components/layout.components/center.component/center.component";
import Column from "../../../components/layout.components/column.component/column.component";
import SizedContainer from "../../../components/layout.components/sized.container.component/sized.container.component";
import { ContainerSizes } from "../../../globals/enums/global.enum";
import Headline from "../../../components/text.components/headline.component/headline.component";
import { RunningText } from "../../../components/text.components/running.text.component/running.text.component";
import OutlinedTextInput from "../../../components/input.components/outlined.text.input.component/outlined.text.input.component";
import FilledButton from "../../../components/input.components/filled.button.component/filled.button.component";
import SplitLayout from "../../../components/layout.components/split.layout/split.layout";
import ProjectStore from "../../../stores/project.store";
import CompanyLogo from "../../../components/general.components/company.logo.component/company.logo.component";

interface ProjectSetupPageProps {
  projectStore?: ProjectStore;
}

const ProjectSetupPage = ({
  projectStore,
}: ProjectSetupPageProps): JSX.Element => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: projectStore?.currentProject,
  });

  const completeProjectSetup = async (data: any): Promise<void> => {
    setIsLoading(true);

    const updatedProject = await projectStore?.updateCurrentProject(data);

    if (updatedProject != null) {
      navigate(`/projects/${updatedProject._id}`);
    }

    setIsLoading(false);
  };

  const _buildForm = (): JSX.Element => {
    return (
      <Center>
        <SizedContainer size={ContainerSizes.L}>
          <Column>
            <Headline className="mt-15">
              Create your <span className="color-primary">project.</span>
            </Headline>
            <RunningText className="mb-20">
              Fill out the project detials to continue.
            </RunningText>
            <form
              className="project-setup-form"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit(completeProjectSetup, (errors) => {
                toast.error("Please check your input");
              })}
              noValidate
            >
              <OutlinedTextInput
                label="Project Name"
                inputRef={register("name", {
                  required: "Project Name is required",
                })}
                validationMessage={errors.name?.message?.toString()}
              />

              <FilledButton
                type="submit"
                label="Save and continue"
                className="mt-15 full-width"
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

export default inject("projectStore")(observer(ProjectSetupPage));
