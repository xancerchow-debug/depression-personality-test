"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getPersonalityById } from "@/data/personalities";
import { TestResult, PersonalityType } from "@/types";
import { DISPLAY_DIMENSIONS } from "@/lib/utils";

function StatBar({ label, value, insight }: { label: string; value: number; insight?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(value / 30);
    const interval = setInterval(() => {
      current += step;
      if (current >= value) {
        current = value;
        clearInterval(interval);
      }
      setDisplayValue(current);
    }, 30);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-dark-500 tracking-wide">{label}</span>
        <span className="text-sm font-mono text-dark-300">{displayValue}%</span>
      </div>
      <div className="h-[3px] bg-dark-900 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{
            background: `linear-gradient(90deg, ${value > 70 ? '#ef4444' : value > 45 ? '#f59e0b' : '#4a6fa5'}, ${value > 70 ? '#dc2626' : value > 45 ? '#d97706' : '#6b8fc4'})`,
          }}
        />
      </div>
      {insight && (
        <p className="mt-2.5 text-[11px] text-dark-600 italic leading-relaxed">
          {insight}
        </p>
      )}
    </div>
  );
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.ceil(value / 40));
    const interval = setInterval(() => {
      current += step;
      if (current >= value) { current = value; clearInterval(interval); }
      setDisplay(current);
    }, 30);
    return () => clearInterval(interval);
  }, [value]);
  return <>{display}{suffix}</>;
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<TestResult | null>(null);
  const [personality, setPersonality] = useState<PersonalityType | null>(null);
  const [secondPersonality, setSecondPersonality] = useState<PersonalityType | null>(null);
  const [copied, setCopied] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("result-page");
    return () => document.body.classList.remove("result-page");
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("testResult");
    if (!stored) { router.push("/"); return; }
    try {
      const parsed: TestResult = JSON.parse(stored);
      setResult(parsed);
      const p = getPersonalityById(parsed.personalityId);
      if (p) setPersonality(p);
      const sp = getPersonalityById(parsed.secondPersonalityId);
      if (sp) setSecondPersonality(sp);
      setTimeout(() => setShowContent(true), 200);
    } catch { router.push("/"); }
  }, [router]);

  const handleCopy = async () => {
    if (!personality) return;
    const text = `${personality.shareText}\n\n来测测你的互联网精神状态 → ${window.location.origin}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!result || !personality) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-dark-600 text-sm animate-pulse">解码中...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-32 result-page-content" ref={resultRef}>
      <AnimatePresence>
        {showContent && (
          <>
            {/* ═══ HERO: Movie poster style ═══ */}
            <motion.section
              className="relative pt-20 pb-16 px-6 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Background glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-15 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse, ${personality.color}55 0%, ${personality.color}22 40%, transparent 70%)`,
                }}
              />

              <div className="relative max-w-lg mx-auto text-center">
                {/* Type badge */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <span className="inline-block px-5 py-1.5 text-[10px] tracking-[0.4em] uppercase text-dark-600 border border-dark-800/50 rounded-full">
                    YOUR INTERNET PERSONALITY
                  </span>
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="text-6xl mb-6"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                >
                  {personality.icon}
                </motion.div>

                {/* Name - HUGE */}
                <motion.h1
                  className="text-4xl sm:text-5xl font-black mb-3 tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  <span className="text-gradient">{personality.name}</span>
                </motion.h1>

                {/* Code */}
                <motion.p
                  className="text-sm font-mono text-dark-600 tracking-[0.5em] mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {personality.code}
                </motion.p>

                {/* Viral headline - THE punch line */}
                <motion.div
                  className="max-w-md mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                >
                  <p className="text-lg sm:text-xl text-dark-200 font-medium leading-relaxed">
                    &ldquo;{personality.viralHeadline}&rdquo;
                  </p>
                </motion.div>
              </div>
            </motion.section>

            {/* ═══ MATCH PERCENT ═══ */}
            <motion.section
              className="max-w-lg mx-auto px-6 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <div className="glass rounded-2xl p-8 text-center relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-5"
                  style={{ background: `radial-gradient(circle at center, ${personality.color}, transparent 70%)` }}
                />
                <p className="text-xs text-dark-600 mb-3 tracking-wider uppercase">人格契合度</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-6xl font-black text-gradient-blue">
                    {result.matchPercent}
                  </span>
                  <span className="text-2xl text-dark-600">%</span>
                </div>
                <p className="text-[11px] text-dark-700 mt-3">
                  你是全国 <span className="text-dark-400 font-mono">{personality.rarity}%</span> 的同类
                </p>
              </div>

              {/* Second personality */}
              {secondPersonality && (
                <motion.div
                  className="mt-3 glass rounded-xl p-4 flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                >
                  <span className="text-2xl">{secondPersonality.icon}</span>
                  <div className="flex-1 text-left">
                    <p className="text-[11px] text-dark-600">也有 {result.secondMatchPercent}% 的你属于</p>
                    <p className="text-sm text-dark-300 font-medium">{secondPersonality.name}</p>
                  </div>
                  <span className="text-xs font-mono text-dark-700">{secondPersonality.code}</span>
                </motion.div>
              )}
            </motion.section>

            {/* ═══ VIRAL STATS ═══ */}
            <motion.section
              className="max-w-lg mx-auto px-6 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-[10px] text-dark-700 tracking-wider uppercase mb-1">危险匹配</p>
                  <p className="text-sm text-red-400/80 font-medium">{personality.dangerMatch}</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-[10px] text-dark-700 tracking-wider uppercase mb-1">崩溃时间</p>
                  <p className="text-sm text-amber-400/80 font-mono">{personality.collapseTime}</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-[10px] text-dark-700 tracking-wider uppercase mb-1">攻击性指数</p>
                  <p className="text-sm text-dark-300 font-mono">
                    <AnimatedNumber value={personality.attackIndex} />/10
                  </p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-[10px] text-dark-700 tracking-wider uppercase mb-1">聊天消失概率</p>
                  <p className="text-sm text-dark-300 font-mono">
                    <AnimatedNumber value={personality.chatDisappear} suffix="%" />
                  </p>
                </div>
              </div>
            </motion.section>

            {/* ═══ DIMENSION STATS ═══ */}
            <motion.section
              className="max-w-lg mx-auto px-6 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              <h3 className="text-[10px] font-mono text-dark-700 tracking-[0.3em] uppercase mb-6">
                你的精神状态图谱
              </h3>
              <div className="glass rounded-2xl p-6">
                {DISPLAY_DIMENSIONS.map((dim) => (
                  <StatBar
                    key={dim.key}
                    label={dim.label}
                    value={result.metrics[dim.key]}
                    insight={personality.dimensionInsights?.[dim.key]}
                  />
                ))}
              </div>
            </motion.section>

            {/* ═══ DESCRIPTION ═══ */}
            <motion.section
              className="max-w-lg mx-auto px-6 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <div className="glass rounded-2xl p-6">
                <p className="text-[11px] text-dark-700 tracking-wider uppercase mb-4">审判书</p>
                <p className="text-sm text-dark-300 leading-[2]">{personality.description}</p>
              </div>
            </motion.section>

            {/* ═══ DETAIL SECTIONS ═══ */}
            <motion.section
              className="max-w-lg mx-auto px-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.6 }}
            >
              <div className="mb-8">
                <h3 className="text-[10px] font-mono text-dark-700 tracking-[0.2em] uppercase mb-3">社交模式</h3>
                <p className="text-sm text-dark-400 leading-relaxed">{personality.socialBehavior}</p>
              </div>
              <div className="mb-8">
                <h3 className="text-[10px] font-mono text-dark-700 tracking-[0.2em] uppercase mb-3">恋爱表现</h3>
                <p className="text-sm text-dark-400 leading-relaxed">{personality.loveBehavior}</p>
              </div>
              <div className="mb-8">
                <h3 className="text-[10px] font-mono text-dark-700 tracking-[0.2em] uppercase mb-3">深层需求</h3>
                <p className="text-sm text-dark-400 leading-relaxed">{personality.deepNeed}</p>
              </div>

              <div className="glass rounded-2xl p-6 mb-8">
                <h3 className="text-[10px] font-mono text-dark-700 tracking-[0.2em] uppercase mb-3">被谁治愈</h3>
                <p className="text-sm text-dark-300 leading-relaxed">{personality.healedBy}</p>
              </div>

              <div className="glass rounded-2xl p-6 mb-8">
                <h3 className="text-[10px] font-mono text-dark-700 tracking-[0.2em] uppercase mb-3">最大误解</h3>
                <p className="text-sm text-dark-300 leading-relaxed">{personality.misunderstoodAs}</p>
              </div>
            </motion.section>

            {/* ═══ SHARE SECTION ═══ */}
            <motion.section
              className="max-w-lg mx-auto px-6 mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
            >
              <div className="text-center mb-6">
                <p className="text-sm text-dark-500 mb-1">你的社交货币</p>
                <p className="text-[11px] text-dark-700">截图发到朋友圈，看看谁和你是同类</p>
              </div>

              <div className="glass rounded-2xl p-6 mb-6 text-center">
                <p className="text-xs text-dark-600 mb-2">「{personality.name}」</p>
                <p className="text-sm text-dark-300 leading-relaxed italic">
                  &ldquo;{personality.shareText}&rdquo;
                </p>
                <div className="mt-4 pt-4 border-t border-dark-800/50">
                  <p className="text-[10px] text-dark-700">
                    全国仅 <span className="text-dark-500 font-mono">{personality.rarity}%</span> 的人属于该人格
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="flex-1 py-3.5 rounded-xl glass text-sm text-dark-300 hover:text-white transition-colors active:scale-[0.98]"
                >
                  {copied ? "已复制 ✓" : "复制分享文案"}
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cold-dim to-cold-blue text-sm text-white/90 hover:opacity-90 transition-opacity active:scale-[0.98]"
                >
                  再测一次
                </button>
              </div>

              {/* Dare to share */}
              <p className="text-center text-[11px] text-dark-800 mt-4">
                你敢把结果发给朋友吗？
              </p>
            </motion.section>

            {/* ═══ DISCLAIMER ═══ */}
            <motion.div
              className="max-w-lg mx-auto px-6 mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            >
              <p className="text-[10px] text-dark-800 text-center leading-relaxed">
                本测试仅供娱乐和自我探索，不构成任何医学诊断。
                如果你正在经历情绪困扰，请寻求专业帮助。
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
