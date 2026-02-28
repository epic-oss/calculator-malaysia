import PersonalLoanCalculator from "@/components/PersonalLoanCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Pinjaman Peribadi Malaysia 2026 | Berdasarkan Gaji & DSR",
  description:
    "Kalkulator pinjaman peribadi Malaysia percuma. Kira bayaran bulanan berdasarkan gaji, semak kelayakan DSR dengan segera. Bandingkan kadar Maybank, CIMB, Public Bank & lain-lain.",
  keywords: [
    "kalkulator pinjaman peribadi",
    "personal loan calculator malaysia",
    "kira pinjaman peribadi",
    "kelayakan pinjaman peribadi",
    "DSR kalkulator",
    "pinjaman bank malaysia",
  ],
  alternates: {
    canonical: "https://calculatormalaysia.com/loan/kalkulator-pinjaman-peribadi-malaysia/",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Berapa gaji minimum untuk pinjaman peribadi di Malaysia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kebanyakan bank di Malaysia memerlukan gaji minimum RM2,000 hingga RM3,000 sebulan untuk pinjaman peribadi. Bank berbeza mempunyai keperluan berbeza - sesetengah bank seperti Public Bank menerima gaji minimum RM2,000, manakala bank lain mungkin memerlukan RM3,000 atau lebih."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah DSR dan mengapa ia penting untuk pinjaman peribadi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DSR (Debt Service Ratio) atau Nisbah Khidmat Hutang adalah peratusan pendapatan bulanan anda yang digunakan untuk membayar hutang. Kebanyakan bank di Malaysia menetapkan had DSR 60-70%. Contohnya, jika gaji anda RM5,000 dan DSR 70%, jumlah bayaran hutang bulanan tidak boleh melebihi RM3,500."
      }
    },
    {
      "@type": "Question",
      "name": "Berapa lama masa kelulusan pinjaman peribadi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kelulusan pinjaman peribadi biasanya mengambil masa 1-5 hari bekerja bergantung pada bank. Bank digital seperti AEON mungkin meluluskan dalam 24 jam, manakala bank tradisional mungkin mengambil 3-5 hari bekerja. Pengeluaran wang biasanya 1-2 hari selepas kelulusan."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah dokumen yang diperlukan untuk pinjaman peribadi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dokumen asas yang diperlukan: (1) Salinan MyKad, (2) Slip gaji 3 bulan terkini, (3) Penyata bank 3 bulan, (4) Borang EA/BE terkini. Untuk bekerja sendiri, tambahan dokumen SSM dan penyata bank 6 bulan diperlukan."
      }
    },
    {
      "@type": "Question",
      "name": "Bank mana yang menawarkan kadar faedah pinjaman peribadi terendah?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pada 2026, Public Bank menawarkan kadar serendah 5.88% setahun, diikuti Maybank (6.5%), CIMB (6.88%), dan RHB (6.99%). Namun, kadar sebenar bergantung pada profil kredit anda. Peminjam dengan skor kredit cemerlang boleh mendapat kadar lebih rendah."
      }
    },
    {
      "@type": "Question",
      "name": "Bolehkah saya mohon pinjaman peribadi jika ada CCRIS/CTOS merah?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, tetapi peluang kelulusan lebih rendah. Sesetengah bank dan institusi kewangan bukan bank masih boleh meluluskan pinjaman jika rekod merah sudah diselesaikan. Pastikan anda jelaskan semua tunggakan sebelum memohon dan dapatkan laporan CTOS terkini."
      }
    }
  ]
};

export default function KalkulatorPinjamanPeribadiPage() {
  return (
    <div>
      <Navbar />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
            <span className="text-slate-900">Kalkulator Pinjaman Peribadi</span>
          </div>
        </div>
      </div>

      <PersonalLoanCalculator locale="ms" />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Panduan Lengkap Pinjaman Peribadi Malaysia 2026
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              Perlukan wang tunai untuk renovasi rumah, majlis perkahwinan, penyatuan hutang, atau kecemasan?
              Pinjaman peribadi menawarkan akses cepat kepada dana tanpa cagaran. Tetapi sebelum memohon,
              adalah penting untuk memahami berapa banyak yang anda boleh pinjam dan berapa bayaran bulanan anda.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Kalkulator ini membantu anda menganggar bayaran bulanan, jumlah faedah, dan yang paling penting
              – sama ada anda berkemungkinan diluluskan berdasarkan Nisbah Khidmat Hutang (DSR) anda.
            </p>

            {/* Kelayakan Pinjaman Peribadi */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Syarat Kelayakan Pinjaman Peribadi di Malaysia
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Walaupun setiap bank mempunyai kriteria yang sedikit berbeza, berikut adalah keperluan umum:
            </p>

            <div className="space-y-4 my-6">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                <p className="font-semibold text-emerald-800 mb-2">Keperluan Asas</p>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• Warganegara Malaysia atau Penduduk Tetap</li>
                  <li>• Umur: 21 hingga 60 tahun (sesetengah bank sehingga 65)</li>
                  <li>• Pendapatan minimum: RM2,000 - RM3,000/bulan (berbeza mengikut bank)</li>
                  <li>• Bekerja sekurang-kurangnya 6 bulan (pekerjaan semasa)</li>
                  <li>• Skor kredit yang baik (CTOS/CCRIS)</li>
                </ul>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                <p className="font-semibold text-emerald-800 mb-2">Untuk Bekerja Sendiri</p>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• Perniagaan beroperasi sekurang-kurangnya 2 tahun</li>
                  <li>• Pendaftaran SSM diperlukan</li>
                  <li>• Penyata bank menunjukkan pendapatan konsisten</li>
                  <li>• Mungkin memerlukan pendapatan minimum lebih tinggi</li>
                </ul>
              </div>
            </div>

            {/* DSR Dijelaskan */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Apa Itu DSR dan Mengapa Ia Penting?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              DSR (Debt Service Ratio) atau Nisbah Khidmat Hutang adalah peratusan pendapatan bulanan anda
              yang digunakan untuk membayar hutang. Ia adalah faktor paling penting yang bank pertimbangkan
              semasa meluluskan pinjaman.
            </p>

            <div className="bg-slate-50 rounded-xl p-6 my-6">
              <p className="font-semibold text-slate-800 mb-3">Formula DSR:</p>
              <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
                <p className="text-lg font-mono text-slate-700">
                  DSR = (Jumlah Bayaran Hutang Bulanan ÷ Pendapatan Bulanan) × 100
                </p>
              </div>
              <p className="text-sm text-slate-500 mt-3">
                Jumlah hutang bulanan termasuk: bayaran minimum kad kredit, pinjaman kereta, pinjaman perumahan,
                PTPTN, pinjaman peribadi sedia ada, dan pinjaman baru yang anda pohon.
              </p>
            </div>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Julat DSR</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Maksudnya</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr className="bg-emerald-50">
                    <td className="border border-slate-200 px-4 py-3 font-semibold text-emerald-700">Bawah 50%</td>
                    <td className="border border-slate-200 px-4 py-3 text-emerald-700">Cemerlang</td>
                    <td className="border border-slate-200 px-4 py-3">Peluang kelulusan tinggi, mungkin layak untuk kadar lebih baik</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-semibold text-amber-700">50% - 70%</td>
                    <td className="border border-slate-200 px-4 py-3 text-amber-700">Boleh Diterima</td>
                    <td className="border border-slate-200 px-4 py-3">Masih boleh diluluskan, tetapi kurang ruang untuk rundingan</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="border border-slate-200 px-4 py-3 font-semibold text-red-700">Atas 70%</td>
                    <td className="border border-slate-200 px-4 py-3 text-red-700">Berisiko</td>
                    <td className="border border-slate-200 px-4 py-3">Kebanyakan bank akan tolak. Pertimbangkan jumlah lebih rendah atau tempoh lebih lama</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="font-semibold text-amber-800 mb-2">Tip Penting:</p>
              <p className="text-slate-600 text-sm">
                Sesetengah bank menggunakan 60% atau 65% sebagai had DSR mereka, bukan 70%. Jika anda di sempadan
                70%, anda mungkin masih menghadapi penolakan. Sasarkan bawah 60% untuk selamat, dan bawah 50%
                untuk kadar terbaik.
              </p>
            </div>

            {/* Perbandingan Kadar Faedah */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Kadar Faedah Pinjaman Peribadi Mengikut Bank (2026)
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Kadar pinjaman peribadi di Malaysia biasanya antara 5% hingga 12% setahun (kadar rata).
              Berikut adalah perbandingan bank-bank utama:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Bank</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Kadar Faedah</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Jumlah Maksimum</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Tempoh Maksimum</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Public Bank</td>
                    <td className="border border-slate-200 px-4 py-3">Dari 5.88%</td>
                    <td className="border border-slate-200 px-4 py-3">RM150,000</td>
                    <td className="border border-slate-200 px-4 py-3">10 tahun</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">Maybank</td>
                    <td className="border border-slate-200 px-4 py-3">Dari 6.5%</td>
                    <td className="border border-slate-200 px-4 py-3">RM150,000</td>
                    <td className="border border-slate-200 px-4 py-3">7 tahun</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">CIMB</td>
                    <td className="border border-slate-200 px-4 py-3">Dari 6.88%</td>
                    <td className="border border-slate-200 px-4 py-3">RM200,000</td>
                    <td className="border border-slate-200 px-4 py-3">7 tahun</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">RHB</td>
                    <td className="border border-slate-200 px-4 py-3">Dari 6.99%</td>
                    <td className="border border-slate-200 px-4 py-3">RM200,000</td>
                    <td className="border border-slate-200 px-4 py-3">7 tahun</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Hong Leong</td>
                    <td className="border border-slate-200 px-4 py-3">Dari 7.5%</td>
                    <td className="border border-slate-200 px-4 py-3">RM150,000</td>
                    <td className="border border-slate-200 px-4 py-3">7 tahun</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">Alliance Bank</td>
                    <td className="border border-slate-200 px-4 py-3">Dari 7.88%</td>
                    <td className="border border-slate-200 px-4 py-3">RM150,000</td>
                    <td className="border border-slate-200 px-4 py-3">7 tahun</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-500">
              *Kadar yang ditunjukkan adalah indikatif dan tertakluk kepada perubahan. Kadar akhir bergantung
              pada profil kredit anda, pendapatan, dan promosi bank.
            </p>

            {/* Dokumen Diperlukan */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Dokumen Diperlukan untuk Permohonan Pinjaman Peribadi
            </h3>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-3">Untuk Pekerja Bergaji</p>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Salinan MyKad (depan & belakang)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Slip gaji 3 bulan terkini</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Penyata bank 3 bulan terkini</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Borang EA / Borang BE (terkini)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Penyata EPF (sesetengah bank)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-3">Untuk Bekerja Sendiri</p>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Salinan MyKad (depan & belakang)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Pendaftaran SSM (Borang 9 & 24/49)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Penyata bank 6 bulan terkini</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Profil perniagaan / surat rasmi syarikat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Penyata cukai (Borang B) - 2 tahun</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Cara Meningkatkan Kelulusan */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              7 Cara Meningkatkan Peluang Kelulusan Pinjaman Anda
            </h3>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">1. Semak dan bersihkan CCRIS/CTOS anda</p>
                <p className="text-slate-600 text-base">
                  Dapatkan laporan kredit percuma dari CTOS. Selesaikan sebarang hutang tertunggak atau
                  pertikaian sebelum memohon. Walaupun bil kecil yang tidak dibayar boleh menjejaskan skor anda.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">2. Kurangkan hutang sedia ada dahulu</p>
                <p className="text-slate-600 text-base">
                  Bayar baki kad kredit atau selesaikan pinjaman yang lebih kecil. Ini secara langsung
                  mengurangkan DSR anda dan menunjukkan pemberi pinjaman bahawa anda menguruskan hutang dengan baik.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">3. Jangan mohon ke banyak bank sekaligus</p>
                <p className="text-slate-600 text-base">
                  Setiap permohonan muncul dalam laporan kredit anda. Permohonan berganda dalam tempoh singkat
                  kelihatan terdesak dan menjejaskan peluang anda.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">4. Pilih bank yang sesuai untuk profil anda</p>
                <p className="text-slate-600 text-base">
                  Bank berbeza mempunyai pelanggan sasaran yang berbeza. Sesetengah lebih ketat, yang lain
                  lebih fleksibel. Ejen pinjaman boleh memadankan anda dengan bank yang sesuai.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">5. Mohon jumlah yang realistik</p>
                <p className="text-slate-600 text-base">
                  Jangan maksimumkan. Jika DSR anda membenarkan RM50,000, mohon RM40,000. Bank lebih suka
                  peminjam yang tidak membebankan diri sendiri.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">6. Pastikan sejarah pekerjaan yang stabil</p>
                <p className="text-slate-600 text-base">
                  Kekal di pekerjaan anda sekurang-kurangnya 6-12 bulan sebelum memohon. Pertukaran kerja
                  yang kerap memberi isyarat ketidakstabilan kepada pemberi pinjaman.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">7. Pertimbangkan penjamin atau pemohon bersama</p>
                <p className="text-slate-600 text-base">
                  Jika profil anda lemah, mempunyai seseorang dengan kredit baik untuk menjamin boleh membantu.
                  Tetapi ingat – mereka sama-sama bertanggungjawab untuk pembayaran balik.
                </p>
              </div>
            </div>

            {/* Pinjaman Peribadi vs Kad Kredit */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Pinjaman Peribadi vs Kad Kredit: Mana Lebih Baik?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Kedua-duanya adalah bentuk pinjaman, tetapi ia berfungsi dengan sangat berbeza:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Faktor</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Pinjaman Peribadi</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Kad Kredit</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Kadar Faedah</td>
                    <td className="border border-slate-200 px-4 py-3 text-emerald-600">5% - 12% setahun (rata)</td>
                    <td className="border border-slate-200 px-4 py-3 text-red-600">15% - 18% setahun</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Bayaran Tetap</td>
                    <td className="border border-slate-200 px-4 py-3">Ya, jumlah sama setiap bulan</td>
                    <td className="border border-slate-200 px-4 py-3">Tidak, minimum 5% daripada baki</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Tempoh Bayaran Balik</td>
                    <td className="border border-slate-200 px-4 py-3">Tetap (1-7 tahun)</td>
                    <td className="border border-slate-200 px-4 py-3">Fleksibel (boleh berlarutan selamanya)</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Terbaik Untuk</td>
                    <td className="border border-slate-200 px-4 py-3">Perbelanjaan besar yang dirancang</td>
                    <td className="border border-slate-200 px-4 py-3">Keperluan kecil jangka pendek</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Disiplin Diperlukan</td>
                    <td className="border border-slate-200 px-4 py-3">Kurang (auto-debit)</td>
                    <td className="border border-slate-200 px-4 py-3">Lebih (mudah berbelanja lebih)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border-l-4 border-emerald-500 pl-4 my-6">
              <p className="font-semibold text-slate-800">Cadangan Kami:</p>
              <p className="text-slate-600 text-base">
                Gunakan <strong>pinjaman peribadi</strong> untuk jumlah melebihi RM5,000 atau apabila anda
                memerlukan pelan pembayaran balik tetap. Gunakan <strong>kad kredit</strong> hanya jika anda
                boleh bayar penuh setiap bulan (untuk elak faedah) atau untuk kecemasan jangka pendek.
              </p>
            </div>

            {/* Kesilapan Biasa */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              5 Kesilapan Yang Perlu Dielakkan Semasa Mengambil Pinjaman Peribadi
            </h3>

            <div className="space-y-4 my-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="font-semibold text-red-800 mb-1">1. Tidak membaca terma dan syarat</p>
                <p className="text-slate-600 text-sm">
                  Semak yuran pemprosesan (biasanya 1-2%), penalti penyelesaian awal, dan caj pembayaran lewat.
                  Ini semua bertambah.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="font-semibold text-red-800 mb-1">2. Meminjam lebih daripada yang diperlukan</p>
                <p className="text-slate-600 text-sm">
                  Hanya kerana anda diluluskan untuk RM100,000 tidak bermakna anda perlu ambil semuanya.
                  Pinjam hanya apa yang anda perlukan.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="font-semibold text-red-800 mb-1">3. Memilih tempoh paling lama tanpa berfikir</p>
                <p className="text-slate-600 text-sm">
                  Tempoh lebih lama = bayaran bulanan lebih rendah tetapi jumlah faedah jauh lebih banyak.
                  Pinjaman 7 tahun boleh kos 40% lebih daripada pinjaman 3 tahun.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="font-semibold text-red-800 mb-1">4. Tidak membandingkan kadar</p>
                <p className="text-slate-600 text-sm">
                  Perbezaan 1% dalam kadar faedah boleh menjimatkan beribu-ribu ringgit sepanjang tempoh
                  pinjaman. Sentiasa bandingkan sekurang-kurangnya 3 bank.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="font-semibold text-red-800 mb-1">5. Menggunakan pinjaman peribadi untuk pelaburan</p>
                <p className="text-slate-600 text-sm">
                  Jangan sesekali pinjam untuk melabur dalam saham, kripto, atau skim &quot;pasti untung&quot;.
                  Faedah yang anda bayar adalah dijamin; pulangan pelaburan tidak.
                </p>
              </div>
            </div>

            {/* Soalan Lazim */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Soalan Lazim (FAQ)
            </h3>

            <div className="space-y-4 my-6">
              <div className="border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">Berapa gaji minimum untuk pinjaman peribadi di Malaysia?</p>
                <p className="text-slate-600 text-sm">
                  Kebanyakan bank memerlukan gaji minimum RM2,000 hingga RM3,000 sebulan. Public Bank menerima
                  minimum RM2,000, manakala bank lain mungkin memerlukan lebih tinggi.
                </p>
              </div>
              <div className="border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">Berapa lama masa kelulusan pinjaman peribadi?</p>
                <p className="text-slate-600 text-sm">
                  Biasanya 1-5 hari bekerja. Bank digital mungkin meluluskan dalam 24 jam, manakala bank
                  tradisional mengambil 3-5 hari bekerja.
                </p>
              </div>
              <div className="border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">Bolehkah saya mohon jika ada rekod CCRIS merah?</p>
                <p className="text-slate-600 text-sm">
                  Ya, tetapi peluang lebih rendah. Selesaikan semua tunggakan dahulu dan dapatkan laporan
                  CTOS terkini sebelum memohon.
                </p>
              </div>
            </div>

            {/* CTA Akhir */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Sedia untuk Memohon?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Gunakan kalkulator di atas untuk menyemak kelayakan anda dan menganggar bayaran bulanan.
              Jika DSR anda kelihatan baik, klik &quot;Dapatkan Nasihat Pakar&quot; – penasihat kami boleh
              membantu anda mencari kadar terbaik dan membimbing anda melalui proses permohonan.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Pinjam dengan bijak, dan hanya ambil apa yang anda boleh bayar balik dengan selesa.
            </p>
          </article>
        </div>
      </section>

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
            © 2026 Calculator Malaysia. Semua kalkulator adalah percuma untuk digunakan.
          </div>
        </div>
      </footer>
    </div>
  );
}
