import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Property Calculator Malaysia ${currentYear} — Stamp Duty, Refinance & Quit Rent | Calculator Malaysia`,
  description: `Free property calculators for Malaysia ${currentYear}. Calculate housing loan refinance savings, quit rent (cukai tanah) & stamp duty. Compare rates from 15+ banks.`,
  keywords: [
    "property calculator malaysia",
    "stamp duty calculator malaysia",
    "refinance calculator malaysia",
    "quit rent calculator",
    "cukai tanah kalkulator",
    "housing loan refinance",
    "kalkulator refinance rumah",
  ],
  openGraph: {
    title: `Property Calculator Malaysia ${currentYear} — Stamp Duty, Refinance & Quit Rent`,
    description: `Free property calculators for Malaysia. Calculate refinance savings, quit rent & stamp duty.`,
    type: "website",
    locale: "en_MY",
  },
};

const calculatorCards = [
  {
    name: "Refinance Housing Loan Calculator",
    emoji: "🏠",
    href: "/property/refinance-housing-loan-calculator-malaysia/",
    description: "Calculate how much you can save by refinancing your home loan. Compare rates from 15+ banks.",
  },
  {
    name: "Kalkulator Refinance Pinjaman Rumah",
    emoji: "🏠",
    href: "/property/kalkulator-refinance-pinjaman-perumahan/",
    description: "Kira penjimatan refinance pinjaman perumahan anda. Bandingkan kadar dari 15+ bank.",
  },
  {
    name: "Quit Rent Calculator Selangor",
    emoji: "📜",
    href: "/property/quit-rent-calculator-selangor/",
    description: "Calculate quit rent (cukai tanah) for Selangor and all states. Check rates, deadlines & pay online.",
  },
];

const faqs = [
  {
    question: "How much can I save by refinancing my housing loan?",
    answer:
      "Refinancing can save you RM 50,000–200,000 over the remaining tenure, depending on the interest rate difference. For example, refinancing a RM 400,000 loan from 4.5% to 3.5% saves approximately RM 200/month. However, consider the costs: legal fees (RM 3,000–8,000), valuation fees (RM 500–2,000), and any lock-in period penalties from your current bank.",
  },
  {
    question: "What is quit rent (cukai tanah) in Malaysia?",
    answer:
      "Quit rent is an annual land tax payable to the state government. It's calculated based on the land area and category (residential, commercial, agricultural). Rates vary by state — in Selangor, residential land is charged around RM 0.035–0.15 per sq ft. Quit rent must be paid by June 1 each year to avoid penalties. Most state land offices now accept online payments.",
  },
  {
    question: "When is the best time to refinance in Malaysia?",
    answer:
      "The best time to refinance is when: (1) current market rates are at least 0.5-1% lower than your existing rate, (2) your lock-in period has expired (usually 3-5 years), (3) you have at least 10+ years remaining on your tenure, and (4) your property value has increased. Check with multiple banks as rates and cash-back offers vary significantly.",
  },
  {
    question: "What are the stamp duty rates for property purchase in Malaysia?",
    answer:
      "Stamp duty on property transfers is calculated on a tiered basis: 1% on the first RM 100,000, 2% on RM 100,001–500,000, 3% on RM 500,001–1,000,000, and 4% on amounts above RM 1,000,000. First-time homebuyers may be eligible for stamp duty exemptions on properties priced up to RM 500,000. Loan agreement stamp duty is fixed at 0.5% of the loan amount.",
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

export default function PropertyHubPage() {
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
            <span className="text-slate-900">Property</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-800 via-orange-700 to-amber-600 text-white py-12 md:py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            🏠 Property Calculators Malaysia
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Property Calculator Malaysia {currentYear}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Calculate stamp duty, legal fees, refinance savings & quit rent. Everything you need for property transactions in Malaysia.
          </p>
        </div>
      </section>

      {/* Calculator Cards Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">
          Choose a Property Calculator
        </h2>
        <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
          Free calculators for housing loan refinance, quit rent, and property transaction costs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculatorCards.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="group block rounded-2xl border border-orange-200 bg-orange-50 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 rounded-xl p-3 text-3xl shrink-0">
                  {c.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:underline">
                    {c.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {c.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity group-hover:opacity-90" style={{ backgroundColor: "#E65100" }}>
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
              <div className="text-2xl font-bold text-slate-900">10,000+</div>
              <div className="text-sm text-slate-500">Calculations Done</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">3</div>
              <div className="text-sm text-slate-500">Calculators</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{currentYear}</div>
              <div className="text-sm text-slate-500">Updated Rates</div>
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
            Disclaimer: Property calculations are estimates. Consult a lawyer or banker for exact fees and rates.
          </p>
        </div>
      </footer>
    </div>
  );
}
