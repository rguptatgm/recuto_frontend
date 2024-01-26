import axios, { AxiosInstance } from "axios";
import {
  getRefreshToken,
  saveAccessToken,
} from "../../globals/helpers/storage.helper";

export interface SignInCredentials {
  email: string;
  password: string;
  kind: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  kind: "INTERNAL";
}

export interface GoogleSignInCredentials {
  kind: "GOOGLE";
  socialVerifyToken: string;
  profileImageUrl?: string;
}

export interface ForgotPasswordCredentials {
  email: string;
}

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Credentials": true,
  "X-Requested-With": "XMLHttpRequest",
};

const authHttp: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers,
  withCredentials: true,
});

export class HttpAuthService {
  static _instance: HttpAuthService;
  static getInstance(): HttpAuthService {
    if (this._instance == null) {
      this._instance = new HttpAuthService();
    }
    return this._instance;
  }

  async handleSignIn(data: SignInCredentials): Promise<any> {
    return await authHttp.post("/auth/sign-in", JSON.stringify(data));
  }

  async handleSignUp(
    data: SignUpCredentials | GoogleSignInCredentials
  ): Promise<any> {
    return await authHttp.post("/auth/sign-up", data);
  }

  async handleForgotPassword(data: ForgotPasswordCredentials): Promise<any> {
    return await authHttp.post("/auth/forgot-password", data);
  }

  async refreshToken(): Promise<any> {
    const refreshToken = getRefreshToken();

    const response = await authHttp.post("/auth/refresh-token", {
      refresh_token: refreshToken,
    });

    const { access_token } = response.data;

    saveAccessToken(access_token);

    return access_token;
  }
}
