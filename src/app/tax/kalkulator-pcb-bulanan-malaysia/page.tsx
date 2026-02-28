import PCBCalculator from "@/components/PCBCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

export const metadata = {
  title: `Kalkulator PCB Bulanan Malaysia ${currentYear} | Potongan Cukai Berjadual`,
  description:
    "Kira PCB (Potongan Cukai Berjadual) bulanan dengan mudah. Ketahui anggaran cukai pendapatan berdasarkan gaji, status perkahwinan dan bilangan anak.",
  keywords: [
    "kalkulator pcb",
    "pcb calculator malaysia",
    "potongan cukai berjadual",
    "monthly tax deduction",
    "pcb bulanan",
    "cukai pendapatan malaysia",
    "lhdn pcb",
    "kira pcb",
  ],
};

export default function PCBCalculatorPage() {
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
            <span className="text-slate-900">Kalkulator PCB Bulanan</span>
          </div>
        </div>
      </div>

      <PCBCalculator />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Panduan Lengkap PCB Malaysia {currentYear}: Cara Kira Potongan Cukai Bulanan
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              PCB atau Potongan Cukai Berjadual adalah sistem di mana majikan memotong cukai
              pendapatan daripada gaji pekerja setiap bulan dan membayar terus kepada LHDN.
              Ini memastikan anda tidak perlu membayar cukai sekaligus pada hujung tahun.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Kalkulator ini membantu anda menganggarkan jumlah PCB bulanan berdasarkan gaji,
              status perkahwinan, dan pelepasan cukai yang layak anda terima.
            </p>

            {/* What is PCB */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Apa Itu PCB (Potongan Cukai Berjadual)?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              PCB adalah mekanisme kutipan cukai pendapatan di Malaysia di mana majikan
              bertanggungjawab memotong anggaran cukai daripada gaji pekerja setiap bulan.
              Sistem ini diperkenalkan untuk:
            </p>

            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
              <li>Meringankan beban pembayar cukai daripada membayar sekaligus</li>
              <li>Memastikan aliran tunai kerajaan yang stabil sepanjang tahun</li>
              <li>Menggalakkan pematuhan cukai dalam kalangan rakyat Malaysia</li>
              <li>Memudahkan proses e-Filing pada akhir tahun</li>
            </ul>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 my-6">
              <p className="font-semibold text-blue-800 mb-2">Nota Penting:</p>
              <p className="text-slate-600 text-sm">
                PCB adalah <strong>anggaran</strong> cukai, bukan cukai akhir. Cukai sebenar
                dikira semasa anda memfailkan Borang BE/B. Jika PCB lebih tinggi daripada cukai
                sebenar, anda akan menerima bayaran balik (refund). Jika kurang, anda perlu
                membayar baki.
              </p>
            </div>

            {/* How PCB is Calculated */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Bagaimana PCB Dikira?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              LHDN menggunakan formula khusus untuk mengira PCB berdasarkan beberapa faktor:
            </p>

            <div className="bg-slate-50 rounded-xl p-6 my-6">
              <p className="font-semibold text-slate-800 mb-3">Formula Asas PCB:</p>
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <p className="text-center text-slate-700 font-mono text-sm">
                  Pendapatan Bercukai = Gaji Kasar − KWSP − Pelepasan Cukai
                </p>
                <p className="text-center text-slate-700 font-mono text-sm mt-2">
                  PCB Bulanan = Cukai Tahunan ÷ 12
                </p>
              </div>
            </div>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-slate-800">1. Pendapatan Kasar</p>
                <p className="text-slate-600 text-base">
                  Gaji bulanan termasuk elaun yang dikenakan cukai, bonus, komisen, dan
                  pendapatan sampingan yang dilaporkan.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-slate-800">2. Potongan KWSP</p>
                <p className="text-slate-600 text-base">
                  Caruman KWSP pekerja (11% atau kadar pilihan) ditolak daripada pendapatan
                  kasar sebelum dikira cukai.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-slate-800">3. Pelepasan Cukai</p>
                <p className="text-slate-600 text-base">
                  Pelepasan individu (RM9,000), pasangan, anak, dan pelepasan lain yang
                  diisytiharkan melalui Borang TP1.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-slate-800">4. Kadar Cukai Progresif</p>
                <p className="text-slate-600 text-base">
                  Cukai dikira menggunakan kadar progresif LHDN dari 0% hingga 30%
                  bergantung kepada pendapatan bercukai.
                </p>
              </div>
            </div>

            {/* Tax Brackets */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Kadar Cukai Pendapatan Malaysia {currentYear}
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Malaysia menggunakan sistem cukai progresif di mana kadar cukai meningkat
              berdasarkan pendapatan bercukai tahunan:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Pendapatan Bercukai (RM)</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Kadar Cukai</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Cukai Kumulatif (RM)</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr className="bg-emerald-50">
                    <td className="border border-slate-200 px-4 py-3">0 - 5,000</td>
                    <td className="border border-slate-200 px-4 py-3 text-emerald-600 font-medium">0%</td>
                    <td className="border border-slate-200 px-4 py-3">0</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">5,001 - 20,000</td>
                    <td className="border border-slate-200 px-4 py-3">1%</td>
                    <td className="border border-slate-200 px-4 py-3">150</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">20,001 - 35,000</td>
                    <td className="border border-slate-200 px-4 py-3">3%</td>
                    <td className="border border-slate-200 px-4 py-3">600</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">35,001 - 50,000</td>
                    <td className="border border-slate-200 px-4 py-3">6%</td>
                    <td className="border border-slate-200 px-4 py-3">1,500</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">50,001 - 70,000</td>
                    <td className="border border-slate-200 px-4 py-3">11%</td>
                    <td className="border border-slate-200 px-4 py-3">3,700</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">70,001 - 100,000</td>
                    <td className="border border-slate-200 px-4 py-3">19%</td>
                    <td className="border border-slate-200 px-4 py-3">9,400</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">100,001 - 400,000</td>
                    <td className="border border-slate-200 px-4 py-3">25%</td>
                    <td className="border border-slate-200 px-4 py-3">84,400</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">400,001 - 600,000</td>
                    <td className="border border-slate-200 px-4 py-3">26%</td>
                    <td className="border border-slate-200 px-4 py-3">136,400</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">600,001 - 2,000,000</td>
                    <td className="border border-slate-200 px-4 py-3">28%</td>
                    <td className="border border-slate-200 px-4 py-3">528,400</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="border border-slate-200 px-4 py-3">Lebih 2,000,000</td>
                    <td className="border border-slate-200 px-4 py-3 text-red-600 font-medium">30%</td>
                    <td className="border border-slate-200 px-4 py-3">-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Tax Reliefs */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Pelepasan Cukai Yang Mempengaruhi PCB
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Pelepasan cukai mengurangkan pendapatan bercukai anda, yang seterusnya
              mengurangkan jumlah PCB. Berikut adalah pelepasan utama:
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                <p className="font-semibold text-green-800 mb-3">Pelepasan Automatik</p>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li className="flex justify-between">
                    <span>Pelepasan Individu</span>
                    <span className="font-medium">RM9,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>KWSP (maksimum)</span>
                    <span className="font-medium">RM4,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>PERKESO</span>
                    <span className="font-medium">RM350</span>
                  </li>
                  <li className="flex justify-between">
                    <span>EIS</span>
                    <span className="font-medium">RM250</span>
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="font-semibold text-blue-800 mb-3">Pelepasan Keluarga</p>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li className="flex justify-between">
                    <span>Pasangan tidak bekerja</span>
                    <span className="font-medium">RM4,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Anak (bawah 18 tahun)</span>
                    <span className="font-medium">RM2,000/anak</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Anak (18+, belajar)</span>
                    <span className="font-medium">RM8,000/anak</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Anak OKU</span>
                    <span className="font-medium">RM6,000/anak</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="font-semibold text-amber-800 mb-2">Tip: Gunakan Borang TP1</p>
              <p className="text-slate-600 text-sm">
                Untuk mengurangkan PCB anda, serahkan Borang TP1 kepada majikan pada awal
                tahun. Isytiharkan semua pelepasan yang layak seperti insurans nyawa,
                SSPN, yuran pendidikan anak, dan perbelanjaan perubatan ibu bapa. Ini akan
                mengurangkan PCB bulanan anda.
              </p>
            </div>

            {/* PCB vs Final Tax */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              PCB vs Cukai Akhir: Apa Bezanya?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Ramai yang keliru antara PCB dan cukai akhir. Berikut adalah perbezaannya:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Aspek</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">PCB</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Cukai Akhir (e-Filing)</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Bila dikira</td>
                    <td className="border border-slate-200 px-4 py-3">Setiap bulan</td>
                    <td className="border border-slate-200 px-4 py-3">Sekali setahun (April)</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Asas pengiraan</td>
                    <td className="border border-slate-200 px-4 py-3">Anggaran pendapatan tahunan</td>
                    <td className="border border-slate-200 px-4 py-3">Pendapatan sebenar</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Pelepasan</td>
                    <td className="border border-slate-200 px-4 py-3">Berdasarkan Borang TP1</td>
                    <td className="border border-slate-200 px-4 py-3">Semua pelepasan yang layak</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Ketepatan</td>
                    <td className="border border-slate-200 px-4 py-3">Anggaran</td>
                    <td className="border border-slate-200 px-4 py-3">Tepat</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 my-6">
              <p className="font-semibold text-blue-800 mb-3">Contoh Senario:</p>
              <div className="text-slate-600 text-sm space-y-2">
                <p>
                  <strong>Ali</strong> bergaji RM8,000/bulan. PCB bulanannya adalah RM280.
                  Sepanjang tahun, dia bayar PCB = RM280 × 12 = <strong>RM3,360</strong>.
                </p>
                <p>
                  Semasa e-Filing, Ali claim pelepasan tambahan (insurans, SSPN, perubatan).
                  Cukai sebenar dikira = <strong>RM2,800</strong>.
                </p>
                <p className="pt-2 border-t border-blue-200">
                  <strong>Hasil:</strong> Ali layak bayaran balik RM3,360 - RM2,800 =
                  <span className="text-green-600 font-bold"> RM560</span>
                </p>
              </div>
            </div>

            {/* Tips to Reduce PCB */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Cara Jimat PCB Secara Sah
            </h3>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-slate-800">1. Hantar Borang TP1 Lengkap</p>
                <p className="text-slate-600 text-base">
                  Isytiharkan semua pelepasan yang layak pada awal tahun. Semakin banyak
                  pelepasan diisytiharkan, semakin rendah PCB bulanan anda.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-slate-800">2. Caruman KWSP Sukarela</p>
                <p className="text-slate-600 text-base">
                  Caruman tambahan ke KWSP atau PRS layak pelepasan cukai sehingga RM3,000.
                  Ini mengurangkan pendapatan bercukai anda.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-slate-800">3. Simpanan Pendidikan SSPN</p>
                <p className="text-slate-600 text-base">
                  Caruman ke SSPN-i layak pelepasan sehingga RM8,000. Sesuai untuk merancang
                  pendidikan anak sambil menjimatkan cukai.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-slate-800">4. Insurans Nyawa & Kesihatan</p>
                <p className="text-slate-600 text-base">
                  Premium insurans nyawa (RM3,000) dan insurans perubatan (RM3,000) layak
                  pelepasan cukai berasingan.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-slate-800">5. Perbelanjaan Perubatan Ibu Bapa</p>
                <p className="text-slate-600 text-base">
                  Perbelanjaan perubatan untuk ibu bapa layak pelepasan sehingga RM8,000.
                  Simpan semua resit untuk tuntutan.
                </p>
              </div>
            </div>

            {/* FAQ */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Soalan Lazim Tentang PCB
            </h3>

            <div className="space-y-6 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Kenapa PCB saya berbeza dengan rakan sekerja yang sama gaji?
                </p>
                <p className="text-slate-600 text-sm">
                  PCB bergantung kepada status perkahwinan, bilangan anak, dan pelepasan yang
                  diisytiharkan melalui Borang TP1. Dua orang dengan gaji sama boleh mempunyai
                  PCB berbeza kerana faktor-faktor ini.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Adakah saya masih perlu buat e-Filing jika sudah bayar PCB?
                </p>
                <p className="text-slate-600 text-sm">
                  Ya, anda masih perlu memfailkan Borang BE setiap tahun. e-Filing mengesahkan
                  cukai sebenar anda. Jika PCB lebih tinggi, anda akan dapat bayaran balik.
                  Jika kurang, anda perlu membayar baki.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Bolehkah saya minta majikan kurangkan PCB?
                </p>
                <p className="text-slate-600 text-sm">
                  Ya, dengan menghantar Borang TP1 yang mengisytiharkan pelepasan tambahan.
                  Majikan akan mengira semula PCB berdasarkan maklumat tersebut. Anda juga
                  boleh kemaskini Borang TP1 jika ada perubahan (contoh: anak baru lahir).
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Bila PCB akan dikembalikan jika saya terlebih bayar?
                </p>
                <p className="text-slate-600 text-sm">
                  Selepas anda memfailkan e-Filing dan LHDN memproses, bayaran balik biasanya
                  dikreditkan dalam tempoh 30-90 hari ke akaun bank yang didaftarkan.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Adakah bonus dan komisen dikenakan PCB?
                </p>
                <p className="text-slate-600 text-sm">
                  Ya, bonus dan komisen adalah sebahagian daripada pendapatan bercukai dan
                  akan dikenakan PCB. PCB untuk bulan tersebut akan lebih tinggi kerana
                  pendapatan lebih tinggi.
                </p>
              </div>
            </div>

            {/* Final Note */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mt-12">
              <p className="font-semibold text-blue-800 mb-2">Gunakan Kalkulator Ini Dengan Bijak</p>
              <p className="text-slate-600 text-base">
                Kalkulator ini memberikan anggaran PCB berdasarkan kadar cukai {currentYear}.
                Untuk pengiraan tepat, rujuk sistem e-PCB LHDN atau berbincang dengan
                jabatan HR anda. Pastikan anda mengisytiharkan semua pelepasan yang layak
                untuk memaksimumkan penjimatan cukai.
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
