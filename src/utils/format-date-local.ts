import moment from 'moment-timezone'

export function formatFixtureDate(date: string): {
  date: string
  time: string
} {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const dateLocal = moment.utc(date).tz(userTimeZone)

  return {
    date: dateLocal.format('YYYY-MM-DD'),
    time: dateLocal.format('HH:mm:ss'),
  }
}
