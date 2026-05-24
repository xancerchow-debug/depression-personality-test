-- Supabase SQL Schema
-- Run this in the Supabase SQL Editor to create the required tables

-- Create results table
CREATE TABLE IF NOT EXISTS results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  personality_id TEXT NOT NULL,
  scores JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  share_count INTEGER DEFAULT 0
);

-- Create index on personality_id for faster queries
CREATE INDEX IF NOT EXISTS idx_results_personality_id ON results(personality_id);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_results_created_at ON results(created_at DESC);

-- Enable Row Level Security
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for saving test results)
CREATE POLICY "Allow anonymous inserts" ON results
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous reads (for viewing results and stats)
CREATE POLICY "Allow anonymous reads" ON results
  FOR SELECT
  TO anon
  USING (true);

-- Create a view for personality distribution stats
CREATE OR REPLACE VIEW personality_stats AS
SELECT
  personality_id,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 1) as percentage
FROM results
GROUP BY personality_id
ORDER BY count DESC;
