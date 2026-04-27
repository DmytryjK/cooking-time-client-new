import { POST_PUBLIC } from "../../services/axios/axios";
import { API_ROUTES } from "../api-routes";
import { PostSignUpReq, PostSignUpRes } from "./post-sign-up.type";

export const postSignUp = async (body: PostSignUpReq): Promise<PostSignUpRes> => {
  return await POST_PUBLIC(API_ROUTES.SIGN_UP, body);
};
