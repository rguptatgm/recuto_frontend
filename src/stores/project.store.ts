import { makeAutoObservable } from "mobx";
import { Project } from "../schemas/project.schemas/project.schema";
import { HttpProjectService } from "../services/http.clients/http.project.client";
import { Logging } from "../globals/helpers/logging.helper";
import { setResource } from "../globals/helpers/storage.helper";

class ProjectStore {
  private _projects: Project[] = [];
  private _currentProject: Project | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  //! Setter
  setCurrentProject = (project: Project | undefined): any => {
    if (project == null) {
      return;
    }

    this._currentProject = project;
    setResource(project?._id);
  };

  setProjects = (projects: Project[]): any => {
    this._projects = projects;
  };

  //! Getters
  get currentProject(): Project | undefined {
    if (this._currentProject == null) {
      return;
    }
    return JSON.parse(JSON.stringify(this._currentProject));
  }

  get projects(): Project[] | undefined {
    if (this._projects == null) {
      return;
    }

    return JSON.parse(JSON.stringify(this._projects));
  }

  //! Methods

  createInitialProject = async (): Promise<Project | undefined> => {
    try {
      const initialProject =
        await HttpProjectService.getInstance().createInitialProject();

      if (initialProject == null) {
        return;
      }

      this.setCurrentProject(initialProject);
      this.setProjects([initialProject]);

      return initialProject;
    } catch (err) {
      Logging.error({
        className: "ProjectStore",
        methodName: "createProject",
        message: "Project could not be created",
        exception: err,
        showAlert: true,
      });
    }
  };

  fetchAndSetProjects = async (): Promise<Project[] | undefined> => {
    try {
      const projects = await HttpProjectService.getInstance().find({});

      if (projects == null || projects.length === 0) {
        return;
      }

      this.setProjects(projects);
      return projects;
    } catch (err) {
      Logging.error({
        className: "ProjectStore",
        methodName: "fetchAndSetProjects",
        message: "Could not fetch projects",
        exception: err,
        showAlert: true,
      });
    }
  };

  updateCurrentProject = async (
    project: Project
  ): Promise<Project | undefined> => {
    try {
      const updatedProject =
        await HttpProjectService.getInstance().updateCurrentProject(project);

      if (updatedProject == null) {
        return;
      }

      this.setCurrentProject(updatedProject);

      return updatedProject;
    } catch (err) {
      Logging.error({
        className: "ProjectStore",
        methodName: "updateCurrentProject",
        message: "Could not update current project",
        exception: err,
        showAlert: true,
      });
    }
  };
}

export default ProjectStore;
