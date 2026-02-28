import PersonalLoanCalculator from "@/components/PersonalLoanCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Loan Calculator Malaysia 2026 | Based on Salary & DSR",
  description:
    "Free personal loan calculator Malaysia 2026. Calculate monthly payment based on salary, check DSR eligibility instantly. Compare rates from Maybank, CIMB, Public Bank & more.",
  keywords: [
    "personal loan calculator malaysia",
    "pinjaman peribadi calculator",
    "loan eligibility calculator",
    "DSR calculator",
    "bank loan calculator",
    "personal loan based on salary",
  ],
  alternates: {
    canonical: "https://calculatormalaysia.com/loan/personal-loan-calculator-malaysia-based-on-salary/",
  },
};

export default function PersonalLoanCalculatorPage() {
  return (
    <div>
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
            <span className="text-slate-900">Personal Loan Calculator</span>
          </div>
        </div>
      </div>

      <PersonalLoanCalculator locale="en" />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Personal Loan in Malaysia: Complete Guide for 2026
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              Need cash for home renovation, wedding expenses, debt consolidation, or an emergency?
              Personal loans offer quick access to funds without collateral. But before you apply,
              it&apos;s crucial to understand how much you can borrow and what you&apos;ll pay monthly.
            </p>

            <p className="text-slate-600 leading-relaxed">
              This calculator helps you estimate your monthly payment, total interest, and most
              importantly – whether you&apos;re likely to get approved based on your Debt Service
              Ratio (DSR).
            </p>

            {/* Personal Loan Eligibility */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Personal Loan Eligibility Requirements in Malaysia
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              While each bank has slightly different criteria, here are the general requirements:
            </p>

            <div className="space-y-4 my-6">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                <p className="font-semibold text-emerald-800 mb-2">Basic Requirements</p>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• Malaysian citizen or Permanent Resident</li>
                  <li>• Age: 21 to 60 years old (some banks up to 65)</li>
                  <li>• Minimum income: RM2,000 - RM3,000/month (varies by bank)</li>
                  <li>• Employed for at least 6 months (current job)</li>
                  <li>• Good credit score (CTOS/CCRIS)</li>
                </ul>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                <p className="font-semibold text-emerald-800 mb-2">For Self-Employed</p>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• Business operating for at least 2 years</li>
                  <li>• SSM registration required</li>
                  <li>• Bank statements showing consistent income</li>
                  <li>• May require higher minimum income</li>
                </ul>
              </div>
            </div>

            {/* DSR Explained */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              What is DSR and Why Does It Matter?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              DSR (Debt Service Ratio) is the percentage of your monthly income that goes toward
              paying debts. It&apos;s the most important factor banks consider when approving loans.
            </p>

            <div className="bg-slate-50 rounded-xl p-6 my-6">
              <p className="font-semibold text-slate-800 mb-3">DSR Formula:</p>
              <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
                <p className="text-lg font-mono text-slate-700">
                  DSR = (Total Monthly Debt Payments ÷ Monthly Income) × 100
                </p>
              </div>
              <p className="text-sm text-slate-500 mt-3">
                Total monthly debts include: credit card minimum payments, car loan, housing loan,
                PTPTN, existing personal loans, and the new loan you&apos;re applying for.
              </p>
            </div>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">DSR Range</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">What It Means</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr className="bg-emerald-50">
                    <td className="border border-slate-200 px-4 py-3 font-semibold text-emerald-700">Below 50%</td>
                    <td className="border border-slate-200 px-4 py-3 text-emerald-700">Excellent</td>
                    <td className="border border-slate-200 px-4 py-3">High approval chances, may qualify for better rates</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-semibold text-amber-700">50% - 70%</td>
                    <td className="border border-slate-200 px-4 py-3 text-amber-700">Acceptable</td>
                    <td className="border border-slate-200 px-4 py-3">Still approvable, but less room for negotiation</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="border border-slate-200 px-4 py-3 font-semibold text-red-700">Above 70%</td>
                    <td className="border border-slate-200 px-4 py-3 text-red-700">Risky</td>
                    <td className="border border-slate-200 px-4 py-3">Most banks will reject. Consider lower amount or longer tenure</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="font-semibold text-amber-800 mb-2">Pro Tip:</p>
              <p className="text-slate-600 text-sm">
                Some banks use 60% or 65% as their DSR limit, not 70%. If you&apos;re borderline at
                70%, you might still face rejections. Aim for under 60% to be safe, and under 50%
                for the best rates.
              </p>
            </div>

            {/* Interest Rate Comparison */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Personal Loan Interest Rates by Bank (2026)
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Personal loan rates in Malaysia typically range from 5% to 12% per annum (flat rate).
              Here&apos;s how major banks compare:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Bank</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Interest Rate</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Max Amount</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Max Tenure</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Maybank</td>
                    <td className="border border-slate-200 px-4 py-3">From 6.5%</td>
                    <td className="border border-slate-200 px-4 py-3">RM150,000</td>
                    <td className="border border-slate-200 px-4 py-3">7 years</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">CIMB</td>
                    <td className="border border-slate-200 px-4 py-3">From 6.88%</td>
                    <td className="border border-slate-200 px-4 py-3">RM200,000</td>
                    <td className="border border-slate-200 px-4 py-3">7 years</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Public Bank</td>
                    <td className="border border-slate-200 px-4 py-3">From 5.88%</td>
                    <td className="border border-slate-200 px-4 py-3">RM150,000</td>
                    <td className="border border-slate-200 px-4 py-3">10 years</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">RHB</td>
                    <td className="border border-slate-200 px-4 py-3">From 6.99%</td>
                    <td className="border border-slate-200 px-4 py-3">RM200,000</td>
                    <td className="border border-slate-200 px-4 py-3">7 years</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Hong Leong</td>
                    <td className="border border-slate-200 px-4 py-3">From 7.5%</td>
                    <td className="border border-slate-200 px-4 py-3">RM150,000</td>
                    <td className="border border-slate-200 px-4 py-3">7 years</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">Alliance Bank</td>
                    <td className="border border-slate-200 px-4 py-3">From 7.88%</td>
                    <td className="border border-slate-200 px-4 py-3">RM150,000</td>
                    <td className="border border-slate-200 px-4 py-3">7 years</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-500">
              *Rates shown are indicative and subject to change. Final rate depends on your credit
              profile, income, and bank promotions.
            </p>

            {/* Documents Needed */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Documents Needed for Personal Loan Application
            </h3>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-3">For Employed Applicants</p>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Copy of MyKad (front & back)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Latest 3 months salary slips</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Latest 3 months bank statements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>EA Form / BE Form (latest)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>EPF statement (some banks)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-3">For Self-Employed Applicants</p>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Copy of MyKad (front & back)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>SSM registration (Form 9 & 24/49)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Latest 6 months bank statements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Business profile / company letterhead</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Tax return (Form B) - 2 years</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* How to Improve Approval */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              7 Ways to Improve Your Loan Approval Chances
            </h3>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">1. Check and clean your CCRIS/CTOS</p>
                <p className="text-slate-600 text-base">
                  Get your free credit report from CTOS. Settle any outstanding debts or disputes
                  before applying. Even small unpaid bills can hurt your score.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">2. Reduce existing debt first</p>
                <p className="text-slate-600 text-base">
                  Pay off credit card balances or settle smaller loans. This directly lowers your
                  DSR and shows lenders you manage debt responsibly.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">3. Don&apos;t apply to multiple banks at once</p>
                <p className="text-slate-600 text-base">
                  Each application shows up on your credit report. Multiple applications in a short
                  period looks desperate and hurts your chances.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">4. Choose the right bank for your profile</p>
                <p className="text-slate-600 text-base">
                  Different banks have different target customers. Some are stricter, others more
                  flexible. A loan agent can match you to the right bank.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">5. Apply for a realistic amount</p>
                <p className="text-slate-600 text-base">
                  Don&apos;t max out. If your DSR allows RM50,000, apply for RM40,000. Banks prefer
                  borrowers who don&apos;t stretch themselves thin.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">6. Have a stable employment history</p>
                <p className="text-slate-600 text-base">
                  Stay at your job for at least 6-12 months before applying. Frequent job changes
                  signal instability to lenders.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">7. Consider a guarantor or co-applicant</p>
                <p className="text-slate-600 text-base">
                  If your profile is weak, having someone with good credit co-sign can help. But
                  remember – they&apos;re equally responsible for repayment.
                </p>
              </div>
            </div>

            {/* Personal Loan vs Credit Card */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Personal Loan vs Credit Card: Which is Better?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Both are forms of borrowing, but they work very differently:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Factor</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Personal Loan</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Credit Card</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Interest Rate</td>
                    <td className="border border-slate-200 px-4 py-3 text-emerald-600">5% - 12% p.a. (flat)</td>
                    <td className="border border-slate-200 px-4 py-3 text-red-600">15% - 18% p.a.</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Fixed Payment</td>
                    <td className="border border-slate-200 px-4 py-3">Yes, same amount monthly</td>
                    <td className="border border-slate-200 px-4 py-3">No, minimum 5% of balance</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Repayment Period</td>
                    <td className="border border-slate-200 px-4 py-3">Fixed (1-7 years)</td>
                    <td className="border border-slate-200 px-4 py-3">Flexible (can drag forever)</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Best For</td>
                    <td className="border border-slate-200 px-4 py-3">Large, planned expenses</td>
                    <td className="border border-slate-200 px-4 py-3">Small, short-term needs</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Discipline Required</td>
                    <td className="border border-slate-200 px-4 py-3">Less (auto-debit)</td>
                    <td className="border border-slate-200 px-4 py-3">More (easy to overspend)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border-l-4 border-emerald-500 pl-4 my-6">
              <p className="font-semibold text-slate-800">Our Recommendation:</p>
              <p className="text-slate-600 text-base">
                Use <strong>personal loans</strong> for amounts above RM5,000 or when you need a
                fixed repayment plan. Use <strong>credit cards</strong> only if you can pay in full
                each month (to avoid interest) or for short-term emergencies.
              </p>
            </div>

            {/* Common Mistakes */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              5 Mistakes to Avoid When Taking a Personal Loan
            </h3>

            <div className="space-y-4 my-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="font-semibold text-red-800 mb-1">1. Not reading the fine print</p>
                <p className="text-slate-600 text-sm">
                  Check for processing fees (usually 1-2%), early settlement penalties, and late
                  payment charges. These add up.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="font-semibold text-red-800 mb-1">2. Borrowing more than you need</p>
                <p className="text-slate-600 text-sm">
                  Just because you&apos;re approved for RM100,000 doesn&apos;t mean you should take it.
                  Borrow only what you need.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="font-semibold text-red-800 mb-1">3. Choosing the longest tenure blindly</p>
                <p className="text-slate-600 text-sm">
                  Longer tenure = lower monthly payment but way more total interest. A 7-year loan
                  can cost 40% more than a 3-year loan.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="font-semibold text-red-800 mb-1">4. Not comparing rates</p>
                <p className="text-slate-600 text-sm">
                  A 1% difference in interest rate can save you thousands over the loan tenure.
                  Always compare at least 3 banks.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="font-semibold text-red-800 mb-1">5. Using personal loans for investments</p>
                <p className="text-slate-600 text-sm">
                  Never borrow to invest in stocks, crypto, or &quot;sure win&quot; schemes. The interest
                  you pay is guaranteed; investment returns are not.
                </p>
              </div>
            </div>

            {/* Final CTA */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Ready to Apply?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Use the calculator above to check your eligibility and estimate your monthly payment.
              If your DSR looks good, click &quot;Talk to Loan Expert&quot; – our advisors can help
              you find the best rates and guide you through the application process.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Borrow responsibly, and only take what you can comfortably repay.
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
