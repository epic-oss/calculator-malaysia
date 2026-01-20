import type { Metadata } from "next";
import CreditCardInterestCalculator from "@/components/CreditCardInterestCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Credit Card Interest Calculator Malaysia 2026 | Calculate Monthly Charges",
  description:
    "Calculate credit card interest charges in Malaysia. See daily interest rate, time to pay off, and total interest. Compare BNM tiered rates (15-18%).",
  keywords: [
    "credit card interest calculator malaysia",
    "credit card interest rate malaysia",
    "credit card APR calculator",
    "malaysia credit card interest",
    "bank negara tiered interest",
    "credit card debt calculator",
    "credit card payoff calculator",
    "minimum payment calculator",
    "credit card daily interest",
    "credit card compound interest",
  ],
  openGraph: {
    title: "Credit Card Interest Calculator Malaysia 2026",
    description:
      "Calculate credit card interest charges and see how long it takes to pay off your balance.",
    type: "website",
    locale: "en_MY",
  },
};

export default function CreditCardInterestCalculatorPage() {
  return (
    <>
      <Navbar />
      <CreditCardInterestCalculator />

      {/* SEO Content Section */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/#credit-card" className="hover:text-blue-600">
              Credit Card Calculators
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800">Credit Card Interest Calculator</span>
          </nav>

          <article className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              How Credit Card Interest Works in Malaysia
            </h2>

            <p className="text-slate-600 mb-6">
              Credit card interest is charged when you don&apos;t pay your full statement balance by
              the due date. Interest is calculated daily on your outstanding balance using{" "}
              <strong>compound interest</strong>, which means interest is charged on both your
              balance AND previously accumulated interest.
            </p>

            {/* Daily Interest Calculation */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📐</span>
                Daily Interest Calculation
              </h3>

              <div className="bg-white rounded-xl p-4 mb-4">
                <p className="text-sm font-medium text-slate-600 mb-2">Formula:</p>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="font-mono text-blue-800">
                    Daily Interest Rate = Annual Rate ÷ 365
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm font-medium text-amber-800 mb-2">Example Calculation:</p>
                <p className="text-sm text-slate-600">
                  If your APR is <strong>18%</strong> and balance is <strong>RM1,000</strong>:
                </p>
                <ul className="text-sm text-slate-600 mt-2 space-y-1">
                  <li>• Daily rate = 18% ÷ 365 = <strong>0.0493%</strong></li>
                  <li>• Daily interest = RM1,000 × 0.0493% = <strong>RM0.49</strong></li>
                  <li>• Monthly interest (30 days) = RM0.49 × 30 = <strong>RM14.79</strong></li>
                </ul>
              </div>
            </div>

            {/* Bank Negara Tiered Interest Rates */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                Bank Negara Malaysia Tiered Interest Rates
              </h3>

              <p className="text-slate-600 mb-4">
                Since 2011, Bank Negara Malaysia introduced tiered interest rates to encourage
                responsible credit card use:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-200 px-4 py-2 text-left">Tier</th>
                      <th className="border border-slate-200 px-4 py-2 text-left">Interest Rate</th>
                      <th className="border border-slate-200 px-4 py-2 text-left">Qualification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2 font-medium text-emerald-600">
                        Tier 1
                      </td>
                      <td className="border border-slate-200 px-4 py-2 font-bold">15% p.a.</td>
                      <td className="border border-slate-200 px-4 py-2">
                        Paid minimum on time for 12 consecutive months
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium text-amber-600">
                        Tier 2
                      </td>
                      <td className="border border-slate-200 px-4 py-2 font-bold">17% p.a.</td>
                      <td className="border border-slate-200 px-4 py-2">
                        Paid minimum on time for 10-11 months in 12-month cycle
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2 font-medium text-red-600">
                        Tier 3
                      </td>
                      <td className="border border-slate-200 px-4 py-2 font-bold">18% p.a.</td>
                      <td className="border border-slate-200 px-4 py-2">
                        Paid minimum on time for less than 10 months
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
                <p className="text-sm text-red-800">
                  <strong>Key point:</strong> Missing even ONE payment can bump you from Tier 1
                  (15%) to Tier 2 (17%) or Tier 3 (18%). That&apos;s 3% more interest on your
                  balance!
                </p>
              </div>
            </div>

            {/* The Minimum Payment Trap */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                The Minimum Payment Trap
              </h3>

              <p className="text-slate-600 mb-4">
                Minimum payment in Malaysia is typically{" "}
                <strong>5% of outstanding balance or RM50</strong>, whichever is higher.
              </p>

              <div className="bg-white rounded-xl p-4 mb-4">
                <p className="font-semibold text-slate-800 mb-2">
                  Example: RM10,000 balance at 18% interest
                </p>
                <div className="grid sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500">Minimum Payment</p>
                    <p className="font-bold text-red-600">RM500</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500">Time to Pay Off</p>
                    <p className="font-bold text-red-600">9+ years</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500">Total Interest</p>
                    <p className="font-bold text-red-600">RM4,000+</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                  <strong>Why it&apos;s a trap:</strong> Paying only minimum means most of your
                  payment goes to interest, not principal. Your debt barely shrinks while interest
                  keeps accumulating.
                </p>
              </div>
            </div>

            {/* Interest-Free Period */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📅</span>
                Interest-Free Period (Grace Period)
              </h3>

              <p className="text-slate-600 mb-4">
                Most credit cards offer <strong>20-25 days</strong> interest-free period from
                statement date to due date.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4">
                  <p className="font-semibold text-emerald-800 mb-2">✅ Grace Period Applies When:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• You paid previous month&apos;s balance in full</li>
                    <li>• No interest charged on new purchases</li>
                    <li>• Pay by due date to maintain grace period</li>
                  </ul>
                </div>
                <div className="bg-red-50 rounded-xl p-4">
                  <p className="font-semibold text-red-800 mb-2">❌ Grace Period Lost When:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• You carry any balance forward</li>
                    <li>• Interest charged from purchase date</li>
                    <li>• All new purchases incur interest immediately</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Credit Card vs Personal Loan */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚖️</span>
                Credit Card Interest vs Personal Loan
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-200 px-4 py-2 text-left">Factor</th>
                      <th className="border border-slate-200 px-4 py-2 text-left">Credit Card</th>
                      <th className="border border-slate-200 px-4 py-2 text-left">Personal Loan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2 font-medium">Interest Rate</td>
                      <td className="border border-slate-200 px-4 py-2 text-red-600 font-bold">
                        15-18% p.a.
                      </td>
                      <td className="border border-slate-200 px-4 py-2 text-emerald-600 font-bold">
                        5-12% p.a.
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium">Compounding</td>
                      <td className="border border-slate-200 px-4 py-2">Daily (worst)</td>
                      <td className="border border-slate-200 px-4 py-2">Usually monthly</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2 font-medium">
                        Payment Flexibility
                      </td>
                      <td className="border border-slate-200 px-4 py-2">Minimum allowed</td>
                      <td className="border border-slate-200 px-4 py-2">Fixed monthly</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium">Debt Trap Risk</td>
                      <td className="border border-slate-200 px-4 py-2 text-red-600">High</td>
                      <td className="border border-slate-200 px-4 py-2 text-emerald-600">Lower</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mt-4">
                <p className="text-sm text-emerald-800">
                  <strong>Tip:</strong> If you have credit card debt over RM5,000 that you
                  can&apos;t clear in 3 months, consider a personal loan for debt consolidation.
                  You&apos;ll save significantly on interest.
                </p>
              </div>
            </div>

            {/* Balance Transfer Option */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">💳</span>
                Balance Transfer Option
              </h3>

              <p className="text-slate-600 mb-4">
                Many banks offer balance transfer promotions to help you pay off debt faster:
              </p>

              <div className="bg-white rounded-xl p-4 mb-4">
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>
                    • <strong>Transfer</strong> existing credit card debt to a new card
                  </li>
                  <li>
                    • <strong>0% interest</strong> for 6-12 months on transferred amount
                  </li>
                  <li>
                    • <strong>Processing fee:</strong> 2-5% of transfer amount (one-time)
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong>Best for:</strong> Large balances you can pay off within the 0% promotional
                  period. Do the math - the processing fee should be less than the interest you&apos;d
                  pay otherwise.
                </p>
              </div>
            </div>

            {/* Islamic Credit Cards */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">☪️</span>
                Islamic Credit Cards (Ujrah)
              </h3>

              <p className="text-slate-600 mb-4">
                Islamic credit cards don&apos;t charge &quot;interest&quot; (riba). Instead, they
                use Syariah-compliant mechanisms:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800 mb-2">Ujrah (Fee-based)</p>
                  <p className="text-sm text-slate-600">
                    A fixed profit rate charged as a service fee. Calculated similarly to
                    conventional interest but structured as a fee.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800 mb-2">Bai&apos; al-Inah</p>
                  <p className="text-sm text-slate-600">
                    Sale and buy-back arrangement where the bank sells you an item and buys it back
                    at a lower price, giving you the difference as credit.
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-500 mt-4">
                Effective rates are similar to conventional cards (15-18%) but follow Syariah
                principles and are supervised by the bank&apos;s Syariah board.
              </p>
            </div>

            {/* Tips to Avoid Interest */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Tips to Avoid Credit Card Interest
              </h3>

              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">1. Pay Full Balance Monthly</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Never carry a balance forward. This is the only way to avoid interest completely.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">2. Set Payment Reminders</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Avoid late fees and tier downgrades. Set auto-debit or calendar reminders.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">3. Know Your Due Date</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Pay before statement due date, not the statement date. You have 20-25 days grace
                    period.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">4. Avoid Cash Advances</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Cash advances have NO grace period - interest starts immediately from withdrawal
                    date. Plus, there&apos;s usually a 5% fee.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">5. Track Your Spending</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Don&apos;t spend more than you can pay. Treat credit card like debit - only
                    spend money you already have.
                  </p>
                </div>
              </div>
            </div>

            {/* When to Get Help */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🆘</span>
                When to Get Help
              </h3>

              <p className="text-slate-600 mb-4">If your credit card debt is:</p>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-3xl mb-2">💰</p>
                  <p className="text-sm text-slate-700">More than 3 months&apos; salary</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-3xl mb-2">📈</p>
                  <p className="text-sm text-slate-700">Growing despite payments</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-3xl mb-2">😰</p>
                  <p className="text-sm text-slate-700">Causing financial stress</p>
                </div>
              </div>

              <p className="text-slate-600 mb-4">Consider these options:</p>

              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">Personal Loan Debt Consolidation</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Replace 18% credit card debt with 6-8% personal loan. Fixed monthly payments,
                    clear timeline to debt-free.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">Balance Transfer</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Transfer to 0% interest card for 6-12 months. Must pay off within promotional
                    period.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">AKPK Credit Counseling</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Agensi Kaunseling dan Pengurusan Kredit offers free counseling and Debt
                    Management Programme (DMP) for Malaysians struggling with debt.
                  </p>
                  <a
                    href="https://www.akpk.org.my"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline mt-2 inline-block"
                  >
                    Visit AKPK Website →
                  </a>
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
                    Why is credit card interest so high?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Credit cards are unsecured loans (no collateral), so banks charge higher rates to
                    cover default risk. Plus, the convenience of revolving credit and minimum
                    payments comes at a premium.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    How do I move from Tier 3 to Tier 1?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Pay at least the minimum amount on time for 12 consecutive months. Set up
                    auto-debit to ensure you never miss a payment. After 12 months of consistent
                    payments, you&apos;ll be upgraded to Tier 1.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    Is it better to pay more than minimum?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Absolutely! Paying more than minimum reduces your principal faster, which means
                    less interest charged over time. Even RM100 extra per month can save years of
                    payments and thousands in interest.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    Does canceling my credit card stop interest?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    No. Canceling your card doesn&apos;t eliminate the debt. Interest continues to
                    accrue until the balance is fully paid. In fact, canceling may hurt your credit
                    score and remove your grace period benefits.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    Can I negotiate a lower interest rate?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    The tiered rates are regulated by Bank Negara and cannot be negotiated. However,
                    you can improve your tier by paying on time consistently. Some banks offer
                    promotional rates for debt consolidation - ask your bank about options.
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
                  href="/credit-card/credit-card-minimum-payment-calculator-malaysia/"
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💳</span>
                    <div>
                      <p className="font-semibold text-slate-800">Minimum Payment Calculator</p>
                      <p className="text-xs text-slate-500">See the true cost of minimum payments</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/loan/personal-loan-calculator-malaysia/"
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💵</span>
                    <div>
                      <p className="font-semibold text-slate-800">Personal Loan Calculator</p>
                      <p className="text-xs text-slate-500">Compare debt consolidation options</p>
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
                  href="/epf/epf-calculator-malaysia/"
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="font-semibold text-slate-800">EPF Calculator</p>
                      <p className="text-xs text-slate-500">Project your retirement savings</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-slate-100 rounded-xl p-4 mt-8">
              <p className="text-xs text-slate-500">
                <strong>Disclaimer:</strong> This calculator provides estimates based on the
                information you input. Actual interest charges may vary based on your specific card
                terms, transaction dates, and bank calculations. Interest rates shown are based on
                Bank Negara Malaysia&apos;s tiered pricing structure. Consult your bank for exact
                figures on your statement.
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
