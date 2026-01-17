"use client";

import { useState, useMemo } from "react";

const TENURE_OPTIONS = [5, 7, 9];

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

interface CapturedCalculation {
  carPrice: number;
  outstanding: number;
  settlementAmount: number;
  potentialSavings: number;
  interestRate: number;
  yearsRemaining: number;
}

export default function CarLoanSettlementCalculator() {
  const [carPrice, setCarPrice] = useState(80000);
  const [interestRate, setInterestRate] = useState(3);
  const [loanTenure, setLoanTenure] = useState(7);
  const [yearsPaid, setYearsPaid] = useState(2);
  const [penaltyPercentage, setPenaltyPercentage] = useState(2);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "+60",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });
  const [capturedCalc, setCapturedCalc] = useState<CapturedCalculation | null>(null);

  const calculation = useMemo(() => {
    // Car loans in Malaysia typically use flat rate interest
    const totalInterest = carPrice * (interestRate / 100) * loanTenure;
    const totalLoanAmount = carPrice + totalInterest;
    const totalMonths = loanTenure * 12;
    const monthsPaid = yearsPaid * 12;
    const remainingMonths = totalMonths - monthsPaid;

    // Monthly payment (flat rate)
    const monthlyPayment = totalLoanAmount / totalMonths;

    // Outstanding balance (for flat rate, it's proportional)
    const outstandingBalance = (remainingMonths / totalMonths) * totalLoanAmount;

    // Total paid so far
    const totalPaidSoFar = monthlyPayment * monthsPaid;

    // Penalty calculation
    const penaltyFee = outstandingBalance * (penaltyPercentage / 100);

    // Interest remaining if continue paying
    const totalInterestIfContinue = (remainingMonths / totalMonths) * totalInterest;

    // For early settlement, banks typically rebate unearned interest (Rule of 78 or proportional)
    // Using simplified proportional rebate
    const interestRebate = totalInterestIfContinue * 0.7; // Banks typically give 70% rebate on unearned interest

    // Principal remaining
    const principalRemaining = (remainingMonths / totalMonths) * carPrice;

    // Actual settlement (principal + reduced interest - rebate)
    const actualSettlement = principalRemaining + (totalInterestIfContinue - interestRebate);

    // Interest saved if settle early
    const interestSavedIfSettle = totalInterestIfContinue - (totalInterestIfContinue - interestRebate);

    // Net savings (interest saved minus penalty)
    const netSavings = interestSavedIfSettle - penaltyFee;

    // Total remaining payments if continue
    const totalRemainingPayments = monthlyPayment * remainingMonths;

    // Recommendation
    let recommendation: "recommended" | "marginal" | "not_recommended";
    if (netSavings > 1000) {
      recommendation = "recommended";
    } else if (netSavings > 0) {
      recommendation = "marginal";
    } else {
      recommendation = "not_recommended";
    }

    return {
      monthlyPayment,
      outstandingBalance,
      totalPaidSoFar,
      penaltyFee,
      settlementAmount: actualSettlement + penaltyFee,
      interestSavedIfSettle,
      netSavings,
      totalRemainingPayments,
      remainingMonths,
      monthsPaid,
      totalInterest,
      totalInterestIfContinue,
      recommendation,
    };
  }, [carPrice, interestRate, loanTenure, yearsPaid, penaltyPercentage]);

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

  const openModal = () => {
    setCapturedCalc({
      carPrice,
      outstanding: Math.round(calculation.outstandingBalance),
      settlementAmount: Math.round(calculation.settlementAmount),
      potentialSavings: Math.round(calculation.netSavings),
      interestRate,
      yearsRemaining: Math.round(calculation.remainingMonths / 12),
    });
    setShowModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!capturedCalc) {
      showToast("error", "Something went wrong. Please try again.");
      setIsSubmitting(false);
      return;
    }

    const leadData = {
      timestamp: new Date().toISOString(),
      name: formData.fullName,
      whatsapp: formData.whatsapp,
      email: formData.email,
      calculator_type: "car_loan_settlement",
      car_price: capturedCalc.carPrice,
      outstanding: capturedCalc.outstanding,
      settlement_amount: capturedCalc.settlementAmount,
      potential_savings: capturedCalc.potentialSavings,
      interest_rate: capturedCalc.interestRate,
      years_remaining: capturedCalc.yearsRemaining,
      source_url: typeof window !== "undefined" ? window.location.href : "",
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
        showToast("error", "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("error", "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ fullName: "", whatsapp: "+60", email: "" });
    setCapturedCalc(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🚗</span>
            <h1 className="text-3xl md:text-4xl font-bold">
              Car Loan Early Settlement Calculator
            </h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Find out how much you can save by settling your car loan early. Calculate penalties,
            interest savings, and get a clear recommendation.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Panel */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6">
                Your Car Loan Details
              </h2>

              {/* Car Price */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    Car Price
                  </label>
                  <span className="text-lg font-bold text-slate-900">
                    {formatCurrency(carPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="500000"
                  step="5000"
                  value={carPrice}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>RM20,000</span>
                  <span>RM500,000</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    Interest Rate (Flat)
                  </label>
                  <span className="text-lg font-bold text-slate-900">
                    {interestRate.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="5"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>2%</span>
                  <span>5%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Loan Tenure
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TENURE_OPTIONS.map((tenure) => (
                    <button
                      key={tenure}
                      onClick={() => {
                        setLoanTenure(tenure);
                        if (yearsPaid > tenure) setYearsPaid(tenure - 1);
                      }}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                        loanTenure === tenure
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {tenure} Years
                    </button>
                  ))}
                </div>
              </div>

              {/* Years Already Paid */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    Years Already Paid
                  </label>
                  <span className="text-lg font-bold text-slate-900">
                    {yearsPaid} {yearsPaid === 1 ? "year" : "years"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={loanTenure - 1}
                  step="1"
                  value={yearsPaid}
                  onChange={(e) => setYearsPaid(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0 years</span>
                  <span>{loanTenure - 1} years</span>
                </div>
              </div>

              {/* Penalty Percentage */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    Early Settlement Penalty
                  </label>
                  <span className="text-lg font-bold text-slate-900">
                    {penaltyPercentage}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={penaltyPercentage}
                  onChange={(e) => setPenaltyPercentage(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0%</span>
                  <span>5%</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Most banks charge 2-3% penalty. Check your loan agreement.
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-start gap-3">
                  <span className="text-xl">💡</span>
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      Malaysian Car Loan Info
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Car loans in Malaysia use flat rate interest, which means the interest
                      is calculated on the original loan amount for the entire tenure. Early
                      settlement usually comes with a penalty and partial interest rebate.
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
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
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
                          (Remaining monthly payments)
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
                            ? `You'll save ${formatCurrency(calculation.netSavings)} by settling early. Consider it if you have the funds.`
                            : calculation.recommendation === "marginal"
                              ? `Savings are small (${formatCurrency(calculation.netSavings)}). Consider other uses for your money.`
                              : `Penalty (${formatCurrency(calculation.penaltyFee)}) exceeds your savings. Continue paying as normal.`}
                        </p>
                      </div>
                    </div>
                  </div>

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
                        <span className="text-slate-500">Car Price</span>
                        <span className="text-slate-900">{formatCurrency(carPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Interest Rate (Flat)</span>
                        <span className="text-slate-900">{interestRate}% p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Loan Tenure</span>
                        <span className="text-slate-900">{loanTenure} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Total Interest</span>
                        <span className="text-slate-900">{formatCurrency(calculation.totalInterest)}</span>
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
                        <span className="text-slate-500">Outstanding Balance</span>
                        <span className="text-slate-900">
                          {formatCurrency(calculation.outstandingBalance)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Penalty Fee</span>
                        <span
                          className={
                            calculation.penaltyFee > 0 ? "text-red-600" : "text-slate-900"
                          }
                        >
                          {formatCurrency(calculation.penaltyFee)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Interest Remaining</span>
                        <span className="text-slate-900">
                          {formatCurrency(calculation.totalInterestIfContinue)}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-500">Interest Saved</span>
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
                      Talk to Loan Expert
                    </h3>
                    <p className="text-sm text-slate-500">
                      Free consultation on car loan settlement or refinancing
                    </p>
                  </div>
                </div>
                <button
                  onClick={openModal}
                  className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-colors"
                >
                  Get Advice
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
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
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
              {/* Pre-filled Data */}
              {capturedCalc && (
                <div className="bg-blue-50 rounded-xl p-4 mb-6 text-sm">
                  <p className="font-medium text-blue-800 mb-2">
                    Your Car Loan Details:
                  </p>
                  <div className="space-y-1 text-blue-700">
                    <p>Car Price: {formatCurrency(capturedCalc.carPrice)}</p>
                    <p>Outstanding: {formatCurrency(capturedCalc.outstanding)}</p>
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
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+60123456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-xl text-white font-semibold transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Get Free Consultation"}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  Our expert will WhatsApp you within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-bottom-4 fade-in duration-300">
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
    </div>
  );
}
