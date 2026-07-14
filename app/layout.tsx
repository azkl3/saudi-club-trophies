import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "خزانة البطولات السعودية",
  description: "موسوعة تفاعلية موثقة لبطولات أندية كرة القدم السعودية",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
