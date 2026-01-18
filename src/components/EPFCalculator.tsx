"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import TaxConsultationCTA from "./TaxConsultationCTA";

const EMPLOYEE_CONTRIBUTION_RATES = [
  { label: "11% (Standard)", value: 0.11 },
  { label: "9% (Age 60+)", value: 0.09 },
  { label: "7% (Optional lower)", value: 0.07 },
];

const RETIREMENT_AGES = [
  { label: "55 years old", value: 55 },
  { label: "60 years old", value: 60 },
  { label: "65 years old", value: 65 },
];

export default function EPFCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(55);
  const [currentBalance, setCurrentBalance] = useState(50000);
  const [monthlySalary, setMonthlySalary] = useState(5000);
  const [employeeRate, setEmployeeRate] = useState(0.11);
  const [dividendRate, setDividendRate] = useState(5.5);

  const calculation = useMemo(() => {
    // Employer contribution rate based on salary
    const employerRate = monthlySalary > 5000 ? 0.13 : 0.12;

    // Monthly contributions
    const employeeContribution = monthlySalary * employeeRate;
    const employerContribution = monthlySalary * employerRate;
    const totalMonthlyContribution = employeeContribution + employerContribution;

    // Years and months to retirement
    const yearsToRetirement = Math.max(0, retirementAge - currentAge);
    const monthsToRetirement = yearsToRetirement * 12;

    // Calculate projected balance with compound interest
    // EPF compounds annually, contributions are monthly
    const monthlyDividendRate = dividendRate / 100 / 12;
    let projectedBalance = currentBalance;
    const yearlyBalances: { year: number; age: number; balance: number }[] = [];

    // Add starting point
    yearlyBalances.push({
      year: 0,
      age: currentAge,
      balance: currentBalance,
    });

    for (let month = 1; month <= monthsToRetirement; month++) {
      // Add monthly contribution
      projectedBalance += totalMonthlyContribution;
      // Add monthly dividend (simplified - actual EPF compounds annually)
      projectedBalance *= 1 + monthlyDividendRate;

      // Record yearly balance
      if (month % 12 === 0) {
        yearlyBalances.push({
          year: month / 12,
          age: currentAge + month / 12,
          balance: projectedBalance,
        });
      }
    }

    // Account split (70% Account 1, 30% Account 2)
    const account1Balance = projectedBalance * 0.7;
    const account2Balance = projectedBalance * 0.3;

    // Total contributions made
    const totalContributions = totalMonthlyContribution * monthsToRetirement;
    const totalDividends = projectedBalance - currentBalance - totalContributions;

    // Recommended savings (age × RM50,000 is a common guideline)
    const recommendedSavings = retirementAge * 50000;

    return {
      employeeContribution,
      employerContribution,
      totalMonthlyContribution,
      employerRate,
      yearsToRetirement,
      projectedBalance,
      account1Balance,
      account2Balance,
      totalContributions,
      totalDividends,
      yearlyBalances,
      recommendedSavings,
      isOnTrack: projectedBalance >= recommendedSavings,
    };
  }, [currentAge, retirementAge, currentBalance, monthlySalary, employeeRate, dividendRate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          EPF Calculator Malaysia (KWSP)
        </h1>
        <p className="text-center text-slate-500 mb-8">
          Calculate your EPF contributions and project your retirement savings
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
              {/* Current Age */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Age
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(Math.max(18, Math.min(60, Number(e.target.value))))}
                      min={18}
                      max={60}
                      className="w-24 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <span className="text-slate-500">years old</span>
                  </div>
                  <input
                    type="range"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    min={18}
                    max={60}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>18</span>
                    <span>60</span>
                  </div>
                </div>
              </div>

              {/* Retirement Age */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Retirement Age
                </label>
                <select
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {RETIREMENT_AGES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Current EPF Balance */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current EPF Balance (RM)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={currentBalance}
                    onChange={(e) => setCurrentBalance(Math.max(0, Math.min(1000000, Number(e.target.value))))}
                    min={0}
                    max={1000000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={currentBalance}
                    onChange={(e) => setCurrentBalance(Number(e.target.value))}
                    min={0}
                    max={500000}
                    step={5000}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>RM 0</span>
                    <span>RM 500,000</span>
                  </div>
                </div>
              </div>

              {/* Monthly Salary */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Monthly Salary (RM)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={monthlySalary}
                    onChange={(e) => setMonthlySalary(Math.max(1500, Math.min(50000, Number(e.target.value))))}
                    min={1500}
                    max={50000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={monthlySalary}
                    onChange={(e) => setMonthlySalary(Number(e.target.value))}
                    min={1500}
                    max={50000}
                    step={500}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>RM 1,500</span>
                    <span>RM 50,000</span>
                  </div>
                </div>
              </div>

              {/* Employee Contribution Rate */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Employee Contribution Rate
                </label>
                <select
                  value={employeeRate}
                  onChange={(e) => setEmployeeRate(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {EMPLOYEE_CONTRIBUTION_RATES.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-2">
                  Employer contributes {(calculation.employerRate * 100).toFixed(0)}% (auto-calculated based on salary)
                </p>
              </div>

              {/* Expected Dividend Rate */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Expected Annual Dividend Rate (%)
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={dividendRate}
                      onChange={(e) => setDividendRate(Math.max(4, Math.min(7, Number(e.target.value))))}
                      min={4}
                      max={7}
                      step={0.1}
                      className="w-24 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <span className="text-slate-500">% per year</span>
                  </div>
                  <input
                    type="range"
                    value={dividendRate}
                    onChange={(e) => setDividendRate(Number(e.target.value))}
                    min={4}
                    max={7}
                    step={0.1}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>4%</span>
                    <span>7%</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Historical average: 5-6% p.a. (2019-2023)
                </p>
              </div>

              {/* Info Card */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This is a projection based on current inputs. Actual EPF
                  dividends vary yearly and are declared by KWSP.
                </p>
              </div>
            </div>
          </div>

          {/* Result Card - Right Side */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">
                  Your EPF Projection
                </h2>

                {/* Monthly Contributions */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-slate-600 mb-3">Monthly Contributions</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Employee ({(employeeRate * 100).toFixed(0)}%)</span>
                      <span className="text-slate-700 font-medium">{formatCurrency(calculation.employeeContribution)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Employer ({(calculation.employerRate * 100).toFixed(0)}%)</span>
                      <span className="text-slate-700 font-medium">{formatCurrency(calculation.employerContribution)}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                      <span className="text-slate-700 font-semibold">Total Monthly</span>
                      <span className="text-blue-600 font-bold">{formatCurrency(calculation.totalMonthlyContribution)}</span>
                    </div>
                  </div>
                </div>

                {/* Projected Balance */}
                <div className="text-center py-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mb-4">
                  <p className="text-sm text-slate-500 mb-1">
                    Projected Balance at Age {retirementAge}
                  </p>
                  <p className="text-4xl font-bold text-blue-600">
                    {formatCurrency(calculation.projectedBalance)}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    In {calculation.yearsToRetirement} years
                  </p>
                </div>

                {/* Account Breakdown */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Account 1 (70%)</p>
                    <p className="text-lg font-bold text-blue-700">
                      {formatCurrency(calculation.account1Balance)}
                    </p>
                    <p className="text-xs text-slate-400">Retirement savings</p>
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Account 2 (30%)</p>
                    <p className="text-lg font-bold text-indigo-700">
                      {formatCurrency(calculation.account2Balance)}
                    </p>
                    <p className="text-xs text-slate-400">Housing/Education/Health</p>
                  </div>
                </div>

                {/* Growth Breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-600">Current Balance</span>
                    <span className="text-slate-700 font-medium">{formatCurrency(currentBalance)}</span>
                  </div>
                  <div className="flex justify-between text-sm p-3 bg-emerald-50 rounded-xl">
                    <span className="text-emerald-700">Total Contributions</span>
                    <span className="text-emerald-700 font-medium">+ {formatCurrency(calculation.totalContributions)}</span>
                  </div>
                  <div className="flex justify-between text-sm p-3 bg-amber-50 rounded-xl">
                    <span className="text-amber-700">Estimated Dividends</span>
                    <span className="text-amber-700 font-medium">+ {formatCurrency(calculation.totalDividends)}</span>
                  </div>
                </div>

                {/* Projection Chart */}
                <div className="mt-6">
                  <h3 className="font-semibold text-slate-700 mb-3">EPF Balance Growth</h3>
                  <div className="bg-slate-50 rounded-xl p-4">
                    {calculation.yearlyBalances.length > 1 ? (
                      <>
                        {/* Chart container with fixed height */}
                        <div className="relative" style={{ height: "160px" }}>
                          <div className="absolute inset-0 flex items-end justify-between gap-1">
                            {(() => {
                              // Filter data points for display
                              const data = calculation.yearlyBalances.filter((_, index) => {
                                const totalYears = calculation.yearlyBalances.length;
                                if (totalYears <= 12) return true;
                                const step = Math.ceil(totalYears / 12);
                                return index % step === 0 || index === totalYears - 1;
                              });

                              const chartMax = data[data.length - 1]?.balance || 1;
                              const chartHeight = 140; // pixels for bars

                              return data.map((item, index) => {
                                const barHeight = Math.max((item.balance / chartMax) * chartHeight, 12);
                                const isLast = index === data.length - 1;

                                return (
                                  <div
                                    key={`bar-${item.age}`}
                                    className="flex-1 flex flex-col items-center justify-end"
                                  >
                                    {/* Bar */}
                                    <div
                                      className={`w-full max-w-6 rounded-t transition-all cursor-pointer ${
                                        isLast ? "bg-blue-600" : "bg-blue-400"
                                      } hover:bg-blue-500`}
                                      style={{ height: `${barHeight}px` }}
                                      title={`Age ${item.age}: ${formatCurrency(item.balance)}`}
                                    />
                                    {/* Age label */}
                                    <span className="text-xs text-slate-500 mt-1">{item.age}</span>
                                  </div>
                                );
                              });
                            })()}
                          </div>
                        </div>
                        {/* Legend */}
                        <div className="flex justify-between text-xs text-slate-400 mt-3 pt-2 border-t border-slate-200">
                          <span>Start: {formatCurrency(currentBalance)}</span>
                          <span>Final: {formatCurrency(calculation.projectedBalance)}</span>
                        </div>
                      </>
                    ) : (
                      <div className="h-40 flex items-center justify-center text-slate-400 text-sm">
                        <p>Adjust your current age to be less than retirement age to see the growth chart</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* On Track Indicator */}
                <div className={`mt-4 p-4 rounded-xl ${calculation.isOnTrack ? "bg-emerald-50 border border-emerald-200" : "bg-amber-50 border border-amber-200"}`}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{calculation.isOnTrack ? "✅" : "⚠️"}</div>
                    <div>
                      <p className={`font-semibold ${calculation.isOnTrack ? "text-emerald-800" : "text-amber-800"}`}>
                        {calculation.isOnTrack ? "On Track for Retirement!" : "May Need to Save More"}
                      </p>
                      <p className="text-sm text-slate-600">
                        Recommended: {formatCurrency(calculation.recommendedSavings)} by age {retirementAge}.
                        You&apos;ll have {calculation.isOnTrack ? "more than enough" : `${formatCurrency(calculation.recommendedSavings - calculation.projectedBalance)} short`}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Consultation CTA */}
              <TaxConsultationCTA lang="en" />

              {/* Related Calculator */}
              <div className="bg-white rounded-xl p-4 border border-slate-200 mt-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📊</span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm">Calculate Your Net Salary</p>
                    <p className="text-xs text-slate-500 mt-1">
                      See your actual take-home pay after all deductions
                    </p>
                    <Link
                      href="/tax/monthly-salary-calculator-malaysia/"
                      className="inline-flex items-center gap-1 text-xs font-medium text-teal-600 hover:text-teal-700 mt-2 transition-colors"
                    >
                      Salary Calculator
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
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
