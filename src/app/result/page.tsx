"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getPersonalityById } from "@/data/personalities";
import { TestResult, PersonalityType } from "@/types";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.ceil(value / 35));
    const interval = setInterval(() => {
      current += step;
      if (current >= value) { current = value; clearInterval(interval); }
      setDisplay(current);
    }, 25);
    return () => clearInterval(interval);
  }, [value]);
  return <>{display}{suffix}</>;
}

function IndexBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] text-dark-500 w-20 shrink-0">{label}</span>
      <div className="flex-1 h-[3px] bg-dark-900 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          style={{ background: color }}
        />
      </div>
      <span className="text-xs font-mono text-dark-400 w-8 text-right">{value}%</span>
    </div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<TestResult | null>(null);
  const [personality, setPersonality] = useState<PersonalityType | null>(null);
  const [secondPersonality, setSecondPersonality] = useState<PersonalityType | null>(null);
  const [thirdPersonality, setThirdPersonality] = useState<PersonalityType | null>(null);
  const [copied, setCopied] = useState(false);
  const [showContent, setShowContent] = useState(false);

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
      setPersonality(getPersonalityById(parsed.personalityId) || null);
      setSecondPersonality(getPersonalityById(parsed.secondPersonalityId) || null);
      setThirdPersonality(getPersonalityById(parsed.thirdPersonalityId) || null);
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
    <main className="min-h-screen pb-32 result-page-content">
      {showContent && (
        <>
          {/* ═══ HERO ═══ */}
          <motion.section
            className="relative pt-24 pb-12 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-15 pointer-events-none"
              style={{ background: `radial-gradient(ellipse, ${personality.color}44 0%, transparent 70%)` }}
            />
            <div className="relative max-w-lg mx-auto text-center">
              <motion.span
                className="inline-block px-4 py-1 text-[9px] tracking-[0.5em] uppercase text-dark-700 border border-dark-800/40 rounded-full mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                YOUR TYPE
              </motion.span>

              <motion.div
                className="text-6xl mb-4"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                {personality.icon}
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl font-black mb-2 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <span className="text-gradient">{personality.name}</span>
              </motion.h1>

              <motion.p
                className="text-xs font-mono text-dark-700 tracking-[0.5em] mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {personality.code}
              </motion.p>

              {/* THE punch line */}
              <motion.p
                className="text-lg sm:text-xl text-dark-200 font-medium leading-relaxed max-w-md mx-auto"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                &ldquo;{personality.viralHeadline}&rdquo;
              </motion.p>
            </div>
          </motion.section>

          {/* ═══ MATCH PERCENT ═══ */}
          <motion.section
            className="max-w-lg mx-auto px-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <div className="glass rounded-2xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle, ${personality.color}, transparent 70%)` }} />
              <p className="text-[10px] text-dark-700 tracking-wider uppercase mb-2">人格契合度</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-6xl font-black text-gradient-blue">{result.matchPercent}</span>
                <span className="text-2xl text-dark-700">%</span>
              </div>
              <p className="text-[11px] text-dark-700 mt-2">
                全国仅 <span className="text-dark-400 font-mono">{personality.rarity}%</span> 的同类
              </p>
            </div>
          </motion.section>

          {/* ═══ THREE INDEXES ═══ */}
          <motion.section
            className="max-w-lg mx-auto px-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="glass rounded-2xl p-5 space-y-4">
              <IndexBar label="夜晚情绪" value={result.nightEmotion} color="#ef4444" />
              <IndexBar label="关系依赖" value={result.relationDependency} color="#f59e0b" />
              <IndexBar label="精神内耗" value={result.mentalFriction} color="#8b5cf6" />
            </div>
          </motion.section>

          {/* ═══ VIRAL STATS ═══ */}
          <motion.section
            className="max-w-lg mx-auto px-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-[9px] text-dark-700 tracking-wider uppercase mb-1">危险匹配</p>
                <p className="text-sm text-red-400/80 font-medium">{personality.dangerMatch}</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-[9px] text-dark-700 tracking-wider uppercase mb-1">崩溃时间</p>
                <p className="text-xs text-amber-400/80 font-mono">{personality.collapseTime}</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-[9px] text-dark-700 tracking-wider uppercase mb-1">攻击性</p>
                <p className="text-sm text-dark-300 font-mono"><AnimatedNumber value={personality.attackIndex} />/10</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-[9px] text-dark-700 tracking-wider uppercase mb-1">消失概率</p>
                <p className="text-sm text-dark-300 font-mono"><AnimatedNumber value={personality.chatDisappear} suffix="%" /></p>
              </div>
            </div>
          </motion.section>

          {/* ═══ BEHAVIOR LIST ═══ */}
          <motion.section
            className="max-w-lg mx-auto px-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <div className="glass rounded-2xl p-6">
              <p className="text-[10px] text-dark-700 tracking-wider uppercase mb-4">你的行为特征</p>
              <div className="space-y-3">
                {personality.behavior.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-dark-700 text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-sm text-dark-300 leading-relaxed">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ═══ HIDDEN PERSONALITY ═══ */}
          <motion.section
            className="max-w-lg mx-auto px-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
          >
            <div className="glass rounded-2xl p-6 border-dark-800/30">
              <p className="text-[10px] text-dark-700 tracking-wider uppercase mb-2">隐藏人格</p>
              <p className="text-lg font-bold text-dark-200 mb-3">{personality.hiddenPersonality.name}</p>
              <p className="text-sm text-dark-400 leading-relaxed">{personality.hiddenPersonality.description}</p>
            </div>
          </motion.section>

          {/* ═══ OTHER MATCHES ═══ */}
          <motion.section
            className="max-w-lg mx-auto px-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9 }}
          >
            <div className="space-y-2">
              {secondPersonality && (
                <div className="glass rounded-xl p-4 flex items-center gap-4">
                  <span className="text-xl">{secondPersonality.icon}</span>
                  <div className="flex-1">
                    <p className="text-[11px] text-dark-600">{result.secondMatchPercent}% 匹配</p>
                    <p className="text-sm text-dark-300">{secondPersonality.name}</p>
                  </div>
                </div>
              )}
              {thirdPersonality && (
                <div className="glass rounded-xl p-4 flex items-center gap-4 opacity-60">
                  <span className="text-xl">{thirdPersonality.icon}</span>
                  <div className="flex-1">
                    <p className="text-[11px] text-dark-700">{result.thirdMatchPercent}% 匹配</p>
                    <p className="text-sm text-dark-400">{thirdPersonality.name}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.section>

          {/* ═══ SHARE ═══ */}
          <motion.section
            className="max-w-lg mx-auto px-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1 }}
          >
            <div className="glass rounded-2xl p-6 mb-6 text-center">
              <p className="text-sm text-dark-300 leading-relaxed italic mb-3">
                &ldquo;{personality.shareText}&rdquo;
              </p>
              <div className="pt-3 border-t border-dark-800/30">
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

            <p className="text-center text-[11px] text-dark-800 mt-4">
              你敢把结果发给朋友吗？
            </p>
          </motion.section>

          {/* ═══ DISCLAIMER ═══ */}
          <motion.div
            className="max-w-lg mx-auto px-6 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <p className="text-[10px] text-dark-800 text-center leading-relaxed">
              本测试仅供娱乐和自我探索，不构成任何医学诊断。
            </p>
          </motion.div>
        </>
      )}
    </main>
  );
}
