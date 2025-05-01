interface ITokenResponse {
  token: string;
  ttl: string;
}

interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ILoginResponse {
  message: string;
  accessTokenAndExpiry: ITokenResponse;
  refreshTokenAndExpiry: ITokenResponse;
  user: IUser;
}
