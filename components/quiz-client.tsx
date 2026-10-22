"use client"

import { useCallback, useRef, useState } from "react"
import {
  quizzes,
  getEasyResultText,
  getChallengeResultText,
  type Quiz,
} from "@/lib/quiz-data"
import { QuizStart } from "@/components/quiz-start"
import { QuizQuestion } from "@/components/quiz-question"
import { QuizResult } from "@/components/quiz-result"

type View = "start" | "question" | "result"

export function QuizClient() {
  const [view, setView] = useState<View>("start")
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answerIsLocked, setAnswerIsLocked] = useState(false)
  const [score, setScore] = useState(0)

  const quizTopRef = useRef<HTMLDivElement>(null)

  const scrollToTop = useCallback(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      quizTopRef.current?.scrollIntoView()
    } else {
      quizTopRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const handleStart = useCallback(
    (quizId: "easy" | "challenge") => {
      const quiz = quizzes.find((q) => q.id === quizId)!
      setSelectedQuiz(quiz)
      setCurrentQuestionIndex(0)
      setSelectedAnswer(null)
      setAnswerIsLocked(false)
      setScore(0)
      setView("question")
      scrollToTop()
    },
    [scrollToTop],
  )

  const handleAnswer = useCallback(
    (index: number) => {
      if (answerIsLocked || !selectedQuiz) return
      setSelectedAnswer(index)
      setAnswerIsLocked(true)
      if (index === selectedQuiz.questions[currentQuestionIndex].correctIndex) {
        setScore((s) => s + 1)
      }
    },
    [answerIsLocked, selectedQuiz, currentQuestionIndex],
  )

  const handleNext = useCallback(() => {
    if (!selectedQuiz) return
    const isLast = currentQuestionIndex === selectedQuiz.questions.length - 1
    if (isLast) {
      setView("result")
      scrollToTop()
    } else {
      setCurrentQuestionIndex((i) => i + 1)
      setSelectedAnswer(null)
      setAnswerIsLocked(false)
      scrollToTop()
    }
  }, [selectedQuiz, currentQuestionIndex, scrollToTop])

  const handleBack = useCallback(() => {
    setView("start")
    setSelectedQuiz(null)
    scrollToTop()
  }, [scrollToTop])

  const handleRestart = useCallback(() => {
    if (!selectedQuiz) return
    handleStart(selectedQuiz.id)
  }, [selectedQuiz, handleStart])

  const otherQuiz =
    selectedQuiz ? quizzes.find((q) => q.id !== selectedQuiz.id)! : quizzes[1]

  const resultText = selectedQuiz
    ? selectedQuiz.id === "easy"
      ? getEasyResultText(score)
      : getChallengeResultText(score)
    : { title: "", text: "" }

  return (
    <div className="bg-[#F4F1E8]">
      <div ref={quizTopRef} aria-hidden="true" />

      {view === "start" && (
        <QuizStart onStart={handleStart} quizzes={quizzes} />
      )}

      {view === "question" && selectedQuiz && (
        <QuizQuestion
          quiz={selectedQuiz}
          currentIndex={currentQuestionIndex}
          selectedAnswer={selectedAnswer}
          answerIsLocked={answerIsLocked}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}

      {view === "result" && selectedQuiz && (
        <QuizResult
          quiz={selectedQuiz}
          otherQuiz={otherQuiz}
          score={score}
          resultText={resultText}
          onRestart={handleRestart}
          onSwitchQuiz={handleStart}
          onBack={handleBack}
        />
      )}
    </div>
  )
}
