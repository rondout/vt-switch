import { IntBool, StringBool } from "./base.model";

export enum UserRole {
  USER = "user",
  ADMINISTRATOR = "administrator",
}

export interface UserInfo {
  username: string;
  roles: UserRole;
}

export interface GetUsersResponse {
  users: UserInfo[];
  user_nums: number;
}

export interface AddUserParam {
  username: string;
  password: string;
}

export interface ResetUserPasswordParam extends AddUserParam {
  new_password: string;
}

export interface CurrentUserInfo {
  username: string;
  roles: UserRole;
  login_status: StringBool;
}
