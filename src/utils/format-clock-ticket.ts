export function formatClock(timeInMinutes: number): string {
  if (timeInMinutes < 60) {
    return `${timeInMinutes} minutes`
  } else {
    const hours = Math.floor(timeInMinutes / 60)
    const minutes = timeInMinutes % 60
    return `${hours} hours${minutes > 0 ? ` and ${minutes} minutes` : ''}`
  }
}
