import { Logging } from "../globals/helpers/logging.helper";
import { Project } from "../schemas/project.schemas/project.schema";
import { Question } from "../schemas/question.schema";
import { GenericHttpClient } from "./http.clients/config/http.generic.client";

export class HttpQuestionService extends GenericHttpClient<Question> {
  static _instance: HttpQuestionService;

  static getInstance(): HttpQuestionService {
    if (this._instance == null) {
      this._instance = new HttpQuestionService("/questions");
    }
    return this._instance;
  }

  createInitialQuestion = async (question: Question): Promise<Question | undefined> => {
    try {
      const response = await this.post("/questions", question);
      return response.data;
    } catch (err) {
      Logging.error({
        className: "HttpQuestionService",
        methodName: "createInitialQuestion",
        message: "Error while creating initial question",
        exception: err,
        showAlert: true,
      });
    }
  };

  async updateCurrentProject(question: Question): Promise<Project> {
    const response = await this.put("/questions", question);
    return response.data;
  }
}
