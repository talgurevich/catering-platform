import { createClient } from '@/lib/supabase/server'
import Header from '@/components/Header'

export default async function Home() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

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
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-green-800 mb-2">
                התחברת בהצלחה! 🎉
              </h2>
              <p className="text-green-700">
                משתמש: {user.email}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
