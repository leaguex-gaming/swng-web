"use client";

import { Alert } from "react-native-web";
import { ApiService, ApiServiceMultipart } from "./apiService";
export const setAccessTokenToHeader = (token) => {
  try {
    if (token) {
      // console.log("token", token);
      ApiService.defaults.headers.common["x-access-token"] = `${token}`;
      ApiServiceMultipart.defaults.headers.common[
        "x-access-token"
      ] = `${token}`;
    } else {
      Alert.alert("Session Expired", "Please login again");

      delete ApiService.defaults.headers.common["x-access-token"];
      delete ApiServiceMultipart.defaults.headers.common["x-access-token"];
    }
  } catch (e) {}
};
