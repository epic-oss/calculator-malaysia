import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Wedding Cost Calculator Malaysia ${currentYear} — Plan Your Dream Wedding | Calculator Malaysia`,
  description: `Free wedding cost calculators for Chinese, Indian, Malay & Christian weddings in Malaysia. Get accurate ${currentYear} budgets and free vendor quotes.`,
  keywords: [
    "wedding cost calculator malaysia",
    "wedding budget malaysia",
    "chinese wedding cost",
    "indian wedding cost",
    "malay wedding cost",
    "christian wedding cost",
    "kos kahwin malaysia",
    "wedding planner malaysia",
  ],
  openGraph: {
    title: `Wedding Cost Calculator Malaysia ${currentYear} — Plan Your Dream Wedding`,
    description: `Free wedding cost calculators for Chinese, Indian, Malay & Christian weddings in Malaysia. Get accurate ${currentYear} budgets.`,
    type: "website",
    locale: "en_MY",
  },
};

const weddingTypes = [
  {
    name: "Chinese Wedding",
    emoji: "🏮",
    href: "/wedding/chinese-wedding-cost-calculator-malaysia/",
    description: "Banquet, guo da li, si dian jin, angpao break-even & more.",
    costRange: "RM 50,000 – RM 150,000",
    accent: "red",
    gradient: "from-red-700 to-red-500",
    buttonColor: "#C62828",
    cardBorder: "border-red-200",
    cardBg: "bg-red-50",
    iconBg: "bg-red-100",
  },
  {
    name: "Indian Wedding",
    emoji: "🕉️",
    href: "/wedding/indian-wedding-cost-calculator-malaysia/",
    description: "Temple/hall venue, thali, saree, multi-day celebration costs.",
    costRange: "RM 40,000 – RM 200,000",
    accent: "orange",
    gradient: "from-red-800 to-orange-600",
    buttonColor: "#C2185B",
    cardBorder: "border-orange-200",
    cardBg: "bg-orange-50",
    iconBg: "bg-orange-100",
  },
  {
    name: "Malay Wedding",
    emoji: "🪷",
    href: "/wedding/malay-wedding-cost-calculator-malaysia/",
    description: "Pelamin, hantaran, katering, dewan & bajet perkahwinan Melayu.",
    costRange: "RM 30,000 – RM 120,000",
    accent: "purple",
    gradient: "from-violet-700 to-purple-500",
    buttonColor: "#2E7D32",
    cardBorder: "border-purple-200",
    cardBg: "bg-purple-50",
    iconBg: "bg-purple-100",
  },
  {
    name: "Christian Wedding",
    emoji: "⛪",
    href: "/wedding/christian-wedding-cost-calculator-malaysia/",
    description: "Church or garden ceremony, reception venue & Western-style budget.",
    costRange: "RM 35,000 – RM 130,000",
    accent: "blue",
    gradient: "from-blue-700 to-indigo-500",
    buttonColor: "#1565C0",
    cardBorder: "border-blue-200",
    cardBg: "bg-blue-50",
    iconBg: "bg-blue-100",
  },
];

const faqs = [
  {
    question: "How much does a wedding cost in Malaysia?",
    answer:
      "Wedding costs in Malaysia vary widely depending on the cultural tradition, venue, and guest count. On average, Malaysian couples spend between RM 30,000 to RM 150,000. A Chinese banquet wedding in KL may cost RM 80,000–150,000, while a Malay wedding at a community hall can start from RM 30,000. Indian and Christian weddings typically fall somewhere in between, depending on venue and formality.",
  },
  {
    question: "What is the biggest wedding expense in Malaysia?",
    answer:
      "For most Malaysian weddings, the venue and catering account for 40–60% of the total budget. A hotel banquet in KL costs RM 1,200–2,500 per table (10 pax), while a restaurant banquet ranges from RM 800–1,500. Other major expenses include photography/videography (RM 3,000–10,000), bridal attire (RM 2,000–8,000), and decorations (RM 3,000–15,000).",
  },
  {
    question: "Can I recover my wedding costs through angpao or gifts?",
    answer:
      "In Chinese weddings, couples typically recover 50–70% of banquet costs through angpao (red packets). Average angpao amounts range from RM 100–200 for friends, RM 150–300 for relatives, and RM 300–500+ for close family. Malay weddings receive cash gifts via \"salam\", while Indian weddings often receive gold jewelry and household items. Recovery rates depend on guest count, your social circle, and venue tier.",
  },
  {
    question: "When is the cheapest time to get married in Malaysia?",
    answer:
      "Off-peak wedding months in Malaysia are typically January, March, and July — avoiding major festive seasons and school holidays. Many venues offer 10–30% discounts for weekday or off-peak bookings. Avoid December, November, and Chinese New Year periods when demand and prices are highest. Booking 6–12 months ahead also helps secure better rates.",
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

export default function WeddingHubPage() {
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
            <span className="text-slate-900">Wedding</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-700 via-rose-600 to-red-500 text-white py-12 md:py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            💍 Wedding Calculators Malaysia
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Wedding Cost Calculator Malaysia {currentYear}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Plan your dream wedding with accurate budget calculators tailored for Chinese, Indian, Malay & Christian weddings. Compare costs, plan your guest list, and get free vendor quotes.
          </p>
        </div>
      </section>

      {/* Calculator Cards Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">
          Choose Your Wedding Type
        </h2>
        <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
          Each calculator is customised with the specific cost categories, traditions, and vendor pricing for that wedding style in Malaysia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weddingTypes.map((w) => (
            <Link
              key={w.name}
              href={w.href}
              className={`group block rounded-2xl border ${w.cardBorder} ${w.cardBg} p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1`}
            >
              <div className="flex items-start gap-4">
                <div className={`${w.iconBg} rounded-xl p-3 text-3xl shrink-0`}>
                  {w.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:underline">
                    {w.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {w.description}
                  </p>
                  <div className="text-xs font-medium text-slate-500 mb-4">
                    Average budget: <span className="text-slate-800 font-semibold">{w.costRange}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity group-hover:opacity-90" style={{ backgroundColor: w.buttonColor }}>
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
              <div className="text-2xl font-bold text-slate-900">150+</div>
              <div className="text-sm text-slate-500">Couples Planned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">RM 3.8M+</div>
              <div className="text-sm text-slate-500">Budgets Planned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">4 Types</div>
              <div className="text-sm text-slate-500">Wedding Cultures</div>
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
            Disclaimer: Wedding costs are estimates based on average market rates in Malaysia. Actual prices may vary by vendor, location, and season.
          </p>
        </div>
      </footer>
    </div>
  );
}
