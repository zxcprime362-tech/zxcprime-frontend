// app/api/subtitles/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Get the query parameter (full subtitle URL)
    const url = req.nextUrl.searchParams.get("url");
    if (!url) {
      return NextResponse.json(
        { error: "Missing subtitle URL" },
        { status: 400 },
      );
    }

    // Fetch the remote VTT
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch subtitles" },
        { status: 500 },
      );
    }

    let vttText = await response.text();

    // Replace the text
    vttText = vttText.replace(
      /Visit hoofoot\.ru to watch all sports livestream and highlights for free/,
      "Dive into endless hours of free movie streaming at ZXCPRIME.ICU",
    );

    // Return as plain VTT
    return new NextResponse(vttText, {
      headers: { "Content-Type": "text/vtt" },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
