import { prisma } from '@/lib/prisma'
import CustomerHeader from '@/components/CustomerHeader'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface BundlePageProps {
  params: {
    slug: string
  }
}

// Use ISR with revalidation every 5 minutes
export const revalidate = 300
export const dynamicParams = true

export default async function BundlePage({ params }: BundlePageProps) {
  const decodedSlug = decodeURIComponent(params.slug)

  const bundle = await prisma.bundle.findUnique({
    where: { slug: decodedSlug },
  })

  if (!bundle || !bundle.is_active) {
    notFound()
  }

  // Parse JSON fields
  const includedItems = Array.isArray(bundle.included_items)
    ? bundle.included_items
    : []
  const optionalExtras = Array.isArray(bundle.optional_extras)
    ? bundle.optional_extras
    : []

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
              href="/events"
              className="hover:text-yellow-600 transition-colors"
            >
              חבילות ואירועים
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{bundle.name_he}</span>
          </div>
        </div>
      </div>

      {/* Bundle Details */}
      <main className="flex-grow bg-white" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Bundle Image */}
            <div className="aspect-square bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl overflow-hidden relative shadow-xl">
              {bundle.image_url ? (
                <Image
                  src={bundle.image_url}
                  alt={bundle.name_he}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-200 to-orange-200">
                  <span className="text-9xl filter drop-shadow-lg">🎁</span>
                </div>
              )}

              {/* Featured badge */}
              {bundle.is_featured && (
                <div className="absolute top-6 right-6 px-6 py-3 bg-yellow-400 text-gray-900 rounded-full text-lg font-bold shadow-2xl">
                  חבילה מומלצת
                </div>
              )}
            </div>

            {/* Bundle Info */}
            <div className="flex flex-col">
              <div className="mb-6">
                <Link
                  href="/events"
                  className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold mb-4 hover:bg-yellow-200 transition-colors"
                >
                  חבילות אירוח
                </Link>

                <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {bundle.name_he}
                </h1>

                {bundle.short_description && (
                  <p className="text-xl text-gray-600 leading-relaxed mb-6 font-medium">
                    {bundle.short_description}
                  </p>
                )}

                {bundle.full_description && (
                  <p className="text-lg text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                    {bundle.full_description}
                  </p>
                )}

                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-5xl font-bold text-gray-900">
                    ₪{bundle.price.toString()}
                  </span>
                  {bundle.serves_people && (
                    <span className="text-xl text-gray-500">
                      / ל-{bundle.serves_people} אנשים
                    </span>
                  )}
                </div>
              </div>

              {/* Prep Time Notice */}
              {bundle.prep_time_days > 0 && (
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
                      זמן הכנה: {bundle.prep_time_days} ימים מראש
                    </p>
                    <p className="text-sm text-blue-700">
                      יש להזמין לפחות {bundle.prep_time_days} ימי עסקים לפני המועד הרצוי
                    </p>
                  </div>
                </div>
              )}

              {/* Included Items */}
              {includedItems.length > 0 && (
                <div className="mb-6 p-6 bg-gray-50 rounded-2xl">
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    החבילה כוללת
                  </h3>
                  <ul className="space-y-2">
                    {includedItems.map((item: any, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700">{typeof item === 'string' ? item : item.name || item.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Optional Extras */}
              {optionalExtras.length > 0 && (
                <div className="mb-6 p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    תוספות אופציונליות
                  </h3>
                  <ul className="space-y-2">
                    {optionalExtras.map((extra: any, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-1">+</span>
                        <span className="text-gray-700">{typeof extra === 'string' ? extra : extra.name || extra.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Notes */}
              {bundle.notes && (
                <div className="mb-6 p-4 bg-blue-50 border-r-4 border-blue-400 rounded">
                  <p className="text-sm text-blue-900">{bundle.notes}</p>
                </div>
              )}

              {/* Contact CTA */}
              <div className="mt-auto p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl">
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  מעוניינים בחבילה? צרו קשר עכשיו
                </h3>
                <p className="text-gray-300 mb-4">
                  הצוות שלנו ישמח לסייע לכם בהזמנה ולהתאים את החבילה בדיוק לצרכים שלכם
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
                    href="tel:+972502670040"
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
