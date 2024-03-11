import PageContainer from "../../components/layout.components/page.container.component/page.container.component";
import PageHeadline from "../../components/navigation.components/page.headline.component/page.headline.component";
import MainLayout from "../../components/layout.components/main.layout/main.layout";
import { inject, observer } from "mobx-react";
import ProjectStore from "../../stores/project.store";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { projectSchema } from "../../schemas/project.schemas/project.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import FilledButton from "../../components/input.components/filled.button.component/filled.button.component";
import OutlinedTextInput from "../../components/input.components/outlined.text.input.component/outlined.text.input.component";
import SizedContainer from "../../components/layout.components/sized.container.component/sized.container.component";
import { ContainerSizes } from "../../globals/enums/global.enum";

interface ProjectSettingsPageProps {
  projectStore?: ProjectStore;
}

const ProjectSettingsPage = ({ projectStore }: ProjectSettingsPageProps) => {
  const project = projectStore?.currentProject;

  const [formIsDirty, setFormIsDirty] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(projectSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: project,
  });

  console.log(errors);

  // handle exercise  form submit
  const onSubmit = async (data: any): Promise<void> => {
    const updatedProject = await projectStore?.updateCurrentProject({
      ...data,
    });

    // navigate to created exercise
    if (
      updatedProject?._id != null &&
      projectStore?.currentProject?._id != null
    ) {
      toast.success("Projekt erfolgreich aktualisiert"); // TODO
    }

    setFormIsDirty(false);
  };

  return (
    <MainLayout
      topBars={[
        <PageHeadline
          title={project?.name ?? "-"}
          actions={
            <FilledButton
              disabled={!formIsDirty}
              label="Save"
              type="submit"
              color="secondary"
              form="project-settings-form"
            />
          }
        />,
      ]}
    >
      <PageContainer>
        <form
          id="project-settings-form"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit, () => {
            toast.error("Bitte überprüfe deine Eingaben");
            setFormIsDirty(false);
          })}
          onChange={() => {
            if (!formIsDirty) {
              setFormIsDirty(true);
            }
          }}
        >
          <SizedContainer size={ContainerSizes.L}>
            <OutlinedTextInput
              label="Project Name"
              inputRef={register("name")}
              validationMessage={errors.name?.message}
            />
          </SizedContainer>
        </form>
      </PageContainer>
    </MainLayout>
  );
};

export default inject("projectStore")(observer(ProjectSettingsPage));
