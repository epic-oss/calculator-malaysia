import { Metadata } from "next";
import PersonalLoanRefinanceCalculator from "@/components/PersonalLoanRefinanceCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Personal Loan Refinance Calculator Malaysia ${currentYear} - Calculate Your Savings`,
  description: `Free personal loan refinance calculator. Calculate how much you can save by consolidating high-interest loans. Compare rates from 15+ banks.`,
  keywords: [
    "personal loan refinance calculator",
    "debt consolidation malaysia",
    "personal loan calculator",
    "consolidate credit card debt",
    "refinance personal loan",
    "debt consolidation loan",
    "compare personal loan rates",
    "loan calculator malaysia",
  ],
  openGraph: {
    title: `Personal Loan Refinance Calculator Malaysia ${currentYear}`,
    description: "Calculate how much you can save by consolidating high-interest debts. Compare rates from 15+ banks.",
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
      "name": "What's the difference between refinancing and debt consolidation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "They're similar. Refinancing usually means replacing ONE loan with a better one. Debt consolidation means combining MULTIPLE debts into one loan."
      }
    },
    {
      "@type": "Question",
      "name": "Will debt consolidation hurt my credit score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Short-term, there's a small dip from the credit check. Long-term, it can improve your score if you make timely payments."
      }
    },
    {
      "@type": "Question",
      "name": "Can I consolidate debt with bad credit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It's harder, but some lenders like AEON Credit have easier approval. Rates will be higher though."
      }
    },
    {
      "@type": "Question",
      "name": "Should I consolidate small debts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Usually not worth it for debts under RM5,000 total. The processing fee may outweigh savings."
      }
    },
    {
      "@type": "Question",
      "name": "What happens to my credit cards after consolidation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "They remain open unless you close them. Be careful not to rack up new debt!"
      }
    },
    {
      "@type": "Question",
      "name": "Is 0% balance transfer better than consolidation loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "0% balance transfer is great short-term, but usually only 6-12 months. Consolidation loan is better for larger amounts needing longer repayment."
      }
    }
  ]
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `Personal Loan Refinance Calculator Malaysia ${currentYear}`,
  "description": "Calculate how much you can save by consolidating high-interest debts in Malaysia",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MYR"
  }
};

export default function PersonalLoanRefinanceCalculatorPage() {
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
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span>&rsaquo;</span>
            <Link href="/loan" className="hover:text-slate-900 transition-colors">
              Loans
            </Link>
            <span>&rsaquo;</span>
            <span className="text-slate-900">Personal Loan Refinance</span>
          </div>
        </div>
      </div>

      <PersonalLoanRefinanceCalculator />

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
