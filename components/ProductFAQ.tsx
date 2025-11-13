'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'כמה זמן מראש צריך להזמין?',
    answer: 'מומלץ להזמין לפחות 2-3 ימי עסקים מראש. למוצרים מסוימים עם זמן הכנה ארוך יותר, נדרש להזמין מראש בהתאם לזמן ההכנה המצוין בדף המוצר.',
  },
  {
    question: 'איך מתבצע המשלוח?',
    answer: 'אנחנו מספקים שירות משלוח לכל האזור. עלות המשלוח משתנה בהתאם למרחק ולגודל ההזמנה. ניתן גם לאסוף את ההזמנה ישירות מהחנות שלנו בעכו.',
  },
  {
    question: 'האם המוצרים כשרים?',
    answer: 'כן, כל המוצרים שלנו כשרים למהדרין בהשגחת הרבנות עכו. אנחנו שומרים על סטנדרטים גבוהים של כשרות בכל תהליכי ההכנה.',
  },
  {
    question: 'האם אפשר לבטל או לשנות הזמנה?',
    answer: 'ניתן לשנות או לבטל הזמנה עד 48 שעות לפני מועד האיסוף/המשלוח. לשינויים או ביטולים, נא ליצור קשר בטלפון או בוואטסאפ.',
  },
  {
    question: 'מה כוללת המנה?',
    answer: 'כל מוצר מגיע עם תיאור מפורט של הרכיבים וגודל המנה. במידה ויש שאלות נוספות לגבי המנה, הצוות שלנו זמין לעזור ולהסביר בדיוק מה כלול.',
  },
  {
    question: 'האם אתם מטפלים באלרגיות ודרישות תזונה מיוחדות?',
    answer: 'בהחלט! אנחנו יכולים להתאים מוצרים לדרישות תזונה מיוחדות. כל מוצר מציין את האלרגנים שבו, ואפשר לפנות אלינו לשאלות ספציפיות או בקשות התאמה.',
  },
  {
    question: 'איך משלמים?',
    answer: 'אנחנו מקבלים תשלום במזומן, כרטיסי אשראי (ויזה, מאסטרקארד, אמריקן אקספרס), Apple Pay ו-Google Pay. התשלום מתבצע בעת האיסוף או בעת המשלוח.',
  },
  {
    question: 'מה המדיניות להחזרת מוצרים?',
    answer: 'אנחנו מחויבים לאיכות הגבוהה ביותר. אם יש בעיה כלשהי עם ההזמנה, נא ליצור קשר מיד ונפתור את הנושא. שביעות רצונכם חשובה לנו.',
  },
  {
    question: 'האם אפשר להזמין כמויות גדולות לאירועים?',
    answer: 'בהחלט! אנחנו מתמחים בקייטרינג לאירועים גדולים. ניתן להזמין כמויות גדולות של כל המוצרים שלנו. למידע נוסף ולהצעת מחיר מיוחדת, צרו קשר טלפוני או בוואטסאפ.',
  },
  {
    question: 'איך יודעים שהמזון טרי?',
    answer: 'כל המוצרים שלנו מוכנים טרי מדי יום ממרכיבים איכותיים. אנחנו מקפידים על טריות ואיכות בכל שלב של ההכנה, ומשתמשים רק בחומרי גלם טריים ואיכותיים.',
  },
]

export default function ProductFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
          שאלות נפוצות
        </h2>
        <p className="text-gray-600 text-center mb-8">
          מצאו תשובות לשאלות הנפוצות ביותר על המוצרים והשירותים שלנו
        </p>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-right hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-bold text-lg text-gray-900 pr-3">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-yellow-600 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 pt-2">
                  <p className="text-gray-700 leading-relaxed pr-3">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">לא מצאתם את התשובה שחיפשתם?</p>
          <a
            href="https://wa.me/972502670040"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors"
          >
            <span>צרו קשר בוואטסאפ</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
