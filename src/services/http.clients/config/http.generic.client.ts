import { HttpClient } from "./http.client";

export class GenericHttpClient<T> extends HttpClient {
  path: string;
  constructor(path: string) {
    super();
    this.path = path;
  }

  async findOne(args: { id: string }): Promise<T | undefined> {
    try {
      const response = await this.get<T>(`${this.path}/${args.id}`);
      return response.data as T;
    } catch (err) {
      return await Promise.reject(err);
    }
  }

  async find(args: { query?: any }): Promise<T[] | undefined> {
    try {
      const response = await this.get<T[]>(`${this.path}`, {
        params: args.query,
      });
      return response.data as T[];
    } catch (err) {
      return await Promise.reject(err);
    }
  }

  async findArchived(): Promise<T[] | undefined> {
    try {
      const response = await this.get<T[]>(`${this.path}/archived`);
      return response.data as T[];
    } catch (err) {
      return await Promise.reject(err);
    }
  }

  async search(args: { searchTerm: string }): Promise<T[] | undefined> {
    try {
      const response = await this.get<T[]>(
        `${this.path}/search/?searchTerm=${args.searchTerm}`
      );
      return response.data as T[];
    } catch (err) {
      return await Promise.reject(err);
    }
  }

  async create(args: { data: T; query?: any }): Promise<T | undefined> {
    try {
      const response = await this.post<T>(this.path, args.data, {
        params: args.query,
      });
      return response.data as T;
    } catch (err) {
      return await Promise.reject(err);
    }
  }

  async updateOne(args: {
    id: string;
    data: T;
    query?: any;
  }): Promise<T | undefined> {
    try {
      const response = await this.put<T>(`${this.path}/${args.id}`, args.data, {
        params: args.query,
      });
      return response.data as T;
    } catch (err) {
      return await Promise.reject(err);
    }
  }

  async deleteOne(args: { id: string }): Promise<T | undefined> {
    try {
      const response = await this.delete<T>(`${this.path}/${args.id}`);
      return response.data as T;
    } catch (err) {
      return await Promise.reject(err);
    }
  }

  async archiveOne(args: { id: string }): Promise<T | undefined> {
    try {
      const response = await this.put(`${this.path}/${args.id}/archive`);
      return response.data as T;
    } catch (err) {
      return await Promise.reject(err);
    }
  }

  async unarchiveOne(args: { id: string }): Promise<T | undefined> {
    try {
      const response = await this.put(`${this.path}/${args.id}/unarchive`);
      return response.data as T;
    } catch (err) {
      return await Promise.reject(err);
    }
  }
}
