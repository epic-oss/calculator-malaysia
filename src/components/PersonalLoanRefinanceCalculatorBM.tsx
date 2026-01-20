"use client";

import { useState, useMemo } from "react";

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

const BANK_RATES = [
  { name: "CIMB Cash Plus", rate: 4.38, maxAmount: 100000, maxTenure: 5, notes: "Kadar terendah" },
  { name: "Bank Rakyat", rate: 4.50, maxAmount: 200000, maxTenure: 10, notes: "Ahli sahaja" },
  { name: "Maybank Personal Loan", rate: 5.00, maxAmount: 150000, maxTenure: 7, notes: "" },
  { name: "Public Bank", rate: 5.50, maxAmount: 150000, maxTenure: 7, notes: "" },
  { name: "RHB", rate: 5.88, maxAmount: 150000, maxTenure: 7, notes: "" },
  { name: "Hong Leong", rate: 6.00, maxAmount: 100000, maxTenure: 5, notes: "" },
  { name: "AmBank", rate: 6.50, maxAmount: 150000, maxTenure: 7, notes: "" },
  { name: "Alliance Bank", rate: 6.88, maxAmount: 100000, maxTenure: 5, notes: "" },
  { name: "AEON Credit", rate: 12.00, maxAmount: 50000, maxTenure: 5, notes: "Kelulusan lebih mudah" },
];

const DEBT_TYPES = ["Kad Kredit", "Pinjaman Peribadi", "Pinjaman Kereta", "BNPL", "Lain-lain"];
const DEBT_TYPES_EN = ["Credit Card", "Personal Loan", "Car Loan", "BNPL", "Other"];

const TENURE_OPTIONS = [1, 2, 3, 4, 5, 6, 7];

const DEBT_RANGES = [
  "Bawah RM20,000",
  "RM20,000 - RM50,000",
  "RM50,000 - RM100,000",
  "Atas RM100,000",
];

const INCOME_RANGES = [
  "Bawah RM3,000",
  "RM3,000 - RM5,000",
  "RM5,000 - RM8,000",
  "RM8,000 - RM10,000",
  "Atas RM10,000",
];

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
  return new Intl.NumberFormat("ms-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatCurrencyDecimal(amount: number): string {
  return new Intl.NumberFormat("ms-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function PersonalLoanRefinanceCalculatorBM() {
  const currentYear = new Date().getFullYear();

  // Debts state
  const [debts, setDebts] = useState<Debt[]>([
    { id: "1", type: "Kad Kredit", amount: 15000, rate: 18, monthlyPayment: 500 },
    { id: "2", type: "Pinjaman Peribadi", amount: 20000, rate: 8, monthlyPayment: 450 },
  ]);

  // New loan state
  const [selectedBank, setSelectedBank] = useState("CIMB Cash Plus");
  const [newRate, setNewRate] = useState(4.38);
  const [newTenure, setNewTenure] = useState(5);
  const [processingFeeRate, setProcessingFeeRate] = useState(1);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    debtRange: "RM20,000 - RM50,000",
    debtTypes: [] as string[],
    incomeRange: "RM3,000 - RM5,000",
  });

  // Add new debt
  const addDebt = () => {
    if (debts.length >= 5) return;
    const newId = String(Date.now());
    setDebts([...debts, { id: newId, type: "Kad Kredit", amount: 5000, rate: 18, monthlyPayment: 200 }]);
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
    const estimatedCurrentTotalInterest = debts.reduce((sum, d) => {
      if (d.type === "Kad Kredit") {
        return sum + (d.amount * (d.rate / 100) * 2);
      }
      const estimatedYears = d.monthlyPayment > 0 ? Math.min(d.amount / (d.monthlyPayment * 12) * 1.5, 5) : 3;
      return sum + calculateTotalInterest(d.amount, d.rate * 0.55, estimatedYears);
    }, 0);

    const currentTotalPayment = totalDebt + estimatedCurrentTotalInterest;

    // New consolidation loan
    const processingFee = totalDebt * (processingFeeRate / 100);
    const newLoanAmount = totalDebt;

    const newMonthly = calculateFlatRateMonthly(newLoanAmount, newRate, newTenure);
    const newTotalInterest = calculateTotalInterest(newLoanAmount, newRate, newTenure);
    const newTotalPayment = newLoanAmount + newTotalInterest;

    const monthlySavings = totalMonthlyPayment - newMonthly;
    const yearlySavings = monthlySavings * 12;
    const totalInterestSavings = estimatedCurrentTotalInterest - newTotalInterest;

    const currentTimeToPayoff = totalMonthlyPayment > 0 ? Math.ceil(totalDebt / (totalMonthlyPayment * 0.5) / 12) : 5;
    const newTimeToPayoff = newTenure;

    let recommendation: "good" | "neutral" | "bad";
    let recommendationText: string;

    const rateReduction = weightedAverageRate - newRate;

    if (monthlySavings > 100 && rateReduction > 2) {
      recommendation = "good";
      recommendationText = `Gabungan hutang DISYORKAN! Anda akan jimat ${formatCurrency(totalInterestSavings > 0 ? totalInterestSavings : monthlySavings * newTenure * 12)} sepanjang tempoh pinjaman.`;
    } else if (monthlySavings > 50) {
      recommendation = "neutral";
      recommendationText = "Gabungan hutang BERBALOI. Pertimbangkan jika anda boleh elak hutang baru selepas gabungan.";
    } else {
      recommendation = "bad";
      recommendationText = "Gabungan hutang mungkin TIDAK berbaloi. Fokus bayar hutang kadar tinggi dahulu menggunakan kaedah debt avalanche.";
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
    };
  }, [debts, newRate, newTenure, processingFeeRate]);

  const handleDebtTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      debtTypes: prev.debtTypes.includes(type)
        ? prev.debtTypes.filter(t => t !== type)
        : [...prev.debtTypes, type]
    }));
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
          debtTypes: formData.debtTypes.join(", "),
          calculator_type: "personal_loan_refinance_bm",
          source_url: typeof window !== "undefined" ? window.location.href : "",
          calculation_summary: {
            total_debt: calculation.totalDebt,
            current_monthly: calculation.totalMonthlyPayment,
            new_monthly: calculation.newMonthly,
            monthly_savings: calculation.monthlySavings,
            selected_bank: selectedBank,
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

  const selectedBankData = BANK_RATES.find(b => b.name === selectedBank);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2 text-slate-500">
            <li><a href="/" className="hover:text-slate-700">Utama</a></li>
            <li>/</li>
            <li><a href="/?category=loan#calculators" className="hover:text-slate-700">Pinjaman</a></li>
            <li>/</li>
            <li className="text-slate-700">Kalkulator Refinance Pinjaman Peribadi</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Kalkulator Refinance Pinjaman Peribadi Malaysia {currentYear}
        </h1>
        <p className="text-center text-slate-500 mb-8">
          Kira berapa anda boleh jimat dengan gabungkan hutang kadar tinggi ke dalam satu pinjaman kadar rendah
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="space-y-6">
              {/* Section 1: Current Debts */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <span className="text-xl">💳</span>
                  Hutang Semasa Anda
                </h2>

                <div className="space-y-4">
                  {debts.map((debt, index) => (
                    <div key={debt.id} className="p-4 bg-slate-50 rounded-xl relative">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium text-slate-700">Hutang {index + 1}</span>
                        {debts.length > 1 && (
                          <button
                            onClick={() => removeDebt(debt.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Buang
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Debt Type */}
                        <div className="col-span-2">
                          <label className="block text-xs font-medium text-slate-500 mb-1">Jenis Hutang</label>
                          <select
                            value={debt.type}
                            onChange={(e) => {
                              updateDebt(debt.id, "type", e.target.value);
                              if (e.target.value === "Kad Kredit") {
                                updateDebt(debt.id, "rate", 18);
                              } else if (e.target.value === "Pinjaman Peribadi") {
                                updateDebt(debt.id, "rate", 8);
                              } else if (e.target.value === "Pinjaman Kereta") {
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
                          <label className="block text-xs font-medium text-slate-500 mb-1">Baki (RM)</label>
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
                          <label className="block text-xs font-medium text-slate-500 mb-1">Kadar (% p.a.)</label>
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
                          <label className="block text-xs font-medium text-slate-500 mb-1">Bayaran Bulanan (RM)</label>
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
                      Tambah Hutang Lain
                    </button>
                  )}

                  {/* Summary Box */}
                  <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl p-4 mt-4">
                    <h3 className="font-semibold text-slate-700 mb-3">Ringkasan Hutang Semasa</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Jumlah Tertunggak</span>
                        <span className="font-bold text-slate-800">{formatCurrency(calculation.totalDebt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Jumlah Bayaran Bulanan</span>
                        <span className="font-bold text-slate-800">{formatCurrency(calculation.totalMonthlyPayment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Kadar Purata Berwajaran</span>
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
                  Pinjaman Gabungan Baru
                </h2>

                <div className="space-y-4">
                  {/* Select Bank */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Pilih Bank</label>
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
                        Maks: {formatCurrency(selectedBankData.maxAmount)} | Sehingga {selectedBankData.maxTenure} tahun
                      </p>
                    )}
                  </div>

                  {/* New Interest Rate */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Kadar Faedah Baru (% p.a. flat)
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
                      Tempoh Pinjaman Baru (Tahun)
                    </label>
                    <select
                      value={newTenure}
                      onChange={(e) => setNewTenure(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      {TENURE_OPTIONS.filter(t => !selectedBankData || t <= selectedBankData.maxTenure).map((tenure) => (
                        <option key={tenure} value={tenure}>{tenure} tahun</option>
                      ))}
                    </select>
                  </div>

                  {/* Processing Fee */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Yuran Pemprosesan (%)
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
                      Jumlah yuran: {formatCurrency(calculation.processingFee)}
                    </p>
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
                    : "Anda akan membayar lebih dengan gabungan"}
                </p>
              </div>

              {/* Comparison Table */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Perbandingan Hutang</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 text-slate-500 font-medium"></th>
                        <th className="text-right py-3 text-slate-500 font-medium">Semasa</th>
                        <th className="text-right py-3 text-slate-500 font-medium">Gabungan</th>
                        <th className="text-right py-3 text-emerald-600 font-medium">Penjimatan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 text-slate-600">Bayaran Bulanan</td>
                        <td className="text-right py-3 font-medium text-slate-800">{formatCurrency(calculation.totalMonthlyPayment)}</td>
                        <td className="text-right py-3 font-medium text-slate-800">{formatCurrency(calculation.newMonthly)}</td>
                        <td className={`text-right py-3 font-bold ${calculation.monthlySavings > 0 ? "text-emerald-600" : "text-red-600"}`}>
                          {calculation.monthlySavings > 0 ? "+" : ""}{formatCurrency(calculation.monthlySavings)}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 text-slate-600">Faedah Purata</td>
                        <td className="text-right py-3 font-medium text-red-600">{calculation.weightedAverageRate.toFixed(2)}%</td>
                        <td className="text-right py-3 font-medium text-emerald-600">{newRate.toFixed(2)}%</td>
                        <td className="text-right py-3 font-bold text-emerald-600">
                          -{calculation.rateReduction.toFixed(2)}%
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-3 text-slate-600">Jumlah Faedah</td>
                        <td className="text-right py-3 font-medium text-slate-800">{formatCurrency(calculation.estimatedCurrentTotalInterest)}</td>
                        <td className="text-right py-3 font-medium text-slate-800">{formatCurrency(calculation.newTotalInterest)}</td>
                        <td className={`text-right py-3 font-bold ${calculation.totalInterestSavings > 0 ? "text-emerald-600" : "text-red-600"}`}>
                          {calculation.totalInterestSavings > 0 ? "+" : ""}{formatCurrency(calculation.totalInterestSavings)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-slate-600">Tempoh Bebas Hutang</td>
                        <td className="text-right py-3 font-medium text-slate-800">~{calculation.currentTimeToPayoff} tahun</td>
                        <td className="text-right py-3 font-medium text-slate-800">{calculation.newTimeToPayoff} tahun</td>
                        <td className="text-right py-3 text-slate-400">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Debt Breakdown */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Pecahan Gabungan Hutang</h3>
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
                        Dilangsaikan
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                    <div>
                      <p className="font-medium text-emerald-700">Pinjaman Gabungan Baru</p>
                      <p className="text-sm text-emerald-600">
                        {formatCurrency(calculation.totalDebt)} @ {newRate}%
                      </p>
                    </div>
                    <span className="text-emerald-700 font-bold">
                      {formatCurrencyDecimal(calculation.newMonthly)}/bln
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

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💰</span>
                  <h3 className="text-lg font-bold text-slate-800">Dapatkan Kadar Gabungan Hutang Terbaik</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Bandingkan tawaran dari 10+ bank. Konsultasi percuma.
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
            Kadar Faedah Pinjaman Peribadi di Malaysia {currentYear}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 text-slate-600 font-semibold">Bank</th>
                  <th className="text-right py-3 px-4 text-slate-600 font-semibold">Kadar Faedah</th>
                  <th className="text-right py-3 px-4 text-slate-600 font-semibold">Jumlah Maks</th>
                  <th className="text-right py-3 px-4 text-slate-600 font-semibold">Tempoh Maks</th>
                  <th className="text-left py-3 px-4 text-slate-600 font-semibold">Nota</th>
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
                      {bank.maxTenure} tahun
                    </td>
                    <td className="py-3 px-4 text-slate-500">{bank.notes}</td>
                  </tr>
                ))}
                <tr className="bg-red-50">
                  <td className="py-3 px-4 font-medium text-red-800">Kad Kredit</td>
                  <td className="text-right py-3 px-4 font-bold text-red-600">
                    15-18% p.a.
                  </td>
                  <td className="text-right py-3 px-4 text-slate-600">-</td>
                  <td className="text-right py-3 px-4 text-slate-600">Pusingan</td>
                  <td className="py-3 px-4 text-red-600">Kadar tertinggi - elakkan!</td>
                </tr>
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
            <h2 className="text-xl font-bold text-slate-800 mb-4">Apa Itu Refinance Pinjaman Peribadi / Gabungan Hutang?</h2>
            <p className="text-slate-600 leading-relaxed">
              Refinance pinjaman peribadi (juga dipanggil gabungan hutang) bermaksud menggabungkan beberapa hutang kadar faedah tinggi ke dalam satu pinjaman dengan kadar faedah yang lebih rendah. Ini membantu anda:
            </p>
            <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
              <li>Bayar satu ansuran bulanan sahaja</li>
              <li>Mengurangkan jumlah faedah yang dibayar</li>
              <li>Bebas hutang lebih cepat</li>
            </ul>
            <div className="mt-4 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800">
                <strong>Hutang yang biasa digabungkan:</strong> Baki kad kredit (faedah 15-18%), pelbagai pinjaman peribadi, hutang BNPL (Beli Sekarang Bayar Kemudian), dan pinjaman kereta dengan faedah tinggi.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Bila Patut Gabungkan Hutang Anda?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 rounded-xl">
                <h3 className="font-semibold text-emerald-800 mb-2">✅ Masa Sesuai untuk Gabungkan:</h3>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• Anda ada hutang kad kredit pada 15-18%</li>
                  <li>• Pelbagai pinjaman & sukar jejak bayaran</li>
                  <li>• Skor kredit bertambah baik sejak pinjaman asal</li>
                  <li>• Mahu permudahkan dengan satu bayaran</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 rounded-xl">
                <h3 className="font-semibold text-red-800 mb-2">❌ Masa Tidak Sesuai untuk Gabungkan:</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Hutang anda hampir habis dibayar</li>
                  <li>• Anda akan ambil hutang baru selepas gabungan</li>
                  <li>• Pinjaman baru ada jumlah faedah lebih tinggi</li>
                  <li>• Ada tabiat berbelanja yang menyebabkan hutang</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Gabungan Hutang: Kelebihan dan Kekurangan</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-emerald-700 mb-3">✅ Kelebihan:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    Kadar faedah lebih rendah (5-8% vs 15-18% kad kredit)
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    Satu bayaran bulanan sahaja
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    Jadual bayaran tetap
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    Potensi peningkatan skor kredit
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-700 mb-3">❌ Kekurangan:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-red-500 mt-0.5">✗</span>
                    Mungkin bayar lebih jika tempoh lebih panjang
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-red-500 mt-0.5">✗</span>
                    Yuran pemprosesan (1-2%)
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-red-500 mt-0.5">✗</span>
                    Godaan untuk guna kad kredit semula
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="text-red-500 mt-0.5">✗</span>
                    Perlu skor kredit baik untuk layak
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Dokumen Diperlukan</h2>
            <div className="grid md:grid-cols-2 gap-4">
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
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-600">
                  <span className="text-emerald-500">✓</span>
                  Penyata KWSP terkini
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <span className="text-emerald-500">✓</span>
                  Senarai hutang/penyata pinjaman semasa
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Langkah Demi Langkah: Cara Gabungkan Hutang</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Senaraikan semua hutang anda</h3>
                  <p className="text-sm text-slate-600">Jumlah, kadar, bayaran bulanan untuk setiap hutang</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Semak skor kredit anda</h3>
                  <p className="text-sm text-slate-600">Melalui CTOS atau CCRIS - mempengaruhi kelulusan & kadar</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Bandingkan tawaran bank</h3>
                  <p className="text-sm text-slate-600">Gunakan kalkulator kami untuk cari penjimatan</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Mohon pinjaman gabungan</h3>
                  <p className="text-sm text-slate-600">Pilih bank dengan kadar terendah yang anda layak</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">5</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Langsaikan semua hutang sedia ada</h3>
                  <p className="text-sm text-slate-600">Gunakan dana pinjaman baru dengan segera</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold shrink-0">6</div>
                <div>
                  <h3 className="font-semibold text-slate-700">Potong kad kredit!</h3>
                  <p className="text-sm text-slate-600">Elak hutang baru - ini langkah paling penting</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Soalan Lazim</h2>
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">Apakah perbezaan antara refinancing dan gabungan hutang?</h3>
                <p className="text-slate-600 text-sm">Kedua-duanya serupa. Refinancing biasanya bermaksud menggantikan SATU pinjaman dengan yang lebih baik. Gabungan hutang bermaksud menggabungkan PELBAGAI hutang ke dalam satu pinjaman.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">Adakah gabungan hutang akan menjejaskan skor kredit saya?</h3>
                <p className="text-slate-600 text-sm">Jangka pendek, ada sedikit penurunan daripada semakan kredit. Jangka panjang, ia boleh meningkatkan skor anda jika anda membuat bayaran tepat pada masanya.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">Bolehkah saya gabungkan hutang dengan kredit buruk?</h3>
                <p className="text-slate-600 text-sm">Lebih sukar, tetapi sesetengah pemberi pinjaman seperti AEON Credit mempunyai kelulusan lebih mudah. Kadar akan lebih tinggi.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">Patutkah saya gabungkan hutang kecil?</h3>
                <p className="text-slate-600 text-sm">Biasanya tidak berbaloi untuk hutang di bawah RM5,000 jumlah. Yuran pemprosesan mungkin melebihi penjimatan.</p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-800 mb-2">Apa yang berlaku kepada kad kredit saya selepas gabungan?</h3>
                <p className="text-slate-600 text-sm">Ia kekal terbuka melainkan anda menutupnya. Berhati-hati untuk tidak menambah hutang baru!</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Adakah pemindahan baki 0% lebih baik daripada pinjaman gabungan?</h3>
                <p className="text-slate-600 text-sm">Pemindahan baki 0% bagus untuk jangka pendek, tetapi biasanya hanya 6-12 bulan. Pinjaman gabungan lebih baik untuk jumlah yang lebih besar yang memerlukan bayaran balik lebih lama.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Related Calculators */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Kalkulator Berkaitan</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/credit-card/credit-card-interest-calculator-malaysia/" className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">💳</span>
              <h3 className="font-semibold text-slate-800 mt-2">Kalkulator Faedah Kad Kredit</h3>
              <p className="text-sm text-slate-500">Lihat bagaimana faedah kad kredit bertambah</p>
            </a>
            <a href="/property/kalkulator-refinance-pinjaman-perumahan/" className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">🏠</span>
              <h3 className="font-semibold text-slate-800 mt-2">Refinance Pinjaman Rumah</h3>
              <p className="text-sm text-slate-500">Refinance pinjaman perumahan anda</p>
            </a>
            <a href="/auto/kalkulator-refinance-kereta-malaysia/" className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">🚗</span>
              <h3 className="font-semibold text-slate-800 mt-2">Kalkulator Refinance Kereta</h3>
              <p className="text-sm text-slate-500">Refinance pinjaman kereta anda</p>
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
                <h3 className="text-xl font-bold text-slate-800">Dapatkan Sebut Harga Gabungan Hutang Percuma</h3>
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
                    Pakar pinjaman kami akan menghubungi anda dalam masa 24 jam untuk membincangkan pilihan gabungan hutang terbaik untuk anda.
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Jumlah Hutang *</label>
                    <select
                      required
                      value={formData.debtRange}
                      onChange={(e) => setFormData({ ...formData, debtRange: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {DEBT_RANGES.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Jenis Hutang *</label>
                    <div className="flex flex-wrap gap-2">
                      {DEBT_TYPES.map((type, index) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleDebtTypeToggle(DEBT_TYPES_EN[index])}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            formData.debtTypes.includes(DEBT_TYPES_EN[index])
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
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
