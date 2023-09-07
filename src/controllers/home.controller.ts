import { SystemInfo } from "@/models/home.model";
import HttpController from "./http.controller";

export class HomeController extends HttpController {
  getSysInfo = () => super.get<SystemInfo>("/action/get_sys_info");
}

const homeController = new HomeController();

export default homeController;
