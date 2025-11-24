import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Quiz, Result } from '../types'
import { apiClient } from '../lib/api'

export function Review() {
  const { resultId } = useParams<{ resultId: string }>()
  const [result, setResult] = useState<Result | null>(null)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        if (!resultId) throw new Error('Result ID not found')

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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !result || !quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error || 'Review not found'}</p>
          <Link to="/quizzes" className="text-blue-600 hover:underline">
            Back to Quizzes
          </Link>
        </div>
      </div>
    )
  }

  const percentage = Math.round((result.score / (result.totalQuestions * quiz.scorePerQuestion)) * 100)
  const passed = percentage >= 60

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            TriviaTrek
          </Link>
          <div className="space-x-4">
            <Link to="/quizzes" className="text-gray-700 hover:text-blue-600">
              Quizzes
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-blue-600">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
          <p className="text-gray-600 mb-8">Quiz Review</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-600">{result.score}</div>
              <div className="text-gray-600 mt-2">Points Earned</div>
            </div>

            <div className={`${passed ? 'bg-green-50' : 'bg-red-50'} rounded-lg p-6 text-center`}>
              <div className={`text-4xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {percentage}%
              </div>
              <div className="text-gray-600 mt-2">Score</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-purple-600">{result.totalQuestions}</div>
              <div className="text-gray-600 mt-2">Questions</div>
            </div>
          </div>

          <div
            className={`p-6 rounded-lg mb-8 ${
              passed
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <p
              className={`text-lg font-semibold ${
                passed ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {passed
                ? '🎉 Congratulations! You passed the quiz!'
                : '📚 Keep practicing! You can do better next time.'}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Question Review</h2>

            {quiz.questions.map((question, index) => {
              const userAnswerIndex = result.answers[question.id]
              const isCorrect = userAnswerIndex === question.correctOptionIndex
              const userAnswer = question.options[userAnswerIndex]
              const correctAnswer = question.options[question.correctOptionIndex]

              return (
                <div
                  key={question.id}
                  className={`p-6 rounded-lg border-2 ${
                    isCorrect
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-lg">
                      {index + 1}. {question.text}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        isCorrect
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Your Answer:</p>
                      <p className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        {userAnswer?.text || 'Not answered'}
                      </p>
                    </div>

                    {!isCorrect && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Correct Answer:</p>
                        <p className="font-semibold text-green-700">{correctAnswer?.text}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex gap-4 mt-8">
            <Link
              to="/quizzes"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Back to Quizzes
            </Link>
            <Link
              to={`/play/${quiz.id}`}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
            >
              Retake Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
