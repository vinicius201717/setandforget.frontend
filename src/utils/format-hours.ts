import moment from 'moment'
export function formatHour(time: string): string {
  const timeInMoment = moment(time, 'HH:mm:ss')

  return timeInMoment.format('HH[h]mm')
}
