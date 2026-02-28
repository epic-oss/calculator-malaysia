import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Credit Card Calculator Malaysia ${currentYear} — Interest, Minimum Payment & Payoff | Calculator Malaysia`,
  description: `Free credit card calculators for Malaysia ${currentYear}. Calculate interest charges, minimum payment traps & debt payoff timelines. Escape the credit card debt cycle.`,
  keywords: [
    "credit card calculator malaysia",
    "credit card interest calculator",
    "credit card minimum payment calculator",
    "credit card debt payoff",
    "credit card interest rate malaysia",
    "kad kredit kalkulator",
  ],
  openGraph: {
    title: `Credit Card Calculator Malaysia ${currentYear} — Interest, Minimum Payment & Payoff`,
    description: `Free credit card calculators for Malaysia. Calculate interest, minimum payment traps & debt payoff timelines.`,
    type: "website",
    locale: "en_MY",
  },
};

const calculatorCards = [
  {
    name: "Credit Card Minimum Payment Calculator",
    emoji: "💳",
    href: "/credit-card/credit-card-minimum-payment-calculator-malaysia/",
    description: "See how long it takes to pay off with minimum payments. Escape the debt trap.",
  },
  {
    name: "Credit Card Interest Calculator",
    emoji: "📈",
    href: "/credit-card/credit-card-interest-calculator-malaysia/",
    description: "Calculate daily interest rate, time to pay off & total interest on your credit card balance.",
  },
  {
    name: "Credit Card Calculator Malaysia",
    emoji: "🎁",
    href: "/credit-card/credit-card-calculator-malaysia/",
    description: "Compare credit cards, calculate rewards & find the best card for your spending habits.",
  },
];

const faqs = [
  {
    question: "What is the credit card interest rate in Malaysia?",
    answer:
      "Credit card interest in Malaysia is typically 15-18% per annum (1.25-1.5% per month) on outstanding balances. Interest is charged daily from the transaction date if you don't pay the full statement balance by the due date. Some banks offer lower rates for balance transfers (0-6% for promotional periods). Late payment fees range from RM 10-50 depending on the outstanding amount.",
  },
  {
    question: "What happens if I only pay the minimum payment?",
    answer:
      "Paying only the minimum (usually 5% of outstanding or RM 50, whichever is higher) means most of your payment goes toward interest, not principal. A RM 10,000 balance at 18% interest with minimum payments only would take 7-10 years to pay off and cost you RM 8,000-12,000 in total interest — nearly doubling your original debt. Always pay more than the minimum to avoid this trap.",
  },
  {
    question: "How can I pay off credit card debt faster in Malaysia?",
    answer:
      "The most effective strategies are: (1) Pay more than the minimum — even RM 200 extra per month dramatically reduces payoff time, (2) Use the avalanche method — pay highest interest cards first, (3) Consider a balance transfer to a 0% promotional rate card, (4) Consolidate with a personal loan at a lower rate (5-12% vs 15-18%), (5) Avoid new purchases on the card while paying down debt.",
  },
  {
    question: "What is the annual fee for credit cards in Malaysia?",
    answer:
      "Annual fees range from RM 0 (fee-waived cards) to RM 800+ for premium cards. Most banks waive annual fees if you meet minimum spending requirements (typically RM 8,000-12,000/year) or simply call to request a waiver. Many entry-level and cashback cards offer permanent fee waivers. Always negotiate — banks would rather waive the fee than lose a customer.",
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

export default function CreditCardHubPage() {
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
            <span className="text-slate-900">Credit Cards</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-800 via-red-700 to-rose-600 text-white py-12 md:py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            💳 Credit Card Calculators Malaysia
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Credit Card Calculator Malaysia {currentYear}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Calculate credit card interest, minimum payment traps & debt payoff timelines. Take control of your credit card debt today.
          </p>
        </div>
      </section>

      {/* Calculator Cards Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">
          Choose a Credit Card Calculator
        </h2>
        <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
          Free calculators to understand your credit card costs and plan your debt payoff strategy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculatorCards.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="group block rounded-2xl border border-red-200 bg-red-50 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="bg-red-100 rounded-xl p-3 text-3xl shrink-0">
                  {c.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:underline">
                    {c.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {c.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity group-hover:opacity-90" style={{ backgroundColor: "#C62828" }}>
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
              <div className="text-2xl font-bold text-slate-900">8,000+</div>
              <div className="text-sm text-slate-500">Calculations</div>
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
            Disclaimer: Credit card calculations are estimates. Actual charges may vary by bank and card type.
          </p>
        </div>
      </footer>
    </div>
  );
}
