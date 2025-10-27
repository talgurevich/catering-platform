import { prisma } from '@/lib/prisma'
import CustomerHeader from '@/components/CustomerHeader'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export default async function Home() {
  const categories = await prisma.category.findMany({
    orderBy: { display_order: 'asc' },
    include: {
      products: {
        where: { is_active: true },
        take: 1,
      },
    },
  })

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />
      <Hero />

      {/* Categories Section */}
      <main className="flex-grow bg-gray-50" dir="rtl">
        <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              הקטגוריות שלנו
            </h2>
            <p className="text-lg text-gray-600">
              בחרו מתוך מגוון קטגוריות איכותיות
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
                  {category.products[0]?.image_url ? (
                    <Image
                      src={category.products[0].image_url}
                      alt={category.name_he}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl text-blue-400">🍽️</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name_he}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    לחצו לצפייה במוצרים
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              מוכנים להזמין?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              צרו איתנו קשר עוד היום ונדאג לכל הפרטים
            </p>
            <a
              href="https://wa.me/972"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 transition-colors shadow-lg"
            >
              הזמינו עכשיו בוואטסאפ
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
