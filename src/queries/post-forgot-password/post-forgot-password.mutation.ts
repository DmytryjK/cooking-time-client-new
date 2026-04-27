import { useMutation } from "@tanstack/react-query";
import { postForgotPassword } from "../../api/post-forgot-password/post-forgot-password";
import { PostForgotPasswordReq } from "../../api/post-forgot-password/post-forgot-password.type";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (body: PostForgotPasswordReq) => postForgotPassword(body),
  });
};
