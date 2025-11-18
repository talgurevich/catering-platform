import Link from 'next/link'
import CustomerHeader from '@/components/CustomerHeader'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'דף לא נמצא - Bread Station Akko',
  description: 'הדף שחיפשת לא קיים',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />

      <main className="flex-grow bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4" dir="rtl">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="text-9xl mb-4">🍞</div>
            <h1 className="font-heading text-8xl font-bold text-gray-900 mb-2">
              404
            </h1>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            אופס! הדף לא נמצא
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            נראה שהדף שחיפשתם לא קיים או הועבר למקום אחר.
            <br />
            אל דאגה - בואו נחזיר אתכם למסלול!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:scale-105"
            >
              חזרה לדף הבית
            </Link>
            <Link
              href="/events"
              className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:scale-105"
            >
              ראו את התפריט שלנו
            </Link>
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg">
            <p className="text-gray-600 mb-4">
              לא מצאתם את מה שחיפשתם? נשמח לעזור!
            </p>
            <div className="flex gap-3 justify-center">
              <a
                href="https://wa.me/972502670040"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors"
              >
                וואטסאפ
              </a>
              <a
                href="tel:+972502670040"
                className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
              >
                התקשרו
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
