import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoadingPage from "../pages/loading.page/loading.page";
import ProtectedRoute from "./routing.protected.config";
import SignInPage from "../pages/auth.pages/sign.in.page/sign.in.page";
import DashboardPage from "../pages/dashboard.page/dashboard.page";
import HomePage from "../pages/home.page/home.page";
import MobileHeader from "../components/navigation.components/mobile.header.component/mobile.header.component";
import ProjectOverview from "../pages/project.page/project.overview.page";
import ProjectSettingsPage from "../pages/project.page/project.settings.page";
import UserSetupPage from "../pages/setup.pages/user.setup.page/user.setup.page";
import HandleInvitationPage from "../pages/handle.invitation.page/handle.invitation.page";
import ProjectSetupPage from "../pages/setup.pages/project.setup.page/project.setup.page";
import SignUpPage from "../pages/auth.pages/sign.up.page/sign.up.page";
import ExamplePage from "../pages/example.page";
import MainModal from "../components/modal.components/main.modal.component/main.modal.component";
import InterviewCreate from "../pages/interview.pages/interview.create.page";
import InterviewParticipate from "../pages/interview.pages/interview.participate.page";

const Routing = (): JSX.Element => {
  return (
    <BrowserRouter>
      <MainModal />
      <MobileHeader />
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>

      <Routes>
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/handle-invitations"
            element={<HandleInvitationPage />}
          />
          <Route path="/user-setup" element={<UserSetupPage />} />
          <Route
            path="/projects/:projectID/project-setup"
            element={<ProjectSetupPage />}
          />
          <Route path="/projects" element={<ProjectOverview />} />
          <Route path="/projects/:projectID/*" element={<DashboardPage />}>
            <Route path="home/*" element={<HomePage />} />
            <Route path="interview-create/*" element={<InterviewCreate/>} />
            <Route path="interview-participate/*" element={<InterviewParticipate/>}/>
            <Route path="settings/*" element={<ProjectSettingsPage />} />
            <Route path="example/*" element={<ExamplePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
