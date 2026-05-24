"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const loadingTexts = [
  "正在分析你的深夜行为模式...",
  "正在解码你的社交面具...",
  "正在计算你的精神内耗值...",
  "正在扫描你的情绪防御机制...",
  "正在生成你的精神天气预报...",
  "正在匹配你的抑郁型人格...",
];

export default function LoadingPage() {
  const router = useRouter();
  const [currentText, setCurrentText] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const result = sessionStorage.getItem("testResult");
    if (!result) {
      router.push("/");
      return;
    }

    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(() => {
            router.push("/result");
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Pulsing orb */}
      <motion.div
        className="relative w-32 h-32 mb-12"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cold-dim/30 to-cold-blue/20 blur-xl" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cold-dim/40 to-cold-blue/30 blur-lg" />
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cold-dim/50 to-cold-blue/40 blur-md" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-3 h-3 rounded-full bg-cold-light/60"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Loading text */}
      <motion.div
        key={currentText}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-sm text-dark-400 mb-8 text-center"
      >
        {loadingTexts[currentText]}
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 h-[2px] bg-dark-900 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cold-dim to-cold-blue"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Progress number */}
      <motion.p
        className="mt-4 text-xs font-mono text-dark-600"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {progress}%
      </motion.p>
    </main>
  );
}
