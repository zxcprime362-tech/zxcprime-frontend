import { fetchWithTimeout } from "@/lib/fetch-timeout";
import { NextRequest, NextResponse } from "next/server";
const SECRET =
  process.env.API_SECRET ||
  "G9v!r7Xq2#kPz8&Lf5@bD3sW1^mT0yH4*eJ6uC8$QnVwR2+ZpF7!aL9xS3";
import crypto from "crypto";
import { decryptId } from "@/app/api/enc";
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
    const payload = JSON.parse(decoded);

    if (Date.now() - payload.ts > 5000) {
      return NextResponse.json({ error: "Token expired" }, { status: 403 });
    }
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
    const imdbId = payload.imdbId;
    const media_type = payload.media_type;
    const season = payload?.season;
    const episode = payload?.episode;

    try {
      const decodedId = decodeURIComponent(id);
      decryptId(decodedId);
    } catch (err) {
      console.warn("Decryption failed:", err);
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 403 },
      );
    }

    const upstreamM3u8 =
      media_type === "tv"
        ? `https://scrennnifu.click/serial/${imdbId}/${season}/${episode}/playlist.m3u8`
        : `https://scrennnifu.click/movie/${imdbId}/playlist.m3u8`;

    try {
      const upstream = await fetchWithTimeout(
        upstreamM3u8,
        {
          headers: {
            Referer: "https://screenify.fun/",
            Origin: "https://screenify.fun/",
            "User-Agent": "Mozilla/5.0",
            Accept: "*/*",
          },
          cache: "no-store",
        },
        12000, // 5-second timeout
      );

      if (!upstream.ok) {
        return NextResponse.json(
          { success: false, error: `${upstream.status}` },
          { status: 502 },
        );
      }
    } catch (err) {
      return NextResponse.json(
        { success: false, error: "Timed out" },
        { status: 504 },
      );
    }

    const sourceLink = `/api/zxc?id=${media_type}-${imdbId}${
      media_type === "tv" ? `-${season}-${episode}` : ""
    }`;
    return NextResponse.json({
      success: true,
      link: sourceLink,
      type: "hls",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
