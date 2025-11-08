import CustomerHeader from '@/components/CustomerHeader'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'חבילות ואירועים | BreadStation Akko',
  description: 'חבילות קייטרינג ומגשי אירוח לכל סוגי האירועים - ימי הולדת, אירועים עסקיים, חגיגות משפחתיות ועוד',
}

export const dynamic = 'force-dynamic'

export default async function EventsPage() {
  // Fetch active bundles
  const bundles = await prisma.bundle.findMany({
    where: { is_active: true },
    orderBy: [
      { is_featured: 'desc' },
      { display_order: 'asc' },
      { created_at: 'desc' }
    ]
  })
  const eventTypes = [
    {
      icon: '🎂',
      title: 'ימי הולדת',
      description: 'מגשי אירוח מיוחדים לחגיגות יום הולדת בכל גודל'
    },
    {
      icon: '💼',
      title: 'אירועים עסקיים',
      description: 'פתרונות קייטרינג מקצועיים לישיבות, כנסים והשקות'
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'אירועי משפחה',
      description: 'בר/בת מצווה, ברית, חגים ומפגשים משפחתיים'
    },
    {
      icon: '🎓',
      title: 'אירועי בית ספר',
      description: 'סיום שנה, מסיבות כיתה ואירועים חינוכיים'
    },
    {
      icon: '🏢',
      title: 'אירועי חברה',
      description: 'ימי גיבוש, מסיבות חברה וחגיגות צוות'
    },
    {
      icon: '🎉',
      title: 'אירועים מיוחדים',
      description: 'חתונות, אירוסין וכל אירוע שמחה'
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden" dir="rtl">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-orange-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold uppercase tracking-wide">
                חבילות קייטרינג לאירועים
              </span>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">
              האירוע שלכם,
              <br />
              <span className="text-yellow-400">בידיים הטובות ביותר</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              קייטרינג מקצועי והכנת אירועים לכל סוגי האירועים
              <br className="hidden sm:block" />
              מימי הולדת ועד אירועים עסקיים גדולים
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/972502670040"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto px-10 py-5 bg-green-500 text-white rounded-xl font-bold text-xl hover:bg-green-600 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 hover:scale-105"
              >
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  שלחו הודעה בוואטסאפ
                </span>
              </a>

              <a
                href="tel:+972502670040"
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
      </section>

      {/* Bundles Section */}
      {bundles.length > 0 && (
        <section className="bg-white py-20" dir="rtl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold uppercase tracking-wide">
                  החבילות שלנו
                </span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                חבילות אירוח מוכנות
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                חבילות מושלמות לכל סוג של אירוע - הכל כלול ומוכן
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bundles.map((bundle) => (
                <Link
                  key={bundle.id}
                  href={`/bundles/${bundle.slug}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 block"
                >
                  {/* Bundle Image */}
                  <div className="aspect-video bg-gradient-to-br from-yellow-100 to-orange-100 relative overflow-hidden">
                    {bundle.image_url ? (
                      <Image
                        src={bundle.image_url}
                        alt={bundle.name_he}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-200 to-orange-200">
                        <span className="text-7xl filter drop-shadow-lg">🎁</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Featured badge */}
                    {bundle.is_featured && (
                      <div className="absolute top-4 right-4 px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold shadow-lg">
                        מומלץ
                      </div>
                    )}
                  </div>

                  {/* Bundle Info */}
                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                      {bundle.name_he}
                    </h3>

                    {bundle.short_description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {bundle.short_description}
                      </p>
                    )}

                    <div className="flex items-baseline gap-2 mb-5">
                      <span className="text-3xl font-bold text-gray-900">
                        ₪{bundle.price.toString()}
                      </span>
                      {bundle.serves_people && (
                        <span className="text-gray-500 text-sm">
                          / ל-{bundle.serves_people} אנשים
                        </span>
                      )}
                    </div>

                    {/* Prep Time Notice */}
                    {bundle.prep_time_days > 0 && (
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
                        זמן הכנה: {bundle.prep_time_days} ימים מראש
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Event Types Section */}
      <section className="bg-white py-20" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold uppercase tracking-wide">
                אנחנו כאן בשבילכם
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              לכל סוג של אירוע
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              מניסיון של שנים, אנחנו מכירים את הצרכים המיוחדים של כל סוג אירוע
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventTypes.map((event, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-6xl mb-4">{event.icon}</div>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                  {event.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold uppercase tracking-wide">
                למה לבחור בנו?
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              השירות המלא שלנו
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">מוצרים טריים ואיכותיים</h3>
                <p className="text-gray-600">כל המוצרים שלנו מוכנים בטריות מקסימלית מחומרי גלם איכותיים</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">אמינות והגעה בזמן</h3>
                <p className="text-gray-600">אנחנו מבינים שזמן זה קריטי באירועים ומתחייבים להגיע בזמן</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">התאמה אישית</h3>
                <p className="text-gray-600">נתאים את התפריט והמגשים בדיוק לצרכים שלכם ולתקציב</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">ליווי מקצועי</h3>
                <p className="text-gray-600">נלווה אתכם לאורך כל התהליך ונדאג שהאירוע יעבור בצורה מושלמת</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Images Gallery - Placeholder */}
      <section className="bg-white py-20" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold uppercase tracking-wide">
                הגלריה שלנו
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              אירועים שביצענו
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              כמה דוגמאות לאירועים מוצלחים שהפקנו
            </p>
          </div>

          {/* Event Images Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="aspect-square bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl overflow-hidden relative shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <Image
                  src={`/images/events/event-${num}.jpg`}
                  alt={`אירוע ${num}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 overflow-hidden">
        {/* Solid background to cover any parallax */}
        <div className="absolute inset-0 bg-gray-900"></div>

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" dir="rtl">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
              מתכננים אירוע?
            </span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            בואו נתכנן את האירוע המושלם שלכם
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            צרו איתנו קשר עוד היום לייעוץ חינם
            <br className="hidden sm:block" />
            ונתחיל להכין את האירוע הבא שלכם
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/972502670040"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto px-10 py-5 bg-green-500 text-white rounded-xl font-bold text-xl hover:bg-green-600 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-3">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                שלחו הודעה בוואטסאפ
              </span>
            </a>

            <a
              href="tel:+972502670040"
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

          <div className="mt-12 pt-12 border-t border-gray-700">
            <p className="text-gray-400 mb-4">או בקרו אותנו:</p>
            <Link
              href="/#categories"
              className="inline-block px-8 py-4 border-2 border-yellow-400 text-yellow-400 rounded-xl font-bold hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300"
            >
              עיינו בתפריט המלא שלנו
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
