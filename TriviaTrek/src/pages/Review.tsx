import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Result, Quiz } from '../types'
import { apiClient } from '../lib/api'

export const Review: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>()
  const navigate = useNavigate()
  const [result, setResult] = useState<Result | null>(null)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        if (!resultId || resultId === 'error') {
          setError('Could not load result. Please try again.')
          return
        }

        const resultData = await apiClient.get<Result>(`/results/${resultId}`)
        setResult(resultData)

        const quizData = await apiClient.get<Quiz>(`/quizzes/${resultData.quizId}`)
        setQuiz(quizData)

        setError(null)
      } catch (err) {
        setError('Failed to load review. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [resultId])

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

  if (error || !result || !quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
        <div className="tt-error max-w-md">
          <p className="font-bold mb-2">Error</p>
          <p>{error || 'Result not found'}</p>
          <button
            onClick={() => navigate('/quizzes')}
            className="mt-4 tt-btn-primary"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    )
  }

  const percentage = Math.round((result.score / (result.totalQuestions * quiz.scorePerQuestion)) * 100)
  const isPassed = percentage >= 60

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Score Card */}
        <div className="tt-card mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Quiz Complete! 🎉</h1>
          <p className="text-gray-600 mb-6 text-lg">{quiz.title}</p>

          <div className={`text-6xl font-bold mb-4 ${isPassed ? 'text-green-600' : 'text-orange-600'}`}>
            {percentage}%
          </div>

          <div className="flex justify-around mb-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Score</p>
              <p className="text-2xl font-bold text-blue-600">{result.score}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Points</p>
              <p className="text-2xl font-bold text-purple-600">
                {result.totalQuestions * quiz.scorePerQuestion}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Questions</p>
              <p className="text-2xl font-bold text-pink-600">{result.totalQuestions}</p>
            </div>
          </div>

          <div className={`p-4 rounded-lg mb-6 ${isPassed ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
            <p className="font-semibold">
              {isPassed ? '✓ Great job! You passed the quiz!' : '⚠ Try again to improve your score!'}
            </p>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="tt-card mb-8">
          <h2 className="text-2xl font-bold mb-6">Question Review</h2>

          <div className="space-y-4">
            {quiz.questions.map((question, index) => {
              const userAnswerIndex = result.answers[question.id]
              const isCorrect = userAnswerIndex === question.correctOptionIndex
              const userAnswer = question.options[userAnswerIndex]
              const correctAnswer = question.options[question.correctOptionIndex]

              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                  }`}
                >
                  <p className="font-semibold mb-2">
                    {index + 1}. {question.text}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className={`p-2 rounded ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      <p className="font-semibold">Your answer:</p>
                      <p>{userAnswer?.text || 'Not answered'}</p>
                    </div>

                    {!isCorrect && (
                      <div className="p-2 rounded bg-green-100 text-green-800">
                        <p className="font-semibold">Correct answer:</p>
                        <p>{correctAnswer.text}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/quizzes')}
            className="tt-btn-primary flex-1"
          >
            Try Another Quiz
          </button>
          <button
            onClick={() => navigate('/')}
            className="tt-btn-ghost flex-1"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  )
}
