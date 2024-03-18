"use client";

const { createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";
import {
  ADD_FCM,
  GUEST_LOGIN,
  LOGIN_WITH_GOOGLE,
} from "../../constants/endpoints/user-endpoints";
import { updateInterestStatus, updateSignInStatus } from "../slices/authSlice";
import { setAccessTokenToHeader } from "../../utils/services/api/helper";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiService } from "../../utils/services/api/apiService";
import { Platform } from "react-native-web";
import { deleteUserSliceData, updateUserSliceData } from "../slices/user-slice";
// import { resettingCommunitySliceData } from "../slices/community-slice";
// import { errorToast } from "../../utils/helpers/errorToast";
// import { resettingCommonSlice } from "../slices/common-slice";
import { getMessaging, getToken } from "firebase/messaging";
import { VAP_ID_KEY } from "../../constants/StaticData";
import { updateLocalAccessToken } from "@/utils/services/tokens";
import { errorToast } from "@/utils/helpers/errorToast";

const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async ({ deviceId, accessToken }, thunkAPI) => {
    let id = deviceId;

    try {
      if (!id) {
        const userAgent = window.navigator.userAgent;
        const platform = window.navigator.platform;
        const randomString =
          Math.random().toString(20).substring(2, 14) +
          Math.random().toString(20).substring(2, 14);

        id = `${userAgent}-${platform}-${randomString}`;
      }
      let requestPayload = {
        access_token: accessToken,
        deviceId: id,
      };

      let response = await ApiService.post(LOGIN_WITH_GOOGLE, requestPayload);

      if (response.status === 200 && response.data.access_token) {
        let userData = response.data;

        await logInSuccess({ userData }, thunkAPI);

        return userData;
      } else {
        throw response;
      }
    } catch (err) {
      let errorPayload = {};
      if (err.message === "Network Error") {
        errorPayload = { message: "Please check yout internet connection" };
      } else {
        errorPayload = err.response.data;
      }
      errorToast(errorPayload);
      return thunkAPI.rejectWithValue(errorPayload);
    }
  }
);

const guestLogin = createAsyncThunk("auth/guestLogin", async (_, thunkAPI) => {
  try {
    let userData = {
      is_guest: true,
      message: "Guest user found!",
      team_name: "Guest User",
    };

    thunkAPI.dispatch(updateUserSliceData({ ...userData }));

    thunkAPI.dispatch(
      updateSignInStatus({
        checkingSignIn: false,
        isSignedIn: true,
      })
    );

    return userData;
  } catch (err) {
    errorToast(err);

    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const logInSuccess = async ({ userData }, thunkAPI) => {
  try {
    setAccessTokenToHeader(userData.access_token);

    updateLocalAccessToken(userData.access_token);

    thunkAPI.dispatch(updateUserSliceData({ ...userData }));

    thunkAPI.dispatch(
      updateSignInStatus({
        checkingSignIn: false,
        isSignedIn: true,
      })
    );
    thunkAPI.dispatch(
      updateInterestStatus({
        isUserInterestSuggested: userData?.interestsExists,
      })
    );

    window.history.replaceState(null, "", "/");
  } catch (err) {
    errorToast(err);
  }
};

const logoutUser = createAsyncThunk("logoutUser", async (payload, thunkAPI) => {
  try {
    const fcmToken = await getStringDataFromAsyncStorage("fcmToken");
    if (fcmToken) {
      await removeFcm();
    }
    setAccessTokenToHeader("");

    // await updateUserDataInAsyncStorate({});

    thunkAPI.dispatch(
      updateSignInStatus({ checkingSignIn: false, isSignedIn: false })
    );

    thunkAPI.dispatch(deleteUserSliceData());
    thunkAPI.dispatch(resettingCommunitySliceData());
    thunkAPI.dispatch(resettingCommonSlice());
    thunkAPI.dispatch(resettingAuthSlice());

    const keys = [
      "userData",
      "fcmToken",
      "posts",
      "allSubtopics",
      "topics",
      "pushNotification",
    ];

    await AsyncStorage.multiRemove(keys);

    return;
  } catch (err) {
    errorToast(err);
  }
});

export const addFcm = async (fcmToken) => {
  try {
    const deviceId = await getUniqueId();
    const requestPayload = {
      fcm_token: fcmToken,
      client_type: Platform.OS === "web" ? "WEB" : "MOBILE",
      is_ios: Platform.OS === "ios" ? true : false,
      device_id: deviceId,
    };
    let response = await ApiService.post(ADD_FCM, requestPayload);
    if (response.status === 200) {
      return response.data;
    } else {
      throw response;
    }
  } catch (err) {
    errorToast(err);
  }
};

export const removeFcm = async () => {
  try {
    const userData = await getDataFromAsyncStorage("userData");
    const deviceId = await getUniqueId();

    let response = await axios.delete(`${ADD_FCM}`, {
      headers: {
        "x-access-token": userData?.access_token,
      },
      data: {
        client_type: Platform.OS === "web" ? "WEB" : "MOBILE",
        device_id: deviceId,
      },
    });

    if (response.status === 200) {
      const keys = ["fcmToken"];

      await AsyncStorage.multiRemove(keys);
      return response.data;
    } else {
      throw response;
    }
  } catch (err) {
    errorToast(err);
  }
};

export const checkFCMToken = async () => {
  try {
    let fcmToken = await getStringDataFromAsyncStorage("fcmToken");
    if (!fcmToken) {
      const messaging = getMessaging();
      fcmToken = await getToken(messaging, { vapidKey: VAP_ID_KEY });

      await AsyncStorage.setItem("fcmToken", fcmToken);
      await addFcm(fcmToken);
    }
  } catch (err) {
    errorToast(err);
  }
};

export { googleSignIn, logoutUser, guestLogin };
