import { Logging } from "../../globals/helpers/logging.helper";
import { Project } from "../../schemas/project.schemas/project.schema";
import { GenericHttpClient } from "./config/http.generic.client";

export class HttpProjectService extends GenericHttpClient<Project> {
  static _instance: HttpProjectService;
  static getInstance(): HttpProjectService {
    if (this._instance == null) {
      this._instance = new HttpProjectService("/projects");
    }
    return this._instance;
  }

  createInitialProject = async (): Promise<Project | undefined> => {
    try {
      const response = await this.post("/projects", { name: "" });
      return response.data;
    } catch (err) {
      Logging.error({
        className: "HttpProjectService",
        methodName: "createInitialProject",
        message: "Error while creating initial studio",
        exception: err,
        showAlert: true,
      });
    }
  };

  async updateCurrentProject(project: Project): Promise<Project> {
    const response = await this.put("/projects", project);
    return response.data;
  }
}
