import { prisma } from '@/lib/prisma'
import CustomerHeader from '@/components/CustomerHeader'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'

interface ProductPageProps {
  params: {
    slug: string
  }
}

// Force dynamic rendering (ISR at runtime, not build time)
export const dynamic = 'force-dynamic'
export const revalidate = 3600
export const dynamicParams = true

export default async function ProductPage({ params }: ProductPageProps) {
  const decodedSlug = decodeURIComponent(params.slug)

  const product = await prisma.product.findUnique({
    where: { slug: decodedSlug },
    include: {
      Category: true,
      ProductOption: {
        orderBy: { display_order: 'asc' },
      },
    },
  })

  if (!product || !product.is_active) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600 transition-colors">
              דף הבית
            </Link>
            <span>/</span>
            <Link
              href={`/categories/${product.Category.slug}`}
              className="hover:text-yellow-600 transition-colors"
            >
              {product.Category.name_he}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name_he}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <main className="flex-grow bg-white" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="aspect-square bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl overflow-hidden relative shadow-xl">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name_he}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-200 to-orange-200">
                  <span className="text-9xl filter drop-shadow-lg">🍽️</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-6">
                <Link
                  href={`/categories/${product.Category.slug}`}
                  className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold mb-4 hover:bg-yellow-200 transition-colors"
                >
                  {product.Category.name_he}
                </Link>

                <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {product.name_he}
                </h1>

                {product.description_he && (
                  <p className="text-xl text-gray-600 leading-relaxed mb-6">
                    {product.description_he}
                  </p>
                )}

                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-5xl font-bold text-gray-900">
                    ₪{product.price.toString()}
                  </span>
                  <span className="text-xl text-gray-500">
                    / {product.unit_label}
                  </span>
                </div>
              </div>

              {/* Prep Time Notice */}
              {product.prep_time_days > 0 && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6">
                  <svg
                    className="w-6 h-6 text-blue-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-bold text-blue-900">
                      זמן הכנה: {product.prep_time_days} ימים מראש
                    </p>
                    <p className="text-sm text-blue-700">
                      יש להזמין לפחות {product.prep_time_days} ימי עסקים לפני המועד הרצוי
                    </p>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="space-y-4 mb-8">
                {product.serving_size && (
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">גודל מנה</p>
                      <p className="text-gray-600">{product.serving_size}</p>
                    </div>
                  </div>
                )}

                {product.allergens && product.allergens.length > 0 && (
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">אלרגנים</p>
                      <p className="text-gray-600">{product.allergens.join(', ')}</p>
                    </div>
                  </div>
                )}

                {product.ingredients && (
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">רכיבים</p>
                      <p className="text-gray-600">{product.ingredients}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <AddToCartButton product={product} />

              {/* Contact CTA */}
              <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl">
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  יש שאלות? נשמח לעזור
                </h3>
                <p className="text-gray-300 mb-4">
                  צרו קשר והצוות שלנו יסייע לכם בהזמנה
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://wa.me/972502670040"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-green-500 text-white rounded-xl font-bold text-center hover:bg-green-600 transition-colors"
                  >
                    וואטסאפ
                  </a>
                  <a
                    href="tel:+972"
                    className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-xl font-bold text-center hover:bg-gray-100 transition-colors"
                  >
                    התקשרו
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
