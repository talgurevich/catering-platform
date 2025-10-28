import CustomerHeader from '@/components/CustomerHeader'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20" dir="rtl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-green-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
              צרו קשר
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              נשמח לשמוע מכם ולסייע בכל שאלה או הזמנה
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Phone */}
            <a
              href="tel:+972"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                טלפון
              </h3>
              <p className="text-gray-600 mb-4">התקשרו אלינו בכל שעה</p>
              <p className="text-xl font-bold text-blue-600 direction-ltr">
                +972-XX-XXX-XXXX
              </p>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/972"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                וואטסאפ
              </h3>
              <p className="text-gray-600 mb-4">שלחו לנו הודעה</p>
              <p className="text-xl font-bold text-green-600">
                לחצו לשליחת הודעה
              </p>
            </a>

            {/* Location */}
            <div className="group bg-gradient-to-br from-yellow-50 to-orange-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                מיקום
              </h3>
              <p className="text-gray-600 mb-4">בואו לבקר אותנו</p>
              <p className="text-lg font-bold text-gray-900">
                ברכה צפירה 1, עכו
              </p>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
                  שעות פעילות
                </span>
              </div>
              <h2 className="font-heading text-3xl font-bold text-gray-900">
                מתי אפשר להגיע?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 text-lg">ראשון - חמישי</span>
                  <span className="text-gray-600 text-lg direction-ltr">07:00 - 20:00</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 text-lg">שישי וערבי חג</span>
                  <span className="text-gray-600 text-lg direction-ltr">07:00 - 14:00</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 text-lg">שבת וחגים</span>
                  <span className="text-red-600 text-lg font-bold">סגור</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl text-center">
              <p className="text-blue-900 font-medium">
                <span className="font-bold">💡 שימו לב:</span> להזמנות גדולות מומלץ להזמין לפחות 2-3 ימי עסקים מראש
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              איך מגיעים אלינו?
            </h2>
            <p className="text-xl text-gray-600">
              אנחנו ממוקמים בלב עכו העתיקה, קרוב לכל האטרקציות
            </p>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-gray-600 font-medium">
                  Google Maps יוטמע כאן
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  ברכה צפירה 1, עכו
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white" dir="rtl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
                שאלות נפוצות
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">
              יש לכם שאלות?
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                כמה זמן לפני צריך להזמין?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                מומלץ להזמין לפחות 2-3 ימי עסקים מראש. להזמנות גדולות או מיוחדות, מומלץ להזמין שבוע מראש.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                האם יש משלוחים?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                כן! אנחנו מספקים שירותי משלוח לעכו והסביבה. עלות המשלוח תלויה במרחק ובגודל ההזמנה.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                האם כל המוצרים כשרים?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                כן, כל המוצרים שלנו כשרים למהדרין בהשגחת בד״ץ העדה החרדית.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                אפשר לבוא ולקחת בעצמי?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                בהחלט! אתם מוזמנים לבוא לחנות שלנו בברכה צפירה 1 בעכו ולאסוף את ההזמנה בעצמכם.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
