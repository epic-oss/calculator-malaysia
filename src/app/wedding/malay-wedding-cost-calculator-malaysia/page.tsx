import { Metadata } from "next";
import WeddingCostCalculator from "@/components/WeddingCostCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Kalkulator Kos Kahwin Malaysia ${currentYear} | Calculator Malaysia`,
  description: `Kira kos kahwin Melayu ${currentYear}. Anggaran bajet katering, pelamin, hantaran, dewan & lain-lain. Kalkulator percuma untuk merancang perkahwinan impian anda.`,
  keywords: [
    "kos kahwin malaysia",
    "kalkulator kos kahwin",
    "bajet kahwin melayu",
    "kos katering kahwin",
    "harga pelamin kahwin",
    "kos hantaran kahwin",
    "bajet perkahwinan malaysia",
    "wedding cost calculator malaysia",
    "malay wedding cost",
    "berapa kos kahwin",
  ],
  openGraph: {
    title: `Kalkulator Kos Kahwin Malaysia ${currentYear}`,
    description: "Kira anggaran kos kahwin Melayu. Bandingkan harga katering, pelamin, hantaran & dewan.",
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
      "name": "Berapa kos kahwin di Malaysia 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kos kahwin di Malaysia bermula dari RM15,000 untuk bajet rendah, RM30,000-60,000 untuk sederhana, dan RM60,000+ untuk majlis mewah. Harga bergantung kepada bilangan tetamu, lokasi, dan pilihan vendor."
      }
    },
    {
      "@type": "Question",
      "name": "Berapa harga katering kahwin per pax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Harga katering kahwin di Malaysia bermula dari RM8-12 per pax untuk nasi berlauk biasa, RM15-25 untuk nasi minyak standard, dan RM25-45+ untuk katering premium dengan menu lengkap termasuk kambing golek."
      }
    },
    {
      "@type": "Question",
      "name": "Berapa kos pelamin kahwin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kos pelamin kahwin berkisar antara RM1,500-3,000 untuk pelamin standard, RM3,000-6,000 untuk pelamin moden/garden theme, dan RM6,000-15,000+ untuk pelamin mewah atau custom design."
      }
    },
    {
      "@type": "Question",
      "name": "Berapa dulang hantaran yang perlu disediakan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Adat Melayu biasanya 7, 9, atau 11 dulang hantaran. Setiap dulang menelan belanja RM150-400 bergantung isi dan hiasan. Jumlah keseluruhan hantaran termasuk wang hantaran boleh mencecah RM5,000-15,000."
      }
    },
    {
      "@type": "Question",
      "name": "Macam mana nak jimat kos kahwin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cara jimat kos kahwin: pilih hari biasa (bukan hujung minggu), kurangkan bilangan tetamu, gunakan dewan komuniti berbanding hotel, buat DIY hantaran dan doorgift, serta tempah vendor awal untuk harga promosi."
      }
    }
  ]
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `Kalkulator Kos Kahwin Malaysia ${currentYear}`,
  "description": "Kira anggaran kos perkahwinan Melayu berdasarkan bilangan tetamu, jenis katering, pelamin, dan lain-lain",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MYR"
  }
};

export default function MalayWeddingCostCalculatorPage() {
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
            <span>›</span>
            <span className="text-slate-400">Wedding</span>
            <span>›</span>
            <span className="text-slate-900">Kalkulator Kos Kahwin</span>
          </div>
        </div>
      </div>

      <WeddingCostCalculator type="malay" />

      {/* SEO Content Section */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">

          {/* Section 1: Introduction with tier cards */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Berapa Kos Kahwin di Malaysia {currentYear}?
            </h2>
            <p className="text-slate-600 mb-4">
              Merancang perkahwinan adalah saat yang menggembirakan, tetapi kos kahwin di Malaysia boleh menjadi tekanan jika tidak dirancang dengan teliti. Daripada katering, pelamin, hantaran hingga sewa dewan, setiap komponen perlu diambil kira untuk mengelakkan bajet terlebih.
            </p>
            <p className="text-slate-600 mb-4">
              Based on {currentYear} market data across KL, Selangor, Johor, and other states, here are the typical Malay wedding cost tiers:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-violet-50 rounded-xl p-4 border border-violet-200">
                <h3 className="font-bold text-violet-800 mb-2">Bajet</h3>
                <p className="text-2xl font-bold text-violet-700 mb-1">RM15,000 - RM30,000</p>
                <ul className="text-sm text-violet-700 space-y-1">
                  <li>- 300-500 tetamu</li>
                  <li>- Katering nasi berlauk</li>
                  <li>- Pelamin standard</li>
                  <li>- Dewan komuniti / void deck</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <h3 className="font-bold text-purple-800 mb-2">Sederhana</h3>
                <p className="text-2xl font-bold text-purple-700 mb-1">RM30,000 - RM60,000</p>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>- 500-800 tetamu</li>
                  <li>- Katering nasi minyak</li>
                  <li>- Pelamin moden / garden</li>
                  <li>- Dewan / hotel ballroom</li>
                </ul>
              </div>
              <div className="bg-fuchsia-50 rounded-xl p-4 border border-fuchsia-200">
                <h3 className="font-bold text-fuchsia-800 mb-2">Mewah</h3>
                <p className="text-2xl font-bold text-fuchsia-700 mb-1">RM60,000+</p>
                <ul className="text-sm text-fuchsia-700 space-y-1">
                  <li>- 800-1,500+ tetamu</li>
                  <li>- Fine dining / full course</li>
                  <li>- Pelamin custom / grand</li>
                  <li>- Hotel 5 bintang / resort</li>
                </ul>
              </div>
            </div>
            <p className="text-slate-600">
              Harga di atas merangkumi kedua-dua belah pihak (majlis lelaki dan perempuan). Actual costs vary significantly depending on your location, number of guests, and choice of vendors. Kawasan bandar seperti KL dan Selangor cenderung lebih mahal 20-30% berbanding luar bandar.
            </p>
          </section>

          {/* Section 2: Catering Price Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Panduan Harga Katering Kahwin
            </h2>
            <p className="text-slate-600 mb-4">
              Catering is typically the largest expense in a Malay wedding, making up 40-50% of the total budget. Katering kahwin di Malaysia mempunyai pelbagai pilihan mengikut bajet dan jenis hidangan yang diinginkan.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="text-left py-3 px-4 font-bold text-purple-900">Jenis Katering</th>
                    <th className="text-center py-3 px-4 font-bold text-purple-900">Harga Per Pax</th>
                    <th className="text-center py-3 px-4 font-bold text-purple-900">500 Tetamu</th>
                    <th className="text-left py-3 px-4 font-bold text-purple-900">Termasuk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium">Nasi Berlauk Biasa</td>
                    <td className="py-3 px-4 text-center">RM8 - RM12</td>
                    <td className="py-3 px-4 text-center">RM4,000 - RM6,000</td>
                    <td className="py-3 px-4 text-slate-600">Nasi putih, 2-3 lauk, air sirap</td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <td className="py-3 px-4 font-medium">Nasi Minyak Standard</td>
                    <td className="py-3 px-4 text-center">RM15 - RM25</td>
                    <td className="py-3 px-4 text-center">RM7,500 - RM12,500</td>
                    <td className="py-3 px-4 text-slate-600">Nasi minyak, 3-4 lauk, dalca, acar, air</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium">Nasi Minyak Premium</td>
                    <td className="py-3 px-4 text-center">RM25 - RM35</td>
                    <td className="py-3 px-4 text-center">RM12,500 - RM17,500</td>
                    <td className="py-3 px-4 text-slate-600">Menu lengkap, kambing golek, dessert table</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Fine Dining / Buffet</td>
                    <td className="py-3 px-4 text-center">RM45 - RM80+</td>
                    <td className="py-3 px-4 text-center">RM22,500 - RM40,000+</td>
                    <td className="py-3 px-4 text-slate-600">Full course, live cooking, pelbagai stesen</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 mt-3">
              * Harga termasuk setup meja dan kerusi asas. Khemah, pelayan tambahan, dan live cooking station dikenakan caj berasingan.
            </p>
          </section>

          {/* Section 3: Pelamin Packages */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Kos Pelamin Mengikut Jenis
            </h2>
            <p className="text-slate-600 mb-4">
              The pelamin (bridal dais) is the centrepiece of a Malay wedding. Harga pelamin sangat berbeza bergantung kepada jenis, saiz, dan rekaan yang dipilih. Below is a comparison of popular pelamin packages in Malaysia:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="text-left py-3 px-4 font-bold text-purple-900">Jenis Pelamin</th>
                    <th className="text-center py-3 px-4 font-bold text-purple-900">Anggaran Harga</th>
                    <th className="text-left py-3 px-4 font-bold text-purple-900">Apa Yang Termasuk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium">Pelamin Standard</td>
                    <td className="py-3 px-4 text-center">RM1,500 - RM3,000</td>
                    <td className="py-3 px-4 text-slate-600">Pelamin single panel, bunga asas, backdrop kain, 2 mini pelamin</td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <td className="py-3 px-4 font-medium">Pelamin Moden / Garden</td>
                    <td className="py-3 px-4 text-center">RM3,000 - RM6,000</td>
                    <td className="py-3 px-4 text-slate-600">Theme garden/rustic, bunga segar, lighting, photo booth area</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium">Pelamin Grand / Mewah</td>
                    <td className="py-3 px-4 text-center">RM6,000 - RM12,000</td>
                    <td className="py-3 px-4 text-slate-600">Full custom design, fresh flowers, chandelier, full hall decoration</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Pelamin Luxury / Custom</td>
                    <td className="py-3 px-4 text-center">RM12,000 - RM25,000+</td>
                    <td className="py-3 px-4 text-slate-600">Celebrity-style, imported flowers, bespoke concept, multiple set changes</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 mt-3">
              * Harga untuk pelamin di rumah biasanya lebih murah RM500-1,000 berbanding pelamin di dewan atau hotel kerana kos transport dan setup yang lebih rendah.
            </p>
          </section>

          {/* Section 4: Hantaran Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Senarai Hantaran dan Bajet
            </h2>
            <p className="text-slate-600 mb-4">
              Dulang hantaran is a unique and cherished tradition in Malay weddings. Hantaran biasanya terdiri daripada 7, 9, atau 11 dulang yang diisi dengan hadiah simbolik daripada pihak lelaki dan perempuan. Berikut adalah anggaran kos bagi setiap komponen hantaran:
            </p>
            <div className="space-y-4">
              <div className="bg-violet-50 rounded-xl p-5 border border-violet-200">
                <h3 className="font-bold text-violet-800 mb-2">Wang Hantaran</h3>
                <p className="text-slate-600">
                  Wang hantaran adalah pemberian wajib daripada pihak lelaki. In {currentYear}, the average wang hantaran in KL/Selangor ranges from RM5,000 to RM15,000 depending on the bride&apos;s education and background. Kawasan luar bandar biasanya lebih rendah iaitu RM3,000-RM8,000.
                </p>
              </div>
              <div className="bg-violet-50 rounded-xl p-5 border border-violet-200">
                <h3 className="font-bold text-violet-800 mb-2">Isi Dulang Hantaran</h3>
                <p className="text-slate-600">
                  Setiap dulang biasanya diisi dengan barangan seperti sirih junjung, baju pengantin, kain songket, kasut, set skincare/perfume, coklat, buah-buahan, dan bakul berisi telur. Kos setiap dulang termasuk hiasan berkisar antara RM150 hingga RM400. For 9 dulang, expect to spend RM1,500 to RM3,600 on contents alone.
                </p>
              </div>
              <div className="bg-violet-50 rounded-xl p-5 border border-violet-200">
                <h3 className="font-bold text-violet-800 mb-2">Dulang & Hiasan Hantaran</h3>
                <p className="text-slate-600">
                  Kos hiasan dulang hantaran (bekas, bunga, riben, dan susun atur) boleh disiapkan sendiri (DIY) dengan kos RM50-80 per dulang, atau ditempah daripada wedding planner pada harga RM100-250 per dulang. Full set 9 dulang professionally decorated costs RM900-RM2,250.
                </p>
              </div>
            </div>
            <div className="mt-4 bg-purple-50 rounded-xl p-4 border border-purple-200">
              <p className="text-sm text-purple-800">
                <strong>Jumlah Anggaran Hantaran:</strong> Untuk 9 dulang hantaran termasuk wang hantaran, anggarkan RM7,000 - RM20,000 keseluruhannya bergantung kepada kawasan dan pilihan barangan.
              </p>
            </div>
          </section>

          {/* Section 5: Tips Jimat */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Tips Jimat Kos Kahwin
            </h2>
            <p className="text-slate-600 mb-4">
              Planning a wedding on a budget? Berikut adalah 5 tips praktikal untuk mengurangkan kos perkahwinan tanpa mengorbankan kualiti majlis anda:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-bold text-sm">1</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Pilih Hari Biasa atau Jumaat</h3>
                  <p className="text-slate-600">Majlis pada hari Jumaat atau hari biasa boleh jimat 20-30% untuk sewa dewan dan katering. Kebanyakan vendor menawarkan harga istimewa untuk weekday bookings kerana kurang permintaan. This alone can save you RM3,000-RM8,000.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-bold text-sm">2</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Kawal Bilangan Tetamu</h3>
                  <p className="text-slate-600">Setiap 100 tetamu tambahan boleh menambah RM2,000-RM5,000 untuk kos katering sahaja. Hadkan senarai tetamu kepada keluarga terdekat dan kawan rapat. A focused guest list of 300-400 keeps costs manageable without feeling too small.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-bold text-sm">3</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">DIY Hantaran dan Doorgift</h3>
                  <p className="text-slate-600">Hias dulang hantaran sendiri menggunakan tutorial YouTube boleh jimat RM500-RM1,500. Untuk doorgift, beli borong dari Shopee/Lazada dan packing sendiri. DIY doorgifts cost RM1-2 each vs RM3-5 from suppliers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-bold text-sm">4</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Guna Dewan Komuniti atau Void Deck</h3>
                  <p className="text-slate-600">Sewa dewan komuniti bermula RM300-RM800 berbanding hotel ballroom yang bermula RM3,000-RM8,000. Majlis di void deck rumah flat atau taman perumahan boleh menjimatkan lagi. Community halls are just as memorable with the right decoration.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-bold text-sm">5</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Tempah Vendor Awal (6-12 Bulan)</h3>
                  <p className="text-slate-600">Vendor yang popular akan menaikkan harga semasa peak season (Jun, Nov, Dis). Tempahan awal 6-12 bulan sebelum majlis membolehkan anda lock in harga semasa dan elak kenaikan musim. Early bird discounts of 10-15% are common for advance bookings.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Soalan Lazim</h2>
            <div className="space-y-4">
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  Berapa jumlah minimum kos kahwin di Malaysia {currentYear}?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  Kos minimum untuk majlis perkahwinan Melayu yang lengkap (termasuk kedua-dua belah pihak) adalah sekitar RM15,000-RM20,000. Ini merangkumi katering nasi berlauk untuk 300 tetamu, pelamin standard, hantaran asas, dan sewa khemah/dewan komuniti. Walau bagaimanapun, kebanyakan pasangan di kawasan bandar membelanjakan RM30,000-RM50,000 secara purata.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  Apa yang termasuk dalam pakej perkahwinan lengkap?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  Pakej perkahwinan lengkap (all-in) biasanya merangkumi katering, pelamin, mak andam (makeup & attire), fotografi dan videografi, kad jemputan, doorgift, sewa dewan, dan bunga hiasan. Harga pakej lengkap bermula dari RM15,000-RM25,000 untuk pakej asas dan boleh mencecah RM80,000+ untuk pakej premium di hotel 5 bintang.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  Berapa kos mak andam dan makeup pengantin?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  Kos mak andam untuk pengantin Melayu bermula dari RM800-RM1,500 untuk pakej asas (solekan nikah dan sanding), RM1,500-RM3,500 untuk pakej standard termasuk baju sewa dan aksesori, dan RM3,500-RM8,000+ untuk mak andam terkenal atau celebrity makeup artist. Pakej biasanya termasuk 2-3 sesi solekan (nikah, sanding, bertandang).
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  Perlukah saya sediakan bajet untuk wang pendahuluan (deposit)?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  Ya, hampir semua vendor kahwin memerlukan deposit 30-50% semasa tempahan. Untuk katering, deposit biasanya 50% daripada jumlah keseluruhan. Pelamin dan mak andam biasanya memerlukan deposit 30-50%. Pastikan anda mempunyai sekurang-kurangnya 40% daripada jumlah bajet sebagai wang pendahuluan 3-6 bulan sebelum majlis.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  Adakah duit hantaran boleh dibincang antara keluarga?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  Ya, wang hantaran boleh dan sepatutnya dibincangkan antara kedua-dua keluarga. Jumlah wang hantaran bergantung kepada persetujuan bersama, latar belakang keluarga, dan adat setempat. Di KL/Selangor, purata wang hantaran adalah RM8,000-RM12,000, manakala di negeri lain boleh jadi RM3,000-RM8,000. Komunikasi terbuka antara keluarga adalah kunci untuk mengelakkan salah faham.
                </div>
              </details>
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
