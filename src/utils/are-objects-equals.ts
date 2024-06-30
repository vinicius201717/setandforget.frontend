import { PartialUserDataType } from 'src/context/types'

export function areObjectsEqual(
  obj1: PartialUserDataType,
  obj2: PartialUserDataType | undefined,
): boolean {
  if (!obj2) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false
    }
  }

  return true
}
