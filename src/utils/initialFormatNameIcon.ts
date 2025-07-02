export function InitialLetterName(name: string) {
  const array = name.trim().split(' ')
  const firstLetter = array[0]?.[0]?.toLocaleUpperCase() || ''
  const secondLetter = array[1]?.[0]?.toLocaleUpperCase() || ''
  const initials = (firstLetter + secondLetter).trim()

  return initials || 'Player'
}
