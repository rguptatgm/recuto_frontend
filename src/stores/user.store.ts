import { makeAutoObservable } from "mobx";
import { User } from "../schemas/user.schemas/user.schema";
import Gleap from "gleap";
import { Logging } from "../globals/helpers/logging.helper";
import { HttpUserService } from "../services/http.clients/http.user.client";
import { ClientRole, ClientRoleFilterd } from "../schemas/token.role.schema";
import {
  checkIfAliasIsInTokenRoles,
  filterClientRolesByMembership,
} from "../globals/helpers/permission.helper";
import {
  GoogleSignInCredentials,
  HttpAuthService,
  SignInCredentials,
  SignUpCredentials,
} from "../services/http.clients/http.auth.client";
import {
  deleteAccessAndRefreshToken,
  deleteResource,
  saveAccessToken,
  saveRefreshToken,
} from "../globals/helpers/storage.helper";
import { toast } from "react-toastify";
import { Invitation } from "../schemas/invitation.schemas/invitation.schema";
import { HttpInvitationService } from "../services/http.clients/http.invitation.client";
import { PaginationDataList } from "../globals/interfaces/pageination.data.list.interface";

class UserStore {
  // Properties
  private _user?: User;
  private _clientRoles?: ClientRoleFilterd;

  private _projectInvitationDataList: PaginationDataList<Invitation> = {
    data: [],
    pageIndex: 0,
    itemsInPage: 100,
    isLoading: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  //! Setter
  setUser = (user: User): void => {
    Gleap.identify(user._id, {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    });
    this._user = user;
  };

  setClientRoles = (clientRoles: ClientRole[]): void => {
    this._clientRoles = filterClientRolesByMembership(clientRoles);
  };

  setUserProjectInvitations = (invitations: Invitation[]): void => {
    this._projectInvitationDataList.data = invitations;
  };

  //! Getter
  get user(): User | undefined {
    if (this._user == null) {
      return;
    }
    return JSON.parse(JSON.stringify(this._user));
  }

  get projectUserInvitations(): PaginationDataList<Invitation> {
    return JSON.parse(JSON.stringify(this._projectInvitationDataList));
  }

  //! Methods
  fetchAndSetCurrentUser = async (): Promise<User | undefined> => {
    try {
      const response = await HttpUserService.getInstance().getCurrentUser();

      const user = response.data;
      this.setUser(user);

      return user;
    } catch (err) {
      Logging.error({
        className: "UserStore",
        methodName: "fetchAndSetCurrentUser",
        message: "Fehler beim Laden des Benutzers",
        exception: err,
        showAlert: true,
      });
    }
  };

  fetchAndSetClientRoles = async (): Promise<void> => {
    try {
      const response =
        await HttpUserService.getInstance().getClientPermissions();

      const clientRoles = response.data as ClientRole[];

      this.setClientRoles(clientRoles);
    } catch (err) {
      Logging.error({
        className: "UserStore",
        methodName: "fetchAndSetClientRolesv",
        message: "Fehler beim Laden der Rechte",
        exception: err,
        showAlert: true,
      });
    }
  };

  checkIfUserHasPermission = (args: {
    alias?: string;
    ignoreResource?: boolean;
  }): boolean => {
    if (args.alias == null) {
      return true;
    }

    let access = false;

    if (this._clientRoles == null) {
      return false;
    }

    // check if the permission is a none resource permission
    if (args.ignoreResource) {
      access = checkIfAliasIsInTokenRoles(
        this._clientRoles.noneResourceRoles,
        args.alias
      );

      return access;
    }

    // check if the project has the permission
    access = checkIfAliasIsInTokenRoles(
      this._clientRoles.projectRoles,
      args.alias
    );

    if (!access) {
      return access;
    }

    // check if the user has the permission
    access = checkIfAliasIsInTokenRoles(
      this._clientRoles.userRoles,
      args.alias
    );

    return access;
  };

  // Authentication
  signIn = async (data: SignInCredentials): Promise<User | undefined> => {
    try {
      const response = await HttpAuthService.getInstance().handleSignIn(data);

      const { user, access_token, refresh_token } = response.data;

      saveAccessToken(access_token);
      saveRefreshToken(refresh_token);

      this.setUser(user);

      return user;
    } catch (err) {
      Logging.error({
        className: "UserStore",
        methodName: "signIn",
        message: "Fehler beim Anmelden",
        exception: err,
        showAlert: true,
      });
    }
  };

  signUp = async (
    data: SignUpCredentials | GoogleSignInCredentials
  ): Promise<User | undefined> => {
    try {
      const response = await HttpAuthService.getInstance().handleSignUp(data);

      const { user, access_token, refresh_token } = response.data;

      saveAccessToken(access_token);
      saveRefreshToken(refresh_token);

      this.setUser(user);

      return user;
    } catch (err) {
      Logging.error({
        className: "UserStore",
        methodName: "signUp",
        message: "Fehler beim Registrieren",
        exception: err,
        showAlert: true,
      });
    }
  };

  updateCurrentUser = async (data: User): Promise<User | undefined> => {
    try {
      const updatedUser = await HttpUserService.getInstance().updateCurrentUser(
        data
      );

      if (updatedUser == null) {
        toast.error("Failed to update user");
      }

      const user = updatedUser.data;

      this.setUser(user);

      return user;
    } catch (err) {
      Logging.error({
        className: "UserStore",
        methodName: "updateCurrentUser",
        message: "Failed to update user",
        exception: err,
        showAlert: true,
      });
    }
  };

  fetchAndSetUserProjectInvitations = async (): Promise<
    Invitation[] | undefined
  > => {
    try {
      const invitations =
        await HttpInvitationService.getInstance().getInvitationsOfCurrentUser();

      this.setUserProjectInvitations(invitations);

      return invitations;
    } catch (err) {
      Logging.error({
        className: "UserStore",
        methodName: "fetchAndSetUserStudioInvitations",
        message: "Could not fetch invitations",
        exception: err,
        showAlert: true,
      });
    }
  };

  clear = (): void => {
    if (this._user != null) {
      window.location.reload();
    }

    this._user = undefined;
    deleteAccessAndRefreshToken();
    deleteResource();
  };
}

export default UserStore;
