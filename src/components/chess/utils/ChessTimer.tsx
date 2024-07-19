/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from 'react'

interface UseClockResult {
  time: number
  isRunning: boolean
  start: () => void
  pause: () => void
  reset: (newTime: number) => void
}

export const useClock = (
  initialTime: number,
  onTimeEnd: () => void,
): UseClockResult => {
  const [time, setTime] = useState<number>(initialTime)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const start = useCallback(() => {
    if (!intervalRef.current) {
      setIsRunning(true)
    }
  }, [])

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setIsRunning(false)
    }
  }, [])

  const reset = useCallback((newTime: number) => {
    setTime(newTime)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
  }, [])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1
          if (newTime <= 0) {
            clearInterval(intervalRef.current as NodeJS.Timeout)
            intervalRef.current = null
            setIsRunning(false)
            onTimeEnd()
            return 0
          }
          return newTime
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
  }, [isRunning, onTimeEnd])

  return { time, isRunning, start, pause, reset }
}
