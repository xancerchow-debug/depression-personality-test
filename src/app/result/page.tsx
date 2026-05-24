"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getPersonalityById } from "@/data/personalities";
import { TestResult, PersonalityType } from "@/types";
import { DISPLAY_DIMENSIONS } from "@/lib/utils";

function StatBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
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
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      className="mb-5"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-dark-500">{label}</span>
        <span className="text-xs font-mono text-dark-400">{displayValue}</span>
      </div>
      <div className="h-1 bg-dark-900 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #2d4a73, #4a6fa5, #6b8fc4)" }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay: delay / 1000, duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

function InfoSection({ title, content, delay }: { title: string; content: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="mb-8"
    >
      <h3 className="text-xs font-mono text-dark-600 tracking-[0.2em] uppercase mb-3">
        {title}
      </h3>
      <p className="text-sm text-dark-300 leading-relaxed">{content}</p>
    </motion.div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<TestResult | null>(null);
  const [personality, setPersonality] = useState<PersonalityType | null>(null);
  const [secondPersonality, setSecondPersonality] = useState<PersonalityType | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("testResult");
    if (!stored) {
      router.push("/");
      return;
    }
    try {
      const parsed: TestResult = JSON.parse(stored);
      setResult(parsed);
      const p = getPersonalityById(parsed.personalityId);
      if (p) setPersonality(p);
      const sp = getPersonalityById(parsed.secondPersonalityId);
      if (sp) setSecondPersonality(sp);
    } catch {
      router.push("/");
    }
  }, [router]);

  const handleCopy = async () => {
    if (!personality) return;
    const text = `${personality.shareText}\n\n来测测你的抑郁型人格 → ${window.location.origin}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!result || !personality) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-dark-600 text-sm"
        >
          加载中...
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-32" ref={resultRef}>
      {/* Hero section */}
      <div className="relative pt-16 pb-12 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse, ${personality.color}33 0%, transparent 70%)`,
          }}
        />

        <div className="relative max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase text-dark-500 border border-dark-800 rounded-full">
              Your Personality Type
            </span>
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-5xl mb-6 inline-block"
          >
            <motion.span
              animate={{ y: [0, -6, 0], rotate: [0, -3, 3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              {personality.icon}
            </motion.span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-2"
          >
            <span className="text-gradient">{personality.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs font-mono text-dark-600 tracking-[0.3em] mb-4"
          >
            {personality.code}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-base text-dark-400 italic"
          >
            &ldquo;{personality.tagline}&rdquo;
          </motion.p>
        </div>
      </div>

      {/* Match badge — replaces fake percentile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
        className="max-w-lg mx-auto px-6 mb-10"
      >
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-xs text-dark-600 mb-2">你最接近的人格类型</p>
          <div className="flex items-baseline justify-center gap-1">
            <motion.span
              className="text-5xl font-bold text-gradient-blue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {result.matchPercent}
            </motion.span>
            <span className="text-lg text-dark-500">%</span>
          </div>
          <p className="text-xs text-dark-500 mt-2">契合度</p>
        </div>

        {/* Second personality */}
        {secondPersonality && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-4 glass rounded-xl p-4 flex items-center gap-4"
          >
            <span className="text-2xl">{secondPersonality.icon}</span>
            <div className="flex-1 text-left">
              <p className="text-xs text-dark-500">你也有 {result.secondMatchPercent}% 的特质属于</p>
              <p className="text-sm text-dark-300 font-medium">{secondPersonality.name}</p>
            </div>
            <span className="text-xs font-mono text-dark-600">{secondPersonality.code}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Stats — 6 dimensions from raw scores */}
      <div className="max-w-lg mx-auto px-6 mb-12">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs font-mono text-dark-600 tracking-[0.2em] uppercase mb-6"
        >
          Your Profile
        </motion.h3>

        <div className="glass rounded-2xl p-6">
          {DISPLAY_DIMENSIONS.map((dim, i) => (
            <StatBar
              key={dim.key}
              label={dim.label}
              value={result.metrics[dim.key]}
              delay={1100 + i * 150}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="max-w-lg mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="glass rounded-2xl p-6"
        >
          <p className="text-sm text-dark-300 leading-[1.8]">
            {personality.description}
          </p>
        </motion.div>
      </div>

      {/* Detail sections */}
      <div className="max-w-lg mx-auto px-6">
        <InfoSection title="社交表现" content={personality.socialBehavior} delay={1.4} />
        <InfoSection title="恋爱表现" content={personality.loveBehavior} delay={1.5} />
        <InfoSection title="深层心理需求" content={personality.deepNeed} delay={1.6} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xs font-mono text-dark-600 tracking-[0.2em] uppercase mb-3">
            最容易被谁治愈
          </h3>
          <p className="text-sm text-dark-300 leading-relaxed">{personality.healedBy}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xs font-mono text-dark-600 tracking-[0.2em] uppercase mb-3">
            别人对你的误解
          </h3>
          <p className="text-sm text-dark-300 leading-relaxed">{personality.misunderstoodAs}</p>
        </motion.div>
      </div>

      {/* Share section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="max-w-lg mx-auto px-6 mt-16"
      >
        <div className="text-center mb-8">
          <p className="text-sm text-dark-500 mb-1">你的分享文案</p>
          <p className="text-xs text-dark-600">截图保存，发到你的社交平台</p>
        </div>

        <div className="glass rounded-2xl p-6 mb-8">
          <p className="text-sm text-dark-300 leading-relaxed text-center italic">
            &ldquo;{personality.shareText}&rdquo;
          </p>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopy}
            className="flex-1 py-3.5 rounded-xl glass text-sm text-dark-300 hover:text-white transition-colors"
          >
            {copied ? "已复制 ✓" : "复制分享文案"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/")}
            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cold-dim to-cold-blue text-sm text-white/90"
          >
            再测一次
          </motion.button>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <div className="max-w-lg mx-auto px-6 mt-16">
        <p className="text-[10px] text-dark-700 text-center leading-relaxed">
          本测试仅供娱乐和自我探索，不构成任何医学诊断或心理评估。
          如果你正在经历情绪困扰，请寻求专业心理咨询师的帮助。
        </p>
      </div>
    </main>
  );
}
