import { Outlet } from "react-router-dom";
import SidebarNavigation from "../../components/navigation.components/sidebar.component/sidebar.component";
import MainLayout from "../../components/layout.components/main.layout/main.layout";

const DashboardPage = (): JSX.Element => {
  return (
    <MainLayout sideBars={[<SidebarNavigation key={"main-side-bar"} />]}>
      <Outlet />
    </MainLayout>
  );
};

export default DashboardPage;
