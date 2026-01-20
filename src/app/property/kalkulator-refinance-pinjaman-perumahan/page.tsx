import { Metadata } from "next";
import RefinanceCalculatorBM from "@/components/RefinanceCalculatorBM";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Kalkulator Refinance Pinjaman Rumah Malaysia ${currentYear} - Kira Penjimatan Anda`,
  description: `Kalkulator refinance percuma. Kira penjimatan refinance pinjaman perumahan anda. Bandingkan kadar faedah dari 15+ bank termasuk Maybank, CIMB, Public Bank.`,
  keywords: [
    "kalkulator refinance malaysia",
    "refinance pinjaman rumah",
    "kalkulator pinjaman perumahan",
    "refinance rumah malaysia",
    "kadar faedah refinance",
    "penjimatan refinance",
    "kira refinance pinjaman",
    "kalkulator refinance percuma",
  ],
  openGraph: {
    title: `Kalkulator Refinance Pinjaman Rumah Malaysia ${currentYear}`,
    description: "Kira berapa banyak anda boleh jimat dengan refinance pinjaman perumahan. Bandingkan kadar dari 15+ bank.",
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
      "name": "Berapa lama proses refinance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Biasanya 2-3 bulan dari permohonan hingga pengeluaran. Ini termasuk penilaian hartanah, dokumentasi undang-undang, dan pemprosesan pinjaman."
      }
    },
    {
      "@type": "Question",
      "name": "Boleh refinance jika masih dalam tempoh lock-in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, tetapi anda akan membayar penalti penyelesaian awal 2-3% daripada baki pinjaman. Kira sama ada penjimatan masih melebihi penalti ini."
      }
    },
    {
      "@type": "Question",
      "name": "Adakah refinance menjejaskan skor kredit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Akan ada pertanyaan kredit baru, tetapi kesannya minimum. Skor anda mungkin meningkat jika anda membuat bayaran tepat pada masanya untuk pinjaman baru."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah penjimatan minimum untuk refinance berbaloi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Secara amnya, sasarkan sekurang-kurangnya RM200-300 penjimatan bulanan dengan tempoh pulang modal di bawah 3 tahun."
      }
    },
    {
      "@type": "Question",
      "name": "Apa itu pakej Zero Entry Cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sesetengah bank di Malaysia menawarkan pakej 'Zero Moving Cost' atau 'Zero Entry Cost' di mana mereka menanggung yuran guaman, yuran penilaian, dan duti setem. Ini bermakna anda boleh refinance tanpa sebarang bayaran pendahuluan."
      }
    },
    {
      "@type": "Question",
      "name": "Apa beza refinance dengan repricing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Refinancing bermaksud memindahkan pinjaman ke bank lain dengan terma baru dan kos lebih tinggi (yuran guaman, duti setem). Repricing bermaksud merundingkan kadar lebih baik dengan bank semasa dengan kos minimum (yuran admin sahaja, ~RM200). Cuba repricing dahulu sebelum refinance."
      }
    }
  ]
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `Kalkulator Refinance Pinjaman Rumah Malaysia ${currentYear}`,
  "description": "Kira berapa banyak anda boleh jimat dengan refinance pinjaman perumahan di Malaysia",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MYR"
  }
};

export default function RefinanceCalculatorBMPage() {
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

      <RefinanceCalculatorBM />

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
            © {currentYear} Calculator Malaysia. Semua kalkulator adalah percuma.
          </div>
        </div>
      </footer>
    </div>
  );
}
