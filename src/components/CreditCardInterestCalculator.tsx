"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

const INTEREST_TIERS = [
  { label: "Tier 1: 15% p.a. (Good - paid on time 12 consecutive months)", value: 15 },
  { label: "Tier 2: 17% p.a. (Moderate - paid on time 10+ months)", value: 17 },
  { label: "Tier 3: 18% p.a. (Poor - less than 10 months on-time)", value: 18 },
];

const PAYMENT_METHODS = [
  { label: "Minimum payment (5% or RM50, whichever higher)", value: "minimum" },
  { label: "Fixed amount per month", value: "fixed" },
  { label: "Full balance", value: "full" },
];

export default function CreditCardInterestCalculator() {
  const currentYear = new Date().getFullYear();
  const [outstandingBalance, setOutstandingBalance] = useState(10000);
  const [interestRate, setInterestRate] = useState(18);
  const [paymentMethod, setPaymentMethod] = useState("minimum");
  const [fixedPayment, setFixedPayment] = useState(500);

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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Calculate payoff details
  const calculatePayoff = (balance: number, rate: number, getPayment: (bal: number) => number) => {
    const monthlyRate = rate / 100 / 12;
    let remainingBalance = balance;
    let totalInterest = 0;
    let months = 0;
    const maxMonths = 600; // Cap at 50 years

    while (remainingBalance > 0.01 && months < maxMonths) {
      const monthlyInterest = remainingBalance * monthlyRate;
      totalInterest += monthlyInterest;
      remainingBalance += monthlyInterest;

      const payment = Math.min(getPayment(remainingBalance), remainingBalance);
      remainingBalance -= payment;
      months++;

      // Prevent infinite loop if payment is less than interest
      if (payment <= monthlyInterest && months > 1) {
        return {
          months: -1, // Indicates will never pay off
          totalInterest: -1,
          totalPaid: -1,
          firstPayment: getPayment(balance),
        };
      }
    }

    return {
      months,
      totalInterest,
      totalPaid: balance + totalInterest,
      firstPayment: getPayment(balance),
    };
  };

  const calculation = useMemo(() => {
    const dailyRate = interestRate / 100 / 365;
    const monthlyRate = interestRate / 100 / 12;
    const monthlyInterestCharge = outstandingBalance * monthlyRate;

    // Calculate minimum payment
    const getMinimumPayment = (bal: number) => Math.max(bal * 0.05, 50);

    // Get payment function based on method
    const getPayment = (bal: number) => {
      switch (paymentMethod) {
        case "minimum":
          return getMinimumPayment(bal);
        case "fixed":
          return fixedPayment;
        case "full":
          return bal;
        default:
          return getMinimumPayment(bal);
      }
    };

    // Main calculation
    const payoffResult = calculatePayoff(outstandingBalance, interestRate, getPayment);

    // Comparison calculations
    const minimumPayoff = calculatePayoff(outstandingBalance, interestRate, getMinimumPayment);
    const fixed300Payoff = calculatePayoff(outstandingBalance, interestRate, () => 300);
    const fixed500Payoff = calculatePayoff(outstandingBalance, interestRate, () => 500);
    const fixed1000Payoff = calculatePayoff(outstandingBalance, interestRate, () => 1000);

    // Calculate potential savings with personal loan (8% vs 18%)
    const personalLoanRate = 0.08;
    const personalLoanMonthlyRate = personalLoanRate / 12;
    const personalLoanMonths = 36; // 3 year term
    const personalLoanPayment =
      (outstandingBalance * personalLoanMonthlyRate * Math.pow(1 + personalLoanMonthlyRate, personalLoanMonths)) /
      (Math.pow(1 + personalLoanMonthlyRate, personalLoanMonths) - 1);
    const personalLoanTotalPaid = personalLoanPayment * personalLoanMonths;
    const personalLoanTotalInterest = personalLoanTotalPaid - outstandingBalance;

    // Savings = credit card interest - personal loan interest (using minimum payment scenario)
    const potentialSavings =
      minimumPayoff.totalInterest > 0
        ? minimumPayoff.totalInterest - personalLoanTotalInterest
        : 0;

    return {
      dailyRate,
      monthlyRate,
      monthlyInterestCharge,
      payoffMonths: payoffResult.months,
      totalInterest: payoffResult.totalInterest,
      totalPaid: payoffResult.totalPaid,
      firstPayment: payoffResult.firstPayment,
      comparison: [
        {
          method: "Minimum (5%)",
          payment: minimumPayoff.firstPayment,
          months: minimumPayoff.months,
          totalInterest: minimumPayoff.totalInterest,
        },
        {
          method: "Fixed RM300",
          payment: 300,
          months: fixed300Payoff.months,
          totalInterest: fixed300Payoff.totalInterest,
        },
        {
          method: "Fixed RM500",
          payment: 500,
          months: fixed500Payoff.months,
          totalInterest: fixed500Payoff.totalInterest,
        },
        {
          method: "Fixed RM1,000",
          payment: 1000,
          months: fixed1000Payoff.months,
          totalInterest: fixed1000Payoff.totalInterest,
        },
      ],
      potentialSavings,
      minimumPayoffMonths: minimumPayoff.months,
      minimumTotalInterest: minimumPayoff.totalInterest,
    };
  }, [outstandingBalance, interestRate, paymentMethod, fixedPayment]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatMonths = (months: number) => {
    if (months === -1) return "Never";
    if (months >= 12) {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      if (remainingMonths === 0) return `${years} year${years > 1 ? "s" : ""}`;
      return `${years}y ${remainingMonths}m`;
    }
    return `${months} month${months > 1 ? "s" : ""}`;
  };

  const showWarning =
    calculation.payoffMonths > 24 || calculation.payoffMonths === -1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-violet-700 text-white py-10 md:py-14">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">💳 Credit Card Calculator</div>
          <div className="text-5xl md:text-6xl mb-4">💳</div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Credit Card Interest Calculator Malaysia {currentYear}</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">Calculate interest charges and see how long it takes to pay off your balance</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
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
                    value={outstandingBalance}
                    onChange={(e) =>
                      setOutstandingBalance(Math.max(0, Math.min(200000, Number(e.target.value))))
                    }
                    min={0}
                    max={200000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={outstandingBalance}
                    onChange={(e) => setOutstandingBalance(Number(e.target.value))}
                    min={500}
                    max={100000}
                    step={500}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>RM 500</span>
                    <span>RM 100,000</span>
                  </div>
                </div>
              </div>

              {/* Interest Rate Tier */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Interest Rate Tier (Bank Negara)
                </label>
                <select
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {INTEREST_TIERS.map((tier) => (
                    <option key={tier.value} value={tier.value}>
                      {tier.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Monthly Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {PAYMENT_METHODS.map((method) => (
                    <option key={method.value} value={method.value}>
                      {method.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fixed Payment Amount */}
              {paymentMethod === "fixed" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Fixed Payment Amount (RM)
                  </label>
                  <div className="space-y-3">
                    <input
                      type="number"
                      value={fixedPayment}
                      onChange={(e) =>
                        setFixedPayment(Math.max(50, Math.min(50000, Number(e.target.value))))
                      }
                      min={50}
                      max={50000}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <input
                      type="range"
                      value={fixedPayment}
                      onChange={(e) => setFixedPayment(Number(e.target.value))}
                      min={100}
                      max={5000}
                      step={50}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>RM 100</span>
                      <span>RM 5,000</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Info Card */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong>Bank Negara Tiered Rates:</strong> Your interest rate depends on your
                  payment history. Paying on time consistently can drop your rate from 18% to 15%.
                </p>
              </div>
            </div>
          </div>

          {/* Result Card - Right Side */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">
                  Interest Calculation
                </h2>

                {/* Interest Rates Display */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Daily Interest Rate</p>
                    <p className="text-xl font-bold text-slate-700">
                      {(calculation.dailyRate * 100).toFixed(4)}%
                    </p>
                    <p className="text-xs text-slate-400">APR ÷ 365</p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Monthly Interest</p>
                    <p className="text-xl font-bold text-red-600">
                      {formatCurrency(calculation.monthlyInterestCharge)}
                    </p>
                    <p className="text-xs text-slate-400">on current balance</p>
                  </div>
                </div>

                {/* Main Results */}
                {paymentMethod !== "full" ? (
                  <>
                    <div className="text-center py-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mb-4">
                      <p className="text-sm text-slate-500 mb-1">Time to Pay Off</p>
                      <p className="text-4xl font-bold text-blue-600">
                        {formatMonths(calculation.payoffMonths)}
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        paying{" "}
                        {paymentMethod === "minimum"
                          ? `minimum (${formatCurrency(calculation.firstPayment)} first month)`
                          : formatCurrency(fixedPayment) + "/month"}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-red-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-slate-500 mb-1">Total Interest Paid</p>
                        <p className="text-xl font-bold text-red-600">
                          {calculation.totalInterest === -1
                            ? "∞"
                            : formatCurrency(calculation.totalInterest)}
                        </p>
                      </div>
                      <div className="bg-indigo-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-slate-500 mb-1">Total Amount Paid</p>
                        <p className="text-xl font-bold text-indigo-700">
                          {calculation.totalPaid === -1
                            ? "∞"
                            : formatCurrency(calculation.totalPaid)}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl mb-4">
                    <p className="text-sm text-slate-500 mb-1">Smart Choice!</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      Pay Full Balance
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      No interest charged if paid by due date
                    </p>
                  </div>
                )}

                {/* Warning Message */}
                {showWarning && paymentMethod !== "full" && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⚠️</span>
                      <div>
                        <p className="font-semibold text-amber-800">Warning: Debt Trap!</p>
                        <p className="text-sm text-amber-700 mt-1">
                          {calculation.payoffMonths === -1
                            ? "Your payment is less than monthly interest. You'll never pay off this debt!"
                            : `Paying only ${paymentMethod === "minimum" ? "minimum" : formatCurrency(fixedPayment) + "/month"} will cost you ${formatCurrency(calculation.totalInterest)} in interest and take ${formatMonths(calculation.payoffMonths)} to clear!`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Comparison Table */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-slate-600 mb-3">
                    Payment Comparison
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-slate-500">
                          <th className="text-left py-2 font-medium">Method</th>
                          <th className="text-right py-2 font-medium">Monthly</th>
                          <th className="text-right py-2 font-medium">Time</th>
                          <th className="text-right py-2 font-medium">Interest</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-700">
                        {calculation.comparison.map((row, index) => (
                          <tr
                            key={row.method}
                            className={index > 0 ? "border-t border-slate-200" : ""}
                          >
                            <td className="py-2">{row.method}</td>
                            <td className="text-right py-2">{formatCurrency(row.payment)}</td>
                            <td className="text-right py-2">{formatMonths(row.months)}</td>
                            <td className="text-right py-2">
                              {row.totalInterest === -1
                                ? "∞"
                                : formatCurrency(row.totalInterest)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate-400 mt-3">
                    Higher payments = less interest paid over time
                  </p>
                </div>
              </div>

              {/* Smarter Options */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">💡</span>
                  <h3 className="font-semibold text-slate-800">Get Out of Debt Faster</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Personal Loan Box */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl">💵</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">
                          Consolidate with Personal Loan
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Pay 8% interest instead of {interestRate}%. Save{" "}
                          <span className="font-bold text-emerald-600">
                            {calculation.potentialSavings > 0
                              ? formatCurrency(calculation.potentialSavings)
                              : "RM 0"}
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
                          0% interest for 6-12 months on transferred balance
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

      {/* Floating Desktop CTA */}
      <div className="hidden md:flex fixed bottom-5 right-6 z-50 flex-col items-end gap-2">
        {showBackToTop && (
          <button onClick={scrollToTop} className="w-10 h-10 bg-white border border-slate-200 rounded-full shadow-md hover:bg-slate-50 transition-all flex items-center justify-center" aria-label="Back to top">
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
          </button>
        )}
        {showFloatingCTA && (
          <>
            <div className="bg-white px-3 py-1.5 rounded-full shadow-md text-xs text-slate-500">8,000+ calculations · Free to use</div>
            <button onClick={scrollToTop} className="px-5 py-2.5 text-white font-bold rounded-full shadow-lg transition-all hover:opacity-90 text-sm" style={{ backgroundColor: "#C62828" }}>
              Check Offers →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
