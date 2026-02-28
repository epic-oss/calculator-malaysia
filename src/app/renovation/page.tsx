import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Renovation Cost Calculator Malaysia ${currentYear} — Kitchen & Home Renovation | Calculator Malaysia`,
  description: `Free renovation cost calculators for Malaysia ${currentYear}. Estimate kitchen, bathroom & home renovation costs. Get accurate budgets and free contractor quotes.`,
  keywords: [
    "renovation cost calculator malaysia",
    "kitchen renovation cost",
    "home renovation calculator",
    "kos renovasi dapur",
    "kalkulator renovate rumah",
    "renovation budget malaysia",
  ],
  openGraph: {
    title: `Renovation Cost Calculator Malaysia ${currentYear} — Kitchen & Home Renovation`,
    description: `Free renovation calculators for Malaysia. Estimate kitchen & home renovation costs and get free quotes.`,
    type: "website",
    locale: "en_MY",
  },
};

const calculatorCards = [
  {
    name: "Kitchen Renovation Cost Calculator",
    emoji: "🍳",
    href: "/renovation/kitchen-renovation-cost-calculator-malaysia/",
    description: "Calculate kitchen renovation cost based on size, cabinet type & finish level. Get free contractor quotes.",
  },
  {
    name: "Kalkulator Kos Renovate Dapur",
    emoji: "🍳",
    href: "/renovation/kalkulator-kos-renovate-dapur/",
    description: "Kira anggaran kos renovasi dapur berdasarkan saiz, jenis kabinet dan tahap kemasan.",
  },
];

const faqs = [
  {
    question: "How much does a kitchen renovation cost in Malaysia?",
    answer:
      "Kitchen renovation costs in Malaysia range from RM 8,000 for a basic refresh to RM 80,000+ for a full high-end renovation. A mid-range kitchen renovation (10x8 ft) typically costs RM 15,000–35,000, including cabinets, countertop, backsplash, and basic appliances. The biggest cost factors are cabinet material (melamine vs solid wood), countertop (laminate vs quartz vs granite), and whether you're changing the plumbing layout.",
  },
  {
    question: "What is the cheapest way to renovate a kitchen in Malaysia?",
    answer:
      "To keep costs down: (1) Keep the existing layout to avoid plumbing changes (saves RM 3,000-8,000), (2) Choose melamine or laminate cabinets over solid wood (saves 40-60%), (3) Use laminate countertops instead of quartz (saves RM 2,000-5,000), (4) Repaint instead of replacing cabinets if they're structurally sound, (5) Source hardware and fixtures independently instead of through the contractor. A budget kitchen refresh can be done for RM 8,000-15,000.",
  },
  {
    question: "How long does a kitchen renovation take in Malaysia?",
    answer:
      "A typical kitchen renovation takes 2-6 weeks depending on scope. Cabinet fabrication takes 2-3 weeks, installation takes 3-5 days, countertop and backsplash take 2-3 days, and plumbing/electrical takes 1-3 days. Factor in additional time for hacking (if needed), tiling, and painting. It's common for Malaysian renovations to extend 1-2 weeks beyond the quoted timeline, so plan accordingly.",
  },
  {
    question: "Should I hire a contractor or interior designer for renovation?",
    answer:
      "For kitchens under RM 30,000, a direct contractor is usually sufficient and saves 15-25% on design fees. For larger projects or full home renovations above RM 50,000, an interior designer (ID) can add value through space planning, material sourcing, and project management. Always get 3+ quotes, check reviews on platforms like Recommend.my, and verify with photos of completed work.",
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

export default function RenovationHubPage() {
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
            <span className="text-slate-900">Renovation</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-900 via-orange-800 to-red-700 text-white py-12 md:py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            🏠 Renovation Calculators Malaysia
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Renovation Cost Calculator Malaysia {currentYear}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Estimate kitchen, bathroom & full home renovation costs with accurate Malaysian pricing. Get free quotes from verified contractors.
          </p>
        </div>
      </section>

      {/* Calculator Cards Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">
          Choose a Renovation Calculator
        </h2>
        <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
          Free calculators for estimating renovation costs — available in English and Bahasa Malaysia.
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
                  <span className="inline-flex items-center gap-1 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity group-hover:opacity-90" style={{ backgroundColor: "#BF360C" }}>
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
              <div className="text-2xl font-bold text-slate-900">RM 2.1M+</div>
              <div className="text-sm text-slate-500">Renovations Planned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">120+</div>
              <div className="text-sm text-slate-500">Homeowners</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">EN + BM</div>
              <div className="text-sm text-slate-500">Bilingual</div>
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
            Disclaimer: Renovation costs are estimates based on average market rates. Actual costs may vary by contractor, material, and location.
          </p>
        </div>
      </footer>
    </div>
  );
}
