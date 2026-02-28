import PersonalLoanCalculator from "@/components/PersonalLoanCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maybank vs CIMB Personal Loan 2026: Which is Better? | Calculator Malaysia",
  description:
    "Compare Maybank vs CIMB personal loan rates, fees, eligibility & approval time. Calculate your monthly payment and find which bank offers better terms for you.",
  keywords: [
    "maybank personal loan",
    "cimb personal loan",
    "maybank vs cimb",
    "personal loan comparison malaysia",
    "best personal loan rate malaysia",
    "maybank loan calculator",
    "cimb loan calculator",
  ],
  alternates: {
    canonical: "https://calculatormalaysia.com/loan/maybank-vs-cimb-personal-loan-comparison/",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which is better: Maybank or CIMB personal loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on your needs. Maybank offers lower starting rates (from 6.5% vs CIMB's 6.88%) and faster approval for existing customers. CIMB offers higher maximum loan amounts (RM200,000 vs RM150,000) and may be more flexible for applicants with moderate credit scores. Compare both based on your specific situation."
      }
    },
    {
      "@type": "Question",
      "name": "What is the interest rate for Maybank personal loan 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Maybank personal loan interest rates start from 6.5% per annum (flat rate) in 2026. The actual rate you receive depends on your credit score, income, employment type, and existing relationship with Maybank. Preferred rates may apply for Maybank Premier and salary crediting customers."
      }
    },
    {
      "@type": "Question",
      "name": "What is the interest rate for CIMB personal loan 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CIMB personal loan interest rates start from 6.88% per annum (flat rate) in 2026. CIMB may offer promotional rates for existing customers, payroll accounts, and during special campaigns. The final rate depends on your creditworthiness and income."
      }
    },
    {
      "@type": "Question",
      "name": "What is the minimum salary for Maybank personal loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Maybank requires a minimum gross income of RM3,000 per month for personal loan applications. However, requirements may vary based on the loan amount requested and your overall credit profile."
      }
    },
    {
      "@type": "Question",
      "name": "What is the minimum salary for CIMB personal loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CIMB requires a minimum gross income of RM2,000 per month for personal loan applications, making it more accessible than some other banks. Self-employed individuals may need to show higher income."
      }
    },
    {
      "@type": "Question",
      "name": "How long does Maybank personal loan approval take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Maybank personal loan approval typically takes 1-3 working days for existing customers with complete documentation. New customers may take 3-5 working days. Disbursement usually happens within 1-2 days after approval."
      }
    }
  ]
};

export default function MaybankVsCimbComparisonPage() {
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
            <span className="text-slate-900">Maybank vs CIMB</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Maybank vs CIMB Personal Loan 2026: Complete Comparison
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Compare interest rates, eligibility, fees, and features to find which bank offers
            the best personal loan for your needs.
          </p>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            At-a-Glance Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-4 text-left text-sm font-semibold text-slate-700">Feature</th>
                  <th className="border border-slate-200 px-4 py-4 text-center text-sm font-semibold text-slate-700">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-yellow-500 text-xl">🏦</span>
                      Maybank
                    </div>
                  </th>
                  <th className="border border-slate-200 px-4 py-4 text-center text-sm font-semibold text-slate-700">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-red-500 text-xl">🏦</span>
                      CIMB
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600">
                <tr>
                  <td className="border border-slate-200 px-4 py-3 font-medium">Interest Rate</td>
                  <td className="border border-slate-200 px-4 py-3 text-center bg-emerald-50 text-emerald-700 font-semibold">From 6.5% p.a.</td>
                  <td className="border border-slate-200 px-4 py-3 text-center">From 6.88% p.a.</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-3 font-medium">Maximum Amount</td>
                  <td className="border border-slate-200 px-4 py-3 text-center">RM150,000</td>
                  <td className="border border-slate-200 px-4 py-3 text-center bg-emerald-50 text-emerald-700 font-semibold">RM200,000</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3 font-medium">Maximum Tenure</td>
                  <td className="border border-slate-200 px-4 py-3 text-center">7 years</td>
                  <td className="border border-slate-200 px-4 py-3 text-center">7 years</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-3 font-medium">Minimum Salary</td>
                  <td className="border border-slate-200 px-4 py-3 text-center">RM3,000/month</td>
                  <td className="border border-slate-200 px-4 py-3 text-center bg-emerald-50 text-emerald-700 font-semibold">RM2,000/month</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3 font-medium">Processing Fee</td>
                  <td className="border border-slate-200 px-4 py-3 text-center">1% - 2%</td>
                  <td className="border border-slate-200 px-4 py-3 text-center">1% - 2%</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-3 font-medium">Early Settlement</td>
                  <td className="border border-slate-200 px-4 py-3 text-center">3% of balance</td>
                  <td className="border border-slate-200 px-4 py-3 text-center">3% of balance</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3 font-medium">Approval Time</td>
                  <td className="border border-slate-200 px-4 py-3 text-center bg-emerald-50 text-emerald-700 font-semibold">1-3 days</td>
                  <td className="border border-slate-200 px-4 py-3 text-center">2-5 days</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-3 font-medium">Age Requirement</td>
                  <td className="border border-slate-200 px-4 py-3 text-center">21-60 years</td>
                  <td className="border border-slate-200 px-4 py-3 text-center">21-60 years</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500 mt-4 text-center">
            *Rates and terms are subject to change. Always verify with the bank before applying.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Calculate Your Monthly Payment
            </h2>
            <p className="text-slate-600">
              Use our calculator to estimate your monthly payment and check eligibility
            </p>
          </div>
        </div>
      </section>

      <PersonalLoanCalculator locale="en" />

      {/* Detailed Comparison Content */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">

            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Maybank vs CIMB Personal Loan: Which Should You Choose?
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              Maybank and CIMB are two of Malaysia&apos;s largest banks, both offering competitive personal
              loan products. But which one is right for you? This detailed comparison will help you
              make an informed decision based on your specific needs and financial situation.
            </p>

            {/* Maybank Section */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Maybank Personal Loan: Key Features
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Maybank, Malaysia&apos;s largest bank, offers personal loans through several products
              including Maybank Personal Loan and Maybank Cash Advance. Here&apos;s what you need to know:
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-6">
              <h4 className="font-semibold text-yellow-800 mb-3">Maybank Personal Loan Highlights</h4>
              <ul className="text-slate-600 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span><strong>Lower interest rates</strong> starting from 6.5% p.a. for qualified borrowers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span><strong>Faster approval</strong> for existing Maybank customers (1-3 days)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span><strong>Preferred rates</strong> for salary crediting customers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span><strong>Wide branch network</strong> for convenient application</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <span><strong>Higher minimum salary</strong> requirement (RM3,000/month)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <span><strong>Lower maximum loan</strong> amount (RM150,000)</span>
                </li>
              </ul>
            </div>

            {/* CIMB Section */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              CIMB Personal Loan: Key Features
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              CIMB offers personal financing through CIMB Personal Financing-i (Islamic) and
              conventional personal loans. Here&apos;s what makes CIMB stand out:
            </p>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6 my-6">
              <h4 className="font-semibold text-red-800 mb-3">CIMB Personal Loan Highlights</h4>
              <ul className="text-slate-600 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span><strong>Higher loan amount</strong> up to RM200,000</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span><strong>Lower minimum salary</strong> requirement (RM2,000/month)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span><strong>Online application</strong> available through CIMB Clicks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span><strong>Flexible for moderate credit</strong> scores</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <span><strong>Slightly higher rates</strong> starting from 6.88% p.a.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <span><strong>Longer approval time</strong> (2-5 working days)</span>
                </li>
              </ul>
            </div>

            {/* When to Choose Each */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              When to Choose Maybank vs CIMB
            </h3>

            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                <h4 className="font-semibold text-yellow-800 mb-3">Choose Maybank If:</h4>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li>• You&apos;re an existing Maybank customer</li>
                  <li>• You credit your salary to Maybank</li>
                  <li>• You have excellent credit score</li>
                  <li>• You earn RM3,000+ per month</li>
                  <li>• You need faster approval</li>
                  <li>• You want the lowest possible rate</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <h4 className="font-semibold text-red-800 mb-3">Choose CIMB If:</h4>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li>• You need a larger loan amount</li>
                  <li>• Your salary is below RM3,000</li>
                  <li>• Your credit score is moderate</li>
                  <li>• You prefer online application</li>
                  <li>• You&apos;re self-employed with good income</li>
                  <li>• You need more than RM150,000</li>
                </ul>
              </div>
            </div>

            {/* Cost Comparison Example */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Real Cost Comparison: RM50,000 Loan Over 5 Years
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Let&apos;s compare the actual cost of borrowing RM50,000 over 5 years from both banks:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Cost Component</th>
                    <th className="border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">Maybank (6.5%)</th>
                    <th className="border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">CIMB (6.88%)</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Loan Amount</td>
                    <td className="border border-slate-200 px-4 py-3 text-center">RM50,000</td>
                    <td className="border border-slate-200 px-4 py-3 text-center">RM50,000</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">Total Interest (5 years)</td>
                    <td className="border border-slate-200 px-4 py-3 text-center text-emerald-600 font-semibold">RM16,250</td>
                    <td className="border border-slate-200 px-4 py-3 text-center">RM17,200</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Processing Fee (1.5%)</td>
                    <td className="border border-slate-200 px-4 py-3 text-center">RM750</td>
                    <td className="border border-slate-200 px-4 py-3 text-center">RM750</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-semibold">Total Repayment</td>
                    <td className="border border-slate-200 px-4 py-3 text-center font-bold text-emerald-600">RM67,000</td>
                    <td className="border border-slate-200 px-4 py-3 text-center font-bold">RM67,950</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-semibold">Monthly Payment</td>
                    <td className="border border-slate-200 px-4 py-3 text-center font-bold text-emerald-600">RM1,104</td>
                    <td className="border border-slate-200 px-4 py-3 text-center font-bold">RM1,120</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6">
              <p className="font-semibold text-emerald-800 mb-2">Savings with Maybank:</p>
              <p className="text-slate-600 text-sm">
                For a RM50,000 loan over 5 years, choosing Maybank at 6.5% saves you approximately
                <strong> RM950 in total interest</strong> compared to CIMB at 6.88%. That&apos;s about
                RM16 less per month, or RM190 per year.
              </p>
            </div>

            {/* Eligibility Comparison */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Eligibility Requirements Comparison
            </h3>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Requirement</th>
                    <th className="border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">Maybank</th>
                    <th className="border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">CIMB</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Citizenship</td>
                    <td className="border border-slate-200 px-4 py-3 text-center">Malaysian / PR</td>
                    <td className="border border-slate-200 px-4 py-3 text-center">Malaysian / PR</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">Age</td>
                    <td className="border border-slate-200 px-4 py-3 text-center">21 - 60 years</td>
                    <td className="border border-slate-200 px-4 py-3 text-center">21 - 60 years</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Minimum Income</td>
                    <td className="border border-slate-200 px-4 py-3 text-center">RM3,000/month</td>
                    <td className="border border-slate-200 px-4 py-3 text-center bg-emerald-50 text-emerald-700 font-semibold">RM2,000/month</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">Employment</td>
                    <td className="border border-slate-200 px-4 py-3 text-center">6+ months</td>
                    <td className="border border-slate-200 px-4 py-3 text-center">6+ months</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Self-Employed</td>
                    <td className="border border-slate-200 px-4 py-3 text-center">2+ years in business</td>
                    <td className="border border-slate-200 px-4 py-3 text-center">2+ years in business</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">DSR Limit</td>
                    <td className="border border-slate-200 px-4 py-3 text-center">70%</td>
                    <td className="border border-slate-200 px-4 py-3 text-center">70%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Application Tips */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Tips for Getting Approved
            </h3>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">1. Check your credit score first</p>
                <p className="text-slate-600 text-base">
                  Get your CTOS report before applying. A score above 700 gives you the best chance
                  of approval and lower rates at both banks.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">2. Apply where you bank</p>
                <p className="text-slate-600 text-base">
                  Existing customers often get better rates and faster approval. If you credit your
                  salary to Maybank or CIMB, apply there first.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">3. Prepare complete documentation</p>
                <p className="text-slate-600 text-base">
                  Have your IC, 3 months payslips, 3 months bank statements, and EA form ready.
                  Incomplete applications cause delays.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">4. Don&apos;t apply to both simultaneously</p>
                <p className="text-slate-600 text-base">
                  Multiple loan applications appear on your credit report and can hurt your score.
                  Choose one bank based on your profile, and only apply to the other if rejected.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Frequently Asked Questions
            </h3>

            <div className="space-y-4 my-6">
              <div className="border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">Which is better: Maybank or CIMB personal loan?</p>
                <p className="text-slate-600 text-sm">
                  It depends on your needs. Maybank offers lower rates (from 6.5%) and faster approval
                  for existing customers. CIMB offers higher loan amounts (up to RM200,000) and lower
                  minimum salary requirements (RM2,000). Compare based on your specific situation.
                </p>
              </div>
              <div className="border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">Can I refinance from Maybank to CIMB or vice versa?</p>
                <p className="text-slate-600 text-sm">
                  Yes, you can refinance your existing personal loan to another bank. However, consider
                  the early settlement penalty (typically 3% of outstanding balance) and ensure the
                  savings from lower rates outweigh the penalty cost.
                </p>
              </div>
              <div className="border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">Do Maybank and CIMB offer Islamic personal financing?</p>
                <p className="text-slate-600 text-sm">
                  Yes, both banks offer Shariah-compliant personal financing. Maybank offers it through
                  Maybank Islamic, while CIMB has CIMB Personal Financing-i. The terms are similar to
                  conventional loans but structured according to Islamic principles.
                </p>
              </div>
            </div>

            {/* Final CTA */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Need Help Deciding?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Use our calculator above to estimate your monthly payment with both banks. If you&apos;re
              still unsure which bank is right for you, click &quot;Get Expert Advice&quot; – our loan
              advisors can help you compare options and find the best rates based on your profile.
            </p>

            <div className="bg-slate-100 rounded-xl p-6 my-6 text-center">
              <p className="text-slate-700 mb-4">
                <strong>Quick Decision Guide:</strong>
              </p>
              <p className="text-slate-600 text-sm">
                Salary &lt; RM3,000? <strong>Go with CIMB</strong><br/>
                Need &gt; RM150,000? <strong>Go with CIMB</strong><br/>
                Existing Maybank customer? <strong>Go with Maybank</strong><br/>
                Want lowest rate? <strong>Go with Maybank</strong>
              </p>
            </div>

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
