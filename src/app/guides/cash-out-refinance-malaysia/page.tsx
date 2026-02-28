"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

const PROPERTY_VALUE_RANGES = [
  "RM200,000 - RM400,000",
  "RM400,000 - RM600,000",
  "RM600,000 - RM800,000",
  "RM800,000 - RM1,000,000",
  "Above RM1,000,000",
];

const OUTSTANDING_LOAN_RANGES = [
  "Below RM200,000",
  "RM200,000 - RM400,000",
  "RM400,000 - RM600,000",
  "Above RM600,000",
];

const CASH_OUT_PURPOSES = [
  "Renovation",
  "Debt Consolidation",
  "Investment",
  "Education",
  "Business",
  "Other",
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the minimum cash out amount?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most banks require minimum RM30,000 - RM50,000 for cash out refinancing."
      }
    },
    {
      "@type": "Question",
      "name": "Can I cash out if my property value has dropped?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It will be difficult. If your property value is less than your outstanding loan (negative equity), cash out is not possible."
      }
    },
    {
      "@type": "Question",
      "name": "Is cash out refinance tax deductible?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Only if the cash out is used for income-generating purposes like rental property improvements. Personal use is not tax deductible."
      }
    },
    {
      "@type": "Question",
      "name": "How long does cash out refinance take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "About 2-3 months from application to disbursement."
      }
    },
    {
      "@type": "Question",
      "name": "Can I do cash out on my second property?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, but LTV limits may be lower (typically 70-80% for second property)."
      }
    },
    {
      "@type": "Question",
      "name": "What if I'm still in lock-in period?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can still refinance but will pay early settlement penalty (2-3% of outstanding)."
      }
    },
    {
      "@type": "Question",
      "name": "Can foreigners apply for cash out refinance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, but LTV is typically capped at 60-70% for non-Malaysians."
      }
    }
  ]
};

export default function CashOutRefinanceGuidePage() {
  // Calculator state
  const [propertyValue, setPropertyValue] = useState(500000);
  const [outstandingLoan, setOutstandingLoan] = useState(200000);
  const [ltvLimit, setLtvLimit] = useState(85);

  // Lead form state
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    propertyValue: "RM400,000 - RM600,000",
    outstandingLoan: "RM200,000 - RM400,000",
    cashOutPurpose: "Renovation",
  });

  // Calculator calculations
  const equity = propertyValue - outstandingLoan;
  const maxLoan = propertyValue * (ltvLimit / 100);
  const maxCashOut = Math.max(0, maxLoan - outstandingLoan);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          calculator_type: "cash_out_refinance",
          source_url: typeof window !== "undefined" ? window.location.href : "",
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
      }
    } catch {
      // Handle error silently
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>›</span>
            <span className="text-slate-400">Guides</span>
            <span>›</span>
            <span className="text-slate-900">Cash-Out Refinance Guide</span>
          </div>
        </div>
      </div>

      {/* Guide Content */}
      <article className="bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <header className="mb-10">
            <div className="flex items-center gap-2 text-sm text-blue-600 mb-3">
              <span>Guide</span>
              <span>•</span>
              <span>Property</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Cash Out Refinance Malaysia: Complete Guide {currentYear}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Unlock your property equity for renovation, investment, or debt consolidation
            </p>
          </header>

          {/* Simple Cash Out Calculator */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-10">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">🧮</span>
              Cash Out Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-6">
                {/* Property Value */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Property Current Value (RM)
                  </label>
                  <div className="text-2xl font-bold text-slate-800 mb-2">
                    {formatCurrency(propertyValue)}
                  </div>
                  <input
                    type="range"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    min={200000}
                    max={2000000}
                    step={50000}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>RM200,000</span>
                    <span>RM2,000,000</span>
                  </div>
                </div>

                {/* Outstanding Loan */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Outstanding Loan (RM)
                  </label>
                  <div className="text-2xl font-bold text-slate-800 mb-2">
                    {formatCurrency(outstandingLoan)}
                  </div>
                  <input
                    type="range"
                    value={outstandingLoan}
                    onChange={(e) => setOutstandingLoan(Number(e.target.value))}
                    min={50000}
                    max={1500000}
                    step={10000}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>RM50,000</span>
                    <span>RM1,500,000</span>
                  </div>
                </div>

                {/* LTV Limit */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    LTV Limit (%)
                  </label>
                  <select
                    value={ltvLimit}
                    onChange={(e) => setLtvLimit(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={80}>80% (3rd property onwards)</option>
                    <option value={85}>85% (Most applicants)</option>
                    <option value={90}>90% (First property, excellent credit)</option>
                  </select>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-5">
                  <p className="text-sm text-slate-500 mb-1">Your Property Equity</p>
                  <p className="text-3xl font-bold text-slate-800">{formatCurrency(equity)}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-5">
                  <p className="text-sm text-slate-500 mb-1">Maximum Loan Amount (at {ltvLimit}% LTV)</p>
                  <p className="text-3xl font-bold text-slate-800">{formatCurrency(maxLoan)}</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-5 border-2 border-emerald-200">
                  <p className="text-sm text-emerald-700 mb-1">Maximum Cash Out</p>
                  <p className="text-4xl font-bold text-emerald-600">{formatCurrency(maxCashOut)}</p>
                </div>

                <Link
                  href="/property/refinance-housing-loan-calculator-malaysia/"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-colors mt-4"
                >
                  Compare Refinance Rates
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Lead Capture CTA */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 mb-10 border border-emerald-200">
            <div className="flex items-start gap-4">
              <span className="text-3xl">💰</span>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800 mb-1">Ready to Unlock Your Property Equity?</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Get free consultation from our loan specialists. Compare offers from 10+ banks.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white font-semibold transition-colors"
                >
                  Get Free Quote
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-white rounded-2xl p-6 mb-10 shadow-sm">
            <h2 className="font-semibold text-slate-800 mb-4">In This Guide</h2>
            <ul className="grid md:grid-cols-2 gap-2 text-slate-600">
              <li><a href="#what-is" className="hover:text-blue-600">What is Cash Out Refinancing?</a></li>
              <li><a href="#how-it-works" className="hover:text-blue-600">How Does It Work?</a></li>
              <li><a href="#limits" className="hover:text-blue-600">Cash Out Limits in Malaysia</a></li>
              <li><a href="#uses" className="hover:text-blue-600">What Can You Use Cash Out For?</a></li>
              <li><a href="#pros-cons" className="hover:text-blue-600">Pros and Cons</a></li>
              <li><a href="#comparison" className="hover:text-blue-600">Cash Out vs Personal Loan</a></li>
              <li><a href="#bnm-rules" className="hover:text-blue-600">Bank Negara Rules {currentYear}</a></li>
              <li><a href="#banks" className="hover:text-blue-600">Banks Offering Cash Out</a></li>
              <li><a href="#documents" className="hover:text-blue-600">Documents Required</a></li>
              <li><a href="#steps" className="hover:text-blue-600">Step-by-Step Application</a></li>
              <li><a href="#faq" className="hover:text-blue-600">FAQ</a></li>
            </ul>
          </div>

          {/* Content Sections */}
          <div className="space-y-10">
            {/* What is Cash Out Refinancing */}
            <section id="what-is" className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Cash Out Refinancing?</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Cash out refinancing allows you to borrow more than your outstanding loan amount by tapping into your property&apos;s equity. The difference between your new loan and old loan is given to you as cash.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
                <p className="font-semibold text-blue-800 mb-2">Example:</p>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• Current property value: RM500,000</li>
                  <li>• Outstanding loan: RM200,000</li>
                  <li>• Property equity: RM300,000</li>
                  <li>• Cash out amount: RM100,000</li>
                  <li>• <strong>New loan: RM300,000</strong></li>
                </ul>
                <p className="text-slate-600 text-sm mt-3">
                  You receive RM100,000 in cash while your monthly payment increases based on the larger loan.
                </p>
              </div>
            </section>

            {/* How Does It Work */}
            <section id="how-it-works" className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How Does Property Cash Out Work in Malaysia?</h2>
              <div className="space-y-4">
                {[
                  { step: 1, title: "Property Valuation", desc: "Bank assesses your property's current market value" },
                  { step: 2, title: "Calculate Equity", desc: "Equity = Property Value - Outstanding Loan" },
                  { step: 3, title: "Determine Cash Out Limit", desc: "Banks typically allow up to 80-90% LTV" },
                  { step: 4, title: "Apply for Refinancing", desc: "Submit application with cash out request" },
                  { step: 5, title: "Approval & Disbursement", desc: "Old loan settled, cash out deposited to your account" },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{item.title}</p>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm text-amber-800">
                  <strong>Timeline:</strong> Approximately 2-3 months from application to cash in hand.
                </p>
              </div>
            </section>

            {/* Cash Out Limits */}
            <section id="limits" className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Cash Out Refinance Limit in Malaysia</h2>
              <div className="overflow-x-auto my-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">LTV Limit</th>
                      <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Who Qualifies</th>
                      <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Max Cash Out</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-600">
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-medium">90% LTV</td>
                      <td className="border border-slate-200 px-4 py-3">First property, excellent credit</td>
                      <td className="border border-slate-200 px-4 py-3 text-emerald-600 font-medium">Higher</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-3 font-medium">85% LTV</td>
                      <td className="border border-slate-200 px-4 py-3">Most applicants</td>
                      <td className="border border-slate-200 px-4 py-3">Standard</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-medium">80% LTV</td>
                      <td className="border border-slate-200 px-4 py-3">Second property</td>
                      <td className="border border-slate-200 px-4 py-3">Lower</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-3 font-medium">70% LTV</td>
                      <td className="border border-slate-200 px-4 py-3">Third property onwards</td>
                      <td className="border border-slate-200 px-4 py-3 text-red-600">Lowest</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <p className="font-semibold text-emerald-800 mb-2">Example Calculation:</p>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• Property value: RM600,000</li>
                  <li>• Maximum LTV: 85% = RM510,000</li>
                  <li>• Outstanding loan: RM250,000</li>
                  <li>• <strong>Maximum cash out: RM510,000 - RM250,000 = RM260,000</strong></li>
                </ul>
              </div>
            </section>

            {/* What Can You Use It For */}
            <section id="uses" className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What Can You Use Cash Out For?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: "🏠", title: "Home Renovation", desc: "Upgrade your property to increase value" },
                  { icon: "💳", title: "Debt Consolidation", desc: "Pay off high-interest credit cards or personal loans (6-18% → 4%)" },
                  { icon: "📈", title: "Investment", desc: "Invest in stocks, unit trusts, or another property" },
                  { icon: "🎓", title: "Children's Education", desc: "Fund local or overseas education" },
                  { icon: "🏥", title: "Emergency Fund", desc: "Build financial safety net" },
                  { icon: "💼", title: "Business Capital", desc: "Start or expand a business" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3 p-4 bg-slate-50 rounded-xl">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-slate-800">{item.title}</p>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pros and Cons */}
            <section id="pros-cons" className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Cash Out Refinance: Pros and Cons</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 rounded-xl p-5">
                  <h3 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                    <span>✅</span> Pros
                  </h3>
                  <ul className="text-slate-600 text-sm space-y-2">
                    <li>• Lower interest rate than personal loan (3-5% vs 6-18%)</li>
                    <li>• Longer repayment tenure (up to 35 years)</li>
                    <li>• Large cash amount available (RM100k-500k+)</li>
                    <li>• Tax deductible if used for rental property improvements</li>
                    <li>• No need to sell property to access equity</li>
                  </ul>
                </div>
                <div className="bg-red-50 rounded-xl p-5">
                  <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <span>❌</span> Cons
                  </h3>
                  <ul className="text-slate-600 text-sm space-y-2">
                    <li>• Higher monthly payment (larger loan amount)</li>
                    <li>• More total interest over loan tenure</li>
                    <li>• Risk of negative equity if property value drops</li>
                    <li>• Longer time to fully own your property</li>
                    <li>• Refinancing costs apply (legal, valuation, stamp duty)</li>
                    <li>• 2-3 months processing time</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Comparison Table */}
            <section id="comparison" className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Cash Out Refinance vs Personal Loan vs Credit Card</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Factor</th>
                      <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Cash Out Refinance</th>
                      <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Personal Loan</th>
                      <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Credit Card</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-600">
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-medium">Interest Rate</td>
                      <td className="border border-slate-200 px-4 py-3 text-emerald-600 font-medium">3.5% - 5% p.a.</td>
                      <td className="border border-slate-200 px-4 py-3">6% - 12% p.a.</td>
                      <td className="border border-slate-200 px-4 py-3 text-red-600">15% - 18% p.a.</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-3 font-medium">Loan Tenure</td>
                      <td className="border border-slate-200 px-4 py-3">Up to 35 years</td>
                      <td className="border border-slate-200 px-4 py-3">1-7 years</td>
                      <td className="border border-slate-200 px-4 py-3">Revolving</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-medium">Max Amount</td>
                      <td className="border border-slate-200 px-4 py-3 text-emerald-600 font-medium">RM100k - RM500k+</td>
                      <td className="border border-slate-200 px-4 py-3">RM10k - RM150k</td>
                      <td className="border border-slate-200 px-4 py-3">RM5k - RM50k</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-3 font-medium">Monthly Payment</td>
                      <td className="border border-slate-200 px-4 py-3 text-emerald-600 font-medium">Lowest</td>
                      <td className="border border-slate-200 px-4 py-3">Medium</td>
                      <td className="border border-slate-200 px-4 py-3 text-red-600">Highest</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-medium">Processing Time</td>
                      <td className="border border-slate-200 px-4 py-3 text-red-600">2-3 months</td>
                      <td className="border border-slate-200 px-4 py-3">1-2 weeks</td>
                      <td className="border border-slate-200 px-4 py-3 text-emerald-600 font-medium">Instant</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-3 font-medium">Best For</td>
                      <td className="border border-slate-200 px-4 py-3">Large amounts, long-term</td>
                      <td className="border border-slate-200 px-4 py-3">Medium amounts</td>
                      <td className="border border-slate-200 px-4 py-3">Small, short-term</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* BNM Rules */}
            <section id="bnm-rules" className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Bank Negara Cash Out Rules {currentYear}</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <p className="font-semibold text-amber-800 mb-2">Important {currentYear} Update:</p>
                <p className="text-slate-600 text-sm mb-4">
                  Bank Negara Malaysia introduced new policies on cash out refinancing:
                </p>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li>• <strong>Maximum cash out tenure: 10 years</strong></li>
                  <li>• While your housing loan can be 30+ years, the cash out portion must be repaid within 10 years</li>
                  <li>• This affects your monthly payment calculation</li>
                  <li>• Check with your bank for the latest guidelines</li>
                </ul>
              </div>
            </section>

            {/* Banks Offering Cash Out */}
            <section id="banks" className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Banks Offering Cash Out Refinance in Malaysia</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Bank</th>
                      <th className="border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">Cash Out</th>
                      <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-600">
                    {[
                      { bank: "Maybank", notes: "Up to 85% LTV" },
                      { bank: "CIMB", notes: "Zero Moving Cost available" },
                      { bank: "Public Bank", notes: "Competitive rates" },
                      { bank: "RHB", notes: "My1 Home Loan" },
                      { bank: "Hong Leong", notes: "" },
                      { bank: "AmBank", notes: "" },
                      { bank: "Bank Islam", notes: "Shariah-compliant" },
                      { bank: "Standard Chartered", notes: "" },
                      { bank: "HSBC", notes: "HomeSmart" },
                    ].map((item, index) => (
                      <tr key={item.bank} className={index % 2 === 1 ? "bg-slate-50" : ""}>
                        <td className="border border-slate-200 px-4 py-3 font-medium">{item.bank}</td>
                        <td className="border border-slate-200 px-4 py-3 text-center text-emerald-600">✅ Yes</td>
                        <td className="border border-slate-200 px-4 py-3">{item.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Documents Required */}
            <section id="documents" className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Documents Required for Cash Out Refinance</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">Personal Documents</h3>
                  <ul className="space-y-2">
                    {[
                      "MyKad (IC) copy",
                      "Latest 3 months salary slips",
                      "Latest 6 months bank statements",
                      "Latest EPF statement",
                      "EA Form / Form B (tax)",
                    ].map((doc) => (
                      <li key={doc} className="flex items-center gap-2 text-slate-600 text-sm">
                        <span className="text-emerald-500">✓</span>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">Property Documents</h3>
                  <ul className="space-y-2">
                    {[
                      "Original Sale & Purchase Agreement",
                      "Land title / Strata title",
                      "Current loan statement",
                      "Property insurance policy",
                      "Latest property assessment (cukai tanah/pintu)",
                    ].map((doc) => (
                      <li key={doc} className="flex items-center gap-2 text-slate-600 text-sm">
                        <span className="text-emerald-500">✓</span>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Step-by-Step */}
            <section id="steps" className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Step-by-Step: How to Apply for Cash Out Refinance</h2>
              <div className="space-y-4">
                {[
                  { step: 1, title: "Check Your Equity", desc: "Use calculator above to estimate" },
                  { step: 2, title: "Compare Bank Rates", desc: "Use our Refinance Calculator" },
                  { step: 3, title: "Gather Documents", desc: "Prepare all required documents" },
                  { step: 4, title: "Submit Application", desc: "Apply to 2-3 banks for best offer" },
                  { step: 5, title: "Property Valuation", desc: "Bank will arrange valuation" },
                  { step: 6, title: "Loan Approval", desc: "Wait for approval (2-4 weeks)" },
                  { step: 7, title: "Legal Documentation", desc: "Sign loan agreement" },
                  { step: 8, title: "Disbursement", desc: "Receive cash out (2-4 weeks after signing)" },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{item.title}</p>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-800">
                  <strong>Total timeline:</strong> 8-12 weeks
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">FAQ - Cash Out Refinancing</h2>
              <div className="space-y-4">
                {[
                  { q: "What is the minimum cash out amount?", a: "Most banks require minimum RM30,000 - RM50,000 for cash out refinancing." },
                  { q: "Can I cash out if my property value has dropped?", a: "It will be difficult. If your property value is less than your outstanding loan (negative equity), cash out is not possible." },
                  { q: "Is cash out refinance tax deductible?", a: "Only if the cash out is used for income-generating purposes like rental property improvements. Personal use is not tax deductible." },
                  { q: "How long does cash out refinance take?", a: "About 2-3 months from application to disbursement." },
                  { q: "Can I do cash out on my second property?", a: "Yes, but LTV limits may be lower (typically 70-80% for second property)." },
                  { q: "What if I'm still in lock-in period?", a: "You can still refinance but will pay early settlement penalty (2-3% of outstanding)." },
                  { q: "Can foreigners apply for cash out refinance?", a: "Yes, but LTV is typically capped at 60-70% for non-Malaysians." },
                ].map((item) => (
                  <div key={item.q} className="bg-slate-50 rounded-xl p-5">
                    <p className="font-semibold text-slate-800 mb-2">Q: {item.q}</p>
                    <p className="text-slate-600 text-sm">A: {item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Related Resources */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Related Resources</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href="/property/refinance-housing-loan-calculator-malaysia/"
                  className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <span className="text-2xl">🧮</span>
                  <div>
                    <p className="font-semibold text-slate-800">Refinance Calculator</p>
                    <p className="text-sm text-slate-600">Compare refinance rates from 15+ banks</p>
                  </div>
                </Link>
                <Link
                  href="/property/quit-rent-calculator-selangor/"
                  className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <span className="text-2xl">📜</span>
                  <div>
                    <p className="font-semibold text-slate-800">Quit Rent Calculator</p>
                    <p className="text-sm text-slate-600">Calculate your annual quit rent</p>
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>

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

      {/* Lead Capture Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Get Your Free Cash Out Quote</h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSubmitSuccess(false);
                  }}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Thank you!</h4>
                  <p className="text-slate-600">
                    Our loan specialist will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="e.g. 012-3456789"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Property Value *</label>
                    <select
                      required
                      value={formData.propertyValue}
                      onChange={(e) => setFormData({ ...formData, propertyValue: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {PROPERTY_VALUE_RANGES.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Outstanding Loan *</label>
                    <select
                      required
                      value={formData.outstandingLoan}
                      onChange={(e) => setFormData({ ...formData, outstandingLoan: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {OUTSTANDING_LOAN_RANGES.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Cash Out Purpose *</label>
                    <select
                      required
                      value={formData.cashOutPurpose}
                      onChange={(e) => setFormData({ ...formData, cashOutPurpose: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {CASH_OUT_PURPOSES.map((purpose) => (
                        <option key={purpose} value={purpose}>{purpose}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 rounded-xl text-white font-semibold transition-all"
                  >
                    {isSubmitting ? "Submitting..." : "Get My Free Quote"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
