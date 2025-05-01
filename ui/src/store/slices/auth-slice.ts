import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserPayload {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
interface IAuthSlice extends IUserPayload {
  accessToken: string;
  isAuthenticated: boolean;
}

const initialState: IAuthSlice = {
  _id: "",
  accessToken: "",
  email: "",
  firstName: "",
  isAuthenticated: false,
  lastName: "",
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      Object.assign(state, initialState);
      localStorage.clear();
    },
    setUserDetails: (state, action: PayloadAction<IUserPayload>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
  },
});

export const { setToken, clearAuth, setUserDetails } = authSlice.actions;

export default authSlice.reducer;
