"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";
import { calculateResult } from "@/lib/utils";
import { Dimension, Question } from "@/types";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const emptyScores = (): Record<Dimension, number> => ({
  rumination: 0, surveillance: 0, provocation: 0, masking: 0,
  testing: 0, avoidance: 0, isolation: 0, eruption: 0,
});

export default function TestPage() {
  const router = useRouter();
  const [shuffledQuestions] = useState(() =>
    shuffle(questions).map((q) => ({ ...q, options: shuffle(q.options) }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<Dimension, number>>(emptyScores());
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuestion = shuffledQuestions[currentIndex];
  const progress = ((currentIndex + 1) / shuffledQuestions.length) * 100;

  const goToNext = useCallback((newScores: Record<Dimension, number>, newAnswers: Record<number, string | null>) => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsTransitioning(false);
    } else {
      const result = calculateResult(newScores, newAnswers, shuffledQuestions);
      sessionStorage.setItem("testResult", JSON.stringify(result));
      router.push("/loading");
    }
  }, [currentIndex, router, shuffledQuestions]);

  const dismissFeedback = useCallback((newScores: Record<Dimension, number>, newAnswers: Record<number, string | null>) => {
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
    setShowFeedback(false);
    setTimeout(() => goToNext(newScores, newAnswers), 400);
  }, [goToNext]);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  const handleAnswer = useCallback(
    (optionId: string) => {
      if (isTransitioning) return;
      setSelectedOption(optionId);

      const questionId = currentQuestion.id;
      const newAnswers: Record<number, string | null> = { ...answers, [questionId]: optionId };
      setAnswers(newAnswers);

      // Recalculate scores
      const newScores = emptyScores();
      for (const q of shuffledQuestions) {
        const optId = newAnswers[q.id];
        if (!optId) continue;
        const opt = q.options.find((o) => o.id === optId);
        if (!opt) continue;
        const effectiveScore = q.reverse ? (5 - opt.score) : opt.score;
        for (const [dim, weight] of Object.entries(opt.weights)) {
          if (weight > 0) newScores[dim as Dimension] += effectiveScore * weight;
        }
      }
      setScores(newScores);

      // Check if selected option has feedback
      const selectedOpt = currentQuestion.options.find(o => o.id === optionId);

      setTimeout(() => {
        setIsTransitioning(true);

        if (selectedOpt?.feedback) {
          setFeedbackMessage(selectedOpt.feedback);
          setShowFeedback(true);
          feedbackTimerRef.current = setTimeout(() => {
            setShowFeedback(false);
            setTimeout(() => goToNext(newScores, newAnswers), 400);
          }, 10000);
        } else {
          setTimeout(() => goToNext(newScores, newAnswers), 400);
        }
      }, 300);
    },
    [currentIndex, answers, isTransitioning, currentQuestion, shuffledQuestions, goToNext]
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
                const prevQ = shuffledQuestions[currentIndex - 1];
                setCurrentIndex((prev) => prev - 1);
                setSelectedOption(answers[prevQ.id] || null);
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
            {String(currentIndex + 1).padStart(2, "0")} / {shuffledQuestions.length}
          </span>
          <button
            onClick={() => {
              const curAnswer = answers[currentQuestion.id];
              if (curAnswer && currentIndex < shuffledQuestions.length - 1) {
                const nextQ = shuffledQuestions[currentIndex + 1];
                setCurrentIndex((prev) => prev + 1);
                setSelectedOption(answers[nextQ.id] || null);
                setIsTransitioning(false);
              }
            }}
            disabled={!answers[currentQuestion.id] || currentIndex >= shuffledQuestions.length - 1}
            className={`transition-colors ${
              answers[currentQuestion.id] && currentIndex < shuffledQuestions.length - 1
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <span className="text-[10px] font-mono text-dark-600 tracking-[0.3em] uppercase">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl font-medium leading-relaxed text-dark-200 mb-12 whitespace-pre-line"
            >
              {currentQuestion.text}
            </motion.h2>

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
                    <span className="text-sm leading-relaxed pt-0.5">{option.text}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feedback overlay */}
      <AnimatePresence>
        {showFeedback && feedbackMessage && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-8 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => {
              const newAnswers = { ...answers };
              dismissFeedback(scores, newAnswers);
            }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.p
              className="relative text-lg sm:text-xl text-dark-200 font-medium text-center leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {feedbackMessage}
            </motion.p>
            <motion.p
              className="relative text-[11px] text-dark-600 mt-8 tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              点击屏幕继续
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom dots */}
      <div className="fixed bottom-0 left-0 right-0 p-6">
        <div className="flex items-center justify-center gap-1.5 mb-3">
          {shuffledQuestions.map((q, i) => (
            <div
              key={q.id}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-4 bg-cold-blue"
                  : answers[q.id]
                  ? "w-1.5 bg-dark-600"
                  : "w-1.5 bg-dark-800"
              }`}
            />
          ))}
        </div>
        <p className="text-center text-[11px] text-dark-700">
          {selectedOption
            ? currentIndex < shuffledQuestions.length - 1
              ? ""
              : ""
            : "选最扎心的那个"}
        </p>
      </div>
    </main>
  );
}
