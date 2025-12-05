import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import QuestionCard from '../components/QuestionCard'
import Timer from '../components/Timer'

function PlayQuiz() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState([])
  const [timeUp, setTimeUp] = useState(false)

  useEffect(() => {
    fetchQuiz()
  }, [id])

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/quizzes/${id}`)
      setQuiz(response.data)
      setLoading(false)
    } catch (err) {
      console.error('Failed to load quiz:', err)
      setLoading(false)
    }
  }

  const handleAnswer = (selectedIndex) => {
    const isCorrect = selectedIndex === quiz.questions[currentQuestion].correctAnswer
    setAnswered(true)
    // Instead of just pushing to answers, store answer at current index
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedIndex
    setAnswers(newAnswers)

    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setAnswered(false)
    } else {
      saveResult()
    }
  }

  const handleTimeUp = () => {
    setTimeUp(true)
    saveResult()
  }

  const saveResult = async () => {
    try {
      const result = {
        quizId: id,
        score,
        totalQuestions: quiz.questions.length,
        percentage: Math.round((score / quiz.questions.length) * 100),
        timestamp: new Date().toISOString(),
        answers,
      }
      await axios.post('http://localhost:4000/results', result)
      navigate(`/review/${id}`, { state: { result } })
    } catch (err) {
      console.error('Failed to save result:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600 font-semibold">Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Quiz not found</p>
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

  if (timeUp) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-red-600 mb-4">⏰ Time's Up!</h2>
          <p className="text-gray-600 mb-6">Your quiz has been submitted.</p>
          <button
            onClick={() => navigate('/quizzes')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{quiz.title}</h1>
          <Timer duration={quiz.timeLimit} onTimeUp={handleTimeUp} />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
            <span className="text-blue-600 font-bold">Score: {score}</span>
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
          question={quiz.questions[currentQuestion]}
          onAnswer={handleAnswer}
          answered={answered}
          selectedAnswer={answers[currentQuestion]}
        />

        {answered && (
          <button
            onClick={handleNext}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'} →
          </button>
        )}
      </div>
    </div>
  )
}

export default PlayQuiz
