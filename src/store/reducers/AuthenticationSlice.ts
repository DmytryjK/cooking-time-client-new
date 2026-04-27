import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthStore } from "../../types/type";
import { PostSignInRes } from "../../api/post-sign-in/post-sign-in.type";

const initialState: AuthStore = {
  user: null,
  accessToken: null,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<PostSignInRes["user"]>) => {
      state.user = action.payload;
    },
    setTokens: (state, action: PayloadAction<PostSignInRes["accessToken"]>) => {
      state.accessToken = action.payload;
    },
    removeUser: () => initialState,
  },
});

export const { setUser, setTokens, removeUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;
