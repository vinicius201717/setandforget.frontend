/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react'

interface TimerProps {
  initialTime: number
  onTimeEnd: (player: 'w' | 'b') => void
}

interface Timer {
  timeW: number
  timeB: number
  switchPlayer: () => void
  resetTimer: (value: number) => void
}

export const useChessTimer = ({
  initialTime,
  onTimeEnd,
}: TimerProps): Timer => {
  const [timeW, setTimeW] = useState(initialTime)
  const [timeB, setTimeB] = useState(initialTime)
  const [activePlayer, setActivePlayer] = useState<'w' | 'b'>('w')

  const decrementTime = useCallback(() => {
    if (activePlayer === 'w') {
      setTimeW((time) => {
        if (time === 1) onTimeEnd('w')
        return Math.max(time - 1, 0)
      })
    } else {
      setTimeB((time) => {
        if (time === 1) onTimeEnd('b')
        return Math.max(time - 1, 0)
      })
    }
  }, [activePlayer, onTimeEnd])

  useEffect(() => {
    const timerId = setInterval(decrementTime, 1000)
    return () => clearInterval(timerId)
  }, [decrementTime])

  const switchPlayer = useCallback(() => {
    setActivePlayer((prev) => (prev === 'w' ? 'b' : 'w'))
  }, [])

  const resetTimer = useCallback((duration: number) => {
    setTimeW(duration)
    setTimeB(duration)
  }, [])

  return { timeW, timeB, switchPlayer, resetTimer }
}
