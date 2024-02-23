import * as yup from "yup";
import {Role} from "../role.schema.ts";
import {Project} from "../project.schemas/project.schema.ts";

export const OrganizationSchema = yup.object().shape({
    title: yup.string().required(),
});

export interface Organization {
    _id?: string;
    title: string;
    role: Role;
    resource?: Project;
}



export interface Interview extends yup.InferType<typeof OrganizationSchema> {}
