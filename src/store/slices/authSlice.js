"use client";

import { createSlice } from "@reduxjs/toolkit";
import { googleSignIn, guestLogin, logoutUser } from "../thunks/authentication";

const initialState = {
  checkingSignIn: true,
  isSignedIn: false,
  isUserInterestSuggested: true,

  userDetails: {},

  googleSignInLoading: false,
  googleSignInError: "",

  guestLoginLoading: false,
  guestLoginError: "",

  logoutLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateSignInStatus(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateInterestStatus(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateUserData(state, action) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    //google sign in
    builder.addCase(googleSignIn.pending, (state) => {
      state.googleSignInLoading = true;
    });
    builder.addCase(googleSignIn.fulfilled, (state, action) => {
      state.googleSignInLoading = false;
      state.userDetails = action.payload;
    });
    builder.addCase(googleSignIn.rejected, (state, action) => {
      state.googleSignInLoading = false;
      state.googleSignInError = action?.payload?.message || "";
    });

    //guest signin
    builder.addCase(guestLogin.pending, (state) => {
      state.guestLoginLoading = true;
    });
    builder.addCase(guestLogin.fulfilled, (state, action) => {
      state.guestLoginLoading = false;
      state.userDetails = action.payload;
    });
    builder.addCase(guestLogin.rejected, (state, action) => {
      state.guestLoginLoading = false;
      state.guestLoginError = action?.payload?.message || "";
    });

    //logout
    builder.addCase(logoutUser.pending, (state) => {
      state.logoutLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.logoutLoading = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.logoutLoading = false;
    });
  },
});

export const {
  updateSignInStatus,
  updateInterestStatus,
  updateUserData,
  updateOTPDetails,
} = authSlice.actions;

export const authSliceReducer = authSlice.reducer;
