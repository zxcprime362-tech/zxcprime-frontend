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

    const tmdbId = payload.id;
    const title = payload.title;
    const year = payload.year;
    const mediaType = payload.media_type;
    const season = payload?.season;
    const episode = payload?.episode;

    let realId: string;
    try {
      const decodedId = decodeURIComponent(tmdbId);
      realId = decryptId(decodedId);
    } catch (err) {
      console.warn("Decryption failed:", err);
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 403 },
      );
    }
    const qs = new URLSearchParams();
    qs.set("title", title);
    qs.set("mediaType", mediaType);
    qs.set("year", year);
    qs.set("tmdbId", realId);
    if (mediaType === "tv" && season) qs.set("seasonId", season);
    if (mediaType === "tv" && episode) qs.set("episodeId", episode);

    const pathLink = `https://api.videasy.net/myflixerzupcloud/sources-with-title?${qs}`;

    const pathLinkResponse = await fetchWithTimeout(
      `https://orange-poetry-e481.jindaedalus2.workers.dev/?url=${encodeURIComponent(pathLink)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
          Referer: "https://videasy.net/",
        },
      },
      5000,
    );

    if (!pathLinkResponse.ok) {
      const txt = await pathLinkResponse.text();
      console.error("videasy status:", pathLinkResponse.status);
      console.error("videasy body:", txt.slice(0, 300));

      return NextResponse.json(
        {
          success: false,
          error: "pathLinkResponse Upstream request failed",
          status: pathLinkResponse.status,
          body: txt.slice(0, 200),
        },
        { status: pathLinkResponse.status },
      );
    }

    const encrypted = await pathLinkResponse.text();

    const decrypted = await fetchWithTimeout(
      "https://enc-dec.app/api/dec-videasy",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: encrypted, id: String(realId) }),
      },
      8000,
    );
    if (!decrypted.ok) {
      return NextResponse.json(
        { success: false, error: "Decrypted Upstream request failed" },
        { status: decrypted.status },
      );
    }

    const decryptedData = await decrypted.json();
    const sources = decryptedData.result.sources;

    if (!Array.isArray(sources) || sources.length === 0) {
      return NextResponse.json(
        { success: false, error: "No m3u8 stream found" },
        { status: 404 },
      );
    }
    console.log("sourcessourcessources", sources);
    const finalM3u8 = encodeURIComponent(
      sources.find((f) => f.quality === "1080p")?.url ??
        sources.at(0)?.url ??
        "",
    );

    const proxies = [
      "https://square-darkness-1efb.amenohabakiri174.workers.dev/",
      "https://billowing-king-b723.jerometecson33.workers.dev/",
      "https://snowy-recipe-f96e.jerometecson000.workers.dev/",
      "https://morning-unit-723b.jinluxus303.workers.dev/",
    ];

    const workingProxy = await getWorkingProxy(finalM3u8, proxies);
    if (!workingProxy) {
      return NextResponse.json(
        { success: false, error: "No working proxy available" },
        { status: 502 },
      );
    }
    const proxiedUrl = `${workingProxy}?m3u8-proxy=${finalM3u8}`;

    return NextResponse.json({
      success: 200,
      link: proxiedUrl,
      type: "hls",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
export async function getWorkingProxy(url: string, proxies: string[]) {
  for (const proxy of proxies) {
    try {
      const testUrl = `${proxy}?m3u8-proxy=${url}`;
      const res = await fetchWithTimeout(
        testUrl,
        {
          method: "HEAD",
          headers: {
            Range: "bytes=0-1",
          },
        },
        3000,
      );
      if (res.ok) return proxy;
    } catch (e) {
      // ignore failed proxy
    }
  }
  return null;
}
