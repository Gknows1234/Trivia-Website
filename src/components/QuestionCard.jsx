import { useState } from 'react'

function QuestionCard({ question, onAnswer, answered, selectedAnswer }) {
  const [selected, setSelected] = useState(null)

  const effectiveSelected = answered ? selectedAnswer : selected;

  const handleSelect = (index) => {
    if (!answered) {
      setSelected(index)
    }
  }

  const handleSubmit = () => {
    if (selected !== null) {
      onAnswer(selected)
      // setSelected(null)  // Don't reset here so feedback can use it
    }
  }

  if (!question) return null

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{question.question}</h2>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={answered}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              effectiveSelected === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-300'
            } ${answered ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
          >
            <span className="font-semibold">{String.fromCharCode(65 + index)}.</span> {option}
          </button>
        ))}
      </div>

      {!answered && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Submit Answer
        </button>
      )}

      {answered && (
        <div
          className={`p-4 rounded-lg text-center font-semibold ${
            effectiveSelected === question.correctAnswer
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {effectiveSelected === question.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
        </div>
      )}
    </div>
  )
}

export default QuestionCard
