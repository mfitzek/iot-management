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
  user: {
    id: string;
    username: string;
    email: string;
  };
}
