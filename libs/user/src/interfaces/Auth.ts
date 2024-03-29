import { IUserInfo } from './User';

export interface ILoginPost {
  username: string;
  password: string;
}

export interface IRegisterPost {
  username: string;
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  expiration: number;
  user: IUserInfo;
}

export interface IRegisterResponse {
  success: boolean;
  user?: IUserInfo;
  errors?: {
    usernameExists: boolean;
    emailExists: boolean;
  };
}
