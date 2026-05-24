import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { personalities } from "@/data/personalities";

export async function GET() {
  try {
    if (!supabase) {
      // Return mock data if Supabase is not configured
      return NextResponse.json({
        totalCount: 12847,
        distribution: personalities.map((p) => ({
          id: p.id,
          name: p.name,
          count: Math.floor(Math.random() * 2000) + 500,
          percentage: 0,
        })),
      });
    }

    const { count: totalCount } = await supabase
      .from("results")
      .select("*", { count: "exact", head: true });

    const { data: recentResults } = await supabase
      .from("results")
      .select("personality_id")
      .order("created_at", { ascending: false })
      .limit(1000);

    const counts: Record<string, number> = {};
    if (recentResults) {
      recentResults.forEach((r) => {
        counts[r.personality_id] = (counts[r.personality_id] || 0) + 1;
      });
    }

    const total = recentResults?.length || 1;
    const distribution = personalities.map((p) => ({
      id: p.id,
      name: p.name,
      count: counts[p.id] || 0,
      percentage: Math.round(((counts[p.id] || 0) / total) * 100),
    }));

    return NextResponse.json({
      totalCount: totalCount || 0,
      distribution,
    });
  } catch (err) {
    console.error("Stats API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
