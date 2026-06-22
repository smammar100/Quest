import { NextResponse } from "next/server";
import { getMenuLists } from "@/sanity/queries";

// Always run fresh so Studio additions/deletions show on the next load
// (no route-level caching). getMenuLists also fetches Sanity with no-store.
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Feeds the Browse mega-menu (client SiteHeader) its two tab lists from Sanity:
// poster = "Hire humans" citizen categories, hero = "Earn as a human" category
// docs (both isMenuCategory == true). Returns null when Sanity has no data so
// the header keeps its static fallback list.
export async function GET() {
  const lists = await getMenuLists();
  return NextResponse.json(lists, {
    headers: { "Cache-Control": "no-store" },
  });
}
