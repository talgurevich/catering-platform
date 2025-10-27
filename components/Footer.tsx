import Link from 'next/link'
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import { HiLocationMarker } from 'react-icons/hi'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">תחנת הלחם עכו</h3>
            <p className="text-gray-400 mb-4">
              קייטרינג איכותי לכל אירוע
            </p>
            <div className="flex items-start gap-2 text-gray-400">
              <HiLocationMarker className="text-xl mt-1 flex-shrink-0" />
              <span>ברכה צפירה 1, עכו</span>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">עקבו אחרינו</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://facebook.com"
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
          </div>

          {/* Kosher Certification */}
          <div>
            <h3 className="text-xl font-bold mb-4">כשרות</h3>
            <div className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-bold text-center">
              <div className="text-lg">כשר למהדרין</div>
              <div className="text-sm text-gray-600 mt-1">בד״ץ העדה החרדית</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} תחנת הלחם עכו. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  )
}
