"use client"

import Image from "next/image"
import type { Quiz } from "@/lib/quiz-data"

interface QuizStartProps {
  onStart: (quizId: "easy" | "challenge") => void
  quizzes: Quiz[]
}

// Per-card static config — only visual, no logic
const CARD_CFG = {
  easy: {
    src: "/images/quiz/easy.webp",
    alt: "2D-illustration av vänlig älg och räv på en sommaräng",
    accent: "#2B6E4E",       // deep forest green button
    accentHover: "#1f5239",
    cardBorder: "#C8E6D8",   // soft mint border
    cardBg: "#F4FAF7",       // near-white with cool mint tint
  },
  challenge: {
    src: "/images/quiz/challenge.webp",
    alt: "2D-illustration av lodjur framför tealgrön barrskog",
    accent: "#193C2C",       // darkest forest green button
    accentHover: "#102618",
    cardBorder: "#B8D4CA",   // cool sage border
    cardBg: "#F2F7F5",       // near-white with sage tint
  },
} as const

const LABELS = {
  eyebrow: "TESTA DINA KUNSKAPER",
  heading: "Hur bra koll har du på naturen?",
  subheading: "Välj nivå och testa vad du kan om djuren, växterna, svamparna och livet längs Kustvägen.",
  startEasy: "Starta Quiz (Enkelt)",
  startChallenge: "Starta Quiz (Svårt)",
  questions: (n: number) => `${n} frågor`,
  easyTitle: "Lilla naturquizet",
  challengeTitle: "Naturutmaningen",
  easyDesc: "Ett enkelt och roligt quiz för barn som vill upptäcka djuren och naturen.",
  challengeDesc: "Lite klurigare frågor om djurspår, arter, livsmiljöer och naturens samband.",
  easyTime: "Cirka 2 minuter",
  challengeTime: "Cirka 5 minuter",
  footer: "En fråga i taget · Direkt återkoppling · Ingen inloggning behövs",
}

export function QuizStart({ onStart, quizzes }: QuizStartProps) {
  const easy = quizzes.find((q) => q.id === "easy")!
  const challenge = quizzes.find((q) => q.id === "challenge")!
  const t = LABELS

  const cards = [
    {
      quiz: easy,
      cfg: CARD_CFG.easy,
      buttonLabel: t.startEasy,
      title: t.easyTitle,
      desc: t.easyDesc,
      time: t.easyTime,
    },
    {
      quiz: challenge,
      cfg: CARD_CFG.challenge,
      buttonLabel: t.startChallenge,
      title: t.challengeTitle,
      desc: t.challengeDesc,
      time: t.challengeTime,
    },
  ]

  return (
    <section className="mx-auto w-full max-w-5xl px-6 pt-12 pb-0 sm:pt-20">
      {/* Page introduction */}
      <div className="mb-10 max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5A6B54]">
          {t.eyebrow}
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-balance text-[#193C2C] sm:text-5xl">
          {t.heading}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[#2f4437]/70">
          {t.subheading}
        </p>
      </div>

      {/* Two quiz cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {cards.map(({ quiz, cfg, buttonLabel, title, desc, time }) => (
          <article
            key={quiz.id}
            onClick={() => onStart(quiz.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onStart(quiz.id) } }}
            aria-label={`${title} — ${t.questions(quiz.questionCount)}`}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border shadow-sm outline-none transition-all duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#193C2C] focus-visible:ring-offset-2"
            style={{ borderColor: cfg.cardBorder, backgroundColor: cfg.cardBg }}
          >
            {/* Square illustration */}
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
              <Image
                src={cfg.src}
                alt={cfg.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-200 ease-out motion-safe:group-hover:scale-[1.02]"
              />
              {/* Question count badge — top-right, compact pill */}
              <span
                className="absolute right-3 top-3 rounded-md px-2.5 py-1 text-xs font-bold text-white"
                style={{ backgroundColor: "#2F4437" }}
              >
                {t.questions(quiz.questionCount)}
              </span>
            </div>

            {/* Card content */}
            <div className="flex flex-1 flex-col gap-2 p-6">
              <h2 className="font-serif text-2xl font-semibold text-[#193C2C] sm:text-3xl">
                {title}
              </h2>

              <p className="min-h-[2.75rem] text-sm leading-relaxed text-[#2f4437]/70">
                {desc}
              </p>

              <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[#5A6B54]">
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM4.75 8a.75.75 0 0 1 .75-.75h2V5.75a.75.75 0 0 1 1.5 0V8A.75.75 0 0 1 8.75 8.75h-2.25A.75.75 0 0 1 4.75 8Z" clipRule="evenodd" />
                </svg>
                {time}
              </p>

              {/* CTA button */}
              <button
                onClick={(e) => { e.stopPropagation(); onStart(quiz.id) }}
                className="mt-4 w-full rounded-xl px-5 py-4 text-sm font-semibold tracking-wide text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ backgroundColor: "#2F4437" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1f3026" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2F4437" }}
              >
                {buttonLabel}
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Discrete footer note */}
      <p className="mt-8 text-center text-xs text-[#2f4437]/40">
        {t.footer}
      </p>
    </section>
  )
}
