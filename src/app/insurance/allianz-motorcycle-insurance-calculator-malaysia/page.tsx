import MotorcycleInsuranceCalculator from "@/components/MotorcycleInsuranceCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const currentYear = new Date().getFullYear();

export const metadata = {
  title: `Allianz Motorcycle Insurance Calculator Malaysia ${currentYear} - Kira Premium`,
  description:
    "Kalkulator insurans motor Allianz Malaysia. Kira premium insurans motor anda, bandingkan harga dan renew dengan diskaun NCD sehingga 55%.",
  keywords: [
    "allianz motorcycle insurance",
    "allianz motor insurance malaysia",
    "allianz bike insurance",
    "allianz motorcycle quote",
    "allianz comprehensive motorcycle",
    "kalkulator insurans motor allianz",
  ],
};

export default function AllianzMotorcycleInsurancePage() {
  const year = new Date().getFullYear();

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
            Back to All Calculators
          </Link>
        </div>
      </div>

      <MotorcycleInsuranceCalculator
        title={`Allianz Motorcycle Insurance Calculator Malaysia ${year}`}
        subtitle="Kira premium insurans motor Allianz anda di Malaysia"
      />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Allianz Motorcycle Insurance Malaysia: Complete Guide
            </h2>

            <p className="text-slate-600 leading-relaxed">
              Allianz is one of the leading insurance providers in Malaysia, offering comprehensive
              motorcycle insurance coverage. Use our calculator above to estimate your premium and
              compare with other providers.
            </p>

            <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
              Why Choose Allianz Motorcycle Insurance?
            </h3>

            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><strong>24/7 Road Assistance</strong> - Help when you need it most</li>
              <li><strong>Wide Workshop Network</strong> - Over 200 panel workshops</li>
              <li><strong>Fast Claims</strong> - Quick and easy claims process</li>
              <li><strong>Personal Accident Cover</strong> - Additional rider protection</li>
              <li><strong>No Claim Discount</strong> - Up to 55% NCD</li>
            </ul>

            <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
              Allianz Motorcycle Coverage Options
            </h3>

            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-slate-200 rounded-lg">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Coverage</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Third Party</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Comprehensive</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 text-slate-600">Third Party Liability</td>
                    <td className="px-4 py-3 text-green-600">✓</td>
                    <td className="px-4 py-3 text-green-600">✓</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">Own Damage</td>
                    <td className="px-4 py-3 text-red-600">✗</td>
                    <td className="px-4 py-3 text-green-600">✓</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600">Theft Protection</td>
                    <td className="px-4 py-3 text-red-600">✗</td>
                    <td className="px-4 py-3 text-green-600">✓</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">Fire Coverage</td>
                    <td className="px-4 py-3 text-red-600">✗</td>
                    <td className="px-4 py-3 text-green-600">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
              Related Calculators
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 not-prose">
              <Link
                href="/insurance/road-tax-and-motorcycle-insurance-calculator/"
                className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <p className="font-semibold text-slate-800">Motorcycle Insurance Calculator</p>
                <p className="text-sm text-slate-500">Compare all insurers</p>
              </Link>
              <Link
                href="/insurance/cheapest-motorcycle-insurance-calculator-malaysia/"
                className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <p className="font-semibold text-slate-800">Cheapest Motorcycle Insurance</p>
                <p className="text-sm text-slate-500">Find the lowest premium</p>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
