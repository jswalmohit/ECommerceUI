export interface RegisterModel {
  loginId: string;
  email: string;
  fullName: string;
  credentials: {
    password: string;
  };
}
