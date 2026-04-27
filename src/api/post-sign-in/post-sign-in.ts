import { POST_PUBLIC } from "../../services/axios/axios";
import { API_ROUTES } from "../api-routes";
import { PostSignInReq, PostSignInRes } from "./post-sign-in.type";

export const postSignIn = async (body: PostSignInReq): Promise<PostSignInRes> => {
  return await POST_PUBLIC(API_ROUTES.SIGN_IN, body);
};
