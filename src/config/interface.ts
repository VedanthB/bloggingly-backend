export interface INewUser {
  name: string;
  email: string;
  password: string;
}

export interface IDecodedToken {
  newUser?: INewUser;
  iat: number;
  exp: number;
}
