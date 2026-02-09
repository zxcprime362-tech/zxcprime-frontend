import { NextResponse } from "next/server";

async function fetchStream() {
  const body = new URLSearchParams({
    action: "ajax_getlinkstream",
    streamkey: "yfHCiM51M7yVhvg@1080p|oC3Vplkx6zBVSLM",
    nonce: "cc737b7a54",
    imdbid: "tt32642706",
    tmdbid: "",
  });

  const res = await fetch("https://hollymoviehd.cc/wp-admin/admin-ajax.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Accept: "*/*",
      "X-Requested-With": "XMLHttpRequest",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36",
      Origin: "https://hollymoviehd.cc",
      Referer: "https://hollymoviehd.cc/the-rip-2026/",
    },
    body: body.toString(),
    cache: "no-store",
  });

  return res.text();
}

// 👇 frontend will call GET only
export async function GET() {
  const text = await fetchStream();

  return NextResponse.json({
    ok: true,
    response: text,
  });
}
