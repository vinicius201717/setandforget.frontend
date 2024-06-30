import { parsePhoneNumber } from 'libphonenumber-js'
import {
  threeDigitCountryCodes,
  oneDigitCountryCodes,
} from 'src/data/countryCodesNumbers'

export function getCountryByPhoneNumber(phoneNumber: string) {
  try {
    const parsedNumber = parsePhoneNumber(`+${phoneNumber}`)
    const countryNumber = parsedNumber ? parsedNumber.country : null
    if (countryNumber) {
      for (const element of oneDigitCountryCodes) {
        if (element.abbreviation === countryNumber) {
          return countryNumber + ` (+${phoneNumber[0]})`
        }
      }
      for (const element of threeDigitCountryCodes) {
        if (element.abbreviation === countryNumber) {
          return (
            countryNumber +
            ` (+${phoneNumber[0] + phoneNumber[1] + phoneNumber[2]})`
          )
        }
      }
      if (countryNumber) {
        return countryNumber + ` (+${phoneNumber[0] + phoneNumber[1]})`
      }
    }
  } catch (error) {
    console.error('Error when parsing phone number:', error)
    return null
  }
}
