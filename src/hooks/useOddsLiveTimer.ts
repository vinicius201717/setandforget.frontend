import { useEffect, useMemo, useState } from 'react'

function useGameTimer(initialTime: string) {
  const parseTime = (timeString: string): number => {
    const [minutes, seconds] = timeString.split(':').map(Number)
    return minutes * 60 + seconds
  }

  const formatTime = (totalSeconds: number): string => {
    if (isNaN(totalSeconds)) {
      return '00:00'
    }

    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(seconds).padStart(2, '0')
    return `${formattedMinutes}:${formattedSeconds}`
  }

  const [totalSeconds, setTotalSeconds] = useState(parseTime(initialTime))

  useMemo(() => {
    setTotalSeconds(parseTime(initialTime))
  }, [initialTime])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTotalSeconds((prevSeconds) => prevSeconds + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [totalSeconds])

  const gameTime = formatTime(totalSeconds)

  return gameTime
}

export default useGameTimer
