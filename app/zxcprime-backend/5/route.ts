import { fetchWithTimeout } from "@/lib/fetch-timeout";
import { NextRequest, NextResponse } from "next/server";
import { validateBackendToken } from "@/lib/validate-token";
import crypto from "crypto";
import { decryptId } from "@/app/api/enc";
const SECRET =
  process.env.API_SECRET ||
  "G9v!r7Xq2#kPz8&Lf5@bD3sW1^mT0yH4*eJ6uC8$QnVwR2+ZpF7!aL9xS3";
export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("data");
    const sig = req.nextUrl.searchParams.get("sig");

    if (!token || !sig) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }
    const decoded = Buffer.from(token, "base64").toString();
    const expectedSig = crypto
      .createHmac("sha256", SECRET)
      .update(decoded)
      .digest("hex");
    if (expectedSig !== sig) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }
    // Now payload is trusted
    const payload = JSON.parse(decoded);

    // Expiry check
    if (Date.now() - payload.ts > 5000) {
      return NextResponse.json({ error: "Token expired" }, { status: 403 });
    }
    // block direct /api access
    const referer = req.headers.get("referer") || "";
    if (
      !referer.includes("/api/") &&
      !referer.includes("localhost") &&
      !referer.includes("http://192.168.1.4:3000/") &&
      !referer.includes("https://www.zxcprime.icu/") &&
      !referer.includes("https://zxcprime.icu/") &&
      !referer.includes("https://www.zxcprime.site/") &&
      !referer.includes("https://zxcprime.site/")
    ) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 },
      );
    }

    const id = payload.id;
    const media_type = payload.media_type;
    const season = payload?.season;
    const episode = payload?.episode;
    let realId: string;
    try {
      const decodedId = decodeURIComponent(id);
      realId = decryptId(decodedId);
    } catch (err) {
      console.warn("Decryption failed:", err);
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 403 },
      );
    }
    const pathLink = `https://enc-dec.app/api/enc-vidlink?text=${realId}`;

    const pathLinkResponse = await fetchWithTimeout(
      pathLink,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Referer: "https://vidlink.pro/",
        },
      },
      5000,
    );

    const pathLinkData = await pathLinkResponse.json();

    const sourceLink =
      media_type === "tv"
        ? `https://vidlink.pro/api/b/tv/${pathLinkData.result}/${season}/${episode}`
        : `https://vidlink.pro/api/b/movie/${pathLinkData.result}`;

    const res = await fetchWithTimeout(
      sourceLink,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Referer: "https://vidlink.pro/",
        },
      },
      8000,
    );

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: "Upstream request failed" },
        { status: res.status },
      );
    }

    const data = await res.json();

    if (!data.stream.playlist) {
      return NextResponse.json(
        { success: false, error: "No sources found" },
        { status: 404 },
      );
    }

    const m3u8Url = data.stream.playlist; // e.g. https://storm.vodvidl.site/proxy/file2/.../playlist.m3u8?...

    // Extract only the pathname (everything starting from /proxy/...)
    const urlObj = new URL(m3u8Url);
    const proxyPath = urlObj.pathname; // → /proxy/file2/.../playlist.m3u8

    // Optional: preserve query params if needed (e.g. host=), but we don't need headers anymore
    const search = urlObj.search; // usually has ?headers=...&host=...

    const proxyLinks = [
      `https://blue-hat-477a.jerometecson333.workers.dev`,

      `https://square-darkness-1efb.amenohabakiri174.workers.dev`,

      `https://dark-scene-567a.jinluxuz.workers.dev`,
    ];

    let finalProxy: string | null = null;
    for (const proxy of proxyLinks) {
      const testUrl = `${proxy}${proxyPath}${search}`;
      try {
        const head = await fetch(testUrl, {
          method: "HEAD",
          signal: AbortSignal.timeout(1500),
        });
        if (head.ok) {
          finalProxy = testUrl;
          break;
        }
      } catch {
        // try next proxy
      }
    }
    if (!finalProxy) {
      return NextResponse.json(
        { success: false, error: "All proxies down" },
        { status: 503 },
      );
    }

    return NextResponse.json({
      success: 200,
      link: finalProxy,
      type: "hls",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
