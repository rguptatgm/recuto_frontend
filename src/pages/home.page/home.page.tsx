import PageContainer from "../../components/layout.components/page.container.component/page.container.component";
import PageHeadline from "../../components/navigation.components/page.headline.component/page.headline.component";
import MainLayout from "../../components/layout.components/main.layout/main.layout";
import { inject, observer } from "mobx-react";
import ProjectStore from "../../stores/project.store";

interface HomePageProps {
  projectStore?: ProjectStore;
}

const HomePage = ({ projectStore }: HomePageProps) => {
  const projectTitle = projectStore?.currentProject?.name;

  return (
    <MainLayout topBars={[<PageHeadline title={projectTitle ?? "-"} />]}>
      <PageContainer>Welcome to the home page!</PageContainer>
    </MainLayout>
  );
};

export default inject("projectStore")(observer(HomePage));
