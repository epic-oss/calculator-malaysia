import MotorcycleInsuranceCalculator from "@/components/MotorcycleInsuranceCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Cheapest Motorcycle Insurance Malaysia 2026 | Compare & Save",
  description:
    "Find the cheapest motorcycle insurance in Malaysia. Compare quotes from all insurers and save up to 30% on your premium. Instant calculation.",
  keywords: [
    "cheapest motorcycle insurance malaysia",
    "murah insurans motor",
    "cheap bike insurance",
    "lowest motorcycle premium",
    "motorcycle insurance comparison",
  ],
};

export default function CheapestMotorcycleInsurancePage() {
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

      <MotorcycleInsuranceCalculator />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              How to Find the Cheapest Motorcycle Insurance in Malaysia
            </h2>

            <p className="text-slate-600 leading-relaxed">
              Looking for the cheapest motorcycle insurance? You&apos;re not alone. With premiums
              varying significantly between insurers, knowing how to compare can save you
              hundreds of ringgit every year.
            </p>

            <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
              Tips to Get the Cheapest Premium
            </h3>

            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><strong>Maintain your NCD</strong> - Up to 55% discount for claim-free years</li>
              <li><strong>Choose Third Party</strong> - Much cheaper than comprehensive</li>
              <li><strong>Compare multiple insurers</strong> - Prices vary significantly</li>
              <li><strong>Renew on time</strong> - Don&apos;t let your NCD lapse</li>
              <li><strong>Install anti-theft device</strong> - Some insurers offer discounts</li>
            </ul>

            <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
              Cheapest Motorcycle Insurance by Engine CC
            </h3>

            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-slate-200 rounded-lg">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Engine CC</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Third Party (from)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Comprehensive (from)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 text-slate-600">Below 150cc</td>
                    <td className="px-4 py-3 text-green-600 font-semibold">RM67.50</td>
                    <td className="px-4 py-3 text-slate-600">RM150+</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">150cc - 250cc</td>
                    <td className="px-4 py-3 text-green-600 font-semibold">RM90</td>
                    <td className="px-4 py-3 text-slate-600">RM300+</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600">250cc - 500cc</td>
                    <td className="px-4 py-3 text-green-600 font-semibold">RM180</td>
                    <td className="px-4 py-3 text-slate-600">RM500+</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">Above 500cc</td>
                    <td className="px-4 py-3 text-green-600 font-semibold">RM360</td>
                    <td className="px-4 py-3 text-slate-600">RM800+</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-6">
              <p className="text-amber-800 text-sm">
                <strong>Pro Tip:</strong> Third party insurance is often 50-70% cheaper than
                comprehensive. If your motorcycle is older or low-value, third party might
                be the smarter choice.
              </p>
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
                <p className="text-sm text-slate-500">Full calculation with road tax</p>
              </Link>
              <Link
                href="/insurance/allianz-motorcycle-insurance-calculator-malaysia/"
                className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <p className="font-semibold text-slate-800">Allianz Motorcycle Insurance</p>
                <p className="text-sm text-slate-500">Get Allianz quote</p>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
