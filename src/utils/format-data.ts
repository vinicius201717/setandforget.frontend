import moment from 'moment'

export function formatDate(date: string): string {
  const dateInMoment = moment(date)

  const formattedDate = dateInMoment.format('DD [de] MMMM [de] YYYY')

  return formattedDate
}
