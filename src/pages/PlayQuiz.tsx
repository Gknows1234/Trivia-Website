import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Quiz, Result } from '../types'
import { apiClient } from '../lib/api'
import { QuestionCard } from '../components/QuestionCard'
import { Timer } from '../components/Timer'

export function PlayQuiz() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [timeExpired, setTimeExpired] = useState(false)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true)
        if (!id) throw new Error('Quiz ID not found')
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
    const questionId = quiz.questions[currentQuestion].id
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }))

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handleSubmit = async () => {
    if (!quiz) return

    const score = Object.entries(answers).reduce((acc, [questionId, selectedIndex]) => {
      const question = quiz.questions.find(q => q.id === questionId)
      if (question && question.correctOptionIndex === selectedIndex) {
        return acc + quiz.scorePerQuestion
      }
      return acc
    }, 0)

    const result: Result = {
      id: Date.now().toString(),
      quizId: quiz.id,
      score,
      totalQuestions: quiz.questions.length,
      answers,
      timestamp: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    }

    try {
      await apiClient.post('/results', result)
      navigate(`/review/${result.id}`)
    } catch (err) {
      console.error('Failed to save result:', err)
      alert('Failed to save your result. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error || 'Quiz not found'}</p>
          <Link to="/quizzes" className="text-blue-600 hover:underline">
            Back to Quizzes
          </Link>
        </div>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]
  const selectedAnswer = answers[question.id]
  const isLastQuestion = currentQuestion === quiz.questions.length - 1
  const allAnswered = Object.keys(answers).length === quiz.questions.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            TriviaTrek
          </Link>
          <h2 className="text-lg font-semibold text-gray-800">{quiz.title}</h2>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Timer initialSeconds={quiz.timeLimit} onExpire={() => setTimeExpired(true)} />

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <span className="text-sm font-semibold text-gray-600">
                {Object.keys(answers).length} answered
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{
                  width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <QuestionCard
            question={question}
            onAnswer={handleAnswer}
            selectedIndex={selectedAnswer}
            disabled={timeExpired}
          />

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered || timeExpired}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                disabled={currentQuestion === quiz.questions.length - 1}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
