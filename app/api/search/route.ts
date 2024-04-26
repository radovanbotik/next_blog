import { searchArticles } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");
  if (query) {
    const articles = await searchArticles({ query: query });
    return NextResponse.json(articles);
  }
  return NextResponse.json([]);
}
