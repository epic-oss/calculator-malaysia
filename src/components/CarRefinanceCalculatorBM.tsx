"use client";

import { useState, useMemo } from "react";

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

const LENDER_RATES = [
  { name: "Toyota Capital", minRate: 3.5, maxRate: 4.5, notes: "Kereta Toyota sahaja" },
  { name: "Public Bank", minRate: 3.5, maxRate: 4.8, notes: "" },
  { name: "Maybank", minRate: 3.5, maxRate: 5.0, notes: "Bergantung pada usia kereta & kredit" },
  { name: "RHB", minRate: 3.6, maxRate: 5.2, notes: "" },
  { name: "CIMB", minRate: 3.8, maxRate: 5.5, notes: "" },
  { name: "Hong Leong", minRate: 3.8, maxRate: 5.5, notes: "" },
  { name: "AmBank", minRate: 4.0, maxRate: 6.0, notes: "" },
  { name: "Bank Rakyat", minRate: 4.2, maxRate: 5.8, notes: "" },
  { name: "AEON Credit", minRate: 5.0, maxRate: 8.0, notes: "Kelulusan lebih mudah" },
];

const TENURE_OPTIONS = [1, 2, 3, 4, 5, 6, 7];

const LOAN_RANGES = [
  "Bawah RM30,000",
  "RM30,000 - RM50,000",
  "RM50,000 - RM80,000",
  "RM80,000 - RM100,000",
  "Atas RM100,000",
];

const INCOME_RANGES = [
  "Bawah RM3,000",
  "RM3,000 - RM5,000",
  "RM5,000 - RM8,000",
  "RM8,000 - RM10,000",
  "Atas RM10,000",
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

export default function CarRefinanceCalculatorBM() {
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
      recommendationText = "Refinance kereta TIDAK disyorkan. Bayaran bulanan baru anda akan lebih tinggi daripada bayaran semasa.";
    } else if (breakEvenMonths <= 12) {
      recommendation = "good";
      recommendationText = `Refinance kereta DISYORKAN! Anda akan pulang modal dalam ${breakEvenMonths} bulan.`;
    } else if (breakEvenMonths <= 24) {
      recommendation = "neutral";
      recommendationText = "Refinance kereta BERBALOI jika anda bercadang untuk menyimpan kereta ini selama 2+ tahun lagi.";
    } else {
      recommendation = "bad";
      recommendationText = "Refinance kereta TIDAK disyorkan. Pertimbangkan pilihan lain.";
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
    return new Intl.NumberFormat("ms-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCurrencyDecimal = (amount: number) => {
    return new Intl.NumberFormat("ms-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
          calculator_type: "car_loan_refinance_bm",
          source_url: typeof window !== "undefined" ? window.location.href : "",
          calculation_summary: {
            car_value: carValue,
            outstanding_loan: outstandingLoan,
            current_rate: currentRate,
            new_rate: newRate,
            monthly_savings: calculation.monthlySavings,
          },
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
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2 text-slate-500">
            <li><a href="/" className="hover:text-slate-700">Utama</a></li>
            <li>/</li>
            <li><a href="/?category=auto#calculators" className="hover:text-slate-700">Auto</a></li>
            <li>/</li>
            <li className="text-slate-700">Kalkulator Refinance Kereta</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Kalkulator Refinance Kereta Malaysia {currentYear}
        </h1>
        <p className="text-center text-slate-500 mb-8">
          Kira berapa anda boleh jimat dengan refinance pinjaman kereta anda
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="space-y-6">
              {/* Section 1: Current Car Loan */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <span className="text-xl">🚗</span>
                  Pinjaman Kereta Semasa
                </h2>

                <div className="space-y-4">
                  {/* Car Value */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nilai Pasaran Kereta
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
                      Semak mudah.my atau carlist.my untuk nilai pasaran
                    </p>
                  </div>

                  {/* Outstanding Loan */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Baki Pinjaman
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
                      Kadar Faedah Semasa (% p.a. flat)
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
                      Baki Tempoh (Tahun)
                    </label>
                    <select
                      value={remainingTenure}
                      onChange={(e) => setRemainingTenure(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      {TENURE_OPTIONS.map((tenure) => (
                        <option key={tenure} value={tenure}>{tenure} tahun</option>
                      ))}
                    </select>
                  </div>

                  {/* Current Monthly Payment (Calculated) */}
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-sm text-slate-500">Bayaran Bulanan Semasa</p>
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
                  Pinjaman Refinance Baru
                </h2>

                <div className="space-y-4">
                  {/* New Interest Rate */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Kadar Faedah Baru (% p.a. flat)
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
                      Kadar pasaran semasa: 3.5% - 5.5% p.a.
                    </p>
                  </div>

                  {/* New Tenure */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Tempoh Pinjaman Baru (Tahun)
                    </label>
                    <select
                      value={newTenure}
                      onChange={(e) => setNewTenure(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      {TENURE_OPTIONS.map((tenure) => (
                        <option key={tenure} value={tenure}>{tenure} tahun</option>
                      ))}
                    </select>
                    <p className="text-xs text-slate-500 mt-1">
                      Tempoh maksimum bergantung pada usia kereta (kereta mesti &lt;10 tahun pada akhir pinjaman)
                    </p>
                  </div>

                  {/* Cash Out Toggle */}
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">Termasuk Cash Out</p>
                      <p className="text-xs text-slate-500">Dapatkan tunai tambahan berdasarkan ekuiti kereta</p>
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
                        Jumlah Cash Out (RM)
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
                        Ekuiti kereta anda: {formatCurrency(carEquity)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 3: Refinancing Costs */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <span className="text-xl">💰</span>
                  Kos Refinance
                </h2>

                <div className="space-y-4">
                  {/* Early Settlement Penalty */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Penalti Penyelesaian Awal (%)
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
                      Jumlah penalti: {formatCurrency(outstandingLoan * (penaltyRate / 100))}
                    </p>
                  </div>

                  {/* Processing Fee */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Yuran Pemprosesan (RM)
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
                  Penjimatan Bulanan Anda
                </h2>
                <p className="text-5xl font-bold mb-2">
                  {calculation.monthlySavings > 0 ? formatCurrency(calculation.monthlySavings) : "-" + formatCurrency(Math.abs(calculation.monthlySavings))}
                </p>
                <p className="opacity-80">
                  {calculation.monthlySavings > 0
                    ? `Jimat ${formatCurrency(calculation.yearlySavings)} setahun`
                    : "Anda akan membayar lebih dengan refinancing"}
                </p>
              </div>

              {/* Comparison Table */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Perbandingan Pinjaman</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 text-slate-500 font-medium"></th>
                        <th className="text-right py-3 text-slate-500 font-medium">Semasa</th>
                        <th className="text-right py-3 text-slate-500 font-medium">Refinance</th>
                        <th className="text-right py-3 text-emerald-600 font-medium">Penjimatan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 text-slate-600">Bayaran Bulanan</td>
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
                          <td className="text-right py-3 text-blue-600 text-xs">dikeluarkan</td>
                        </tr>
                      )}
                      <tr className="border-b border-slate-100">
                        <td className="py-3 text-slate-600">Kadar Faedah</td>
                        <td className="text-right py-3 font-medium text-slate-800">{currentRate.toFixed(1)}%</td>
                        <td className="text-right py-3 font-medium text-slate-800">{newRate.toFixed(1)}%</td>
                        <td className="text-right py-3 font-bold text-emerald-600">
                          -{(currentRate - newRate).toFixed(1)}%
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 text-slate-600">Tempoh Pinjaman</td>
                        <td className="text-right py-3 font-medium text-slate-800">{remainingTenure} tahun</td>
                        <td className="text-right py-3 font-medium text-slate-800">{newTenure} tahun</td>
                        <td className="text-right py-3 text-slate-400">-</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 text-slate-600">Jumlah Faedah</td>
                        <td className="text-right py-3 font-medium text-slate-800">{formatCurrency(calculation.currentTotalInterest)}</td>
                        <td className="text-right py-3 font-medium text-slate-800">{formatCurrency(calculation.newTotalInterest)}</td>
                        <td className={`text-right py-3 font-bold ${calculation.totalInterestSavings > 0 ? "text-emerald-600" : "text-red-600"}`}>
                          {calculation.totalInterestSavings > 0 ? "+" : ""}{formatCurrency(calculation.totalInterestSavings)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-slate-600">Jumlah Bayaran</td>
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
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Analisis Pulang Modal</h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Penalti Penyelesaian Awal</span>
                    <span className="font-bold text-slate-800">{formatCurrency(calculation.earlySettlementPenalty)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Yuran Pemprosesan</span>
                    <span className="font-bold text-slate-800">{formatCurrency(processingFee)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-600">Jumlah Kos Refinance</span>
                    <span className="font-bold text-slate-800">{formatCurrency(calculation.totalCosts)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Penjimatan Bulanan</span>
                    <span className="font-bold text-slate-800">{formatCurrency(calculation.monthlySavings)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tempoh Pulang Modal</span>
                    <span className="font-bold text-emerald-600">
                      {calculation.breakEvenMonths === Infinity ? "N/A" : `${calculation.breakEvenMonths} bulan`}
                    </span>
                  </div>

                  {/* Progress bar */}
                  {calculation.monthlySavings > 0 && calculation.breakEvenMonths !== Infinity && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Mula</span>
                        <span>Pulang modal ({calculation.breakEvenMonths} bln)</span>
                        <span>24 bulan</span>
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
                      Cadangan
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
                  <h3 className="text-lg font-semibold text-slate-700 mb-4">Pecahan Ekuiti Kereta</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Nilai Pasaran Kereta</span>
                      <span className="text-slate-800">{formatCurrency(carValue)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Baki Pinjaman</span>
                      <span className="text-slate-800">- {formatCurrency(outstandingLoan)}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                      <span className="font-medium text-slate-700">Ekuiti Kereta Anda</span>
                      <span className={`font-semibold ${carEquity >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {formatCurrency(carEquity)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Jumlah Cash Out</span>
                      <span className="text-blue-600">{formatCurrency(cashOutAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                      <span className="font-medium text-slate-700">Jumlah Pinjaman Baru</span>
                      <span className="font-semibold text-slate-800">{formatCurrency(calculation.newLoanAmount)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🚗</span>
                  <h3 className="text-lg font-bold text-slate-800">Dapatkan Kadar Refinance Kereta Terbaik</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Bandingkan tawaran dari 10+ bank. Percuma, tanpa komitmen.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Semak Kelayakan Saya
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
            Kadar Faedah Refinance Kereta di Malaysia {currentYear}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 text-slate-600 font-semibold">Pemberi Pinjaman</th>
                  <th className="text-right py-3 px-4 text-slate-600 font-semibold">Kadar Faedah</th>
                  <th className="text-left py-3 px-4 text-slate-600 font-semibold">Nota</th>
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
            * Kadar adalah anggaran dan tertakluk kepada penilaian kredit. Januari {currentYear}
          </p>
        </div>

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Apa Itu Refinance Kereta?</h2>
            <p className="text-slate-600 leading-relaxed">
              Refinance kereta bermaksud menggantikan pinjaman kereta sedia ada anda dengan pinjaman baru pada terma yang lebih baik. Anda boleh:
            </p>
            <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
              <li>Mendapatkan kadar faedah yang lebih rendah</li>
              <li>Memanjangkan tempoh untuk mengurangkan bayaran bulanan</li>
              <li>Mengeluarkan tunai dari ekuiti kereta anda (cash out)</li>
            </ul>
            <div className="mt-4 p-4 bg-amber-50 rounded-xl">
              <p className="text-sm text-amber-800">
                <strong>Nota:</strong> Pinjaman kereta Malaysia menggunakan KADAR RATA (flat rate), bukan baki berkurangan seperti pinjaman perumahan. Ini bermakna faedah anda dikira berdasarkan jumlah pinjaman penuh sepanjang tempoh.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Bila Patut Refinance Pinjaman Kereta?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 rounded-xl">
                <h3 className="font-semibold text-emerald-800 mb-2">Pertimbangkan Refinance Jika:</h3>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• Kadar semasa tinggi (6%+ sedangkan pasaran 4%)</li>
                  <li>• Skor kredit bertambah baik = kadar lebih baik</li>
                  <li>• Memerlukan bayaran bulanan yang lebih rendah</li>
                  <li>• Memerlukan tunai dari ekuiti kereta</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 rounded-xl">
                <h3 className="font-semibold text-red-800 mb-2">Elakkan Refinance Jika:</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Kereta terlalu lama (&gt;7 tahun)</li>
                  <li>• Baki pinjaman kecil (&lt;RM15,000)</li>
                  <li>• Merancang untuk menjual kereta tidak lama lagi</li>
                  <li>• Tempoh pulang modal terlalu lama</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Refinance Kereta vs Pinjaman Peribadi</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-3 text-slate-600 font-semibold">Faktor</th>
                    <th className="text-left py-3 text-slate-600 font-semibold">Refinance Kereta</th>
                    <th className="text-left py-3 text-slate-600 font-semibold">Pinjaman Peribadi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700 font-medium">Kadar faedah</td>
                    <td className="py-3 text-emerald-600 font-medium">3.5% - 6%</td>
                    <td className="py-3 text-red-600">6% - 18%</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700 font-medium">Cagaran</td>
                    <td className="py-3 text-slate-600">Kereta sebagai jaminan</td>
                    <td className="py-3 text-slate-600">Tanpa cagaran</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700 font-medium">Jumlah maksimum</td>
                    <td className="py-3 text-slate-600">Berdasarkan nilai kereta</td>
                    <td className="py-3 text-slate-600">RM10k - RM150k</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700 font-medium">Tempoh</td>
                    <td className="py-3 text-slate-600">Sehingga 7-9 tahun</td>
                    <td className="py-3 text-slate-600">1-7 tahun</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-700 font-medium">Kelulusan</td>
                    <td className="py-3 text-slate-600">Perlu penilaian kereta</td>
                    <td className="py-3 text-slate-600">Lebih cepat</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Syarat Refinance Kereta</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Kelayakan</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Warganegara Malaysia / PR
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Umur 21-65 tahun
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Pendapatan minimum RM2,000/bulan
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Kereta berusia kurang 10 tahun (pada akhir tempoh)
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Kereta didaftarkan atas nama anda
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Dokumen Diperlukan</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    MyKad
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Slip gaji 3 bulan terkini
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Penyata bank 3 bulan terkini
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Kad pendaftaran kereta (geran)
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-500">✓</span>
                    Penyata pinjaman semasa
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Proses Refinance Kereta Langkah Demi Langkah</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Semak nilai kereta anda</h3>
                  <p className="text-sm text-slate-600">Gunakan mudah.my atau carlist.my untuk mencari nilai pasaran</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Dapatkan penyata pinjaman semasa</h3>
                  <p className="text-sm text-slate-600">Ketahui baki tertunggak & penalti anda</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Bandingkan kadar refinance</h3>
                  <p className="text-sm text-slate-600">Mohon kepada 2-3 bank untuk tawaran terbaik</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Pemeriksaan kereta</h3>
                  <p className="text-sm text-slate-600">Bank akan menilai kereta anda</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">5</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Kelulusan pinjaman</h3>
                  <p className="text-sm text-slate-600">Biasanya 3-7 hari bekerja</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold shrink-0">6</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Penyelesaian & pengeluaran</h3>
                  <p className="text-sm text-slate-600">Bank membayar pinjaman lama - Jumlah masa: 2-4 minggu</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Soalan Lazim</h2>
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">Apakah usia maksimum kereta untuk refinance?</h3>
                <p className="text-slate-600 text-sm">Kebanyakan bank memerlukan kereta berusia kurang daripada 10 tahun pada akhir tempoh pinjaman. Jadi kereta berusia 5 tahun boleh mendapat refinance maksimum 5 tahun.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">Bolehkah saya refinance kereta di bawah sewa beli?</h3>
                <p className="text-slate-600 text-sm">Ya, kebanyakan pinjaman kereta di Malaysia adalah sewa beli. Bank baru akan menyelesaikan HP sedia ada anda.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">Apakah penalti penyelesaian awal?</h3>
                <p className="text-slate-600 text-sm">Biasanya 2-3% daripada baki pinjaman. Sesetengah bank mengecualikan ini untuk refinance kepada mereka.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">Bolehkah saya refinance dan mendapat cash out?</h3>
                <p className="text-slate-600 text-sm">Ya, jika nilai kereta anda lebih tinggi daripada baki pinjaman. Anda boleh meminjam perbezaannya.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">Adakah refinance akan menjejaskan skor kredit saya?</h3>
                <p className="text-slate-600 text-sm">Akan ada semakan kredit baru, tetapi kesan minimum jika anda membayar tepat pada masanya.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Bagaimana jika pinjaman kereta saya sudah kadar rendah?</h3>
                <p className="text-slate-600 text-sm">Refinance mungkin tidak berbaloi. Gunakan kalkulator kami untuk menyemak tempoh pulang modal.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Related Calculators */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Kalkulator Berkaitan</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/property/kalkulator-refinance-pinjaman-perumahan/" className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">🏠</span>
              <h3 className="font-semibold text-slate-800 mt-2">Refinance Pinjaman Rumah</h3>
              <p className="text-sm text-slate-500">Refinance pinjaman perumahan anda</p>
            </a>
            <a href="/loan/car-loan-calculator-malaysia/" className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">🚙</span>
              <h3 className="font-semibold text-slate-800 mt-2">Kalkulator Pinjaman Kereta</h3>
              <p className="text-sm text-slate-500">Kira bayaran pinjaman kereta</p>
            </a>
            <a href="/loan/personal-loan-calculator-malaysia-based-on-salary/" className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">💵</span>
              <h3 className="font-semibold text-slate-800 mt-2">Kalkulator Pinjaman Peribadi</h3>
              <p className="text-sm text-slate-500">Bandingkan pilihan pinjaman peribadi</p>
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
                <h3 className="text-xl font-bold text-slate-800">Dapatkan Sebut Harga Refinance Kereta Percuma</h3>
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
                    Pakar pinjaman kami akan menghubungi anda dalam masa 24 jam untuk membincangkan pilihan refinance kereta terbaik untuk anda.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Penuh *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Masukkan nama anda"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="anda@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Jenama & Model Kereta *</label>
                    <input
                      type="text"
                      required
                      value={formData.carModel}
                      onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                      placeholder="cth. Honda City 2020"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Baki Pinjaman *</label>
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Pendapatan Bulanan *</label>
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
                    {isSubmitting ? "Menghantar..." : "Dapatkan Sebut Harga Percuma"}
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
