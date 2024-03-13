"use client";

import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { guestLogin } from "@/store/thunks/authentication";

export default function UserRestiction({ children }) {
  const accessToken = getCookie("accessToken");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      dispatch(guestLogin());
    }
  }, [accessToken]);

  return <>{children}</>;
}
