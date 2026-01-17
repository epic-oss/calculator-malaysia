"use client";

import { useState, useMemo } from "react";

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

interface CapturedCalculation {
  loanAmount: number;
  interestRate: number;
  tenureYears: number;
  monthlyIncome: number;
  monthlyPayment: number;
  dsrPercent: number;
}

const TENURE_OPTIONS = [
  { label: "1 Year", value: 1 },
  { label: "2 Years", value: 2 },
  { label: "3 Years", value: 3 },
  { label: "4 Years", value: 4 },
  { label: "5 Years", value: 5 },
  { label: "7 Years", value: 7 },
];

export default function PersonalLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(30000);
  const [interestRate, setInterestRate] = useState(8);
  const [tenureYears, setTenureYears] = useState(3);
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "+60",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });
  const [capturedCalc, setCapturedCalc] = useState<CapturedCalculation | null>(null);

  const calculation = useMemo(() => {
    // Flat rate calculation (common for Malaysian personal loans)
    const totalInterest = loanAmount * (interestRate / 100) * tenureYears;
    const totalRepayment = loanAmount + totalInterest;
    const monthlyPayment = totalRepayment / (tenureYears * 12);

    // DSR calculation (monthly payment / monthly income * 100)
    const dsrPercent = (monthlyPayment / monthlyIncome) * 100;

    // Eligibility based on DSR (most banks require < 70%)
    const isEligible = dsrPercent <= 70;

    return {
      monthlyPayment,
      totalRepayment,
      totalInterest,
      dsrPercent,
      isEligible,
    };
  }, [loanAmount, interestRate, tenureYears, monthlyIncome]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 2,
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
      loanAmount,
      interestRate,
      tenureYears,
      monthlyIncome,
      monthlyPayment: Math.round(calculation.monthlyPayment),
      dsrPercent: Math.round(calculation.dsrPercent * 10) / 10,
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
      whatsapp: formData.phone,
      email: formData.email,
      calculator_type: "personal_loan",
      loan_amount: capturedCalc.loanAmount,
      interest_rate: capturedCalc.interestRate,
      tenure_years: capturedCalc.tenureYears,
      monthly_income: capturedCalc.monthlyIncome,
      monthly_payment: capturedCalc.monthlyPayment,
      dsr_percent: capturedCalc.dsrPercent,
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
    setFormData({ fullName: "", email: "", phone: "+60" });
    setCapturedCalc(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Personal Loan Calculator
        </h1>
        <p className="text-center text-slate-500 mb-8">
          Calculate your monthly payment and check eligibility instantly
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Loan Amount (RM)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Math.max(5000, Math.min(200000, Number(e.target.value))))}
                    min={5000}
                    max={200000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    min={5000}
                    max={200000}
                    step={1000}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>RM 5,000</span>
                    <span>RM 200,000</span>
                  </div>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Interest Rate (% per annum)
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Math.max(5, Math.min(15, Number(e.target.value))))}
                      min={5}
                      max={15}
                      step={0.1}
                      className="w-24 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                    <span className="text-slate-500">%</span>
                  </div>
                  <input
                    type="range"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    min={5}
                    max={15}
                    step={0.5}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>5%</span>
                    <span>15%</span>
                  </div>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Loan Tenure
                </label>
                <select
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                >
                  {TENURE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Monthly Income */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Monthly Income (RM)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Math.max(2000, Math.min(30000, Number(e.target.value))))}
                    min={2000}
                    max={30000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    min={2000}
                    max={30000}
                    step={500}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>RM 2,000</span>
                    <span>RM 30,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Result Card - Right Side */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">
                  Your Loan Summary
                </h2>

                {/* Main Payment Display */}
                <div className="text-center py-6 mb-4 bg-gradient-to-br from-emerald-50 to-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 mb-1">Monthly Payment</p>
                  <p className="text-4xl font-bold text-emerald-600">
                    {formatCurrency(calculation.monthlyPayment)}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    for {tenureYears} year{tenureYears > 1 ? "s" : ""} ({tenureYears * 12} months)
                  </p>
                </div>

                {/* Loan Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500">Loan Amount</span>
                    <span className="text-slate-700 font-medium">{formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500">Total Interest</span>
                    <span className="text-slate-700 font-medium">{formatCurrency(calculation.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between text-sm p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500">Total Repayment</span>
                    <span className="text-slate-700 font-bold">{formatCurrency(calculation.totalRepayment)}</span>
                  </div>
                </div>

                {/* DSR & Eligibility Section */}
                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">
                    Debt Service Ratio (DSR)
                  </h3>

                  {/* DSR Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-500">Your DSR</span>
                      <span className={`font-bold ${calculation.isEligible ? "text-emerald-600" : "text-red-600"}`}>
                        {calculation.dsrPercent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          calculation.dsrPercent <= 50
                            ? "bg-emerald-500"
                            : calculation.dsrPercent <= 70
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${Math.min(calculation.dsrPercent, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>0%</span>
                      <span className="text-amber-500">70% limit</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Eligibility Card */}
                  <div className={`p-4 rounded-xl ${
                    calculation.isEligible
                      ? "bg-emerald-50 border border-emerald-200"
                      : "bg-red-50 border border-red-200"
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        calculation.isEligible ? "bg-emerald-100" : "bg-red-100"
                      }`}>
                        {calculation.isEligible ? (
                          <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className={`font-semibold ${calculation.isEligible ? "text-emerald-800" : "text-red-800"}`}>
                          {calculation.isEligible ? "Likely Eligible" : "May Not Qualify"}
                        </p>
                        <p className={`text-sm ${calculation.isEligible ? "text-emerald-600" : "text-red-600"}`}>
                          {calculation.isEligible
                            ? "Your DSR is within acceptable range"
                            : "DSR exceeds 70%. Try lower amount or longer tenure"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">💬</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-800 mb-1">Talk to Loan Expert</h3>
                      <p className="text-sm text-slate-500">Free consultation + best rate comparison</p>
                    </div>
                  </div>
                  <button
                    onClick={openModal}
                    className="w-full py-3 mt-4 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white font-semibold transition-colors"
                  >
                    Get Expert Advice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Get Expert Advice</h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Pre-filled Data Display */}
              {capturedCalc && (
                <div className="mb-6 p-4 bg-slate-50 rounded-xl space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Loan Amount</span>
                    <span className="text-slate-700 font-medium">{formatCurrency(capturedCalc.loanAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Tenure</span>
                    <span className="text-slate-700 font-medium">{capturedCalc.tenureYears} years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Monthly Payment</span>
                    <span className="text-emerald-600 font-bold">{formatCurrency(capturedCalc.monthlyPayment)}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+60123456789"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all mt-2"
                >
                  {isSubmitting ? "Submitting..." : "Get Free Consultation"}
                </button>
              </form>

              <p className="text-xs text-slate-400 text-center mt-4">
                By submitting, you agree to be contacted by our loan advisors.
              </p>
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
                ? "bg-emerald-600 text-white"
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
