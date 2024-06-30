export function formatTime(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = timeInSeconds % 60

  // Preenche com zero à esquerda se necessário para garantir que minutos e segundos sempre tenham dois dígitos
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = seconds.toString().padStart(2, '0')

  return `${formattedMinutes}:${formattedSeconds}`
}
