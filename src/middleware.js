import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request) {
  const userToken = cookies().get("accessToken")?.value;

  if (userToken && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/feed", request.url));
  }
}
