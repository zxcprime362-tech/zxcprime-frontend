import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedReferers = [
  "/api/",
  "http://192.168.1.4:3000/",
  "https://www.zxcprime.icu/",
  "https://zxcprime.icu/",
  "https://www.zxcprime.site/",
  "https://zxcprime.site/",
];

export function proxy(req: NextRequest) {
  const referer = req.headers.get("referer") || "";
  const origin = req.headers.get("origin") || "";

  const allowed = allowedReferers.some(
    (url) => referer.includes(url) || origin.includes(url),
  );

  if (!allowed) {
    return NextResponse.json(
      { success: false, error: "Forbidden" },
      { status: 403 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*", // runs only on API routes
};
