import CustomerHeader from '@/components/CustomerHeader'
import Footer from '@/components/Footer'

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />

      {/* Breadcrumb Skeleton */}
      <div className="bg-gray-50 border-b" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            <span>/</span>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <span>/</span>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Product Details Skeleton */}
      <main className="flex-grow bg-white" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image Skeleton */}
            <div className="aspect-square bg-gray-200 rounded-3xl animate-pulse"></div>

            {/* Product Info Skeleton */}
            <div className="flex flex-col space-y-6">
              <div>
                <div className="h-8 w-32 bg-gray-200 rounded-full mb-4 animate-pulse"></div>
                <div className="h-12 w-3/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="h-6 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-6 w-5/6 bg-gray-200 rounded mb-6 animate-pulse"></div>
                <div className="h-16 w-48 bg-gray-200 rounded mb-8 animate-pulse"></div>
              </div>

              <div className="space-y-4">
                <div className="h-20 w-full bg-gray-100 rounded-xl animate-pulse"></div>
                <div className="h-20 w-full bg-gray-100 rounded-xl animate-pulse"></div>
                <div className="h-20 w-full bg-gray-100 rounded-xl animate-pulse"></div>
              </div>

              <div className="h-64 w-full bg-gray-100 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
