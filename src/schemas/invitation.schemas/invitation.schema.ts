import { Project } from "../project.schemas/project.schema";
import { Role } from "../role.schema";

export interface Invitation {
  _id?: string;
  email: string;
  role: Role;
  resource?: Project;
}
