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
    if (intervalRef.current === null) {
      setIsRunning(true)
    }
  }, [])

  const pause = useCallback(() => {
    if (intervalRef.current !== null) {
      setIsRunning(false)
    }
  }, [])

  const reset = useCallback((newTime: number) => {
    setTime(newTime)
    setIsRunning(false)
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout)
            intervalRef.current = null
            setIsRunning(false)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning])

  return { time, isRunning, start, pause, reset }
}

export default useClock
