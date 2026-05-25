"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getPersonalityById } from "@/data/personalities";
import { TestResult, PersonalityType } from "@/types";
import { DISPLAY_DIMENSIONS } from "@/lib/utils";

function StatBar({ label, value }: { label: string; value: number }) {
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
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-dark-500">{label}</span>
        <span className="text-xs font-mono text-dark-400">{displayValue}</span>
      </div>
      <div className="h-1 bg-dark-900 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            background: "linear-gradient(90deg, #2d4a73, #4a6fa5, #6b8fc4)",
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}

function InfoSection({ title, content }: { title: string; content: string }) {
  return (
    <div className="mb-8">
      <h3 className="text-xs font-mono text-dark-600 tracking-[0.2em] uppercase mb-3">
        {title}
      </h3>
      <p className="text-sm text-dark-300 leading-relaxed">{content}</p>
    </div>
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
    document.body.classList.add("result-page");
    return () => document.body.classList.remove("result-page");
  }, []);

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
      <div className="relative pt-16 pb-12 px-6">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse, ${personality.color}33 0%, transparent 70%)`,
          }}
        />

        <div className="relative max-w-lg mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase text-dark-500 border border-dark-800 rounded-full">
              Your Personality Type
            </span>
          </div>

          {/* Icon */}
          <div className="text-5xl mb-6 inline-block">
            <motion.span
              animate={{ y: [0, -6, 0], rotate: [0, -3, 3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              {personality.icon}
            </motion.span>
          </div>

          {/* Name */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-gradient">{personality.name}</span>
          </h1>

          <p className="text-xs font-mono text-dark-600 tracking-[0.3em] mb-4">
            {personality.code}
          </p>

          <p className="text-base text-dark-400 italic">
            &ldquo;{personality.tagline}&rdquo;
          </p>
        </div>
      </div>

      {/* Match badge */}
      <div className="max-w-lg mx-auto px-6 mb-10">
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-xs text-dark-600 mb-2">你最接近的人格类型</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl font-bold text-gradient-blue">
              {result.matchPercent}
            </span>
            <span className="text-lg text-dark-500">%</span>
          </div>
          <p className="text-xs text-dark-500 mt-2">契合度</p>
        </div>

        {/* Second personality */}
        {secondPersonality && (
          <div className="mt-4 glass rounded-xl p-4 flex items-center gap-4">
            <span className="text-2xl">{secondPersonality.icon}</span>
            <div className="flex-1 text-left">
              <p className="text-xs text-dark-500">你也有 {result.secondMatchPercent}% 的特质属于</p>
              <p className="text-sm text-dark-300 font-medium">{secondPersonality.name}</p>
            </div>
            <span className="text-xs font-mono text-dark-600">{secondPersonality.code}</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="max-w-lg mx-auto px-6 mb-12">
        <h3 className="text-xs font-mono text-dark-600 tracking-[0.2em] uppercase mb-6">
          Your Profile
        </h3>

        <div className="glass rounded-2xl p-6">
          {DISPLAY_DIMENSIONS.map((dim) => (
            <StatBar
              key={dim.key}
              label={dim.label}
              value={result.metrics[dim.key]}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="max-w-lg mx-auto px-6 mb-12">
        <div className="glass rounded-2xl p-6">
          <p className="text-sm text-dark-300 leading-[1.8]">
            {personality.description}
          </p>
        </div>
      </div>

      {/* Detail sections */}
      <div className="max-w-lg mx-auto px-6">
        <InfoSection title="社交表现" content={personality.socialBehavior} />
        <InfoSection title="恋爱表现" content={personality.loveBehavior} />
        <InfoSection title="深层心理需求" content={personality.deepNeed} />

        <div className="glass rounded-2xl p-6 mb-8">
          <h3 className="text-xs font-mono text-dark-600 tracking-[0.2em] uppercase mb-3">
            最容易被谁治愈
          </h3>
          <p className="text-sm text-dark-300 leading-relaxed">{personality.healedBy}</p>
        </div>

        <div className="glass rounded-2xl p-6 mb-8">
          <h3 className="text-xs font-mono text-dark-600 tracking-[0.2em] uppercase mb-3">
            别人对你的误解
          </h3>
          <p className="text-sm text-dark-300 leading-relaxed">{personality.misunderstoodAs}</p>
        </div>
      </div>

      {/* Share section */}
      <div className="max-w-lg mx-auto px-6 mt-16">
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
      </div>

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
