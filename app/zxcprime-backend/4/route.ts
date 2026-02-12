import { fetchWithTimeout } from "@/lib/fetch-timeout";
import { NextRequest, NextResponse } from "next/server";
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
    const sourceLink =
      media_type === "tv"
        ? `https://vasurajput12345-fleet2.hf.space/api/extract?tmdbId=${realId}&type=tv&season=${season}&episode=${episode}`
        : `https://vasurajput12345-fleet2.hf.space/api/extract?tmdbId=${realId}&type=movie`;

    // const res = await fetch(sourceLink, {
    //   headers: {
    //     "User-Agent": "Mozilla/5.0",
    //     Referer: "https://abhishek1996-streambuddy.hf.space/",
    //   },
    // });

    const res = await fetchWithTimeout(
      sourceLink,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Referer: "https://streamixapp.pages.dev/",
        },
      },
      10000,
    ); // 5-second timeout
    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: "Upstream request failed" },
        { status: res.status },
      );
    }

    const data = await res.json();

    if (!data?.m3u8Url) {
      return NextResponse.json(
        { success: false, error: "No m3u8 stream found" },
        { status: 404 },
      );
    }
    // const proxy = "https://damp-bonus-5625.mosangfour.workers.dev/?u=";
    return NextResponse.json({
      success: true,
      link:
        "https://vasurajput12345-fleet2.hf.space/api/stream?url=" +
        encodeURIComponent(data.m3u8Url),
      type: "hls",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
//https://streamixapp.pages.dev/
