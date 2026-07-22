import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "AI Ads Studio — زيت المشاط الأحمر",
  description: "Agence créative encodée : concepts, fidélité produit, créatives finies.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
