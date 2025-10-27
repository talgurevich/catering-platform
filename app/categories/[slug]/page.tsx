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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      products: {
        where: { is_active: true },
        include: {
          product_options: {
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
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/"
            className="inline-flex items-center text-blue-200 hover:text-white mb-4"
          >
            <svg
              className="w-5 h-5 ml-2"
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
          <h1 className="text-4xl md:text-5xl font-bold">{category.name_he}</h1>
          <p className="text-blue-100 mt-2">
            {category.products.length} מוצרים זמינים
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <main className="flex-grow bg-gray-50" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {category.products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">אין מוצרים זמינים בקטגוריה זו כרגע</p>
              <Link
                href="/"
                className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                חזרה לדף הבית
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name_he}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl text-gray-400">🍽️</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {product.name_he}
                    </h3>

                    {product.description_he && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description_he}
                      </p>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          ₪{product.price.toString()}
                        </span>
                        <span className="text-gray-500 text-sm mr-2">
                          / {product.unit_label}
                        </span>
                      </div>
                    </div>

                    {/* Options */}
                    {product.product_options.length > 0 && (
                      <div className="border-t pt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          אפשרויות זמינות:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {product.product_options.slice(0, 3).map((option) => (
                            <span
                              key={option.id}
                              className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                            >
                              {option.option_name}
                              {option.price_modifier > 0 && (
                                <span className="mr-1">
                                  +₪{option.price_modifier.toString()}
                                </span>
                              )}
                            </span>
                          ))}
                          {product.product_options.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{product.product_options.length - 3} נוספים
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Prep Time Notice */}
                    {product.prep_time_days > 0 && (
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <svg
                          className="w-4 h-4 ml-1"
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
                        זמן הכנה: {product.prep_time_days} ימים
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="bg-blue-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              רוצים להזמין? צרו קשר עכשיו
            </h2>
            <a
              href="https://wa.me/972"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 transition-colors shadow-lg"
            >
              הזמינו בוואטסאפ
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: { slug: true },
  })

  return categories.map((category) => ({
    slug: category.slug,
  }))
}
