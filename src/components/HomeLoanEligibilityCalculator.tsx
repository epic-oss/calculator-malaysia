"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

const PROPERTY_TYPES = [
  { label: "First Property", value: "first", maxFinancing: 0.9 },
  { label: "Second Property", value: "second", maxFinancing: 0.7 },
  { label: "Third Property or More", value: "third", maxFinancing: 0.6 },
];

const LOAN_TENURES = [
  { label: "30 years", value: 30 },
  { label: "35 years", value: 35 },
  { label: "25 years", value: 25 },
  { label: "20 years", value: 20 },
  { label: "15 years", value: 15 },
  { label: "10 years", value: 10 },
];

export default function HomeLoanEligibilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(8000);
  const [spouseIncome, setSpouseIncome] = useState(0);
  const [existingCommitments, setExistingCommitments] = useState(1500);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTenure, setLoanTenure] = useState(30);
  const [propertyType, setPropertyType] = useState("first");

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

  const calculation = useMemo(() => {
    const totalIncome = monthlyIncome + spouseIncome;
    const selectedProperty = PROPERTY_TYPES.find((p) => p.value === propertyType) || PROPERTY_TYPES[0];
    const maxFinancingRate = selectedProperty.maxFinancing;

    // Bank's maximum DSR threshold (typically 60-70%, we use 60% for conservative estimate)
    const maxDSR = 0.6;

    // Maximum monthly instalment allowed
    const maxMonthlyInstalment = totalIncome * maxDSR - existingCommitments;
    const effectiveMaxInstalment = Math.max(0, maxMonthlyInstalment);

    // Calculate maximum loan amount based on monthly instalment
    // PMT formula reversed: PV = PMT * [(1 - (1 + r)^-n) / r]
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTenure * 12;

    let maxLoanAmount = 0;
    if (monthlyRate > 0 && effectiveMaxInstalment > 0) {
      maxLoanAmount =
        effectiveMaxInstalment *
        ((1 - Math.pow(1 + monthlyRate, -numberOfPayments)) / monthlyRate);
    }

    // Maximum property price based on margin of finance
    const maxPropertyPrice = maxLoanAmount / maxFinancingRate;

    // Down payment required
    const downPaymentRate = 1 - maxFinancingRate;
    const downPaymentRequired = maxPropertyPrice * downPaymentRate;

    // Current DSR calculation (with existing commitments only)
    const currentDSR = (existingCommitments / totalIncome) * 100;

    // DSR after proposed loan
    const proposedDSR = ((existingCommitments + effectiveMaxInstalment) / totalIncome) * 100;

    // Eligibility status
    let eligibilityStatus: "eligible" | "borderline" | "not-eligible";
    let eligibilityMessage: string;

    if (currentDSR >= 60) {
      eligibilityStatus = "not-eligible";
      eligibilityMessage = "Your current DSR is too high. Pay down existing debts first.";
    } else if (effectiveMaxInstalment <= 0) {
      eligibilityStatus = "not-eligible";
      eligibilityMessage = "Your existing commitments exceed the maximum DSR threshold.";
    } else if (currentDSR >= 50) {
      eligibilityStatus = "borderline";
      eligibilityMessage = "Your DSR is borderline. Consider reducing debts for better approval chances.";
    } else {
      eligibilityStatus = "eligible";
      eligibilityMessage = "You have good loan eligibility. Start house hunting!";
    }

    // Stamp duty estimation (based on Malaysian rates)
    let stampDuty = 0;
    if (maxPropertyPrice > 0) {
      if (maxPropertyPrice <= 100000) {
        stampDuty = maxPropertyPrice * 0.01;
      } else if (maxPropertyPrice <= 500000) {
        stampDuty = 1000 + (maxPropertyPrice - 100000) * 0.02;
      } else if (maxPropertyPrice <= 1000000) {
        stampDuty = 1000 + 8000 + (maxPropertyPrice - 500000) * 0.03;
      } else {
        stampDuty = 1000 + 8000 + 15000 + (maxPropertyPrice - 1000000) * 0.04;
      }
    }

    // Legal fees estimation (simplified)
    let legalFees = 0;
    if (maxPropertyPrice > 0) {
      if (maxPropertyPrice <= 500000) {
        legalFees = maxPropertyPrice * 0.01;
      } else if (maxPropertyPrice <= 7500000) {
        legalFees = 5000 + (maxPropertyPrice - 500000) * 0.008;
      } else {
        legalFees = 5000 + 56000 + (maxPropertyPrice - 7500000) * 0.005;
      }
      legalFees = Math.max(legalFees, 500); // Minimum legal fee
    }

    return {
      totalIncome,
      maxMonthlyInstalment: effectiveMaxInstalment,
      maxLoanAmount,
      maxPropertyPrice,
      downPaymentRequired,
      downPaymentRate,
      maxFinancingRate,
      currentDSR,
      proposedDSR,
      eligibilityStatus,
      eligibilityMessage,
      stampDuty,
      legalFees,
      totalUpfrontCost: downPaymentRequired + stampDuty + legalFees,
    };
  }, [monthlyIncome, spouseIncome, existingCommitments, interestRate, loanTenure, propertyType]);

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
      calculator_type: "home_loan_eligibility",
      monthly_income: monthlyIncome,
      spouse_income: spouseIncome,
      total_income: calculation.totalIncome,
      existing_commitments: existingCommitments,
      max_loan_amount: Math.round(calculation.maxLoanAmount),
      max_property_price: Math.round(calculation.maxPropertyPrice),
      max_monthly_instalment: Math.round(calculation.maxMonthlyInstalment),
      current_dsr: calculation.currentDSR.toFixed(1),
      eligibility_status: calculation.eligibilityStatus,
      loan_tenure: loanTenure,
      interest_rate: interestRate,
      property_type: propertyType,
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

  // DSR visual indicator
  const getDSRColor = (dsr: number) => {
    if (dsr < 40) return "text-emerald-600";
    if (dsr < 50) return "text-amber-600";
    return "text-red-600";
  };

  const getDSRBarColor = (dsr: number) => {
    if (dsr < 40) return "bg-emerald-500";
    if (dsr < 50) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Home Loan Eligibility Calculator Malaysia
        </h1>
        <p className="text-center text-slate-500 mb-8">
          Check how much housing loan you qualify for based on DSR
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
              {/* Monthly Gross Income */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Monthly Gross Income (RM)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Math.max(0, Math.min(100000, Number(e.target.value))))}
                    min={0}
                    max={100000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    min={3000}
                    max={50000}
                    step={500}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>RM 3,000</span>
                    <span>RM 50,000</span>
                  </div>
                </div>
              </div>

              {/* Spouse/Co-Borrower Income */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Spouse/Co-Borrower Income (RM)
                  <span className="text-slate-400 font-normal ml-1">(Optional)</span>
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={spouseIncome}
                    onChange={(e) => setSpouseIncome(Math.max(0, Math.min(100000, Number(e.target.value))))}
                    min={0}
                    max={100000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={spouseIncome}
                    onChange={(e) => setSpouseIncome(Number(e.target.value))}
                    min={0}
                    max={30000}
                    step={500}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>RM 0</span>
                    <span>RM 30,000</span>
                  </div>
                </div>
              </div>

              {/* Existing Monthly Commitments */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Existing Monthly Commitments (RM)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={existingCommitments}
                    onChange={(e) => setExistingCommitments(Math.max(0, Math.min(50000, Number(e.target.value))))}
                    min={0}
                    max={50000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={existingCommitments}
                    onChange={(e) => setExistingCommitments(Number(e.target.value))}
                    min={0}
                    max={20000}
                    step={100}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>RM 0</span>
                    <span>RM 20,000</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Include: car loan, personal loan, credit card min payment, PTPTN
                </p>
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
                      onChange={(e) => setInterestRate(Math.max(2, Math.min(10, Number(e.target.value))))}
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
                    max={6}
                    step={0.1}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>3%</span>
                    <span>6%</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Current market rate: 4.0% - 5.0% p.a.
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
                  {LOAN_TENURES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-2">
                  Max tenure: 35 years or until age 70 (whichever comes first)
                </p>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {PROPERTY_TYPES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} (up to {option.maxFinancing * 100}% financing)
                    </option>
                  ))}
                </select>
              </div>

              {/* Info Card */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This calculator provides an estimate based on 60% DSR.
                  Actual approval depends on your credit score, employment history, and bank policies.
                </p>
              </div>
            </div>
          </div>

          {/* Result Card - Right Side */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">
                  Your Loan Eligibility
                </h2>

                {/* Eligibility Status */}
                <div
                  className={`p-4 rounded-xl mb-4 ${
                    calculation.eligibilityStatus === "eligible"
                      ? "bg-emerald-50 border border-emerald-200"
                      : calculation.eligibilityStatus === "borderline"
                      ? "bg-amber-50 border border-amber-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">
                      {calculation.eligibilityStatus === "eligible"
                        ? "✅"
                        : calculation.eligibilityStatus === "borderline"
                        ? "⚠️"
                        : "❌"}
                    </div>
                    <div>
                      <p
                        className={`font-semibold ${
                          calculation.eligibilityStatus === "eligible"
                            ? "text-emerald-800"
                            : calculation.eligibilityStatus === "borderline"
                            ? "text-amber-800"
                            : "text-red-800"
                        }`}
                      >
                        {calculation.eligibilityStatus === "eligible"
                          ? "Eligible for Home Loan"
                          : calculation.eligibilityStatus === "borderline"
                          ? "Borderline Eligibility"
                          : "Not Eligible"}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        {calculation.eligibilityMessage}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Main Results */}
                <div className="text-center py-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mb-4">
                  <p className="text-sm text-slate-500 mb-1">Maximum Loan Amount</p>
                  <p className="text-4xl font-bold text-blue-600">
                    {formatCurrency(calculation.maxLoanAmount)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-emerald-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Max Property Price</p>
                    <p className="text-xl font-bold text-emerald-700">
                      {formatCurrency(calculation.maxPropertyPrice)}
                    </p>
                    <p className="text-xs text-slate-400">
                      at {calculation.maxFinancingRate * 100}% financing
                    </p>
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Monthly Instalment</p>
                    <p className="text-xl font-bold text-indigo-700">
                      {formatCurrency(calculation.maxMonthlyInstalment)}
                    </p>
                    <p className="text-xs text-slate-400">maximum affordable</p>
                  </div>
                </div>

                {/* DSR Breakdown */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-slate-600 mb-3">
                    Debt Service Ratio (DSR)
                  </p>

                  {/* Current DSR */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">Current DSR</span>
                      <span className={`font-semibold ${getDSRColor(calculation.currentDSR)}`}>
                        {calculation.currentDSR.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${getDSRBarColor(calculation.currentDSR)}`}
                        style={{ width: `${Math.min(calculation.currentDSR, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* After Loan DSR */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">After Loan DSR</span>
                      <span className={`font-semibold ${getDSRColor(calculation.proposedDSR)}`}>
                        {calculation.proposedDSR.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${getDSRBarColor(calculation.proposedDSR)}`}
                        style={{ width: `${Math.min(calculation.proposedDSR, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200">
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-500">&lt;40% Good</span>
                    <div className="h-3 w-3 rounded-full bg-amber-500 ml-2" />
                    <span className="text-xs text-slate-500">40-50% Fair</span>
                    <div className="h-3 w-3 rounded-full bg-red-500 ml-2" />
                    <span className="text-xs text-slate-500">&gt;50% High</span>
                  </div>
                </div>

                {/* Income & Commitments Breakdown */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-slate-600 mb-3">Income & Commitments</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Your Income</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(monthlyIncome)}
                      </span>
                    </div>
                    {spouseIncome > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Spouse Income</span>
                        <span className="text-slate-700 font-medium">
                          {formatCurrency(spouseIncome)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                      <span className="text-slate-700 font-semibold">Total Income</span>
                      <span className="text-blue-600 font-bold">
                        {formatCurrency(calculation.totalIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                      <span className="text-slate-500">Existing Commitments</span>
                      <span className="text-red-600 font-medium">
                        - {formatCurrency(existingCommitments)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Max 60% DSR Allowance</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.totalIncome * 0.6)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                      <span className="text-slate-700 font-semibold">Available for Loan</span>
                      <span className="text-emerald-600 font-bold">
                        {formatCurrency(calculation.maxMonthlyInstalment)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Upfront Costs */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-slate-600 mb-3">Estimated Upfront Costs</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">
                        Down Payment ({(calculation.downPaymentRate * 100).toFixed(0)}%)
                      </span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.downPaymentRequired)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Stamp Duty (Est.)</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.stampDuty)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Legal Fees (Est.)</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.legalFees)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                      <span className="text-slate-700 font-semibold">Total Upfront</span>
                      <span className="text-red-600 font-bold">
                        {formatCurrency(calculation.totalUpfrontCost)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Home Loan Tools */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🏠</span>
                  <h3 className="font-semibold text-slate-800">Home Loan Tools</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Get Pre-Approved Box */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl">📋</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">Get Pre-Approved</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Speak to a loan specialist. Get personalized rates from multiple banks.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowLeadModal(true)}
                      className="block w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium text-center hover:bg-blue-700 transition-all mt-auto"
                    >
                      Talk to Specialist
                    </button>
                  </div>

                  {/* Housing Loan Calculator Box */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl">🧮</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">Calculate Instalment</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Know the exact monthly payment for any property price
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/loan/housing-loan-calculator/"
                      className="block w-full py-2.5 px-4 rounded-lg bg-teal-600 text-white text-sm font-medium text-center hover:bg-teal-700 transition-all mt-auto"
                    >
                      Loan Calculator
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
                    Get Your Home Loan Pre-Approved
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
                      Your Eligibility (Pre-filled)
                    </p>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Total Income:</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.totalIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Max Loan Amount:</span>
                      <span className="text-blue-600 font-medium">
                        {formatCurrency(calculation.maxLoanAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Max Property Price:</span>
                      <span className="text-emerald-600 font-medium">
                        {formatCurrency(calculation.maxPropertyPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Current DSR:</span>
                      <span className="text-slate-700 font-medium">
                        {calculation.currentDSR.toFixed(1)}%
                      </span>
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
                    {isSubmitting ? "Submitting..." : "Get Pre-Approved"}
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
