import ASBDividendCalculator from "@/components/ASBDividendCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const currentYear = new Date().getFullYear();

export const metadata = {
  title: `Kalkulator Dividen ASB Malaysia ${currentYear} - Kira Pulangan ASB Anda`,
  description: `Kira dividen ASB anda dengan kalkulator dividen ASB percuma. Kadar dividen ASB terkini ${currentYear} adalah 5.75 sen seunit. Semak pulangan pelaburan ASB anda sekarang.`,
  keywords: [
    "kalkulator dividen asb",
    "calculator asb dividen",
    "kira dividen asb",
    "dividen asb 2026",
    "kadar dividen asb",
    "cara kira dividen asb",
    "asb dividend calculator",
    "asnb dividend",
  ],
};

export default function KalkulatorDividenASBPage() {
  const year = new Date().getFullYear();

  return (
    <div>
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/investment" className="hover:text-slate-900 transition-colors">Investment</Link>
            <span>›</span>
            <span className="text-slate-900">ASB Dividend Calculator</span>
          </div>
        </div>
      </div>

      <ASBDividendCalculator />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Apa Itu Dividen ASB?
            </h2>

            <p className="text-slate-600 leading-relaxed">
              ASB atau Amanah Saham Bumiputera adalah dana unit amanah yang dilancarkan
              pada tahun 1990, diuruskan oleh ASNB (Amanah Saham Nasional Berhad), anak
              syarikat PNB (Permodalan Nasional Bhd). ASB menawarkan harga tetap RM1
              seunit tanpa caj jualan, dengan had maksimum pelaburan RM300,000.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Sehingga {year}, ASB mempunyai lebih 11.4 juta pemegang unit. Dividen ASB
              dikecualikan cukai pendapatan, menjadikannya salah satu pelaburan paling
              menarik untuk rakyat Malaysia.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Kadar Dividen ASB {year}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Berikut adalah sejarah kadar dividen ASB untuk 5 tahun lepas. Dividen
              tahun 2024 dan 2025 adalah yang tertinggi dalam tempoh 5 tahun.
            </p>

            <div className="overflow-x-auto my-6 not-prose">
              <table className="min-w-full border border-slate-200 rounded-lg">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">
                      Tahun
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700 border-b">
                      Dividen
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700 border-b">
                      Bonus
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700 border-b">
                      Jumlah
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700 border-b">
                      Pengagihan
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-emerald-50">
                    <td className="px-4 py-3 text-slate-700 font-medium">2025</td>
                    <td className="px-4 py-3 text-right text-slate-600">5.20%</td>
                    <td className="px-4 py-3 text-right text-slate-600">0.55%</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-600">5.75%</td>
                    <td className="px-4 py-3 text-right text-slate-600">RM10.4 bilion</td>
                  </tr>
                  <tr className="bg-emerald-50">
                    <td className="px-4 py-3 text-slate-700 font-medium">2024</td>
                    <td className="px-4 py-3 text-right text-slate-600">5.50%</td>
                    <td className="px-4 py-3 text-right text-slate-600">0.25%</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-600">5.75%</td>
                    <td className="px-4 py-3 text-right text-slate-600">RM10.1 bilion</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-700 font-medium">2023</td>
                    <td className="px-4 py-3 text-right text-slate-600">4.25%</td>
                    <td className="px-4 py-3 text-right text-slate-600">1.00%</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-700">5.25%</td>
                    <td className="px-4 py-3 text-right text-slate-600">RM9.3 bilion</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 text-slate-700 font-medium">2022</td>
                    <td className="px-4 py-3 text-right text-slate-600">4.00%</td>
                    <td className="px-4 py-3 text-right text-slate-600">0.50%</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-700">4.50%</td>
                    <td className="px-4 py-3 text-right text-slate-400">-</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-700 font-medium">2021</td>
                    <td className="px-4 py-3 text-right text-slate-600">4.25%</td>
                    <td className="px-4 py-3 text-right text-slate-400">-</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-700">4.25%</td>
                    <td className="px-4 py-3 text-right text-slate-400">-</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 text-slate-700 font-medium">2020</td>
                    <td className="px-4 py-3 text-right text-slate-600">4.25%</td>
                    <td className="px-4 py-3 text-right text-slate-400">-</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-700">4.25%</td>
                    <td className="px-4 py-3 text-right text-slate-400">-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Cara Kira Dividen ASB
            </h2>

            <p className="text-slate-600 leading-relaxed">
              Pengiraan dividen ASB adalah mudah. Anda hanya perlu darabkan jumlah
              pelaburan dengan kadar dividen.
            </p>

            <div className="bg-slate-50 rounded-xl p-6 my-6 not-prose">
              <p className="font-semibold text-slate-800 mb-4">Formula Pengiraan:</p>
              <p className="font-mono text-slate-700 bg-white p-4 rounded-lg mb-4">
                Dividen = Jumlah Pelaburan × (Kadar Dividen / 100)
              </p>
              <p className="font-semibold text-slate-800 mb-2">Contoh:</p>
              <p className="text-slate-600">
                Jika anda mempunyai RM50,000 dalam ASB dengan kadar dividen 5.75%:
              </p>
              <p className="font-mono text-slate-700 bg-white p-4 rounded-lg mt-2">
                RM50,000 × 5.75% = <span className="text-blue-600 font-bold">RM2,875</span>
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed">
              <strong>Penting:</strong> Dividen ASB dikira berdasarkan baki minimum
              bulanan. Ini bermakna jika anda membuat pengeluaran pada bila-bila masa
              dalam sebulan, dividen untuk bulan tersebut akan dikira berdasarkan baki
              terendah.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Tips Maksimumkan Dividen ASB
            </h2>

            <ul className="list-disc pl-6 text-slate-600 space-y-3">
              <li>
                <strong>Simpan awal bulan</strong> - Buat simpanan sebelum tarikh 1hb
                setiap bulan untuk memastikan baki anda dikira dari awal bulan.
              </li>
              <li>
                <strong>Elakkan pengeluaran sepanjang tahun</strong> - Setiap
                pengeluaran akan mengurangkan baki minimum bulanan anda, yang
                seterusnya mengurangkan dividen.
              </li>
              <li>
                <strong>Labur semula dividen</strong> - Dengan melabur semula dividen,
                anda boleh mendapat kesan compounding dan meningkatkan pulangan jangka
                panjang.
              </li>
              <li>
                <strong>Pertimbangkan ASB Financing</strong> - Dengan pembiayaan ASB,
                anda boleh melabur jumlah yang lebih besar dan mendapat pulangan lebih
                tinggi (pastikan kadar dividen lebih tinggi daripada kadar pinjaman).
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Soalan Lazim Dividen ASB
            </h2>

            <div className="space-y-6 not-prose">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Bila dividen ASB diumumkan?
                </p>
                <p className="text-slate-600">
                  Dividen ASB biasanya diumumkan pada hujung Disember setiap tahun,
                  selepas Mesyuarat Agung Tahunan (AGM) ASNB.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Bila dividen dikreditkan ke akaun?
                </p>
                <p className="text-slate-600">
                  Dividen akan dikreditkan secara automatik ke akaun ASB anda pada 1
                  Januari tahun berikutnya.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Adakah dividen ASB dikenakan cukai?
                </p>
                <p className="text-slate-600">
                  Tidak, dividen ASB dikecualikan cukai pendapatan. Pulangan anda adalah
                  bebas cukai sepenuhnya.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Berapakah had maksimum pelaburan ASB?
                </p>
                <p className="text-slate-600">
                  Had maksimum untuk ASB adalah RM300,000. Anda boleh melabur tambahan
                  RM300,000 lagi dalam ASB2, menjadikan jumlah maksimum RM600,000.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Bagaimana cara buka akaun ASB?
                </p>
                <p className="text-slate-600">
                  Anda boleh membuka akaun ASB di mana-mana cawangan ASNB, ejen ASNB
                  yang sah, atau secara online melalui aplikasi myASNB. Anda perlu
                  membawa MyKad dan minimum RM10 untuk deposit pertama.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Kalkulator Berkaitan
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 not-prose">
              <Link
                href="/tax/epf-retirement-calculator-malaysia/"
                className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <p className="font-semibold text-slate-800">EPF Calculator</p>
                <p className="text-sm text-slate-500">Kira simpanan persaraan KWSP</p>
              </Link>
              <Link
                href="/tax/monthly-salary-calculator-malaysia/"
                className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <p className="font-semibold text-slate-800">Salary Calculator</p>
                <p className="text-sm text-slate-500">Kira gaji bersih bulanan</p>
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Kalkulator Cukai</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/tax/kalkulator-pcb-bulanan-malaysia/" className="hover:text-white transition-colors">
                    Kalkulator PCB
                  </Link>
                </li>
                <li>
                  <Link href="/tax/monthly-salary-calculator-malaysia/" className="hover:text-white transition-colors">
                    Salary Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/tax/epf-retirement-calculator-malaysia/" className="hover:text-white transition-colors">
                    EPF Calculator
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Kalkulator Pinjaman</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/loan/personal-loan-calculator-malaysia/" className="hover:text-white transition-colors">
                    Personal Loan
                  </Link>
                </li>
                <li>
                  <Link href="/loan/home-loan-calculator-malaysia/" className="hover:text-white transition-colors">
                    Home Loan
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Kalkulator Insurans</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/insurance/car-insurance-calculator-malaysia/" className="hover:text-white transition-colors">
                    Car Insurance
                  </Link>
                </li>
                <li>
                  <Link href="/insurance/kalkulator-insurans-motor-malaysia/" className="hover:text-white transition-colors">
                    Insurans Motor
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Pelaburan</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/investment/kalkulator-dividen-asb-malaysia/" className="hover:text-white transition-colors">
                    Kalkulator ASB
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
            © {year} Calculator Malaysia. All calculators are free to use.
          </div>
        </div>
      </footer>
    </div>
  );
}
