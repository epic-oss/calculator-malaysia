import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Cash Out Refinance Malaysia ${currentYear} - Complete Guide | Calculator Malaysia`,
  description: `Learn how to unlock your home equity through cash out refinancing in Malaysia. Understand eligibility, rates, risks, and when it makes sense to cash out.`,
  keywords: [
    "cash out refinance malaysia",
    "home equity loan malaysia",
    "refinance cash out",
    "property equity withdrawal",
    "cash out mortgage malaysia",
    "home loan cash out",
  ],
};

export default function CashOutRefinanceGuidePage() {
  return (
    <div>
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-3">
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

      {/* Guide Content */}
      <article className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 text-sm text-blue-600 mb-3">
              <span>Guide</span>
              <span>•</span>
              <span>Property</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Cash Out Refinance Malaysia {currentYear}: Complete Guide
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Learn how to unlock your property equity for renovation, investment, debt consolidation, or other financial needs through cash out refinancing.
            </p>
          </header>

          {/* Table of Contents */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-10">
            <h2 className="font-semibold text-slate-800 mb-4">In This Guide</h2>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#what-is" className="hover:text-blue-600">What is Cash Out Refinancing?</a></li>
              <li><a href="#how-it-works" className="hover:text-blue-600">How Does It Work?</a></li>
              <li><a href="#eligibility" className="hover:text-blue-600">Eligibility Requirements</a></li>
              <li><a href="#how-much" className="hover:text-blue-600">How Much Can You Cash Out?</a></li>
              <li><a href="#when-to-use" className="hover:text-blue-600">When to Use Cash Out Refinancing</a></li>
              <li><a href="#risks" className="hover:text-blue-600">Risks to Consider</a></li>
              <li><a href="#alternatives" className="hover:text-blue-600">Alternatives to Cash Out Refinance</a></li>
            </ul>
          </div>

          {/* Content Sections */}
          <div className="prose prose-slate prose-lg max-w-none">
            <section id="what-is" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Cash Out Refinancing?</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Cash out refinancing is when you refinance your existing home loan for a higher amount than what you currently owe, and receive the difference in cash. Essentially, you&apos;re borrowing against the equity you&apos;ve built up in your property.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
                <p className="font-semibold text-blue-800 mb-2">Example:</p>
                <p className="text-slate-600 text-sm">
                  If your property is worth RM500,000 and you owe RM200,000, you have RM300,000 in equity. With cash out refinancing, you might take a new loan of RM350,000, pay off the existing RM200,000, and receive RM150,000 in cash.
                </p>
              </div>
            </section>

            <section id="how-it-works" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How Does Cash Out Refinancing Work?</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold text-slate-800">Property Valuation</p>
                    <p className="text-slate-600">Bank arranges for a property valuation to determine current market value</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold text-slate-800">Calculate Maximum Loan</p>
                    <p className="text-slate-600">Banks typically lend up to 80-90% of property value (LTV)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold text-slate-800">New Loan Approved</p>
                    <p className="text-slate-600">New loan pays off existing loan, excess amount is disbursed to you</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                  <div>
                    <p className="font-semibold text-slate-800">Receive Cash</p>
                    <p className="text-slate-600">Cash out amount is credited to your bank account</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="eligibility" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Eligibility Requirements</h2>
              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-800 mb-3">Property Requirements</h3>
                  <ul className="text-slate-600 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      <span>Property must have sufficient equity (usually 20%+ built up)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      <span>Property title must be issued (individual or strata)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      <span>Property value must be verified by bank valuer</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-800 mb-3">Borrower Requirements</h3>
                  <ul className="text-slate-600 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      <span>Good credit history (CCRIS/CTOS)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      <span>DSR below 70% (including new loan)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      <span>Stable income source</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      <span>Age: Loan tenure ends before age 65-70</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="how-much" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How Much Can You Cash Out?</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The maximum cash out amount depends on your property value, existing loan balance, and the bank&apos;s LTV (Loan-to-Value) ratio policy.
              </p>
              <div className="overflow-x-auto my-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Property Type</th>
                      <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Max LTV</th>
                      <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-600">
                    <tr>
                      <td className="border border-slate-200 px-4 py-3">1st & 2nd Property</td>
                      <td className="border border-slate-200 px-4 py-3">90%</td>
                      <td className="border border-slate-200 px-4 py-3">Standard residential</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-3">3rd Property onwards</td>
                      <td className="border border-slate-200 px-4 py-3">70%</td>
                      <td className="border border-slate-200 px-4 py-3">BNM cooling measures</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3">Property &gt; RM600k</td>
                      <td className="border border-slate-200 px-4 py-3">70-80%</td>
                      <td className="border border-slate-200 px-4 py-3">Varies by bank</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6">
                <p className="font-semibold text-emerald-800 mb-2">Quick Calculation:</p>
                <p className="text-slate-600 text-sm">
                  <strong>Max Cash Out</strong> = (Property Value × Max LTV) - Outstanding Loan - Refinancing Costs
                </p>
              </div>
            </section>

            <section id="when-to-use" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">When to Use Cash Out Refinancing</h2>
              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="border-l-4 border-emerald-500 pl-4">
                  <p className="font-semibold text-emerald-800">Home Renovation</p>
                  <p className="text-slate-600 text-sm">Upgrade your home to increase its value or improve livability</p>
                </div>
                <div className="border-l-4 border-emerald-500 pl-4">
                  <p className="font-semibold text-emerald-800">Debt Consolidation</p>
                  <p className="text-slate-600 text-sm">Pay off high-interest debts (credit cards, personal loans)</p>
                </div>
                <div className="border-l-4 border-emerald-500 pl-4">
                  <p className="font-semibold text-emerald-800">Investment</p>
                  <p className="text-slate-600 text-sm">Fund a business or investment property purchase</p>
                </div>
                <div className="border-l-4 border-emerald-500 pl-4">
                  <p className="font-semibold text-emerald-800">Education</p>
                  <p className="text-slate-600 text-sm">Fund children&apos;s education or professional development</p>
                </div>
                <div className="border-l-4 border-emerald-500 pl-4">
                  <p className="font-semibold text-emerald-800">Emergency Fund</p>
                  <p className="text-slate-600 text-sm">Medical expenses or unforeseen financial needs</p>
                </div>
                <div className="border-l-4 border-emerald-500 pl-4">
                  <p className="font-semibold text-emerald-800">Down Payment</p>
                  <p className="text-slate-600 text-sm">Use equity for down payment on another property</p>
                </div>
              </div>
            </section>

            <section id="risks" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Risks to Consider</h2>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 my-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">⚠️</span>
                    <div>
                      <p className="font-semibold text-red-800">Higher Monthly Payments</p>
                      <p className="text-slate-600 text-sm">Your new loan is larger, so monthly payments will increase</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">⚠️</span>
                    <div>
                      <p className="font-semibold text-red-800">More Total Interest</p>
                      <p className="text-slate-600 text-sm">You&apos;ll pay interest on a larger principal over the loan tenure</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">⚠️</span>
                    <div>
                      <p className="font-semibold text-red-800">Property at Risk</p>
                      <p className="text-slate-600 text-sm">If you can&apos;t repay, you risk losing your home</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">⚠️</span>
                    <div>
                      <p className="font-semibold text-red-800">Refinancing Costs</p>
                      <p className="text-slate-600 text-sm">Legal fees, stamp duty, and valuation fees add up</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="alternatives" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Alternatives to Cash Out Refinance</h2>
              <div className="space-y-4 my-6">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <p className="font-semibold text-slate-800 mb-2">Personal Loan</p>
                  <p className="text-slate-600 text-sm">Quick approval, no property risk, but higher interest rates (5-15%)</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <p className="font-semibold text-slate-800 mb-2">ASNB/EPF Withdrawal</p>
                  <p className="text-slate-600 text-sm">For specific purposes like education or medical, lower or no interest</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <p className="font-semibold text-slate-800 mb-2">Top-Up Loan</p>
                  <p className="text-slate-600 text-sm">Add to existing loan without full refinancing, lower costs</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <p className="font-semibold text-slate-800 mb-2">Credit Card Balance Transfer</p>
                  <p className="text-slate-600 text-sm">For smaller amounts, some banks offer 0% for 6-12 months</p>
                </div>
              </div>
            </section>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 mt-12 border border-emerald-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-3">Ready to Calculate Your Cash Out Potential?</h2>
              <p className="text-slate-600 mb-6">
                Use our Refinance Calculator to see how much you could cash out and what your new payments would be.
              </p>
              <Link
                href="/property/refinance-housing-loan-calculator-malaysia/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white font-semibold transition-colors"
              >
                Use Refinance Calculator
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </article>

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
            © {currentYear} Calculator Malaysia. All calculators are free to use.
          </div>
        </div>
      </footer>
    </div>
  );
}
