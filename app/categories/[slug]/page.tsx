import { prisma } from '@/lib/prisma'
import CustomerHeader from '@/components/CustomerHeader'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

// Use ISR with revalidation every 5 minutes
export const revalidate = 300
export const dynamicParams = true

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Decode the URL-encoded slug
  const decodedSlug = decodeURIComponent(params.slug)

  const category = await prisma.category.findUnique({
    where: { slug: decodedSlug },
    include: {
      Product: {
        where: { is_active: true },
        include: {
          ProductOption: {
            orderBy: { display_order: 'asc' },
          },
        },
        orderBy: { created_at: 'desc' },
      },
    },
  })

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />

      {/* Category Header */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden" dir="rtl">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/"
            className="inline-flex items-center text-gray-300 hover:text-yellow-400 mb-6 transition-colors group"
          >
            <svg
              className="w-5 h-5 ml-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            חזרה לדף הבית
          </Link>

          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
              קטגוריה
            </span>
          </div>

          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
            {category.name_he}
          </h1>

          <p className="text-xl text-gray-300">
            {category.Product.length} מוצרים זמינים • בחרו את המועדפים עליכם
          </p>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Products Grid */}
      <main className="flex-grow bg-gradient-to-b from-white to-gray-50" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {category.Product.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🍽️</div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                אין מוצרים זמינים בקטגוריה זו כרגע
              </h2>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
              >
                חזרה לדף הבית
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.Product.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 block"
                >
                  {/* Product Image */}
                  <div className="aspect-video bg-gradient-to-br from-yellow-100 to-orange-100 relative overflow-hidden">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name_he}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-200 to-orange-200">
                        <span className="text-7xl filter drop-shadow-lg">🍽️</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                      {product.name_he}
                    </h3>

                    {product.description_he && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {product.description_he}
                      </p>
                    )}

                    <div className="flex items-baseline gap-2 mb-5">
                      <span className="text-3xl font-bold text-gray-900">
                        ₪{product.price.toString()}
                      </span>
                      <span className="text-gray-500 text-sm">
                        / {product.unit_label}
                      </span>
                    </div>

                    {/* Options */}
                    {product.ProductOption.length > 0 && (
                      <div className="border-t border-gray-100 pt-4 mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-3">
                          אפשרויות זמינות:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {product.ProductOption.slice(0, 4).map((option) => (
                            <span
                              key={option.id}
                              className="inline-flex items-center px-3 py-1.5 bg-yellow-50 text-yellow-800 text-xs font-medium rounded-full border border-yellow-200"
                            >
                              {option.option_name}
                              {Number(option.price_modifier) > 0 && (
                                <span className="mr-1 font-bold">
                                  +₪{option.price_modifier.toString()}
                                </span>
                              )}
                            </span>
                          ))}
                          {product.ProductOption.length > 4 && (
                            <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                              +{product.ProductOption.length - 4} נוספים
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Prep Time Notice */}
                    {product.prep_time_days > 0 && (
                      <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                        <svg
                          className="w-4 h-4 ml-2"
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
                        זמן הכנה: {product.prep_time_days} ימים מראש
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-400 rounded-full filter blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
                מוצא חן בעיניכם?
              </span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              רוצים להזמין? צרו קשר עכשיו
            </h2>

            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              הצוות שלנו ישמח לסייע לכם בהכנת ההזמנה המושלמת
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/972502670040"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto px-8 py-4 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 hover:scale-105"
              >
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  הזמינו בוואטסאפ
                </span>
              </a>

              <a
                href="tel:+972"
                className="group w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105"
              >
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  התקשרו עכשיו
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
