import { API_URL } from '@iot/constants';
import Axios from 'axios';
import { reactive } from 'vue';

const axios = Axios.create({
  baseURL: API_URL,
});

export const http_axios = reactive(axios);
