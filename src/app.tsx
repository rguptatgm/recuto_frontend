import { Provider as MobxProvider } from "mobx-react";
import "./styles/global.scss";
import UserStore from "./stores/user.store";
import Routing from "./routing/routing";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import ProjectStore from "./stores/project.store";
import { ModalStore } from "./stores/modal.store";
import OrganizationStore from "./stores/organization.store.ts";

const userStore = new UserStore();
const projectStore = new ProjectStore();
const modalStore = new ModalStore();
const organizationStore = new OrganizationStore();


const stores = {
  userStore,
  projectStore,
  modalStore,
  organizationStore,
};

const App = () => {
  const updateDynamicStyleVariable = (): void => {
    if (window.innerHeight < 250) {
      setTimeout(() => {
        updateDynamicStyleVariable();
      }, 100);

      return;
    }

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01;

    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme !== null) {
      const darkModeOn = theme === "dark";
      if (darkModeOn) {
        document.body.classList.add("theme--dark");
        document.body.classList.remove("theme--light");
      } else {
        document.body.classList.remove("theme--dark");
        document.body.classList.add("theme--light");
      }
    } else {
      localStorage.setItem("theme", "light");
    }

    updateDynamicStyleVariable();

    window.addEventListener("resize", (event) => {
      updateDynamicStyleVariable();
    });

    if (window.screen.orientation) {
      window.screen.orientation.addEventListener("change", (event) => {
        updateDynamicStyleVariable();
      });
    }
  }, []);

  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_SIGNIN_CLIENT_ID ?? ""}
    >
      <MobxProvider {...stores}>
        <Routing />
      </MobxProvider>
    </GoogleOAuthProvider>
  );
};
export default App;
