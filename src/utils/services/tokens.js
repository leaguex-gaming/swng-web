"use server";

import { cookies } from "next/headers";

export const updateLocalAccessToken = (token) => {
  try {
    const accessTokenCokieOptions = {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 30, // One month
      path: "/",
      sameSite: "strict",
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
    };

    cookies().set("accessToken", token, accessTokenCokieOptions);
  } catch (error) {
    return false;
  }
};
