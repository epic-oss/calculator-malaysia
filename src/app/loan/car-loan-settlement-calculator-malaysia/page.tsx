import CarLoanSettlementCalculator from "@/components/CarLoanSettlementCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Car Loan Early Settlement Calculator Malaysia 2026 | Calculator Malaysia",
  description:
    "Calculate if settling your car loan early saves money. See penalties, interest savings, and get recommendations for Malaysian hire purchase loans.",
  keywords: [
    "car loan settlement calculator",
    "early settlement calculator malaysia",
    "hire purchase settlement",
    "car loan penalty calculator",
    "car refinancing malaysia",
  ],
};

export default function CarLoanSettlementPage() {
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
              Should You Settle Your Car Loan Early in Malaysia?
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              You&apos;ve been paying your car loan for a few years. Got a bonus, sold some investments,
              or maybe received an inheritance. Now you&apos;re thinking: <em>&quot;Should I just settle
              my car loan and be done with it?&quot;</em>
            </p>

            <p className="text-slate-600 leading-relaxed">
              It&apos;s tempting to be debt-free. But car loans in Malaysia work differently from housing
              loans. Before you rush to the bank, let&apos;s understand how early settlement actually works.
            </p>

            {/* How Car Loans Work */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              How Malaysian Car Loans Actually Work
            </h3>

            <p className="text-slate-600 leading-relaxed">
              Unlike housing loans that use reducing balance interest, most car loans in Malaysia use
              <strong> flat rate interest</strong>. This is crucial to understand:
            </p>

            <div className="bg-slate-50 rounded-xl p-6 my-6">
              <p className="font-semibold text-slate-800 mb-3">The flat rate difference:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li><strong>Flat rate:</strong> Interest is calculated on the ORIGINAL loan amount for the entire tenure</li>
                <li><strong>Reducing balance:</strong> Interest is calculated on the REMAINING balance</li>
              </ul>
              <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-lg">
                <p className="text-amber-800 text-sm">
                  <strong>Example:</strong> A 3% flat rate is roughly equivalent to 5.5-6% effective interest rate.
                  This is why car loans seem cheaper than housing loans but aren&apos;t always.
                </p>
              </div>
            </div>

            {/* Settlement Process */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              What Happens When You Settle Early
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              When you approach your bank for early settlement, here&apos;s what they calculate:
            </p>

            <div className="space-y-4 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-1">1. Outstanding Balance</p>
                <p className="text-slate-600 text-base">
                  The remaining principal + unearned interest based on your payment schedule.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-1">2. Interest Rebate</p>
                <p className="text-slate-600 text-base">
                  Banks give back a portion of unearned interest. This is usually calculated using the
                  &quot;Rule of 78&quot; or a proportional method. Typical rebate: 60-80% of remaining interest.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-1">3. Early Settlement Penalty</p>
                <p className="text-slate-600 text-base">
                  Most banks charge 2-3% of the outstanding balance. Some waive it after a certain period.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 my-6">
              <p className="font-semibold text-blue-800 mb-2">The formula:</p>
              <p className="text-blue-700 text-lg font-mono">
                Settlement = Outstanding Balance - Interest Rebate + Penalty
              </p>
            </div>

            {/* Real Example */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Real Example: RM80,000 Car After 2 Years
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Let&apos;s use realistic numbers for a popular scenario:
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 my-6">
              <ul className="space-y-1 text-slate-700 mb-4">
                <li>Car price: <strong>RM80,000</strong></li>
                <li>Interest rate: <strong>3% flat</strong></li>
                <li>Tenure: <strong>7 years</strong></li>
                <li>Years paid: <strong>2 years</strong></li>
                <li>Penalty: <strong>2%</strong></li>
              </ul>

              <div className="border-t border-blue-200 pt-4 mt-4">
                <p className="font-semibold text-slate-800 mb-2">Your situation:</p>
                <ul className="space-y-1 text-slate-700">
                  <li>Monthly payment: ~RM1,238</li>
                  <li>Total paid so far: ~RM29,714</li>
                  <li>Outstanding balance: ~RM73,714</li>
                </ul>
              </div>

              <div className="border-t border-blue-200 pt-4 mt-4">
                <p className="font-semibold text-slate-800 mb-2">If you settle today:</p>
                <ul className="space-y-1 text-slate-700">
                  <li>Settlement amount: ~RM62,000</li>
                  <li>Penalty (~2%): ~RM1,240</li>
                  <li>Interest saved: ~RM10,500</li>
                  <li className="text-lg font-bold text-green-700">Net savings: ~RM9,200</li>
                </ul>
              </div>
            </div>

            {/* When to Settle */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              When Early Settlement Makes Sense
            </h3>

            <div className="bg-green-50 border border-green-100 rounded-xl p-5 my-6">
              <p className="font-semibold text-green-800 mb-3">✅ Settle if:</p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>You&apos;re in the first half of your loan tenure (more interest to save)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Your savings are earning less than your loan&apos;s effective rate (~6%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>You want to sell the car (need to settle to transfer ownership)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Net savings exceed RM1,000-2,000 (worth the hassle)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>You have excess cash beyond emergency fund</span>
                </li>
              </ul>
            </div>

            {/* When NOT to Settle */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              When You Should NOT Settle Early
            </h3>

            <div className="bg-red-50 border border-red-100 rounded-xl p-5 my-6">
              <p className="font-semibold text-red-800 mb-3">❌ Don&apos;t settle if:</p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>You&apos;re in the last 1-2 years (most interest already paid)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>The penalty eats most of your savings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>You&apos;ll drain your emergency fund</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Your investments are returning &gt;6% annually</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>You have higher-interest debt (credit cards) to clear first</span>
                </li>
              </ul>
            </div>

            {/* Penalty Guide */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Early Settlement Penalties by Bank
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Different banks have different penalty structures. Here&apos;s a general guide:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      When You Settle
                    </th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      Typical Penalty
                    </th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      Impact
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Year 1-2</td>
                    <td className="border border-slate-200 px-4 py-3">2-3%</td>
                    <td className="border border-slate-200 px-4 py-3">Still worth it if savings are high</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">Year 3-4</td>
                    <td className="border border-slate-200 px-4 py-3">1-2%</td>
                    <td className="border border-slate-200 px-4 py-3">Good time to consider settlement</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Year 5+</td>
                    <td className="border border-slate-200 px-4 py-3">0-1%</td>
                    <td className="border border-slate-200 px-4 py-3">Lower penalty but less savings too</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-600 leading-relaxed">
              <strong>Pro tip:</strong> Always call your bank to get the exact settlement figure.
              The calculator gives estimates, but banks may have specific terms in your contract.
            </p>

            {/* Rule of 78 */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Understanding the Rule of 78
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Some Malaysian banks still use the &quot;Rule of 78&quot; to calculate interest rebates.
              Here&apos;s why it matters:
            </p>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 my-6">
              <p className="font-semibold text-amber-800 mb-2">How Rule of 78 works:</p>
              <p className="text-slate-600 mb-3">
                This method front-loads interest payments. In a 12-month loan, month 1 has 12/78 of interest,
                month 2 has 11/78, and so on. This means you pay more interest early in the loan.
              </p>
              <p className="text-amber-700 text-sm">
                <strong>Impact:</strong> Settling early under Rule of 78 saves you less than you&apos;d expect
                because most interest is already paid in the early months.
              </p>
            </div>

            {/* Steps to Settle */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              How to Settle Your Car Loan Early
            </h3>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-slate-800">Step 1: Get Settlement Statement</p>
                <p className="text-slate-600 text-base">
                  Call your bank or visit a branch. Request a &quot;full settlement statement&quot; or
                  &quot;early termination statement&quot;. This shows the exact amount needed.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-slate-800">Step 2: Verify the Amount</p>
                <p className="text-slate-600 text-base">
                  Compare with our calculator. Ask the bank to explain any differences. Make sure you
                  understand the penalty and rebate calculations.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-slate-800">Step 3: Make Payment</p>
                <p className="text-slate-600 text-base">
                  Pay the settlement amount. Keep all receipts. The bank will release the vehicle
                  ownership documents (usually within 14-21 days).
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-slate-800">Step 4: Transfer Ownership</p>
                <p className="text-slate-600 text-base">
                  Once you receive the documents, transfer ownership at JPJ. Your name replaces the
                  bank&apos;s on the registration card.
                </p>
              </div>
            </div>

            {/* Common Questions */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Common Questions
            </h3>

            <div className="space-y-6 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  &quot;Can I partially settle my car loan?&quot;
                </p>
                <p className="text-slate-600 text-base">
                  Most banks don&apos;t allow partial settlement for car loans (unlike housing loans).
                  It&apos;s usually full settlement or nothing. Check with your specific bank.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  &quot;Do I lose my NCD if I settle early?&quot;
                </p>
                <p className="text-slate-600 text-base">
                  No, your No Claim Discount (NCD) is tied to your insurance, not your loan.
                  Settling the loan early doesn&apos;t affect your NCD.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  &quot;Is it worth settling to buy a new car?&quot;
                </p>
                <p className="text-slate-600 text-base">
                  Calculate both scenarios. Sometimes refinancing or trading in (where the dealer
                  handles settlement) works out better than settling + buying separately.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  &quot;What if my car is worth less than the settlement?&quot;
                </p>
                <p className="text-slate-600 text-base">
                  This is called being &quot;underwater&quot; or having negative equity. You&apos;ll
                  need to top up the difference if selling. It&apos;s common in the first 1-2 years
                  due to depreciation.
                </p>
              </div>
            </div>

            {/* Final Thoughts */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Final Thoughts
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Settling your car loan early can save thousands in interest – but only if you do it
              at the right time. The sweet spot is usually in years 2-4 of a 7-9 year loan, when
              you still have significant interest to save but haven&apos;t paid most of it already.
            </p>

            <p className="text-slate-600 leading-relaxed mb-4">
              Use this calculator to see your numbers. If net savings are above RM2,000 and you
              have the cash available, settlement is usually worth considering. If savings are
              marginal or negative, just continue with your regular payments.
            </p>

            <p className="text-slate-600 leading-relaxed">
              <strong>Remember:</strong> Always get the official settlement figure from your bank.
              Our calculator gives accurate estimates, but your exact amount may vary based on your
              specific loan terms and any special conditions.
            </p>
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
                All Calculators
              </Link>
              <a href="/about" className="hover:text-white transition-colors">
                About
              </a>
              <a href="/contact" className="hover:text-white transition-colors">
                Contact
              </a>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
            </nav>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
            © 2026 Calculator Malaysia. All calculators are free to use.
          </div>
        </div>
      </footer>
    </div>
  );
}
