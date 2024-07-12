export function formatTime(timeInSeconds: number): string {
  const time = Math.max(0, timeInSeconds)
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = Math.floor(time % 60)

  const formattedHours =
    hours > 0 ? `${hours.toString().padStart(2, '0')}:` : ''
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = seconds.toString().padStart(2, '0')

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`
}
