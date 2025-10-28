import type { Metadata } from "next";
import { Epilogue, Nunito } from 'next/font/google'
import "./globals.css";
import { CartProvider } from '@/contexts/CartContext'

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
  title: "Bread Station Akko - קייטרינג מעכו",
  description: "מגשי קייטרינג איכותיים מעכו - תחנת הלחם עכו",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${epilogue.variable} ${nunito.variable}`}>
      <body className={nunito.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
