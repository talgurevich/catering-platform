import Link from 'next/link'
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import { HiLocationMarker } from 'react-icons/hi'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Location & Hours */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">מיקום ושעות פתיחה</h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-start gap-2">
                <HiLocationMarker className="text-xl mt-0.5 flex-shrink-0 text-yellow-400" />
                <div>
                  <p className="font-semibold text-white">תחנת לחם עכו</p>
                  <p>מתחם בנייני מקס</p>
                  <p>ברכה צפירה 3, עכו</p>
                </div>
              </div>
              <div className="pt-2">
                <p className="font-semibold text-white mb-2">שעות פתיחה:</p>
                <p>א׳ – ה׳ | 7:00 – 21:00</p>
                <p>יום שישי | 7:00 – 16:00</p>
                <p>שבת סגור</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">עקבו אחרינו</h3>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.instagram.com/bread_station_akko/?hl=he"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100092574669848"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xl" />
              </a>
              <a
                href="https://wa.me/972"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-xl" />
              </a>
            </div>
            <div className="text-gray-400 text-sm">
              <p className="font-semibold text-white mb-1">קייטרינג איכותי</p>
              <p>לכל אירוע ואירוח</p>
            </div>
          </div>

          {/* Accessibility */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">נגישות המסעדה</h3>
            <div className="space-y-1.5 text-gray-400 text-sm">
              <p className="flex items-center gap-2">
                <span className="text-green-400">✓</span> דלת נגישה
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-400">✓</span> רצף נגיש
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-400">✓</span> ריהוט נגיש
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-400">✓</span> חניית נכים
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-400">✓</span> שירותי נכים
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-400">✓</span> לולאת השראה
              </p>
            </div>
          </div>

          {/* Kosher Certification */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">כשרות</h3>
            <div className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-bold text-center mb-4">
              <div className="text-lg">כשר למהדרין</div>
              <div className="text-sm text-gray-600 mt-1">בד״ץ העדה החרדית</div>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <h3 className="font-heading text-xl font-bold mb-4 text-center">מצאו אותנו</h3>
          <div className="w-full h-64 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps?q=ברכה+צפירה+3+עכו&output=embed&hl=he"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="מיקום תחנת הלחם עכו"
            ></iframe>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} תחנת הלחם עכו. כל הזכויות שמורות.</p>
          <p className="mt-2 text-sm">
            אתר זה נבנה על ידי{' '}
            <a
              href="https://www.errn.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 transition-colors underline"
            >
              errn.io
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
