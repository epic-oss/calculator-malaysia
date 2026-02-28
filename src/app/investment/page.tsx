import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Investment Calculator Malaysia ${currentYear} — ASB Dividend, Gold & Compound Interest | Calculator Malaysia`,
  description: `Free investment calculators for Malaysia ${currentYear}. Calculate ASB dividends, gold prices, compound interest & investment returns. Plan your financial future.`,
  keywords: [
    "investment calculator malaysia",
    "asb dividend calculator",
    "gold price calculator malaysia",
    "compound interest calculator",
    "kalkulator dividen asb",
    "kalkulator harga emas",
  ],
  openGraph: {
    title: `Investment Calculator Malaysia ${currentYear} — ASB, Gold & Compound Interest`,
    description: `Free investment calculators for Malaysia. Calculate ASB dividends, gold prices & investment returns.`,
    type: "website",
    locale: "en_MY",
  },
};

const calculatorCards = [
  {
    name: "ASB Dividend Calculator",
    emoji: "📈",
    href: "/investment/kalkulator-dividen-asb-malaysia/",
    description: "Kira dividen ASB anda berdasarkan kadar terkini 5.75%. Lihat unjuran pulangan tahunan.",
  },
  {
    name: "Kalkulator Harga Emas Malaysia",
    emoji: "🥇",
    href: "/investment/gold-price-calculator-malaysia/",
    description: "Kira nilai emas 916 dan 999 berdasarkan harga semasa. Semak harga emas hari ini.",
  },
];

const faqs = [
  {
    question: "What is the current ASB dividend rate?",
    answer:
      "The ASB (Amanah Saham Bumiputera) dividend rate for 2024 was 5.75% (comprising 5.00% income distribution + 0.75% bonus). ASB dividends have historically ranged from 5.5% to 8.0% per annum. Dividends are declared annually in January and credited directly to your ASB account. ASB is only available to Bumiputera investors with a maximum individual investment of RM 300,000.",
  },
  {
    question: "Is gold a good investment in Malaysia?",
    answer:
      "Gold has historically been a strong store of value and inflation hedge. In Malaysia, you can invest in physical gold (916 or 999 purity), gold savings accounts (like Maybank Gold Investment Account), or gold ETFs on Bursa Malaysia. Gold prices in Malaysia are influenced by international spot prices and the USD/MYR exchange rate. Consider allocating 5-15% of your portfolio to gold for diversification.",
  },
  {
    question: "What is the difference between 916 and 999 gold?",
    answer:
      "916 gold (22 karat) contains 91.6% pure gold mixed with other metals for durability — this is the standard for Malaysian gold jewelry. 999 gold (24 karat) is 99.9% pure gold, used primarily for investment bars and coins. 999 gold has a higher per-gram price but is softer and not suitable for jewelry. For investment purposes, 999 gold bars offer better value due to lower making charges.",
  },
  {
    question: "How do I calculate compound interest on my investments?",
    answer:
      "Compound interest is calculated using the formula: A = P(1 + r/n)^(nt), where P is principal, r is annual interest rate, n is compounding frequency, and t is time in years. For example, RM 10,000 invested at 6% compounded annually for 10 years grows to RM 17,908. The power of compounding is most effective over long periods — starting 10 years earlier can double your final amount.",
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

export default function InvestmentHubPage() {
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
            <span className="text-slate-900">Investment</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-teal-700 text-white py-12 md:py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            📈 Investment Calculators Malaysia
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Investment Calculator Malaysia {currentYear}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Calculate ASB dividends, gold prices, compound interest & investment growth. Plan your financial future with accurate Malaysian data.
          </p>
        </div>
      </section>

      {/* Calculator Cards Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">
          Choose an Investment Calculator
        </h2>
        <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
          Free calculators for ASB dividends and gold prices — helping you make smarter investment decisions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculatorCards.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="group block rounded-2xl border border-emerald-200 bg-emerald-50 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 rounded-xl p-3 text-3xl shrink-0">
                  {c.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:underline">
                    {c.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {c.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity group-hover:opacity-90" style={{ backgroundColor: "#1B5E20" }}>
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
              <div className="text-2xl font-bold text-slate-900">15,000+</div>
              <div className="text-sm text-slate-500">Calculations Done</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">2</div>
              <div className="text-sm text-slate-500">Calculators</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">Live Rates</div>
              <div className="text-sm text-slate-500">Gold Prices</div>
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
            Disclaimer: Investment calculations are estimates. Past performance is not indicative of future results. Consult a licensed financial advisor.
          </p>
        </div>
      </footer>
    </div>
  );
}
