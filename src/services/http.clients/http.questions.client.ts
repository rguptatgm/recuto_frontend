import { Logging } from "../../globals/helpers/logging.helper";
import { Question } from "../../schemas/question.schema";
import { GenericHttpClient } from "./config/http.generic.client";


export class HttpQuestionService extends GenericHttpClient<Question> {
  static _instance: HttpQuestionService;

  static getInstance(): HttpQuestionService {
    if (this._instance == null) {
      this._instance = new HttpQuestionService("/questions");
    }
    return this._instance;
  }

  createQuestion = async (question: Question): Promise<Question | undefined> => {
    try {
      const response = await this.post("/questions", question);
      return response.data;
    } catch (err) {
      Logging.error({
        className: "HttpQuestionService",
        methodName: "createInitialQuestion",
        message: "Error while creating question",
        exception: err,
        showAlert: true,
      });
    }
  };

  updateCurrentInterviewQuestions = async (questions: Question[]): Promise<Question> => {
    //fix that it gets array
    const response = await this.put("/questions", questions);
    return response.data;
  }

  async updateCurrentQuestion(question: Question): Promise<Question> {
    const response = await this.put("/questions", question);
    return response.data;
  }
}
