import { fetchWithTimeout } from "@/lib/fetch-timeout";
import { NextRequest, NextResponse } from "next/server";
import { validateBackendToken } from "@/lib/validate-token";

type Sources = {
  link: string;
  type: string;
  language: string;
  server: string;
};

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
    const upstreamM3u8 =
      media_type === "tv"
        ? `https://noticiastumbes.com/embed/xd/play.php?id=${realId}&season=${season}&episode=${episode}`
        : `https://noticiastumbes.com/embed/xd/play.php?id=${realId}`;

    try {
      const res = await fetchWithTimeout(
        upstreamM3u8,
        {
          headers: {
            Referer: "https://noticiastumbes.com/",
            Origin: "https://noticiastumbes.com/",
            "User-Agent": "Mozilla/5.0",
            Accept: "*/*",
          },
          cache: "no-store",
        },
        8000, // 5-second timeout
      );

      const data = await res.json();
      console.log("reeeeeeeeeeeeeeeeeeeeees", data);

      const spanish = data.sources.find(
        (f: Sources) => f.language === "latino",
      ).link;
      console.log("liiiiiiiiiiiiiiiiiiiiiiiiink", spanish);
      return NextResponse.json({
        success: true,
        link: spanish,
        type: "hls",
      });
    } catch (err) {
      return NextResponse.json(
        { success: false, error: "Timed out" },
        { status: 504 },
      );
    }
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
