import { Question } from '../types'

interface QuestionCardProps {
  question: Question
  onAnswer: (optionIndex: number) => void
  selectedIndex?: number
  disabled?: boolean
  showCorrect?: boolean
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  selectedIndex,
  disabled = false,
  showCorrect = false,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault()
      onAnswer(index)
    }
  }

  return (
    <div className="tt-question-card">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{question.text}</h2>

      <div role="radiogroup" aria-label="Answer options">
        {question.options.map((option, index) => {
          const isSelected = selectedIndex === index
          const isCorrect = index === question.correctOptionIndex
          const showAsCorrect = showCorrect && isCorrect
          const showAsIncorrect = showCorrect && isSelected && !isCorrect

          let buttonClass = 'tt-option-btn'
          if (isSelected) buttonClass += ' selected'
          if (showAsCorrect) buttonClass += ' correct'
          if (showAsIncorrect) buttonClass += ' incorrect'

          return (
            <button
              key={option.id}
              onClick={() => !disabled && onAnswer(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={buttonClass}
              disabled={disabled}
              role="radio"
              aria-checked={isSelected}
              aria-label={option.text}
              tabIndex={disabled ? -1 : 0}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                    isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="text-lg">{option.text}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
