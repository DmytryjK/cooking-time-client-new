import { User } from "../../types/type";

export type PostSignOutRes = {
  user: User;
  accessToken: string;
};
