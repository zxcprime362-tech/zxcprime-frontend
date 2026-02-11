// import { NextRequest, NextResponse } from "next/server";

// const blockedIPs = ["45.86.86.43", "75.218.156.20", "120.29.68.4","73.249.175.122"];
// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://192.168.1.4:3000",
//   "https://www.zxcprime.icu",
//   "https://zxcprime.icu",
//   "https://www.zxcprime.site",
//   "https://zxcprime.site",
// ];

// export async function proxy(req: NextRequest) {
//   const origin = req.headers.get("origin") || "";
//   const forwardedFor = req.headers.get("x-forwarded-for");
//   const ip = forwardedFor?.split(",")[0]?.trim() || "Unknown";
//   const ua = req.headers.get("user-agent") || "unknown";
//   console.log("middleware hit", { ip, ua, origin });
//   // 1️⃣ Block IPs
//   if (blockedIPs.includes(ip)) {
//     console.log("Blocked IP tried to access:", ip, ua);
//     return new NextResponse("Forbidden", { status: 403 });
//   }

//   // 2️⃣ Validate origin
//   const allowed =
//     origin === "" || allowedOrigins.some((url) => origin.includes(url));

//   if (!allowed) {
//     return new NextResponse("Forbidden", { status: 403 });
//   }

//   // ✅ Allow request to continue
//   return NextResponse.next();
// }
import { NextRequest, NextResponse } from "next/server";

// Blocked IPs
const blockedIPs = [
  "45.86.86.43",
  "75.218.156.20",
  "120.29.68.4",
  "73.249.175.122",
];

// Allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.1.4:3000",
  "https://www.zxcprime.icu",
  "https://zxcprime.icu",
  "https://www.zxcprime.site",
  "https://zxcprime.site",
];

// In-memory rate limit store
const rateLimitMap = new Map<string, { count: number; last: number }>();
const RATE_LIMIT = 10; // Max requests
const WINDOW_MS = 5000; // per 5 seconds

export async function proxy(req: NextRequest) {
  // Get client IP
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0]?.trim() || realIP || "unknown";

  const ua = req.headers.get("user-agent") || "unknown";
  const origin = req.headers.get("origin") || "";

  console.log("middleware hit", { ip, ua, origin, path: req.nextUrl.pathname });

  // 1️⃣ Block specific IPs
  if (blockedIPs.includes(ip)) {
    console.log("Blocked IP tried to access:", ip, ua);
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 2️⃣ Validate origin
  const allowed =
    origin === "" || allowedOrigins.some((url) => origin.includes(url));
  if (!allowed) {
    console.log("Blocked Origin:", origin);
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 3️⃣ Apply rate limit only on /details path
  if (req.nextUrl.pathname.startsWith("/details")) {
    const now = Date.now();
    const entry = rateLimitMap.get(ip) || { count: 0, last: now };

    if (now - entry.last > WINDOW_MS) {
      // Reset window
      entry.count = 1;
      entry.last = now;
    } else {
      // Increment counter
      entry.count++;
    }

    rateLimitMap.set(ip, entry);

    if (entry.count > RATE_LIMIT) {
      console.log("Rate limit exceeded for IP:", ip, ua);
      return new NextResponse("Too many requests", { status: 429 });
    }
  }

  // ✅ Allow request to continue
  return NextResponse.next();
}
