"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Check, X, ChevronRight, ArrowRight, ArrowLeft } from "lucide-react"
import type { Question, TextQuestion, ImageChoiceQuestion } from "@/lib/quiz-data"

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

// ---------------------------------------------------------------------------
// Consistent A/B/C accent colors — same on every question
// ---------------------------------------------------------------------------
const CARD_ACCENTS = [
  // A — soft berry/coral
  {
    bg: "bg-[#F2A999]",
    border: "border-[#F2A999]",
    selectedBorder: "border-[#C94C38]",
    ring: "ring-[#C94C38]",
    label: "bg-[#C94C38]",
    text: "text-[#5A1A12]",
  },
  // B — clear sky blue
  {
    bg: "bg-[#8BBFE8]",
    border: "border-[#8BBFE8]",
    selectedBorder: "border-[#2565A3]",
    ring: "ring-[#2565A3]",
    label: "bg-[#2565A3]",
    text: "text-[#0E2E50]",
  },
  // C — fresh moss green
  {
    bg: "bg-[#85C49A]",
    border: "border-[#85C49A]",
    selectedBorder: "border-[#1D6B40]",
    ring: "ring-[#1D6B40]",
    label: "bg-[#1D6B40]",
    text: "text-[#0A3020]",
  },
] as const

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface QuizQuestionProps {
  quiz: { id: string; title: string; questions: Question[] }
  currentIndex: number
  selectedAnswer: number | null
  answerIsLocked: boolean
  onAnswer: (index: number) => void
  onNext: () => void
  onBack: () => void
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function QuizQuestion({
  quiz,
  currentIndex,
  selectedAnswer,
  answerIsLocked,
  onAnswer,
  onNext,
  onBack,
}: QuizQuestionProps) {
  const question = quiz.questions[currentIndex]
  const total = quiz.questions.length
  const isLast = currentIndex === total - 1
  const feedbackRef = useRef<HTMLDivElement>(null)
  const isCorrect = answerIsLocked && selectedAnswer === question.correctIndex
  const progressPct = ((currentIndex + 1) / total) * 100

  useEffect(() => {
    if (!answerIsLocked || !feedbackRef.current) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) return
    feedbackRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [answerIsLocked])

  return (
    <section className="mx-auto w-full max-w-[1050px] px-4 py-6 sm:px-6 sm:py-10">

      {/* ── Top bar ── */}
      <div className="mb-5">
        <div className="mb-3 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded text-sm text-[#5A6B54] transition-colors hover:text-[#193C2C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#193C2C] focus-visible:ring-offset-2"
            aria-label="Tillbaka till quiz"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Tillbaka</span>
          </button>

          <span className="font-serif text-base font-semibold text-[#193C2C]">{quiz.title}</span>

          <span className="text-sm tabular-nums text-[#2f4437]/50">
            {currentIndex + 1} / {total}
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="h-2.5 w-full overflow-hidden rounded-full bg-[#2f4437]/10"
          role="progressbar"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Fråga ${currentIndex + 1} av ${total}`}
        >
          <div
            className="h-full rounded-full bg-[#2B6E4E] transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* ── Question card ── */}
      <div className="overflow-hidden rounded-[18px] border border-[#193C2C]/10 bg-white shadow-sm">
        <div className="px-6 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-8">

          {/* Category eyebrow */}
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#5A6B54]">
            {question.category}
          </p>

          {/* Question heading */}
          <h2 className="font-serif text-2xl font-semibold text-balance text-[#193C2C] sm:text-3xl">
            {question.question}
          </h2>

          {/* Answer grid */}
          <div className="mt-7">
            {question.type === "text" ? (
              <VisualCards
                question={question as TextQuestion}
                selectedAnswer={selectedAnswer}
                answerIsLocked={answerIsLocked}
                onAnswer={onAnswer}
                priority={currentIndex === 0}
              />
            ) : (
              <ImageOptions
                question={question as ImageChoiceQuestion}
                selectedAnswer={selectedAnswer}
                answerIsLocked={answerIsLocked}
                onAnswer={onAnswer}
              />
            )}
          </div>

          {/* ── Feedback ── */}
          {answerIsLocked && (
            <div
              ref={feedbackRef}
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className={cn(
                "mt-6 rounded-xl border p-4",
                isCorrect ? "border-[#2B6E4E]/25 bg-[#E8F5EE]" : "border-[#C94C38]/20 bg-[#FDF0EE]",
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white",
                    isCorrect ? "bg-[#2B6E4E]" : "bg-[#C94C38]",
                  )}
                  aria-hidden="true"
                >
                  {isCorrect ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                </span>
                <div>
                  <p className={cn("text-sm font-semibold", isCorrect ? "text-[#1A4A30]" : "text-[#8A2E23]")}>
                    {isCorrect ? "Rätt svar!" : "Inte riktigt"}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#2f4437]/80">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Next button ── */}
          {answerIsLocked && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={onNext}
                className="inline-flex items-center gap-2 rounded-xl bg-[#193C2C] px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#102618] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#193C2C] focus-visible:ring-offset-2"
              >
                {isLast ? "Se mitt resultat" : "Nästa fråga"}
                {isLast ? (
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Visual answer cards (text questions — now with images)
// ---------------------------------------------------------------------------

interface VisualCardsProps {
  question: TextQuestion
  selectedAnswer: number | null
  answerIsLocked: boolean
  onAnswer: (i: number) => void
  priority?: boolean
}

function VisualCards({ question, selectedAnswer, answerIsLocked, onAnswer, priority = false }: VisualCardsProps) {
  const count = question.options.length // always 3

  return (
    /*
     * Desktop: 3 equal columns
     * Tablet (sm): 2 cols, third card centered below
     * Mobile: 1 col full-width
     */
    <ul
      className={cn(
        "grid gap-4",
        count === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        count === 2 && "grid-cols-1 sm:grid-cols-2",
      )}
      role="list"
    >
      {question.options.map((option, i) => {
        const accent = CARD_ACCENTS[i % CARD_ACCENTS.length]
        const isSelected = selectedAnswer === i
        const isCorrectIdx = i === question.correctIndex
        const isWrong = answerIsLocked && isSelected && !isCorrectIdx
        const showCorrect = answerIsLocked && isCorrectIdx
        const dimmed = answerIsLocked && !isSelected && !isCorrectIdx
        const letter = String.fromCharCode(65 + i) // A, B, C

        // On sm with 3 options, last card should span both cols to center
        const isLastOfThree = count === 3 && i === 2

        return (
          <li key={i} className={cn(isLastOfThree && "sm:col-span-2 lg:col-span-1 sm:mx-auto sm:w-1/2 lg:w-full lg:mx-0")}>
            <button
              onClick={() => !answerIsLocked && onAnswer(i)}
              disabled={answerIsLocked}
              aria-pressed={isSelected}
              className={cn(
                "group relative flex w-full flex-col overflow-hidden rounded-2xl border-2 transition-all",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2",
                // base accent
                accent.border,
                // hover
                !answerIsLocked && "cursor-pointer hover:-translate-y-1 hover:shadow-lg active:translate-y-0",
                // locked states
                !answerIsLocked && !isSelected && "bg-white",
                !answerIsLocked && isSelected && `${accent.bg} border-[3px]`,
                showCorrect && "border-[#2B6E4E] bg-[#E8F5EE] ring-4 ring-[#2B6E4E]/30 ring-offset-2 border-[3px]",
                isWrong && "border-[#C94C38] bg-[#FDF0EE] ring-4 ring-[#C94C38]/20 ring-offset-2 border-[3px]",
                dimmed && "opacity-45 cursor-default",
                "motion-safe:transition-all motion-safe:duration-200",
              )}
              style={{ minHeight: 230 }}
            >
              {/* ── Image area ── */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={option.image}
                  alt={option.imageAlt}
                  fill
                  priority={priority}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={cn(
                    "object-cover transition-transform duration-200",
                    !answerIsLocked && "group-hover:scale-[1.03]",
                  )}
                />
                {/* Correct / wrong badge — top right on image */}
                {answerIsLocked && (showCorrect || isWrong) && (
                  <div
                    className={cn(
                      "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-md",
                      showCorrect ? "bg-[#2B6E4E]" : "bg-[#C94C38]",
                    )}
                    aria-hidden="true"
                  >
                    {showCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  </div>
                )}
              </div>

              {/* ── Label area ── */}
              <div className={cn("flex items-center gap-3 px-4 py-3", accent.bg)}>
                {/* Letter chip */}
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                    accent.label,
                  )}
                  aria-hidden="true"
                >
                  {letter}
                </span>
                <span className={cn("text-sm font-bold leading-tight", accent.text)}>
                  {option.label}
                </span>
                {/* "Rätt svar" hint on non-selected correct */}
                {answerIsLocked && isCorrectIdx && !isSelected && (
                  <span className="ml-auto shrink-0 text-xs font-semibold text-[#2B6E4E]">
                    Rätt svar
                  </span>
                )}
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

// ---------------------------------------------------------------------------
// Image-choice options (track questions) — same visual card style
// ---------------------------------------------------------------------------

interface ImageOptionsProps {
  question: ImageChoiceQuestion
  selectedAnswer: number | null
  answerIsLocked: boolean
  onAnswer: (i: number) => void
}

function ImageOptions({ question, selectedAnswer, answerIsLocked, onAnswer }: ImageOptionsProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3" role="list">
      {question.options.map((option, i) => {
        const accent = CARD_ACCENTS[i % CARD_ACCENTS.length]
        const isSelected = selectedAnswer === i
        const isCorrectIdx = i === question.correctIndex
        const isWrong = answerIsLocked && isSelected && !isCorrectIdx
        const showCorrect = answerIsLocked && isCorrectIdx
        const dimmed = answerIsLocked && !isSelected && !isCorrectIdx
        const letter = String.fromCharCode(65 + i)

        return (
          <li key={i}>
            <button
              onClick={() => !answerIsLocked && onAnswer(i)}
              disabled={answerIsLocked}
              aria-pressed={isSelected}
              className={cn(
                "group relative flex w-full flex-col overflow-hidden rounded-2xl border-2 transition-all",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2",
                accent.border,
                !answerIsLocked && "cursor-pointer hover:-translate-y-1 hover:shadow-lg active:translate-y-0",
                !answerIsLocked && !isSelected && "bg-white",
                !answerIsLocked && isSelected && `${accent.bg} border-[3px]`,
                showCorrect && "border-[#2B6E4E] bg-[#E8F5EE] ring-4 ring-[#2B6E4E]/30 ring-offset-2 border-[3px]",
                isWrong && "border-[#C94C38] bg-[#FDF0EE] ring-4 ring-[#C94C38]/20 ring-offset-2 border-[3px]",
                dimmed && "opacity-45 cursor-default",
                "motion-safe:transition-all motion-safe:duration-200",
              )}
              style={{ minHeight: 230 }}
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                {option.image ? (
                  <Image
                    src={option.image}
                    alt={option.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className={cn(
                      "object-cover transition-transform duration-200",
                      !answerIsLocked && "group-hover:scale-[1.03]",
                    )}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#E8F0EB]">
                    <p className="px-4 text-center text-xs text-[#2f4437]/40">Bild saknas</p>
                  </div>
                )}
                {answerIsLocked && (showCorrect || isWrong) && (
                  <div
                    className={cn(
                      "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-md",
                      showCorrect ? "bg-[#2B6E4E]" : "bg-[#C94C38]",
                    )}
                    aria-hidden="true"
                  >
                    {showCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  </div>
                )}
              </div>

              <div className={cn("flex items-center gap-3 px-4 py-3", accent.bg)}>
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                    accent.label,
                  )}
                  aria-hidden="true"
                >
                  {letter}
                </span>
                <span className={cn("text-sm font-bold leading-tight", accent.text)}>
                  {answerIsLocked ? option.revealLabel : option.label}
                </span>
                {answerIsLocked && isCorrectIdx && !isSelected && (
                  <span className="ml-auto shrink-0 text-xs font-semibold text-[#2B6E4E]">
                    Rätt svar
                  </span>
                )}
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
