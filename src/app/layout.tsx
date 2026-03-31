import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mapa Cen Remontów | zaileremont.pl",
  description:
    "Kompleksowa analiza cen remontów i budowy w Polsce. Kalkulator kosztów, mapa cen, poradniki eksperckie. Dane rzeczywiste, algorytm, aktualne trendy.",
  keywords: [
    "ceny remontów",
    "kalkulator remontów",
    "koszt remontu",
    "mapa cen",
    "remont domu",
    "remont mieszkania",
  ],
  authors: [{ name: "zaileremont.pl" }],
  creator: "zaileremont.pl",
  publisher: "zaileremont.pl",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://zaileremont.pl",
    siteName: "zaileremont.pl",
    title: "Mapa Cen Remontów | zaileremont.pl",
    description:
      "Kompleksowa analiza cen remontów i budowy w Polsce. Kalkulator kosztów, mapa cen, poradniki eksperckie.",
    images: [
      {
        url: "https://zaileremont.pl/og-image.png",
        width: 1200,
        height: 630,
        alt: "zaileremont.pl - Mapa Cen Remontów",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mapa Cen Remontów | zaileremont.pl",
    description:
      "Kompleksowa analiza cen remontów i budowy w Polsce.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://zaileremont.pl",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "zaileremont.pl",
    "url": "https://zaileremont.pl",
    "description": "Kompleksowa analiza cen remontów i budowy w Polsce",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://zaileremont.pl/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1e40af" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.variable} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
