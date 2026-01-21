import { Metadata } from "next";
import KitchenRenovationCalculator from "@/components/KitchenRenovationCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Kalkulator Kos Renovate Dapur Malaysia ${currentYear} | Calculator Malaysia`,
  description: `Kira anggaran kos renovasi dapur anda. Bandingkan harga kabinet laminate, kayu solid & aluminium. Kalkulator percuma untuk KL/Selangor.`,
  keywords: [
    "kos renovate dapur",
    "kalkulator renovasi dapur",
    "harga kabinet dapur malaysia",
    "kos kabinet dapur",
    "renovate dapur murah",
    "harga countertop dapur",
    "kontraktor dapur selangor",
    "bajet renovasi dapur",
    "kos pasang kabinet",
    "harga granite dapur",
  ],
  openGraph: {
    title: `Kalkulator Kos Renovate Dapur Malaysia ${currentYear}`,
    description: "Kira anggaran kos renovasi dapur anda. Bandingkan harga kabinet & countertop.",
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
      "name": "Berapa kos renovate dapur di Malaysia 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kos renovasi dapur di Malaysia bermula dari RM8,000 untuk bajet rendah, RM15,000-35,000 untuk sederhana, dan RM35,000+ untuk premium. Harga bergantung kepada saiz, jenis kabinet, dan tahap kemasan."
      }
    },
    {
      "@type": "Question",
      "name": "Berapa harga kabinet dapur laminate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Harga kabinet dapur laminate adalah sekitar RM80-120 per kaki persegi di Malaysia. Untuk dapur 100 kaki persegi, anggarkan RM8,000-12,000 untuk kabinet sahaja."
      }
    },
    {
      "@type": "Question",
      "name": "Countertop mana yang paling berbaloi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Granite lokal adalah pilihan paling berbaloi dengan harga RM150-250 per kaki persegi. Ia tahan lasak dan senang dijaga. Quartz lebih mahal (RM250-400) tetapi lebih tahan kotoran."
      }
    },
    {
      "@type": "Question",
      "name": "Berapa lama tempoh renovasi dapur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tempoh renovasi dapur biasanya 2-4 minggu untuk projek standard. Projek besar dengan perubahan struktur boleh mengambil masa 6-8 minggu."
      }
    },
    {
      "@type": "Question",
      "name": "Adakah perlu permit untuk renovate dapur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Untuk renovasi kosmetik (kabinet, countertop, jubin), permit tidak diperlukan. Tetapi jika melibatkan perubahan struktur, paip utama, atau elektrikal besar, permit dari PBT mungkin diperlukan."
      }
    }
  ]
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `Kalkulator Kos Renovate Dapur Malaysia ${currentYear}`,
  "description": "Kira anggaran kos renovasi dapur berdasarkan saiz, jenis kabinet, dan tahap kemasan",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MYR"
  }
};

export default function KalkulatorKosRenovateDapurPage() {
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
              Utama
            </Link>
            <span>›</span>
            <span className="text-slate-400">Renovasi</span>
            <span>›</span>
            <span className="text-slate-900">Kalkulator Kos Renovate Dapur</span>
          </div>
        </div>
      </div>

      <KitchenRenovationCalculator locale="bm" />

      {/* SEO Content Section */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Section 1: Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Berapa Kos Renovate Dapur di Malaysia {currentYear}?
            </h2>
            <p className="text-slate-600 mb-4">
              Renovasi dapur adalah salah satu projek penambahbaikan rumah yang paling popular di Malaysia. Dapur yang cantik dan berfungsi bukan sahaja meningkatkan pengalaman memasak, malah turut menaikkan nilai hartanah anda.
            </p>
            <p className="text-slate-600 mb-4">
              Berdasarkan data pasaran {currentYear}, berikut adalah anggaran kos renovasi dapur mengikut tahap bajet:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <h3 className="font-bold text-emerald-800 mb-2">Bajet Rendah</h3>
                <p className="text-2xl font-bold text-emerald-700 mb-1">RM8,000 - RM15,000</p>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• Kabinet laminate</li>
                  <li>• Granite lokal/konkrit</li>
                  <li>• Kemasan asas</li>
                </ul>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <h3 className="font-bold text-amber-800 mb-2">Bajet Sederhana</h3>
                <p className="text-2xl font-bold text-amber-700 mb-1">RM15,000 - RM35,000</p>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Kabinet kayu/aluminium</li>
                  <li>• Quartz countertop</li>
                  <li>• Kemasan standard</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-2">Bajet Premium</h3>
                <p className="text-2xl font-bold text-blue-700 mb-1">RM35,000+</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Kabinet kayu solid</li>
                  <li>• Marble/quartz premium</li>
                  <li>• Kemasan mewah</li>
                </ul>
              </div>
            </div>
            <p className="text-slate-600">
              Harga di atas adalah untuk kawasan Lembah Klang. Kawasan lain mungkin berbeza 10-20% bergantung kepada kos buruh dan pengangkutan bahan.
            </p>
          </section>

          {/* Section 2: Factors */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Faktor Yang Mempengaruhi Kos Renovasi Dapur
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">1. Saiz Dapur</h3>
                <p className="text-slate-600">
                  Saiz dapur adalah faktor utama yang menentukan kos. Dapur kecil (50-80 kaki persegi) memerlukan kurang kabinet dan bahan, manakala dapur besar (150+ kaki persegi) memerlukan lebih banyak pelaburan. Secara purata, dapur apartment di Malaysia adalah 80-120 kaki persegi.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">2. Jenis Material</h3>
                <p className="text-slate-600">
                  Pemilihan bahan adalah 60-70% daripada jumlah kos. Kabinet laminate adalah paling murah tetapi kurang tahan lama berbanding aluminium atau kayu solid. Countertop marble lebih mahal tetapi lebih premium berbanding granite lokal.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">3. Kos Buruh</h3>
                <p className="text-slate-600">
                  Upah pemasangan berbeza mengikut lokasi dan kerumitan projek. Kontraktor di KL biasanya lebih mahal 15-20% berbanding Selangor pinggir. Kerja yang melibatkan hacking dan pendawaian semula akan menambah kos.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">4. Lokasi</h3>
                <p className="text-slate-600">
                  Rumah bertingkat (condo, apartment) mungkin memerlukan kos tambahan untuk pengangkutan bahan dan kelulusan pihak pengurusan. Rumah landed lebih mudah untuk kerja-kerja renovasi besar.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Cabinet Comparison */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Jenis Kabinet Dapur & Harga {currentYear}
            </h2>
            <p className="text-slate-600 mb-4">
              Kabinet adalah komponen terbesar dalam kos renovasi dapur. Berikut adalah perbandingan jenis kabinet yang popular di Malaysia:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left py-3 px-4 font-bold text-slate-700">Jenis Kabinet</th>
                    <th className="text-center py-3 px-4 font-bold text-slate-700">Harga (RM/kaki²)</th>
                    <th className="text-center py-3 px-4 font-bold text-slate-700">Ketahanan</th>
                    <th className="text-left py-3 px-4 font-bold text-slate-700">Kelebihan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium">Laminate</td>
                    <td className="py-3 px-4 text-center">RM80 - RM120</td>
                    <td className="py-3 px-4 text-center">5-10 tahun</td>
                    <td className="py-3 px-4 text-slate-600">Murah, pelbagai warna, senang dijaga</td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <td className="py-3 px-4 font-medium">Aluminium</td>
                    <td className="py-3 px-4 text-center">RM100 - RM150</td>
                    <td className="py-3 px-4 text-center">15-20 tahun</td>
                    <td className="py-3 px-4 text-slate-600">Tahan air & anai-anai, moden, tahan lama</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Kayu Solid</td>
                    <td className="py-3 px-4 text-center">RM150 - RM250</td>
                    <td className="py-3 px-4 text-center">20+ tahun</td>
                    <td className="py-3 px-4 text-slate-600">Premium, klasik, boleh dicat semula</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 mt-3">
              * Harga termasuk hardware asas. Soft-close hinges dan accessories premium akan menambah kos.
            </p>
          </section>

          {/* Section 4: Countertop Comparison */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Jenis Countertop & Perbandingan Harga
            </h2>
            <p className="text-slate-600 mb-4">
              Countertop adalah permukaan kerja utama di dapur. Pilihan yang tepat bergantung kepada bajet dan gaya hidup anda:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left py-3 px-4 font-bold text-slate-700">Jenis Countertop</th>
                    <th className="text-center py-3 px-4 font-bold text-slate-700">Harga (RM/kaki²)</th>
                    <th className="text-center py-3 px-4 font-bold text-slate-700">Penjagaan</th>
                    <th className="text-left py-3 px-4 font-bold text-slate-700">Sesuai Untuk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium">Konkrit/Simen</td>
                    <td className="py-3 px-4 text-center">RM80 - RM150</td>
                    <td className="py-3 px-4 text-center">Rendah</td>
                    <td className="py-3 px-4 text-slate-600">Bajet rendah, gaya industrial</td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <td className="py-3 px-4 font-medium">Granite Lokal</td>
                    <td className="py-3 px-4 text-center">RM150 - RM250</td>
                    <td className="py-3 px-4 text-center">Sederhana</td>
                    <td className="py-3 px-4 text-slate-600">Nilai terbaik, tahan lasak</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium">Quartz</td>
                    <td className="py-3 px-4 text-center">RM250 - RM400</td>
                    <td className="py-3 px-4 text-center">Sangat Rendah</td>
                    <td className="py-3 px-4 text-slate-600">Sibuk, keluarga, tahan kotoran</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="py-3 px-4 font-medium">Marble</td>
                    <td className="py-3 px-4 text-center">RM300 - RM500</td>
                    <td className="py-3 px-4 text-center">Tinggi</td>
                    <td className="py-3 px-4 text-slate-600">Mewah, baker, dekorasi</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Hidden Costs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Kos Tersembunyi Yang Ramai Terlepas Pandang
            </h2>
            <p className="text-slate-600 mb-4">
              Selain kos utama, terdapat beberapa kos tambahan yang sering tidak dijangka:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h3 className="font-bold text-red-800 mb-2">Kerja Hacking</h3>
                <p className="text-sm text-red-700">
                  Jika perlu pecahkan jubin lama atau ubah layout, kos hacking boleh mencecah RM1,000-3,000 bergantung kepada skop kerja.
                </p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h3 className="font-bold text-red-800 mb-2">Pendawaian Elektrik</h3>
                <p className="text-sm text-red-700">
                  Tambah point elektrik untuk peralatan baru (oven, microwave) boleh menambah RM500-1,500 untuk kerja wiring.
                </p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h3 className="font-bold text-red-800 mb-2">Pembuangan Sisa</h3>
                <p className="text-sm text-red-700">
                  Kos angkut dan buang kabinet/jubin lama ke tapak pelupusan: RM300-800.
                </p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h3 className="font-bold text-red-800 mb-2">Kerja Paip</h3>
                <p className="text-sm text-red-700">
                  Ubah kedudukan sinki atau tambah point air (dishwasher, water filter) boleh menambah RM500-2,000.
                </p>
              </div>
            </div>
            <div className="mt-4 bg-amber-50 rounded-xl p-4 border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Tip:</strong> Sediakan bajet contingency 10-15% untuk kos tidak dijangka. Lebih baik lebih daripada kurang!
              </p>
            </div>
          </section>

          {/* Section 6: Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Tips Jimat Kos Renovasi Dapur
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <span className="text-emerald-600 font-bold text-lg">1.</span>
                <div>
                  <h3 className="font-bold text-emerald-800">Kekalkan Layout Asal</h3>
                  <p className="text-sm text-emerald-700">Elak ubah kedudukan sinki dan dapur gas. Ini akan jimat kos plumbing dan gas piping yang mahal.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <span className="text-emerald-600 font-bold text-lg">2.</span>
                <div>
                  <h3 className="font-bold text-emerald-800">Pilih Material Bijak</h3>
                  <p className="text-sm text-emerald-700">Laminate untuk kabinet dan granite lokal untuk countertop memberikan nilai terbaik untuk wang anda.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <span className="text-emerald-600 font-bold text-lg">3.</span>
                <div>
                  <h3 className="font-bold text-emerald-800">Banding Harga 3 Kontraktor</h3>
                  <p className="text-sm text-emerald-700">Dapatkan sekurang-kurangnya 3 sebut harga untuk bandingkan. Pastikan skop kerja sama untuk perbandingan adil.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <span className="text-emerald-600 font-bold text-lg">4.</span>
                <div>
                  <h3 className="font-bold text-emerald-800">Renovate Off-Peak</h3>
                  <p className="text-sm text-emerald-700">Elak renovate semasa CNY atau Raya. Kontraktor kurang sibuk pada bulan Jan-Mac dan Julai-Sept.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <span className="text-emerald-600 font-bold text-lg">5.</span>
                <div>
                  <h3 className="font-bold text-emerald-800">Beli Peralatan Sendiri</h3>
                  <p className="text-sm text-emerald-700">Sinki, hood, dan hob boleh dibeli sendiri dari kedai hardware untuk harga lebih murah. Kontraktor biasanya markup 20-30%.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <span className="text-emerald-600 font-bold text-lg">6.</span>
                <div>
                  <h3 className="font-bold text-emerald-800">Guna Semula Yang Boleh</h3>
                  <p className="text-sm text-emerald-700">Jika kabinet lama masih kukuh, pertimbangkan reface (tukar pintu sahaja) berbanding ganti semua.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: DIY vs Contractor */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Bila Perlu Upah Kontraktor vs DIY?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-3">Upah Kontraktor</h3>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>✓ Kerja kabinet dan countertop</li>
                  <li>✓ Pemasangan elektrik dan paip</li>
                  <li>✓ Kerja jubin dan hacking</li>
                  <li>✓ Projek besar dengan timeline ketat</li>
                  <li>✓ Perubahan struktur</li>
                </ul>
              </div>
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                <h3 className="font-bold text-emerald-800 mb-3">Boleh DIY</h3>
                <ul className="text-sm text-emerald-700 space-y-2">
                  <li>✓ Cat dinding dan kabinet</li>
                  <li>✓ Tukar hardware (handle, knob)</li>
                  <li>✓ Pasang backsplash vinyl</li>
                  <li>✓ Pasang lampu dan aksesori</li>
                  <li>✓ Dekorasi dan penyusunan</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 bg-slate-100 rounded-xl p-4">
              <p className="text-sm text-slate-700">
                <strong>Nasihat:</strong> Untuk renovasi besar, sentiasa pilih kontraktor berlesen dengan portfolio dan testimoni yang boleh disahkan. Minta kontrak bertulis dengan jadual bayaran yang jelas.
              </p>
            </div>
          </section>

          {/* Section 8: FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Soalan Lazim (FAQ)</h2>
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">Berapa kos renovate dapur di Malaysia {currentYear}?</h3>
                <p className="text-slate-600">
                  Kos renovasi dapur di Malaysia bermula dari RM8,000 untuk bajet rendah, RM15,000-35,000 untuk sederhana, dan RM35,000+ untuk premium. Harga bergantung kepada saiz, jenis kabinet, dan tahap kemasan.
                </p>
              </div>
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">Berapa harga kabinet dapur laminate?</h3>
                <p className="text-slate-600">
                  Harga kabinet dapur laminate adalah sekitar RM80-120 per kaki persegi di Malaysia. Untuk dapur 100 kaki persegi, anggarkan RM8,000-12,000 untuk kabinet sahaja.
                </p>
              </div>
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">Countertop mana yang paling berbaloi?</h3>
                <p className="text-slate-600">
                  Granite lokal adalah pilihan paling berbaloi dengan harga RM150-250 per kaki persegi. Ia tahan lasak dan senang dijaga. Quartz lebih mahal (RM250-400) tetapi lebih tahan kotoran.
                </p>
              </div>
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">Berapa lama tempoh renovasi dapur?</h3>
                <p className="text-slate-600">
                  Tempoh renovasi dapur biasanya 2-4 minggu untuk projek standard. Projek besar dengan perubahan struktur boleh mengambil masa 6-8 minggu.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Adakah perlu permit untuk renovate dapur?</h3>
                <p className="text-slate-600">
                  Untuk renovasi kosmetik (kabinet, countertop, jubin), permit tidak diperlukan. Tetapi jika melibatkan perubahan struktur, paip utama, atau elektrikal besar, permit dari PBT mungkin diperlukan.
                </p>
              </div>
            </div>
          </section>

          {/* Related Calculators */}
          <section>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Kalkulator Berkaitan</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a
                  href="/loan/personal-loan-calculator-malaysia-based-on-salary"
                  className="block p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <span className="text-2xl mb-2 block">💰</span>
                  <span className="font-medium">Kalkulator Pinjaman Peribadi</span>
                </a>
                <a
                  href="/loan/home-loan-eligibility-calculator-malaysia"
                  className="block p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <span className="text-2xl mb-2 block">🏠</span>
                  <span className="font-medium">Kelayakan Pinjaman Rumah</span>
                </a>
                <a
                  href="/"
                  className="block p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <span className="text-2xl mb-2 block">🧮</span>
                  <span className="font-medium">Semua Kalkulator</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

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
