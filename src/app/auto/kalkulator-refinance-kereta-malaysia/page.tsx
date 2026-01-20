import { Metadata } from "next";
import CarRefinanceCalculatorBM from "@/components/CarRefinanceCalculatorBM";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Kalkulator Refinance Kereta Malaysia ${currentYear} - Kira Penjimatan Anda`,
  description: `Kalkulator refinance kereta percuma. Kira berapa anda boleh jimat dengan refinance pinjaman kereta. Bandingkan kadar dari pelbagai bank.`,
  keywords: [
    "kalkulator refinance kereta",
    "refinance kereta malaysia",
    "refinance pinjaman kereta",
    "car refinance calculator",
    "kira refinance kereta",
    "kadar faedah kereta",
    "pinjaman kereta",
    "refinance kenderaan",
  ],
  openGraph: {
    title: `Kalkulator Refinance Kereta Malaysia ${currentYear}`,
    description: "Kira berapa anda boleh jimat dengan refinance pinjaman kereta. Bandingkan kadar dari pelbagai bank.",
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
      "name": "Apakah usia maksimum kereta untuk refinance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kebanyakan bank memerlukan kereta berusia kurang daripada 10 tahun pada akhir tempoh pinjaman. Jadi kereta berusia 5 tahun boleh mendapat refinance maksimum 5 tahun."
      }
    },
    {
      "@type": "Question",
      "name": "Bolehkah saya refinance kereta di bawah sewa beli?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, kebanyakan pinjaman kereta di Malaysia adalah sewa beli. Bank baru akan menyelesaikan HP sedia ada anda."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah penalti penyelesaian awal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Biasanya 2-3% daripada baki pinjaman. Sesetengah bank mengecualikan ini untuk refinance kepada mereka."
      }
    },
    {
      "@type": "Question",
      "name": "Bolehkah saya refinance dan mendapat cash out?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, jika nilai kereta anda lebih tinggi daripada baki pinjaman. Anda boleh meminjam perbezaannya."
      }
    },
    {
      "@type": "Question",
      "name": "Adakah refinance akan menjejaskan skor kredit saya?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Akan ada semakan kredit baru, tetapi kesan minimum jika anda membayar tepat pada masanya."
      }
    },
    {
      "@type": "Question",
      "name": "Bagaimana jika pinjaman kereta saya sudah kadar rendah?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Refinance mungkin tidak berbaloi. Gunakan kalkulator kami untuk menyemak tempoh pulang modal."
      }
    }
  ]
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `Kalkulator Refinance Kereta Malaysia ${currentYear}`,
  "description": "Kira berapa anda boleh jimat dengan refinance pinjaman kereta di Malaysia",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MYR"
  }
};

export default function KalkulatorRefinanceKeretaPage() {
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
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Kembali ke Semua Kalkulator
          </Link>
        </div>
      </div>

      <CarRefinanceCalculatorBM />

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
