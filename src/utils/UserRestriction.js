"use client";

import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { guestLogin } from "@/store/thunks/authentication";
import { getProfile } from "@/store/thunks/user";
import { getTopics } from "@/store/thunks/community";

export default function UserRestiction({ children }) {
  const accessToken = getCookie("accessToken");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      dispatch(guestLogin());
    } else {
      dispatch(getProfile());
      dispatch(getTopics());
    }
  }, [accessToken]);

  return <>{children}</>;
}
