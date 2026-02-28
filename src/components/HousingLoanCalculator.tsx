"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

const DOWN_PAYMENT_OPTIONS = [
  { label: "10% (First Property)", value: 10 },
  { label: "20%", value: 20 },
  { label: "30% (Second Property)", value: 30 },
  { label: "40% (Third Property+)", value: 40 },
];

const LOAN_TENURE_OPTIONS = [
  { label: "35 years", value: 35 },
  { label: "30 years", value: 30 },
  { label: "25 years", value: 25 },
  { label: "20 years", value: 20 },
];

export default function HousingLoanCalculator() {
  const currentYear = new Date().getFullYear();
  const [propertyPrice, setPropertyPrice] = useState(500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(10);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTenure, setLoanTenure] = useState(30);
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(true);

  // Lead capture modal state
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Calculate monthly instalment using PMT formula
  const calculateMonthlyInstalment = (principal: number, rate: number, years: number) => {
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;
    if (monthlyRate === 0) return principal / numberOfPayments;
    return (
      principal *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    );
  };

  // Calculate stamp duty for MOT (Memorandum of Transfer)
  const calculateMOTStampDuty = (price: number) => {
    let stampDuty = 0;
    if (price <= 100000) {
      stampDuty = price * 0.01;
    } else if (price <= 500000) {
      stampDuty = 1000 + (price - 100000) * 0.02;
    } else if (price <= 1000000) {
      stampDuty = 1000 + 8000 + (price - 500000) * 0.03;
    } else {
      stampDuty = 1000 + 8000 + 15000 + (price - 1000000) * 0.04;
    }
    return stampDuty;
  };

  // Calculate legal fees based on Solicitors Remuneration Order 2023
  const calculateLegalFees = (amount: number) => {
    let fees = 0;
    if (amount <= 500000) {
      fees = amount * 0.0125; // 1.25%
    } else if (amount <= 1000000) {
      fees = 6250 + (amount - 500000) * 0.01; // 1%
    } else if (amount <= 3000000) {
      fees = 6250 + 5000 + (amount - 1000000) * 0.008; // 0.8%
    } else if (amount <= 5000000) {
      fees = 6250 + 5000 + 16000 + (amount - 3000000) * 0.007; // 0.7%
    } else if (amount <= 7500000) {
      fees = 6250 + 5000 + 16000 + 14000 + (amount - 5000000) * 0.006; // 0.6%
    } else {
      fees = 6250 + 5000 + 16000 + 14000 + 15000 + (amount - 7500000) * 0.005; // 0.5%
    }
    return Math.max(fees, 500); // Minimum fee
  };

  const calculation = useMemo(() => {
    const downPaymentAmount = propertyPrice * (downPaymentPercent / 100);
    const loanAmount = propertyPrice - downPaymentAmount;

    // Main calculation
    const monthlyInstalment = calculateMonthlyInstalment(loanAmount, interestRate, loanTenure);
    const totalRepayment = monthlyInstalment * loanTenure * 12;
    const totalInterest = totalRepayment - loanAmount;

    // Tenure comparison
    const tenureComparison = [20, 25, 30, 35].map((years) => {
      const monthly = calculateMonthlyInstalment(loanAmount, interestRate, years);
      const total = monthly * years * 12;
      const interest = total - loanAmount;
      return {
        years,
        monthly,
        totalInterest: interest,
        totalRepayment: total,
      };
    });

    // Upfront costs calculation
    const motStampDuty = calculateMOTStampDuty(propertyPrice);
    const loanStampDuty = loanAmount * 0.005; // 0.5% of loan amount
    const spaLegalFees = calculateLegalFees(propertyPrice);
    const loanLegalFees = calculateLegalFees(loanAmount);
    const valuationFee = 300;

    // First-time buyer exemptions (for properties ≤RM500,000)
    const eligibleForExemption = isFirstTimeBuyer && propertyPrice <= 500000;
    const motStampDutyFinal = eligibleForExemption ? 0 : motStampDuty;
    const loanStampDutyFinal = eligibleForExemption ? 0 : loanStampDuty;
    const stampDutySavings = eligibleForExemption ? motStampDuty + loanStampDuty : 0;

    const totalUpfrontCost =
      downPaymentAmount +
      motStampDutyFinal +
      loanStampDutyFinal +
      spaLegalFees +
      loanLegalFees +
      valuationFee;

    return {
      downPaymentAmount,
      loanAmount,
      monthlyInstalment,
      totalRepayment,
      totalInterest,
      tenureComparison,
      motStampDuty,
      motStampDutyFinal,
      loanStampDuty,
      loanStampDutyFinal,
      spaLegalFees,
      loanLegalFees,
      valuationFee,
      totalUpfrontCost,
      eligibleForExemption,
      stampDutySavings,
    };
  }, [propertyPrice, downPaymentPercent, interestRate, loanTenure, isFirstTimeBuyer]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      timestamp: new Date().toISOString(),
      name: leadFormData.name,
      whatsapp: leadFormData.whatsapp,
      email: leadFormData.email,
      calculator_type: "housing_loan",
      property_price: propertyPrice,
      down_payment: Math.round(calculation.downPaymentAmount),
      loan_amount: Math.round(calculation.loanAmount),
      interest_rate: interestRate,
      tenure_years: loanTenure,
      monthly_instalment: Math.round(calculation.monthlyInstalment),
      first_time_buyer: isFirstTimeBuyer ? "yes" : "no",
      source_url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setLeadFormData({ name: "", whatsapp: "", email: "" });
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowLeadModal(false);
    setSubmitSuccess(false);
    setSubmitError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-10 md:py-14">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">💰 Loan Calculator</div>
          <div className="text-5xl md:text-6xl mb-4">🏡</div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Housing Loan Calculator Malaysia {currentYear}</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">Calculate monthly instalment, total interest, and upfront costs</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
              {/* Property Price */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Property Price (RM)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={propertyPrice}
                    onChange={(e) =>
                      setPropertyPrice(Math.max(50000, Math.min(5000000, Number(e.target.value))))
                    }
                    min={50000}
                    max={5000000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    min={100000}
                    max={2000000}
                    step={10000}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>RM 100,000</span>
                    <span>RM 2,000,000</span>
                  </div>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Down Payment
                </label>
                <select
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {DOWN_PAYMENT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-2">
                  Down payment: {formatCurrency(calculation.downPaymentAmount)}
                </p>
              </div>

              {/* Loan Amount (Auto-calculated) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Loan Amount (Auto-calculated)
                </label>
                <div className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 font-semibold">
                  {formatCurrency(calculation.loanAmount)}
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Interest Rate (% p.a.)
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) =>
                        setInterestRate(Math.max(2, Math.min(10, Number(e.target.value))))
                      }
                      min={2}
                      max={10}
                      step={0.1}
                      className="w-24 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <span className="text-slate-500">% per year</span>
                  </div>
                  <input
                    type="range"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    min={3}
                    max={5.5}
                    step={0.1}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>3%</span>
                    <span>5.5%</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Current market rate: 4.0% - 4.8% p.a.
                </p>
              </div>

              {/* Loan Tenure */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Loan Tenure
                </label>
                <select
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {LOAN_TENURE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* First Time Buyer */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="firstTimeBuyer"
                  checked={isFirstTimeBuyer}
                  onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="firstTimeBuyer" className="text-sm text-slate-700 cursor-pointer">
                  First-time home buyer
                </label>
              </div>

              {/* Exemption Info */}
              {isFirstTimeBuyer && (
                <div
                  className={`rounded-xl p-4 ${
                    calculation.eligibleForExemption
                      ? "bg-emerald-50 border border-emerald-200"
                      : "bg-blue-50 border border-blue-100"
                  }`}
                >
                  {calculation.eligibleForExemption ? (
                    <p className="text-sm text-emerald-800">
                      <strong>Congratulations!</strong> You qualify for stamp duty exemption.
                      You&apos;ll save {formatCurrency(calculation.stampDutySavings)} on stamp
                      duties.
                    </p>
                  ) : (
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Stamp duty exemption only applies to properties
                      ≤RM500,000. Your property price of {formatCurrency(propertyPrice)} does not
                      qualify for exemption.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Result Card - Right Side */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">
                  Your Loan Calculation
                </h2>

                {/* Main Results */}
                <div className="text-center py-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mb-4">
                  <p className="text-sm text-slate-500 mb-1">Monthly Instalment</p>
                  <p className="text-4xl font-bold text-blue-600">
                    {formatCurrency(calculation.monthlyInstalment)}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    for {loanTenure} years at {interestRate}% p.a.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Loan Amount</p>
                    <p className="text-lg font-bold text-slate-700">
                      {formatCurrency(calculation.loanAmount)}
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Total Interest</p>
                    <p className="text-lg font-bold text-red-600">
                      {formatCurrency(calculation.totalInterest)}
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-xl p-4 text-center mb-4">
                  <p className="text-xs text-slate-500 mb-1">Total Repayment (Principal + Interest)</p>
                  <p className="text-xl font-bold text-indigo-700">
                    {formatCurrency(calculation.totalRepayment)}
                  </p>
                </div>

                {/* Tenure Comparison Table */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-slate-600 mb-3">
                    Tenure Comparison
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-slate-500">
                          <th className="text-left py-2 font-medium">Tenure</th>
                          <th className="text-right py-2 font-medium">Monthly</th>
                          <th className="text-right py-2 font-medium">Total Interest</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-700">
                        {calculation.tenureComparison.map((row) => (
                          <tr
                            key={row.years}
                            className={
                              row.years === loanTenure
                                ? "bg-blue-100 font-semibold"
                                : "border-t border-slate-200"
                            }
                          >
                            <td className="py-2">{row.years} years</td>
                            <td className="text-right py-2">{formatCurrency(row.monthly)}</td>
                            <td className="text-right py-2">{formatCurrency(row.totalInterest)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate-400 mt-3">
                    Shorter tenure = higher monthly payment but less total interest
                  </p>
                </div>

                {/* Upfront Costs Breakdown */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-slate-600 mb-3">
                    Upfront Costs Breakdown
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">
                        Down Payment ({downPaymentPercent}%)
                      </span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.downPaymentAmount)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">
                        Stamp Duty (MOT)
                        {calculation.eligibleForExemption && (
                          <span className="text-emerald-600 ml-1">(Exempted)</span>
                        )}
                      </span>
                      <span
                        className={`font-medium ${
                          calculation.eligibleForExemption
                            ? "text-emerald-600 line-through"
                            : "text-slate-700"
                        }`}
                      >
                        {formatCurrency(calculation.motStampDuty)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">
                        Stamp Duty (Loan)
                        {calculation.eligibleForExemption && (
                          <span className="text-emerald-600 ml-1">(Exempted)</span>
                        )}
                      </span>
                      <span
                        className={`font-medium ${
                          calculation.eligibleForExemption
                            ? "text-emerald-600 line-through"
                            : "text-slate-700"
                        }`}
                      >
                        {formatCurrency(calculation.loanStampDuty)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Legal Fees (SPA)</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.spaLegalFees)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Legal Fees (Loan)</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.loanLegalFees)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Valuation Fee</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.valuationFee)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm pt-3 border-t border-slate-200">
                      <span className="text-slate-700 font-semibold">Total Upfront Cash</span>
                      <span className="text-red-600 font-bold">
                        {formatCurrency(calculation.totalUpfrontCost)}
                      </span>
                    </div>

                    {calculation.eligibleForExemption && (
                      <div className="flex justify-between text-sm pt-2">
                        <span className="text-emerald-600 font-medium">Your Savings</span>
                        <span className="text-emerald-600 font-bold">
                          -{formatCurrency(calculation.stampDutySavings)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Loan Tools */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🏠</span>
                  <h3 className="font-semibold text-slate-800">Next Steps</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Talk to Expert Box */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl">👨‍💼</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">Talk to Loan Expert</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Get personalized rates from multiple banks. Free consultation.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowLeadModal(true)}
                      className="block w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium text-center hover:bg-blue-700 transition-all mt-auto"
                    >
                      Get Free Quote
                    </button>
                  </div>

                  {/* Check Eligibility Box */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl">✅</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">Check Eligibility</p>
                        <p className="text-xs text-slate-500 mt-1">
                          See how much loan you can get based on your income
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/loan/home-loan-eligibility-calculator-malaysia/"
                      className="block w-full py-2.5 px-4 rounded-lg bg-teal-600 text-white text-sm font-medium text-center hover:bg-teal-700 transition-all mt-auto"
                    >
                      Eligibility Calculator
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {!submitSuccess ? (
              <>
                <div className="text-center mb-6">
                  <span className="text-4xl">🏠</span>
                  <h3 className="text-xl font-bold text-slate-800 mt-3">
                    Get Your Best Loan Rate
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Our specialist will contact you within 24 hours
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={leadFormData.name}
                      onChange={(e) =>
                        setLeadFormData({ ...leadFormData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={leadFormData.whatsapp}
                      onChange={(e) =>
                        setLeadFormData({ ...leadFormData, whatsapp: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g. 0123456789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={leadFormData.email}
                      onChange={(e) =>
                        setLeadFormData({ ...leadFormData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Pre-filled Loan Info */}
                  <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                    <p className="text-xs font-medium text-slate-600 mb-2">
                      Your Loan Details (Pre-filled)
                    </p>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Property Price:</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(propertyPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Loan Amount:</span>
                      <span className="text-blue-600 font-medium">
                        {formatCurrency(calculation.loanAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Monthly Instalment:</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.monthlyInstalment)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Tenure:</span>
                      <span className="text-slate-700 font-medium">{loanTenure} years</span>
                    </div>
                  </div>

                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Get Free Quote"}
                  </button>

                  <p className="text-xs text-slate-400 text-center">
                    By submitting, you agree to be contacted by our loan specialist.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <span className="text-5xl">✅</span>
                <h3 className="text-xl font-bold text-slate-800 mt-4">Thank You!</h3>
                <p className="text-slate-600 mt-2">
                  Our loan specialist will WhatsApp you within 24 hours.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-6 py-2.5 px-6 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-all"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
