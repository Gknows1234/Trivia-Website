import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

function Review() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [quiz, setQuiz] = useState(null)
  const [result, setResult] = useState(location.state?.result || null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQuizData()
  }, [id])

  const fetchQuizData = async () => {
    try {
      const quizResponse = await axios.get(`http://localhost:4000/quizzes/${id}`)
      setQuiz(quizResponse.data)

      if (!result) {
        const resultsResponse = await axios.get('http://localhost:4000/results')
        const latestResult = resultsResponse.data
          .filter((r) => r.quizId === id)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0]
        setResult(latestResult)
      }
      setLoading(false)
    } catch (err) {
      console.error('Failed to load data:', err)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600 font-semibold">Loading review...</p>
        </div>
      </div>
    )
  }

  if (!quiz || !result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Review data not found</p>
          <button
            onClick={() => navigate('/quizzes')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    )
  }

  const getResultColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getResultBg = (percentage) => {
    if (percentage >= 80) return 'bg-green-50'
    if (percentage >= 60) return 'bg-yellow-50'
    return 'bg-red-50'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          ← Back Home
        </button>

        <div className={`${getResultBg(result.percentage)} rounded-lg shadow-lg p-8 mb-6`}>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{quiz.title} - Review</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <p className="text-gray-600 mb-2">Your Score</p>
              <p className={`text-4xl font-bold ${getResultColor(result.percentage)}`}>
                {result.score}/{result.totalQuestions}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <p className="text-gray-600 mb-2">Percentage</p>
              <p className={`text-4xl font-bold ${getResultColor(result.percentage)}`}>
                {result.percentage}%
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <p className="text-gray-600 mb-2">Status</p>
              <p className={`text-2xl font-bold ${getResultColor(result.percentage)}`}>
                {result.percentage >= 80 ? '✓ Excellent' : result.percentage >= 60 ? '~ Good' : '✗ Try Again'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Question Review</h2>

          {quiz.questions.map((question, index) => {
            const userAnswer = result.answers[index]
            const isCorrect = userAnswer === question.correctAnswer

            return (
              <div
                key={index}
                className={`${
                  isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                } border-2 rounded-lg p-6`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800 flex-1">
                    {index + 1}. {question.question}
                  </h3>
                  <span className={`text-2xl ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {isCorrect ? '✓' : '✗'}
                  </span>
                </div>

                <div className="space-y-2">
                  {question.options.map((option, optIndex) => {
                    const isUserAnswer = userAnswer === optIndex
                    const isCorrectAnswer = optIndex === question.correctAnswer

                    return (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg ${
                          isCorrectAnswer
                            ? 'bg-green-200 border-2 border-green-500'
                            : isUserAnswer
                              ? 'bg-red-200 border-2 border-red-500'
                              : 'bg-white border border-gray-300'
                        }`}
                      >
                        <span className="font-semibold">{String.fromCharCode(65 + optIndex)}.</span>{' '}
                        {option}
                        {isCorrectAnswer && <span className="ml-2 text-green-700">✓ Correct</span>}
                        {isUserAnswer && !isCorrectAnswer && <span className="ml-2 text-red-700">✗ Your answer</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate('/quizzes')}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Quizzes
          </button>
          <button
            onClick={() => navigate(`/quiz/${id}`)}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  )
}

export default Review
