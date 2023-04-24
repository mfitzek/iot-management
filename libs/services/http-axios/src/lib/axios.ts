import Axios, { AxiosInstance } from 'axios';

export default class AxiosClient {
  private static _axios: AxiosInstance = Axios.create({
    baseURL: import.meta.env['VITE_API_SERVER'],
  });

  public static get axios() {
    return this._axios;
  }
}
