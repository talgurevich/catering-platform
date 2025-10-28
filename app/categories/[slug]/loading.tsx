import CustomerHeader from '@/components/CustomerHeader'
import Footer from '@/components/Footer'

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />

      {/* Category Header Skeleton */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden" dir="rtl">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="h-6 w-32 bg-gray-700 rounded-full mb-6 animate-pulse"></div>
          <div className="h-12 w-64 bg-gray-700 rounded-lg mb-4 animate-pulse"></div>
          <div className="h-6 w-48 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <main className="flex-grow bg-gradient-to-b from-white to-gray-50" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="aspect-video bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
