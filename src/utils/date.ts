/**
 * Get ISODateTime string with respect to UTC time
 *
 * @param date Date
 * @returns ISO 8601 string without the timezone
 */
export const getISODateTime = (date: Date) => {
  // im gonna shoot the creator of the JS date lib
  const formattedDate = String(date.getUTCDate()).padStart(2, '0')
  const formattedMonth = String(date.getUTCMonth() + 1).padStart(2, '0')
  const formattedYear = String(date.getUTCFullYear()).padStart(2, '0')
  const formattedHours = String(date.getUTCHours()).padStart(2, '0')
  const formattedMinutes = String(date.getUTCMinutes()).padStart(2, '0')
  const formattedSeconds = String(date.getUTCSeconds()).padStart(2, '0')
  return `${formattedYear}-${formattedMonth}-${formattedDate}T${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}
