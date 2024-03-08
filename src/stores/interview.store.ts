import { makeAutoObservable } from "mobx";
import { Interview } from "../schemas/interview.schema";
import { HttpInterviewService } from "../services/http.clients/http.interview.client";
import { Logging } from "../globals/helpers/logging.helper";


class InterviewStore{
    private _interviews: Interview[] = [];  
    private _currentInterview: Interview | undefined;

    constructor(){
        makeAutoObservable(this);
    }
    
    //! Setter
    setCurrentInterview = (interview: Interview): any => {
        if(interview == null){
            return;
        }

        
        this._currentInterview = interview;
    }

    setInterviews = (interviews: Interview[]): any => {
        this._interviews = interviews;
    };

    addInterview = (interview: Interview): any => {
      this._interviews.push(interview);
      return interview;
    }

    //! Getters
    get interview(): Interview | undefined {
        if(this._currentInterview == null) {
            return;
        }

        return JSON.parse(JSON.stringify(this._currentInterview));
    }

    

    get interviews(): Interview[] | undefined {
      if (this._interviews == null) {
        return JSON.parse(JSON.stringify([]));

      }

      return JSON.parse(JSON.stringify(this._interviews));
    }

    
    //! Methods
    createInterview = async(interview: Interview): Promise<Interview | undefined> =>{
        try{
            const initialInterview = await HttpInterviewService.getInstance().createInterview(interview);

            if (initialInterview == null) {
                return;
            }
            
            console.log(initialInterview);

            this.setCurrentInterview(initialInterview);
            return initialInterview;
        }catch(err){
            Logging.error({
                className: "InterviewStore",
                methodName: "createInterview",
                message: "Interview could not be created",
                exception: err,
                showAlert: true,
            });
        }
        
    };

  updateCurrentInterview = async (
    interview: Interview
  ): Promise<Interview | undefined> => {
    try {
      const updatedInterview =
        await HttpInterviewService.getInstance().updateCurrentInterview(interview);

      if (updatedInterview == null) {
        return;
      }

      this.setCurrentInterview(updatedInterview);

      return updatedInterview;
    } catch (err) {
      Logging.error({
        className: "InterviewStore",
        methodName: "updateCurrentInterview",
        message: "Could not update current interview",
        exception: err,
        showAlert: true,
      });
    }
  };
}

export default InterviewStore;