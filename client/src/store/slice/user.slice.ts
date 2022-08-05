import { createSelector, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user.types";

interface UserState {
  user: User;
  isAuth: boolean;
}

const initialState: UserState = {
  user: {
    id: "0",
    name: "",
    surname: "",
    username: "",
    role: "USER",
    email: "example@gmail.com",
    password: "",
  },
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.isAuth = true;
    },
    logoutUser(state) {
      state.user = initialState.user;
      state.isAuth = false;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

const selectSelf = (state: { user: UserState }) => state.user;
export const getUser = createSelector(selectSelf, (state) => state.user);
export const getIsAuth = createSelector(selectSelf, (state) => state.isAuth);

export default userSlice.reducer;
