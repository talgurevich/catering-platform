import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth/admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!isAdmin(user)) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-l border-gray-200 min-h-screen p-6">
          <nav className="space-y-2">
            <Link
              href="/admin"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              📦 מוצרים
            </Link>
            <Link
              href="/admin/products/new"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              ➕ מוצר חדש
            </Link>
            <Link
              href="/admin/import"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              📄 ייבוא CSV
            </Link>
            <Link
              href="/admin/categories"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              🏷️ קטגוריות
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
