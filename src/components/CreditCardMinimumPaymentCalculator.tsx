"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const MINIMUM_PAYMENT_OPTIONS = [
  { label: "5% of balance", value: "5%", type: "percent", amount: 0.05 },
  { label: "3% of balance", value: "3%", type: "percent", amount: 0.03 },
  { label: "1% of balance", value: "1%", type: "percent", amount: 0.01 },
  { label: "Fixed RM50", value: "fixed50", type: "fixed", amount: 50 },
];

interface PayoffResult {
  monthlyPayment: number;
  months: number;
  totalInterest: number;
  totalPaid: number;
}

const calculatePayoff = (
  balance: number,
  annualRate: number,
  paymentType: "percent" | "fixed",
  paymentAmount: number,
  minPayment: number = 25
): PayoffResult => {
  const monthlyRate = annualRate / 100 / 12;
  let remainingBalance = balance;
  let totalInterest = 0;
  let months = 0;
  let firstMonthPayment = 0;
  const maxMonths = 600; // 50 years cap to prevent infinite loops

  while (remainingBalance > 0.01 && months < maxMonths) {
    const interest = remainingBalance * monthlyRate;
    totalInterest += interest;

    let payment: number;
    if (paymentType === "percent") {
      payment = Math.max(remainingBalance * paymentAmount, minPayment);
    } else {
      payment = paymentAmount;
    }

    // Ensure payment covers at least the interest plus a bit of principal
    payment = Math.max(payment, interest + 1);

    // Final payment adjustment
    if (payment > remainingBalance + interest) {
      payment = remainingBalance + interest;
    }

    if (months === 0) {
      firstMonthPayment = payment;
    }

    remainingBalance = remainingBalance + interest - payment;
    months++;
  }

  return {
    monthlyPayment: firstMonthPayment,
    months: months >= maxMonths ? 999 : months,
    totalInterest,
    totalPaid: balance + totalInterest,
  };
};

export default function CreditCardMinimumPaymentCalculator() {
  const [balance, setBalance] = useState(10000);
  const [interestRate, setInterestRate] = useState(18);
  const [minimumPayment, setMinimumPayment] = useState("5%");

  const calculation = useMemo(() => {
    const option = MINIMUM_PAYMENT_OPTIONS.find((o) => o.value === minimumPayment);
    if (!option) return null;

    const result = calculatePayoff(
      balance,
      interestRate,
      option.type as "percent" | "fixed",
      option.amount
    );

    // Calculate comparison scenarios
    const fixed500 = calculatePayoff(balance, interestRate, "fixed", 500);
    const fixed1000 = calculatePayoff(balance, interestRate, "fixed", 1000);

    // Calculate potential savings with personal loan (8% vs 18%)
    const personalLoanRate = 8;
    const personalLoanMonths = 36; // 3 year tenure
    const monthlyRatePL = personalLoanRate / 100 / 12;
    const personalLoanPayment =
      (balance * monthlyRatePL * Math.pow(1 + monthlyRatePL, personalLoanMonths)) /
      (Math.pow(1 + monthlyRatePL, personalLoanMonths) - 1);
    const personalLoanTotalInterest = personalLoanPayment * personalLoanMonths - balance;
    const potentialSavings = result.totalInterest - personalLoanTotalInterest;

    return {
      ...result,
      fixed500,
      fixed1000,
      potentialSavings: Math.max(0, potentialSavings),
      isLongPayoff: result.months > 120, // More than 10 years
    };
  }, [balance, interestRate, minimumPayment]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatMonths = (months: number) => {
    if (months >= 999) return "50+ years";
    if (months >= 12) {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      if (remainingMonths === 0) return `${years} year${years > 1 ? "s" : ""}`;
      return `${years}y ${remainingMonths}m`;
    }
    return `${months} month${months > 1 ? "s" : ""}`;
  };

  const selectedOption = MINIMUM_PAYMENT_OPTIONS.find((o) => o.value === minimumPayment);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Credit Card Minimum Payment Calculator
        </h1>
        <p className="text-center text-slate-500 mb-8">
          See how long it takes to pay off your credit card with minimum payments
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
              {/* Outstanding Balance */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Outstanding Balance (RM)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(Math.max(500, Math.min(50000, Number(e.target.value))))}
                    min={500}
                    max={50000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={balance}
                    onChange={(e) => setBalance(Number(e.target.value))}
                    min={500}
                    max={50000}
                    step={500}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>RM 500</span>
                    <span>RM 50,000</span>
                  </div>
                </div>
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
                      onChange={(e) => setInterestRate(Math.max(15, Math.min(18, Number(e.target.value))))}
                      min={15}
                      max={18}
                      step={0.5}
                      className="w-24 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                    <span className="text-slate-500">% per year</span>
                  </div>
                  <input
                    type="range"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    min={15}
                    max={18}
                    step={0.5}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>15%</span>
                    <span>18%</span>
                  </div>
                </div>
              </div>

              {/* Minimum Payment Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Minimum Payment
                </label>
                <select
                  value={minimumPayment}
                  onChange={(e) => setMinimumPayment(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  {MINIMUM_PAYMENT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-2">
                  Most Malaysian banks require 5% minimum payment
                </p>
              </div>

              {/* Info Card */}
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                <p className="text-sm text-orange-800">
                  <strong>Did you know?</strong> Paying only the minimum can cost you more in
                  interest than your original balance. See the results to understand the true cost.
                </p>
              </div>
            </div>
          </div>

          {/* Result Card - Right Side */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">
                  Your Payoff Summary
                </h2>

                {calculation && (
                  <>
                    {/* Key Results */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-slate-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-slate-500 mb-1">Minimum Payment</p>
                        <p className="text-2xl font-bold text-slate-700">
                          {formatCurrency(calculation.monthlyPayment)}
                        </p>
                        <p className="text-xs text-slate-400">
                          {selectedOption?.type === "percent"
                            ? `(${selectedOption.label})`
                            : "Fixed amount"}
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-slate-500 mb-1">Time to Pay Off</p>
                        <p className={`text-2xl font-bold ${calculation.isLongPayoff ? "text-red-600" : "text-slate-700"}`}>
                          {formatMonths(calculation.months)}
                        </p>
                        <p className="text-xs text-slate-400">
                          {calculation.months < 999 ? `${calculation.months} months` : "Forever!"}
                        </p>
                      </div>
                    </div>

                    {/* Interest & Total */}
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between p-3 bg-red-50 rounded-xl">
                        <span className="text-red-700">Total Interest Paid</span>
                        <span className="text-red-700 font-bold">{formatCurrency(calculation.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-slate-100 rounded-xl">
                        <span className="text-slate-700 font-medium">Total Amount Paid</span>
                        <span className="text-slate-800 font-bold">{formatCurrency(calculation.totalPaid)}</span>
                      </div>
                    </div>

                    {/* Warning for long payoff */}
                    {calculation.isLongPayoff && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">⚠️</div>
                          <div>
                            <p className="font-semibold text-red-800">Debt Trap Warning!</p>
                            <p className="text-sm text-red-700">
                              Paying only minimum will cost you{" "}
                              <strong>{formatCurrency(calculation.totalInterest)}</strong> in interest!
                              That&apos;s {((calculation.totalInterest / balance) * 100).toFixed(0)}% of your original balance.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Comparison Table */}
                    <div className="mt-6">
                      <h3 className="font-semibold text-slate-700 mb-3">Payment Comparison</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-slate-100">
                              <th className="px-3 py-2 text-left text-slate-600 font-medium rounded-tl-lg">Payment Method</th>
                              <th className="px-3 py-2 text-right text-slate-600 font-medium">Monthly</th>
                              <th className="px-3 py-2 text-right text-slate-600 font-medium">Months</th>
                              <th className="px-3 py-2 text-right text-slate-600 font-medium rounded-tr-lg">Total Interest</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            <tr className="bg-orange-50">
                              <td className="px-3 py-2 text-slate-700">
                                Minimum ({selectedOption?.label})
                              </td>
                              <td className="px-3 py-2 text-right text-slate-700">
                                {formatCurrency(calculation.monthlyPayment)}
                              </td>
                              <td className="px-3 py-2 text-right text-slate-700">
                                {calculation.months >= 999 ? "999+" : calculation.months}
                              </td>
                              <td className="px-3 py-2 text-right text-red-600 font-medium">
                                {formatCurrency(calculation.totalInterest)}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 text-slate-700">Fixed RM500</td>
                              <td className="px-3 py-2 text-right text-slate-700">RM 500</td>
                              <td className="px-3 py-2 text-right text-slate-700">
                                {calculation.fixed500.months >= 999 ? "999+" : calculation.fixed500.months}
                              </td>
                              <td className="px-3 py-2 text-right text-emerald-600 font-medium">
                                {formatCurrency(calculation.fixed500.totalInterest)}
                              </td>
                            </tr>
                            <tr className="bg-emerald-50">
                              <td className="px-3 py-2 text-slate-700">Fixed RM1,000</td>
                              <td className="px-3 py-2 text-right text-slate-700">RM 1,000</td>
                              <td className="px-3 py-2 text-right text-slate-700">
                                {calculation.fixed1000.months >= 999 ? "999+" : calculation.fixed1000.months}
                              </td>
                              <td className="px-3 py-2 text-right text-emerald-600 font-medium">
                                {formatCurrency(calculation.fixed1000.totalInterest)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        Paying more saves you {formatCurrency(calculation.totalInterest - calculation.fixed1000.totalInterest)} in interest
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Get Out of Debt Faster */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">💡</span>
                  <h3 className="font-semibold text-slate-800">Smarter Options</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Personal Loan Box */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl">💵</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">Consolidate with Personal Loan</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Pay 8% interest instead of 18%. Save{" "}
                          <span className="font-bold text-emerald-600">
                            {calculation ? formatCurrency(calculation.potentialSavings) : "RM 0"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/loan/personal-loan-calculator-malaysia/"
                      className="block w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium text-center hover:bg-blue-700 transition-all mt-auto"
                    >
                      Check Loan Options
                    </Link>
                  </div>

                  {/* Balance Transfer Box */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl">💳</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">Balance Transfer Cards</p>
                        <p className="text-xs text-slate-500 mt-1">
                          0% interest for 12 months on transferred balance
                        </p>
                      </div>
                    </div>
                    <a
                      href="https://invl.me/cln69f8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-2.5 px-4 rounded-lg bg-emerald-600 text-white text-sm font-medium text-center hover:bg-emerald-700 transition-all mt-auto"
                    >
                      Compare Cards
                    </a>
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
