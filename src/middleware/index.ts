import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  let token = req.cookies.get("accessToken")?.value;

  console.log(token);

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/"));
    }
  }
}
