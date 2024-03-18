"use client";

import { Platform } from "react-native-web";

export const PlatformOS = Platform.OS;
export const windowMaxWidth = window.innerWidth > 500 ? 500 : window.innerWidth;
export const windowMaxHeight = "100vh";
