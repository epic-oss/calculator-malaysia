import CreditCardInterestCalculator from "@/components/CreditCardInterestCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Credit Card Calculator Malaysia 2026 | Interest & Repayment",
  description:
    "Calculate credit card interest, minimum payment impact, and time to pay off debt. Compare credit card rates and find the best repayment strategy.",
  keywords: [
    "credit card calculator malaysia",
    "credit card interest calculator",
    "credit card payment calculator",
    "credit card debt calculator",
    "credit card comparison malaysia",
  ],
};

export default function CreditCardCalculatorPage() {
  return (
    <div>
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/credit-card" className="hover:text-slate-900 transition-colors">Credit Cards</Link>
            <span>›</span>
            <span className="text-slate-900">Credit Card Calculator</span>
          </div>
        </div>
      </div>

      <CreditCardInterestCalculator />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Credit Card Calculator Malaysia: Complete Guide
            </h2>

            <p className="text-slate-600 leading-relaxed">
              Understanding your credit card interest and repayment options is crucial for
              managing your finances. Use our credit card calculator to see how different
              payment strategies affect your debt payoff time and total interest paid.
            </p>

            <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
              Credit Card Interest Rates in Malaysia
            </h3>

            <p className="text-slate-600 leading-relaxed">
              Bank Negara Malaysia (BNM) regulates credit card interest rates based on your
              payment history:
            </p>

            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><strong>15% p.a.</strong> - Excellent payment record (pay in full for 12 months)</li>
              <li><strong>17% p.a.</strong> - Good payment record (no missed payments)</li>
              <li><strong>18% p.a.</strong> - Standard rate / missed payments</li>
            </ul>

            <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
              Best Credit Cards in Malaysia 2026
            </h3>

            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-slate-200 rounded-lg">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Card</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Cashback</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Annual Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 text-slate-600">Maybank 2 Cards</td>
                    <td className="px-4 py-3 text-slate-600">5% weekend, 5% weekday</td>
                    <td className="px-4 py-3 text-slate-600">RM250 (waivable)</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">Public Bank Quantum</td>
                    <td className="px-4 py-3 text-slate-600">Up to 5%</td>
                    <td className="px-4 py-3 text-slate-600">Free for life</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600">CIMB Cash Rebate</td>
                    <td className="px-4 py-3 text-slate-600">Up to 5%</td>
                    <td className="px-4 py-3 text-slate-600">RM200 (waivable)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
              Tips to Reduce Credit Card Interest
            </h3>

            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><strong>Pay in full</strong> - Avoid interest charges entirely</li>
              <li><strong>Pay more than minimum</strong> - Reduce principal faster</li>
              <li><strong>Consider balance transfer</strong> - Move debt to 0% promo rate</li>
              <li><strong>Set up auto-pay</strong> - Never miss a payment</li>
              <li><strong>Call your bank</strong> - Request lower rate if you have good history</li>
            </ul>

            <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
              Related Calculators
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 not-prose">
              <Link
                href="/credit-card/credit-card-interest-calculator-malaysia/"
                className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <p className="font-semibold text-slate-800">Interest Calculator</p>
                <p className="text-sm text-slate-500">Calculate daily interest charges</p>
              </Link>
              <Link
                href="/credit-card/credit-card-minimum-payment-calculator-malaysia/"
                className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <p className="font-semibold text-slate-800">Minimum Payment Calculator</p>
                <p className="text-sm text-slate-500">See how long to pay off with minimum</p>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
