import { api } from '@iot/services/http-axios';
import Axios, { AxiosInstance } from 'axios';

// TODO: Move to production/development configuration file
const API_URL = import.meta.env['VITE_API_SERVER'];

export default class AxiosClient {
  private static _axios: AxiosInstance = Axios.create({
    baseURL: API_URL,
  });

  public static get instance() {
    return this._axios;
  }
}
