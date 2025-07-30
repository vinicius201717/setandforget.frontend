export const getInitials = (str: string): string => {
  if (!str || typeof str !== 'string') return '' // Handle null, undefined, or invalid input
  const parts = str
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 0) // Split and filter empty parts
  if (parts.length === 0) return '' // Return empty string if no valid parts
  if (parts.length === 1) return parts[0][0] ? parts[0][0].toUpperCase() : ''
  return parts[0][0] && parts[parts.length - 1][0]
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : ''
}
