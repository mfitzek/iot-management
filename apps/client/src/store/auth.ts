import { ILoginPost, ILoginResponse, IUserInfo, UserRole } from '@iot/user';
import { readonly, ref } from 'vue';
import api from '@iot/services/http';
import { AxiosError } from 'axios';

export interface IAuthStore {
  expiration: number;
  token: string;
  user: IUserInfo;
}

export type LoginStatus = {
  success: boolean;
  error?: 'credentials' | 'server';
};

const state = ref<IAuthStore | null>(null);

function is_authenticated(): boolean {
  if (state.value?.expiration) return state?.value?.expiration > Date.now();
  return false;
}

function is_admin(): boolean {
  return is_authenticated() && state.value?.user.role === UserRole.ADMIN;
}

function logout() {
  state.value = null;
  removeHttpClientAuthToken();
  removeLocalStorageAuthToken();
}

async function login(username: string, password: string): Promise<LoginStatus> {
  const login: ILoginPost = {
    username,
    password,
  };

  const status: LoginStatus = {
    success: false,
  };

  try {
    const response = await api.post<ILoginResponse>('/auth/login', login);
    status.success = true;
    state.value = response.data;
    setHttpClientAuthToken(response.data.token);
    setAuthStoreToLocalStorage();
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code === 'ERR_NETWORK') {
        status.error = 'server';
      } else {
        status.error = 'credentials';
      }
    }
  }
  return status;
}

function setHttpClientAuthToken(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function setAuthStoreToLocalStorage() {
  localStorage.setItem('auth', JSON.stringify(state.value));
}

function loadAuthStoreFromLocalStorage() {
  const local = localStorage.getItem('auth');
  if (local) {
    const parsed: IAuthStore = JSON.parse(local);
    setHttpClientAuthToken(parsed.token);
    state.value = parsed;
  }
}

function removeHttpClientAuthToken() {
  api.defaults.headers.common['Authorization'] = '';
}

function removeLocalStorageAuthToken() {
  localStorage.removeItem('auth');
}

export default {
  state: readonly(state),
  loadAuthStoreFromLocalStorage,
  is_authenticated,
  is_admin,
  logout,
  login,
};
