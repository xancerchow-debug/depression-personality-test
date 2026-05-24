import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { personality_id, scores } = body;

    if (!personality_id || !scores) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!supabase) {
      // If Supabase is not configured, return a mock ID
      return NextResponse.json({
        id: `local-${Date.now()}`,
        personality_id,
        scores,
      });
    }

    const { data, error } = await supabase
      .from("results")
      .insert([{ personality_id, scores }])
      .select("id")
      .single();

    if (error) throw error;

    return NextResponse.json({
      id: data.id,
      personality_id,
      scores,
    });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing id parameter" },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json({ error: "Not configured" }, { status: 503 });
    }

    const { data, error } = await supabase
      .from("results")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
