import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id)
      return NextResponse.json({ error: "No ID found" }, { status: 400 });

    const url = `https://wolf.qqdl.site/track/?id=${id}&quality=HI_RES_LOSSLESS`;

    //  https://wolf.qqdl.site/track/?id=5120357&quality=HI_RES_LOSSLESS
    const res = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        Referer: "https://wolf.qqdl.site/",
        "Accept-Language": "en-US,en;q=0.9",
        Origin: "https://wolf.qqdl.site/",
      },
    });

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
