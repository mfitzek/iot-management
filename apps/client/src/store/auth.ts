import { ILoginPost, ILoginResponse, IUserInfo } from '@iot/user';
import { readonly, ref } from 'vue';
import api from '@iot/services/http';

export interface IAuthStore {
  expiration: number;
  token: string;
  user: IUserInfo;
}

const state = ref<IAuthStore | null>(null);

function is_authenticated(): boolean {
  if (state.value?.expiration) return state?.value?.expiration > Date.now();
  return false;
}

function logout() {
  state.value = null;
  removeHttpClientAuthToken();
}

async function login(username: string, password: string): Promise<boolean> {
  const login: ILoginPost = {
    username,
    password,
  };

  return api
    .post<ILoginResponse>('/auth/login', login)
    .then((response) => {
      state.value = response.data;
      setHttpClientAuthToken(response.data.token);
      return true;
    })
    .catch(() => {
      return false;
    });
}

function setHttpClientAuthToken(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function removeHttpClientAuthToken() {
  api.defaults.headers.common['Authorization'] = '';
}

export default {
  state: readonly(state),
  is_authenticated,
  logout,
  login,
};
