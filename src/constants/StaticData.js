"use client";

import { Platform } from "react-native-web";

export const isProduction = true;

export const firebaseWebServerKey =
  "BL-y9iEA4mgbyMtsjdyLUETqeuThofvhZ6TVCHeC5JdpM6bTr3XUz9YakMiwkL4fEEGDSxDSeXQ2YyjksCsyxfA";

export const WEB_CLIENT_ID =
  "483408125574-fnsvl0msprfptvpk2ah90lomhq116e8u.apps.googleusercontent.com";

export const DEEPLINK_BASE_URL = "https://www.swng.fan/dl";
export const DEEPLINK_NORMAL_POST_URL = "https://www.swng.fan/post";
export const DEEPLINK_REELS_URL = "https://www.swng.fan/reel";
export const DEEPLINK_PROFILE_URL = "https://www.swng.fan/profile";

export const VAP_ID_KEY =
  "BAJAKYeZ4OMAzYE3X4eNiSUm9gEG9_fja0q5HExa58_euN2TvMcuUxuR-W10ohmbHt2YzNcKnueycOyphper4gM";

export const GIPHY_KEY =
  Platform.OS === "web"
    ? "i9Pz3OulYLcECn7zqQ8tnbodhrOWT9QC"
    : "mMaC0RlIGLou6sDlThP9YiHxdJHrckp1";

export const VERSION_NAME = "0.24.0229";

export const DUMMY_AVATAR =
  "https://s3-ap-southeast-1.amazonaws.com/testleaguex/avatars/thumb_B6D20D656A2F4005B7D2E3B2FD3DE62E_1683105828529.jpg";

export const POST_API_CALL_PAGE_SIZE = 15;
export const REELS_API_CALL_PAGE_SIZE = 10;
