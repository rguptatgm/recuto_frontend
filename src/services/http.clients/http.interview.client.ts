import { Logging } from "../../globals/helpers/logging.helper";
import { Interview } from "../../schemas/interview.schema";
import { GenericHttpClient } from "./config/http.generic.client";

export class HttpInterviewService extends GenericHttpClient<Interview>{
    static _instance: HttpInterviewService;

    static getInstance(): HttpInterviewService{
        if(this._instance == null)
            this._instance = new HttpInterviewService("/interviews");
        return this._instance;
    }

    async createInterview(interview: Interview): Promise<Interview | undefined> {
        try{
            const response = await this.post("/interviews", interview);
            return response.data;
        } catch(err){
            Logging.error({
                className: "HttpInterviewService",
                methodName: "createInterview",
                message: "Interview could not be created",
                exception: err,
                showAlert: true,
            });
        }
        
    }
}