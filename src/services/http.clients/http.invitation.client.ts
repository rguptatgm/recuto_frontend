import { toast } from "react-toastify";
import { GenericHttpClient } from "./config/http.generic.client";
import { Invitation } from "../../schemas/invitation.schemas/invitation.schema";
import { Logging } from "../../globals/helpers/logging.helper";

export class HttpInvitationService extends GenericHttpClient<Invitation> {
  static _instance: HttpInvitationService;
  static getInstance(): HttpInvitationService {
    if (this._instance == null) {
      this._instance = new HttpInvitationService("/invitations");
    }
    return this._instance;
  }

  async getInvitationsOfCurrentUser(): Promise<Invitation[]> {
    const response = await this.get(`/invitations/me`);
    return response.data as Invitation[];
  }

  async acceptInvitation(
    invitationID: string
  ): Promise<Invitation | undefined> {
    try {
      const response = await this.put(`/invitations/${invitationID}/accept`);
      toast.success("Invitation successfully accepted");
      return response.data as Invitation;
    } catch (err) {
      Logging.error({
        className: "HttpInvitationService",
        methodName: "acceptInvitation",
        message: "Invitation could not be accepted",
        exception: err,
        showAlert: true,
      });
    }
  }

  async declineInvitation(
    invitationID: string
  ): Promise<Invitation | undefined> {
    try {
      const response = await this.put(`/invitations/${invitationID}/decline`);
      toast.success("Invitation successfully declined");
      return response.data as Invitation;
    } catch (err) {
      Logging.error({
        className: "HttpInvitationService",
        methodName: "declineInvitation",
        message: "Invitation could not be declined",
        exception: err,
        showAlert: true,
      });
    }
  }

  async resendInvation(invitationID: string): Promise<Invitation | undefined> {
    try {
      const response = await this.post(`/invitations/${invitationID}/resend`);
      toast.success("Invitation successfully declined");
      return response.data as Invitation;
    } catch (err) {
      Logging.error({
        className: "HttpInvitationService",
        methodName: "declineInvitation",
        message: "Invitation could not be declined",
        exception: err,
        showAlert: true,
      });
    }
  }
}
