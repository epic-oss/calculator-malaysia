import { Metadata } from "next";
import CarRefinanceCalculator from "@/components/CarRefinanceCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Car Refinance Calculator Malaysia ${currentYear} - Calculate Your Savings`,
  description: `Free car refinance calculator Malaysia. Calculate how much you can save by refinancing your car loan. Compare rates from banks and check eligibility.`,
  keywords: [
    "car refinance calculator malaysia",
    "car loan refinance",
    "refinance kereta",
    "car loan calculator",
    "auto refinance malaysia",
    "car loan interest rate",
    "refinance car loan malaysia",
    "vehicle refinancing",
  ],
  openGraph: {
    title: `Car Refinance Calculator Malaysia ${currentYear}`,
    description: "Calculate how much you can save by refinancing your car loan. Compare rates from banks and check eligibility.",
    type: "website",
    locale: "en_MY",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the maximum car age for refinancing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most banks require car to be less than 10 years old at the end of loan tenure. So a 5-year old car can get max 5-year refinance."
      }
    },
    {
      "@type": "Question",
      "name": "Can I refinance a car under hire purchase?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, most car loans in Malaysia are hire purchase. The new bank will settle your existing HP."
      }
    },
    {
      "@type": "Question",
      "name": "What is early settlement penalty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Usually 2-3% of outstanding loan. Some banks waive this for refinancing to them."
      }
    },
    {
      "@type": "Question",
      "name": "Can I refinance and get cash out?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, if your car value is higher than your outstanding loan. You can borrow the difference."
      }
    },
    {
      "@type": "Question",
      "name": "Will refinancing affect my credit score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There will be a new credit check, but minimal impact if you pay on time."
      }
    },
    {
      "@type": "Question",
      "name": "What if my car loan is already low interest?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Refinancing may not be worth it. Use our calculator to check break-even period."
      }
    }
  ]
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `Car Refinance Calculator Malaysia ${currentYear}`,
  "description": "Calculate how much you can save by refinancing your car loan in Malaysia",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MYR"
  }
};

export default function CarRefinanceCalculatorPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />

      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/auto" className="hover:text-slate-900 transition-colors">Auto</Link>
            <span>›</span>
            <span className="text-slate-900">Car Refinance Calculator</span>
          </div>
        </div>
      </div>

      <CarRefinanceCalculator />

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
            © {currentYear} Calculator Malaysia. All calculators are free to use.
          </div>
        </div>
      </footer>
    </div>
  );
}
