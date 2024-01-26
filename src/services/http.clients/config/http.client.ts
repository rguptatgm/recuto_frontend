import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  getAccessToken,
  getResource,
} from "../../../globals/helpers/storage.helper";
import { HttpAuthService } from "../http.auth.client";

enum HttpStatusCode {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQEUST = 400,
}

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Credentials": true,
  "X-Requested-With": "XMLHttpRequest",
};

export class HttpClient {
  private instance?: AxiosInstance;
  private retryInstance?: AxiosInstance;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  public get retryHttp(): AxiosInstance {
    return this.retryInstance != null
      ? this.retryInstance
      : this.initRetryHttp();
  }

  private initRetryHttp(): any {
    const retryHttp: AxiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers,
      withCredentials: true,
    });

    this.retryInstance = retryHttp;

    return retryHttp;
  }

  initHttp(): any {
    const http: AxiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers,
      withCredentials: true,
    });

    // @ts-ignore
    http.interceptors.request.use(this.injectToken);

    // interceptor for handling http unauthorized errors
    http.interceptors.response.use(
      (response) => response,
      async (error) => {
        await this.handleErrorResponse(error, http);

        return await Promise.reject(error);
      }
    );

    this.instance = http;

    return http;
  }

  // default generic http methods
  async get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R | any> {
    return await this.http.get<T, R>(url, config);
  }

  async post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R | any> {
    return await this.http.post<T, R>(url, data, config);
  }

  async put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R | any> {
    return await this.http.put<T, R>(url, data, config);
  }

  async delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R | any> {
    return await this.http.delete<T, R>(url, config);
  }

  async request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R | any> {
    return await this.http.request<T, R>(config);
  }

  // interceptor for injecting token to the actual request
  injectToken = (
    config: InternalAxiosRequestConfig
  ): AxiosRequestConfig | undefined => {
    try {
      const token: string = getAccessToken();
      if (token != null && config.headers != null) {
        config.headers.Authorization = `Bearer ${token}`;

        const resource = getResource();
        if (resource != null) {
          config.headers.resource = resource;
        }
      }
      return config;
    } catch (_) {}
  };

  // interceptor for handling http forbidden error responses
  // retry request with new token
  handleErrorResponse = async (
    error: any,
    http: AxiosInstance
  ): Promise<AxiosResponse | any> => {
    const { config } = error;
    const { status } = error.response;

    switch (status) {
      case HttpStatusCode.UNAUTHORIZED:
        try {
          const token = await HttpAuthService.getInstance().refreshToken();
          // set the new token on the original request configuration
          config.headers.Authorization = `Bearer ${token}`;

          const response = await this.retryHttp.request(config);
          return response;
        } catch (refreshError) {
          return await Promise.reject(error);
        }
      default:
        return await Promise.reject(error);
    }
  };
}

export const http = new HttpClient();
