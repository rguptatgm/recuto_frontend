import { Logging } from "../../globals/helpers/logging.helper";
import { GenericHttpClient } from "./config/http.generic.client";
import {Organization} from "../../schemas/organization.schemas/organization.schemas.ts";

export class HttpOrganizationService extends GenericHttpClient<Organization>{
    static _instance: HttpOrganizationService;

    static getInstance(): HttpOrganizationService{
        if(this._instance == null)
            this._instance = new HttpOrganizationService("/organization");
        return this._instance;
    }

    async createOrganization (organization: Organization): Promise<Organization | undefined> {
        try{
            const response = await this.post("/organization", organization);
            return response.data;
        } catch(err){
            Logging.error({
                className: "HttpOrganizationService",
                methodName: "createOrganization",
                message: "Organization could not be created",
                exception: err,
                showAlert: true,
            });
        }

    }
}