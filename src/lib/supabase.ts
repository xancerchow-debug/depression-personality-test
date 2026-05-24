import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// For server-side operations
export async function saveResult(personalityId: string, scores: Record<string, number>) {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("results")
      .insert([{ personality_id: personalityId, scores }])
      .select("id")
      .single();

    if (error) throw error;
    return data?.id;
  } catch (err) {
    console.error("Failed to save result:", err);
    return null;
  }
}

export async function getResult(id: string) {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("results")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Failed to get result:", err);
    return null;
  }
}

export async function getStats() {
  if (!supabase) return null;

  try {
    const { count: totalCount } = await supabase
      .from("results")
      .select("*", { count: "exact", head: true });

    const { data: personalityStats } = await supabase
      .from("results")
      .select("personality_id")
      .order("created_at", { ascending: false })
      .limit(1000);

    const distribution: Record<string, number> = {};
    if (personalityStats) {
      personalityStats.forEach((r) => {
        distribution[r.personality_id] = (distribution[r.personality_id] || 0) + 1;
      });
    }

    return { totalCount: totalCount || 0, distribution };
  } catch (err) {
    console.error("Failed to get stats:", err);
    return null;
  }
}
