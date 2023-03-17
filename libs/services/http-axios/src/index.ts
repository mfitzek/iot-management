import AxiosClient from './lib/axios';

export default AxiosClient.instance;

const instance = AxiosClient.instance;

export { instance as axios };
