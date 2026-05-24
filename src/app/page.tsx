"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const headline = "测测你的抑郁型人格";
const subtitle = "你不是不快乐，你只是形成了自己的精神天气。";
const BASE_COUNT = 12847;

export default function HomePage() {
  const [showContent, setShowContent] = useState(false);
  const [typedHeadline, setTypedHeadline] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [testCount, setTestCount] = useState(BASE_COUNT);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Fetch live count from API
    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => {
        const serverCount = data.totalCount || BASE_COUNT;
        const localExtra = parseInt(localStorage.getItem("testCount") || "0", 10);
        setTestCount(serverCount + localExtra);
      })
      .catch(() => {
        const localExtra = parseInt(localStorage.getItem("testCount") || "0", 10);
        setTestCount(BASE_COUNT + localExtra);
      });
  }, []);

  useEffect(() => {
    if (!showContent) return;

    let i = 0;
    const typeHeadline = setInterval(() => {
      if (i < headline.length) {
        setTypedHeadline(headline.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeHeadline);
        // Start subtitle
        let j = 0;
        const typeSubtitle = setInterval(() => {
          if (j < subtitle.length) {
            setTypedSubtitle(subtitle.slice(0, j + 1));
            j++;
          } else {
            clearInterval(typeSubtitle);
            setTimeout(() => setShowButton(true), 300);
          }
        }, 60);
      }
    }, 100);

    return () => clearInterval(typeHeadline);
  }, [showContent]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0">
        {/* Radial gradient center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(74, 111, 165, 0.15) 0%, transparent 70%)",
          }}
        />
        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(74, 111, 165, 0.08) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 10, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(107, 143, 196, 0.06) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -25, 15, 0],
            y: [0, 15, -25, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center max-w-2xl mx-auto"
          >
            {/* Small tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-block px-4 py-1.5 text-xs tracking-[0.3em] uppercase text-dark-400 border border-dark-800 rounded-full">
                Emotional Personality Test
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6"
            >
              <span className="text-gradient">{typedHeadline}</span>
              {typedHeadline.length < headline.length && (
                <span className="typewriter-cursor" />
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg sm:text-xl text-dark-400 font-light leading-relaxed mb-4 min-h-[2em]"
            >
              {typedSubtitle}
              {typedHeadline.length >= headline.length &&
                typedSubtitle.length < subtitle.length && (
                  <span className="typewriter-cursor" />
                )}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-sm text-dark-500 mb-12 max-w-md mx-auto"
            >
              24道题，帮你画出自己的精神状态画像。
              <br />
              不是诊断，只是照镜子。
            </motion.p>

            {/* CTA Button */}
            <AnimatePresence>
              {showButton && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Link href="/test">
                    <motion.button
                      className="group relative px-12 py-4 text-base font-medium tracking-wider overflow-hidden rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Button background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cold-dim to-cold-blue opacity-90 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Button glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      </div>

                      <span className="relative z-10 text-white/90 group-hover:text-white transition-colors">
                        开始测试
                      </span>
                    </motion.button>
                  </Link>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-6 text-xs text-dark-600"
                  >
                    已有 {testCount.toLocaleString()} 人完成了测试
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 text-center"
      >
        <p className="text-[11px] text-dark-700 tracking-widest">
          情绪人格测试 · 非医学诊断 · 仅供自我探索
        </p>
      </motion.div>
    </main>
  );
}
