import { Metadata } from "next";
import PersonalLoanRefinanceCalculatorBM from "@/components/PersonalLoanRefinanceCalculatorBM";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Kalkulator Refinance Pinjaman Peribadi Malaysia ${currentYear} - Kira Penjimatan`,
  description: `Kalkulator refinance pinjaman peribadi percuma. Kira berapa anda boleh jimat dengan menggabungkan hutang faedah tinggi. Bandingkan kadar dari 15+ bank.`,
  keywords: [
    "kalkulator refinance pinjaman peribadi",
    "gabungan hutang malaysia",
    "kalkulator pinjaman peribadi",
    "gabung hutang kad kredit",
    "refinance pinjaman peribadi",
    "pinjaman gabungan hutang",
    "bandingkan kadar pinjaman peribadi",
    "kalkulator pinjaman malaysia",
  ],
  openGraph: {
    title: `Kalkulator Refinance Pinjaman Peribadi Malaysia ${currentYear}`,
    description: "Kira berapa anda boleh jimat dengan menggabungkan hutang faedah tinggi. Bandingkan kadar dari 15+ bank.",
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
      "name": "Apakah perbezaan antara refinance dan gabungan hutang?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ia hampir sama. Refinance biasanya bermaksud menggantikan SATU pinjaman dengan yang lebih baik. Gabungan hutang bermaksud menggabungkan PELBAGAI hutang menjadi satu pinjaman."
      }
    },
    {
      "@type": "Question",
      "name": "Adakah gabungan hutang akan menjejaskan skor kredit saya?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dalam jangka pendek, ada sedikit penurunan daripada semakan kredit. Dalam jangka panjang, ia boleh memperbaiki skor anda jika anda membayar tepat pada masanya."
      }
    },
    {
      "@type": "Question",
      "name": "Bolehkah saya gabungkan hutang dengan kredit buruk?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ia lebih sukar, tetapi sesetengah pemberi pinjaman seperti AEON Credit mempunyai kelulusan lebih mudah. Kadar faedah akan lebih tinggi."
      }
    },
    {
      "@type": "Question",
      "name": "Patutkah saya gabungkan hutang kecil?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Biasanya tidak berbaloi untuk hutang bawah RM5,000 jumlah. Yuran pemprosesan mungkin melebihi penjimatan."
      }
    },
    {
      "@type": "Question",
      "name": "Apa jadi kepada kad kredit saya selepas gabungan hutang?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ia kekal aktif kecuali anda menutupnya. Berhati-hati untuk tidak menambah hutang baru!"
      }
    },
    {
      "@type": "Question",
      "name": "Adakah 0% balance transfer lebih baik daripada pinjaman gabungan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "0% balance transfer bagus untuk jangka pendek, biasanya hanya 6-12 bulan. Pinjaman gabungan lebih baik untuk jumlah lebih besar yang memerlukan tempoh bayaran lebih lama."
      }
    }
  ]
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `Kalkulator Refinance Pinjaman Peribadi Malaysia ${currentYear}`,
  "description": "Kira berapa anda boleh jimat dengan menggabungkan hutang faedah tinggi di Malaysia",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MYR"
  }
};

export default function KalkulatorRefinancePinjamanPeribadiPage() {
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
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span>&rsaquo;</span>
            <Link href="/loan" className="hover:text-slate-900 transition-colors">
              Loans
            </Link>
            <span>&rsaquo;</span>
            <span className="text-slate-900">Refinance Pinjaman Peribadi</span>
          </div>
        </div>
      </div>

      <PersonalLoanRefinanceCalculatorBM />

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
