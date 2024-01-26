import { User } from "../../schemas/user.schemas/user.schema";
import { GenericHttpClient } from "./config/http.generic.client";

export class HttpUserService extends GenericHttpClient<User> {
  static _instance: HttpUserService;
  static getInstance(): HttpUserService {
    if (this._instance == null) {
      this._instance = new HttpUserService("/users");
    }
    return this._instance;
  }

  async getCurrentUser(): Promise<any> {
    return await this.get("/users/me");
  }

  async updateCurrentUser(data: User): Promise<any> {
    return await this.put("/users/me", data);
  }

  async getClientPermissions(): Promise<any> {
    return await this.get("/auth/client-permissions");
  }
}
