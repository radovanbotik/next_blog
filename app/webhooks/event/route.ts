import { CACHE_TAG_ARTICLES } from "@/app/lib/data";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  //if there were changes to 'article' model CREATE/POST/DELETE/UPDATE send out tag
  // payload.mode === 'article', because there are other models like 'media', we want to revalidate only when article gets changed
  if (payload.model === "article") {
    revalidateTag(CACHE_TAG_ARTICLES);
  }
  //204, success no content
  return new Response(null, { status: 204 });
}
