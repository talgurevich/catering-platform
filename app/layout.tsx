import type { Metadata } from "next";
import { Epilogue, Nunito } from 'next/font/google'
import Script from 'next/script'
import "./globals.css";
import { CartProvider } from '@/contexts/CartContext'
import QueryProvider from '@/components/QueryProvider'
import StructuredData from '@/components/StructuredData'

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-epilogue',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '400', '500', '700'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.breadstationakko.co.il'),
  title: {
    default: 'Bread Station Akko - קייטרינג מעכו | מגשי אירוח כשרים',
    template: '%s | Bread Station Akko'
  },
  description: 'קייטרינג מקצועי מעכו - מגשי אירוח, כריכים טריים, מאפים ביתיים ומנות לאירועים. כשר למהדרין בהשגחת הרבנות עכו. משלוחים בצפון - עכו, נהרייה, קריות.',
  keywords: [
    'קייטרינג עכו',
    'מגשי אירוח',
    'כריכים עכו',
    'מאפים ביתיים',
    'קייטרינג כשר',
    'אירועים עכו',
    'תחנת לחם',
    'bread station',
    'קייטרינג צפון',
    'משלוחים עכו',
    'חבילות אירוח',
    'מאפים כשרים',
  ],
  authors: [{ name: 'Bread Station Akko' }],
  creator: 'Bread Station Akko',
  publisher: 'Bread Station Akko',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://www.breadstationakko.co.il',
    title: 'Bread Station Akko - קייטרינג מעכו | מגשי אירוח כשרים',
    description: 'קייטרינג מקצועי מעכו - מגשי אירוח, כריכים טריים, מאפים ביתיים ומנות לאירועים. כשר למהדרין.',
    siteName: 'Bread Station Akko',
    images: [
      {
        url: '/images/breadstation-official-logo.png',
        width: 1200,
        height: 630,
        alt: 'Bread Station Akko - תחנת לחם עכו',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bread Station Akko - קייטרינג מעכו',
    description: 'קייטרינג מקצועי מעכו - מגשי אירוח כשרים למהדרין',
    images: ['/images/breadstation-official-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${epilogue.variable} ${nunito.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className={nunito.className}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-70386ER8ZK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-70386ER8ZK');
          `}
        </Script>

        <QueryProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
