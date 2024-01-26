import { RoleMmbership } from "../globals/enums/global.enum";

export interface ClientRole {
  roleAlias: string;
  validFrom: Date;
  validUntil: Date;
  resource: string;
  permissions: string[];
  membership: RoleMmbership;
}

export interface ClientRoleFilterd {
  projectRoles: ClientRole[];
  userRoles: ClientRole[];
  noneResourceRoles: ClientRole[];
}
