import Axios, { AxiosInstance } from 'axios';

// TODO: Move to production/development configuration file
const API_URL = import.meta.env['VITE_API_SERVER'];

console.log('URL', API_URL, import.meta.env);

export default class AxiosClient {
  private static _axios: AxiosInstance = Axios.create({
    baseURL: API_URL,
  });

  public static get instance() {
    console.log('instance', this._axios);
    return this._axios;
  }
}
