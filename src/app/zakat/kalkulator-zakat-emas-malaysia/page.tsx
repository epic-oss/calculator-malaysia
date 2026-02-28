import { Metadata } from "next";
import ZakatEmasCalculator from "@/components/ZakatEmasCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Kalkulator Zakat Emas Malaysia ${currentYear} - Kira Zakat Emas & Perak`,
  description: `Kalkulator zakat emas percuma. Kira zakat emas simpanan & perhiasan mengikut kadar uruf negeri. Nisab 85 gram, kadar 2.5%.`,
  keywords: [
    "kalkulator zakat emas",
    "zakat emas malaysia",
    "kira zakat emas",
    "nisab emas",
    "uruf emas",
    "zakat emas perhiasan",
    "zakat emas simpanan",
    "zakat perak",
    "kadar zakat emas",
    "cara kira zakat emas",
  ],
  openGraph: {
    title: `Kalkulator Zakat Emas Malaysia ${currentYear} - Kira Zakat Emas & Perak`,
    description: "Kira zakat emas simpanan & perhiasan mengikut kadar uruf negeri. Nisab 85 gram, kadar 2.5%.",
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
      "name": "Berapa nisab zakat emas 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nisab emas simpanan adalah 85 gram. Untuk emas perhiasan, ia bergantung kepada uruf negeri masing-masing."
      }
    },
    {
      "@type": "Question",
      "name": "Apa itu uruf dalam zakat emas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Uruf adalah kadar pemakaian emas yang dibenarkan tanpa dikenakan zakat. Ia berbeza mengikut negeri, contohnya 800g di Selangor dan 150g di Kedah."
      }
    },
    {
      "@type": "Question",
      "name": "Adakah emas 916 kena zakat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, semua jenis emas (999, 916, 750) wajib zakat jika cukup nisab dan haul."
      }
    },
    {
      "@type": "Question",
      "name": "Bagaimana kira zakat emas akaun simpanan (GAP/GIA)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jika akaun emas adalah fizikal (boleh dikeluarkan), kira seperti emas simpanan dengan nisab 85 gram."
      }
    },
    {
      "@type": "Question",
      "name": "Bolehkah bayar zakat emas secara online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, setiap negeri ada portal zakat online. Contoh: zakatselangor.com.my, zakat.com.my (PPZ)."
      }
    },
    {
      "@type": "Question",
      "name": "Bila waktu terbaik bayar zakat emas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Boleh bayar bila-bila masa selepas cukup haul. Ramai pilih Ramadan untuk gandakan ganjaran."
      }
    }
  ]
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `Kalkulator Zakat Emas Malaysia ${currentYear}`,
  "description": "Kira zakat emas simpanan dan perhiasan mengikut kadar uruf negeri di Malaysia",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MYR"
  }
};

export default function KalkulatorZakatEmasPage() {
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
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>›</span>
            <span className="text-slate-400">Zakat</span>
            <span>›</span>
            <span className="text-slate-900">Kalkulator Zakat Emas</span>
          </div>
        </div>
      </div>

      <ZakatEmasCalculator />

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
