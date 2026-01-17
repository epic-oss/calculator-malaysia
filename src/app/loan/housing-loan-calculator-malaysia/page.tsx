import type { Metadata } from "next";
import HousingLoanCalculator from "@/components/HousingLoanCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Housing Loan Calculator Malaysia 2026 | Calculate Monthly Instalment",
  description:
    "Calculate housing loan monthly instalment, total interest, stamp duty, and legal fees. Free calculator with first-time buyer exemption check.",
  keywords: [
    "housing loan calculator malaysia",
    "home loan calculator",
    "mortgage calculator malaysia",
    "monthly instalment calculator",
    "housing loan interest calculator",
    "stamp duty calculator malaysia",
    "legal fees calculator property",
    "first time buyer exemption",
    "loan repayment calculator",
    "property loan calculator",
  ],
  openGraph: {
    title: "Housing Loan Calculator Malaysia 2026",
    description:
      "Calculate your monthly instalment, total interest, and upfront costs for buying property in Malaysia.",
    type: "website",
    locale: "en_MY",
  },
};

export default function HousingLoanCalculatorPage() {
  return (
    <>
      <HousingLoanCalculator />

      {/* SEO Content Section */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/#loan" className="hover:text-blue-600">
              Loan Calculators
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800">Housing Loan Calculator</span>
          </nav>

          <article className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              How Housing Loan Interest is Calculated in Malaysia
            </h2>

            <p className="text-slate-600 mb-6">
              Malaysian banks use the <strong>reducing balance method</strong> for housing loans.
              Interest is charged on the outstanding principal, not the original loan amount. As you
              pay down the principal each month, the interest portion decreases over time.
            </p>

            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📐</span>
                Monthly Instalment Formula
              </h3>

              <div className="bg-white rounded-xl p-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="font-mono text-blue-800 text-lg">
                    M = P × [r(1+r)<sup>n</sup>] / [(1+r)<sup>n</sup> – 1]
                  </p>
                </div>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p>
                    <strong>M</strong> = Monthly instalment
                  </p>
                  <p>
                    <strong>P</strong> = Principal (loan amount)
                  </p>
                  <p>
                    <strong>r</strong> = Monthly interest rate (annual rate ÷ 12)
                  </p>
                  <p>
                    <strong>n</strong> = Number of months (tenure × 12)
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                  <strong>Example:</strong> A RM450,000 loan at 4.5% for 30 years (360 months) = RM2,280/month.
                  Total repayment = RM820,923, meaning RM370,923 goes to interest.
                </p>
              </div>
            </div>

            {/* Stamp Duty Rates */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📜</span>
                Stamp Duty Rates 2026 (For Malaysians)
              </h3>

              <h4 className="text-lg font-semibold text-slate-700 mt-4 mb-3">
                Instrument of Transfer (MOT/DOA)
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-200 px-4 py-2 text-left">Property Value</th>
                      <th className="border border-slate-200 px-4 py-2 text-left">Rate</th>
                      <th className="border border-slate-200 px-4 py-2 text-left">Maximum</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2">First RM100,000</td>
                      <td className="border border-slate-200 px-4 py-2 font-medium">1%</td>
                      <td className="border border-slate-200 px-4 py-2">RM1,000</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2">RM100,001 - RM500,000</td>
                      <td className="border border-slate-200 px-4 py-2 font-medium">2%</td>
                      <td className="border border-slate-200 px-4 py-2">RM8,000</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2">RM500,001 - RM1,000,000</td>
                      <td className="border border-slate-200 px-4 py-2 font-medium">3%</td>
                      <td className="border border-slate-200 px-4 py-2">RM15,000</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2">Above RM1,000,000</td>
                      <td className="border border-slate-200 px-4 py-2 font-medium">4%</td>
                      <td className="border border-slate-200 px-4 py-2">No limit</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="text-lg font-semibold text-slate-700 mt-6 mb-3">
                Loan Agreement Stamp Duty
              </h4>

              <div className="bg-white rounded-xl p-4">
                <p className="text-slate-600">
                  Fixed rate: <strong className="text-blue-600">0.5%</strong> of loan amount
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  Example: RM450,000 loan × 0.5% = RM2,250 stamp duty
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mt-4">
                <h4 className="font-semibold text-emerald-800 mb-2">
                  First-Time Buyer Exemption
                </h4>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• Full exemption on MOT and loan stamp duty</li>
                  <li>• Applies to properties ≤RM500,000</li>
                  <li>• Maximum savings: approximately RM11,250</li>
                  <li>• Must be Malaysian citizen and first property</li>
                </ul>
              </div>
            </div>

            {/* Legal Fees */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚖️</span>
                Legal Fees 2026 (Solicitors Remuneration Order 2023)
              </h3>

              <p className="text-slate-600 mb-4">
                Legal fees apply to both the Sale & Purchase Agreement (SPA) and Loan Agreement.
                The same scale applies to both documents.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-200 px-4 py-2 text-left">
                        Property/Loan Value
                      </th>
                      <th className="border border-slate-200 px-4 py-2 text-left">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2">First RM500,000</td>
                      <td className="border border-slate-200 px-4 py-2 font-medium">1.25%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2">
                        Next RM500,000 (RM500k - RM1M)
                      </td>
                      <td className="border border-slate-200 px-4 py-2 font-medium">1.00%</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2">
                        Next RM2,000,000 (RM1M - RM3M)
                      </td>
                      <td className="border border-slate-200 px-4 py-2 font-medium">0.80%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2">
                        Next RM2,000,000 (RM3M - RM5M)
                      </td>
                      <td className="border border-slate-200 px-4 py-2 font-medium">0.70%</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2">
                        Next RM2,500,000 (RM5M - RM7.5M)
                      </td>
                      <td className="border border-slate-200 px-4 py-2 font-medium">0.60%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2">Above RM7,500,000</td>
                      <td className="border border-slate-200 px-4 py-2 font-medium">Negotiable</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> These are professional fees only. Additional disbursements
                  (registration fees, search fees, etc.) typically add RM500-1,500.
                </p>
              </div>
            </div>

            {/* Fixed vs Floating Rate */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Fixed vs Floating Interest Rate
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Fixed Rate</h4>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>
                      <strong>+</strong> Rate stays same for lock-in period (usually 3-5 years)
                    </li>
                    <li>
                      <strong>+</strong> Protection against rate increases
                    </li>
                    <li>
                      <strong>+</strong> Easier to budget with predictable payments
                    </li>
                    <li>
                      <strong>−</strong> Usually slightly higher initial rate
                    </li>
                    <li>
                      <strong>−</strong> Cannot benefit if rates drop
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4 border border-indigo-200">
                  <h4 className="font-semibold text-indigo-800 mb-2">Floating Rate</h4>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>
                      <strong>+</strong> Tied to Base Rate (BR) + spread
                    </li>
                    <li>
                      <strong>+</strong> Can be lower if BR drops
                    </li>
                    <li>
                      <strong>+</strong> Often starts lower than fixed rate
                    </li>
                    <li>
                      <strong>−</strong> Payment changes when BR changes
                    </li>
                    <li>
                      <strong>−</strong> Risk of payment increasing
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Current Base Rates */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🏦</span>
                Current Base Rates 2026
              </h3>

              <p className="text-slate-600 mb-4">
                Base Rate (BR) varies by bank, typically <strong>2.75% - 3.50%</strong>. Your
                effective interest rate = BR + spread (usually 1.50% - 2.50%).
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-200 px-4 py-2 text-left">Bank</th>
                      <th className="border border-slate-200 px-4 py-2 text-left">Base Rate</th>
                      <th className="border border-slate-200 px-4 py-2 text-left">
                        Typical Effective Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600">
                    <tr>
                      <td className="border border-slate-200 px-4 py-2">Maybank</td>
                      <td className="border border-slate-200 px-4 py-2">2.75%</td>
                      <td className="border border-slate-200 px-4 py-2">4.20% - 4.75%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2">CIMB</td>
                      <td className="border border-slate-200 px-4 py-2">2.77%</td>
                      <td className="border border-slate-200 px-4 py-2">4.25% - 4.80%</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2">Public Bank</td>
                      <td className="border border-slate-200 px-4 py-2">2.72%</td>
                      <td className="border border-slate-200 px-4 py-2">4.15% - 4.70%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2">Hong Leong Bank</td>
                      <td className="border border-slate-200 px-4 py-2">2.85%</td>
                      <td className="border border-slate-200 px-4 py-2">4.30% - 4.85%</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2">RHB</td>
                      <td className="border border-slate-200 px-4 py-2">2.80%</td>
                      <td className="border border-slate-200 px-4 py-2">4.25% - 4.80%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-slate-400 mt-3">
                * Rates are indicative and subject to change. Actual rates depend on credit profile
                and property type.
              </p>
            </div>

            {/* MRTA vs MLTA */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🛡️</span>
                MRTA vs MLTA Insurance
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">
                    MRTA (Mortgage Reducing Term Assurance)
                  </h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Decreasing coverage matching loan balance</li>
                    <li>• One-time premium, cheaper upfront</li>
                    <li>• Coverage ends when loan is paid</li>
                    <li>• No cash value if you terminate early</li>
                    <li>• Usually required by banks</li>
                  </ul>
                  <p className="text-xs text-amber-600 mt-2">
                    Typical cost: 2-3% of loan amount
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">
                    MLTA (Mortgage Level Term Assurance)
                  </h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Level coverage throughout tenure</li>
                    <li>• Monthly/annual premium payments</li>
                    <li>• Builds cash value over time</li>
                    <li>• Coverage continues even after loan paid</li>
                    <li>• More flexible, can switch to another property</li>
                  </ul>
                  <p className="text-xs text-amber-600 mt-2">
                    Typical cost: 3-5% of loan amount (total over tenure)
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> MRTA is not mandatory by law, only by bank policy. You can
                  negotiate to use MLTA or your existing life insurance if it covers the loan
                  amount.
                </p>
              </div>
            </div>

            {/* Tips to Reduce Interest */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Tips to Reduce Total Interest Paid
              </h3>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">1. Make Extra Payments</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Even RM500/month extra goes directly to principal and can save 5-8 years of
                    payments. Most banks allow partial prepayment after lock-in period.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">2. Choose Shorter Tenure</p>
                  <p className="text-sm text-slate-600 mt-1">
                    25 years vs 35 years can save over RM100,000 in interest on a RM450,000 loan.
                    Higher monthly payment but massive long-term savings.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">3. Larger Down Payment</p>
                  <p className="text-sm text-slate-600 mt-1">
                    20% down payment instead of 10% means 10% less loan = significantly less
                    interest over 30 years.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">4. Refinance After Lock-In</p>
                  <p className="text-sm text-slate-600 mt-1">
                    If market rates drop or you can negotiate better terms, refinancing after lock-in
                    (usually 3-5 years) can lower your effective rate.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">5. Use Lump Sum Payments</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Use annual bonuses, tax refunds, or windfalls to make lump sum payments. A
                    RM10,000 lump sum early in the loan saves tens of thousands in interest.
                  </p>
                </div>
              </div>
            </div>

            {/* Documents Needed */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Documents Needed for Home Loan Application
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800 mb-2">Personal Documents:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• MyKad (IC) - front and back</li>
                    <li>• Latest 3 months payslip</li>
                    <li>• Latest 6 months bank statements</li>
                    <li>• EA form / Income tax returns (BE form)</li>
                    <li>• Latest EPF statement</li>
                    <li>• Employment confirmation letter</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800 mb-2">Property Documents:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Sale and Purchase Agreement (SPA)</li>
                    <li>• Booking receipt / Offer to Purchase</li>
                    <li>• Property title / Strata title</li>
                    <li>• Floor plan / Site plan</li>
                    <li>• Developer license (if applicable)</li>
                    <li>• Building plans approved by authority</li>
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
                    Maximum loan tenure is 35 years, or until you reach age 70 (some banks allow up
                    to 75), whichever comes first. For a 40-year-old, maximum tenure would be 30-35
                    years depending on the bank.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    What is the lock-in period?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Lock-in period is typically 3-5 years where you cannot refinance or fully settle
                    the loan without paying a penalty (usually 2-3% of outstanding loan). After
                    lock-in, you&apos;re free to refinance.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    Can I make extra payments to reduce interest?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Yes, most banks allow partial prepayments after the lock-in period without
                    penalty. During lock-in, there may be limits (usually up to 10% annually). Extra
                    payments reduce principal directly, saving future interest.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    Should I choose fixed or floating rate?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Fixed rate offers stability and protection against rate hikes, good if you
                    prefer predictable payments. Floating rate can be lower and benefit from rate
                    cuts, but carries risk. Many choose fixed for the first 3-5 years then float.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    Is MRTA mandatory?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    MRTA is not mandatory by law, but banks often require some form of mortgage
                    protection. You can negotiate to use MLTA or existing life insurance if coverage
                    is sufficient to cover the loan amount.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    What affects my interest rate?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Factors include: credit score (CTOS/CCRIS), income stability, employment type
                    (government employees often get better rates), loan-to-value ratio, property
                    type (completed vs under construction), and your relationship with the bank.
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
                  href="/loan/home-loan-eligibility-calculator-malaysia/"
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏦</span>
                    <div>
                      <p className="font-semibold text-slate-800">Home Loan Eligibility</p>
                      <p className="text-xs text-slate-500">Check how much loan you qualify for</p>
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

                <Link
                  href="/property/quit-rent-calculator-malaysia/"
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📜</span>
                    <div>
                      <p className="font-semibold text-slate-800">Quit Rent Calculator</p>
                      <p className="text-xs text-slate-500">Calculate cukai tanah for your state</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-slate-100 rounded-xl p-4 mt-8">
              <p className="text-xs text-slate-500">
                <strong>Disclaimer:</strong> This calculator provides estimates only. Actual loan
                terms, interest rates, stamp duty, and legal fees may vary based on bank policies,
                property type, your credit profile, and current market conditions. Consult with a
                banker or lawyer for accurate figures. Stamp duty exemptions are subject to
                government policy and may change.
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
