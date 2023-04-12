import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  isAuthenticated: boolean;
  user: null| {
    avatar: string | null;
    createdAt: string;
    email: string;
    phone: number;
    id: string;
    name: string;
    role: "user" | "admin";
    updatedAt: string;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  whoami: {
    user: {
      _id: string;
      name: string;
      email: string;
      phone: number;
      role: "user" | "admin";
      avatar: string | null;
    };
    sessions: [
      {
        refreshToken: string;
        deviceId: string;
        deviceInfo: {
          name: string;
          location: {
            country: string;
            state: string;
            city: string;
          };
          browser: string;
        };
      }
    ];
    isPremium: {
      subscriptionId: string | null;
      subscriptionDetails: any | null;
      status: boolean;
      active_at: string | null;
      expiresIn: string | null;
    } | null;
  };
  phoneAndHash: {
    phone: number;
    hash: string;
  } | null;
}

export interface IAuthPayload {
  isAuthenticated: boolean;
  user: IAuthState["user"]|null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  user: {} as IAuthState["user"],
  status: "idle",
  whoami: {} as IAuthState["whoami"],
  phoneAndHash: null as IAuthState["phoneAndHash"],
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, actions: PayloadAction<IAuthPayload>) => {
      const { isAuthenticated, user } = actions.payload;
      state.user = user;
      state.isAuthenticated = isAuthenticated;
    },
    setPhoneAndHash: (
      state,
      actions: PayloadAction<IAuthState["phoneAndHash"]>
    ) => {
      state.phoneAndHash = actions.payload;
    },
    clearPhoneAndHash: (state) => {
      state.phoneAndHash = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setPhoneAndHash, clearPhoneAndHash } =
  AuthSlice.actions;

export default AuthSlice.reducer;
