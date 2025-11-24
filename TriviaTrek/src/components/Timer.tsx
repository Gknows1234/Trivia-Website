import { useEffect, useState } from 'react'

interface TimerProps {
  initialSeconds: number
  onExpire: () => void
}

export const Timer: React.FC<TimerProps> = ({ initialSeconds, onExpire }) => {
  const [remaining, setRemaining] = useState(initialSeconds)

  useEffect(() => {
    if (remaining <= 0) {
      onExpire()
      return
    }

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [remaining, onExpire])

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60
  const isWarning = remaining <= 30

  return (
    <div
      className={`tt-timer ${isWarning ? 'tt-timer.warning' : ''}`}
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining: ${minutes} minutes ${seconds} seconds`}
    >
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  )
}
