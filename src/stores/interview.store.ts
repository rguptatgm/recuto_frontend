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
    setCurrentInterview = (interview: Interview): void => {
        if(interview == null){
            return;
        }

        
        this._currentInterview = interview;
    }

    setInterviews = (interviews: Interview[]): void => {
        this._interviews = interviews;
    };

    addInterview = (interview: Interview): void => {
      this._interviews.push(interview);
    }

    //! Getters
    get interview(): Interview | undefined {
        if(this._currentInterview == null) {
            return;
        }

        return this._currentInterview;
    }

    

    get interviews(): Interview[] {
      return this._interviews;
    }

    
    //! Methods
    createInterview = async(interview: Interview): Promise<Interview | undefined> =>{

        console.log("create");

        try{
            const initialInterview = await HttpInterviewService.getInstance().createInterview(interview);

            if (initialInterview == null) {
                return;
            }
            this.setCurrentInterview(initialInterview);
            this.addInterview(initialInterview);
            
            return initialInterview;
        }catch (err){
            Logging.error({
                className: "InterviewStore",
                methodName: "createInterview",
                message: "Interview could not be created",
                exception: err,
                showAlert: true,
            });
            return;
        }
        
    };
}

export default InterviewStore;