import { Question } from '../types'

interface QuestionCardProps {
  question: Question
  onAnswer: (index: number) => void
  selectedIndex?: number
  disabled?: boolean
}

export function QuestionCard({
  question,
  onAnswer,
  selectedIndex,
  disabled = false,
}: QuestionCardProps) {
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault()
      onAnswer(index)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-6 text-gray-800">{question.text}</h3>

      <div
        role="radiogroup"
        aria-label="Answer options"
        className="space-y-3"
      >
        {question.options.map((option, index) => (
          <button
            key={option.id}
            role="radio"
            aria-checked={selectedIndex === index}
            onClick={() => !disabled && onAnswer(index)}
            onKeyDown={e => handleKeyDown(index, e)}
            disabled={disabled}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              selectedIndex === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span className="font-medium">{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
