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
      <main className="flex-grow bg-gradient-to-b from-gray-50 to-white" dir="rtl">
        <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold uppercase tracking-wide">
                התפריט שלנו
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              הקטגוריות שלנו
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              בחרו מתוך מגוון רחב של מוצרים איכותיים
              <br className="hidden sm:block" />
              מוכנים במיוחד עבורכם
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="aspect-video bg-gradient-to-br from-yellow-100 to-orange-100 relative overflow-hidden">
                  {category.products[0]?.image_url ? (
                    <Image
                      src={category.products[0].image_url}
                      alt={category.name_he}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-200 to-orange-200">
                      <span className="text-7xl filter drop-shadow-lg">🍽️</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                    {category.name_he}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <span>לחצו לצפייה במוצרים</span>
                    <svg className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-400 rounded-full filter blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
                התקשרו עכשיו
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              מוכנים להזמין?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              צרו איתנו קשר עוד היום ונדאג לכל הפרטים
              <br className="hidden sm:block" />
              זמינים עבורכם בכל שעה
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/972"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto px-10 py-5 bg-green-500 text-white rounded-xl font-bold text-xl hover:bg-green-600 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 hover:scale-105"
              >
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  הזמינו בוואטסאפ
                </span>
              </a>

              <a
                href="tel:+972"
                className="group w-full sm:w-auto px-10 py-5 bg-white text-gray-900 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105"
              >
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
