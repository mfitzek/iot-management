export interface IUser {
  id?: string;
  username: string;
  email: string;
  password: string;
  salt: string;
}

export interface IUserInfo {
  id: string;
  username: string;
  email: string;
}