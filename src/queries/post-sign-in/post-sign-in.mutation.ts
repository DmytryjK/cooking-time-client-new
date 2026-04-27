import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSignIn } from "../../api/post-sign-in/post-sign-in";
import { PostSignInReq } from "../../api/post-sign-in/post-sign-in.type";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PostSignInReq) => postSignIn(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-recipe"] });
      queryClient.invalidateQueries({ queryKey: ["get-recipes"] });
      queryClient.invalidateQueries({ queryKey: ["get-favorite-recipes"] });
    },
  });
};
