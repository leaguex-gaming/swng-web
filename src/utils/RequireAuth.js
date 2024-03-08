"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCookie } from "cookies-next";

export default function RequireAuth({ children }) {
  const { push } = useRouter();
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    if (!accessToken) push("/");
    else push("/feed");
  }, []);

  return <>{children}</>;
}
