import AxiosClient from './lib/axios';

export default AxiosClient.axios;

const instance = AxiosClient.axios;

export { instance as axios };
