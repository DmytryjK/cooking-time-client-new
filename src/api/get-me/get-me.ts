import { GET } from "../../services/axios/axios";
import { API_ROUTES } from "../api-routes";
import { GetMeRes } from "./get-me.type";

export const getMe = async (): Promise<GetMeRes> => {
  return await GET<GetMeRes>(API_ROUTES.GET_ME);
};
