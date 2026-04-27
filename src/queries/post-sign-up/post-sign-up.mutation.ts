import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSignUp } from "../../api/post-sign-up/post-sign-up";
import { PostSignUpReq } from "../../api/post-sign-up/post-sign-up.type";

export const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PostSignUpReq) => postSignUp(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-recipe"] });
      queryClient.invalidateQueries({ queryKey: ["get-recipes"] });
      queryClient.invalidateQueries({ queryKey: ["get-favorite-recipes"] });
    },
  });
};
