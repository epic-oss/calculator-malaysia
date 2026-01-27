import DSRCalculator from "@/components/DSRCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DSR Calculator Malaysia 2026 | Check Loan Eligibility Free",
  description:
    "Free DSR calculator Malaysia 2026. Calculate your Debt Service Ratio instantly, check loan eligibility, and see how much you can borrow based on your income.",
  keywords: [
    "DSR calculator malaysia",
    "debt service ratio calculator",
    "loan eligibility calculator",
    "how to calculate DSR",
    "DSR untuk pinjaman",
    "kelayakan pinjaman",
  ],
  alternates: {
    canonical: "https://calculatormalaysia.com/loan/dsr-calculator-malaysia/",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is DSR (Debt Service Ratio)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DSR (Debt Service Ratio) is the percentage of your monthly gross income that goes toward paying all debt obligations. It includes housing loans, car loans, personal loans, credit card minimum payments, and PTPTN. Banks use DSR to assess whether you can afford additional debt."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate my DSR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DSR = (Total Monthly Debt Payments ÷ Monthly Gross Income) × 100. For example, if your monthly income is RM5,000 and total debts are RM2,000, your DSR is 40% (2,000 ÷ 5,000 × 100 = 40%)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the maximum DSR allowed by banks in Malaysia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most Malaysian banks set the maximum DSR at 60-70% of gross income. Some banks are stricter at 60%, while others may allow up to 70%. Having a lower DSR (below 50%) significantly improves your loan approval chances and may qualify you for better rates."
      }
    },
    {
      "@type": "Question",
      "name": "What debts are included in DSR calculation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DSR includes all monthly debt obligations: housing loan payments, car loan payments, personal loan payments, credit card minimum payments (usually 5% of outstanding balance), PTPTN payments, hire purchase, and any other loans. It also includes the new loan you're applying for."
      }
    },
    {
      "@type": "Question",
      "name": "How can I lower my DSR to qualify for a loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To lower your DSR: (1) Pay off credit card balances to reduce minimum payments, (2) Settle smaller loans first, (3) Choose longer loan tenure to reduce monthly payments, (4) Include all income sources like allowances or rental income, (5) Apply for a smaller loan amount, (6) Consider adding a co-borrower."
      }
    },
    {
      "@type": "Question",
      "name": "Does credit card limit affect DSR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Only your credit card minimum payment (typically 5% of outstanding balance) is included in DSR calculation, not your credit limit. However, having multiple credit cards with high utilization can negatively impact your credit score, which banks also consider during loan approval."
      }
    }
  ]
};

export default function DSRCalculatorPage() {
  return (
    <div>
      <Navbar />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2">
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
          <Link
            href="/loan/personal-loan-calculator-malaysia-based-on-salary/"
            className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            Personal Loan Calculator
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <DSRCalculator />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              DSR Calculator: Complete Guide to Debt Service Ratio in Malaysia
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              Planning to apply for a loan? Understanding your Debt Service Ratio (DSR) is crucial
              for loan approval. This guide explains what DSR is, how to calculate it, and tips
              to improve your chances of getting approved.
            </p>

            {/* What is DSR */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              What is DSR (Debt Service Ratio)?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              DSR, or Debt Service Ratio, is a financial metric that measures what percentage of
              your monthly income goes toward paying debts. It&apos;s one of the most important factors
              banks use to determine whether you can afford additional borrowing.
            </p>

            <div className="bg-slate-50 rounded-xl p-6 my-6">
              <p className="font-semibold text-slate-800 mb-3">DSR Formula:</p>
              <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
                <p className="text-lg font-mono text-slate-700">
                  DSR = (Total Monthly Debt Payments ÷ Monthly Gross Income) × 100
                </p>
              </div>
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                <p className="text-sm text-emerald-800">
                  <strong>Example:</strong> If you earn RM5,000/month and pay RM2,000 in debts, your DSR is 40%
                </p>
              </div>
            </div>

            {/* What Counts as Debt */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              What Debts Are Included in DSR Calculation?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Banks count all your monthly debt obligations when calculating DSR:
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-3">Typically Included:</p>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Housing loan monthly payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Car loan / hire purchase payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Personal loan payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>Credit card minimum (5% of balance)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>PTPTN monthly payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>New loan you&apos;re applying for</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-3">Usually NOT Included:</p>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>Utility bills (TNB, water, internet)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>Phone bills / subscriptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>Insurance premiums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>Rent (unless it&apos;s loan-backed)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>Groceries and daily expenses</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* DSR Limits by Bank */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              DSR Limits by Malaysian Banks
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Different banks have different DSR limits. Here&apos;s what major banks typically accept:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">DSR Range</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Bank Response</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr className="bg-emerald-50">
                    <td className="border border-slate-200 px-4 py-3 font-semibold text-emerald-700">0% - 40%</td>
                    <td className="border border-slate-200 px-4 py-3 text-emerald-700">Excellent</td>
                    <td className="border border-slate-200 px-4 py-3">Very high approval chances. May qualify for better rates and higher loan amounts.</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-slate-200 px-4 py-3 font-semibold text-blue-700">41% - 60%</td>
                    <td className="border border-slate-200 px-4 py-3 text-blue-700">Good</td>
                    <td className="border border-slate-200 px-4 py-3">Good approval chances with most banks. Standard rates apply.</td>
                  </tr>
                  <tr className="bg-amber-50">
                    <td className="border border-slate-200 px-4 py-3 font-semibold text-amber-700">61% - 70%</td>
                    <td className="border border-slate-200 px-4 py-3 text-amber-700">Borderline</td>
                    <td className="border border-slate-200 px-4 py-3">Some banks may reject. Approval depends on other factors (credit score, employment).</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="border border-slate-200 px-4 py-3 font-semibold text-red-700">Above 70%</td>
                    <td className="border border-slate-200 px-4 py-3 text-red-700">Too High</td>
                    <td className="border border-slate-200 px-4 py-3">Most banks will reject. Reduce existing debts or apply for smaller amount.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="font-semibold text-amber-800 mb-2">Important Note:</p>
              <p className="text-slate-600 text-sm">
                Bank Negara Malaysia doesn&apos;t set a fixed DSR limit for all banks. Each bank has its
                own policies. Some strict banks use 60% as maximum, while others allow up to 70%.
                For the best chances, keep your DSR below 60%.
              </p>
            </div>

            {/* How to Lower DSR */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              7 Ways to Lower Your DSR for Loan Approval
            </h3>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">1. Pay off credit card balances</p>
                <p className="text-slate-600 text-base">
                  Banks calculate 5% of your outstanding balance as minimum payment. Paying off RM10,000
                  in credit card debt removes RM500 from your monthly obligations.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">2. Settle smaller loans first</p>
                <p className="text-slate-600 text-base">
                  If you have a small personal loan with RM300/month payment, settling it immediately
                  frees up that capacity for your new loan application.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">3. Choose longer loan tenure</p>
                <p className="text-slate-600 text-base">
                  A 7-year personal loan has lower monthly payments than a 3-year loan, reducing DSR.
                  But remember: longer tenure means more total interest paid.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">4. Include all income sources</p>
                <p className="text-slate-600 text-base">
                  Don&apos;t forget allowances, commissions, overtime, rental income, or side income.
                  More documented income = lower DSR percentage.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">5. Apply for a smaller loan amount</p>
                <p className="text-slate-600 text-base">
                  If you need RM50,000 but your DSR is borderline, consider applying for RM40,000
                  first. You can always apply for top-up later.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">6. Add a co-borrower</p>
                <p className="text-slate-600 text-base">
                  A spouse or family member with good income can be added as co-borrower. Their income
                  is combined with yours, effectively lowering the overall DSR.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">7. Wait and improve your situation</p>
                <p className="text-slate-600 text-base">
                  If you&apos;re expecting a salary increment or bonus, waiting a few months might help.
                  Higher income = lower DSR for the same debt amount.
                </p>
              </div>
            </div>

            {/* DSR vs Credit Score */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              DSR vs Credit Score: What&apos;s the Difference?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Both DSR and credit score matter for loan approval, but they measure different things:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Factor</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">DSR</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Credit Score</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">What it measures</td>
                    <td className="border border-slate-200 px-4 py-3">Debt affordability</td>
                    <td className="border border-slate-200 px-4 py-3">Payment history & behavior</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Based on</td>
                    <td className="border border-slate-200 px-4 py-3">Income vs debt payments</td>
                    <td className="border border-slate-200 px-4 py-3">Past payment records</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Can change quickly?</td>
                    <td className="border border-slate-200 px-4 py-3">Yes (pay off debt today)</td>
                    <td className="border border-slate-200 px-4 py-3">No (takes months/years)</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">You can calculate</td>
                    <td className="border border-slate-200 px-4 py-3">Yes (using this calculator)</td>
                    <td className="border border-slate-200 px-4 py-3">Need CTOS/CCRIS report</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6">
              <p className="font-semibold text-emerald-800 mb-2">Key Insight:</p>
              <p className="text-slate-600 text-sm">
                You can have an excellent credit score but still be rejected due to high DSR. Similarly,
                you might have acceptable DSR but get rejected due to poor credit history. Both factors
                need to be in good shape for loan approval.
              </p>
            </div>

            {/* FAQ Section */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Frequently Asked Questions
            </h3>

            <div className="space-y-4 my-6">
              <div className="border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">Does credit card limit affect DSR?</p>
                <p className="text-slate-600 text-sm">
                  No, only your credit card minimum payment (5% of outstanding balance) is included,
                  not your credit limit. However, high credit utilization can affect your credit score.
                </p>
              </div>
              <div className="border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">Is gross or net income used for DSR?</p>
                <p className="text-slate-600 text-sm">
                  Most banks use gross income (before EPF, SOCSO, and tax deductions) for DSR calculation.
                  This works in your favor as gross income is higher than net income.
                </p>
              </div>
              <div className="border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">Can I get a loan with 80% DSR?</p>
                <p className="text-slate-600 text-sm">
                  Very unlikely from mainstream banks. At 80% DSR, most of your income goes to debt.
                  You&apos;d need to reduce existing debts or increase income before applying.
                </p>
              </div>
              <div className="border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">Does PTPTN affect DSR?</p>
                <p className="text-slate-600 text-sm">
                  Yes, your monthly PTPTN repayment (if you&apos;re on salary deduction) is included in DSR.
                  If you&apos;ve deferred payment, it may not be counted until repayment begins.
                </p>
              </div>
            </div>

            {/* Final CTA */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Ready to Apply for a Loan?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Use the calculator above to check your DSR before applying. If your DSR looks healthy,
              you&apos;re ready to start your loan application. If it&apos;s borderline or too high, follow
              our tips above to improve it first.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Need personalized advice? Click &quot;Talk to Loan Expert&quot; above for a free consultation.
              Our advisors can help you find the right loan based on your DSR and financial profile.
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
