"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";
import { calculateResult } from "@/lib/utils";
import { Dimension } from "@/types";

const emptyScores = (): Record<Dimension, number> => ({
  sensitivity: 0,
  withdrawal: 0,
  overthinking: 0,
  numbness: 0,
  performance: 0,
  dependency: 0,
  dissociation: 0,
  collapse: 0,
});

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<Dimension, number>>(emptyScores());
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [answers, setAnswers] = useState<(string | null)[]>(
    new Array(questions.length).fill(null)
  );

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = useCallback(
    (optionId: string) => {
      if (isTransitioning) return;

      setSelectedOption(optionId);

      // Save answer
      const newAnswers = [...answers];
      newAnswers[currentIndex] = optionId;
      setAnswers(newAnswers);

      // Recalculate all scores
      const newScores = emptyScores();
      for (let i = 0; i < questions.length; i++) {
        const optId = newAnswers[i];
        if (!optId) continue;
        const opt = questions[i].options.find((o) => o.id === optId);
        if (!opt) continue;
        for (const [dim, score] of Object.entries(opt.scores)) {
          newScores[dim as Dimension] += score;
        }
      }
      setScores(newScores);

      setTimeout(() => {
        setIsTransitioning(true);

        setTimeout(() => {
          if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setSelectedOption(null);
            setIsTransitioning(false);
          } else {
            const result = calculateResult(newScores);
            sessionStorage.setItem("testResult", JSON.stringify(result));
            router.push("/loading");
          }
        }, 400);
      }, 300);
    },
    [currentIndex, answers, isTransitioning, router]
  );

  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-[2px] bg-dark-900">
          <motion.div
            className="h-full bg-gradient-to-r from-cold-dim to-cold-blue"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => {
              if (currentIndex > 0) {
                setCurrentIndex((prev) => prev - 1);
                setSelectedOption(answers[currentIndex - 1]);
                setIsTransitioning(false);
              } else {
                router.push("/");
              }
            }}
            className="text-dark-500 hover:text-dark-300 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-xs text-dark-600 font-mono tracking-wider">
            {String(currentIndex + 1).padStart(2, "0")} / {questions.length}
          </span>
          <button
            onClick={() => {
              if (answers[currentIndex] && currentIndex < questions.length - 1) {
                setCurrentIndex((prev) => prev + 1);
                setSelectedOption(answers[currentIndex + 1] || null);
                setIsTransitioning(false);
              }
            }}
            disabled={!answers[currentIndex] || currentIndex >= questions.length - 1}
            className={`transition-colors ${
              answers[currentIndex] && currentIndex < questions.length - 1
                ? "text-dark-500 hover:text-dark-300"
                : "text-dark-800 cursor-not-allowed"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg"
          >
            {/* Question number */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <span className="text-[10px] font-mono text-dark-600 tracking-[0.3em] uppercase">
                Question {String(currentIndex + 1).padStart(2, "0")}
              </span>
            </motion.div>

            {/* Question text */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl font-medium leading-relaxed text-dark-200 mb-12 whitespace-pre-line"
            >
              {currentQuestion.text}
            </motion.h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  onClick={() => handleAnswer(option.id)}
                  disabled={isTransitioning}
                  className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 ${
                    selectedOption === option.id
                      ? "glass-strong border-cold-blue/30 text-white"
                      : "glass hover:glass-strong text-dark-300 hover:text-dark-200"
                  } ${isTransitioning && selectedOption !== option.id ? "opacity-30" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono transition-all ${
                        selectedOption === option.id
                          ? "border-cold-blue bg-cold-blue/20 text-cold-light"
                          : "border-dark-700 text-dark-600"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-sm leading-relaxed pt-0.5">
                      {option.text}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom dots */}
      <div className="fixed bottom-0 left-0 right-0 p-6">
        <div className="flex items-center justify-center gap-1.5 mb-3">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-4 bg-cold-blue"
                  : answers[i]
                  ? "w-1.5 bg-dark-600"
                  : "w-1.5 bg-dark-800"
              }`}
            />
          ))}
        </div>
        <p className="text-center text-[11px] text-dark-700">
          {selectedOption
            ? currentIndex < questions.length - 1
              ? "点击右箭头进入下一题"
              : "已完成所有题目"
            : "选择最接近你真实想法的选项"}
        </p>
      </div>
    </main>
  );
}
