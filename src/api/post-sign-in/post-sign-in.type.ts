import { User } from "../../types/type";

export type PostSignInReq = {
  email: string;
  password: string;
};

export type PostSignInRes = {
  user: User;
  accessToken: string;
};
