import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginRequestBody } from "../models/authModel";
import API from "../network/APIs";
import Cookie from "js-cookie";

export type IAuthState = {
  token: string | null;
  loading: boolean;
  error: any;
};

const initialState: IAuthState = {
  token: (() => {
    return Cookie.get("jwt") || null;
  })(),
  loading: false,
  error: null,
};

export const LoginRequest = createAsyncThunk(
  "user/login",
  async (arg: LoginRequestBody, { rejectWithValue }) => {
    try {
      const response = await API.Login({ ...arg });
      return response?.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: { ...initialState },
  reducers: {
    setUserState: (state, action) => {
      state.token = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginRequest.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(LoginRequest.fulfilled, (state, { payload }) => {
      Cookie.set("jwt", payload.token);
      state.token = payload.token;
      state.error = null;
      state.loading = false;
    });

    builder.addCase(LoginRequest.rejected, (state, { payload }: any) => {
      state.error = payload.data.message;
      state.loading = false;
    });
  },
});

export default slice.reducer;

export const { setUserState, setLoading } = slice.actions;
