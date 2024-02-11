import { makeAutoObservable } from "mobx";
import { Interview } from "../schemas/interview.schema";
import { HttpInterviewService } from "../services/http.clients/http.interview.client";
import { Logging } from "../globals/helpers/logging.helper";


class InterviewStore{
    private _interview: Interview | undefined;

    constructor(){
        makeAutoObservable(this);
    }

    //! Setter
    setInterview = (interview: Interview): any => {
        this._interview = interview;
    }


    //! Getters
    get interview(): Interview | undefined {
        if(this._interview == null) {
            return;
        }

        return JSON.parse(JSON.stringify(this._interview));
    }

    
    //! Methods
    createInterview = async(interview: Interview): Promise<Interview | undefined> =>{
        try{
            const initialInterview = await HttpInterviewService.getInstance().createInterview(interview);

            if (initialInterview == null) {
                return;
            }
            
            console.log(initialInterview);

            this.setInterview(initialInterview);
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
}

export default InterviewStore;