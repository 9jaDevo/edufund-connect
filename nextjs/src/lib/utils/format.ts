import { format, formatDistanceToNow } from 'date-fns'

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: string | Date, formatStr: string = 'PPP'): string {
  return format(new Date(date), formatStr)
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function getUserRoleName(role: string): string {
  const roleNames: Record<string, string> = {
    donor: 'Donor',
    student: 'Student',
    ngo: 'NGO',
    school: 'School',
    monitoring_agent: 'Monitoring Agent',
    admin: 'Administrator',
  }
  return roleNames[role] || role
}

export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}
