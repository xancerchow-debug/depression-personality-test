"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";
import { calculateResult } from "@/lib/utils";
import { Dimension } from "@/types";

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<Dimension, number>>({
    sensitivity: 0,
    withdrawal: 0,
    overthinking: 0,
    numbness: 0,
    performance: 0,
    dependency: 0,
    dissociation: 0,
    collapse: 0,
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleAnswer = useCallback(
    (optionId: string) => {
      if (isTransitioning) return;

      const option = currentQuestion.options.find((o) => o.id === optionId);
      if (!option) return;

      setSelectedOption(optionId);

      setTimeout(() => {
        setIsTransitioning(true);

        // Update scores
        const newScores = { ...scores };
        for (const [dim, score] of Object.entries(option.scores)) {
          newScores[dim as Dimension] += score;
        }
        setScores(newScores);

        // Move to next question or finish
        setTimeout(() => {
          if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setSelectedOption(null);
            setIsTransitioning(false);
          } else {
            // Calculate result and navigate
            const result = calculateResult(newScores);
            sessionStorage.setItem("testResult", JSON.stringify(result));
            router.push("/loading");
          }
        }, 400);
      }, 300);
    },
    [currentIndex, currentQuestion, isTransitioning, scores, router]
  );

  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Progress bar */}
        <div className="h-[2px] bg-dark-900">
          <motion.div
            className="h-full bg-gradient-to-r from-cold-dim to-cold-blue"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => {
              if (currentIndex > 0) {
                setCurrentIndex((prev) => prev - 1);
                setSelectedOption(null);
              } else {
                router.push("/");
              }
            }}
            className="text-dark-500 hover:text-dark-300 transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-xs text-dark-600 font-mono tracking-wider">
            {String(currentIndex + 1).padStart(2, "0")} / {questions.length}
          </span>
          <div className="w-5" />
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

      {/* Bottom hint */}
      <div className="fixed bottom-0 left-0 right-0 p-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-[11px] text-dark-700"
        >
          选择最接近你真实想法的选项
        </motion.p>
      </div>
    </main>
  );
}
