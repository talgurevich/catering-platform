import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section
      className="relative text-white overflow-visible pb-20"
      dir="rtl"
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 60px), 90% calc(100% - 50px), 80% calc(100% - 42px), 70% calc(100% - 36px), 60% calc(100% - 32px), 50% calc(100% - 30px), 40% calc(100% - 32px), 30% calc(100% - 36px), 20% calc(100% - 42px), 10% calc(100% - 50px), 0 calc(100% - 60px))',
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Bread Station bakery background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
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
              {/* Corner banner */}
              <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-4 py-2 font-bold text-lg rounded-lg shadow-lg transform -rotate-6 border-2 border-gray-900">
                עכו
              </div>
            </div>
          </div>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            מגשי אירוח מושקעים • כריכים טריים • מאפים ביתיים
          </p>

          <p className="text-base md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            להזמנות מראש עם משלוח לאירוע
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="#categories"
              className="group w-full sm:w-auto px-10 py-4 bg-yellow-400 text-gray-900 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                הזמינו כאן
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

          {/* Features badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-5xl mx-auto w-full px-4">
            <div className="flex flex-col items-center justify-center px-6 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
              <svg className="w-12 h-12 text-yellow-400 mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white font-bold text-lg text-center">איכות פרימיום</span>
            </div>
            <div className="flex flex-col items-center justify-center px-6 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
              <svg className="w-12 h-12 text-yellow-400 mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z"/>
                <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z"/>
                <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"/>
              </svg>
              <span className="text-white font-bold text-lg text-center">משלוחים בצפון אזור עכו נהרייה קריות</span>
            </div>
            <div className="flex flex-col items-center justify-center px-6 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
              <svg className="w-12 h-12 text-yellow-400 mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-bold text-lg text-center">כשר למהדרין</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
