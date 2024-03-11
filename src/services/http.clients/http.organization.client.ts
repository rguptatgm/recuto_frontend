import { Logging } from "../../globals/helpers/logging.helper";
import { GenericHttpClient } from "./config/http.generic.client";
import {Organization} from "../../schemas/organization.schemas/organization.schemas.ts";

export class HttpOrganizationService extends GenericHttpClient<Organization> {
    static _instance: HttpOrganizationService;
    static getInstance(): HttpOrganizationService {
        if (this._instance == null) {
            this._instance = new HttpOrganizationService("/organizations");

        }
        return this._instance;
    }

    createInitialOrganization = async (organization: Organization): Promise<Organization | undefined> => {
        try {
            const response = await this.post("/organizations", organization);
            return response.data;
        } catch (err) {
            Logging.error({
                className: "HttpOrganizationService",
                methodName: "createOrganizationProject",
                message: "Error while creating initial studio",
                exception: err,
                showAlert: true,
            });
        }
    };

    addOrganization = async (organization: Organization): Promise<Organization | undefined> => {
        try {
            const response = await this.post("/organizations", organization);
            return response.data;
        } catch (err) {
            Logging.error({
                className: "HttpOrganizationService",
                methodName: "createOrganizationProject",
                message: "Error while creating initial studio",
                exception: err,
                showAlert: true,
            });
        }
    };


    async updateCurrentOrganization(organization: Organization): Promise<Organization> {
        const response = await this.put("/organizations", organization);
        return response.data;
    }
}
