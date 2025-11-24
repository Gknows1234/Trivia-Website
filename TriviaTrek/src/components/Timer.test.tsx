import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Timer } from './Timer'

describe('Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('renders initial time correctly', () => {
    const mockOnExpire = vi.fn()
    render(<Timer initialSeconds={60} onExpire={mockOnExpire} />)
    expect(screen.getByText('01:00')).toBeInTheDocument()
  })

  it('counts down every second', async () => {
    const mockOnExpire = vi.fn()
    render(<Timer initialSeconds={5} onExpire={mockOnExpire} />)

    expect(screen.getByText('00:05')).toBeInTheDocument()

    vi.advanceTimersByTime(1000)
    await waitFor(() => {
      expect(screen.getByText('00:04')).toBeInTheDocument()
    })

    vi.advanceTimersByTime(1000)
    await waitFor(() => {
      expect(screen.getByText('00:03')).toBeInTheDocument()
    })
  })

  it('calls onExpire when timer reaches zero', async () => {
    const mockOnExpire = vi.fn()
    render(<Timer initialSeconds={2} onExpire={mockOnExpire} />)

    vi.advanceTimersByTime(2000)

    await waitFor(() => {
      expect(mockOnExpire).toHaveBeenCalled()
    })
  })

  it('displays mm:ss format correctly', () => {
    const mockOnExpire = vi.fn()
    render(<Timer initialSeconds={125} onExpire={mockOnExpire} />)
    expect(screen.getByText('02:05')).toBeInTheDocument()
  })

  it('has aria-live region for accessibility', () => {
    const mockOnExpire = vi.fn()
    const { container } = render(<Timer initialSeconds={60} onExpire={mockOnExpire} />)
    const timerDiv = container.querySelector('[role="timer"]')
    expect(timerDiv).toHaveAttribute('aria-live', 'polite')
  })

  it('cleans up interval on unmount', () => {
    const mockOnExpire = vi.fn()
    const { unmount } = render(<Timer initialSeconds={60} onExpire={mockOnExpire} />)

    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
    clearIntervalSpy.mockRestore()
  })
})
