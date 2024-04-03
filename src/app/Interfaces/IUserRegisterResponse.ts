export interface IUserRegisterResponse {
  message: string;
  userName: string;
  isAuthenticated: boolean;
  email: string;
  token: string;
  roles: string[];
  expireDate: Date;
}
