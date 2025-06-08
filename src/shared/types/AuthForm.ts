export enum AuthFormMode {
  LOGIN = "login",
  REGISTER = "register",
}

export type ValidationErrors = {
  username?: string;
  password?: string;
};
