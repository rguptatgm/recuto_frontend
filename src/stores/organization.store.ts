import { makeAutoObservable } from "mobx";
import { Organization } from "../schemas/organization.schemas/organization.schemas.ts";
// import { HttpInterviewService } from "../services/http.clients/http.interview.client";
import { Logging } from "../globals/helpers/logging.helper";
import {HttpOrganizationService} from "../services/http.clients/http.organization.client.ts";


class OrganizationStore{
    private _organization: Organization | undefined;

    constructor(){
        makeAutoObservable(this);
    }

    //! Setter
    setOrganization = (organization: Organization): any => {
        this._organization = organization;
    }


    //! Getters
    get organization(): Organization | undefined {
        if(this._organization == null) {
            return;
        }

        return JSON.parse(JSON.stringify(this._organization));
    }


    //! Methods
    createOrganization = async(organization: Organization): Promise<Organization | undefined> =>{
        try{
            const initialOrganization = await HttpOrganizationService.getInstance().createOrganization(organization);

            if (initialOrganization == null) {
                return;
            }

            console.log(initialOrganization);

            this.setOrganization(initialOrganization);
            return initialOrganization;
        }catch(err){
            Logging.error({
                className: "OrganizationStore",
                methodName: "createOrganization",
                message: "Organization could not be created",
                exception: err,
                showAlert: true,
            });
        }

    };
}

export default OrganizationStore;