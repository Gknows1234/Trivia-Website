import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QuestionCard } from './QuestionCard'
import { Question } from '../types'

describe('QuestionCard', () => {
  const mockQuestion: Question = {
    id: '1',
    text: 'What is 2 + 2?',
    options: [
      { id: '1', text: '3' },
      { id: '2', text: '4' },
      { id: '3', text: '5' },
    ],
    correctOptionIndex: 1,
  }

  it('renders question text', () => {
    const mockOnAnswer = vi.fn()
    render(
      <QuestionCard
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    )
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument()
  })

  it('renders all options', () => {
    const mockOnAnswer = vi.fn()
    render(
      <QuestionCard
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    )
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('calls onAnswer when option is clicked', () => {
    const mockOnAnswer = vi.fn()
    render(
      <QuestionCard
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    )
    const buttons = screen.getAllByRole('radio')
    fireEvent.click(buttons[1])
    expect(mockOnAnswer).toHaveBeenCalledWith(1)
  })

  it('marks selected option', () => {
    const mockOnAnswer = vi.fn()
    render(
      <QuestionCard
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        selectedIndex={1}
      />
    )
    const buttons = screen.getAllByRole('radio')
    expect(buttons[1]).toHaveAttribute('aria-checked', 'true')
  })

  it('disables options when disabled prop is true', () => {
    const mockOnAnswer = vi.fn()
    render(
      <QuestionCard
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        disabled={true}
      />
    )
    const buttons = screen.getAllByRole('radio')
    buttons.forEach((button) => {
      expect(button).toBeDisabled()
    })
  })

  it('handles keyboard Enter key', () => {
    const mockOnAnswer = vi.fn()
    render(
      <QuestionCard
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    )
    const buttons = screen.getAllByRole('radio')
    fireEvent.keyDown(buttons[0], { key: 'Enter' })
    expect(mockOnAnswer).toHaveBeenCalledWith(0)
  })

  it('handles keyboard Space key', () => {
    const mockOnAnswer = vi.fn()
    render(
      <QuestionCard
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    )
    const buttons = screen.getAllByRole('radio')
    fireEvent.keyDown(buttons[0], { key: ' ' })
    expect(mockOnAnswer).toHaveBeenCalledWith(0)
  })
})
