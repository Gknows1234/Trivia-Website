export interface Option {
  id: string
  text: string
}

export interface Question {
  id: string
  text: string
  options: Option[]
  correctOptionIndex: number
}

export interface Quiz {
  id: string
  title: string
  description: string
  timeLimit: number
  scorePerQuestion: number
  questions: Question[]
}

export interface Result {
  id: string
  quizId: string
  score: number
  totalQuestions: number
  answers: Record<string, number>
  timestamp: string
  completedAt: string
}

export interface User {
  id: string
  name: string
  email: string
}
