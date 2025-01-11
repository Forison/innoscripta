export const timeFormatter = (dt: string): string => {
  const date = new Date(dt)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  }
  const formattedDate = date.toLocaleDateString("en-US", options)

  return formattedDate
}