import CarLoanSettlementCalculator from "@/components/CarLoanSettlementCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Car Loan Calculator Malaysia 2026 | Monthly Payment & Settlement",
  description:
    "Calculate your car loan monthly payment, total interest, and early settlement savings. Compare hire purchase rates from Malaysian banks.",
  keywords: [
    "car loan calculator malaysia",
    "hire purchase calculator",
    "car financing calculator",
    "car loan interest calculator",
    "car loan monthly payment",
  ],
};

export default function CarLoanCalculatorPage() {
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

      <CarLoanSettlementCalculator />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Car Loan Calculator Malaysia: Complete Guide
            </h2>

            <p className="text-slate-600 leading-relaxed">
              Planning to buy a car in Malaysia? Use our car loan calculator to estimate your
              monthly payments, total interest, and see if early settlement makes financial sense.
              This calculator works for all hire purchase loans from Malaysian banks.
            </p>

            <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
              How Car Loans Work in Malaysia
            </h3>

            <p className="text-slate-600 leading-relaxed">
              In Malaysia, car loans are typically structured as hire purchase (HP) agreements.
              Unlike home loans, the interest is calculated on the full loan amount upfront using
              the Rule of 78 method. This means:
            </p>

            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Interest is front-loaded in early payments</li>
              <li>Early settlement may incur rebate calculations</li>
              <li>Interest rates typically range from 2.5% to 4% per annum</li>
              <li>Loan tenure usually 5-9 years</li>
            </ul>

            <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
              Car Loan Interest Rates in Malaysia 2026
            </h3>

            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-slate-200 rounded-lg">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Bank</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">New Car Rate</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Used Car Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 text-slate-600">Maybank</td>
                    <td className="px-4 py-3 text-slate-600">2.47% - 3.20%</td>
                    <td className="px-4 py-3 text-slate-600">3.50% - 4.50%</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">Public Bank</td>
                    <td className="px-4 py-3 text-slate-600">2.50% - 3.30%</td>
                    <td className="px-4 py-3 text-slate-600">3.60% - 4.60%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600">CIMB</td>
                    <td className="px-4 py-3 text-slate-600">2.48% - 3.25%</td>
                    <td className="px-4 py-3 text-slate-600">3.55% - 4.55%</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">Hong Leong</td>
                    <td className="px-4 py-3 text-slate-600">2.55% - 3.35%</td>
                    <td className="px-4 py-3 text-slate-600">3.65% - 4.65%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
              Tips for Getting the Best Car Loan
            </h3>

            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><strong>Compare rates</strong> - Don&apos;t just accept the dealer&apos;s financing</li>
              <li><strong>Check your credit score</strong> - Better scores get better rates</li>
              <li><strong>Consider shorter tenure</strong> - Pay less total interest</li>
              <li><strong>Make a larger down payment</strong> - Reduce your loan amount</li>
              <li><strong>Negotiate</strong> - Interest rates are often negotiable</li>
            </ul>

            <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
              Related Calculators
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 not-prose">
              <Link
                href="/loan/car-loan-settlement-calculator-malaysia/"
                className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <p className="font-semibold text-slate-800">Car Loan Settlement Calculator</p>
                <p className="text-sm text-slate-500">Calculate early settlement savings</p>
              </Link>
              <Link
                href="/loan/personal-loan-calculator-malaysia-based-on-salary/"
                className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <p className="font-semibold text-slate-800">Personal Loan Calculator</p>
                <p className="text-sm text-slate-500">Compare with personal loan rates</p>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
