import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Insurance Calculator Malaysia ${currentYear} — Compare Premiums & Save | Calculator Malaysia`,
  description: `Free insurance calculators for car, motorcycle, EV & travel insurance in Malaysia. Compare premiums from 15+ insurers and save up to RM340/year.`,
  keywords: [
    "insurance calculator malaysia",
    "car insurance calculator",
    "motorcycle insurance calculator",
    "ev insurance calculator",
    "road tax calculator malaysia",
    "insurans kereta kalkulator",
    "insurans motor malaysia",
  ],
  openGraph: {
    title: `Insurance Calculator Malaysia ${currentYear} — Compare Premiums & Save`,
    description: `Free insurance calculators for car, motorcycle & EV insurance in Malaysia. Compare premiums and save.`,
    type: "website",
    locale: "en_MY",
  },
};

const calculatorCards = [
  {
    name: "EV Car Insurance Calculator",
    emoji: "🚗",
    href: "/insurance/ev-car-insurance-calculator-malaysia/",
    description: "Calculate electric vehicle insurance premium and road tax. Compare prices from 15+ insurers.",
  },
  {
    name: "Car Insurance Calculator",
    emoji: "🚙",
    href: "/insurance/car-insurance-calculator-malaysia/",
    description: "Calculate car insurance premium and road tax. Compare comprehensive vs third party coverage.",
  },
  {
    name: "Road Tax & Motorcycle Insurance",
    emoji: "🏍️",
    href: "/insurance/road-tax-and-motorcycle-insurance-calculator/",
    description: "Calculate motorcycle insurance premium and road tax. Compare third party vs comprehensive.",
  },
  {
    name: "Allianz Motorcycle Insurance",
    emoji: "🛡️",
    href: "/insurance/allianz-motorcycle-insurance-calculator-malaysia/",
    description: "Get Allianz motorcycle insurance quote instantly. Compare coverage options and prices.",
  },
  {
    name: "Cheapest Motorcycle Insurance",
    emoji: "💸",
    href: "/insurance/cheapest-motorcycle-insurance-calculator-malaysia/",
    description: "Find the cheapest motorcycle insurance in Malaysia. Compare quotes from all major insurers.",
  },
  {
    name: "Kalkulator Insurans Motor",
    emoji: "🏍️",
    href: "/insurance/kalkulator-insurans-motor-malaysia/",
    description: "Kira premium insurans motor anda dengan segera. Bandingkan harga dari 15+ syarikat insurans.",
  },
];

const faqs = [
  {
    question: "How is car insurance premium calculated in Malaysia?",
    answer:
      "Car insurance premiums in Malaysia are calculated based on your vehicle's sum insured (market value), engine capacity (cc), vehicle age, NCD (No Claim Discount), and the type of coverage (comprehensive vs third party). Comprehensive coverage costs more but covers own damage, theft, and third party liability. Third party insurance only covers damage to other vehicles and property.",
  },
  {
    question: "What is NCD (No Claim Discount) and how does it work?",
    answer:
      "NCD is a discount on your insurance premium for each year you don't make a claim. It starts at 25% after the first claim-free year and increases to 30%, 38.33%, 45%, and up to 55% after 5+ years. If you make a claim, your NCD resets to 0%. NCD is transferable between vehicles and can save you hundreds of ringgit annually.",
  },
  {
    question: "Is EV car insurance more expensive in Malaysia?",
    answer:
      "EV insurance premiums can be 10-30% higher than equivalent petrol cars due to higher repair costs for batteries and specialized components. However, EVs are exempt from road tax in Malaysia until 2025, which offsets some of the cost. Some insurers now offer EV-specific policies with battery coverage and charging equipment protection.",
  },
  {
    question: "What is the minimum motorcycle insurance required in Malaysia?",
    answer:
      "The minimum legal requirement is third party insurance, which covers damage to other people's vehicles and property. Premiums start from around RM 70-120/year for motorcycles under 150cc. Comprehensive coverage, which also covers your own motorcycle, typically costs RM 200-500/year depending on the bike's value and engine capacity.",
  },
  {
    question: "How can I save money on car insurance in Malaysia?",
    answer:
      "The best ways to save on car insurance include: maintaining your NCD by not making small claims, comparing quotes from multiple insurers, choosing higher voluntary excess, installing approved security devices, and considering third party coverage for older vehicles. You can also save by bundling add-ons strategically rather than adding all available coverage.",
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

export default function InsuranceHubPage() {
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
            <span className="text-slate-900">Insurance</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-600 text-white py-12 md:py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            🛡️ Insurance Calculators Malaysia
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Insurance Calculator Malaysia {currentYear}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Compare car, motorcycle, EV & travel insurance costs in minutes. Get instant quotes from 15+ insurers and find the best coverage for your needs.
          </p>
        </div>
      </section>

      {/* Calculator Cards Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">
          Choose an Insurance Calculator
        </h2>
        <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
          Free calculators for car, motorcycle, and EV insurance — compare premiums and find the best deal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculatorCards.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="group block rounded-2xl border border-blue-200 bg-blue-50 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-xl p-3 text-3xl shrink-0">
                  {c.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:underline">
                    {c.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {c.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity group-hover:opacity-90" style={{ backgroundColor: "#1565C0" }}>
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
              <div className="text-2xl font-bold text-slate-900">2,400+</div>
              <div className="text-sm text-slate-500">Policies Compared</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">6</div>
              <div className="text-sm text-slate-500">Calculators</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">RM 340</div>
              <div className="text-sm text-slate-500">Avg Savings/Year</div>
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
            Disclaimer: Insurance premiums are estimates based on standard tariff rates. Actual premiums may vary by insurer, vehicle condition, and claims history.
          </p>
        </div>
      </footer>
    </div>
  );
}
