"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button";

type Question = {
  id: string;
  prompt: string;
  options: { label: string; recommend: string }[];
};

const QUESTIONS: Question[] = [
  {
    id: "goal",
    prompt: "What's your primary goal right now?",
    options: [
      { label: "Lose weight", recommend: "/weight-loss" },
      { label: "More energy & vitality", recommend: "/hormone-therapy" },
      { label: "Improve intimate health", recommend: "/sexual-wellness" },
      { label: "Refresh my appearance", recommend: "/aesthetics" },
    ],
  },
  {
    id: "focus",
    prompt: "Which area matters most to you?",
    options: [
      { label: "Skin", recommend: "/skin" },
      { label: "Hair", recommend: "/hair" },
      { label: "Body", recommend: "/emsculpt-neo" },
      { label: "Overall wellness", recommend: "/iv-hydration" },
    ],
  },
  {
    id: "care",
    prompt: "How would you prefer to receive care?",
    options: [
      { label: "In-clinic", recommend: "/contact-us" },
      { label: "Virtually", recommend: "/telehealth" },
      { label: "Not sure yet", recommend: "/contact-us" },
    ],
  },
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const isDone = step >= QUESTIONS.length;
  const recommendation = answers[0] ?? "/contact-us";

  function choose(href: string) {
    setAnswers((prev) => [...prev, href]);
    setStep((prev) => prev + 1);
  }

  function reset() {
    setStep(0);
    setAnswers([]);
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-revival-gold">
          Find Your Path
        </span>
        <h1 className="mt-3 text-3xl text-revival-dark md:text-4xl">
          Wellness Quiz
        </h1>
      </div>

      <div className="mt-10">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-revival-gold/15">
          <motion.div
            className="h-full bg-revival-gold"
            animate={{
              width: `${(Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100}%`,
            }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {!isDone ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              className="mt-10"
            >
              <h2 className="text-2xl text-revival-dark">
                {QUESTIONS[step].prompt}
              </h2>
              <div className="mt-6 grid gap-3">
                {QUESTIONS[step].options.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => choose(option.recommend)}
                    className="flex items-center justify-between rounded-2xl border border-revival-gold/25 bg-revival-warm-white px-6 py-4 text-left text-revival-dark transition-colors hover:border-revival-gold hover:bg-revival-gold/10"
                  >
                    {option.label}
                    <ArrowRight className="h-4 w-4 text-revival-gold" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 rounded-3xl border border-revival-gold/20 bg-revival-warm-white p-10 text-center"
            >
              <h2 className="text-2xl text-revival-dark">
                We have a recommendation for you
              </h2>
              <p className="mt-3 text-revival-charcoal/80">
                Based on your answers, here&apos;s a great place to start.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href={recommendation} size="lg">
                  View My Recommendation
                </Button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 text-sm font-medium text-revival-charcoal hover:text-revival-gold"
                >
                  <RotateCcw className="h-4 w-4" /> Retake quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
