import { useState, useEffect } from 'react'

interface TimerProps {
  initialSeconds: number
  onExpire: () => void
}

export function Timer({ initialSeconds, onExpire }: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    if (seconds <= 0) {
      onExpire()
      return
    }

    const interval = setInterval(() => {
      setSeconds(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [seconds, onExpire])

  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  const timeString = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining: ${timeString}`}
      className={`text-3xl font-bold text-center py-4 ${
        seconds <= 10 ? 'text-red-600' : 'text-blue-600'
      }`}
    >
      {timeString}
    </div>
  )
}
