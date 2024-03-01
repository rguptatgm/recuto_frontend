import { makeAutoObservable } from "mobx";
import { Logging } from "../globals/helpers/logging.helper";
import { Question } from "../schemas/question.schema";
import { HttpQuestionService } from "../services/http.clients/http.questions.client";

class QuestionStore {
  private _questions: Question[] = [];
  private _currentInterviewQuestions: Question[] = [];
  private _currentQuestion: Question | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  //! Setter
  setCurrentQuestion = (question: Question | undefined): any => {
    if (question == null) {
      return;
    }

    this._currentQuestion = question;
  };

  setCurrentInterviewQuestions = (questions: Question[]):any =>{
    this._currentInterviewQuestions = questions;
  }

  setQuestions = (questions: Question[]): any => {
    this._questions = questions;
  };

  addQuestion = (question: Question): any => {
    this.questions?.push(question)
  }

  //! Getters
  get currentQuestion(): Question | undefined {
    if (this._currentQuestion == null) {
      return;
    }
    return JSON.parse(JSON.stringify(this._currentQuestion));
  }

  get currentInterviewQuestions(): Question | undefined{
    if (this._currentInterviewQuestions == null) {
        return;
    }
    return JSON.parse(JSON.stringify(this._currentInterviewQuestions));
  }

  get questions(): Question[] | undefined {
    if (this._questions == null) {
      return;
    }
    return JSON.parse(JSON.stringify(this._questions));
  }

  //! Methods

  createQuestion = async (question: Question): Promise<Question | undefined> => {
    try {
      const questionNew =
        await HttpQuestionService.getInstance().createQuestion(question);

      if (questionNew == null) {
        return;
      }

      this.addQuestion(questionNew);

      return questionNew;
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

  fetchAndSetQuestions = async (): Promise<Question[] | undefined> => {
    try {
      const questions = await HttpQuestionService.getInstance().find({});

      if (questions == null || questions.length === 0) {
        return;
      }

      this.setQuestions(questions);
      return questions;
    } catch (err) {
      Logging.error({
        className: "QuestionStore",
        methodName: "fetchAndSetQuestions",
        message: "Could not fetch questions",
        exception: err,
        showAlert: true,
      });
    }
  };

  updateCurrentQuestion = async (
    question: Question
  ): Promise<Question | undefined> => {
    try {
      const updatedQuestion =
        await HttpQuestionService.getInstance().updateCurrentQuestion(question);

      if (updatedQuestion == null) {
        return;
      }

      this.setCurrentQuestion(updatedQuestion);

      return updatedQuestion;
    } catch (err) {
      Logging.error({
        className: "QuestionStore",
        methodName: "updateCurrentQuestion",
        message: "Could not update current question",
        exception: err,
        showAlert: true,
      });
    }
  };

  updateCurrentInterviewQuestions = async(
    questions: Question[]
  ): Promise<Question | undefined> => {
    try {
        //fix
      const updatedQuestion =
        await HttpQuestionService.getInstance().updateCurrentInterviewQuestions(questions);

      if (updatedQuestion == null) {
        return;
      }

      this.setCurrentQuestion(updatedQuestion);

      return updatedQuestion;
    } catch (err) {
      Logging.error({
        className: "QuestionStore",
        methodName: "updateCurrentQuestion",
        message: "Could not update current interview questions",
        exception: err,
        showAlert: true,
      });
    }
  };
}

export default QuestionStore;
