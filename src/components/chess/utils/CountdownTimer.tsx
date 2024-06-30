import { useState, useEffect, useRef, useCallback } from 'react'

type Player = 'w' | 'b'

const useChessTimer = (initialTime: number) => {
  const [timeW, setTimeW] = useState(initialTime)
  const [timeB, setTimeB] = useState(initialTime)
  const [activePlayer, setActivePlayer] = useState<Player>('w')
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const switchPlayer = useCallback(() => {
    setActivePlayer((prevPlayer) => (prevPlayer === 'w' ? 'b' : 'w'))
  }, [])

  const decrementTime = useCallback(() => {
    if (activePlayer === 'w') {
      setTimeW((time) => time - 1)
    } else {
      setTimeB((time) => time - 1)
    }
  }, [activePlayer])

  useEffect(() => {
    timerRef.current = setInterval(decrementTime, 1000)
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [decrementTime])

  useEffect(() => {
    // Reset the timer if the active player changes to ensure we're not speeding up the timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    timerRef.current = setInterval(decrementTime, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [activePlayer, decrementTime])

  return { timeW, timeB, switchPlayer }
}

export default useChessTimer
