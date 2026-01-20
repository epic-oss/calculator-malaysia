import { Metadata } from "next";
import RefinanceCalculator from "@/components/RefinanceCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Refinance Housing Loan Calculator Malaysia ${currentYear} - Calculate Your Savings`,
  description: `Free refinance calculator Malaysia. Calculate how much you can save by refinancing your home loan. Compare latest rates from 15+ banks including Maybank, CIMB, Public Bank.`,
  keywords: [
    "refinance calculator malaysia",
    "housing loan refinance",
    "home loan refinance calculator",
    "refinance savings calculator",
    "mortgage refinance malaysia",
    "bank refinance rates malaysia",
    "refinancing home loan",
    "loan refinancing calculator",
  ],
  openGraph: {
    title: `Refinance Housing Loan Calculator Malaysia ${currentYear}`,
    description: "Calculate how much you can save by refinancing your home loan. Compare latest rates from 15+ banks.",
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
      "name": "How long does the refinancing process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typically 2-3 months from application to disbursement. This includes property valuation, legal documentation, and loan processing."
      }
    },
    {
      "@type": "Question",
      "name": "Can I refinance if I'm still in lock-in period?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, but you'll pay an early settlement penalty of 2-3% of the outstanding loan. Calculate if the savings still outweigh this penalty."
      }
    },
    {
      "@type": "Question",
      "name": "Will refinancing affect my credit score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There will be a new credit inquiry, but the impact is minimal. Your score may even improve if you make timely payments on the new loan."
      }
    },
    {
      "@type": "Question",
      "name": "What is the minimum savings to make refinancing worthwhile?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Generally, aim for at least RM200-300 monthly savings with a break-even period under 3 years."
      }
    },
    {
      "@type": "Question",
      "name": "Can I refinance a property that has dropped in value?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, but your loan-to-value (LTV) ratio may be affected. If your property value has dropped significantly, you may get less favorable terms."
      }
    },
    {
      "@type": "Question",
      "name": "Is Islamic refinancing (refinancing-i) different?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The concept is similar, but Islamic financing uses profit rate instead of interest rate, and follows Shariah-compliant structures like Musharakah Mutanaqisah."
      }
    },
    {
      "@type": "Question",
      "name": "What is Zero Entry Cost refinancing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Some banks in Malaysia offer 'Zero Moving Cost' or 'Zero Entry Cost' packages where they cover legal fees, valuation fees, and stamp duty. This means you can refinance without any upfront payment."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between refinance and repricing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Refinancing means moving your loan to a different bank with new terms and higher costs (legal fees, stamp duty). Repricing means negotiating a better rate with your current bank with minimal costs (admin fee only, ~RM200). Try repricing first before refinancing."
      }
    }
  ]
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `Refinance Housing Loan Calculator Malaysia ${currentYear}`,
  "description": "Calculate how much you can save by refinancing your home loan in Malaysia",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MYR"
  }
};

export default function RefinanceCalculatorPage() {
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
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to All Calculators
          </Link>
        </div>
      </div>

      <RefinanceCalculator />

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
