"use client";

import { isProduction } from "../StaticData";

export const USER_BASE_URL = isProduction
  ? "https://l1z6btl2l9.execute-api.ap-south-1.amazonaws.com/production/api/v1/"
  : "https://966ievwykg.execute-api.ap-south-1.amazonaws.com/development/api/v1/";

//auth
export const MOBILE_EXISTENCE = "/auth/check-mobile-exists";
export const LOGIN_WITH_PASSWORD = "/auth/login-with-password";
export const VERIFY_MOBILE = "/auth/verify-otp";
export const SEND_OTP = "/auth/send-otp-new";
export const LOGIN_WITH_GOOGLE = "/auth/google-sign-in";
export const GUEST_LOGIN = "/auth/guest-sign-in";
export const RESET_PASSWORD = "/auth/reset-password";
export const VERIFY_RESET_PASSWORD_OTP = "/auth/verify-reset-password-otp";
export const REACTIVATE_ACCOUNT = "/auth/reactivate-user";
export const CREATE_PROFILE = USER_BASE_URL + "/auth/profile";
export const EDIT_PROFILE_PS = USER_BASE_URL + "/auth/profile-fields-update";

export const ADD_FCM = USER_BASE_URL + "sportsgram/fcm-token";

export const V2_CHECK_TEAM_NAME =
  USER_BASE_URL + "/auth/check-team-name-availability";
export const V2_ADD_PROFILE_FIELDS =
  USER_BASE_URL + "/auth/add-profile-fields-ps";
export const V2_ADD_REFERRAL_CODE = USER_BASE_URL + "/auth/add-referral-code";

export const GET_PROFILE = USER_BASE_URL + "auth/profile";
