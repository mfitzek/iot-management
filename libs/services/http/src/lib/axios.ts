import Axios, { AxiosInstance } from 'axios';

// TODO: Move to production/development configuration file
const API_URL = 'http://localhost:3333/api';

export default class AxiosClient {
  private static _axios: AxiosInstance = Axios.create({
    baseURL: API_URL,
  });

  public static get instance() {
    return this._axios;
  }
}
