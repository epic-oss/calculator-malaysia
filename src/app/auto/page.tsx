import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Car Calculator Malaysia ${currentYear} — Refinance & Save on Your Car Loan | Calculator Malaysia`,
  description: `Free car loan calculators for Malaysia ${currentYear}. Calculate car refinance savings and compare rates from major banks. Find out if refinancing your car loan is worth it.`,
  keywords: [
    "car calculator malaysia",
    "car refinance calculator",
    "car loan refinance malaysia",
    "kalkulator refinance kereta",
    "car loan savings calculator",
  ],
  openGraph: {
    title: `Car Calculator Malaysia ${currentYear} — Refinance & Save on Your Car Loan`,
    description: `Free car calculators for Malaysia. Calculate car refinance savings and compare rates.`,
    type: "website",
    locale: "en_MY",
  },
};

const calculatorCards = [
  {
    name: "Car Refinance Calculator",
    emoji: "🚗",
    href: "/auto/car-refinance-calculator-malaysia/",
    description: "Calculate how much you can save by refinancing your car loan. Compare rates from major banks.",
  },
  {
    name: "Kalkulator Refinance Kereta",
    emoji: "🚗",
    href: "/auto/kalkulator-refinance-kereta-malaysia/",
    description: "Kira berapa anda boleh jimat dengan refinance pinjaman kereta. Bandingkan kadar dari bank utama.",
  },
];

const faqs = [
  {
    question: "Can I refinance my car loan in Malaysia?",
    answer:
      "Yes, car loan refinancing is available in Malaysia. You can refinance to get a lower interest rate, extend your tenure for lower monthly payments, or get cash-out from your car's equity. Banks like Maybank, CIMB, Hong Leong, and Public Bank offer car refinancing. Your car should typically be less than 10 years old and the remaining loan balance above RM 10,000.",
  },
  {
    question: "How much can I save by refinancing my car loan?",
    answer:
      "Savings depend on your current interest rate, new rate, and remaining tenure. For example, refinancing a RM 60,000 car loan from 3.5% to 2.8% flat rate with 5 years remaining could save you RM 2,100 in total interest. The biggest savings come when you refinance from a high-rate used car loan to a competitive new rate. Use our calculator to see your exact savings.",
  },
  {
    question: "What is the difference between flat rate and effective rate for car loans?",
    answer:
      "Flat rate calculates interest on the original loan amount for the entire tenure — a 3% flat rate on RM 100,000 over 7 years means total interest of RM 21,000. Effective rate (reducing balance) calculates interest on the remaining balance, which decreases each month. A 3% flat rate is approximately equivalent to a 5.5-6% effective rate. Malaysian car loans (hire purchase) use flat rate, while housing loans use effective rate.",
  },
  {
    question: "What documents do I need for car loan refinancing?",
    answer:
      "Typically you need: IC (MyKad), latest 3 months salary slips, latest 3 months bank statements, EPF statement, vehicle registration card (geran), current car loan statement, and a vehicle inspection report. Self-employed applicants may need additional documents like business registration and income tax returns (Form B/BE). Processing usually takes 1-3 weeks.",
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

export default function AutoHubPage() {
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
            <span className="text-slate-900">Auto</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-900 via-sky-800 to-blue-700 text-white py-12 md:py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            🚗 Car Calculators Malaysia
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Car Calculator Malaysia {currentYear}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Calculate car loan refinance savings and compare rates from major Malaysian banks. Find out how much you can save today.
          </p>
        </div>
      </section>

      {/* Calculator Cards Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">
          Choose a Car Calculator
        </h2>
        <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
          Free calculators for car loan refinancing — available in English and Bahasa Malaysia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculatorCards.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="group block rounded-2xl border border-sky-200 bg-sky-50 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="bg-sky-100 rounded-xl p-3 text-3xl shrink-0">
                  {c.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:underline">
                    {c.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {c.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity group-hover:opacity-90" style={{ backgroundColor: "#01579B" }}>
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
              <div className="text-2xl font-bold text-slate-900">5,000+</div>
              <div className="text-sm text-slate-500">Calculations Done</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">2</div>
              <div className="text-sm text-slate-500">Calculators</div>
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
            Disclaimer: Car loan calculations are estimates. Actual rates and savings may vary by bank and vehicle condition.
          </p>
        </div>
      </footer>
    </div>
  );
}
