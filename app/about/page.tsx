import CustomerHeader from '@/components/CustomerHeader'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20" dir="rtl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
              אודות תחנת הלחם עכו
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              יותר מ-20 שנה של מסורת, איכות ואהבה למה שאנחנו עושים
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
                  הסיפור שלנו
                </span>
              </div>
              <h2 className="font-heading text-4xl font-bold text-gray-900 mb-6">
                מסורת משפחתית של מצוינות
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  תחנת הלחם עכו נוסדה לפני יותר מ-20 שנה מתוך אהבה אמיתית למאפייה ורצון לספק מוצרי קייטרינג איכותיים לתושבי עכו והסביבה.
                </p>
                <p>
                  מה שהתחיל כמאפייה משפחתית קטנה הפך עם השנים לאחת מהמאפיות המובילות בצפון, המספקת שירותי קייטרינג מקצועיים לאירועים, עסקים ואירוחים פרטיים.
                </p>
                <p>
                  אנחנו מאמינים שכל מוצר שיוצא מהתנור שלנו צריך להיות מושלם - טרי, טעים ומוכן באהבה. המתכונים שלנו משלבים מסורת משפחתית עם חדשנות מתמדת.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-9xl">🏪</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
                הערכים שלנו
              </span>
            </div>
            <h2 className="font-heading text-4xl font-bold text-gray-900">
              מה שמניע אותנו
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                איכות ללא פשרות
              </h3>
              <p className="text-gray-600 leading-relaxed">
                אנחנו משתמשים רק בחומרי גלם איכותיים ובמתכונים מוכחים. כל מוצר עובר בדיקת איכות קפדנית לפני שהוא מגיע אליכם.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                שירות אישי
              </h3>
              <p className="text-gray-600 leading-relaxed">
                אנחנו מקדישים תשומת לב אישית לכל לקוח ולכל הזמנה. הצוות שלנו כאן כדי לוודא שהאירוח שלכם יהיה מושלם.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                חדשנות ומסורת
              </h3>
              <p className="text-gray-600 leading-relaxed">
                אנחנו משלבים מתכונים מסורתיים עם טכניקות מודרניות ורעיונות חדשניים, כדי להציע לכם את הטוב ביותר משני העולמות.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kosher Certification */}
      <section className="py-20 bg-white" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-center text-white">
            <div className="text-6xl mb-6">✡️</div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              כשרות למהדרין
            </h2>
            <p className="text-xl text-gray-300 mb-2">
              רבנות עכו
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              כל המוצרים שלנו מיוצרים תחת השגחה קפדנית ועומדים בסטנדרטים הגבוהים ביותר של כשרות
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            בואו נכיר!
          </h2>
          <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            נשמח לראות אתכם בחנות שלנו בברכה צפירה 1 בעכו, או לשוחח איתכם על ההזמנה הבאה שלכם
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-10 py-5 bg-gray-900 text-white rounded-xl font-bold text-xl hover:bg-gray-800 transition-all duration-300 shadow-xl hover:scale-105"
            >
              צרו קשר
            </Link>
            <Link
              href="/"
              className="px-10 py-5 bg-white text-gray-900 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:scale-105"
            >
              חזרה לתפריט
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
