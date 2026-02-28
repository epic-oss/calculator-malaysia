"use client";

import { useState, useMemo, useCallback, useEffect } from "react";

interface CapturedCalculation {
  outstandingLoan: number;
  currentRate: number;
  remainingTenure: number;
  newRate: number;
  newTenure: number;
  selectedBank: string;
  monthlySavings: number;
  yearlySavings: number;
  totalInterestSavings: number;
  totalCosts: number;
  breakEvenMonths: number;
  includeCashOut: boolean;
  cashOutAmount: number;
  newLoanAmount: number;
}

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

const BANK_RATES = [
  { name: "Best Promo Rate", rate: 2.85, notes: "Zero entry cost packages" },
  { name: "Bank Islam", rate: 3.80, notes: "Baiti Home Financing-i (Islamic)" },
  { name: "Standard Chartered", rate: 3.88, notes: "Promo rate" },
  { name: "CIMB", rate: 3.95, notes: "Zero Moving Cost" },
  { name: "HSBC", rate: 4.00, notes: "HomeSmart" },
  { name: "LPPSA", rate: 4.00, notes: "Government servants only" },
  { name: "Alliance Bank", rate: 4.05, notes: "" },
  { name: "RHB", rate: 4.10, notes: "My1 Home Loan" },
  { name: "Public Bank", rate: 4.15, notes: "5HOME Plan" },
  { name: "Hong Leong", rate: 4.20, notes: "" },
  { name: "AmBank", rate: 4.25, notes: "" },
  { name: "Maybank", rate: 4.30, notes: "Maxi Home" },
  { name: "Custom Rate", rate: 0, notes: "Enter your own rate" },
];

const TENURE_OPTIONS = [5, 10, 15, 20, 25, 30, 35];

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  if (annualRate <= 0) return principal / (years * 12);

  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;

  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
         (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

function calculateLegalFees(loanAmount: number): number {
  if (loanAmount <= 500000) {
    return loanAmount * 0.01;
  } else if (loanAmount <= 1000000) {
    return (500000 * 0.01) + ((loanAmount - 500000) * 0.008);
  } else {
    return (500000 * 0.01) + (500000 * 0.008) + ((loanAmount - 1000000) * 0.005);
  }
}

function calculateValuationFee(propertyValue: number): number {
  if (propertyValue <= 100000) return 300;
  if (propertyValue <= 500000) return 500;
  if (propertyValue <= 1000000) return 800;
  return 1500;
}

export default function RefinanceCalculator() {
  const currentYear = new Date().getFullYear();

  // Current loan state
  const [outstandingLoan, setOutstandingLoan] = useState(300000);
  const [currentRate, setCurrentRate] = useState(5.0);
  const [remainingTenure, setRemainingTenure] = useState(20);

  // New loan state
  const [selectedBank, setSelectedBank] = useState("CIMB");
  const [newRate, setNewRate] = useState(3.95);
  const [newTenure, setNewTenure] = useState(25);

  // Cash out state
  const [includeCashOut, setIncludeCashOut] = useState(false);
  const [cashOutAmount, setCashOutAmount] = useState(50000);

  // Costs state
  const [zeroEntryCost, setZeroEntryCost] = useState(false);
  const [legalFees, setLegalFees] = useState(() => calculateLegalFees(300000));
  const [valuationFee, setValuationFee] = useState(500);
  const [stampDuty, setStampDuty] = useState(300000 * 0.005);
  const [dischargeFee, setDischargeFee] = useState(200);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(true);
  const [capturedCalc, setCapturedCalc] = useState<CapturedCalculation | null>(null);
  const [ctaSource, setCtaSource] = useState<"sticky_bar" | "results_card" | "inline_cta">("results_card");
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
  });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      setShowFloatingCTA(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle bank selection
  const handleBankChange = (bankName: string) => {
    setSelectedBank(bankName);
    const bank = BANK_RATES.find(b => b.name === bankName);
    if (bank && bank.rate > 0) {
      setNewRate(bank.rate);
    }
  };

  // Handle loan amount change
  const handleLoanChange = (amount: number) => {
    setOutstandingLoan(amount);
    if (!zeroEntryCost) {
      setLegalFees(calculateLegalFees(amount));
      setStampDuty(amount * 0.005);
      setValuationFee(calculateValuationFee(amount));
    }
  };

  // Handle zero entry cost toggle
  const handleZeroEntryCostToggle = (enabled: boolean) => {
    setZeroEntryCost(enabled);
    if (enabled) {
      setLegalFees(0);
      setValuationFee(0);
      setStampDuty(0);
    } else {
      setLegalFees(calculateLegalFees(outstandingLoan));
      setValuationFee(calculateValuationFee(outstandingLoan));
      setStampDuty(outstandingLoan * 0.005);
    }
  };

  const calculation = useMemo(() => {
    // New loan amount includes cash out if enabled
    const newLoanAmount = includeCashOut ? outstandingLoan + cashOutAmount : outstandingLoan;

    const currentMonthly = calculateMonthlyPayment(outstandingLoan, currentRate, remainingTenure);
    const newMonthly = calculateMonthlyPayment(newLoanAmount, newRate, newTenure);

    const currentTotalPayment = currentMonthly * remainingTenure * 12;
    const currentTotalInterest = currentTotalPayment - outstandingLoan;

    const newTotalPayment = newMonthly * newTenure * 12;
    const newTotalInterest = newTotalPayment - newLoanAmount;

    const monthlySavings = currentMonthly - newMonthly;
    const yearlySavings = monthlySavings * 12;
    const totalInterestSavings = currentTotalInterest - newTotalInterest;

    const totalCosts = zeroEntryCost ? dischargeFee : (legalFees + valuationFee + stampDuty + dischargeFee);
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(totalCosts / monthlySavings) : Infinity;

    let recommendation: "good" | "neutral" | "bad";
    let recommendationText: string;

    if (monthlySavings <= 0) {
      recommendation = "bad";
      recommendationText = "Refinancing is NOT recommended. Your new monthly payment would be higher than your current payment.";
    } else if (breakEvenMonths <= 24) {
      recommendation = "good";
      recommendationText = `Refinancing is RECOMMENDED! You'll start saving after ${breakEvenMonths} months.`;
    } else if (breakEvenMonths <= 36) {
      recommendation = "neutral";
      recommendationText = "Refinancing is WORTHWHILE if you plan to stay in this property for more than 3 years.";
    } else {
      recommendation = "bad";
      recommendationText = "Refinancing is NOT recommended. The savings are too small compared to the costs.";
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
      totalCosts,
      breakEvenMonths,
      recommendation,
      recommendationText,
      newLoanAmount,
    };
  }, [outstandingLoan, currentRate, remainingTenure, newRate, newTenure, zeroEntryCost, legalFees, valuationFee, stampDuty, dischargeFee, includeCashOut, cashOutAmount]);

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

  const openModal = useCallback((source: "sticky_bar" | "results_card" | "inline_cta") => {
    setCtaSource(source);
    setCapturedCalc({
      outstandingLoan,
      currentRate,
      remainingTenure,
      newRate,
      newTenure,
      selectedBank,
      monthlySavings: calculation.monthlySavings,
      yearlySavings: calculation.yearlySavings,
      totalInterestSavings: calculation.totalInterestSavings,
      totalCosts: calculation.totalCosts,
      breakEvenMonths: calculation.breakEvenMonths,
      includeCashOut,
      cashOutAmount,
      newLoanAmount: calculation.newLoanAmount,
    });
    setShowModal(true);
  }, [outstandingLoan, currentRate, remainingTenure, newRate, newTenure, selectedBank, calculation, includeCashOut, cashOutAmount]);

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
          timestamp: new Date().toISOString(),
          name: formData.name,
          whatsapp: formData.whatsapp,
          calculator_type: "refinance_housing",
          source_url: typeof window !== "undefined" ? window.location.href : "",
          outstanding_loan: capturedCalc?.outstandingLoan,
          current_rate: capturedCalc?.currentRate,
          remaining_tenure: capturedCalc?.remainingTenure,
          new_rate: capturedCalc?.newRate,
          new_tenure: capturedCalc?.newTenure,
          selected_bank: capturedCalc?.selectedBank,
          monthly_savings: capturedCalc?.monthlySavings,
          yearly_savings: capturedCalc?.yearlySavings,
          total_interest_savings: capturedCalc?.totalInterestSavings,
          total_costs: capturedCalc?.totalCosts,
          break_even_months: capturedCalc?.breakEvenMonths,
          include_cash_out: capturedCalc?.includeCashOut,
          cash_out_amount: capturedCalc?.cashOutAmount,
          new_loan_amount: capturedCalc?.newLoanAmount,
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
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-700 text-white py-10 md:py-14">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">🏘️ Property Calculator</div>
          <div className="text-5xl md:text-6xl mb-4">🏡</div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Refinance Housing Loan Calculator Malaysia {currentYear}</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">Calculate how much you can save by refinancing your home loan</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="space-y-6">
              {/* Section 1: Current Loan */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <span className="text-xl">📋</span>
                  Your Current Loan
                </h2>

                <div className="space-y-4">
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
                      onChange={(e) => handleLoanChange(Number(e.target.value))}
                      min={50000}
                      max={1000000}
                      step={10000}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>RM 50,000</span>
                      <span>RM 1,000,000</span>
                    </div>
                  </div>

                  {/* Current Interest Rate */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Current Interest Rate (% p.a.)
                    </label>
                    <input
                      type="number"
                      value={currentRate}
                      onChange={(e) => setCurrentRate(Math.max(3, Math.min(8, Number(e.target.value))))}
                      min={3}
                      max={8}
                      step={0.01}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    >
                      {TENURE_OPTIONS.filter(t => t <= 30).map((tenure) => (
                        <option key={tenure} value={tenure}>{tenure} years</option>
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
                  {/* Select Bank */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Select Bank
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => handleBankChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    >
                      {BANK_RATES.map((bank) => (
                        <option key={bank.name} value={bank.name}>
                          {bank.name} {bank.rate > 0 ? `(${bank.rate}% p.a.)` : ""} {bank.notes ? `- ${bank.notes}` : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* New Interest Rate */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      New Interest Rate (% p.a.)
                    </label>
                    <input
                      type="number"
                      value={newRate}
                      onChange={(e) => setNewRate(Math.max(2.5, Math.min(6, Number(e.target.value))))}
                      min={2.5}
                      max={6}
                      step={0.01}
                      disabled={selectedBank !== "Custom Rate"}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-60"
                    />
                  </div>

                  {/* New Tenure */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      New Loan Tenure (Years)
                    </label>
                    <select
                      value={newTenure}
                      onChange={(e) => setNewTenure(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    >
                      {TENURE_OPTIONS.map((tenure) => (
                        <option key={tenure} value={tenure}>{tenure} years</option>
                      ))}
                    </select>
                  </div>

                  {/* Cash Out Toggle */}
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">Include Cash Out</p>
                      <p className="text-xs text-slate-500">Withdraw equity from your property</p>
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
                        min={10000}
                        max={300000}
                        step={10000}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>RM 10,000</span>
                        <span>RM 300,000</span>
                      </div>
                      <p className="text-xs text-blue-600 mt-2">
                        New Loan Amount: {formatCurrency(outstandingLoan + cashOutAmount)}
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
                  {/* Zero Entry Cost Toggle */}
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">Zero Entry Cost Package</p>
                      <p className="text-xs text-slate-500">Some banks like CIMB offer zero upfront costs</p>
                    </div>
                    <button
                      onClick={() => handleZeroEntryCostToggle(!zeroEntryCost)}
                      className={`relative w-14 h-7 rounded-full transition-colors ${
                        zeroEntryCost ? "bg-emerald-600" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                          zeroEntryCost ? "left-8" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  {!zeroEntryCost && (
                    <>
                      {/* Legal Fees */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Legal Fees (RM)
                        </label>
                        <input
                          type="number"
                          value={legalFees}
                          onChange={(e) => setLegalFees(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        />
                      </div>

                      {/* Valuation Fee */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Valuation Fee (RM)
                        </label>
                        <input
                          type="number"
                          value={valuationFee}
                          onChange={(e) => setValuationFee(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        />
                      </div>

                      {/* Stamp Duty */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Stamp Duty (RM)
                        </label>
                        <input
                          type="number"
                          value={stampDuty}
                          onChange={(e) => setStampDuty(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </>
                  )}

                  {/* Discharge Fee */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Discharge/MOT Fee (RM)
                    </label>
                    <input
                      type="number"
                      value={dischargeFee}
                      onChange={(e) => setDischargeFee(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
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
                        <td className="text-right py-3 font-medium text-slate-800">{currentRate.toFixed(2)}%</td>
                        <td className="text-right py-3 font-medium text-slate-800">{newRate.toFixed(2)}%</td>
                        <td className="text-right py-3 font-bold text-emerald-600">
                          -{(currentRate - newRate).toFixed(2)}%
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 text-slate-600">Loan Tenure</td>
                        <td className="text-right py-3 font-medium text-slate-800">{remainingTenure} years</td>
                        <td className="text-right py-3 font-medium text-slate-800">{newTenure} years</td>
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
                        <td className="py-3 text-slate-600">Total Repayment</td>
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
                        <span>Break-even ({calculation.breakEvenMonths} months)</span>
                        <span>36 months</span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            calculation.breakEvenMonths <= 24 ? "bg-emerald-500" :
                            calculation.breakEvenMonths <= 36 ? "bg-amber-500" : "bg-red-500"
                          }`}
                          style={{ width: `${Math.min((calculation.breakEvenMonths / 36) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommendation with CTA */}
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

                {/* Conditional CTA inside recommendation */}
                {calculation.monthlySavings > 200 ? (
                  <div className="mt-4 bg-white/80 rounded-xl p-4 border border-emerald-200">
                    <p className="font-bold text-emerald-800 text-lg">
                      Jimat {formatCurrency(calculation.monthlySavings)}/bulan - Kunci kadar anda sekarang!
                    </p>
                    <ul className="text-sm text-emerald-700 mt-2 space-y-1">
                      <li>✓ Bandingkan kadar dari 15+ bank</li>
                      <li>✓ Konsultasi percuma, tanpa komitmen</li>
                      <li>✓ Proses kelulusan dalam 24 jam</li>
                    </ul>
                    <button
                      onClick={() => openModal("inline_cta")}
                      className="mt-3 w-full py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white font-semibold transition-colors"
                    >
                      Semak Kelayakan Sekarang →
                    </button>
                    <p className="text-xs text-emerald-600 mt-2 text-center">
                      ✓ 245 pemilik rumah telah semak kelayakan refinancing bulan ini
                    </p>
                    <p className="text-xs text-amber-600 mt-1 text-center">
                      ⏰ Kadar OPR dijangka naik - kunci kadar rendah anda sekarang
                    </p>
                  </div>
                ) : calculation.monthlySavings > 0 ? (
                  <div className="mt-4 bg-white/80 rounded-xl p-4 border border-amber-200">
                    <p className="font-bold text-amber-800 text-lg">
                      Penjimatan kecil - Mungkin repricing lebih sesuai
                    </p>
                    <ul className="text-sm text-amber-700 mt-2 space-y-1">
                      <li>✓ Semak pilihan repricing dengan bank semasa</li>
                      <li>✓ Dapatkan nasihat pakar percuma</li>
                      <li>✓ Kos repricing lebih rendah (~RM200)</li>
                    </ul>
                    <button
                      onClick={() => openModal("inline_cta")}
                      className="mt-3 w-full py-3 bg-amber-600 hover:bg-amber-700 rounded-xl text-white font-semibold transition-colors"
                    >
                      Minta Nasihat Pakar →
                    </button>
                    <p className="text-xs text-amber-600 mt-2 text-center">
                      ✓ 245 pemilik rumah telah semak pilihan mereka bulan ini
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 bg-white/80 rounded-xl p-4 border border-slate-200">
                    <p className="font-bold text-slate-800 text-lg">
                      Refinance tidak disyorkan sekarang
                    </p>
                    <ul className="text-sm text-slate-600 mt-2 space-y-1">
                      <li>✓ Cuba semak semula dengan kadar berbeza</li>
                      <li>✓ Atau minta nasihat percuma dari pakar</li>
                    </ul>
                    <button
                      onClick={() => openModal("inline_cta")}
                      className="mt-3 w-full py-3 bg-slate-600 hover:bg-slate-700 rounded-xl text-white font-semibold transition-colors"
                    >
                      Hubungi Pakar →
                    </button>
                  </div>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Cost Breakdown</h3>
                <div className="space-y-3">
                  {includeCashOut && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Outstanding Loan</span>
                        <span className="text-slate-800">{formatCurrency(outstandingLoan)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-600">+ Cash Out</span>
                        <span className="text-blue-600">{formatCurrency(cashOutAmount)}</span>
                      </div>
                      <div className="flex justify-between text-sm pb-3 border-b border-slate-200">
                        <span className="font-medium text-slate-700">New Loan Amount</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(calculation.newLoanAmount)}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Legal Fees</span>
                    <span className="text-slate-800">{formatCurrency(zeroEntryCost ? 0 : legalFees)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Valuation Fee</span>
                    <span className="text-slate-800">{formatCurrency(zeroEntryCost ? 0 : valuationFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Stamp Duty</span>
                    <span className="text-slate-800">{formatCurrency(zeroEntryCost ? 0 : stampDuty)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Discharge Fee</span>
                    <span className="text-slate-800">{formatCurrency(dischargeFee)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-slate-200">
                    <span className="font-semibold text-slate-700">Total Costs</span>
                    <span className="font-bold text-slate-800">{formatCurrency(calculation.totalCosts)}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Cash Out Teaser CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <span className="text-3xl">💰</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-800 mb-1">Looking for Cash Out Refinance?</h3>
              <p className="text-sm text-slate-600 mb-3">
                Learn how to unlock your property equity for renovation, investment, or debt consolidation.
              </p>
              <a
                href="/guides/cash-out-refinance-malaysia/"
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Read Cash Out Guide
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bank Rates Table */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Latest Refinance Interest Rates in Malaysia {currentYear}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 text-slate-600 font-semibold">Bank</th>
                  <th className="text-right py-3 px-4 text-slate-600 font-semibold">Effective Rate</th>
                  <th className="text-left py-3 px-4 text-slate-600 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {BANK_RATES.filter(b => b.rate > 0).map((bank, index) => (
                  <tr key={bank.name} className={index % 2 === 0 ? "bg-slate-50" : ""}>
                    <td className="py-3 px-4 font-medium text-slate-800">{bank.name}</td>
                    <td className="text-right py-3 px-4 font-bold text-emerald-600">{bank.rate.toFixed(2)}% p.a.</td>
                    <td className="py-3 px-4 text-slate-500">{bank.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-4">
            * Rates are indicative and subject to change. OPR as of January {currentYear}: 2.75%
          </p>
        </div>

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">What is Home Loan Refinancing?</h2>
            <p className="text-slate-600 leading-relaxed">
              Refinancing means replacing your existing home loan with a new loan from another bank (or the same bank) with better terms.
              The main goal is to get a lower interest rate and reduce your monthly payments.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              In Malaysia, homeowners typically refinance when:
            </p>
            <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
              <li>Market interest rates have dropped significantly</li>
              <li>Their lock-in period has ended</li>
              <li>They want to consolidate debts</li>
              <li>They need cash out from their property equity</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">When Should You Refinance Your Home Loan?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 rounded-xl">
                <h3 className="font-semibold text-emerald-800 mb-2">1. Rate difference of 0.5% or more</h3>
                <p className="text-sm text-emerald-700">Your current rate is at least 0.5% higher than available market rates</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl">
                <h3 className="font-semibold text-emerald-800 mb-2">2. Lock-in period has ended</h3>
                <p className="text-sm text-emerald-700">Avoid early settlement penalties of 2-3%</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl">
                <h3 className="font-semibold text-emerald-800 mb-2">3. Break-even within 3 years</h3>
                <p className="text-sm text-emerald-700">Your savings should cover refinancing costs within 36 months</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl">
                <h3 className="font-semibold text-emerald-800 mb-2">4. Planning to stay long-term</h3>
                <p className="text-sm text-emerald-700">You plan to keep the property for at least 5 more years</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Refinancing Costs in Malaysia {currentYear}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-3 text-slate-600 font-semibold">Cost Item</th>
                    <th className="text-left py-3 text-slate-600 font-semibold">Amount</th>
                    <th className="text-left py-3 text-slate-600 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700">Legal Fees</td>
                    <td className="py-3 text-slate-800">0.5% - 1.0% of loan</td>
                    <td className="py-3 text-slate-500">Tiered rates apply</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700">Stamp Duty</td>
                    <td className="py-3 text-slate-800">0.5% of loan</td>
                    <td className="py-3 text-slate-500">Fixed rate</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700">Valuation Fee</td>
                    <td className="py-3 text-slate-800">RM300 - RM1,500</td>
                    <td className="py-3 text-slate-500">Based on property value</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700">Discharge Fee</td>
                    <td className="py-3 text-slate-800">RM200 - RM300</td>
                    <td className="py-3 text-slate-500">To release existing charge</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="py-3 font-semibold text-slate-800">Total Estimated</td>
                    <td className="py-3 font-bold text-slate-800">1.5% - 2.5% of loan</td>
                    <td className="py-3 text-slate-500"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800">
                <strong>Pro Tip:</strong> Look for &quot;Zero Entry Cost&quot; packages from banks like CIMB where the bank absorbs legal fees, valuation, and stamp duty.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Refinance vs Repricing: What&apos;s the Difference?</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-3 text-slate-600 font-semibold"></th>
                    <th className="text-left py-3 text-slate-600 font-semibold">Refinance</th>
                    <th className="text-left py-3 text-slate-600 font-semibold">Repricing</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700 font-medium">Definition</td>
                    <td className="py-3 text-slate-600">Move loan to different bank</td>
                    <td className="py-3 text-slate-600">Negotiate better rate with same bank</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700 font-medium">Costs</td>
                    <td className="py-3 text-slate-600">Higher (legal fees, stamp duty)</td>
                    <td className="py-3 text-slate-600">Lower (admin fee only, ~RM200)</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700 font-medium">Process</td>
                    <td className="py-3 text-slate-600">2-3 months</td>
                    <td className="py-3 text-slate-600">2-4 weeks</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700 font-medium">Rate reduction</td>
                    <td className="py-3 text-slate-600">Larger (can shop around)</td>
                    <td className="py-3 text-slate-600">Smaller (limited negotiation)</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-700 font-medium">Best for</td>
                    <td className="py-3 text-slate-600">Rate difference &gt; 0.5%</td>
                    <td className="py-3 text-slate-600">Rate difference &lt; 0.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-amber-50 rounded-xl">
              <p className="text-sm text-amber-800">
                <strong>Tip:</strong> Always try repricing first. If your bank refuses or offers minimal reduction, then consider refinancing.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Documents Required for Refinancing</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Personal Documents</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    MyKad (IC) copy
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Latest 3 months salary slips
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Latest 6 months bank statements
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Latest EPF statement
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    EA Form / Form B (tax)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Property Documents</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Original Sale & Purchase Agreement
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Land title / Strata title
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Current loan statement
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Property insurance policy
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Related Calculators */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Related Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/property/quit-rent-calculator-selangor/" className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">🏠</span>
              <h3 className="font-semibold text-slate-800 mt-2">Quit Rent Calculator</h3>
              <p className="text-sm text-slate-500">Calculate your annual quit rent</p>
            </a>
            <a href="/property/stamp-duty-calculator-malaysia/" className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">📋</span>
              <h3 className="font-semibold text-slate-800 mt-2">Stamp Duty Calculator</h3>
              <p className="text-sm text-slate-500">Calculate property stamp duty</p>
            </a>
            <a href="/loan/home-loan-calculator-malaysia/" className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">🏦</span>
              <h3 className="font-semibold text-slate-800 mt-2">Home Loan Calculator</h3>
              <p className="text-sm text-slate-500">Calculate monthly mortgage payments</p>
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      {showStickyCTA && calculation.monthlySavings > 0 && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-emerald-600 shadow-lg safe-area-bottom">
          <button
            onClick={() => setShowStickyCTA(false)}
            className="absolute top-1 right-1 p-1 text-white/70 hover:text-white"
            aria-label="Tutup"
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
              className="px-4 py-2 bg-white text-emerald-600 font-semibold rounded-lg text-sm"
            >
              Semak →
            </button>
          </div>
        </div>
      )}

      {/* Lead Capture Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">
                  {capturedCalc && capturedCalc.monthlySavings > 200
                    ? `Kunci Penjimatan ${formatCurrency(capturedCalc.monthlySavings)}/bulan`
                    : "Dapatkan Nasihat Pakar Percuma"}
                </h3>
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
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Terima kasih!</h4>
                  <p className="text-slate-600">
                    Pakar pinjaman kami akan menghubungi anda dalam masa 24 jam untuk membincangkan pilihan refinance terbaik.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Calculation Summary */}
                  {capturedCalc && (
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                      <p className="text-sm font-medium text-emerald-800 mb-2">Ringkasan Kiraan Anda:</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-slate-600">Baki Pinjaman:</div>
                        <div className="font-medium text-slate-800">{formatCurrency(capturedCalc.outstandingLoan)}</div>
                        <div className="text-slate-600">Kadar Semasa:</div>
                        <div className="font-medium text-slate-800">{capturedCalc.currentRate.toFixed(2)}%</div>
                        <div className="text-slate-600">Kadar Baru:</div>
                        <div className="font-medium text-emerald-600">{capturedCalc.newRate.toFixed(2)}%</div>
                        <div className="text-slate-600">Jimat Bulanan:</div>
                        <div className="font-bold text-emerald-600">{formatCurrency(capturedCalc.monthlySavings)}</div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Penuh *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Masukkan nama anda"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nombor WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="cth. 012-3456789"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 rounded-xl text-white font-semibold transition-all"
                  >
                    {isSubmitting ? "Menghantar..." : "Hubungi Saya →"}
                  </button>

                  {/* Trust Elements */}
                  <div className="text-center space-y-1">
                    <p className="text-xs text-emerald-600">
                      ✓ 245 pemilik rumah telah semak kelayakan bulan ini
                    </p>
                    <p className="text-xs text-slate-500">
                      🔒 Maklumat anda selamat dan tidak akan dikongsi
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Desktop CTA Stack */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col items-end gap-3">
        {showBackToTop && (
          <button onClick={scrollToTop} className="w-10 h-10 bg-white border border-slate-200 rounded-full shadow-md hover:bg-slate-50 transition-all flex items-center justify-center" aria-label="Back to top">
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
          </button>
        )}
        {showFloatingCTA && (
          <>
            <div className="bg-white px-3 py-1.5 rounded-full shadow-md text-xs text-slate-500">{"\u2713"} RM48M in loans processed · 300+ approvals</div>
            <button onClick={scrollToTop} className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-full shadow-lg transition-all">
              Check Eligibility →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
