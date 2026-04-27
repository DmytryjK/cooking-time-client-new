import { POST } from "../../services/axios/axios";
import { API_ROUTES } from "../api-routes";
import { PostSignOutRes } from "./post-sign-out.type";

export const postSignOut = async (): Promise<PostSignOutRes> => {
  return await POST(API_ROUTES.SIGN_OUT);
};
