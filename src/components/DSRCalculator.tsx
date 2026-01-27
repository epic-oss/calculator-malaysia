"use client";

import { useState, useMemo } from "react";

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

interface DebtItem {
  id: string;
  name: string;
  amount: number;
}

export default function DSRCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [debts, setDebts] = useState<DebtItem[]>([
    { id: "housing", name: "Housing Loan", amount: 0 },
    { id: "car", name: "Car Loan", amount: 0 },
    { id: "personal", name: "Personal Loan", amount: 0 },
    { id: "creditCard", name: "Credit Card (Minimum)", amount: 0 },
    { id: "ptptn", name: "PTPTN", amount: 0 },
  ]);
  const [newLoanPayment, setNewLoanPayment] = useState(500);
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

  const calculation = useMemo(() => {
    const totalExistingDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);
    const totalDebtWithNewLoan = totalExistingDebt + newLoanPayment;

    const currentDSR = (totalExistingDebt / monthlyIncome) * 100;
    const newDSR = (totalDebtWithNewLoan / monthlyIncome) * 100;

    // Calculate max loan payment at 70% DSR
    const maxMonthlyDebt = monthlyIncome * 0.7;
    const availableForNewLoan = Math.max(0, maxMonthlyDebt - totalExistingDebt);

    // Determine status
    let status: "excellent" | "good" | "warning" | "danger";
    let statusText: string;
    let statusDescription: string;

    if (newDSR <= 40) {
      status = "excellent";
      statusText = "Excellent";
      statusDescription = "Your DSR is very healthy. You have excellent chances of loan approval and may qualify for better rates.";
    } else if (newDSR <= 60) {
      status = "good";
      statusText = "Good";
      statusDescription = "Your DSR is within acceptable range. Most banks will consider your application favorably.";
    } else if (newDSR <= 70) {
      status = "warning";
      statusText = "Borderline";
      statusDescription = "Your DSR is at the limit. Some banks may reject your application. Consider reducing the loan amount.";
    } else {
      status = "danger";
      statusText = "Too High";
      statusDescription = "Your DSR exceeds 70%. Most banks will reject your application. Reduce debts or loan amount first.";
    }

    return {
      totalExistingDebt,
      totalDebtWithNewLoan,
      currentDSR,
      newDSR,
      availableForNewLoan,
      status,
      statusText,
      statusDescription,
    };
  }, [monthlyIncome, debts, newLoanPayment]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const updateDebt = (id: string, amount: number) => {
    setDebts(debts.map(debt =>
      debt.id === id ? { ...debt, amount: Math.max(0, amount) } : debt
    ));
  };

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ fullName: "", email: "", phone: "+60" });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadData = {
      timestamp: new Date().toISOString(),
      name: formData.fullName,
      whatsapp: formData.phone,
      email: formData.email,
      calculator_type: "dsr_calculator",
      monthly_income: monthlyIncome,
      total_existing_debt: calculation.totalExistingDebt,
      new_loan_payment: newLoanPayment,
      current_dsr: Math.round(calculation.currentDSR * 10) / 10,
      new_dsr: Math.round(calculation.newDSR * 10) / 10,
      dsr_status: calculation.statusText,
      available_for_new_loan: Math.round(calculation.availableForNewLoan),
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

  const getGaugeColor = () => {
    switch (calculation.status) {
      case "excellent": return "text-emerald-500";
      case "good": return "text-blue-500";
      case "warning": return "text-amber-500";
      case "danger": return "text-red-500";
    }
  };

  const getGaugeBgColor = () => {
    switch (calculation.status) {
      case "excellent": return "bg-emerald-500";
      case "good": return "bg-blue-500";
      case "warning": return "bg-amber-500";
      case "danger": return "bg-red-500";
    }
  };

  const getStatusBgColor = () => {
    switch (calculation.status) {
      case "excellent": return "bg-emerald-50 border-emerald-200";
      case "good": return "bg-blue-50 border-blue-200";
      case "warning": return "bg-amber-50 border-amber-200";
      case "danger": return "bg-red-50 border-red-200";
    }
  };

  const getStatusTextColor = () => {
    switch (calculation.status) {
      case "excellent": return "text-emerald-700";
      case "good": return "text-blue-700";
      case "warning": return "text-amber-700";
      case "danger": return "text-red-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          DSR Calculator Malaysia 2026
        </h1>
        <p className="text-center text-slate-500 mb-8">
          Calculate your Debt Service Ratio and check loan eligibility
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
              {/* Monthly Income */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Monthly Gross Income (RM)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Math.max(1000, Math.min(50000, Number(e.target.value))))}
                    min={1000}
                    max={50000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    min={1000}
                    max={50000}
                    step={500}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>RM 1,000</span>
                    <span>RM 50,000</span>
                  </div>
                </div>
              </div>

              {/* Existing Debts */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Existing Monthly Debt Payments
                </label>
                <div className="space-y-3">
                  {debts.map((debt) => (
                    <div key={debt.id} className="flex items-center gap-3">
                      <span className="text-sm text-slate-600 w-40 flex-shrink-0">{debt.name}</span>
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-slate-400">RM</span>
                        <input
                          type="number"
                          value={debt.amount || ""}
                          onChange={(e) => updateDebt(debt.id, Number(e.target.value))}
                          placeholder="0"
                          min={0}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-right"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-3 bg-slate-100 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Total Existing Debts:</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(calculation.totalExistingDebt)}</span>
                  </div>
                </div>
              </div>

              {/* New Loan Payment */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Loan Monthly Payment (RM)
                </label>
                <p className="text-xs text-slate-500 mb-3">
                  Enter the monthly payment for the loan you want to apply for
                </p>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={newLoanPayment}
                    onChange={(e) => setNewLoanPayment(Math.max(0, Math.min(10000, Number(e.target.value))))}
                    min={0}
                    max={10000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={newLoanPayment}
                    onChange={(e) => setNewLoanPayment(Number(e.target.value))}
                    min={0}
                    max={10000}
                    step={100}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>RM 0</span>
                    <span>RM 10,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Result Card - Right Side */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-8 space-y-6">
              {/* DSR Gauge */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4 text-center">
                  Your Debt Service Ratio (DSR)
                </h2>

                {/* Visual Gauge */}
                <div className="relative pt-4 pb-6">
                  {/* Gauge Background */}
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div className="flex h-full">
                      <div className="bg-emerald-400 h-full" style={{ width: "40%" }}></div>
                      <div className="bg-blue-400 h-full" style={{ width: "20%" }}></div>
                      <div className="bg-amber-400 h-full" style={{ width: "10%" }}></div>
                      <div className="bg-red-400 h-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>

                  {/* Gauge Indicator */}
                  <div
                    className="absolute top-0 transform -translate-x-1/2 transition-all duration-500"
                    style={{ left: `${Math.min(calculation.newDSR, 100)}%` }}
                  >
                    <div className={`w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] ${calculation.status === "excellent" ? "border-t-emerald-600" : calculation.status === "good" ? "border-t-blue-600" : calculation.status === "warning" ? "border-t-amber-600" : "border-t-red-600"}`}></div>
                  </div>

                  {/* Labels */}
                  <div className="flex justify-between text-xs mt-2">
                    <span className="text-emerald-600">0%</span>
                    <span className="text-emerald-600">40%</span>
                    <span className="text-blue-600">60%</span>
                    <span className="text-amber-600">70%</span>
                    <span className="text-red-600">100%</span>
                  </div>
                </div>

                {/* DSR Value Display */}
                <div className="text-center mb-6">
                  <div className={`text-5xl font-bold ${getGaugeColor()}`}>
                    {calculation.newDSR.toFixed(1)}%
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    After new loan
                  </p>
                </div>

                {/* Current vs New DSR */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">Current DSR</p>
                    <p className="text-xl font-bold text-slate-700">{calculation.currentDSR.toFixed(1)}%</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">Available Monthly</p>
                    <p className="text-xl font-bold text-emerald-600">{formatCurrency(calculation.availableForNewLoan)}</p>
                  </div>
                </div>

                {/* Status Card */}
                <div className={`p-4 rounded-xl border ${getStatusBgColor()}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getGaugeBgColor()}`}>
                      {calculation.status === "excellent" || calculation.status === "good" ? (
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : calculation.status === "warning" ? (
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className={`font-semibold ${getStatusTextColor()}`}>
                        {calculation.statusText}
                      </p>
                      <p className="text-sm text-slate-600">
                        {calculation.statusDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips Box */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Tips to Improve DSR</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">1.</span>
                    <span>Pay off credit card balances to reduce monthly minimums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">2.</span>
                    <span>Settle smaller loans first to free up DSR capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">3.</span>
                    <span>Choose longer tenure to lower monthly payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">4.</span>
                    <span>Include all income sources (allowances, rental income)</span>
                  </li>
                </ul>
              </div>

              {/* CTA Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💬</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Need Loan Advice?</h3>
                    <p className="text-sm text-slate-500">Free consultation + personalized recommendations</p>
                  </div>
                </div>
                <button
                  onClick={openModal}
                  className="w-full py-3 mt-4 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white font-semibold transition-colors"
                >
                  Talk to Loan Expert
                </button>
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
              <div className="mb-6 p-4 bg-slate-50 rounded-xl space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Monthly Income</span>
                  <span className="text-slate-700 font-medium">{formatCurrency(monthlyIncome)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Current DSR</span>
                  <span className="text-slate-700 font-medium">{calculation.currentDSR.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">New DSR</span>
                  <span className={`font-bold ${getGaugeColor()}`}>{calculation.newDSR.toFixed(1)}%</span>
                </div>
              </div>

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
