import type { Metadata } from "next";
import HomeLoanEligibilityCalculator from "@/components/HomeLoanEligibilityCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home Loan Eligibility Calculator Malaysia 2026 | Check DSR & Max Loan",
  description:
    "Calculate your home loan eligibility in Malaysia. Check maximum loan amount, DSR ratio, margin of finance for 1st/2nd/3rd property. Free instant results.",
  keywords: [
    "home loan eligibility calculator malaysia",
    "housing loan eligibility",
    "dsr calculator malaysia",
    "maximum loan calculator",
    "property loan eligibility",
    "home loan malaysia 2026",
    "dsr ratio calculator",
    "bank negara dsr",
    "margin of finance calculator",
    "first property loan",
    "second property loan",
    "loan eligibility check",
  ],
  openGraph: {
    title: "Home Loan Eligibility Calculator Malaysia 2026",
    description:
      "Check how much housing loan you qualify for. Calculate DSR, maximum loan amount, and estimated costs.",
    type: "website",
    locale: "en_MY",
  },
};

export default function HomeLoanEligibilityCalculatorPage() {
  return (
    <>
      <Navbar />

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
            <span className="text-slate-900">Home Loan Eligibility</span>
          </div>
        </div>
      </div>

      <HomeLoanEligibilityCalculator />

      {/* SEO Content Section */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">

          <article className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              How to Check Your Home Loan Eligibility in Malaysia
            </h2>

            <p className="text-slate-600 mb-6">
              Before house hunting, it&apos;s crucial to know how much housing loan you can get
              approved for. This home loan eligibility calculator helps you understand your
              borrowing capacity based on your income, existing debts, and Bank Negara&apos;s DSR
              (Debt Service Ratio) guidelines.
            </p>

            {/* What is DSR Section */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                What is DSR (Debt Service Ratio)?
              </h3>

              <p className="text-slate-600 mb-4">
                DSR is the percentage of your gross monthly income that goes toward paying debts.
                Malaysian banks use DSR to determine if you can afford a new loan.
              </p>

              <div className="bg-white rounded-xl p-4 mb-4">
                <p className="text-sm font-medium text-slate-600 mb-2">DSR Formula:</p>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="font-mono text-blue-800">
                    DSR = (Total Monthly Commitments + Proposed Instalment) ÷ Gross Income × 100%
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-200 px-4 py-2 text-left">DSR Range</th>
                      <th className="border border-slate-200 px-4 py-2 text-left">Status</th>
                      <th className="border border-slate-200 px-4 py-2 text-left">
                        Approval Likelihood
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2 font-medium text-emerald-600">
                        Below 40%
                      </td>
                      <td className="border border-slate-200 px-4 py-2">Excellent</td>
                      <td className="border border-slate-200 px-4 py-2">Very High</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium text-amber-600">
                        40% - 50%
                      </td>
                      <td className="border border-slate-200 px-4 py-2">Moderate</td>
                      <td className="border border-slate-200 px-4 py-2">Good (depends on profile)</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2 font-medium text-red-600">
                        50% - 60%
                      </td>
                      <td className="border border-slate-200 px-4 py-2">High</td>
                      <td className="border border-slate-200 px-4 py-2">May face challenges</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium text-red-700">
                        Above 60%
                      </td>
                      <td className="border border-slate-200 px-4 py-2">Very High</td>
                      <td className="border border-slate-200 px-4 py-2">Usually rejected</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Margin of Finance Section */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🏦</span>
                Margin of Finance (MOF) by Property Count
              </h3>

              <p className="text-slate-600 mb-4">
                Bank Negara Malaysia regulates the maximum loan-to-value (LTV) ratio based on how
                many properties you already own. This determines how much down payment you need.
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-emerald-600">90%</p>
                  <p className="font-semibold text-slate-800 mt-1">First Property</p>
                  <p className="text-xs text-slate-500 mt-1">10% down payment required</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-amber-600">70%</p>
                  <p className="font-semibold text-slate-800 mt-1">Second Property</p>
                  <p className="text-xs text-slate-500 mt-1">30% down payment required</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-red-600">60%</p>
                  <p className="font-semibold text-slate-800 mt-1">Third Property+</p>
                  <p className="text-xs text-slate-500 mt-1">40% down payment required</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Properties below RM500,000 may qualify for up to 100%
                  financing for first-time buyers under certain government schemes.
                </p>
              </div>
            </div>

            {/* What Counts as Commitment */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📝</span>
                What Counts as Monthly Commitments?
              </h3>

              <p className="text-slate-600 mb-4">
                When calculating DSR, banks consider all your existing debt obligations:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800 mb-2">Included:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Car loan instalments</li>
                    <li>• Personal loan payments</li>
                    <li>• Credit card minimum payments (5% of limit)</li>
                    <li>• PTPTN repayments</li>
                    <li>• Existing housing loans</li>
                    <li>• Hire purchase payments</li>
                    <li>• ASNB financing</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800 mb-2">Not Included:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Utility bills</li>
                    <li>• Phone bills</li>
                    <li>• Insurance premiums</li>
                    <li>• Rent payments</li>
                    <li>• Groceries & living expenses</li>
                    <li>• Entertainment subscriptions</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mt-4">
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> Banks calculate credit card commitment as 5% of your
                  total credit limit, not your actual spending. Having high credit limits can reduce
                  your loan eligibility even if you pay in full monthly.
                </p>
              </div>
            </div>

            {/* How to Improve Eligibility */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                How to Improve Your Loan Eligibility
              </h3>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">1. Reduce Credit Card Limits</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Lower your credit card limits to reduce the calculated commitment. Even unused
                    credit counts against you.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">2. Pay Off Small Loans</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Clear personal loans or hire purchase before applying. This immediately improves
                    your DSR.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">3. Apply as Joint Borrower</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Combining income with your spouse can significantly increase your loan
                    eligibility.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">4. Extend Loan Tenure</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Longer tenure means lower monthly instalments, improving your DSR. Max 35 years
                    or age 70.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">5. Declare All Income Sources</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Include rental income, commissions, bonuses, and side income with proper
                    documentation.
                  </p>
                </div>
              </div>
            </div>

            {/* Upfront Costs */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Upfront Costs When Buying Property in Malaysia
              </h3>

              <p className="text-slate-600 mb-4">
                Besides the down payment, you need to budget for these additional costs:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-200 px-4 py-2 text-left">Cost Type</th>
                      <th className="border border-slate-200 px-4 py-2 text-left">Typical Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2 font-medium">
                        Down Payment
                      </td>
                      <td className="border border-slate-200 px-4 py-2">
                        10-40% (based on property count)
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium">Stamp Duty</td>
                      <td className="border border-slate-200 px-4 py-2">1-4% of property price</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2 font-medium">Legal Fees</td>
                      <td className="border border-slate-200 px-4 py-2">0.5-1% of property price</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium">
                        Valuation Fee
                      </td>
                      <td className="border border-slate-200 px-4 py-2">RM300 - RM1,500</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2 font-medium">
                        MRTA/MLTA Insurance
                      </td>
                      <td className="border border-slate-200 px-4 py-2">2-5% of loan amount</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium">
                        Fire Insurance
                      </td>
                      <td className="border border-slate-200 px-4 py-2">RM300 - RM800 per year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mt-4">
                <p className="text-sm text-emerald-800">
                  <strong>Tip:</strong> Budget at least 5% extra on top of down payment for
                  miscellaneous costs including renovation, moving, and furniture.
                </p>
              </div>
            </div>

            {/* Stamp Duty Rates */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📜</span>
                Stamp Duty Rates in Malaysia 2026
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-200 px-4 py-2 text-left">
                        Property Value
                      </th>
                      <th className="border border-slate-200 px-4 py-2 text-left">Stamp Duty Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2">First RM100,000</td>
                      <td className="border border-slate-200 px-4 py-2 font-medium">1%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2">
                        RM100,001 - RM500,000
                      </td>
                      <td className="border border-slate-200 px-4 py-2 font-medium">2%</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2">
                        RM500,001 - RM1,000,000
                      </td>
                      <td className="border border-slate-200 px-4 py-2 font-medium">3%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2">Above RM1,000,000</td>
                      <td className="border border-slate-200 px-4 py-2 font-medium">4%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>First-Time Buyer Exemption:</strong> First-time home buyers may qualify
                  for stamp duty exemptions on properties up to RM500,000 under government
                  initiatives. Check current schemes before purchasing.
                </p>
              </div>
            </div>

            {/* Bank Requirements */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Documents Required for Home Loan Application
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800 mb-2">Employed Applicants:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• IC (front & back)</li>
                    <li>• Latest 3 months payslip</li>
                    <li>• Latest EPF statement</li>
                    <li>• Latest 6 months bank statements</li>
                    <li>• EA form / Income tax returns</li>
                    <li>• Employment confirmation letter</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800 mb-2">Self-Employed Applicants:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• IC (front & back)</li>
                    <li>• Business registration (SSM)</li>
                    <li>• Latest 2 years tax returns (BE/B form)</li>
                    <li>• Latest 6-12 months bank statements</li>
                    <li>• Business financial statements</li>
                    <li>• Company profile (if applicable)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">❓</span>
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    What is the maximum loan tenure in Malaysia?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Maximum loan tenure is 35 years, or until you reach age 70 (for most banks),
                    whichever comes first. Some banks allow up to age 75 for select customers.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    Can I get 100% financing?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    100% financing is available for first-time buyers under government schemes like
                    Skim Rumah Pertamaku for properties below RM500,000. Otherwise, maximum is 90%
                    for first property.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    What income do banks accept?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Banks accept basic salary, fixed allowances, consistent overtime, commissions
                    (with 2+ years history), rental income, and business income with proper
                    documentation.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    How long does loan approval take?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Letter of Offer typically takes 1-2 weeks after submission of complete
                    documents. Full disbursement usually takes 2-3 months from approval.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    Will multiple loan applications affect my credit score?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Yes, multiple applications within a short period can temporarily lower your
                    score. It&apos;s best to shop around for rates first, then submit applications
                    to 2-3 banks within a 2-week window.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    What is MRTA vs MLTA?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    MRTA (Mortgage Reducing Term Assurance) coverage decreases as you pay down your
                    loan. MLTA (Mortgage Level Term Assurance) maintains the same coverage
                    throughout. MRTA is cheaper but MLTA offers better protection.
                  </p>
                </details>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 mt-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🧮</span>
                Related Calculators
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  href="/loan/housing-loan-calculator/"
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏡</span>
                    <div>
                      <p className="font-semibold text-slate-800">Housing Loan Calculator</p>
                      <p className="text-xs text-slate-500">
                        Calculate exact monthly instalment
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/loan/joint-home-loan-eligibility-calculator/"
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👫</span>
                    <div>
                      <p className="font-semibold text-slate-800">Joint Home Loan Calculator</p>
                      <p className="text-xs text-slate-500">Calculate eligibility as a couple</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/loan/early-housing-loan-settlement-calculator-malaysia/"
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏠</span>
                    <div>
                      <p className="font-semibold text-slate-800">Early Settlement Calculator</p>
                      <p className="text-xs text-slate-500">Check if settling early saves money</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/salary/monthly-salary-calculator/"
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="font-semibold text-slate-800">Salary Calculator</p>
                      <p className="text-xs text-slate-500">Calculate your net take-home pay</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-slate-100 rounded-xl p-4 mt-8">
              <p className="text-xs text-slate-500">
                <strong>Disclaimer:</strong> This calculator provides estimates only. Actual loan
                approval depends on bank&apos;s assessment of your credit profile, employment
                stability, property valuation, and other factors. Different banks may have different
                DSR thresholds and policies. Consult with a bank officer or mortgage specialist for
                accurate eligibility assessment.
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
