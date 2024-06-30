export function InitialLetterName(name: string) {
  const array = name.split(' ')
  return array[0][0].toLocaleUpperCase() + array[1][0].toLocaleUpperCase()
}
