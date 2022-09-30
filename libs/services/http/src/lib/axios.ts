import { API_URL } from '@iot/constants';
import Axios, { AxiosInstance } from 'axios';

export default class AxiosClient {
  private static _axios: AxiosInstance = Axios.create({
    baseURL: API_URL,
  });

  public static get instance() {
    return this._axios;
  }
}
