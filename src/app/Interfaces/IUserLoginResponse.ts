export interface IUserLoginResponse {
  email: string;
  tokken: string;
  roles: string[];
  userID: string;
  expireDate: Date;
}
