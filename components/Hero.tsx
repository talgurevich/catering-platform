import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-visible pb-20"
      dir="rtl"
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 60px), 90% calc(100% - 50px), 80% calc(100% - 42px), 70% calc(100% - 36px), 60% calc(100% - 32px), 50% calc(100% - 30px), 40% calc(100% - 32px), 30% calc(100% - 36px), 20% calc(100% - 42px), 10% calc(100% - 50px), 0 calc(100% - 60px))',
      }}
    >

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          {/* Large hero logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-4xl">
              <Image
                src="/images/breadstation-official-logo.png"
                alt="Bread Station Bakery"
                width={900}
                height={136}
                className="w-full h-auto"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))' }}
                priority
              />
            </div>
          </div>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            מגשי אירוח מושקעים • כריכים טריים • מאפים ביתיים
          </p>

          <p className="text-base md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            להזמנות מראש עם משלוח עד הבית בעכו והסביבה
          </p>

          {/* Features badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20 flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              איכות פרימיום
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20 flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              משלוחים בצפון אזור עכו נהרייה קריות
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20 flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              כשר למהדרין
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#categories"
              className="group w-full sm:w-auto px-10 py-4 bg-yellow-400 text-gray-900 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                צפו בתפריט המלא
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </span>
            </Link>
            <a
              href="https://wa.me/972502670040"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto px-10 py-4 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                הזמינו בוואטסאפ
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
