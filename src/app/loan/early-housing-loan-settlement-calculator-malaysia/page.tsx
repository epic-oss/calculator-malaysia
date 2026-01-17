import HousingLoanSettlementCalculator from "@/components/HousingLoanSettlementCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Early Housing Loan Settlement Calculator Malaysia 2026 | Calculator Malaysia",
  description:
    "Calculate if settling your housing loan early makes financial sense. See potential savings, penalties, and get a clear recommendation for Malaysian home loans.",
  keywords: [
    "housing loan settlement calculator",
    "early settlement calculator malaysia",
    "home loan settlement",
    "housing loan penalty calculator",
    "refinancing calculator malaysia",
  ],
};

export default function HousingLoanSettlementPage() {
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

      <HousingLoanSettlementCalculator />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Should You Settle Your Housing Loan Early in Malaysia?
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              You&apos;ve been diligently paying your housing loan for 5 years. EPF retirement is looking good,
              you got a year-end bonus, or maybe you received an inheritance. Now you&apos;re thinking:
              <em>&quot;Should I just settle my housing loan and be debt-free?&quot;</em>
            </p>

            <p className="text-slate-600 leading-relaxed">
              It sounds simple. But in Malaysia&apos;s banking system, early loan settlement isn&apos;t always the
              smart financial move. Let&apos;s break it down.
            </p>

            {/* How Settlement Works */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              How Housing Loan Settlement Actually Works in Malaysia
            </h3>

            <p className="text-slate-600 leading-relaxed">
              When you take a housing loan in Malaysia, banks don&apos;t just let you walk away whenever you want.
              Here&apos;s what happens when you try to settle early:
            </p>

            <div className="bg-slate-50 rounded-xl p-6 my-6">
              <p className="font-semibold text-slate-800 mb-3">The bank calculates three things:</p>
              <ol className="list-decimal list-inside space-y-2 text-slate-600">
                <li><strong>Your outstanding principal</strong> – what you still owe</li>
                <li><strong>Accrued interest</strong> – interest accumulated up to settlement date</li>
                <li><strong>Early settlement penalty</strong> – typically 2-5% of outstanding balance (if you&apos;re within the lock-in period)</li>
              </ol>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-6 my-6">
              <p className="font-semibold text-green-800 mb-2">The formula:</p>
              <p className="text-green-700 text-lg font-mono">
                Settlement Amount = Outstanding Balance + Penalty Fee
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 my-6">
              <p className="font-semibold text-amber-800 mb-2">The lock-in period twist:</p>
              <p className="text-slate-600">
                Most Malaysian banks have a 3-5 year lock-in period. Settle within this period, and you&apos;ll
                pay a penalty. Wait until after, and the penalty usually disappears.
              </p>
            </div>

            {/* Real Example */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Real Example: RM500,000 Loan After 5 Years
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Let&apos;s use real numbers. Say you took a RM500,000 housing loan:
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 my-6">
              <ul className="space-y-1 text-slate-700 mb-4">
                <li>Interest rate: <strong>4% per annum</strong></li>
                <li>Tenure: <strong>30 years</strong></li>
                <li>Lock-in: <strong>3 years</strong></li>
                <li>Years paid: <strong>5 years</strong></li>
              </ul>

              <div className="border-t border-blue-200 pt-4 mt-4">
                <p className="font-semibold text-slate-800 mb-2">Your situation now:</p>
                <ul className="space-y-1 text-slate-700">
                  <li>Monthly payment: ~RM2,387</li>
                  <li>Outstanding balance: ~RM452,000</li>
                  <li>You&apos;re past the lock-in (no penalty!)</li>
                  <li>Remaining tenure: 25 years</li>
                </ul>
              </div>

              <div className="border-t border-blue-200 pt-4 mt-4">
                <p className="font-semibold text-green-700 mb-2">If you settle today:</p>
                <ul className="space-y-1 text-slate-700">
                  <li>Settlement amount: RM452,000 (no penalty)</li>
                  <li>Interest saved: <strong className="text-green-600">~RM264,000</strong> (yes, really)</li>
                  <li>You avoid 25 more years of payments</li>
                </ul>
              </div>

              <div className="border-t border-blue-200 pt-4 mt-4">
                <p className="font-semibold text-slate-800 mb-2">If you continue paying:</p>
                <ul className="space-y-1 text-slate-700">
                  <li>Total remaining payments: RM716,100</li>
                  <li>That&apos;s RM452,000 principal + RM264,000 interest</li>
                </ul>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed">
              <strong>The math is clear:</strong> Settling saves you RM264,000 in interest.
            </p>

            {/* When to Settle */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              When Early Settlement Makes Sense
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Not everyone should settle early. Here&apos;s when it&apos;s a smart move:
            </p>

            <div className="bg-green-50 border border-green-100 rounded-xl p-5 my-6">
              <p className="font-semibold text-green-800 mb-3">✅ Settle if:</p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>You&apos;re past the lock-in period (no penalty)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>You have excess cash earning &lt;4% elsewhere</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Your loan interest rate is &gt;4%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>You want debt-free peace of mind before retirement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>You&apos;re not sacrificing emergency funds</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-4 my-6">
              <p className="font-semibold text-slate-800">Example scenario:</p>
              <p className="text-slate-600 text-base">
                You have RM500,000 in FD earning 3% (RM15,000/year). Your housing loan costs 4%
                (RM18,000/year). You&apos;re losing RM3,000 annually by keeping money in FD instead of
                settling the loan.
              </p>
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
                  <span>You&apos;re still within lock-in period (penalty will hurt)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Your money can earn &gt;4% elsewhere (investments, business)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>You&apos;ll drain your emergency fund</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>You&apos;re planning to use EPF withdrawal for retirement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>The penalty exceeds your savings</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-red-500 pl-4 my-6">
              <p className="font-semibold text-slate-800">Example scenario:</p>
              <p className="text-slate-600 text-base">
                You&apos;re in year 2 of a 3-year lock-in. Outstanding: RM480,000. Penalty: 3% = RM14,400.
                Interest you&apos;d save in next 1 year: ~RM19,000. Net benefit: Only RM4,600. Not worth it
                – wait one more year.
              </p>
            </div>

            {/* Lock-in Period */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              The Lock-in Period Trap
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Malaysian banks typically have 3-5 year lock-in periods. Here&apos;s what different penalties look like:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      Penalty Rate
                    </th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      On RM400,000 Outstanding
                    </th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      Impact
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">2%</td>
                    <td className="border border-slate-200 px-4 py-3">RM8,000</td>
                    <td className="border border-slate-200 px-4 py-3">Need to save &gt;RM8,000 to break even</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">3%</td>
                    <td className="border border-slate-200 px-4 py-3">RM12,000</td>
                    <td className="border border-slate-200 px-4 py-3">Significant hit to savings</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">5%</td>
                    <td className="border border-slate-200 px-4 py-3">RM20,000</td>
                    <td className="border border-slate-200 px-4 py-3">Major penalty – usually not worth it</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-600 leading-relaxed">
              <strong>Our calculator shows you exactly when the penalty stops making sense.</strong>
            </p>

            {/* Alternative: Refinancing */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Alternative: Refinancing Instead of Settling
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Sometimes, refinancing beats early settlement:
            </p>

            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5 my-6">
              <p className="font-semibold text-purple-800 mb-3">Refinancing makes sense if:</p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Your current rate is &gt;4.5%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>You can get new rate at 3.5%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>You&apos;re early in your loan (years 1-10)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>You want to keep cash for investments</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 my-6">
              <p className="font-semibold text-slate-800 mb-2">Example:</p>
              <p className="text-slate-600">
                Current loan: RM450,000 at 4.5% → Monthly RM2,280<br />
                Refinance to: RM450,000 at 3.5% → Monthly RM2,020<br />
                <strong className="text-green-600">Savings: RM260/month (RM3,120/year) without touching your cash</strong>
              </p>
            </div>

            {/* How to Use Calculator */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Using This Calculator for Smart Decisions
            </h3>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-slate-800">Before settling:</p>
                <ol className="list-decimal list-inside text-slate-600 text-base space-y-1">
                  <li>Enter your loan details</li>
                  <li>Check if you&apos;re past lock-in period</li>
                  <li>See the net savings (after penalty)</li>
                  <li>Compare with your investment returns</li>
                  <li>Decide if settlement beats other uses of cash</li>
                </ol>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 my-6">
              <p className="font-semibold text-amber-800 mb-2">Red flags to watch:</p>
              <ul className="space-y-1 text-slate-600">
                <li>• Net savings showing negative (penalty too high)</li>
                <li>• You&apos;ll have &lt;6 months emergency fund left</li>
                <li>• Your investments are returning &gt;5%</li>
              </ul>
            </div>

            {/* Common Questions */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Common Questions We Get
            </h3>

            <div className="space-y-6 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  &quot;Can I partially settle my loan?&quot;
                </p>
                <p className="text-slate-600 text-base">
                  Yes, most Malaysian banks allow partial settlements. This reduces your principal, which
                  means less interest over time. Our calculator is for full settlement, but partial
                  settlement follows similar logic.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  &quot;What about EPF withdrawal for housing?&quot;
                </p>
                <p className="text-slate-600 text-base">
                  You can withdraw EPF Account 2 for housing loan settlement. But remember: that money
                  compounds at ~6% in EPF. If your loan is &lt;5%, you might lose long-term by withdrawing EPF.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  &quot;Do all banks charge the same penalty?&quot;
                </p>
                <p className="text-slate-600 text-base">
                  No. Maybank, CIMB, Public Bank, RHB, Hong Leong – each has different terms. Check your
                  loan agreement or call your bank for exact figures.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  &quot;Can I negotiate the penalty?&quot;
                </p>
                <p className="text-slate-600 text-base">
                  Rarely. Lock-in penalties are in your loan agreement. Your best bet is waiting until the
                  lock-in period ends.
                </p>
              </div>
            </div>

            {/* Final Thoughts */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Final Thoughts
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Settling your housing loan early can save you tens (or hundreds) of thousands in interest.
              But it&apos;s not always the right move – especially if you&apos;re within the lock-in period or
              have better uses for that cash.
            </p>

            <p className="text-slate-600 leading-relaxed mb-4">
              Use this calculator to see your numbers. If net savings are strong (&gt;RM50,000) and you&apos;re
              past lock-in, settlement probably makes sense. If savings are marginal or negative, wait it
              out or explore refinancing instead.
            </p>

            <p className="text-slate-600 leading-relaxed">
              <strong>The goal isn&apos;t just being debt-free. It&apos;s making your money work hardest for you.</strong>
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
