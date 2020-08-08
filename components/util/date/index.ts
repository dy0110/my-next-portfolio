import format from 'date-fns/format'

export const formatDate = (date: string, formatString?: string) => {
  return format(new Date(date), formatString ? 'YYYY/M/d h:m' : formatString)
}
