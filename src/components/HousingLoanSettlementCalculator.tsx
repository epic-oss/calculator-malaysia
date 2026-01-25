"use client";

import { useState, useMemo, useEffect, useCallback } from "react";

const TENURE_OPTIONS = [5, 10, 15, 20, 25, 30, 35];
const LOCKIN_OPTIONS = [0, 3, 5];

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

interface CapturedCalculation {
  loanAmount: number;
  outstanding: number;
  settlementAmount: number;
  potentialSavings: number;
  interestRate: number;
  yearsRemaining: number;
  monthlyPayment: number;
  yearsPaid: number;
}

export default function HousingLoanSettlementCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(4);
  const [originalTenure, setOriginalTenure] = useState(30);
  const [yearsPaid, setYearsPaid] = useState(5);
  const [penaltyPercentage, setPenaltyPercentage] = useState(2);
  const [lockInPeriod, setLockInPeriod] = useState(3);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [exitPopupShown, setExitPopupShown] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(true);
  const [ctaSource, setCtaSource] = useState<"sticky_bar" | "results_card">("results_card");
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "+60",
  });
  const [exitFormData, setExitFormData] = useState({
    whatsapp: "+60",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });
  const [capturedCalc, setCapturedCalc] = useState<CapturedCalculation | null>(null);

  const calculation = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = originalTenure * 12;
    const monthsPaid = yearsPaid * 12;
    const remainingMonths = totalMonths - monthsPaid;

    // Monthly payment calculation
    const monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    // Outstanding balance calculation
    const outstandingBalance =
      (loanAmount *
        (Math.pow(1 + monthlyRate, totalMonths) -
          Math.pow(1 + monthlyRate, monthsPaid))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    // Total remaining payments if continue
    const totalRemainingPayments = monthlyPayment * remainingMonths;

    // Interest saved if settle now
    const interestSavedIfSettle = totalRemainingPayments - outstandingBalance;

    // Penalty fee (only if within lock-in period)
    const penaltyFee =
      yearsPaid < lockInPeriod
        ? outstandingBalance * (penaltyPercentage / 100)
        : 0;

    // Total settlement amount
    const settlementAmount = outstandingBalance + penaltyFee;

    // Net savings
    const netSavings = interestSavedIfSettle - penaltyFee;

    // Total paid so far
    const totalPaidSoFar = monthlyPayment * monthsPaid;

    // Total interest if continue paying
    const totalInterestIfContinue =
      totalRemainingPayments - outstandingBalance;

    // Recommendation
    let recommendation: "recommended" | "marginal" | "not-recommended";
    if (netSavings > 0 && netSavings > outstandingBalance * 0.05) {
      recommendation = "recommended";
    } else if (netSavings > 0) {
      recommendation = "marginal";
    } else {
      recommendation = "not-recommended";
    }

    return {
      monthlyPayment,
      outstandingBalance,
      totalRemainingPayments,
      interestSavedIfSettle,
      penaltyFee,
      settlementAmount,
      netSavings,
      totalPaidSoFar,
      totalInterestIfContinue,
      remainingMonths,
      monthsPaid,
      recommendation,
      isWithinLockIn: yearsPaid < lockInPeriod,
    };
  }, [
    loanAmount,
    interestRate,
    originalTenure,
    yearsPaid,
    penaltyPercentage,
    lockInPeriod,
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  const openModal = (source: "sticky_bar" | "results_card" = "results_card") => {
    setCtaSource(source);
    // Capture calculator values BEFORE opening modal
    setCapturedCalc({
      loanAmount,
      outstanding: Math.round(calculation.outstandingBalance),
      settlementAmount: Math.round(calculation.settlementAmount),
      potentialSavings: Math.round(calculation.netSavings),
      interestRate,
      yearsRemaining: Math.round(calculation.remainingMonths / 12),
      monthlyPayment: Math.round(calculation.monthlyPayment),
      yearsPaid,
    });
    setShowModal(true);
  };

  // Track user interaction (any input change)
  const handleInputChange = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  }, [hasInteracted]);

  // Exit intent detection (desktop only)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger on exit through top of page
      if (e.clientY <= 0 && !exitPopupShown && !showModal && calculation.netSavings > 50000) {
        setShowExitPopup(true);
        setExitPopupShown(true);
      }
    };

    // Only add listener on desktop
    if (typeof window !== "undefined" && window.innerWidth > 768) {
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [exitPopupShown, showModal, calculation.netSavings]);

  const handleExitFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadData = {
      timestamp: new Date().toISOString(),
      name: "Exit Intent Lead",
      whatsapp: exitFormData.whatsapp,
      calculator_type: "early_settlement_calculator",
      source: "exit_intent_popup",
      loan_amount: loanAmount,
      outstanding: Math.round(calculation.outstandingBalance),
      settlement_amount: Math.round(calculation.settlementAmount),
      savings_amount: Math.round(calculation.netSavings),
      interest_rate: interestRate,
      years_remaining: Math.round(calculation.remainingMonths / 12),
      monthly_payment: Math.round(calculation.monthlyPayment),
      years_paid: yearsPaid,
      source_url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        setShowExitPopup(false);
        showToast("success", "Terima kasih! Kami akan hubungi anda dalam 24 jam");
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("error", "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!capturedCalc) {
      showToast("error", "Something went wrong. Please try again.");
      setIsSubmitting(false);
      return;
    }

    const deviceType = typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop";
    const leadData = {
      timestamp: new Date().toISOString(),
      name: formData.fullName,
      whatsapp: formData.whatsapp,
      calculator_type: "early_settlement_calculator",
      source: "main_form",
      loan_amount: capturedCalc.loanAmount,
      outstanding_balance: capturedCalc.outstanding,
      settlement_amount: capturedCalc.settlementAmount,
      total_savings: capturedCalc.potentialSavings,
      interest_rate: capturedCalc.interestRate,
      years_remaining: capturedCalc.yearsRemaining,
      monthly_payment: capturedCalc.monthlyPayment,
      years_paid: capturedCalc.yearsPaid,
      source_url: typeof window !== "undefined" ? window.location.href : "",
      device_type: deviceType,
      cta_source: ctaSource,
      referrer: typeof document !== "undefined" ? document.referrer : "",
      landing_page: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      console.log("Lead captured:", leadData);

      if (response.ok) {
        closeModal();
        showToast("success", "Thanks! Our loan expert will WhatsApp you within 24 hours");
      } else {
        console.error("Webhook error:", response.status, response.statusText);
        showToast("error", "Something went wrong. Please try again or WhatsApp us at 012-345-6789");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("error", "Something went wrong. Please try again or WhatsApp us at 012-345-6789");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormSubmitted(false);
    setFormData({ fullName: "", whatsapp: "+60" });
    setCapturedCalc(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🏠</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              Housing Loan
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Early Housing Loan Settlement Calculator
          </h1>
          <p className="text-green-100 text-lg max-w-2xl">
            Find out if settling your housing loan early makes financial sense.
            Calculate potential savings, penalties, and get a clear
            recommendation.
          </p>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
              {/* Original Loan Amount */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Original Loan Amount (RM)
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={loanAmount.toLocaleString("en-MY")}
                    onChange={(e) => {
                      handleInputChange();
                      const value = parseInt(e.target.value.replace(/,/g, ""));
                      if (!isNaN(value) && value >= 50000 && value <= 2000000) {
                        setLoanAmount(value);
                      }
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    min="50000"
                    max="2000000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => {
                      handleInputChange();
                      setLoanAmount(parseInt(e.target.value));
                    }}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>RM50,000</span>
                    <span>RM2,000,000</span>
                  </div>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Interest Rate (% per annum)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => {
                      handleInputChange();
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value) && value >= 2.5 && value <= 7) {
                        setInterestRate(value);
                      }
                    }}
                    step="0.1"
                    min="2.5"
                    max="7"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    min="2.5"
                    max="7"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => {
                      handleInputChange();
                      setInterestRate(parseFloat(e.target.value));
                    }}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>2.5%</span>
                    <span>7%</span>
                  </div>
                </div>
              </div>

              {/* Original Tenure */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Original Loan Tenure (Years)
                </label>
                <select
                  value={originalTenure}
                  onChange={(e) => {
                    handleInputChange();
                    const newTenure = parseInt(e.target.value);
                    setOriginalTenure(newTenure);
                    if (yearsPaid >= newTenure) {
                      setYearsPaid(newTenure - 1);
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  {TENURE_OPTIONS.map((tenure) => (
                    <option key={tenure} value={tenure}>
                      {tenure} years
                    </option>
                  ))}
                </select>
              </div>

              {/* Years Already Paid */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Years Already Paid
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={yearsPaid}
                    onChange={(e) => {
                      handleInputChange();
                      const value = parseInt(e.target.value);
                      if (
                        !isNaN(value) &&
                        value >= 0 &&
                        value < originalTenure
                      ) {
                        setYearsPaid(value);
                      }
                    }}
                    min="0"
                    max={originalTenure - 1}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    min="0"
                    max={originalTenure - 1}
                    step="1"
                    value={yearsPaid}
                    onChange={(e) => {
                      handleInputChange();
                      setYearsPaid(parseInt(e.target.value));
                    }}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>0 years</span>
                    <span>{originalTenure - 1} years</span>
                  </div>
                </div>
              </div>

              {/* Lock-in Period */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Lock-in Period (Years)
                </label>
                <select
                  value={lockInPeriod}
                  onChange={(e) => {
                    handleInputChange();
                    setLockInPeriod(parseInt(e.target.value));
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  {LOCKIN_OPTIONS.map((period) => (
                    <option key={period} value={period}>
                      {period === 0 ? "No lock-in" : `${period} years`}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-2">
                  Most Malaysian banks have 3-5 year lock-in periods
                </p>
              </div>

              {/* Early Settlement Penalty */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Early Settlement Penalty (%)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={penaltyPercentage}
                    onChange={(e) => {
                      handleInputChange();
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value) && value >= 0 && value <= 5) {
                        setPenaltyPercentage(value);
                      }
                    }}
                    step="0.5"
                    min="0"
                    max="5"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={penaltyPercentage}
                    onChange={(e) => {
                      handleInputChange();
                      setPenaltyPercentage(parseFloat(e.target.value));
                    }}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>0%</span>
                    <span>5%</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Typical range is 2-3% if within lock-in period (first 3-5
                  years)
                </p>
              </div>

              {/* Lock-in Status Badge */}
              <div
                className={`p-4 rounded-xl ${
                  calculation.isWithinLockIn
                    ? "bg-amber-50 border border-amber-200"
                    : "bg-green-50 border border-green-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {calculation.isWithinLockIn ? "⚠️" : "✅"}
                  </span>
                  <div>
                    <p
                      className={`font-medium ${
                        calculation.isWithinLockIn
                          ? "text-amber-800"
                          : "text-green-800"
                      }`}
                    >
                      {calculation.isWithinLockIn
                        ? `Within Lock-in Period (${lockInPeriod - yearsPaid} year${lockInPeriod - yearsPaid !== 1 ? "s" : ""} remaining)`
                        : "Past Lock-in Period"}
                    </p>
                    <p
                      className={`text-sm ${
                        calculation.isWithinLockIn
                          ? "text-amber-600"
                          : "text-green-600"
                      }`}
                    >
                      {calculation.isWithinLockIn
                        ? `${penaltyPercentage}% penalty applies if you settle now`
                        : "No penalty fee for early settlement!"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Main Results Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Settlement Summary Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                  <h3 className="text-white text-lg font-bold">
                    Settlement Summary
                  </h3>
                </div>

                <div className="p-6">
                  {/* Settlement Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Outstanding Balance</span>
                      <span className="text-2xl font-bold text-slate-900">
                        {formatCurrency(calculation.outstandingBalance)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Penalty Fee</span>
                      <span
                        className={`text-lg font-semibold ${
                          calculation.penaltyFee > 0
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {calculation.penaltyFee > 0 ? "+" : ""}
                        {formatCurrency(calculation.penaltyFee)}
                      </span>
                    </div>
                    <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                      <span className="text-slate-800 font-medium">
                        Total Settlement Amount
                      </span>
                      <span className="text-3xl font-bold text-slate-900">
                        {formatCurrency(calculation.settlementAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Savings Analysis */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-6">
                    <h3 className="text-slate-500 text-sm font-medium mb-3">
                      Savings Analysis
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">
                          Interest You&apos;ll Save
                        </span>
                        <span className="text-green-600 font-semibold">
                          +{formatCurrency(calculation.interestSavedIfSettle)}
                        </span>
                      </div>
                      {calculation.penaltyFee > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">
                            Settlement Penalty
                          </span>
                          <span className="text-red-600 font-semibold">
                            -{formatCurrency(calculation.penaltyFee)}
                          </span>
                        </div>
                      )}
                      <div className="border-t border-slate-200 pt-2 flex justify-between items-center">
                        <span className="text-slate-800 font-medium">Net Savings</span>
                        <span
                          className={`text-2xl font-bold ${
                            calculation.netSavings >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {calculation.netSavings >= 0 ? "+" : ""}
                          {formatCurrency(calculation.netSavings)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Payment Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-slate-500 text-sm">Monthly Payment</p>
                      <p className="text-xl font-bold text-slate-900">
                        {formatCurrency(calculation.monthlyPayment)}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-slate-500 text-sm">Remaining</p>
                      <p className="text-xl font-bold text-slate-900">
                        {Math.round(calculation.remainingMonths / 12)} years
                      </p>
                      <p className="text-slate-500 text-sm">
                        ({calculation.remainingMonths} months)
                      </p>
                    </div>
                  </div>

                  {/* Total if Continue */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-slate-500 text-sm">
                          Total if You Continue Paying
                        </p>
                        <p className="text-xs text-slate-400">
                          (Principal + Interest remaining)
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">
                        {formatCurrency(calculation.totalRemainingPayments)}
                      </p>
                    </div>
                  </div>

                  {/* Recommendation Badge */}
                  <div
                    className={`rounded-xl p-4 ${
                      calculation.recommendation === "recommended"
                        ? "bg-green-50 border border-green-200"
                        : calculation.recommendation === "marginal"
                          ? "bg-amber-50 border border-amber-200"
                          : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">
                        {calculation.recommendation === "recommended"
                          ? "✅"
                          : calculation.recommendation === "marginal"
                            ? "⚠️"
                            : "❌"}
                      </span>
                      <div>
                        <p className={`font-bold text-lg ${
                          calculation.recommendation === "recommended"
                            ? "text-green-800"
                            : calculation.recommendation === "marginal"
                              ? "text-amber-800"
                              : "text-red-800"
                        }`}>
                          {calculation.recommendation === "recommended"
                            ? "Settlement Recommended"
                            : calculation.recommendation === "marginal"
                              ? "Marginal Savings"
                              : "Not Recommended"}
                        </p>
                        <p className={`text-sm ${
                          calculation.recommendation === "recommended"
                            ? "text-green-700"
                            : calculation.recommendation === "marginal"
                              ? "text-amber-700"
                              : "text-red-700"
                        }`}>
                          {calculation.recommendation === "recommended"
                            ? `You'll save ${formatCurrency(calculation.netSavings)} in interest. Consider settling if you have the funds.`
                            : calculation.recommendation === "marginal"
                              ? `Savings are small (${formatCurrency(calculation.netSavings)}). Consider if you have better investment opportunities.`
                              : `Penalty fee (${formatCurrency(calculation.penaltyFee)}) exceeds your savings. Wait until lock-in period ends.`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Inline CTA - Conditional based on savings amount */}
                  {calculation.netSavings > 50000 ? (
                    // High savings (>RM50,000)
                    <div className="mt-4 bg-green-50 border-l-4 border-green-500 rounded-r-xl p-4">
                      <p className="font-bold text-green-800 text-lg">
                        🎉 Anda boleh jimat {formatCurrency(calculation.netSavings)}!
                      </p>
                      <p className="text-sm text-green-700 mt-1">
                        Bercakap dengan pakar refinancing. Tiada komitmen.
                      </p>
                      <button
                        onClick={() => openModal("results_card")}
                        className="w-full py-3 mt-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        Kunci Savings Anda
                        <span>→</span>
                      </button>
                      {/* Social Proof */}
                      <p className="text-xs text-green-600 text-center mt-3">
                        ✓ 127 pemilik rumah telah semak kelayakan refinancing bulan ini
                      </p>
                      {/* Urgency */}
                      <p className="text-xs text-amber-600 text-center mt-1 font-medium">
                        ⏰ Kadar OPR dijangka naik - kunci savings anda sekarang
                      </p>
                    </div>
                  ) : calculation.netSavings >= 10000 ? (
                    // Medium savings (RM10,000 - RM50,000)
                    <div className="mt-4 bg-green-50 border-l-4 border-green-500 rounded-r-xl p-4">
                      <p className="font-bold text-green-800 text-lg">
                        Jimat {formatCurrency(calculation.netSavings)} - Nak Tahu Caranya?
                      </p>
                      <p className="text-sm text-green-700 mt-1">
                        Bercakap dengan pakar refinancing. Tiada komitmen.
                      </p>
                      <button
                        onClick={() => openModal("results_card")}
                        className="w-full py-3 mt-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        Dapatkan Analisis Percuma
                        <span>→</span>
                      </button>
                      {/* Social Proof */}
                      <p className="text-xs text-green-600 text-center mt-3">
                        ✓ 127 pemilik rumah telah semak kelayakan refinancing bulan ini
                      </p>
                      {/* Urgency */}
                      <p className="text-xs text-amber-600 text-center mt-1 font-medium">
                        ⏰ Kadar OPR dijangka naik - kunci savings anda sekarang
                      </p>
                    </div>
                  ) : (
                    // Low/negative savings (<RM10,000)
                    <div className="mt-4 bg-slate-50 border-l-4 border-slate-400 rounded-r-xl p-4">
                      <p className="font-bold text-slate-800 text-lg">
                        Settlement mungkin tak berbaloi
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        Tapi mungkin ada pilihan lain
                      </p>
                      <button
                        onClick={() => openModal("results_card")}
                        className="w-full py-3 mt-3 bg-slate-600 hover:bg-slate-700 rounded-xl text-white font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        Dapatkan Second Opinion
                        <span>→</span>
                      </button>
                      {/* Social Proof */}
                      <p className="text-xs text-slate-500 text-center mt-3">
                        ✓ 127 pemilik rumah telah semak kelayakan refinancing bulan ini
                      </p>
                    </div>
                  )}

                  {/* Breakdown Toggle */}
                  <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="w-full mt-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {showBreakdown ? "Hide" : "View"} Detailed Breakdown
                    <svg
                      className={`w-4 h-4 transition-transform ${showBreakdown ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Detailed Breakdown */}
                  {showBreakdown && (
                    <div className="mt-4 bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Original Loan</span>
                        <span className="text-slate-900">{formatCurrency(loanAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Interest Rate</span>
                        <span className="text-slate-900">{interestRate}% p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Original Tenure</span>
                        <span className="text-slate-900">{originalTenure} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Months Paid</span>
                        <span className="text-slate-900">
                          {calculation.monthsPaid} ({yearsPaid} years)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Months Remaining</span>
                        <span className="text-slate-900">
                          {calculation.remainingMonths} (
                          {Math.round(calculation.remainingMonths / 12)} years)
                        </span>
                      </div>
                      <div className="border-t border-slate-200 pt-2 flex justify-between">
                        <span className="text-slate-500">Total Paid So Far</span>
                        <span className="text-slate-900">{formatCurrency(calculation.totalPaidSoFar)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Outstanding Principal</span>
                        <span className="text-slate-900">
                          {formatCurrency(calculation.outstandingBalance)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">
                          Penalty if Settle Now
                        </span>
                        <span
                          className={
                            calculation.penaltyFee > 0 ? "text-red-600" : "text-slate-900"
                          }
                        >
                          {formatCurrency(calculation.penaltyFee)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">
                          Total Interest if Continue
                        </span>
                        <span className="text-slate-900">
                          {formatCurrency(calculation.totalInterestIfContinue)}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-500">
                          Interest Saved if Settle
                        </span>
                        <span className="text-green-600">
                          {formatCurrency(calculation.interestSavedIfSettle)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💬</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">
                      Not Sure Whether to Settle or Refinance?
                    </h3>
                    <p className="text-sm text-slate-500">
                      Get free consultation from our loan specialists
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => openModal("results_card")}
                  className="w-full py-3 mt-4 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Get Free Consultation
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {!formSubmitted ? (
              <>
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">
                      Get Expert Advice
                    </h3>
                    <button
                      onClick={closeModal}
                      className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-slate-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Pre-filled Data (uses captured values) */}
                  {capturedCalc && (
                    <div className="bg-green-50 rounded-xl p-4 mb-6 text-sm">
                      <p className="font-medium text-green-800 mb-2">
                        Your Loan Details:
                      </p>
                      <div className="space-y-1 text-green-700">
                        <p>Loan Amount: {formatCurrency(capturedCalc.loanAmount)}</p>
                        <p>
                          Outstanding:{" "}
                          {formatCurrency(capturedCalc.outstanding)}
                        </p>
                        <p>
                          Potential Savings:{" "}
                          <span
                            className={
                              capturedCalc.potentialSavings >= 0
                                ? "text-green-600 font-semibold"
                                : "text-red-600 font-semibold"
                            }
                          >
                            {formatCurrency(capturedCalc.potentialSavings)}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Nama
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="Nama penuh anda"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        No. WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.whatsapp}
                        onChange={(e) =>
                          setFormData({ ...formData, whatsapp: e.target.value })
                        }
                        placeholder="+60123456789"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all mt-2"
                    >
                      {isSubmitting ? "Menghantar..." : "Dapatkan Konsultasi Percuma"}
                    </button>
                  </form>

                  {/* Social Proof */}
                  <p className="text-xs text-green-600 text-center mt-3">
                    ✓ 127 pemilik rumah telah semak kelayakan refinancing bulan ini
                  </p>

                  <p className="text-xs text-slate-400 text-center mt-2">
                    Dengan menghantar, anda bersetuju untuk dihubungi oleh pakar pinjaman kami.
                  </p>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Request Submitted!
                </h3>
                <p className="text-slate-600 mb-6">
                  Our loan specialist will contact you within 24 hours to
                  discuss your options.
                </p>
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div
            className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg ${
              toast.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            <span className="text-xl">
              {toast.type === "success" ? "✅" : "⚠️"}
            </span>
            <p className="font-medium">{toast.message}</p>
            <button
              onClick={() => setToast((prev) => ({ ...prev, show: false }))}
              className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Sticky Mobile CTA - Only show on mobile after calculation */}
      {hasInteracted && showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-green-600 shadow-lg safe-area-bottom">
          {/* Close button */}
          <button
            onClick={() => setShowStickyCTA(false)}
            className="absolute top-1 right-1 p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center justify-between py-3 px-4">
            <span className="text-white font-semibold">
              Jimat {formatCurrency(calculation.netSavings)}
            </span>
            <button
              onClick={() => openModal("sticky_bar")}
              className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-green-50 transition-colors flex items-center gap-1"
            >
              Hubungi Pakar
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* Exit Intent Popup (Desktop Only) */}
      {showExitPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <button
                onClick={() => setShowExitPopup(false)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center mb-6">
                <span className="text-5xl mb-4 block">💰</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Jangan lepaskan peluang jimat {formatCurrency(calculation.netSavings)}
                </h3>
                <p className="text-slate-600">
                  Tinggalkan nombor WhatsApp, kami hubungi dalam 24 jam
                </p>
              </div>

              <form onSubmit={handleExitFormSubmit} className="space-y-4">
                <div>
                  <input
                    type="tel"
                    required
                    value={exitFormData.whatsapp}
                    onChange={(e) => setExitFormData({ whatsapp: e.target.value })}
                    placeholder="No. WhatsApp (+60123456789)"
                    className="w-full px-4 py-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed rounded-xl text-white font-bold text-lg transition-colors"
                >
                  {isSubmitting ? "Menghantar..." : "Hantar"}
                </button>
              </form>

              <button
                onClick={() => setShowExitPopup(false)}
                className="w-full py-2 mt-3 text-slate-500 hover:text-slate-700 text-sm transition-colors"
              >
                Tidak, terima kasih
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
