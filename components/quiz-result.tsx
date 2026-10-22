"use client"

import { RotateCcw, ArrowRight } from "lucide-react"
import type { Quiz, ResultText } from "@/lib/quiz-data"

interface QuizResultProps {
  quiz: Quiz
  otherQuiz: Quiz
  score: number
  resultText: ResultText
  onRestart: () => void
  onSwitchQuiz: (id: "easy" | "challenge") => void
  onBack: () => void
}

export function QuizResult({
  quiz,
  otherQuiz,
  score,
  resultText,
  onRestart,
  onSwitchQuiz,
  onBack,
}: QuizResultProps) {
  const total = quiz.questions.length
  const pct = Math.round((score / total) * 100)
  const circumference = 2 * Math.PI * 52

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-20">
      <div className="overflow-hidden rounded-2xl border border-[#193C2C]/10 bg-white shadow-sm">
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-[#2B6E4E]" aria-hidden="true" />

        <div className="p-8 sm:p-12">
          {/* Eyebrow */}
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5A6B54]">
            Quizet är klart
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#193C2C] sm:text-4xl">
            {quiz.title}
          </h2>

          {/* Score block */}
          <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-12">
            {/* SVG arc */}
            <div className="relative shrink-0" aria-hidden="true">
              <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke="#193C2C"
                  strokeOpacity="0.08"
                  strokeWidth="10"
                  strokeDasharray={`${circumference}`}
                  strokeLinecap="round"
                />
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke="#2B6E4E"
                  strokeWidth="10"
                  strokeDasharray={`${circumference}`}
                  strokeDashoffset={`${circumference * (1 - pct / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-serif text-3xl font-bold text-[#193C2C]">{score}</span>
                <span className="text-xs font-medium text-[#2f4437]/50">av {total}</span>
              </div>
            </div>

            {/* Text result */}
            <div className="text-center sm:text-left">
              <p className="font-serif text-3xl font-semibold text-[#193C2C]">
                {score} av {total} rätt
              </p>
              <p className="mt-1.5 text-sm font-semibold text-[#2B6E4E]">{resultText.title}</p>
              <p className="mt-2 max-w-xs text-pretty text-sm leading-relaxed text-[#2f4437]/65">
                {resultText.text}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-[#193C2C]/8">
            <div
              className="h-full rounded-full bg-[#2B6E4E] transition-all duration-700 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              onClick={onRestart}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#193C2C] px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#102618] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#193C2C] focus-visible:ring-offset-2"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Gör quizet igen
            </button>

            <button
              onClick={() => onSwitchQuiz(otherQuiz.id)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#193C2C]/20 bg-transparent px-6 py-3.5 text-sm font-semibold tracking-wide text-[#193C2C] transition-colors hover:bg-[#193C2C]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#193C2C] focus-visible:ring-offset-2"
            >
              {quiz.id === "easy" ? "Testa Naturutmaningen" : "Testa Lilla naturquizet"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6">
            <button
              onClick={onBack}
              className="rounded text-sm text-[#5A6B54] underline-offset-4 transition-colors hover:text-[#193C2C] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#193C2C] focus-visible:ring-offset-2"
            >
              Tillbaka till quiz
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
