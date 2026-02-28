import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Loan Calculator Malaysia ${currentYear} — Compare Rates & Check Eligibility | Calculator Malaysia`,
  description: `Free loan calculators for personal loans, home loans, car loans, DSR & refinancing in Malaysia. Calculate repayments, eligibility & total interest instantly.`,
  keywords: [
    "loan calculator malaysia",
    "personal loan calculator",
    "home loan calculator malaysia",
    "car loan calculator malaysia",
    "dsr calculator",
    "loan refinance calculator",
    "housing loan calculator",
    "pinjaman peribadi kalkulator",
  ],
  openGraph: {
    title: `Loan Calculator Malaysia ${currentYear} — Compare Rates & Check Eligibility`,
    description: `Free loan calculators for personal loans, home loans, car loans & refinancing in Malaysia. Calculate repayments & eligibility instantly.`,
    type: "website",
    locale: "en_MY",
  },
};

const calculatorCards = [
  {
    name: "Personal Loan Calculator",
    emoji: "💵",
    href: "/loan/personal-loan-calculator-malaysia-based-on-salary/",
    description: "Calculate monthly payment, total interest & check DSR eligibility based on salary.",
  },
  {
    name: "Home Loan Eligibility Calculator",
    emoji: "🏦",
    href: "/loan/home-loan-eligibility-calculator-malaysia/",
    description: "Check how much housing loan you qualify for based on your DSR.",
  },
  {
    name: "House Loan Calculator",
    emoji: "🏡",
    href: "/loan/house-loan-calculator-malaysia/",
    description: "Calculate monthly instalment, total interest & upfront costs for housing loans.",
  },
  {
    name: "Car Loan Calculator",
    emoji: "🚙",
    href: "/loan/car-loan-calculator-malaysia/",
    description: "Calculate car loan monthly payment and total interest for hire purchase.",
  },
  {
    name: "DSR Calculator",
    emoji: "📊",
    href: "/loan/dsr-calculator-malaysia/",
    description: "Calculate your Debt Service Ratio and check loan eligibility instantly.",
  },
  {
    name: "Joint Home Loan Calculator",
    emoji: "👫",
    href: "/loan/joint-home-loan-eligibility-calculator-malaysia/",
    description: "Calculate combined loan eligibility for couples & co-borrowers.",
  },
  {
    name: "Car Loan Early Settlement",
    emoji: "🚗",
    href: "/loan/car-loan-settlement-calculator-malaysia/",
    description: "Calculate if settling your car loan early saves money. See penalties & interest savings.",
  },
  {
    name: "Housing Loan Early Settlement",
    emoji: "🏠",
    href: "/loan/early-housing-loan-settlement-calculator-malaysia/",
    description: "Find out if settling your housing loan early makes financial sense.",
  },
  {
    name: "Personal Loan Refinance",
    emoji: "💰",
    href: "/loans/personal-loan-refinance-calculator-malaysia/",
    description: "Calculate savings by consolidating high-interest debts. Compare rates from 15+ banks.",
  },
  {
    name: "Maybank vs CIMB Comparison",
    emoji: "🏦",
    href: "/loan/maybank-vs-cimb-personal-loan-comparison/",
    description: "Compare Maybank and CIMB personal loan rates, fees & eligibility side by side.",
  },
  {
    name: "Kalkulator Pinjaman Peribadi",
    emoji: "💵",
    href: "/loan/kalkulator-pinjaman-peribadi-malaysia/",
    description: "Kira bayaran bulanan dan semak kelayakan DSR untuk pinjaman peribadi.",
  },
  {
    name: "Kalkulator Refinance Pinjaman Peribadi",
    emoji: "💰",
    href: "/loans/kalkulator-refinance-pinjaman-peribadi/",
    description: "Kira penjimatan dengan gabungkan hutang faedah tinggi. Bandingkan kadar dari 15+ bank.",
  },
];

const faqs = [
  {
    question: "What is the maximum personal loan amount in Malaysia?",
    answer:
      "Most Malaysian banks offer personal loans from RM 5,000 up to RM 200,000, depending on your salary and credit score. Some banks like Maybank and CIMB offer up to RM 250,000 for high-income earners. Your maximum loan is typically capped at 8-10x your monthly salary, subject to DSR limits (usually 60-70%).",
  },
  {
    question: "What is DSR and why does it matter for loan approval?",
    answer:
      "DSR (Debt Service Ratio) is the percentage of your gross monthly income that goes toward debt repayments. Most Malaysian banks require your DSR to be below 60-70%. For example, if you earn RM 5,000/month, your total monthly debt payments (including the new loan) should not exceed RM 3,000-3,500. A lower DSR improves your loan approval chances.",
  },
  {
    question: "How much can I save by refinancing my home loan?",
    answer:
      "Refinancing can save you tens of thousands of ringgit over the loan tenure. If you refinance a RM 400,000 loan from 4.5% to 3.5%, you could save approximately RM 200/month or RM 72,000 over 30 years. However, factor in legal fees (RM 3,000-8,000), valuation fees, and lock-in period penalties before deciding.",
  },
  {
    question: "What is the current BLR/BR rate in Malaysia?",
    answer:
      "As of 2025, the Base Rate (BR) for major Malaysian banks ranges from 2.72% to 3.15%, with the Standardized Base Rate (SBR) at 3.00%. The effective home loan interest rate typically ranges from 3.5% to 4.5% depending on the bank, loan amount, and your credit profile. Car loans (hire purchase) typically range from 2.5% to 4.0% flat rate.",
  },
  {
    question: "Should I settle my car loan or housing loan early?",
    answer:
      "It depends on the type of loan. Car loans in Malaysia use flat-rate interest (Rule of 78), so early settlement in the first few years yields significant savings. Housing loans use reducing balance, so extra payments directly reduce your principal and total interest. Use our early settlement calculators to see exactly how much you would save based on your remaining tenure.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function LoanHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span>›</span>
            <span className="text-slate-900">Loans</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 text-white py-12 md:py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            🏦 Loan Calculators Malaysia
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Loan Calculator Malaysia {currentYear}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Calculate your loan repayments, eligibility & total interest instantly. Compare personal loans, home loans, car loans & refinancing options.
          </p>
        </div>
      </section>

      {/* Calculator Cards Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">
          Choose a Loan Calculator
        </h2>
        <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
          Free calculators for every type of loan in Malaysia — personal, housing, car, and refinancing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculatorCards.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="group block rounded-2xl border border-green-200 bg-green-50 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-xl p-3 text-3xl shrink-0">
                  {c.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:underline">
                    {c.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {c.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity group-hover:opacity-90" style={{ backgroundColor: "#2E7D32" }}>
                    Calculate Now
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-slate-50 border-y border-slate-200 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div>
              <div className="text-2xl font-bold text-slate-900">RM 48M+</div>
              <div className="text-sm text-slate-500">Loans Calculated</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">12</div>
              <div className="text-sm text-slate-500">Calculators</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">300+</div>
              <div className="text-sm text-slate-500">Users Daily</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">100%</div>
              <div className="text-sm text-slate-500">Free to Use</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden group"
            >
              <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-50 transition-colors">
                {faq.question}
              </summary>
              <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm">
          <p className="mb-2">
            &copy; {currentYear} Calculator Malaysia. All rights reserved.
          </p>
          <p>
            Disclaimer: Loan calculations are estimates based on standard rates. Actual rates may vary by bank, credit profile, and market conditions.
          </p>
        </div>
      </footer>
    </div>
  );
}
