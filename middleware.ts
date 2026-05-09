import { NextResponse, type NextRequest } from "next/server";
import { PHP_GONE_SET } from "./lib/legacy-redirects";

export function middleware(req: NextRequest) {
  if (PHP_GONE_SET.has(req.nextUrl.pathname)) {
    return new NextResponse("Gone", {
      status: 410,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:path*.php",
    "/js/style-switcher/:path*",
  ],
};
