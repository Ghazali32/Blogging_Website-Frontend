import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  status: "idle",
  error: null,
  isAuthenticated: false,
};

export const signIn = createAsyncThunk("auth/signIn", async (credentials) => {
  const response = await axios.post(
    "https://backend.shazebansari2536.workers.dev/api/v1/user/signin",
    credentials
  );
  console.log(response.data);
  sessionStorage.setItem("token", response.data.token);
  sessionStorage.setItem("name", response.data.userName);
  return response.data;
});

export const signUp = createAsyncThunk('auth/signUp', async (credentials) => {
    const response = await axios.post('https://backend.shazebansari2536.workers.dev/api/v1/user/signup', credentials);
    console.log(response.data);
    sessionStorage.setItem("token", response.data.token);
    sessionStorage.setItem("name", response.data.userName);
    return response.data;
  });

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("name");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
