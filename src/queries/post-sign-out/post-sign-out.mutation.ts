import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSignOut } from "../../api/post-sign-out/post-sign-out";
import Cookies from "js-cookie";
import { useAppDispatch } from "../../hooks/hooks";
import { removeUser } from "../../store/reducers/AuthenticationSlice";

export const useSignOut = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postSignOut(),
    onSuccess: () => {
      Cookies.remove("accessToken");
      dispatch(removeUser());
      queryClient.invalidateQueries({ queryKey: ["get-recipe"] });
      queryClient.invalidateQueries({ queryKey: ["get-recipes"] });
      queryClient.invalidateQueries({ queryKey: ["get-favorite-recipes"] });
    },
  });
};
