import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth/admin'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import Link from 'next/link'

export default async function Home() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect admins to admin dashboard
  if (isAdmin(user)) {
    redirect('/admin')
  }

  return (
    <>
      <Header user={user} />
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            תחנת הלחם עכו - קייטרינג
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            ברוכים הבאים לפלטפורמת ההזמנות שלנו
          </p>

          {user && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                התחברת בהצלחה! 🎉
              </h2>
              <p className="text-blue-700 mb-4">
                משתמש: {user.email}
              </p>
              <Link
                href="/admin"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                כניסה לפאנל הניהול
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
