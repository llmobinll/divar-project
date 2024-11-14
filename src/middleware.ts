import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  try {
    const response = await fetch("http://localhost:3400/user/whoami", {
      headers: {
        Authorization: `Bearer ${request.cookies.get("accessToken")?.value}`,
      },
    });

    if (!response.ok) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    const userData = await response.json();
    const userRole = userData.role;

    if (userRole === "USER" && url.pathname.startsWith("/admin")) {
      url.pathname = "dashboard";
      return NextResponse.redirect(url);
    }
  } catch (error) {
    console.log("Error in middleware: ", error);
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
