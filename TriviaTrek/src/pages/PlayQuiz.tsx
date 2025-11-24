import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Quiz, Result } from '../types'
import { apiClient } from '../lib/api'
import { QuestionCard } from '../components/QuestionCard'
import { Timer } from '../components/Timer'

export const PlayQuiz: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [quizFinished, setQuizFinished] = useState(false)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true)
        if (!id) {
          setError('Quiz ID not found')
          return
        }
        const data = await apiClient.get<Quiz>(`/quizzes/${id}`)
        setQuiz(data)
        setError(null)
      } catch (err) {
        setError('Failed to load quiz. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuiz()
  }, [id])

  const handleAnswer = (optionIndex: number) => {
    if (!quiz) return

    const currentQuestion = quiz.questions[currentQuestionIndex]
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }))

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      finishQuiz()
    }
  }

  const handleTimeExpire = () => {
    finishQuiz()
  }

  const finishQuiz = async () => {
    if (!quiz) return

    setQuizFinished(true)

    // Calculate score
    let score = 0
    quiz.questions.forEach((question) => {
      const userAnswerIndex = answers[question.id]
      if (userAnswerIndex === question.correctOptionIndex) {
        score += quiz.scorePerQuestion
      }
    })

    // Save result
    try {
      const result: Omit<Result, 'id'> = {
        quizId: quiz.id,
        score,
        totalQuestions: quiz.questions.length,
        answers,
        timestamp: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      }

      const savedResult = await apiClient.post<Result>('/results', result)
      navigate(`/review/${savedResult.id}`)
    } catch (err) {
      console.error('Failed to save result:', err)
      navigate(`/review/error`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="tt-loading">
          <svg
            className="animate-spin h-12 w-12 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      </div>
    )
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
        <div className="tt-error max-w-md">
          <p className="font-bold mb-2">Error</p>
          <p>{error || 'Quiz not found'}</p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => navigate('/quizzes')}
              className="tt-btn-primary flex-1"
            >
              Back to Quizzes
            </button>
            <button
              onClick={() => window.location.reload()}
              className="tt-btn-ghost flex-1"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (quizFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="tt-card max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-gray-600 mb-4">Saving your results...</p>
          <div className="animate-spin inline-block">
            <svg
              className="h-8 w-8 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">{quiz.title}</h1>
            <Timer initialSeconds={quiz.timeLimit} onExpire={handleTimeExpire} />
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-lg overflow-hidden h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white text-sm mt-2">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </p>
        </div>

        {/* Question */}
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          selectedIndex={answers[currentQuestion.id]}
          disabled={false}
        />

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="tt-btn-ghost"
          >
            ← Previous
          </button>
          <button
            onClick={() =>
              currentQuestionIndex < quiz.questions.length - 1
                ? setCurrentQuestionIndex((prev) => prev + 1)
                : finishQuiz()
            }
            className="tt-btn-primary flex-1"
          >
            {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}
