"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

const PROPERTY_TYPES = [
  { label: "First Property (90% financing)", value: "first", maxFinancing: 0.9 },
  { label: "Second Property (70% financing)", value: "second", maxFinancing: 0.7 },
  { label: "Third Property+ (60% financing)", value: "third", maxFinancing: 0.6 },
];

const LOAN_TENURES = [
  { label: "35 years", value: 35 },
  { label: "30 years", value: 30 },
  { label: "25 years", value: 25 },
  { label: "20 years", value: 20 },
];

export default function JointHomeLoanCalculator() {
  const currentYear = new Date().getFullYear();
  // Applicant 1
  const [applicant1Income, setApplicant1Income] = useState(6000);
  const [applicant1Commitments, setApplicant1Commitments] = useState(1000);

  // Applicant 2
  const [applicant2Income, setApplicant2Income] = useState(5000);
  const [applicant2Commitments, setApplicant2Commitments] = useState(500);

  // Loan parameters
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTenure, setLoanTenure] = useState(30);
  const [propertyType, setPropertyType] = useState("first");

  // Lead capture modal state
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Calculate max loan based on income and commitments
  const calculateMaxLoan = (income: number, commitments: number) => {
    const maxDSR = 0.6;
    const maxMonthlyInstalment = Math.max(0, income * maxDSR - commitments);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTenure * 12;

    if (monthlyRate === 0 || maxMonthlyInstalment <= 0) return 0;

    return (
      maxMonthlyInstalment *
      ((1 - Math.pow(1 + monthlyRate, -numberOfPayments)) / monthlyRate)
    );
  };

  const calculation = useMemo(() => {
    const selectedProperty = PROPERTY_TYPES.find((p) => p.value === propertyType) || PROPERTY_TYPES[0];
    const maxFinancingRate = selectedProperty.maxFinancing;

    // Combined figures
    const combinedIncome = applicant1Income + applicant2Income;
    const combinedCommitments = applicant1Commitments + applicant2Commitments;

    // Individual calculations
    const applicant1MaxLoan = calculateMaxLoan(applicant1Income, applicant1Commitments);
    const applicant2MaxLoan = calculateMaxLoan(applicant2Income, applicant2Commitments);
    const jointMaxLoan = calculateMaxLoan(combinedIncome, combinedCommitments);

    // Max property prices
    const applicant1MaxProperty = applicant1MaxLoan / maxFinancingRate;
    const applicant2MaxProperty = applicant2MaxLoan / maxFinancingRate;
    const jointMaxProperty = jointMaxLoan / maxFinancingRate;

    // Extra borrowing power
    const extraLoanPower = jointMaxLoan - Math.max(applicant1MaxLoan, applicant2MaxLoan);
    const extraPropertyPower = jointMaxProperty - Math.max(applicant1MaxProperty, applicant2MaxProperty);

    // Monthly instalment for joint loan
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTenure * 12;
    const jointMonthlyInstalment =
      jointMaxLoan > 0
        ? (jointMaxLoan * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
        : 0;

    // DSR calculations
    const applicant1DSR =
      applicant1Income > 0 ? (applicant1Commitments / applicant1Income) * 100 : 0;
    const applicant2DSR =
      applicant2Income > 0 ? (applicant2Commitments / applicant2Income) * 100 : 0;
    const currentJointDSR =
      combinedIncome > 0 ? (combinedCommitments / combinedIncome) * 100 : 0;
    const afterLoanJointDSR =
      combinedIncome > 0
        ? ((combinedCommitments + jointMonthlyInstalment) / combinedIncome) * 100
        : 0;

    // Eligibility status
    let eligibilityStatus: "eligible" | "borderline" | "not-eligible";
    let eligibilityMessage: string;

    if (currentJointDSR >= 60) {
      eligibilityStatus = "not-eligible";
      eligibilityMessage = "Combined existing commitments too high. Pay down debts first.";
    } else if (jointMaxLoan <= 0) {
      eligibilityStatus = "not-eligible";
      eligibilityMessage = "Cannot calculate loan eligibility with current inputs.";
    } else if (currentJointDSR >= 45) {
      eligibilityStatus = "borderline";
      eligibilityMessage = "Borderline eligibility. Consider reducing debts for better approval.";
    } else {
      eligibilityStatus = "eligible";
      eligibilityMessage = "Good joint eligibility! Start house hunting together.";
    }

    // Down payment
    const downPaymentRate = 1 - maxFinancingRate;
    const downPaymentRequired = jointMaxProperty * downPaymentRate;

    return {
      combinedIncome,
      combinedCommitments,
      applicant1MaxLoan,
      applicant2MaxLoan,
      jointMaxLoan,
      applicant1MaxProperty,
      applicant2MaxProperty,
      jointMaxProperty,
      extraLoanPower,
      extraPropertyPower,
      jointMonthlyInstalment,
      applicant1DSR,
      applicant2DSR,
      currentJointDSR,
      afterLoanJointDSR,
      eligibilityStatus,
      eligibilityMessage,
      maxFinancingRate,
      downPaymentRate,
      downPaymentRequired,
    };
  }, [
    applicant1Income,
    applicant1Commitments,
    applicant2Income,
    applicant2Commitments,
    interestRate,
    loanTenure,
    propertyType,
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      timestamp: new Date().toISOString(),
      name: leadFormData.name,
      whatsapp: leadFormData.whatsapp,
      email: leadFormData.email,
      calculator_type: "joint_home_loan",
      applicant1_income: applicant1Income,
      applicant1_commitments: applicant1Commitments,
      applicant2_income: applicant2Income,
      applicant2_commitments: applicant2Commitments,
      combined_income: calculation.combinedIncome,
      max_loan_amount: Math.round(calculation.jointMaxLoan),
      max_property_price: Math.round(calculation.jointMaxProperty),
      combined_dsr: calculation.currentJointDSR.toFixed(1),
      source_url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setLeadFormData({ name: "", whatsapp: "", email: "" });
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowLeadModal(false);
    setSubmitSuccess(false);
    setSubmitError("");
  };

  // DSR visual indicator
  const getDSRColor = (dsr: number) => {
    if (dsr < 40) return "text-emerald-600";
    if (dsr < 50) return "text-amber-600";
    return "text-red-600";
  };

  const getDSRBarColor = (dsr: number) => {
    if (dsr < 40) return "bg-emerald-500";
    if (dsr < 50) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-10 md:py-14">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">💰 Joint Loan Calculator</div>
          <div className="text-5xl md:text-6xl mb-4">👫</div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Joint Home Loan Eligibility Calculator Malaysia {currentYear}</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">Calculate combined loan eligibility for couples and co-borrowers</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="space-y-6">
              {/* Applicant 1 Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">👤</span>
                  <h2 className="text-lg font-semibold text-slate-800">Applicant 1</h2>
                </div>

                {/* Applicant 1 Income */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Monthly Gross Income (RM)
                  </label>
                  <div className="space-y-3">
                    <input
                      type="number"
                      value={applicant1Income}
                      onChange={(e) =>
                        setApplicant1Income(Math.max(0, Math.min(100000, Number(e.target.value))))
                      }
                      min={0}
                      max={100000}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <input
                      type="range"
                      value={applicant1Income}
                      onChange={(e) => setApplicant1Income(Number(e.target.value))}
                      min={2000}
                      max={50000}
                      step={500}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>RM 2,000</span>
                      <span>RM 50,000</span>
                    </div>
                  </div>
                </div>

                {/* Applicant 1 Commitments */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Existing Monthly Commitments (RM)
                  </label>
                  <div className="space-y-3">
                    <input
                      type="number"
                      value={applicant1Commitments}
                      onChange={(e) =>
                        setApplicant1Commitments(Math.max(0, Math.min(50000, Number(e.target.value))))
                      }
                      min={0}
                      max={50000}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <input
                      type="range"
                      value={applicant1Commitments}
                      onChange={(e) => setApplicant1Commitments(Number(e.target.value))}
                      min={0}
                      max={10000}
                      step={100}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>RM 0</span>
                      <span>RM 10,000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Applicant 2 Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">👤</span>
                  <h2 className="text-lg font-semibold text-slate-800">Applicant 2</h2>
                </div>

                {/* Applicant 2 Income */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Monthly Gross Income (RM)
                  </label>
                  <div className="space-y-3">
                    <input
                      type="number"
                      value={applicant2Income}
                      onChange={(e) =>
                        setApplicant2Income(Math.max(0, Math.min(100000, Number(e.target.value))))
                      }
                      min={0}
                      max={100000}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <input
                      type="range"
                      value={applicant2Income}
                      onChange={(e) => setApplicant2Income(Number(e.target.value))}
                      min={2000}
                      max={50000}
                      step={500}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>RM 2,000</span>
                      <span>RM 50,000</span>
                    </div>
                  </div>
                </div>

                {/* Applicant 2 Commitments */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Existing Monthly Commitments (RM)
                  </label>
                  <div className="space-y-3">
                    <input
                      type="number"
                      value={applicant2Commitments}
                      onChange={(e) =>
                        setApplicant2Commitments(Math.max(0, Math.min(50000, Number(e.target.value))))
                      }
                      min={0}
                      max={50000}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <input
                      type="range"
                      value={applicant2Commitments}
                      onChange={(e) => setApplicant2Commitments(Number(e.target.value))}
                      min={0}
                      max={10000}
                      step={100}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>RM 0</span>
                      <span>RM 10,000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loan Parameters Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🏦</span>
                  <h2 className="text-lg font-semibold text-slate-800">Loan Parameters</h2>
                </div>

                {/* Interest Rate */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Interest Rate (% p.a.)
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={interestRate}
                        onChange={(e) =>
                          setInterestRate(Math.max(2, Math.min(10, Number(e.target.value))))
                        }
                        min={2}
                        max={10}
                        step={0.1}
                        className="w-24 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      <span className="text-slate-500">% per year</span>
                    </div>
                    <input
                      type="range"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      min={3.5}
                      max={5}
                      step={0.1}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>3.5%</span>
                      <span>5%</span>
                    </div>
                  </div>
                </div>

                {/* Loan Tenure */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Loan Tenure
                  </label>
                  <select
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {LOAN_TENURES.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {PROPERTY_TYPES.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Result Card - Right Side */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">
                  Joint Loan Eligibility
                </h2>

                {/* Eligibility Status */}
                <div
                  className={`p-4 rounded-xl mb-4 ${
                    calculation.eligibilityStatus === "eligible"
                      ? "bg-emerald-50 border border-emerald-200"
                      : calculation.eligibilityStatus === "borderline"
                      ? "bg-amber-50 border border-amber-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">
                      {calculation.eligibilityStatus === "eligible"
                        ? "✅"
                        : calculation.eligibilityStatus === "borderline"
                        ? "⚠️"
                        : "❌"}
                    </div>
                    <div>
                      <p
                        className={`font-semibold ${
                          calculation.eligibilityStatus === "eligible"
                            ? "text-emerald-800"
                            : calculation.eligibilityStatus === "borderline"
                            ? "text-amber-800"
                            : "text-red-800"
                        }`}
                      >
                        {calculation.eligibilityStatus === "eligible"
                          ? "Eligible for Joint Loan"
                          : calculation.eligibilityStatus === "borderline"
                          ? "Borderline Eligibility"
                          : "Not Eligible"}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        {calculation.eligibilityMessage}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Main Results */}
                <div className="text-center py-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mb-4">
                  <p className="text-sm text-slate-500 mb-1">Joint Maximum Loan</p>
                  <p className="text-4xl font-bold text-blue-600">
                    {formatCurrency(calculation.jointMaxLoan)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-emerald-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Max Property Price</p>
                    <p className="text-xl font-bold text-emerald-700">
                      {formatCurrency(calculation.jointMaxProperty)}
                    </p>
                    <p className="text-xs text-slate-400">
                      at {calculation.maxFinancingRate * 100}% financing
                    </p>
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Monthly Instalment</p>
                    <p className="text-xl font-bold text-indigo-700">
                      {formatCurrency(calculation.jointMonthlyInstalment)}
                    </p>
                    <p className="text-xs text-slate-400">for {loanTenure} years</p>
                  </div>
                </div>

                {/* Individual vs Joint Comparison */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-slate-600 mb-3">
                    Individual vs Joint Comparison
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-slate-500">
                          <th className="text-left py-2 font-medium">Scenario</th>
                          <th className="text-right py-2 font-medium">Max Loan</th>
                          <th className="text-right py-2 font-medium">Max Property</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-700">
                        <tr className="border-t border-slate-200">
                          <td className="py-2">Applicant 1 alone</td>
                          <td className="text-right py-2">
                            {formatCurrency(calculation.applicant1MaxLoan)}
                          </td>
                          <td className="text-right py-2">
                            {formatCurrency(calculation.applicant1MaxProperty)}
                          </td>
                        </tr>
                        <tr className="border-t border-slate-200">
                          <td className="py-2">Applicant 2 alone</td>
                          <td className="text-right py-2">
                            {formatCurrency(calculation.applicant2MaxLoan)}
                          </td>
                          <td className="text-right py-2">
                            {formatCurrency(calculation.applicant2MaxProperty)}
                          </td>
                        </tr>
                        <tr className="border-t border-slate-200 bg-blue-50 font-semibold">
                          <td className="py-2">Joint application</td>
                          <td className="text-right py-2 text-blue-600">
                            {formatCurrency(calculation.jointMaxLoan)}
                          </td>
                          <td className="text-right py-2 text-blue-600">
                            {formatCurrency(calculation.jointMaxProperty)}
                          </td>
                        </tr>
                        <tr className="border-t border-slate-200 text-emerald-600">
                          <td className="py-2 font-medium">Extra power 💪</td>
                          <td className="text-right py-2 font-bold">
                            +{formatCurrency(calculation.extraLoanPower)}
                          </td>
                          <td className="text-right py-2 font-bold">
                            +{formatCurrency(calculation.extraPropertyPower)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Combined DSR */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-slate-600 mb-3">
                    Combined Debt Service Ratio (DSR)
                  </p>

                  {/* Current DSR */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">Current Combined DSR</span>
                      <span className={`font-semibold ${getDSRColor(calculation.currentJointDSR)}`}>
                        {calculation.currentJointDSR.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${getDSRBarColor(calculation.currentJointDSR)}`}
                        style={{ width: `${Math.min(calculation.currentJointDSR, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* After Loan DSR */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">After Loan DSR</span>
                      <span className={`font-semibold ${getDSRColor(calculation.afterLoanJointDSR)}`}>
                        {calculation.afterLoanJointDSR.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${getDSRBarColor(calculation.afterLoanJointDSR)}`}
                        style={{ width: `${Math.min(calculation.afterLoanJointDSR, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200">
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-500">&lt;40% Good</span>
                    <div className="h-3 w-3 rounded-full bg-amber-500 ml-2" />
                    <span className="text-xs text-slate-500">40-50% Fair</span>
                    <div className="h-3 w-3 rounded-full bg-red-500 ml-2" />
                    <span className="text-xs text-slate-500">&gt;50% High</span>
                  </div>
                </div>

                {/* Income Summary */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-slate-600 mb-3">Combined Financials</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Applicant 1 Income</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(applicant1Income)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Applicant 2 Income</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(applicant2Income)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                      <span className="text-slate-700 font-semibold">Combined Income</span>
                      <span className="text-blue-600 font-bold">
                        {formatCurrency(calculation.combinedIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                      <span className="text-slate-500">Combined Commitments</span>
                      <span className="text-red-600 font-medium">
                        -{formatCurrency(calculation.combinedCommitments)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                      <span className="text-slate-500">
                        Down Payment ({(calculation.downPaymentRate * 100).toFixed(0)}%)
                      </span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.downPaymentRequired)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Joint Loan Tools */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">👫</span>
                  <h3 className="font-semibold text-slate-800">Next Steps</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Talk to Expert Box */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl">👨‍💼</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">Talk to Loan Expert</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Get personalized advice on joint loan vs separate applications.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowLeadModal(true)}
                      className="block w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium text-center hover:bg-blue-700 transition-all mt-auto"
                    >
                      Get Free Consultation
                    </button>
                  </div>

                  {/* Loan Calculator Box */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl">🧮</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">Calculate Instalment</p>
                        <p className="text-xs text-slate-500 mt-1">
                          See exact monthly payment for specific property prices
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/loan/housing-loan-calculator-malaysia/"
                      className="block w-full py-2.5 px-4 rounded-lg bg-teal-600 text-white text-sm font-medium text-center hover:bg-teal-700 transition-all mt-auto"
                    >
                      Loan Calculator
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {!submitSuccess ? (
              <>
                <div className="text-center mb-6">
                  <span className="text-4xl">👫</span>
                  <h3 className="text-xl font-bold text-slate-800 mt-3">
                    Get Joint Loan Advice
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Our specialist will contact you within 24 hours
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={leadFormData.name}
                      onChange={(e) =>
                        setLeadFormData({ ...leadFormData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={leadFormData.whatsapp}
                      onChange={(e) =>
                        setLeadFormData({ ...leadFormData, whatsapp: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g. 0123456789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={leadFormData.email}
                      onChange={(e) =>
                        setLeadFormData({ ...leadFormData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Pre-filled Info */}
                  <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                    <p className="text-xs font-medium text-slate-600 mb-2">
                      Your Joint Eligibility (Pre-filled)
                    </p>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Combined Income:</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.combinedIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Max Joint Loan:</span>
                      <span className="text-blue-600 font-medium">
                        {formatCurrency(calculation.jointMaxLoan)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Max Property Price:</span>
                      <span className="text-emerald-600 font-medium">
                        {formatCurrency(calculation.jointMaxProperty)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Combined DSR:</span>
                      <span className="text-slate-700 font-medium">
                        {calculation.currentJointDSR.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Get Free Consultation"}
                  </button>

                  <p className="text-xs text-slate-400 text-center">
                    By submitting, you agree to be contacted by our loan specialist.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <span className="text-5xl">✅</span>
                <h3 className="text-xl font-bold text-slate-800 mt-4">Thank You!</h3>
                <p className="text-slate-600 mt-2">
                  Our loan specialist will WhatsApp you within 24 hours.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-6 py-2.5 px-6 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-all"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
