import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Tax & Salary Calculator Malaysia ${currentYear} — EPF, PCB & Take-Home Pay | Calculator Malaysia`,
  description: `Free tax and salary calculators for Malaysia ${currentYear}. Calculate income tax, EPF, SOCSO, EIS deductions & net take-home pay based on LHDN rates.`,
  keywords: [
    "tax calculator malaysia",
    "salary calculator malaysia",
    "pcb calculator",
    "epf calculator malaysia",
    "income tax malaysia",
    "take home pay calculator",
    "kalkulator gaji malaysia",
    "kalkulator pcb",
  ],
  openGraph: {
    title: `Tax & Salary Calculator Malaysia ${currentYear} — EPF, PCB & Take-Home Pay`,
    description: `Free tax and salary calculators for Malaysia ${currentYear}. Calculate income tax, EPF, SOCSO & net take-home pay.`,
    type: "website",
    locale: "en_MY",
  },
};

const calculatorCards = [
  {
    name: "Monthly Salary Calculator",
    emoji: "💰",
    href: "/tax/monthly-salary-calculator-malaysia/",
    description: "Calculate net salary after EPF, SOCSO, EIS and PCB deductions. See your take-home pay instantly.",
  },
  {
    name: "EPF Retirement Calculator (KWSP)",
    emoji: "📊",
    href: "/tax/epf-retirement-calculator-malaysia/",
    description: "Calculate EPF contributions, project retirement savings & see Account 1 & 2 breakdown.",
  },
  {
    name: "Kalkulator PCB Bulanan",
    emoji: "🧾",
    href: "/tax/kalkulator-pcb-bulanan-malaysia/",
    description: "Kira potongan cukai berjadual (PCB) bulanan daripada gaji anda.",
  },
  {
    name: "Kalkulator Kira Gaji Bulanan",
    emoji: "💵",
    href: "/tax/kalkulator-kira-gaji-bulanan-malaysia/",
    description: "Kira gaji bersih selepas potongan EPF, SOCSO, EIS dan PCB.",
  },
  {
    name: "Kalkulator SSPA",
    emoji: "🏛️",
    href: "/tax/sspa-calculator-malaysia/",
    description: "Kira gaji baharu SSPA untuk penjawat awam. Lihat kenaikan Fasa 1 & 2, KGT mengikut gred.",
  },
];

const faqs = [
  {
    question: "How is income tax calculated in Malaysia?",
    answer:
      "Malaysia uses a progressive tax system with rates from 0% to 30%. The first RM 5,000 of chargeable income is tax-free, with rates increasing in bands: 1% (RM 5,001-20,000), 3% (RM 20,001-35,000), 6% (RM 35,001-50,000), 11% (RM 50,001-70,000), 19% (RM 70,001-100,000), 25% (RM 100,001-400,000), 26% (RM 400,001-600,000), 28% (RM 600,001-2M), and 30% (above RM 2M). Tax residents also benefit from various reliefs and deductions.",
  },
  {
    question: "What is PCB and how is it deducted from my salary?",
    answer:
      "PCB (Potongan Cukai Berjadual / Monthly Tax Deduction) is the monthly income tax deducted from your salary by your employer. It's calculated based on your gross salary, EPF contribution, number of dependents, and tax relief claimed. PCB serves as advance tax payment — at year-end, any overpaid PCB is refunded when you file your tax return.",
  },
  {
    question: "What are the EPF contribution rates in Malaysia?",
    answer:
      "As of 2024, employees contribute 11% of their monthly salary to EPF (9% for those earning above RM 5,000 who opt for the lower rate). Employers contribute 13% for salaries up to RM 5,000 and 12% for salaries above RM 5,000. EPF contributions are divided between Account 1 (70%, for retirement) and Account 2 (30%, for housing and education).",
  },
  {
    question: "What is SOCSO and EIS deduction?",
    answer:
      "SOCSO (Social Security Organisation) provides employment injury and invalidity benefits. Employees contribute 0.5% of salary (capped at RM 86.65/month). EIS (Employment Insurance System) provides job loss benefits — both employer and employee contribute 0.2% each (capped at RM 9.90/month). These are mandatory deductions for most private sector employees.",
  },
  {
    question: "What is the SSPA salary revision for civil servants?",
    answer:
      "SSPA (Sistem Saraan Perkhidmatan Awam) is the new public service salary system replacing SSM. It was implemented in phases — Phase 1 in December 2024 with a 15% minimum salary increase, and Phase 2 scheduled for January 2026. SSPA includes revised grade structures, new KGT (Kenaikan Gaji Tahunan) rates, and updated allowances for all civil servants.",
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

export default function TaxHubPage() {
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
            <span className="text-slate-900">Tax & Salary</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-800 via-purple-700 to-violet-600 text-white py-12 md:py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            🧾 Tax & Salary Calculators Malaysia
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Tax & Salary Calculator Malaysia {currentYear}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Calculate your income tax, EPF, SOCSO & take-home pay accurately. Based on the latest LHDN {currentYear} rates and tax brackets.
          </p>
        </div>
      </section>

      {/* Calculator Cards Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">
          Choose a Tax or Salary Calculator
        </h2>
        <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
          Free calculators for income tax, salary deductions, EPF retirement planning, and SSPA civil servant salaries.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculatorCards.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="group block rounded-2xl border border-purple-200 bg-purple-50 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 rounded-xl p-3 text-3xl shrink-0">
                  {c.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:underline">
                    {c.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {c.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity group-hover:opacity-90" style={{ backgroundColor: "#6A1B9A" }}>
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
              <div className="text-2xl font-bold text-slate-900">50,000+</div>
              <div className="text-sm text-slate-500">Tax Calculations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">5</div>
              <div className="text-sm text-slate-500">Calculators</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">LHDN {currentYear}</div>
              <div className="text-sm text-slate-500">Tax Rates</div>
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
            Disclaimer: Tax calculations are estimates based on LHDN published rates. Consult a tax professional for official tax advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
