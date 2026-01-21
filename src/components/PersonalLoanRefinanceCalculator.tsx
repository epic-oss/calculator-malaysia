"use client";

import { useState, useMemo } from "react";

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

const BANK_RATES = [
  { name: "CIMB Cash Plus", rate: 4.38, maxAmount: 100000, maxTenure: 5, notes: "Lowest rate" },
  { name: "Bank Rakyat", rate: 4.50, maxAmount: 200000, maxTenure: 10, notes: "Members only" },
  { name: "Maybank Personal Loan", rate: 5.00, maxAmount: 150000, maxTenure: 7, notes: "" },
  { name: "Public Bank", rate: 5.50, maxAmount: 150000, maxTenure: 7, notes: "" },
  { name: "RHB", rate: 5.88, maxAmount: 150000, maxTenure: 7, notes: "" },
  { name: "Hong Leong", rate: 6.00, maxAmount: 100000, maxTenure: 5, notes: "" },
  { name: "AmBank", rate: 6.50, maxAmount: 150000, maxTenure: 7, notes: "" },
  { name: "Alliance Bank", rate: 6.88, maxAmount: 100000, maxTenure: 5, notes: "" },
  { name: "AEON Credit", rate: 12.00, maxAmount: 50000, maxTenure: 5, notes: "Easier approval" },
];

const DEBT_TYPES = ["Credit Card", "Personal Loan", "Car Loan", "BNPL", "Other"];

const TENURE_OPTIONS = [1, 2, 3, 4, 5, 6, 7];


interface Debt {
  id: string;
  type: string;
  amount: number;
  rate: number;
  monthlyPayment: number;
}

// Personal loan uses FLAT RATE calculation
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

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatCurrencyDecimal(amount: number): string {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function PersonalLoanRefinanceCalculator() {
  const currentYear = new Date().getFullYear();

  // Debts state
  const [debts, setDebts] = useState<Debt[]>([
    { id: "1", type: "Credit Card", amount: 15000, rate: 18, monthlyPayment: 500 },
    { id: "2", type: "Personal Loan", amount: 20000, rate: 8, monthlyPayment: 450 },
  ]);

  // New loan state
  const [selectedBank, setSelectedBank] = useState("CIMB Cash Plus");
  const [newRate, setNewRate] = useState(4.38);
  const [newTenure, setNewTenure] = useState(5);
  const [processingFeeRate, setProcessingFeeRate] = useState(1);
  const [monthlyIncome, setMonthlyIncome] = useState(5000);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
  });

  // Add new debt
  const addDebt = () => {
    if (debts.length >= 5) return;
    const newId = String(Date.now());
    setDebts([...debts, { id: newId, type: "Credit Card", amount: 5000, rate: 18, monthlyPayment: 200 }]);
  };

  // Remove debt
  const removeDebt = (id: string) => {
    if (debts.length <= 1) return;
    setDebts(debts.filter(d => d.id !== id));
  };

  // Update debt
  const updateDebt = (id: string, field: keyof Debt, value: number | string) => {
    setDebts(debts.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  // Handle bank selection
  const handleBankChange = (bankName: string) => {
    setSelectedBank(bankName);
    const bank = BANK_RATES.find(b => b.name === bankName);
    if (bank) {
      setNewRate(bank.rate);
      if (newTenure > bank.maxTenure) {
        setNewTenure(bank.maxTenure);
      }
    }
  };

  const calculation = useMemo(() => {
    // Current debts summary
    const totalDebt = debts.reduce((sum, d) => sum + d.amount, 0);
    const totalMonthlyPayment = debts.reduce((sum, d) => sum + d.monthlyPayment, 0);
    const weightedAverageRate = totalDebt > 0
      ? debts.reduce((sum, d) => sum + (d.amount * d.rate), 0) / totalDebt
      : 0;

    // Estimate current total interest based on remaining payments
    // Assuming average remaining tenure of 3 years for existing debts
    const estimatedCurrentTotalInterest = debts.reduce((sum, d) => {
      // For credit cards, interest is revolving - estimate based on balance
      if (d.type === "Credit Card") {
        // Credit cards: estimate 2 years to pay off at current rate
        return sum + (d.amount * (d.rate / 100) * 2);
      }
      // For loans, estimate remaining interest
      const estimatedYears = d.monthlyPayment > 0 ? Math.min(d.amount / (d.monthlyPayment * 12) * 1.5, 5) : 3;
      return sum + calculateTotalInterest(d.amount, d.rate * 0.55, estimatedYears); // Approximate effective to flat conversion
    }, 0);

    const currentTotalPayment = totalDebt + estimatedCurrentTotalInterest;

    // New consolidation loan
    const processingFee = totalDebt * (processingFeeRate / 100);
    const newLoanAmount = totalDebt; // Processing fee usually deducted from disbursement

    const newMonthly = calculateFlatRateMonthly(newLoanAmount, newRate, newTenure);
    const newTotalInterest = calculateTotalInterest(newLoanAmount, newRate, newTenure);
    const newTotalPayment = newLoanAmount + newTotalInterest;

    const monthlySavings = totalMonthlyPayment - newMonthly;
    const yearlySavings = monthlySavings * 12;
    const totalInterestSavings = estimatedCurrentTotalInterest - newTotalInterest;

    // Estimate time to debt-free
    const currentTimeToPayoff = totalMonthlyPayment > 0 ? Math.ceil(totalDebt / (totalMonthlyPayment * 0.5) / 12) : 5; // rough estimate
    const newTimeToPayoff = newTenure;

    // DSR Calculation
    const dsr = monthlyIncome > 0 ? (newMonthly / monthlyIncome) * 100 : 0;
    let dsrStatus: "good" | "warning" | "high";
    let dsrText: string;

    if (dsr <= 40) {
      dsrStatus = "good";
      dsrText = "Likely Eligible";
    } else if (dsr <= 70) {
      dsrStatus = "warning";
      dsrText = "May need lower amount";
    } else {
      dsrStatus = "high";
      dsrText = "High DSR";
    }

    let recommendation: "good" | "neutral" | "bad";
    let recommendationText: string;

    const rateReduction = weightedAverageRate - newRate;

    if (monthlySavings > 100 && rateReduction > 2) {
      recommendation = "good";
      recommendationText = `Debt consolidation is RECOMMENDED! You'll save ${formatCurrency(totalInterestSavings > 0 ? totalInterestSavings : monthlySavings * newTenure * 12)} over the loan period.`;
    } else if (monthlySavings > 50) {
      recommendation = "neutral";
      recommendationText = "Debt consolidation is WORTHWHILE. Consider if you can avoid taking new debts after consolidating.";
    } else {
      recommendation = "bad";
      recommendationText = "Debt consolidation may NOT be worth it. Focus on paying off highest-rate debt first using the debt avalanche method.";
    }

    return {
      totalDebt,
      totalMonthlyPayment,
      weightedAverageRate,
      estimatedCurrentTotalInterest,
      currentTotalPayment,
      newMonthly,
      newTotalInterest,
      newTotalPayment,
      monthlySavings,
      yearlySavings,
      totalInterestSavings,
      processingFee,
      currentTimeToPayoff,
      newTimeToPayoff,
      recommendation,
      recommendationText,
      rateReduction,
      dsr,
      dsrStatus,
      dsrText,
    };
  }, [debts, newRate, newTenure, processingFeeRate, monthlyIncome]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get debt types from calculator inputs
    const debtTypesFromCalc = Array.from(new Set(debts.map(d => d.type))).join(", ");

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          calculator_type: "personal_loan_refinance",
          source_url: typeof window !== "undefined" ? window.location.href : "",
          // Auto-captured from calculator
          total_debt: calculation.totalDebt,
          debt_types: debtTypesFromCalc,
          new_payment: calculation.newMonthly,
          savings: calculation.monthlySavings,
          weighted_avg_rate: calculation.weightedAverageRate,
          monthly_income: monthlyIncome,
          dsr: calculation.dsr,
          selected_bank: selectedBank,
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

  const selectedBankData = BANK_RATES.find(b => b.name === selectedBank);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2 text-slate-500">
            <li><a href="/" className="hover:text-slate-700">Home</a></li>
            <li>/</li>
            <li><a href="/?category=loan#calculators" className="hover:text-slate-700">Loans</a></li>
            <li>/</li>
            <li className="text-slate-700">Personal Loan Refinance Calculator</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Personal Loan Refinance Calculator Malaysia {currentYear}
        </h1>
        <p className="text-center text-slate-500 mb-8">
          Calculate how much you can save by consolidating high-interest debts into one lower-rate loan
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="space-y-6">
              {/* Section 1: Current Debts */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <span className="text-xl">💳</span>
                  Your Current Debts
                </h2>

                <div className="space-y-4">
                  {debts.map((debt, index) => (
                    <div key={debt.id} className="p-4 bg-slate-50 rounded-xl relative">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium text-slate-700">Debt {index + 1}</span>
                        {debts.length > 1 && (
                          <button
                            onClick={() => removeDebt(debt.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Debt Type */}
                        <div className="col-span-2">
                          <label className="block text-xs font-medium text-slate-500 mb-1">Debt Type</label>
                          <select
                            value={debt.type}
                            onChange={(e) => {
                              updateDebt(debt.id, "type", e.target.value);
                              // Auto-set typical rates based on type
                              if (e.target.value === "Credit Card") {
                                updateDebt(debt.id, "rate", 18);
                              } else if (e.target.value === "Personal Loan") {
                                updateDebt(debt.id, "rate", 8);
                              } else if (e.target.value === "Car Loan") {
                                updateDebt(debt.id, "rate", 5);
                              } else if (e.target.value === "BNPL") {
                                updateDebt(debt.id, "rate", 15);
                              }
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {DEBT_TYPES.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>

                        {/* Outstanding Amount */}
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">Outstanding (RM)</label>
                          <input
                            type="number"
                            value={debt.amount}
                            onChange={(e) => updateDebt(debt.id, "amount", Number(e.target.value))}
                            min={1000}
                            max={100000}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Interest Rate */}
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">Rate (% p.a.)</label>
                          <input
                            type="number"
                            value={debt.rate}
                            onChange={(e) => updateDebt(debt.id, "rate", Number(e.target.value))}
                            min={3}
                            max={24}
                            step={0.5}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Monthly Payment */}
                        <div className="col-span-2">
                          <label className="block text-xs font-medium text-slate-500 mb-1">Monthly Payment (RM)</label>
                          <input
                            type="number"
                            value={debt.monthlyPayment}
                            onChange={(e) => updateDebt(debt.id, "monthlyPayment", Number(e.target.value))}
                            min={50}
                            max={10000}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Debt Button */}
                  {debts.length < 5 && (
                    <button
                      onClick={addDebt}
                      className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Another Debt
                    </button>
                  )}

                  {/* Summary Box */}
                  <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl p-4 mt-4">
                    <h3 className="font-semibold text-slate-700 mb-3">Current Debts Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Outstanding</span>
                        <span className="font-bold text-slate-800">{formatCurrency(calculation.totalDebt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Monthly Payments</span>
                        <span className="font-bold text-slate-800">{formatCurrency(calculation.totalMonthlyPayment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Weighted Average Rate</span>
                        <span className="font-bold text-red-600">{calculation.weightedAverageRate.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: New Consolidation Loan */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <span className="text-xl">🏦</span>
                  New Consolidation Loan
                </h2>

                <div className="space-y-4">
                  {/* Select Bank */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Select Bank</label>
                    <select
                      value={selectedBank}
                      onChange={(e) => handleBankChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      {BANK_RATES.map(bank => (
                        <option key={bank.name} value={bank.name}>
                          {bank.name} - {bank.rate.toFixed(2)}% p.a.
                          {bank.notes ? ` (${bank.notes})` : ""}
                        </option>
                      ))}
                    </select>
                    {selectedBankData && (
                      <p className="text-xs text-slate-500 mt-1">
                        Max: {formatCurrency(selectedBankData.maxAmount)} | Up to {selectedBankData.maxTenure} years
                      </p>
                    )}
                  </div>

                  {/* New Interest Rate */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      New Interest Rate (% p.a. flat)
                    </label>
                    <input
                      type="number"
                      value={newRate}
                      onChange={(e) => setNewRate(Math.max(3, Math.min(15, Number(e.target.value))))}
                      min={3}
                      max={15}
                      step={0.1}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      {TENURE_OPTIONS.filter(t => !selectedBankData || t <= selectedBankData.maxTenure).map((tenure) => (
                        <option key={tenure} value={tenure}>{tenure} year{tenure > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>

                  {/* Processing Fee */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Processing Fee (%)
                    </label>
                    <input
                      type="number"
                      value={processingFeeRate}
                      onChange={(e) => setProcessingFeeRate(Math.max(0, Math.min(3, Number(e.target.value))))}
                      min={0}
                      max={3}
                      step={0.5}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Fee amount: {formatCurrency(calculation.processingFee)}
                    </p>
                  </div>

                  {/* Monthly Income for DSR */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Monthly Income (RM)
                    </label>
                    <input
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Math.max(1000, Number(e.target.value)))}
                      min={1000}
                      max={100000}
                      step={100}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* DSR Display */}
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-700">Your DSR:</span>
                      <span className={`font-bold ${
                        calculation.dsrStatus === "good" ? "text-emerald-600" :
                        calculation.dsrStatus === "warning" ? "text-amber-600" : "text-red-600"
                      }`}>
                        {calculation.dsr.toFixed(1)}%
                      </span>
                    </div>
                    <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`absolute left-0 top-0 h-full rounded-full transition-all ${
                          calculation.dsrStatus === "good" ? "bg-emerald-500" :
                          calculation.dsrStatus === "warning" ? "bg-amber-500" : "bg-red-500"
                        }`}
                        style={{ width: `${Math.min(calculation.dsr, 100)}%` }}
                      />
                      {/* 70% limit marker */}
                      <div className="absolute top-0 h-full w-0.5 bg-slate-600" style={{ left: "70%" }} />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className={`text-xs font-medium ${
                        calculation.dsrStatus === "good" ? "text-emerald-600" :
                        calculation.dsrStatus === "warning" ? "text-amber-600" : "text-red-600"
                      }`}>
                        {calculation.dsrText}
                      </span>
                      <span className="text-xs text-slate-500">70% limit</span>
                    </div>
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
                    : "You would pay more with consolidation"}
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
                        <th className="text-right py-3 text-slate-500 font-medium">Consolidated</th>
                        <th className="text-right py-3 text-emerald-600 font-medium">Savings</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 text-slate-600">Monthly Payment</td>
                        <td className="text-right py-3 font-medium text-slate-800">{formatCurrency(calculation.totalMonthlyPayment)}</td>
                        <td className="text-right py-3 font-medium text-slate-800">{formatCurrency(calculation.newMonthly)}</td>
                        <td className={`text-right py-3 font-bold ${calculation.monthlySavings > 0 ? "text-emerald-600" : "text-red-600"}`}>
                          {calculation.monthlySavings > 0 ? "+" : ""}{formatCurrency(calculation.monthlySavings)}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 text-slate-600">Average Interest</td>
                        <td className="text-right py-3 font-medium text-red-600">{calculation.weightedAverageRate.toFixed(2)}%</td>
                        <td className="text-right py-3 font-medium text-emerald-600">{newRate.toFixed(2)}%</td>
                        <td className="text-right py-3 font-bold text-emerald-600">
                          -{calculation.rateReduction.toFixed(2)}%
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 text-slate-600">Total Interest</td>
                        <td className="text-right py-3 font-medium text-slate-800">{formatCurrency(calculation.estimatedCurrentTotalInterest)}</td>
                        <td className="text-right py-3 font-medium text-slate-800">{formatCurrency(calculation.newTotalInterest)}</td>
                        <td className={`text-right py-3 font-bold ${calculation.totalInterestSavings > 0 ? "text-emerald-600" : "text-red-600"}`}>
                          {calculation.totalInterestSavings > 0 ? "+" : ""}{formatCurrency(calculation.totalInterestSavings)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-slate-600">Time to Debt-Free</td>
                        <td className="text-right py-3 font-medium text-slate-800">~{calculation.currentTimeToPayoff} years</td>
                        <td className="text-right py-3 font-medium text-slate-800">{calculation.newTimeToPayoff} years</td>
                        <td className="text-right py-3 text-slate-400">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Debt Breakdown */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Debt Consolidation Breakdown</h3>
                <div className="space-y-3">
                  {debts.map((debt) => (
                    <div key={debt.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-700">{debt.type}</p>
                        <p className="text-sm text-slate-500">
                          {formatCurrency(debt.amount)} @ {debt.rate}%
                        </p>
                      </div>
                      <span className="text-emerald-600 font-medium flex items-center gap-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Paid off
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                    <div>
                      <p className="font-medium text-emerald-700">New Consolidated Loan</p>
                      <p className="text-sm text-emerald-600">
                        {formatCurrency(calculation.totalDebt)} @ {newRate}%
                      </p>
                    </div>
                    <span className="text-emerald-700 font-bold">
                      {formatCurrencyDecimal(calculation.newMonthly)}/mo
                    </span>
                  </div>
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

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💰</span>
                  <h3 className="text-lg font-bold text-slate-800">Get the Best Debt Consolidation Rates</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Compare offers from 10+ banks. Free consultation.
                </p>
                <button
                  onClick={() => setShowModal(true)}
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
            Personal Loan Interest Rates in Malaysia {currentYear}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 text-slate-600 font-semibold">Bank</th>
                  <th className="text-right py-3 px-4 text-slate-600 font-semibold">Interest Rate</th>
                  <th className="text-right py-3 px-4 text-slate-600 font-semibold">Max Amount</th>
                  <th className="text-right py-3 px-4 text-slate-600 font-semibold">Max Tenure</th>
                  <th className="text-left py-3 px-4 text-slate-600 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {BANK_RATES.map((bank, index) => (
                  <tr key={bank.name} className={index % 2 === 0 ? "bg-slate-50" : ""}>
                    <td className="py-3 px-4 font-medium text-slate-800">{bank.name}</td>
                    <td className="text-right py-3 px-4 font-bold text-emerald-600">
                      {bank.rate.toFixed(2)}% p.a.
                    </td>
                    <td className="text-right py-3 px-4 text-slate-600">
                      {formatCurrency(bank.maxAmount)}
                    </td>
                    <td className="text-right py-3 px-4 text-slate-600">
                      {bank.maxTenure} years
                    </td>
                    <td className="py-3 px-4 text-slate-500">{bank.notes}</td>
                  </tr>
                ))}
                <tr className="bg-red-50">
                  <td className="py-3 px-4 font-medium text-red-800">Credit Cards</td>
                  <td className="text-right py-3 px-4 font-bold text-red-600">
                    15-18% p.a.
                  </td>
                  <td className="text-right py-3 px-4 text-slate-600">-</td>
                  <td className="text-right py-3 px-4 text-slate-600">Revolving</td>
                  <td className="py-3 px-4 text-red-600">Highest rate - avoid!</td>
                </tr>
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
            <h2 className="text-xl font-bold text-slate-800 mb-4">What is Personal Loan Refinancing / Debt Consolidation?</h2>
            <p className="text-slate-600 leading-relaxed">
              Personal loan refinancing (also called debt consolidation) means combining multiple high-interest debts into a single loan with a lower interest rate. This helps you:
            </p>
            <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
              <li>Pay one monthly installment instead of many</li>
              <li>Reduce total interest paid</li>
              <li>Become debt-free faster</li>
            </ul>
            <div className="mt-4 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800">
                <strong>Common debts people consolidate:</strong> Credit card balances (15-18% interest), multiple personal loans, BNPL (Buy Now Pay Later) debts, and car loans with high interest.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">When Should You Consolidate Your Debts?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 rounded-xl">
                <h3 className="font-semibold text-emerald-800 mb-2">✅ Good Time to Consolidate:</h3>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• You have credit card debt at 15-18%</li>
                  <li>• Multiple loans & struggle to track payments</li>
                  <li>• Credit score improved since original loans</li>
                  <li>• Want to simplify with one payment</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 rounded-xl">
                <h3 className="font-semibold text-red-800 mb-2">❌ Bad Time to Consolidate:</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Your debts are almost paid off</li>
                  <li>• You&apos;ll take on new debt after</li>
                  <li>• New loan has higher total interest</li>
                  <li>• Have spending habits that caused debt</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Debt Consolidation: Pros and Cons</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-emerald-700 mb-3">✅ Pros:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    Lower interest rate (5-8% vs 15-18% credit card)
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    Single monthly payment
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    Fixed repayment schedule
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    Potential credit score improvement
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-700 mb-3">❌ Cons:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-red-500 mt-0.5">✗</span>
                    May pay more if tenure is longer
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-red-500 mt-0.5">✗</span>
                    Processing fees (1-2%)
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-red-500 mt-0.5">✗</span>
                    Temptation to use credit cards again
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-red-500 mt-0.5">✗</span>
                    Need good credit score to qualify
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Documents Required</h2>
            <div className="grid md:grid-cols-2 gap-4">
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
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-600">
                  <span className="text-emerald-500">✓</span>
                  Latest EPF statement
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <span className="text-emerald-500">✓</span>
                  List of current debts/loan statements
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Step-by-Step: How to Consolidate Debts</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-slate-700">List all your debts</h3>
                  <p className="text-sm text-slate-600">Amount, rate, monthly payment for each</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Check your credit score</h3>
                  <p className="text-sm text-slate-600">Via CTOS or CCRIS - affects approval & rate</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Compare bank offers</h3>
                  <p className="text-sm text-slate-600">Use our calculator above to find savings</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Apply for consolidation loan</h3>
                  <p className="text-sm text-slate-600">Choose bank with lowest rate you qualify for</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">5</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Pay off all existing debts</h3>
                  <p className="text-sm text-slate-600">Use new loan funds immediately</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold shrink-0">6</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Cut up credit cards!</h3>
                  <p className="text-sm text-slate-600">Avoid new debt - this is the most important step</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">What&apos;s the difference between refinancing and debt consolidation?</h3>
                <p className="text-slate-600 text-sm">They&apos;re similar. Refinancing usually means replacing ONE loan with a better one. Debt consolidation means combining MULTIPLE debts into one loan.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">Will debt consolidation hurt my credit score?</h3>
                <p className="text-slate-600 text-sm">Short-term, there&apos;s a small dip from the credit check. Long-term, it can improve your score if you make timely payments.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">Can I consolidate debt with bad credit?</h3>
                <p className="text-slate-600 text-sm">It&apos;s harder, but some lenders like AEON Credit have easier approval. Rates will be higher though.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">Should I consolidate small debts?</h3>
                <p className="text-slate-600 text-sm">Usually not worth it for debts under RM5,000 total. The processing fee may outweigh savings.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">What happens to my credit cards after consolidation?</h3>
                <p className="text-slate-600 text-sm">They remain open unless you close them. Be careful not to rack up new debt!</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Is 0% balance transfer better than consolidation loan?</h3>
                <p className="text-slate-600 text-sm">0% balance transfer is great short-term, but usually only 6-12 months. Consolidation loan is better for larger amounts needing longer repayment.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Related Calculators */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Related Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/credit-card/credit-card-interest-calculator-malaysia/" className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">💳</span>
              <h3 className="font-semibold text-slate-800 mt-2">Credit Card Interest Calculator</h3>
              <p className="text-sm text-slate-500">See how credit card interest adds up</p>
            </a>
            <a href="/property/refinance-housing-loan-calculator-malaysia/" className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">🏠</span>
              <h3 className="font-semibold text-slate-800 mt-2">Housing Loan Refinance</h3>
              <p className="text-sm text-slate-500">Refinance your home loan</p>
            </a>
            <a href="/auto/car-refinance-calculator-malaysia/" className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">🚗</span>
              <h3 className="font-semibold text-slate-800 mt-2">Car Refinance Calculator</h3>
              <p className="text-sm text-slate-500">Refinance your car loan</p>
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
                <h3 className="text-xl font-bold text-slate-800">Get Your Free Debt Consolidation Quote</h3>
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
                    Our loan specialist will contact you within 24 hours to discuss the best debt consolidation options for you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Calculator Summary */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-2">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Your Calculation Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Debt:</span>
                        <span className="font-bold text-slate-800">{formatCurrency(calculation.totalDebt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">New Payment:</span>
                        <span className="font-bold text-slate-800">{formatCurrency(calculation.newMonthly)}/mo</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Potential Savings:</span>
                        <span className={`font-bold ${calculation.monthlySavings > 0 ? "text-emerald-600" : "text-red-600"}`}>
                          {formatCurrency(calculation.monthlySavings)}/mo
                        </span>
                      </div>
                    </div>
                  </div>

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
    </div>
  );
}
