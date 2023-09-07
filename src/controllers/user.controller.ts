import { BaseResponse } from "@/models/base.model";
import {
  AddUserParam,
  CurrentUserInfo,
  GetUsersResponse,
  ResetUserPasswordParam,
} from "@/models/user.model";
import HttpController from "./http.controller";

export class UserController extends HttpController {
  getUsers = () => super.get<GetUsersResponse>("/action/getUsers");

  deleteUser = (username: string) =>
    super.get("/action/delUser", { params: { username } });

  multiDeleteUser = (usernames: string[]) =>
    super.all(usernames.map((username) => this.deleteUser(username)));

  resetPassword = (params: ResetUserPasswordParam) =>
    super.get<BaseResponse<number>>("/action/setUserPassword", { params });

  addUser = (params: AddUserParam) =>
    super.get<BaseResponse<number>>("/action/addUser", { params });

  logout = () => super.get("/action/logout");

  login = (params: { username: string; password: string }) =>
    super.get<"failed" | string>("/action/login", { params });

  getUserInfo = () => super.get<CurrentUserInfo>("/action/get_login_user_info");
}

const userController = new UserController();

export default userController;
