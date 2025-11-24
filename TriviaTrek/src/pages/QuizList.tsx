import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Quiz } from '../types'
import { apiClient } from '../lib/api'

export const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true)
        const data = await apiClient.get<Quiz[]>('/quizzes')
        setQuizzes(data)
        setError(null)
      } catch (err) {
        setError('Failed to load quizzes. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="tt-loading">
          <div className="tt-spinner">
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
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
        <div className="tt-error max-w-md">
          <p className="font-bold mb-2">Error</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 tt-btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Available Quizzes</h1>
          <button
            onClick={() => navigate('/')}
            className="tt-btn-ghost"
          >
            ← Back Home
          </button>
        </div>

        {quizzes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white text-xl">No quizzes available yet.</p>
          </div>
        ) : (
          <div className="tt-quiz-grid">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="tt-card hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-bold mb-3 text-gray-800">{quiz.title}</h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {quiz.description.length > 120
                    ? `${quiz.description.substring(0, 120)}...`
                    : quiz.description}
                </p>

                <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                  <span>📝 {quiz.questions.length} questions</span>
                  <span>⏱️ {Math.floor(quiz.timeLimit / 60)} min</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/play/${quiz.id}`)}
                    className="tt-btn-primary flex-1"
                  >
                    Play Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
