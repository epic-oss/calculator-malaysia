import { Metadata } from "next";
import GoldPriceCalculator from "@/components/GoldPriceCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Kalkulator Harga Emas Malaysia ${currentYear} - Kira Nilai Emas 916 & 999`,
  description: `Kalkulator emas percuma. Kira nilai emas 916 dan 999 berdasarkan harga semasa. Semak harga emas hari ini dari Habib, Poh Kong, Public Gold.`,
  keywords: [
    "harga emas 916",
    "kalkulator emas",
    "harga emas hari ini",
    "gold price calculator malaysia",
    "harga emas 999",
    "kira harga emas",
    "emas 22 karat",
    "emas 24 karat",
    "gold calculator",
    "harga emas semasa",
  ],
  openGraph: {
    title: `Kalkulator Harga Emas Malaysia ${currentYear} - Kira Nilai Emas 916 & 999`,
    description: "Kira nilai emas 916 dan 999 berdasarkan harga semasa. Semak harga emas hari ini dari kedai emas popular.",
    type: "website",
    locale: "ms_MY",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Berapa harga emas 916 hari ini?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Harga emas 916 sekitar RM 540 per gram (Januari 2026). Harga berubah setiap hari mengikut pasaran dunia."
      }
    },
    {
      "@type": "Question",
      "name": "Apa maksud emas 916?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "916 bermaksud 91.6% emas tulen, bersamaan 22 karat. Baki 8.4% adalah logam lain untuk kekuatan."
      }
    },
    {
      "@type": "Question",
      "name": "Di mana boleh jual emas terpakai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Anda boleh jual di kedai emas (Habib, Poh Kong), Ar-Rahnu, atau kedai pajak gadai berlesen."
      }
    },
    {
      "@type": "Question",
      "name": "Berapa spread harga emas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Biasanya RM 10-20 per gram antara harga beli dan jual. Spread lebih kecil untuk emas 999."
      }
    },
    {
      "@type": "Question",
      "name": "Adakah emas 916 sesuai untuk pelaburan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Untuk pelaburan jangka panjang, emas 999 (gold bar) lebih sesuai kerana spread lebih kecil. Emas 916 lebih sesuai untuk barang kemas."
      }
    },
    {
      "@type": "Question",
      "name": "Bagaimana nak tahu emas tulen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Periksa cop ketulenan (916, 999), minta sijil, dan beli dari kedai berlesen sahaja."
      }
    }
  ]
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `Kalkulator Harga Emas Malaysia ${currentYear}`,
  "description": "Kira nilai emas 916 dan 999 berdasarkan harga semasa di Malaysia",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MYR"
  }
};

export default function GoldPriceCalculatorPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />

      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link
              href="/"
              className="hover:text-slate-900 transition-colors"
            >
              Utama
            </Link>
            <span>›</span>
            <span className="text-slate-400">Pelaburan</span>
            <span>›</span>
            <span className="text-slate-900">Kalkulator Harga Emas</span>
          </div>
        </div>
      </div>

      <GoldPriceCalculator />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.webp"
                alt="Calculator Malaysia"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-bold text-xl"><span className="text-blue-400">Calculator</span> <span className="text-red-400">Malaysia</span></span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                Semua Kalkulator
              </Link>
              <a href="/about" className="hover:text-white transition-colors">
                Tentang Kami
              </a>
              <a href="/contact" className="hover:text-white transition-colors">
                Hubungi
              </a>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privasi
              </a>
            </nav>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
            © {currentYear} Calculator Malaysia. Semua kalkulator percuma untuk digunakan.
          </div>
        </div>
      </footer>
    </div>
  );
}
