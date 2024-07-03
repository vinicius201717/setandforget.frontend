/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useCallback } from 'react'

interface UseClockResult {
  time: number
  isRunning: boolean
  start: () => void
  pause: () => void
  reset: (newTime: number) => void
}

const useClock = (initialTime: number): UseClockResult => {
  const [time, setTime] = useState<number>(initialTime)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true)
    }
  }, [isRunning])

  const pause = useCallback(() => {
    if (isRunning) {
      setIsRunning(false)
    }
  }, [isRunning])

  const reset = useCallback((newTime: number) => {
    setTime(newTime)
    setIsRunning(false)
  }, [])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout)
            setIsRunning(false)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current as NodeJS.Timeout)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current as NodeJS.Timeout)
      }
    }
  }, [isRunning])

  return { time, isRunning, start, pause, reset }
}

export default useClock
