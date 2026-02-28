import SSPACalculator from "@/components/SSPACalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

export const metadata = {
  title: `Kalkulator SSPA ${currentYear} - Kira Gaji Penjawat Awam Malaysia`,
  description:
    "Kira gaji baharu SSPA untuk penjawat awam Malaysia. Lihat kenaikan Fasa 1 & Fasa 2, KGT, dan unjuran gaji mengikut gred DG, M, U, YA, YT, ATM.",
  keywords: [
    "sspa calculator",
    "kalkulator sspa",
    `sspa calculator ${currentYear}`,
    "sspa gred",
    "kgt sspa",
    "sspa calculator polis",
    "sspa calculator atm",
    "sspa guru",
    "sspa dg41",
    "kenaikan gaji sspa",
  ],
};

export default function SSPACalculatorPage() {
  return (
    <div>
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/tax" className="hover:text-slate-900 transition-colors">Tax & Salary</Link>
            <span>›</span>
            <span className="text-slate-900">Kalkulator SSPA</span>
          </div>
        </div>
      </div>

      <SSPACalculator />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Panduan Lengkap SSPA {currentYear}: Sistem Saraan Perkhidmatan Awam Malaysia
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              Sistem Saraan Perkhidmatan Awam (SSPA) adalah skim gaji baharu untuk penjawat
              awam Malaysia yang menggantikan Sistem Saraan Malaysia (SSM). SSPA berkuat kuasa
              mulai 1 Disember 2024 dan membawa kenaikan gaji yang signifikan kepada semua
              kategori penjawat awam.
            </p>

            {/* What is SSPA */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Apa itu SSPA?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              SSPA (Sistem Saraan Perkhidmatan Awam) adalah skim gaji baharu yang diperkenalkan
              oleh kerajaan Malaysia untuk menggantikan SSM (Sistem Saraan Malaysia) yang telah
              digunakan sejak tahun 2002. Objektif utama SSPA adalah untuk:
            </p>

            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
              <li>Menaikkan gaji penjawat awam secara berperingkat</li>
              <li>Merapatkan jurang gaji dengan sektor swasta</li>
              <li>Menghargai sumbangan penjawat awam kepada negara</li>
              <li>Meningkatkan motivasi dan produktiviti perkhidmatan awam</li>
            </ul>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 my-6">
              <p className="font-semibold text-blue-800 mb-2">Sumber Rasmi:</p>
              <ul className="text-slate-600 text-sm space-y-2">
                <li>
                  <a
                    href="https://sspa.jpa.gov.my/kiraan/kalkulator.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Kalkulator Rasmi JPA SSPA
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.jpa.gov.my/docs/sspa/SSPA_LAMPIRAN_D.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Jadual Gaji SSPA (Lampiran D) - PDF
                  </a>
                </li>
              </ul>
            </div>

            {/* SSM vs SSPA */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Perbezaan SSM vs SSPA
            </h3>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Aspek</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">SSM (Lama)</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">SSPA (Baharu)</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Tahun Bermula</td>
                    <td className="border border-slate-200 px-4 py-3">2002</td>
                    <td className="border border-slate-200 px-4 py-3">2024</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Kadar Kenaikan</td>
                    <td className="border border-slate-200 px-4 py-3">Tiada kenaikan asas</td>
                    <td className="border border-slate-200 px-4 py-3">8% + 7% (15% total)</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">KGT</td>
                    <td className="border border-slate-200 px-4 py-3">RM80 - RM320</td>
                    <td className="border border-slate-200 px-4 py-3">RM100 - RM650</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Struktur Gred</td>
                    <td className="border border-slate-200 px-4 py-3">54 Gred</td>
                    <td className="border border-slate-200 px-4 py-3">Diperkemas</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* SSPA Phases */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              SSPA Fasa 1 & Fasa 2: Jadual Kenaikan
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Kenaikan gaji SSPA dilaksanakan dalam dua fasa untuk memastikan kelancaran
              peralihan dan keupayaan kewangan kerajaan:
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                <h4 className="font-bold text-amber-800 mb-3">Fasa 1 (1 Disember 2024)</h4>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li><strong>Pelaksana & P&P:</strong> 8% atau minimum RM250</li>
                  <li><strong>Pengurusan Tertinggi:</strong> 4%</li>
                  <li className="pt-2 border-t border-amber-200">
                    <span className="text-amber-700">Status:</span> Telah dilaksanakan
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <h4 className="font-bold text-blue-800 mb-3">Fasa 2 (1 Januari 2026)</h4>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li><strong>Pelaksana & P&P:</strong> 7%</li>
                  <li><strong>Pengurusan Tertinggi:</strong> 3%</li>
                  <li className="pt-2 border-t border-blue-200">
                    <span className="text-blue-700">Status:</span> Berkuat kuasa
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-6 my-6">
              <p className="font-semibold text-green-800 mb-2">Formula Kenaikan SSPA:</p>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-center text-slate-700 font-mono">
                  Gaji Baharu = Gaji Hakiki × 1.07 <span className="text-slate-400">(atau × 1.03 untuk Pengurusan Tertinggi)</span>
                </p>
              </div>
            </div>

            {/* Salary Tables */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Jadual Gaji SSPA {currentYear}
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Berikut adalah contoh julat gaji mengikut gred selepas pelaksanaan SSPA:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Gred</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Jawatan Contoh</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Min (RM)</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Max (RM)</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">KGT (RM)</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr className="bg-blue-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium" colSpan={5}>
                      Pendidikan (DG)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">DG41</td>
                    <td className="border border-slate-200 px-4 py-3">Guru</td>
                    <td className="border border-slate-200 px-4 py-3">2,422</td>
                    <td className="border border-slate-200 px-4 py-3">9,631</td>
                    <td className="border border-slate-200 px-4 py-3">225</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">DG48</td>
                    <td className="border border-slate-200 px-4 py-3">Guru Cemerlang</td>
                    <td className="border border-slate-200 px-4 py-3">5,138</td>
                    <td className="border border-slate-200 px-4 py-3">11,678</td>
                    <td className="border border-slate-200 px-4 py-3">250</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium" colSpan={5}>
                      Pentadbiran (M/PTD)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">M41</td>
                    <td className="border border-slate-200 px-4 py-3">PTD</td>
                    <td className="border border-slate-200 px-4 py-3">2,422</td>
                    <td className="border border-slate-200 px-4 py-3">9,631</td>
                    <td className="border border-slate-200 px-4 py-3">225</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">M52</td>
                    <td className="border border-slate-200 px-4 py-3">PTD Kanan</td>
                    <td className="border border-slate-200 px-4 py-3">6,089</td>
                    <td className="border border-slate-200 px-4 py-3">12,780</td>
                    <td className="border border-slate-200 px-4 py-3">280</td>
                  </tr>
                  <tr className="bg-amber-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium" colSpan={5}>
                      Polis (YA/YT)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">YA1</td>
                    <td className="border border-slate-200 px-4 py-3">Konstabel</td>
                    <td className="border border-slate-200 px-4 py-3">1,500</td>
                    <td className="border border-slate-200 px-4 py-3">4,680</td>
                    <td className="border border-slate-200 px-4 py-3">100</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">YT6</td>
                    <td className="border border-slate-200 px-4 py-3">ASP</td>
                    <td className="border border-slate-200 px-4 py-3">4,220</td>
                    <td className="border border-slate-200 px-4 py-3">10,576</td>
                    <td className="border border-slate-200 px-4 py-3">250</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* How to Calculate */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Cara Kira Kenaikan Gaji SSPA
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Berikut adalah langkah mudah untuk mengira gaji baharu SSPA:
            </p>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-slate-800">Langkah 1: Tentukan Gaji Hakiki Semasa</p>
                <p className="text-slate-600 text-base">
                  Semak slip gaji untuk mendapatkan gaji pokok/hakiki sebelum elaun.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-slate-800">Langkah 2: Kira Kenaikan Fasa 1 (Jika Berkenaan)</p>
                <p className="text-slate-600 text-base">
                  Gaji × 8% atau minimum RM250 (mana yang lebih tinggi).
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-slate-800">Langkah 3: Kira Kenaikan Fasa 2</p>
                <p className="text-slate-600 text-base">
                  Gaji selepas Fasa 1 × 7% = Gaji selepas Fasa 2.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-slate-800">Langkah 4: Tambah KGT (Jika Ada)</p>
                <p className="text-slate-600 text-base">
                  Tambah KGT tahunan mengikut gred jawatan anda.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 my-6">
              <p className="font-semibold text-slate-800 mb-3">Contoh Pengiraan (Guru DG41):</p>
              <div className="space-y-2 text-sm text-slate-600">
                <p>Gaji Hakiki SSM: <strong>RM4,000</strong></p>
                <p>Fasa 1 (8%): RM4,000 × 1.08 = <strong>RM4,320</strong></p>
                <p>Fasa 2 (7%): RM4,320 × 1.07 = <strong>RM4,622.40</strong></p>
                <p className="pt-2 border-t border-slate-200">
                  <strong className="text-green-600">Jumlah Kenaikan: RM622.40 (+15.56%)</strong>
                </p>
              </div>
            </div>

            {/* SSPA for Teachers */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              SSPA untuk Guru (Gred DG)
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Guru merupakan antara kumpulan terbesar dalam perkhidmatan awam. Di bawah SSPA,
              guru menikmati kenaikan gaji yang kompetitif:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Gred</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Jawatan</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Gaji Min SSPA</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Gaji Max SSPA</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">DG29</td>
                    <td className="border border-slate-200 px-4 py-3">PPPS (Guru Pemulihan)</td>
                    <td className="border border-slate-200 px-4 py-3">RM2,081</td>
                    <td className="border border-slate-200 px-4 py-3">RM9,547</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">DG41</td>
                    <td className="border border-slate-200 px-4 py-3">Guru</td>
                    <td className="border border-slate-200 px-4 py-3">RM2,422</td>
                    <td className="border border-slate-200 px-4 py-3">RM9,631</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">DG44</td>
                    <td className="border border-slate-200 px-4 py-3">Guru Kanan</td>
                    <td className="border border-slate-200 px-4 py-3">RM4,220</td>
                    <td className="border border-slate-200 px-4 py-3">RM10,576</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">DG48</td>
                    <td className="border border-slate-200 px-4 py-3">Guru Cemerlang</td>
                    <td className="border border-slate-200 px-4 py-3">RM5,138</td>
                    <td className="border border-slate-200 px-4 py-3">RM11,678</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">DG52</td>
                    <td className="border border-slate-200 px-4 py-3">Pengetua</td>
                    <td className="border border-slate-200 px-4 py-3">RM6,089</td>
                    <td className="border border-slate-200 px-4 py-3">RM12,780</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">DG54</td>
                    <td className="border border-slate-200 px-4 py-3">Pengetua Kanan</td>
                    <td className="border border-slate-200 px-4 py-3">RM6,563</td>
                    <td className="border border-slate-200 px-4 py-3">RM13,460</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* SSPA for Police & Army */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              SSPA untuk Polis (PDRM) & Tentera (ATM)
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Anggota keselamatan juga menerima kenaikan gaji di bawah SSPA. Berikut adalah
              jadual untuk beberapa gred utama:
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                <h4 className="font-bold text-amber-800 mb-3">Polis (PDRM)</h4>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li>YA1 (Konstabel): RM1,500 - RM4,680</li>
                  <li>YA13 (Koperal): RM1,900 - RM5,680</li>
                  <li>YT1 (Inspektor): RM2,422 - RM9,631</li>
                  <li>YT6 (ASP): RM4,220 - RM10,576</li>
                  <li>YT8 (DSP): RM5,138 - RM11,678</li>
                  <li>YT10 (Supt): RM6,089 - RM12,780</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                <h4 className="font-bold text-green-800 mb-3">Tentera (ATM)</h4>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li>Leftenan (LT): RM2,422 - RM9,631</li>
                  <li>Kapten (KAPT): RM4,220 - RM10,576</li>
                  <li>Mejar (MEJ): RM5,138 - RM11,678</li>
                  <li>Lt Kolonel (LT KOL): RM6,089 - RM12,780</li>
                  <li>Kolonel (KOL): RM6,563 - RM13,460</li>
                </ul>
              </div>
            </div>

            {/* KGT Section */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              KGT (Kenaikan Gaji Tahunan) SSPA
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Kenaikan Gaji Tahunan (KGT) adalah kenaikan automatik yang diterima setiap tahun
              sehingga mencapai gaji maksimum gred. Di bawah SSPA, kadar KGT telah dinaikkan:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Kumpulan</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">KGT Lama (SSM)</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">KGT Baharu (SSPA)</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Pelaksana (Gred 1-4)</td>
                    <td className="border border-slate-200 px-4 py-3">RM80 - RM100</td>
                    <td className="border border-slate-200 px-4 py-3 text-green-600 font-medium">RM100 - RM120</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">P&P Gred 41-44</td>
                    <td className="border border-slate-200 px-4 py-3">RM180 - RM225</td>
                    <td className="border border-slate-200 px-4 py-3 text-green-600 font-medium">RM225 - RM250</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">P&P Gred 48-54</td>
                    <td className="border border-slate-200 px-4 py-3">RM225 - RM280</td>
                    <td className="border border-slate-200 px-4 py-3 text-green-600 font-medium">RM250 - RM320</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">JUSA/Turus</td>
                    <td className="border border-slate-200 px-4 py-3">RM320 - RM500</td>
                    <td className="border border-slate-200 px-4 py-3 text-green-600 font-medium">RM400 - RM650</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* FAQ */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Soalan Lazim SSPA
            </h3>

            <div className="space-y-6 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Bilakah SSPA mula berkuat kuasa?
                </p>
                <p className="text-slate-600 text-sm">
                  SSPA berkuat kuasa dalam dua fasa: Fasa 1 pada 1 Disember 2024 dan Fasa 2
                  pada 1 Januari 2026. Semua penjawat awam yang layak telah menerima kenaikan
                  secara automatik.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Adakah SSPA terpakai untuk semua penjawat awam?
                </p>
                <p className="text-slate-600 text-sm">
                  Ya, SSPA terpakai untuk semua penjawat awam termasuk kumpulan Pelaksana,
                  Pengurusan & Profesional, dan Pengurusan Tertinggi. Kadar kenaikan berbeza
                  mengikut kumpulan.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Bagaimana dengan penjawat awam kontrak?
                </p>
                <p className="text-slate-600 text-sm">
                  Penjawat awam kontrak juga menerima pelarasan gaji di bawah SSPA. Namun,
                  terma dan syarat mungkin berbeza bergantung kepada jenis kontrak.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Adakah elaun berubah di bawah SSPA?
                </p>
                <p className="text-slate-600 text-sm">
                  Struktur elaun kekal sama pada peringkat awal. Namun, kerajaan mungkin
                  mengkaji semula elaun tertentu dari masa ke masa.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Adakah gaji maksimum gred juga dinaikkan?
                </p>
                <p className="text-slate-600 text-sm">
                  Ya, gaji minimum dan maksimum untuk setiap gred telah dinaikkan di bawah
                  SSPA. Ini bermakna penjawat awam boleh mencapai tahap gaji yang lebih tinggi.
                </p>
              </div>
            </div>

            {/* Final Note */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mt-12">
              <p className="font-semibold text-blue-800 mb-2">Nota Penting</p>
              <p className="text-slate-600 text-base">
                Kalkulator ini memberikan anggaran berdasarkan formula umum SSPA. Untuk
                pengiraan tepat yang mengambil kira pelbagai faktor seperti elaun, potongan,
                dan kes khas, sila rujuk{" "}
                <a
                  href="https://sspa.jpa.gov.my/kiraan/kalkulator.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Kalkulator Rasmi JPA
                </a>{" "}
                atau hubungi Unit Sumber Manusia jabatan anda.
              </p>
            </div>
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
            © {currentYear} Calculator Malaysia. Semua kalkulator adalah percuma.
          </div>
        </div>
      </footer>
    </div>
  );
}
