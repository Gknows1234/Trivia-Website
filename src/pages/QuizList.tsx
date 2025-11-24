import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Quiz } from '../types'
import { apiClient } from '../lib/api'

export function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            TriviaTrek
          </Link>
          <div className="space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-blue-600">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Available Quizzes</h1>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading && quizzes.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No quizzes available yet.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map(quiz => (
            <div
              key={quiz.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <h2 className="text-xl font-bold mb-2 text-gray-800">{quiz.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{quiz.description}</p>

              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <p>📝 {quiz.questions.length} questions</p>
                <p>⏱️ {Math.floor(quiz.timeLimit / 60)} minutes</p>
                <p>⭐ {quiz.scorePerQuestion} points per question</p>
              </div>

              <Link
                to={`/play/${quiz.id}`}
                className="block w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                Play Quiz
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
