// app/api/proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) {
      return NextResponse.json(
        { error: "Missing 'url' parameter" },
        { status: 400 },
      );
    }

    // Fetch the actual .m3u8 file with proper headers
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        Referer: "https://videasy.net/",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream request failed with status ${res.status}` },
        { status: res.status },
      );
    }

    const body = await res.arrayBuffer(); // .m3u8 is plain text, but ArrayBuffer works
    const headers = new Headers(res.headers);

    // Add CORS headers so the browser can fetch it
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    headers.set("Content-Type", "application/vnd.apple.mpegurl"); // correct type for HLS

    return new NextResponse(body, { status: 200, headers });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Proxy error: " + err.message },
      { status: 500 },
    );
  }
}
