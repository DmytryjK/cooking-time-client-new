import { User } from "../../types/type";

export type PostSignUpReq = {
  email: string;
  password: string;
};

export type PostSignUpRes = {
  user: User;
  accessToken: string;
};
