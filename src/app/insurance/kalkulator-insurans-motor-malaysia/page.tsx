import MotorcycleInsuranceCalculator from "@/components/MotorcycleInsuranceCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Kalkulator Insurans Motor Malaysia 2026 | Kira Premium Motosikal",
  description:
    "Kira premium insurans motor anda dengan segera. Bandingkan insurans third party dan komprehensif untuk semua jenis motosikal di Malaysia.",
  keywords: [
    "kalkulator insurans motor",
    "insurans motosikal malaysia",
    "kira insurans motor",
    "premium insurans motor",
    "insurans motor murah",
  ],
};

export default function KalkulatorInsuransMotorPage() {
  return (
    <div>
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

      <MotorcycleInsuranceCalculator />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Kalkulator Insurans Motor Malaysia: Panduan Lengkap
            </h2>

            <p className="text-slate-600 leading-relaxed">
              Gunakan kalkulator di atas untuk mengira anggaran premium insurans motor anda.
              Sama ada anda menunggang kapchai atau superbike, kami boleh membantu anda
              mendapatkan sebut harga dalam beberapa saat.
            </p>

            <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
              Jenis Insurans Motor
            </h3>

            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><strong>Third Party (Pihak Ketiga)</strong> - Melindungi pihak ketiga sahaja. Paling murah.</li>
              <li><strong>Komprehensif</strong> - Melindungi motor anda dan pihak ketiga. Lebih mahal tetapi perlindungan penuh.</li>
            </ul>

            <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
              Kadar Premium Insurans Motor 2026
            </h3>

            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-slate-200 rounded-lg">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Kapasiti Enjin</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Third Party</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Komprehensif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 text-slate-600">Bawah 150cc</td>
                    <td className="px-4 py-3 text-slate-600">RM67.50</td>
                    <td className="px-4 py-3 text-slate-600">RM150+</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">150cc - 250cc</td>
                    <td className="px-4 py-3 text-slate-600">RM90</td>
                    <td className="px-4 py-3 text-slate-600">RM300+</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600">250cc - 500cc</td>
                    <td className="px-4 py-3 text-slate-600">RM180</td>
                    <td className="px-4 py-3 text-slate-600">RM500+</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">Atas 500cc</td>
                    <td className="px-4 py-3 text-slate-600">RM360</td>
                    <td className="px-4 py-3 text-slate-600">RM800+</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
              Tips Jimat Insurans Motor
            </h3>

            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><strong>Kekalkan NCD</strong> - Diskaun sehingga 55% untuk tahun tanpa tuntutan</li>
              <li><strong>Bandingkan harga</strong> - Harga berbeza antara syarikat insurans</li>
              <li><strong>Bayar tepat masa</strong> - Jangan biarkan insurans tamat tempoh</li>
              <li><strong>Pilih third party</strong> - Jika motor anda sudah lama, ini lebih berbaloi</li>
            </ul>

            <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
              Kalkulator Berkaitan
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 not-prose">
              <Link
                href="/insurance/road-tax-and-motorcycle-insurance-calculator/"
                className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <p className="font-semibold text-slate-800">Motorcycle Insurance Calculator</p>
                <p className="text-sm text-slate-500">English version</p>
              </Link>
              <Link
                href="/insurance/cheapest-motorcycle-insurance-calculator-malaysia/"
                className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <p className="font-semibold text-slate-800">Insurans Motor Termurah</p>
                <p className="text-sm text-slate-500">Cari harga paling murah</p>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
