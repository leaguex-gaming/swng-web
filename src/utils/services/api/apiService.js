"use client";

import axios from "axios";
import { USER_BASE_URL } from "../../../constants/endpoints/user-endpoints";

export const ApiService = axios.create({
  baseURL: USER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export const ApiServiceMultipart = axios.create({
  baseURL: "https://swng-media.s3.amazonaws.com/",
  headers: {
    "Content-Type":
      "multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL",
  },
});

ApiService.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err?.response?.status === 401) {
    }
    throw err;
  }
);

ApiService.interceptors.request.use(
  (config) => {
    let [key, value] = document.cookie.split("=");
    let accessToken = value;

    config.headers["x-access-token"] = `${accessToken}`;

    return config;
  },
  async (err) => {
    // if (err?.response?.status === 401 || err?.response?.status === 403) {
    //   setAccessTokenToHeader();
    // }
    return err;
  }
);
// ApiServiceMultipart.interceptors.response.use(
//   res => res,
//   async err => {
//     if (err?.response?.status === 401 || err?.response?.status === 403) {
//       setAccessTokenToHeader();
//     }
//     return err;
//   },
// );
