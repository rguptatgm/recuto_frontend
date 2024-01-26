import { ClientRole } from "../../schemas/token.role.schema";
import { RoleMmbership } from "../enums/global.enum";
import { Logging } from "./logging.helper";

// check if alias exists in permission array of given token role
export const checkIfAliasIsInTokenRoles = (
  tokenRoles: ClientRole[],
  alias: string
): boolean => {
  try {
    for (const tokenRole of tokenRoles) {
      if (
        tokenRole.permissions.includes(alias) ||
        tokenRole.roleAlias === alias
      ) {
        return true;
      }
    }
    return false;
  } catch (err) {
    Logging.error({
      className: "GlobalHelper",
      methodName: "checkIfAliasIsInTokenRoles",
      exception: err,
    });

    return false;
  }
};

// separate token roles by membership
export const filterClientRolesByMembership = (
  tokenRoles: ClientRole[]
): {
  projectRoles: ClientRole[];
  userRoles: ClientRole[];
  noneResourceRoles: ClientRole[];
} => {
  const projectRoles = tokenRoles.filter(
    (tokenRole) => tokenRole.membership === RoleMmbership.PROJECT
  );

  const userRoles = tokenRoles.filter(
    (tokenRole) => tokenRole.membership === RoleMmbership.USER
  );

  const noneResourceRoles = tokenRoles.filter(
    (tokenRole) => tokenRole.membership === RoleMmbership.NONE_RESOURCE
  );

  return { projectRoles, userRoles, noneResourceRoles };
};
