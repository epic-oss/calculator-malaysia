"use client";

import { useState, useMemo } from "react";

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

const LENDER_RATES = [
  { name: "Toyota Capital", minRate: 3.5, maxRate: 4.5, notes: "Toyota cars only" },
  { name: "Public Bank", minRate: 3.5, maxRate: 4.8, notes: "" },
  { name: "Maybank", minRate: 3.5, maxRate: 5.0, notes: "Based on car age & credit" },
  { name: "RHB", minRate: 3.6, maxRate: 5.2, notes: "" },
  { name: "CIMB", minRate: 3.8, maxRate: 5.5, notes: "" },
  { name: "Hong Leong", minRate: 3.8, maxRate: 5.5, notes: "" },
  { name: "AmBank", minRate: 4.0, maxRate: 6.0, notes: "" },
  { name: "Bank Rakyat", minRate: 4.2, maxRate: 5.8, notes: "" },
  { name: "AEON Credit", minRate: 5.0, maxRate: 8.0, notes: "Easier approval" },
];

const TENURE_OPTIONS = [1, 2, 3, 4, 5, 6, 7];

const LOAN_RANGES = [
  "Below RM30,000",
  "RM30,000 - RM50,000",
  "RM50,000 - RM80,000",
  "RM80,000 - RM100,000",
  "Above RM100,000",
];

const INCOME_RANGES = [
  "Below RM3,000",
  "RM3,000 - RM5,000",
  "RM5,000 - RM8,000",
  "RM8,000 - RM10,000",
  "Above RM10,000",
];

// Car loan uses FLAT RATE calculation (different from housing loans)
function calculateFlatRateMonthly(principal: number, flatRate: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  const totalInterest = principal * (flatRate / 100) * years;
  const totalPayment = principal + totalInterest;
  const months = years * 12;
  return totalPayment / months;
}

function calculateTotalInterest(principal: number, flatRate: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  return principal * (flatRate / 100) * years;
}

export default function CarRefinanceCalculator() {
  const currentYear = new Date().getFullYear();

  // Current loan state
  const [carValue, setCarValue] = useState(80000);
  const [outstandingLoan, setOutstandingLoan] = useState(50000);
  const [currentRate, setCurrentRate] = useState(6.0);
  const [remainingTenure, setRemainingTenure] = useState(4);

  // New loan state
  const [newRate, setNewRate] = useState(4.5);
  const [newTenure, setNewTenure] = useState(5);

  // Cash out state
  const [includeCashOut, setIncludeCashOut] = useState(false);
  const [cashOutAmount, setCashOutAmount] = useState(10000);

  // Costs state
  const [penaltyRate, setPenaltyRate] = useState(2);
  const [processingFee, setProcessingFee] = useState(200);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    carModel: "",
    loanRange: "RM30,000 - RM50,000",
    incomeRange: "RM3,000 - RM5,000",
  });
  const [showStickyCTA, setShowStickyCTA] = useState(true);
  const [ctaSource, setCtaSource] = useState<"sticky_bar" | "results_card">("results_card");

  // Calculate car equity
  const carEquity = carValue - outstandingLoan;
  const maxCashOut = Math.max(0, Math.min(carEquity * 0.9, 50000)); // Max 90% of equity, capped at 50k

  const calculation = useMemo(() => {
    // New loan amount includes cash out if enabled
    const newLoanAmount = includeCashOut ? outstandingLoan + cashOutAmount : outstandingLoan;

    // Current loan calculations (flat rate)
    const currentMonthly = calculateFlatRateMonthly(outstandingLoan, currentRate, remainingTenure);
    const currentTotalInterest = calculateTotalInterest(outstandingLoan, currentRate, remainingTenure);
    const currentTotalPayment = outstandingLoan + currentTotalInterest;

    // New loan calculations (flat rate)
    const newMonthly = calculateFlatRateMonthly(newLoanAmount, newRate, newTenure);
    const newTotalInterest = calculateTotalInterest(newLoanAmount, newRate, newTenure);
    const newTotalPayment = newLoanAmount + newTotalInterest;

    const monthlySavings = currentMonthly - newMonthly;
    const yearlySavings = monthlySavings * 12;
    const totalInterestSavings = currentTotalInterest - newTotalInterest;

    // Refinancing costs
    const earlySettlementPenalty = outstandingLoan * (penaltyRate / 100);
    const totalCosts = earlySettlementPenalty + processingFee;
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(totalCosts / monthlySavings) : Infinity;

    let recommendation: "good" | "neutral" | "bad";
    let recommendationText: string;

    if (monthlySavings <= 0) {
      recommendation = "bad";
      recommendationText = "Car refinancing is NOT recommended. Your new monthly payment would be higher than your current payment.";
    } else if (breakEvenMonths <= 12) {
      recommendation = "good";
      recommendationText = `Car refinancing is RECOMMENDED! You'll recover costs in ${breakEvenMonths} months.`;
    } else if (breakEvenMonths <= 24) {
      recommendation = "neutral";
      recommendationText = "Car refinancing is WORTHWHILE if you plan to keep this car for 2+ more years.";
    } else {
      recommendation = "bad";
      recommendationText = "Car refinancing is NOT recommended. Consider other options.";
    }

    return {
      currentMonthly,
      newMonthly,
      monthlySavings,
      yearlySavings,
      currentTotalInterest,
      newTotalInterest,
      totalInterestSavings,
      currentTotalPayment,
      newTotalPayment,
      earlySettlementPenalty,
      totalCosts,
      breakEvenMonths,
      recommendation,
      recommendationText,
      newLoanAmount,
    };
  }, [outstandingLoan, currentRate, remainingTenure, newRate, newTenure, penaltyRate, processingFee, includeCashOut, cashOutAmount]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCurrencyDecimal = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const openModal = (source: "sticky_bar" | "results_card" = "results_card") => {
    setCtaSource(source);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Determine device type
    const deviceType = typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop";

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          calculator_type: "car_loan_refinance",
          source_url: typeof window !== "undefined" ? window.location.href : "",
          calculation_summary: {
            car_value: carValue,
            outstanding_loan: outstandingLoan,
            current_rate: currentRate,
            new_rate: newRate,
            monthly_savings: calculation.monthlySavings,
          },
          timestamp: new Date().toISOString(),
          // Tracking fields
          device_type: deviceType,
          cta_source: ctaSource,
          referrer: typeof document !== "undefined" ? document.referrer : "",
          landing_page: typeof window !== "undefined" ? window.location.href : "",
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-700 to-slate-800 text-white py-10 md:py-14">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">🚙 Auto Calculator</div>
          <div className="text-5xl md:text-6xl mb-4">🚗</div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Car Refinance Calculator Malaysia {currentYear}</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">Calculate how much you can save by refinancing your car loan</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="space-y-6">
              {/* Section 1: Current Car Loan */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <span className="text-xl">🚗</span>
                  Your Current Car Loan
                </h2>

                <div className="space-y-4">
                  {/* Car Value */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Car Current Market Value
                    </label>
                    <div className="text-2xl font-bold text-slate-800 mb-2">
                      {formatCurrency(carValue)}
                    </div>
                    <input
                      type="range"
                      value={carValue}
                      onChange={(e) => setCarValue(Number(e.target.value))}
                      min={20000}
                      max={300000}
                      step={5000}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>RM 20,000</span>
                      <span>RM 300,000</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Check mudah.my or carlist.my for market value
                    </p>
                  </div>

                  {/* Outstanding Loan */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Outstanding Loan Amount
                    </label>
                    <div className="text-2xl font-bold text-slate-800 mb-2">
                      {formatCurrency(outstandingLoan)}
                    </div>
                    <input
                      type="range"
                      value={outstandingLoan}
                      onChange={(e) => setOutstandingLoan(Number(e.target.value))}
                      min={10000}
                      max={250000}
                      step={5000}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>RM 10,000</span>
                      <span>RM 250,000</span>
                    </div>
                  </div>

                  {/* Current Interest Rate */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Current Interest Rate (% p.a. flat)
                    </label>
                    <input
                      type="number"
                      value={currentRate}
                      onChange={(e) => setCurrentRate(Math.max(3, Math.min(12, Number(e.target.value))))}
                      min={3}
                      max={12}
                      step={0.1}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Remaining Tenure */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Remaining Tenure (Years)
                    </label>
                    <select
                      value={remainingTenure}
                      onChange={(e) => setRemainingTenure(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      {TENURE_OPTIONS.map((tenure) => (
                        <option key={tenure} value={tenure}>{tenure} year{tenure > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>

                  {/* Current Monthly Payment (Calculated) */}
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-sm text-slate-500">Current Monthly Payment</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {formatCurrencyDecimal(calculation.currentMonthly)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2: New Refinance Loan */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <span className="text-xl">🏦</span>
                  New Refinance Loan
                </h2>

                <div className="space-y-4">
                  {/* New Interest Rate */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      New Interest Rate (% p.a. flat)
                    </label>
                    <input
                      type="number"
                      value={newRate}
                      onChange={(e) => setNewRate(Math.max(3, Math.min(8, Number(e.target.value))))}
                      min={3}
                      max={8}
                      step={0.1}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Current market rates: 3.5% - 5.5% p.a.
                    </p>
                  </div>

                  {/* New Tenure */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      New Loan Tenure (Years)
                    </label>
                    <select
                      value={newTenure}
                      onChange={(e) => setNewTenure(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      {TENURE_OPTIONS.map((tenure) => (
                        <option key={tenure} value={tenure}>{tenure} year{tenure > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                    <p className="text-xs text-slate-500 mt-1">
                      Max tenure depends on car age (car must be &lt;10 years at loan end)
                    </p>
                  </div>

                  {/* Cash Out Toggle */}
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">Include Cash Out</p>
                      <p className="text-xs text-slate-500">Get extra cash based on your car equity</p>
                    </div>
                    <button
                      onClick={() => setIncludeCashOut(!includeCashOut)}
                      className={`relative w-14 h-7 rounded-full transition-colors ${
                        includeCashOut ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                          includeCashOut ? "left-8" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Cash Out Amount Slider */}
                  {includeCashOut && (
                    <div className="p-4 bg-blue-50 rounded-xl -mt-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Cash Out Amount (RM)
                      </label>
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {formatCurrency(cashOutAmount)}
                      </div>
                      <input
                        type="range"
                        value={cashOutAmount}
                        onChange={(e) => setCashOutAmount(Number(e.target.value))}
                        min={5000}
                        max={Math.max(5000, maxCashOut)}
                        step={1000}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>RM 5,000</span>
                        <span>{formatCurrency(Math.max(5000, maxCashOut))}</span>
                      </div>
                      <p className="text-xs text-blue-600 mt-2">
                        Your car equity: {formatCurrency(carEquity)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 3: Refinancing Costs */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <span className="text-xl">💰</span>
                  Refinancing Costs
                </h2>

                <div className="space-y-4">
                  {/* Early Settlement Penalty */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Early Settlement Penalty (%)
                    </label>
                    <input
                      type="number"
                      value={penaltyRate}
                      onChange={(e) => setPenaltyRate(Math.max(0, Math.min(5, Number(e.target.value))))}
                      min={0}
                      max={5}
                      step={0.5}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Penalty amount: {formatCurrency(outstandingLoan * (penaltyRate / 100))}
                    </p>
                  </div>

                  {/* Processing Fee */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Processing Fee (RM)
                    </label>
                    <input
                      type="number"
                      value={processingFee}
                      onChange={(e) => setProcessingFee(Number(e.target.value))}
                      min={0}
                      max={1000}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results - Right Side */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-8 space-y-6">
              {/* Hero Savings Card */}
              <div className={`rounded-2xl p-6 text-white ${
                calculation.monthlySavings > 0 ? "bg-gradient-to-br from-emerald-500 to-emerald-700" : "bg-gradient-to-br from-red-500 to-red-700"
              }`}>
                <h2 className="text-lg font-medium opacity-90 mb-2">
                  Your Monthly Savings
                </h2>
                <p className="text-5xl font-bold mb-2">
                  {calculation.monthlySavings > 0 ? formatCurrency(calculation.monthlySavings) : "-" + formatCurrency(Math.abs(calculation.monthlySavings))}
                </p>
                <p className="opacity-80">
                  {calculation.monthlySavings > 0
                    ? `Save ${formatCurrency(calculation.yearlySavings)} per year`
                    : "You would pay more with refinancing"}
                </p>
              </div>

              {/* Comparison Table */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Loan Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 text-slate-500 font-medium"></th>
                        <th className="text-right py-3 text-slate-500 font-medium">Current</th>
                        <th className="text-right py-3 text-slate-500 font-medium">Refinance</th>
                        <th className="text-right py-3 text-emerald-600 font-medium">Savings</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 text-slate-600">Monthly Payment</td>
                        <td className="text-right py-3 font-medium text-slate-800">{formatCurrency(calculation.currentMonthly)}</td>
                        <td className="text-right py-3 font-medium text-slate-800">{formatCurrency(calculation.newMonthly)}</td>
                        <td className={`text-right py-3 font-bold ${calculation.monthlySavings > 0 ? "text-emerald-600" : "text-red-600"}`}>
                          {calculation.monthlySavings > 0 ? "+" : ""}{formatCurrency(calculation.monthlySavings)}
                        </td>
                      </tr>
                      {includeCashOut && (
                        <tr className="border-b border-slate-100 bg-blue-50">
                          <td className="py-3 text-blue-700">Cash Out</td>
                          <td className="text-right py-3 text-slate-400">-</td>
                          <td className="text-right py-3 font-medium text-blue-700">{formatCurrency(cashOutAmount)}</td>
                          <td className="text-right py-3 text-blue-600 text-xs">withdrawn</td>
                        </tr>
                      )}
                      <tr className="border-b border-slate-100">
                        <td className="py-3 text-slate-600">Interest Rate</td>
                        <td className="text-right py-3 font-medium text-slate-800">{currentRate.toFixed(1)}%</td>
                        <td className="text-right py-3 font-medium text-slate-800">{newRate.toFixed(1)}%</td>
                        <td className="text-right py-3 font-bold text-emerald-600">
                          -{(currentRate - newRate).toFixed(1)}%
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 text-slate-600">Loan Tenure</td>
                        <td className="text-right py-3 font-medium text-slate-800">{remainingTenure} year{remainingTenure > 1 ? "s" : ""}</td>
                        <td className="text-right py-3 font-medium text-slate-800">{newTenure} year{newTenure > 1 ? "s" : ""}</td>
                        <td className="text-right py-3 text-slate-400">-</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 text-slate-600">Total Interest</td>
                        <td className="text-right py-3 font-medium text-slate-800">{formatCurrency(calculation.currentTotalInterest)}</td>
                        <td className="text-right py-3 font-medium text-slate-800">{formatCurrency(calculation.newTotalInterest)}</td>
                        <td className={`text-right py-3 font-bold ${calculation.totalInterestSavings > 0 ? "text-emerald-600" : "text-red-600"}`}>
                          {calculation.totalInterestSavings > 0 ? "+" : ""}{formatCurrency(calculation.totalInterestSavings)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-slate-600">Total Payment</td>
                        <td className="text-right py-3 font-medium text-slate-800">{formatCurrency(calculation.currentTotalPayment)}</td>
                        <td className="text-right py-3 font-medium text-slate-800">{formatCurrency(calculation.newTotalPayment)}</td>
                        <td className={`text-right py-3 font-bold ${calculation.currentTotalPayment - calculation.newTotalPayment > 0 ? "text-emerald-600" : "text-red-600"}`}>
                          {calculation.currentTotalPayment - calculation.newTotalPayment > 0 ? "+" : ""}{formatCurrency(calculation.currentTotalPayment - calculation.newTotalPayment)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Break-even Analysis */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Break-even Analysis</h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Early Settlement Penalty</span>
                    <span className="font-bold text-slate-800">{formatCurrency(calculation.earlySettlementPenalty)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Processing Fee</span>
                    <span className="font-bold text-slate-800">{formatCurrency(processingFee)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-600">Total Refinancing Costs</span>
                    <span className="font-bold text-slate-800">{formatCurrency(calculation.totalCosts)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Monthly Savings</span>
                    <span className="font-bold text-slate-800">{formatCurrency(calculation.monthlySavings)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Break-even Period</span>
                    <span className="font-bold text-emerald-600">
                      {calculation.breakEvenMonths === Infinity ? "N/A" : `${calculation.breakEvenMonths} months`}
                    </span>
                  </div>

                  {/* Progress bar */}
                  {calculation.monthlySavings > 0 && calculation.breakEvenMonths !== Infinity && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Start</span>
                        <span>Break-even ({calculation.breakEvenMonths} mo)</span>
                        <span>24 months</span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            calculation.breakEvenMonths <= 12 ? "bg-emerald-500" :
                            calculation.breakEvenMonths <= 24 ? "bg-amber-500" : "bg-red-500"
                          }`}
                          style={{ width: `${Math.min((calculation.breakEvenMonths / 24) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommendation */}
              <div className={`rounded-2xl p-6 border-2 ${
                calculation.recommendation === "good" ? "bg-emerald-50 border-emerald-200" :
                calculation.recommendation === "neutral" ? "bg-amber-50 border-amber-200" :
                "bg-red-50 border-red-200"
              }`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
                    {calculation.recommendation === "good" ? "✅" :
                     calculation.recommendation === "neutral" ? "⚠️" : "❌"}
                  </span>
                  <div>
                    <h3 className={`font-semibold ${
                      calculation.recommendation === "good" ? "text-emerald-800" :
                      calculation.recommendation === "neutral" ? "text-amber-800" :
                      "text-red-800"
                    }`}>
                      Recommendation
                    </h3>
                    <p className={`text-sm mt-1 ${
                      calculation.recommendation === "good" ? "text-emerald-700" :
                      calculation.recommendation === "neutral" ? "text-amber-700" :
                      "text-red-700"
                    }`}>
                      {calculation.recommendationText}
                    </p>
                  </div>
                </div>
              </div>

              {/* Car Equity Info (if cash out enabled) */}
              {includeCashOut && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-slate-700 mb-4">Car Equity Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Car Market Value</span>
                      <span className="text-slate-800">{formatCurrency(carValue)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Outstanding Loan</span>
                      <span className="text-slate-800">- {formatCurrency(outstandingLoan)}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                      <span className="font-medium text-slate-700">Your Car Equity</span>
                      <span className={`font-semibold ${carEquity >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {formatCurrency(carEquity)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Cash Out Amount</span>
                      <span className="text-blue-600">{formatCurrency(cashOutAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                      <span className="font-medium text-slate-700">New Total Loan</span>
                      <span className="font-semibold text-slate-800">{formatCurrency(calculation.newLoanAmount)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🚗</span>
                  <h3 className="text-lg font-bold text-slate-800">Get the Best Car Refinance Rates</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Compare offers from 10+ banks. Free, no obligation.
                </p>
                <button
                  onClick={() => openModal("results_card")}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Check My Eligibility
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Rates Table */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Car Refinance Interest Rates in Malaysia {currentYear}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 text-slate-600 font-semibold">Lender</th>
                  <th className="text-right py-3 px-4 text-slate-600 font-semibold">Interest Rate</th>
                  <th className="text-left py-3 px-4 text-slate-600 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {LENDER_RATES.map((lender, index) => (
                  <tr key={lender.name} className={index % 2 === 0 ? "bg-slate-50" : ""}>
                    <td className="py-3 px-4 font-medium text-slate-800">{lender.name}</td>
                    <td className="text-right py-3 px-4 font-bold text-emerald-600">
                      {lender.minRate.toFixed(1)}% - {lender.maxRate.toFixed(1)}% p.a.
                    </td>
                    <td className="py-3 px-4 text-slate-500">{lender.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-4">
            * Rates are indicative and subject to credit assessment. January {currentYear}
          </p>
        </div>

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">What is Car Refinancing?</h2>
            <p className="text-slate-600 leading-relaxed">
              Car refinancing means replacing your existing car loan with a new loan at better terms. You can:
            </p>
            <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
              <li>Get a lower interest rate</li>
              <li>Extend tenure to reduce monthly payment</li>
              <li>Cash out your car equity</li>
            </ul>
            <div className="mt-4 p-4 bg-amber-50 rounded-xl">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Malaysian car loans use FLAT RATE, not reducing balance like housing loans. This means your interest is calculated on the full loan amount throughout the tenure.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">When Should You Refinance Your Car Loan?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 rounded-xl">
                <h3 className="font-semibold text-emerald-800 mb-2">Consider Refinancing If:</h3>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• Current rate is high (6%+ when market is 4%)</li>
                  <li>• Credit score improved = better rates</li>
                  <li>• Need lower monthly payments</li>
                  <li>• Need cash from car equity</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 rounded-xl">
                <h3 className="font-semibold text-red-800 mb-2">Avoid Refinancing If:</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Car is too old (&gt;7 years)</li>
                  <li>• Remaining loan is small (&lt;RM15,000)</li>
                  <li>• Planning to sell the car soon</li>
                  <li>• Break-even period is too long</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Car Refinance vs Personal Loan</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-3 text-slate-600 font-semibold">Factor</th>
                    <th className="text-left py-3 text-slate-600 font-semibold">Car Refinance</th>
                    <th className="text-left py-3 text-slate-600 font-semibold">Personal Loan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700 font-medium">Interest rate</td>
                    <td className="py-3 text-emerald-600 font-medium">3.5% - 6%</td>
                    <td className="py-3 text-red-600">6% - 18%</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700 font-medium">Collateral</td>
                    <td className="py-3 text-slate-600">Car as security</td>
                    <td className="py-3 text-slate-600">Unsecured</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700 font-medium">Max amount</td>
                    <td className="py-3 text-slate-600">Based on car value</td>
                    <td className="py-3 text-slate-600">RM10k - RM150k</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700 font-medium">Tenure</td>
                    <td className="py-3 text-slate-600">Up to 7-9 years</td>
                    <td className="py-3 text-slate-600">1-7 years</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-700 font-medium">Approval</td>
                    <td className="py-3 text-slate-600">Need car valuation</td>
                    <td className="py-3 text-slate-600">Faster</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Requirements for Car Refinancing</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Eligibility</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Malaysian citizen / PR
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Age 21-65
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Minimum income RM2,000/month
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Car less than 10 years old (at end of tenure)
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Car registered under your name
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Documents Required</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    MyKad
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Latest 3 months salary slip
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Latest 3 months bank statement
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Car registration card (geran)
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Current loan statement
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Step-by-Step Car Refinance Process</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Check your car value</h3>
                  <p className="text-sm text-slate-600">Use mudah.my or carlist.my to find market value</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Get current loan statement</h3>
                  <p className="text-sm text-slate-600">Know your outstanding balance & penalty</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Compare refinance rates</h3>
                  <p className="text-sm text-slate-600">Apply to 2-3 banks for best offer</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Car inspection</h3>
                  <p className="text-sm text-slate-600">Bank will value your car</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">5</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Loan approval</h3>
                  <p className="text-sm text-slate-600">Usually 3-7 working days</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold shrink-0">6</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Settlement & disbursement</h3>
                  <p className="text-sm text-slate-600">Bank pays off old loan - Total timeline: 2-4 weeks</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">What is the maximum car age for refinancing?</h3>
                <p className="text-slate-600 text-sm">Most banks require car to be less than 10 years old at the end of loan tenure. So a 5-year old car can get max 5-year refinance.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">Can I refinance a car under hire purchase?</h3>
                <p className="text-slate-600 text-sm">Yes, most car loans in Malaysia are hire purchase. The new bank will settle your existing HP.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">What is early settlement penalty?</h3>
                <p className="text-slate-600 text-sm">Usually 2-3% of outstanding loan. Some banks waive this for refinancing to them.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">Can I refinance and get cash out?</h3>
                <p className="text-slate-600 text-sm">Yes, if your car value is higher than your outstanding loan. You can borrow the difference.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">Will refinancing affect my credit score?</h3>
                <p className="text-slate-600 text-sm">There will be a new credit check, but minimal impact if you pay on time.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">What if my car loan is already low interest?</h3>
                <p className="text-slate-600 text-sm">Refinancing may not be worth it. Use our calculator to check break-even period.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Related Calculators */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Related Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/property/refinance-housing-loan-calculator-malaysia/" className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">🏠</span>
              <h3 className="font-semibold text-slate-800 mt-2">Housing Loan Refinance</h3>
              <p className="text-sm text-slate-500">Refinance your home loan</p>
            </a>
            <a href="/loan/car-loan-calculator-malaysia/" className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">🚙</span>
              <h3 className="font-semibold text-slate-800 mt-2">Car Loan Calculator</h3>
              <p className="text-sm text-slate-500">Calculate car loan payments</p>
            </a>
            <a href="/loan/personal-loan-calculator-malaysia-based-on-salary/" className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">💵</span>
              <h3 className="font-semibold text-slate-800 mt-2">Personal Loan Calculator</h3>
              <p className="text-sm text-slate-500">Compare personal loan options</p>
            </a>
          </div>
        </div>
      </div>

      {/* Lead Capture Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Get Your Free Car Refinance Quote</h3>
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
                    Our loan specialist will contact you within 24 hours to discuss the best car refinance options for you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="e.g. 012-3456789"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Car Brand & Model *</label>
                    <input
                      type="text"
                      required
                      value={formData.carModel}
                      onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                      placeholder="e.g. Honda City 2020"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Outstanding Loan *</label>
                    <select
                      required
                      value={formData.loanRange}
                      onChange={(e) => setFormData({ ...formData, loanRange: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {LOAN_RANGES.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Income *</label>
                    <select
                      required
                      value={formData.incomeRange}
                      onChange={(e) => setFormData({ ...formData, incomeRange: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {INCOME_RANGES.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-xl text-white font-semibold transition-all"
                  >
                    {isSubmitting ? "Submitting..." : "Get My Free Quote"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile CTA */}
      {showStickyCTA && calculation.monthlySavings > 50 && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-green-600 shadow-lg safe-area-bottom">
          <button
            onClick={() => setShowStickyCTA(false)}
            className="absolute top-1 right-1 p-1 text-white/70 hover:text-white"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center justify-between py-3 px-4">
            <div className="text-white">
              <p className="font-semibold">Jimat {formatCurrency(calculation.monthlySavings)}/bulan</p>
              <p className="text-xs text-white/80">Semak kelayakan sekarang</p>
            </div>
            <button
              onClick={() => openModal("sticky_bar")}
              className="px-4 py-2 bg-white text-green-600 font-semibold rounded-lg text-sm"
            >
              Semak →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
