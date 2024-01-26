import PageContainer from "../../components/layout.components/page.container.component/page.container.component";
import PageHeadline from "../../components/navigation.components/page.headline.component/page.headline.component";
import MainLayout from "../../components/layout.components/main.layout/main.layout";
import { useEffect } from "react";
import { inject, observer } from "mobx-react";
import ProjectStore from "../../stores/project.store";
import CardComponent from "../../components/general.components/card.components/card.component/card.component";
import Wrap from "../../components/layout.components/wrap.component/wrap.component";
import Column from "../../components/layout.components/column.component/column.component";
import TitleText from "../../components/text.components/title.text.component/title.text.component";
import "./project.overview.page.scss";
import UserStore from "../../stores/user.store";
import { useNavigate } from "react-router-dom";

interface ProjectOverviewProps {
  projectStore?: ProjectStore;
  userStore?: UserStore;
}

const ProjectOverview = ({ projectStore, userStore }: ProjectOverviewProps) => {
  const projects = projectStore?.projects;
  const navigate = useNavigate();

  useEffect(() => {
    initializePage();
  }, []);

  const initializePage = async (): Promise<void> => {
    // fetch all projects for the current user
    await projectStore?.fetchAndSetProjects();
  };

  const _buildProjectCards = (): JSX.Element[] => {
    const cards: JSX.Element[] = [];

    projects?.forEach((project) => {
      cards.push(
        <CardComponent
          key={project._id}
          title={project.name}
          value="Click to continue to the project"
          onClick={() => {
            projectStore?.setCurrentProject(project);
            navigate("/projects/" + project._id + "/home");
          }}
        />
      );
    });

    return cards;
  };

  return (
    <MainLayout topBars={[<PageHeadline title="My Projects" />]}>
      <PageContainer>
        <Column alignItems="center">
          <TitleText className="mb-25">
            Hey {userStore?.user?.firstName} choose a project to continue
          </TitleText>
          <Wrap
            alignItems="center"
            justifyContent="center"
            className="projects-wrapper-container"
          >
            {_buildProjectCards()}
          </Wrap>
        </Column>
      </PageContainer>
    </MainLayout>
  );
};

export default inject("projectStore", "userStore")(observer(ProjectOverview));
