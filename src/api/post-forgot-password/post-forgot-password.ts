import { POST_PUBLIC } from "../../services/axios/axios";
import { API_ROUTES } from "../api-routes";
import { PostForgotPasswordReq, PostForgotPasswordRes } from "./post-forgot-password.type";

export const postForgotPassword = async (body: PostForgotPasswordReq): Promise<PostForgotPasswordRes> => {
  return await POST_PUBLIC(API_ROUTES.FORGOT_PASSWORD, body);
};
