import { User } from '@supabase/supabase-js'

// Add admin email addresses here or in environment variable
const ADMIN_EMAILS = process.env.ADMIN_EMAILS
  ? process.env.ADMIN_EMAILS.split(',').map(email => email.trim())
  : []

export function isAdmin(user: User | null): boolean {
  if (!user?.email) return false
  return ADMIN_EMAILS.includes(user.email)
}

export function requireAdmin(user: User | null): void {
  if (!isAdmin(user)) {
    throw new Error('Unauthorized: Admin access required')
  }
}
