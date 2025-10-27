import { User } from '@supabase/supabase-js'

// Add admin email addresses here or in environment variable
const ADMIN_EMAILS = process.env.ADMIN_EMAILS
  ? process.env.ADMIN_EMAILS.split(',').map(email => email.trim())
  : []

export function isAdmin(user: User | null): boolean {
  if (!user?.email) return false

  // Debug logging
  console.log('Checking admin:', {
    userEmail: user.email,
    adminEmails: ADMIN_EMAILS,
    isAdmin: ADMIN_EMAILS.includes(user.email)
  })

  return ADMIN_EMAILS.includes(user.email)
}

export function requireAdmin(user: User | null): void {
  if (!isAdmin(user)) {
    throw new Error('Unauthorized: Admin access required')
  }
}
