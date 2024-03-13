import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default function middleware(request) {
  const userToken = cookies().get("accessToken")?.value;

  if (userToken && request.nextUrl.pathname === "/user-login") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
