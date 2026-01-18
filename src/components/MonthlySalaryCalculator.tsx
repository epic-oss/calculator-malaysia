"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import TaxConsultationCTA from "./TaxConsultationCTA";

const EPF_EMPLOYEE_RATES = [
  { label: "11% (Standard)", value: 0.11 },
  { label: "9% (Age 60+)", value: 0.09 },
  { label: "7% (Optional lower)", value: 0.07 },
  { label: "0% (Exempted)", value: 0 },
];

const SOCSO_CATEGORIES = [
  { label: "Category 1 (Employment Injury + Invalidity)", value: 1 },
  { label: "Category 2 (Employment Injury only - Age 55+)", value: 2 },
];

// SOCSO contribution table (simplified - actual rates vary by wage bands)
const getSOCSOContribution = (salary: number, category: number): { employee: number; employer: number } => {
  if (salary > 5000) {
    // Maximum contribution for salary > RM5,000
    if (category === 1) {
      return { employee: 24.75, employer: 86.65 };
    } else {
      return { employee: 0, employer: 61.90 };
    }
  }

  // Simplified calculation for lower salaries
  const rate = category === 1 ? 0.005 : 0;
  const employerRate = category === 1 ? 0.0175 : 0.0125;

  return {
    employee: Math.min(salary * rate, 24.75),
    employer: Math.min(salary * employerRate, 86.65),
  };
};

// EIS contribution (0.2% each for employee and employer, max RM4,000 salary cap)
const getEISContribution = (salary: number): { employee: number; employer: number } => {
  const cappedSalary = Math.min(salary, 5000);
  return {
    employee: cappedSalary * 0.002,
    employer: cappedSalary * 0.002,
  };
};

interface MonthlySalaryCalculatorProps {
  lang?: "en" | "ms";
}

// Simplified PCB calculation based on annual income brackets
const calculatePCB = (annualTaxableIncome: number): number => {
  // Malaysia tax brackets 2024/2025
  // First RM5,000: 0%
  // RM5,001 - RM20,000: 1%
  // RM20,001 - RM35,000: 3%
  // RM35,001 - RM50,000: 6%
  // RM50,001 - RM70,000: 11%
  // RM70,001 - RM100,000: 19%
  // RM100,001 - RM400,000: 25%
  // RM400,001 - RM600,000: 26%
  // RM600,001 - RM2,000,000: 28%
  // Above RM2,000,000: 30%

  let tax = 0;
  let remaining = annualTaxableIncome;

  const brackets = [
    { limit: 5000, rate: 0 },
    { limit: 20000, rate: 0.01 },
    { limit: 35000, rate: 0.03 },
    { limit: 50000, rate: 0.06 },
    { limit: 70000, rate: 0.11 },
    { limit: 100000, rate: 0.19 },
    { limit: 400000, rate: 0.25 },
    { limit: 600000, rate: 0.26 },
    { limit: 2000000, rate: 0.28 },
    { limit: Infinity, rate: 0.30 },
  ];

  let previousLimit = 0;
  for (const bracket of brackets) {
    if (remaining <= 0) break;

    const taxableInBracket = Math.min(remaining, bracket.limit - previousLimit);
    tax += taxableInBracket * bracket.rate;
    remaining -= taxableInBracket;
    previousLimit = bracket.limit;
  }

  // Return monthly PCB (annual tax / 12)
  return tax / 12;
};

export default function MonthlySalaryCalculator({ lang = "en" }: MonthlySalaryCalculatorProps) {
  const [grossSalary, setGrossSalary] = useState(5000);
  const [epfRate, setEpfRate] = useState(0.11);
  const [socsoCategory, setSocsoCategory] = useState(1);
  const [bonusMonths, setBonusMonths] = useState(0);
  const [showAnnualSummary, setShowAnnualSummary] = useState(false);

  const calculation = useMemo(() => {
    // EPF calculations
    const epfEmployee = grossSalary * epfRate;
    const epfEmployerRate = grossSalary > 5000 ? 0.13 : 0.12;
    const epfEmployer = grossSalary * epfEmployerRate;

    // SOCSO
    const socso = getSOCSOContribution(grossSalary, socsoCategory);

    // EIS
    const eis = getEISContribution(grossSalary);

    // Annual taxable income (after EPF deduction - EPF is tax deductible up to RM4,000)
    const annualGross = grossSalary * (12 + bonusMonths);
    const annualEPFDeduction = Math.min(epfEmployee * 12, 4000); // Tax relief capped at RM4,000
    const annualTaxableIncome = annualGross - annualEPFDeduction - 9000; // RM9,000 personal relief

    // PCB (monthly tax)
    const pcb = calculatePCB(Math.max(0, annualTaxableIncome));

    // Net salary
    const totalDeductions = epfEmployee + socso.employee + eis.employee + pcb;
    const netSalary = grossSalary - totalDeductions;

    // Annual summary
    const annualNet = netSalary * 12 + (grossSalary - epfEmployee - socso.employee - eis.employee) * bonusMonths;
    const annualEPFTotal = (epfEmployee + epfEmployer) * 12;
    const annualTax = pcb * 12;

    return {
      epfEmployee,
      epfEmployer,
      socsoEmployee: socso.employee,
      socsoEmployer: socso.employer,
      eisEmployee: eis.employee,
      eisEmployer: eis.employer,
      pcb,
      totalDeductions,
      netSalary,
      annualGross,
      annualNet,
      annualEPFTotal,
      annualTax,
    };
  }, [grossSalary, epfRate, socsoCategory, bonusMonths]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Monthly Salary Calculator
        </h1>
        <p className="text-center text-slate-500 mb-8">
          Calculate your take-home pay after EPF, SOCSO, EIS & PCB deductions
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
              {/* Gross Salary */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gross Monthly Salary (RM)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(Math.max(1500, Math.min(50000, Number(e.target.value))))}
                    min={1500}
                    max={50000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(Number(e.target.value))}
                    min={1500}
                    max={50000}
                    step={100}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>RM 1,500</span>
                    <span>RM 50,000</span>
                  </div>
                </div>
              </div>

              {/* EPF Rate */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  EPF Employee Contribution Rate
                </label>
                <select
                  value={epfRate}
                  onChange={(e) => setEpfRate(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                >
                  {EPF_EMPLOYEE_RATES.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-2">
                  Employer contributes {grossSalary > 5000 ? "13%" : "12%"} ({formatCurrency(calculation.epfEmployer)})
                </p>
              </div>

              {/* SOCSO Category */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  SOCSO Category
                </label>
                <select
                  value={socsoCategory}
                  onChange={(e) => setSocsoCategory(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                >
                  {SOCSO_CATEGORIES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bonus Months */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Annual Bonus (Months)
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={bonusMonths}
                      onChange={(e) => setBonusMonths(Math.max(0, Math.min(6, Number(e.target.value))))}
                      min={0}
                      max={6}
                      step={0.5}
                      className="w-24 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                    <span className="text-slate-500">month(s)</span>
                  </div>
                  <input
                    type="range"
                    value={bonusMonths}
                    onChange={(e) => setBonusMonths(Number(e.target.value))}
                    min={0}
                    max={6}
                    step={0.5}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>No bonus</span>
                    <span>6 months</span>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
                <p className="text-sm text-teal-800">
                  <strong>Note:</strong> PCB is estimated based on annual income. Actual tax may vary based on reliefs, rebates, and other factors.
                </p>
              </div>
            </div>
          </div>

          {/* Result Card - Right Side */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">
                  Your Salary Breakdown
                </h2>

                {/* Gross Salary Display */}
                <div className="text-center py-4 mb-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 mb-1">Gross Salary</p>
                  <p className="text-2xl font-bold text-slate-700">
                    {formatCurrency(grossSalary)}
                  </p>
                </div>

                {/* Deductions Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm p-3 bg-red-50 rounded-xl">
                    <span className="text-red-700">EPF ({(epfRate * 100).toFixed(0)}%)</span>
                    <span className="text-red-700 font-medium">- {formatCurrency(calculation.epfEmployee)}</span>
                  </div>
                  <div className="flex justify-between text-sm p-3 bg-red-50 rounded-xl">
                    <span className="text-red-700">SOCSO</span>
                    <span className="text-red-700 font-medium">- {formatCurrency(calculation.socsoEmployee)}</span>
                  </div>
                  <div className="flex justify-between text-sm p-3 bg-red-50 rounded-xl">
                    <span className="text-red-700">EIS</span>
                    <span className="text-red-700 font-medium">- {formatCurrency(calculation.eisEmployee)}</span>
                  </div>
                  <div className="flex justify-between text-sm p-3 bg-red-50 rounded-xl">
                    <span className="text-red-700">PCB (Tax)</span>
                    <span className="text-red-700 font-medium">- {formatCurrency(calculation.pcb)}</span>
                  </div>
                  <div className="flex justify-between text-sm p-3 bg-slate-100 rounded-xl border-t-2 border-slate-200">
                    <span className="text-slate-700 font-semibold">Total Deductions</span>
                    <span className="text-red-600 font-bold">- {formatCurrency(calculation.totalDeductions)}</span>
                  </div>
                </div>

                {/* Net Salary Display */}
                <div className="text-center py-6 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl mb-4">
                  <p className="text-sm text-slate-500 mb-1">Take Home Pay</p>
                  <p className="text-4xl font-bold text-teal-600">
                    {formatCurrency(calculation.netSalary)}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    {((calculation.netSalary / grossSalary) * 100).toFixed(1)}% of gross salary
                  </p>
                </div>

                {/* Employer Contributions Info */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
                  <p className="text-sm font-semibold text-blue-800 mb-2">Employer Also Contributes:</p>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div className="flex justify-between">
                      <span>EPF ({grossSalary > 5000 ? "13%" : "12%"})</span>
                      <span>{formatCurrency(calculation.epfEmployer)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SOCSO</span>
                      <span>{formatCurrency(calculation.socsoEmployer)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>EIS</span>
                      <span>{formatCurrency(calculation.eisEmployer)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-blue-200 font-semibold">
                      <span>Total</span>
                      <span>{formatCurrency(calculation.epfEmployer + calculation.socsoEmployer + calculation.eisEmployer)}</span>
                    </div>
                  </div>
                </div>

                {/* Annual Summary Toggle */}
                <button
                  onClick={() => setShowAnnualSummary(!showAnnualSummary)}
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-all flex items-center justify-between"
                >
                  <span>View Annual Summary</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${showAnnualSummary ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Annual Summary Details */}
                {showAnnualSummary && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Annual Gross ({12 + bonusMonths} months)</span>
                      <span className="text-slate-700 font-medium">{formatCurrency(calculation.annualGross)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Annual Take Home</span>
                      <span className="text-teal-600 font-bold">{formatCurrency(calculation.annualNet)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Total EPF (You + Employer)</span>
                      <span className="text-slate-700 font-medium">{formatCurrency(calculation.annualEPFTotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Estimated Annual Tax</span>
                      <span className="text-slate-700 font-medium">{formatCurrency(calculation.annualTax)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Tax Consultation CTA */}
              <TaxConsultationCTA lang={lang} />

              {/* Financial Tools for You */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">💰</span>
                  <h3 className="font-semibold text-slate-800">Based on Your Salary</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Personal Loan Eligibility Box */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💵</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">Personal Loan Eligibility</p>
                        <p className="text-xs text-slate-500 mt-1 mb-3">
                          You may qualify for loans up to{" "}
                          <span className="font-bold text-emerald-600">
                            {formatCurrency(grossSalary * 4)}
                          </span>
                        </p>
                        <Link
                          href="/loan/personal-loan-calculator-malaysia/"
                          className="inline-flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors"
                        >
                          Check Eligibility
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Credit Cards Box */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💳</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">Credit Cards for You</p>
                        <p className="text-xs text-slate-500 mt-1 mb-3">
                          Find cards that match your income level
                        </p>
                        <a
                          href="https://invl.me/cln69f8"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
                        >
                          Compare Cards
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
