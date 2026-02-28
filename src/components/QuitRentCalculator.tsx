"use client";

import { useState, useMemo } from "react";

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

const PROPERTY_TYPES = [
  { label: "Residential (Kediaman)", value: "residential" },
  { label: "Commercial (Komersial)", value: "commercial" },
  { label: "Agricultural (Pertanian)", value: "agricultural" },
  { label: "Industrial (Perindustrian)", value: "industrial" },
];

const STATES = [
  { label: "Selangor", value: "selangor" },
  { label: "Kuala Lumpur (WP)", value: "kl" },
  { label: "Penang (Pulau Pinang)", value: "penang" },
  { label: "Johor", value: "johor" },
  { label: "Perak", value: "perak" },
  { label: "Negeri Sembilan", value: "ns" },
  { label: "Melaka", value: "melaka" },
  { label: "Kedah", value: "kedah" },
  { label: "Pahang", value: "pahang" },
  { label: "Terengganu", value: "terengganu" },
  { label: "Kelantan", value: "kelantan" },
  { label: "Perlis", value: "perlis" },
  { label: "Sabah", value: "sabah" },
  { label: "Sarawak", value: "sarawak" },
];

const BANKS = [
  "Maybank",
  "CIMB",
  "Public Bank",
  "RHB",
  "Hong Leong",
  "AmBank",
  "Other",
];

const PROPERTY_TYPE_OPTIONS = [
  { label: "Landed", value: "landed" },
  { label: "Condo", value: "condo" },
  { label: "Apartment", value: "apartment" },
];

// Quit rent rates per sq ft (approximate - actual rates vary by district)
// Rates are in RM per sq ft per year
const QUIT_RENT_RATES: Record<string, Record<string, { rate: number; minCharge: number }>> = {
  selangor: {
    residential: { rate: 0.035, minCharge: 10 },
    commercial: { rate: 0.10, minCharge: 25 },
    agricultural: { rate: 0.02, minCharge: 10 },
    industrial: { rate: 0.12, minCharge: 50 },
  },
  kl: {
    residential: { rate: 0.04, minCharge: 15 },
    commercial: { rate: 0.12, minCharge: 30 },
    agricultural: { rate: 0.025, minCharge: 15 },
    industrial: { rate: 0.15, minCharge: 50 },
  },
  penang: {
    residential: { rate: 0.03, minCharge: 10 },
    commercial: { rate: 0.08, minCharge: 20 },
    agricultural: { rate: 0.015, minCharge: 10 },
    industrial: { rate: 0.10, minCharge: 40 },
  },
  johor: {
    residential: { rate: 0.025, minCharge: 10 },
    commercial: { rate: 0.07, minCharge: 20 },
    agricultural: { rate: 0.015, minCharge: 10 },
    industrial: { rate: 0.08, minCharge: 35 },
  },
  perak: {
    residential: { rate: 0.02, minCharge: 8 },
    commercial: { rate: 0.06, minCharge: 15 },
    agricultural: { rate: 0.01, minCharge: 5 },
    industrial: { rate: 0.07, minCharge: 30 },
  },
  ns: {
    residential: { rate: 0.025, minCharge: 10 },
    commercial: { rate: 0.07, minCharge: 20 },
    agricultural: { rate: 0.012, minCharge: 8 },
    industrial: { rate: 0.08, minCharge: 35 },
  },
  melaka: {
    residential: { rate: 0.028, minCharge: 10 },
    commercial: { rate: 0.075, minCharge: 20 },
    agricultural: { rate: 0.015, minCharge: 8 },
    industrial: { rate: 0.09, minCharge: 40 },
  },
  kedah: {
    residential: { rate: 0.018, minCharge: 8 },
    commercial: { rate: 0.05, minCharge: 15 },
    agricultural: { rate: 0.008, minCharge: 5 },
    industrial: { rate: 0.06, minCharge: 25 },
  },
  pahang: {
    residential: { rate: 0.02, minCharge: 8 },
    commercial: { rate: 0.055, minCharge: 15 },
    agricultural: { rate: 0.01, minCharge: 5 },
    industrial: { rate: 0.065, minCharge: 30 },
  },
  terengganu: {
    residential: { rate: 0.018, minCharge: 8 },
    commercial: { rate: 0.05, minCharge: 15 },
    agricultural: { rate: 0.008, minCharge: 5 },
    industrial: { rate: 0.06, minCharge: 25 },
  },
  kelantan: {
    residential: { rate: 0.015, minCharge: 6 },
    commercial: { rate: 0.045, minCharge: 12 },
    agricultural: { rate: 0.007, minCharge: 4 },
    industrial: { rate: 0.055, minCharge: 22 },
  },
  perlis: {
    residential: { rate: 0.015, minCharge: 6 },
    commercial: { rate: 0.04, minCharge: 12 },
    agricultural: { rate: 0.006, minCharge: 4 },
    industrial: { rate: 0.05, minCharge: 20 },
  },
  sabah: {
    residential: { rate: 0.022, minCharge: 10 },
    commercial: { rate: 0.06, minCharge: 18 },
    agricultural: { rate: 0.01, minCharge: 6 },
    industrial: { rate: 0.07, minCharge: 30 },
  },
  sarawak: {
    residential: { rate: 0.02, minCharge: 10 },
    commercial: { rate: 0.055, minCharge: 18 },
    agricultural: { rate: 0.009, minCharge: 6 },
    industrial: { rate: 0.065, minCharge: 28 },
  },
};

// Payment deadlines and penalty info by state
const STATE_INFO: Record<string, { deadline: string; penalty: string }> = {
  selangor: {
    deadline: "31 May",
    penalty: "Late payment penalty of 5% after deadline, additional 1% per month (max 12%)",
  },
  kl: {
    deadline: "28/29 February",
    penalty: "6% penalty after deadline",
  },
  penang: {
    deadline: "31 May",
    penalty: "6% penalty after deadline, additional charges may apply",
  },
  johor: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
  },
  perak: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
  },
  ns: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
  },
  melaka: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
  },
  kedah: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
  },
  pahang: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
  },
  terengganu: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
  },
  kelantan: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
  },
  perlis: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
  },
  sabah: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
  },
  sarawak: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
  },
};

export default function QuitRentCalculator() {
  const currentYear = new Date().getFullYear();
  const [propertyType, setPropertyType] = useState("residential");
  const [landArea, setLandArea] = useState(1500);
  const [state, setState] = useState("selangor");
  const [propertyValue, setPropertyValue] = useState(500000);

  // Modal states
  const [showRefinanceModal, setShowRefinanceModal] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  // Refinance form state
  const [refinanceForm, setRefinanceForm] = useState({
    name: "",
    whatsapp: "+60",
    currentBank: "Maybank",
    outstandingLoan: 300000,
    propertyType: "landed",
  });

  // Insurance form state
  const [insuranceForm, setInsuranceForm] = useState({
    name: "",
    whatsapp: "+60",
    propertyType: "landed",
    propertyValue: 500000,
  });

  const calculation = useMemo(() => {
    const rates = QUIT_RENT_RATES[state]?.[propertyType] || { rate: 0.03, minCharge: 10 };
    const stateInfo = STATE_INFO[state] || STATE_INFO.selangor;

    // Calculate quit rent
    const calculatedAmount = landArea * rates.rate;
    const annualQuitRent = Math.max(calculatedAmount, rates.minCharge);

    // Calculate late penalty (assuming 5% standard)
    const latePenalty = annualQuitRent * 0.05;
    const totalIfLate = annualQuitRent + latePenalty;

    return {
      annualQuitRent,
      latePenalty,
      totalIfLate,
      deadline: stateInfo.deadline,
      penaltyInfo: stateInfo.penalty,
      ratePerSqFt: rates.rate,
      minCharge: rates.minCharge,
    };
  }, [propertyType, landArea, state]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStateName = (stateValue: string) => {
    return STATES.find((s) => s.value === stateValue)?.label || stateValue;
  };

  const getPropertyTypeName = (typeValue: string) => {
    return PROPERTY_TYPES.find((t) => t.value === typeValue)?.label || typeValue;
  };

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleRefinanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadData = {
      timestamp: new Date().toISOString(),
      name: refinanceForm.name,
      whatsapp: refinanceForm.whatsapp,
      calculator_type: "refinance",
      current_bank: refinanceForm.currentBank,
      outstanding_loan: refinanceForm.outstandingLoan,
      property_type: refinanceForm.propertyType,
      source_url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        setShowRefinanceModal(false);
        setRefinanceForm({
          name: "",
          whatsapp: "+60",
          currentBank: "Maybank",
          outstandingLoan: 300000,
          propertyType: "landed",
        });
        showToast("success", "Terima kasih! Kami akan hubungi anda dalam 24 jam.");
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    } catch {
      showToast("error", "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInsuranceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadData = {
      timestamp: new Date().toISOString(),
      name: insuranceForm.name,
      whatsapp: insuranceForm.whatsapp,
      calculator_type: "home_insurance",
      property_type: insuranceForm.propertyType,
      property_value: insuranceForm.propertyValue,
      source_url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        setShowInsuranceModal(false);
        setInsuranceForm({
          name: "",
          whatsapp: "+60",
          propertyType: "landed",
          propertyValue: 500000,
        });
        showToast("success", "Terima kasih! Kami akan hubungi anda dalam 24 jam.");
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    } catch {
      showToast("error", "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-700 text-white py-10 md:py-14">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">🏘️ Property Calculator</div>
          <div className="text-5xl md:text-6xl mb-4">🏘️</div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Quit Rent Calculator Malaysia {currentYear} (Cukai Tanah)</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">Calculate your annual quit rent based on property type, land area, and state</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
              {/* State Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  State (Negeri)
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  {STATES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Property Type (Jenis Hartanah)
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  {PROPERTY_TYPES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Land Area */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Land Area (sq ft) - Keluasan Tanah
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={landArea}
                    onChange={(e) => setLandArea(Math.max(100, Math.min(100000, Number(e.target.value))))}
                    min={100}
                    max={100000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={landArea}
                    onChange={(e) => setLandArea(Number(e.target.value))}
                    min={100}
                    max={20000}
                    step={100}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>100 sq ft</span>
                    <span>20,000 sq ft</span>
                  </div>
                </div>
              </div>

              {/* Property Value (Optional) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Property Value (RM) - Optional Reference
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Math.max(50000, Math.min(5000000, Number(e.target.value))))}
                    min={50000}
                    max={5000000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    min={50000}
                    max={2000000}
                    step={10000}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>RM 50,000</span>
                    <span>RM 2,000,000</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Note: Property value does not directly affect quit rent calculation
                </p>
              </div>

              {/* Info Card */}
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                <p className="text-sm text-purple-800">
                  <strong>Note:</strong> Rates shown are estimates. Actual quit rent may vary by
                  district (mukim) and specific land title details. Check your land title or
                  state land office for exact rates.
                </p>
              </div>
            </div>
          </div>

          {/* Result Card - Right Side */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">
                  Your Quit Rent Summary
                </h2>

                {/* Property Details */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-slate-500">State</p>
                      <p className="font-medium text-slate-700">{getStateName(state)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Property Type</p>
                      <p className="font-medium text-slate-700">{getPropertyTypeName(propertyType).split(" (")[0]}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Land Area</p>
                      <p className="font-medium text-slate-700">{landArea.toLocaleString()} sq ft</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Rate (per sq ft)</p>
                      <p className="font-medium text-slate-700">RM {calculation.ratePerSqFt.toFixed(3)}</p>
                    </div>
                  </div>
                </div>

                {/* Annual Quit Rent Display */}
                <div className="text-center py-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl mb-4">
                  <p className="text-sm text-slate-500 mb-1">Annual Quit Rent (Cukai Tanah)</p>
                  <p className="text-4xl font-bold text-purple-600">
                    {formatCurrency(calculation.annualQuitRent)}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    Per year • Minimum charge: {formatCurrency(calculation.minCharge)}
                  </p>
                </div>

                {/* Payment Deadline */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📅</div>
                    <div>
                      <p className="font-semibold text-amber-800">Payment Deadline</p>
                      <p className="text-sm text-amber-700">
                        Pay before <strong>{calculation.deadline}</strong> each year to avoid penalties
                      </p>
                    </div>
                  </div>
                </div>

                {/* Penalty Info */}
                <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">⚠️</div>
                    <div>
                      <p className="font-semibold text-red-800">Late Payment Penalty</p>
                      <p className="text-sm text-red-700 mb-2">{calculation.penaltyInfo}</p>
                      <div className="bg-white rounded-lg p-3 text-sm">
                        <div className="flex justify-between text-slate-600">
                          <span>If paid late:</span>
                          <span className="font-medium text-red-600">{formatCurrency(calculation.totalIfLate)}</span>
                        </div>
                        <div className="flex justify-between text-slate-500 text-xs mt-1">
                          <span>Penalty amount:</span>
                          <span>+{formatCurrency(calculation.latePenalty)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Owner Tools */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🏠</span>
                  <h3 className="font-semibold text-slate-800">Tools for Property Owners</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Refinance & Save Box */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col h-full">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💰</span>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">Refinance & Save</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Homeowners are saving RM200-500/month by refinancing to lower rates
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowRefinanceModal(true)}
                      className="inline-flex items-center justify-center gap-1 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-lg mt-auto transition-colors"
                    >
                      Check Your Savings
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Home Insurance Box */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col h-full">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🏡</span>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">Home Insurance</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Protect your property from flood, fire & theft
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowInsuranceModal(true)}
                      className="inline-flex items-center justify-center gap-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg mt-auto transition-colors"
                    >
                      Get Quote
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refinance Modal */}
      {showRefinanceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Check Your Refinance Savings</h3>
                <button
                  onClick={() => setShowRefinanceModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleRefinanceSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={refinanceForm.name}
                    onChange={(e) => setRefinanceForm({ ...refinanceForm, name: e.target.value })}
                    placeholder="Your full name"
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
                    value={refinanceForm.whatsapp}
                    onChange={(e) => setRefinanceForm({ ...refinanceForm, whatsapp: e.target.value })}
                    placeholder="+60123456789"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Current Bank *
                  </label>
                  <select
                    value={refinanceForm.currentBank}
                    onChange={(e) => setRefinanceForm({ ...refinanceForm, currentBank: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  >
                    {BANKS.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Outstanding Loan Amount: {formatCurrency(refinanceForm.outstandingLoan)}
                  </label>
                  <input
                    type="range"
                    value={refinanceForm.outstandingLoan}
                    onChange={(e) => setRefinanceForm({ ...refinanceForm, outstandingLoan: Number(e.target.value) })}
                    min={100000}
                    max={1000000}
                    step={10000}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>RM 100,000</span>
                    <span>RM 1,000,000</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Property Type *
                  </label>
                  <div className="flex gap-2">
                    {PROPERTY_TYPE_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setRefinanceForm({ ...refinanceForm, propertyType: option.value })}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          refinanceForm.propertyType === option.value
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
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
                Our advisor will contact you within 24 hours with refinancing options.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Home Insurance Modal */}
      {showInsuranceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Get Home Insurance Quote</h3>
                <button
                  onClick={() => setShowInsuranceModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleInsuranceSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={insuranceForm.name}
                    onChange={(e) => setInsuranceForm({ ...insuranceForm, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={insuranceForm.whatsapp}
                    onChange={(e) => setInsuranceForm({ ...insuranceForm, whatsapp: e.target.value })}
                    placeholder="+60123456789"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Property Type *
                  </label>
                  <div className="flex gap-2">
                    {PROPERTY_TYPE_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setInsuranceForm({ ...insuranceForm, propertyType: option.value })}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          insuranceForm.propertyType === option.value
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Property Value: {formatCurrency(insuranceForm.propertyValue)}
                  </label>
                  <input
                    type="range"
                    value={insuranceForm.propertyValue}
                    onChange={(e) => setInsuranceForm({ ...insuranceForm, propertyValue: Number(e.target.value) })}
                    min={100000}
                    max={2000000}
                    step={10000}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>RM 100,000</span>
                    <span>RM 2,000,000</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all mt-2"
                >
                  {isSubmitting ? "Submitting..." : "Get Free Quote"}
                </button>
              </form>

              <p className="text-xs text-slate-400 text-center mt-4">
                Our insurance advisor will contact you within 24 hours.
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
                ? "bg-green-600 text-white"
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
