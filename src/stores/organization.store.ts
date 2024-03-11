import { makeAutoObservable } from "mobx";

import { Logging } from "../globals/helpers/logging.helper";
import {Organization} from "../schemas/organization.schemas/organization.schemas.ts";
import {HttpOrganizationService} from "../services/http.clients/http.organization.client.ts";

class OrganizationStore {
    private _organizations: Organization[] = [];
    private _currentOrganization: Organization | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    //! Setter
    setCurrentOrganization = (organization: Organization | undefined): any => {
        if (organization == null) {
            return;
        }

        this._currentOrganization = organization;
    };

    setOrganization = (organization: Organization[]): any => {
        this._organizations = organization;
    };

    addOrganization = (organization: Organization): Organization => {
        this._organizations.push(organization);
        console.log(this.organizations)

        HttpOrganizationService.getInstance().addOrganization(organization);

        return organization;
    };

    //! Getters
    get currentOrganization(): Organization | undefined {
        if (this._currentOrganization == null) {
            return;
        }
        return JSON.parse(JSON.stringify(this._currentOrganization));
    }

    get organizations(): Organization[] | undefined {
        if (this._organizations == null) {
            return;
        }

        return JSON.parse(JSON.stringify(this._organizations));
    }

    //! Methods

    createInitialOrganization = async (organization: Organization): Promise<Organization | undefined> => {
        try {
            const initialOrganization =
                await HttpOrganizationService.getInstance().createInitialOrganization(organization);

            if (initialOrganization == null) {
                return;
            }

            this.setCurrentOrganization(initialOrganization);
            this.addOrganization(initialOrganization);

            return initialOrganization;
        } catch (err) {
            Logging.error({
                className: "OrganizationStore",
                methodName: "createOrganization",
                message: "Organization could not be created",
                exception: err,
                showAlert: true,
            });
        }
    };

    fetchAndSetOrganizations = async (): Promise<Organization[] | undefined> => {
        try {
            console.log("Before")
            console.log(HttpOrganizationService.getInstance())
            const organizations = await HttpOrganizationService.getInstance().find({});
            console.log("After")


            if (organizations == null || organizations.length === 0) {
                console.log("inside if")
                return;
            }

            this.setOrganization(organizations);
            return organizations;
        } catch (err) {
            Logging.error({
                className: "OrganizationStore",
                methodName: "fetchAndSetOrganizations",
                message: "Could not fetch organizations",
                exception: err,
                showAlert: true,
            });
        }
    };

    updateCurrentOrganizations = async (
        organization: Organization
    ): Promise<Organization | undefined> => {
        try {
            const updatedOrganization =
                await HttpOrganizationService.getInstance().updateCurrentOrganization(organization);

            if (updatedOrganization == null) {
                return;
            }

            this.setCurrentOrganization(updatedOrganization);

            return updatedOrganization;
        } catch (err) {
            Logging.error({
                className: "OrganizationStore",
                methodName: "updateCurrentOrganization",
                message: "Could not update current organization",
                exception: err,
                showAlert: true,
            });
        }
    };
}

export default OrganizationStore;
