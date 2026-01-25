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

interface PersonalLoanCalculatorProps {
  locale?: "en" | "ms";
}

const TENURE_OPTIONS_EN = [
  { label: "1 Year", value: 1 },
  { label: "2 Years", value: 2 },
  { label: "3 Years", value: 3 },
  { label: "4 Years", value: 4 },
  { label: "5 Years", value: 5 },
  { label: "7 Years", value: 7 },
];

const TENURE_OPTIONS_MS = [
  { label: "1 Tahun", value: 1 },
  { label: "2 Tahun", value: 2 },
  { label: "3 Tahun", value: 3 },
  { label: "4 Tahun", value: 4 },
  { label: "5 Tahun", value: 5 },
  { label: "7 Tahun", value: 7 },
];

const translations = {
  en: {
    title: "Personal Loan Calculator Malaysia 2026 | Based on Salary & DSR",
    subtitle: "Calculate your monthly payment and check eligibility instantly",
    loanAmount: "Loan Amount (RM)",
    interestRate: "Interest Rate (% per annum)",
    loanTenure: "Loan Tenure",
    monthlyIncome: "Monthly Income (RM)",
    loanSummary: "Your Loan Summary",
    monthlyPayment: "Monthly Payment",
    forYears: "for",
    years: "years",
    year: "year",
    months: "months",
    loanAmountLabel: "Loan Amount",
    totalInterest: "Total Interest",
    totalRepayment: "Total Repayment",
    dsr: "Debt Service Ratio (DSR)",
    yourDsr: "Your DSR",
    limit: "limit",
    likelyEligible: "Likely Eligible",
    mayNotQualify: "May Not Qualify",
    dsrWithinRange: "Your DSR is within acceptable range",
    dsrExceeds: "DSR exceeds 70%. Try lower amount or longer tenure",
    talkToExpert: "Talk to Loan Expert",
    freeConsultation: "Free consultation + best rate comparison",
    getExpertAdvice: "Get Expert Advice",
    modalTitle: "Get Expert Advice",
    fullName: "Full Name *",
    email: "Email *",
    whatsapp: "WhatsApp Number *",
    tenure: "Tenure",
    getConsultation: "Get Free Consultation",
    submitting: "Submitting...",
    submitNote: "By submitting, you agree to be contacted by our loan advisors.",
    successMessage: "Thanks! Our loan expert will WhatsApp you within 24 hours",
    errorMessage: "Something went wrong. Please try again.",
    enterName: "Enter your full name",
    enterEmail: "your@email.com",
  },
  ms: {
    title: "Kalkulator Pinjaman Peribadi Malaysia 2026 | Berdasarkan Gaji & DSR",
    subtitle: "Kira bayaran bulanan dan semak kelayakan anda dengan segera",
    loanAmount: "Jumlah Pinjaman (RM)",
    interestRate: "Kadar Faedah (% setahun)",
    loanTenure: "Tempoh Pinjaman",
    monthlyIncome: "Pendapatan Bulanan (RM)",
    loanSummary: "Ringkasan Pinjaman Anda",
    monthlyPayment: "Bayaran Bulanan",
    forYears: "untuk",
    years: "tahun",
    year: "tahun",
    months: "bulan",
    loanAmountLabel: "Jumlah Pinjaman",
    totalInterest: "Jumlah Faedah",
    totalRepayment: "Jumlah Bayaran Balik",
    dsr: "Nisbah Khidmat Hutang (DSR)",
    yourDsr: "DSR Anda",
    limit: "had",
    likelyEligible: "Berkemungkinan Layak",
    mayNotQualify: "Mungkin Tidak Layak",
    dsrWithinRange: "DSR anda dalam julat yang diterima",
    dsrExceeds: "DSR melebihi 70%. Cuba jumlah lebih rendah atau tempoh lebih lama",
    talkToExpert: "Berbincang dengan Pakar Pinjaman",
    freeConsultation: "Perundingan percuma + perbandingan kadar terbaik",
    getExpertAdvice: "Dapatkan Nasihat Pakar",
    modalTitle: "Dapatkan Nasihat Pakar",
    fullName: "Nama Penuh *",
    email: "Emel *",
    whatsapp: "Nombor WhatsApp *",
    tenure: "Tempoh",
    getConsultation: "Dapatkan Perundingan Percuma",
    submitting: "Menghantar...",
    submitNote: "Dengan menghantar, anda bersetuju untuk dihubungi oleh penasihat pinjaman kami.",
    successMessage: "Terima kasih! Pakar pinjaman kami akan WhatsApp anda dalam 24 jam",
    errorMessage: "Sesuatu telah berlaku. Sila cuba lagi.",
    enterName: "Masukkan nama penuh anda",
    enterEmail: "emel@anda.com",
  },
};

export default function PersonalLoanCalculator({ locale = "en" }: PersonalLoanCalculatorProps) {
  const t = translations[locale];
  const TENURE_OPTIONS = locale === "ms" ? TENURE_OPTIONS_MS : TENURE_OPTIONS_EN;
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
  const [showStickyCTA, setShowStickyCTA] = useState(true);
  const [ctaSource, setCtaSource] = useState<"sticky_bar" | "results_card">("results_card");

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

  const showToast = (type: "success" | "error", messageKey: "success" | "error") => {
    const message = messageKey === "success" ? t.successMessage : t.errorMessage;
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  const openModal = (source: "sticky_bar" | "results_card" = "results_card") => {
    setCtaSource(source);
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
      showToast("error", "error");
      setIsSubmitting(false);
      return;
    }

    const deviceType = typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop";
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
      locale: locale,
      device_type: deviceType,
      cta_source: ctaSource,
      referrer: typeof document !== "undefined" ? document.referrer : "",
      landing_page: typeof window !== "undefined" ? window.location.href : "",
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
        showToast("success", "success");
      } else {
        console.error("Webhook error:", response.status, response.statusText);
        showToast("error", "error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("error", "error");
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
          {t.title}
        </h1>
        <p className="text-center text-slate-500 mb-8">
          {t.subtitle}
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.loanAmount}
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
                  {t.interestRate}
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
                  {t.loanTenure}
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
                  {t.monthlyIncome}
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
                  {t.loanSummary}
                </h2>

                {/* Main Payment Display */}
                <div className="text-center py-6 mb-4 bg-gradient-to-br from-emerald-50 to-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 mb-1">{t.monthlyPayment}</p>
                  <p className="text-4xl font-bold text-emerald-600">
                    {formatCurrency(calculation.monthlyPayment)}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    {t.forYears} {tenureYears} {tenureYears > 1 ? t.years : t.year} ({tenureYears * 12} {t.months})
                  </p>
                </div>

                {/* Loan Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500">{t.loanAmountLabel}</span>
                    <span className="text-slate-700 font-medium">{formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500">{t.totalInterest}</span>
                    <span className="text-slate-700 font-medium">{formatCurrency(calculation.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between text-sm p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500">{t.totalRepayment}</span>
                    <span className="text-slate-700 font-bold">{formatCurrency(calculation.totalRepayment)}</span>
                  </div>
                </div>

                {/* DSR & Eligibility Section */}
                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">
                    {t.dsr}
                  </h3>

                  {/* DSR Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-500">{t.yourDsr}</span>
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
                      <span className="text-amber-500">70% {t.limit}</span>
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
                          {calculation.isEligible ? t.likelyEligible : t.mayNotQualify}
                        </p>
                        <p className={`text-sm ${calculation.isEligible ? "text-emerald-600" : "text-red-600"}`}>
                          {calculation.isEligible
                            ? t.dsrWithinRange
                            : t.dsrExceeds}
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
                      <h3 className="text-lg font-bold text-slate-800 mb-1">{t.talkToExpert}</h3>
                      <p className="text-sm text-slate-500">{t.freeConsultation}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openModal("results_card")}
                    className="w-full py-3 mt-4 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white font-semibold transition-colors"
                  >
                    {t.getExpertAdvice}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      {showStickyCTA && calculation.isEligible && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-green-600 shadow-lg safe-area-bottom">
          <button
            onClick={() => setShowStickyCTA(false)}
            className="absolute top-1 right-1 p-1 text-white/70 hover:text-white"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center justify-between py-3 px-4">
            <div className="text-white">
              <p className="font-semibold">{formatCurrency(calculation.monthlyPayment)}/mo</p>
              <p className="text-xs text-white/80">DSR {calculation.dsrPercent.toFixed(1)}% - {locale === "ms" ? "Layak" : "Eligible"}</p>
            </div>
            <button
              onClick={() => openModal("sticky_bar")}
              className="px-4 py-2 bg-white text-green-600 font-semibold rounded-lg text-sm"
            >
              {locale === "ms" ? "Semak →" : "Check →"}
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">{t.modalTitle}</h3>
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
                    <span className="text-slate-500">{t.loanAmountLabel}</span>
                    <span className="text-slate-700 font-medium">{formatCurrency(capturedCalc.loanAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">{t.tenure}</span>
                    <span className="text-slate-700 font-medium">{capturedCalc.tenureYears} {t.years}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">{t.monthlyPayment}</span>
                    <span className="text-emerald-600 font-bold">{formatCurrency(capturedCalc.monthlyPayment)}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={t.enterName}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.enterEmail}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.whatsapp}
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
                  {isSubmitting ? t.submitting : t.getConsultation}
                </button>
              </form>

              <p className="text-xs text-slate-400 text-center mt-4">
                {t.submitNote}
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
