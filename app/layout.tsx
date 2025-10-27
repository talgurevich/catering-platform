import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="he" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}
