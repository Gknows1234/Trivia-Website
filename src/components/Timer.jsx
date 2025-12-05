import { useEffect, useState } from 'react'

function Timer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isWarning = timeLeft < 30

  return (
    <div
      className={`text-center p-4 rounded-lg font-bold text-2xl ${
        isWarning ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
      }`}
    >
      ⏱ {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  )
}

export default Timer
