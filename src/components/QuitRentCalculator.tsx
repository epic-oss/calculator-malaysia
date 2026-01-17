"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

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
const STATE_INFO: Record<string, { deadline: string; penalty: string; paymentPortal: string }> = {
  selangor: {
    deadline: "31 May",
    penalty: "Late payment penalty of 5% after deadline, additional 1% per month (max 12%)",
    paymentPortal: "https://ebayar.selangor.gov.my",
  },
  kl: {
    deadline: "28/29 February",
    penalty: "6% penalty after deadline",
    paymentPortal: "https://ehasil.hasil.gov.my",
  },
  penang: {
    deadline: "31 May",
    penalty: "6% penalty after deadline, additional charges may apply",
    paymentPortal: "https://ebayar.penang.gov.my",
  },
  johor: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
    paymentPortal: "https://ptgj.johor.gov.my",
  },
  perak: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
    paymentPortal: "https://ptg.perak.gov.my",
  },
  ns: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
    paymentPortal: "https://ptgns.ns.gov.my",
  },
  melaka: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
    paymentPortal: "https://ptg.melaka.gov.my",
  },
  kedah: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
    paymentPortal: "https://ptg.kedah.gov.my",
  },
  pahang: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
    paymentPortal: "https://ptg.pahang.gov.my",
  },
  terengganu: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
    paymentPortal: "https://ptg.terengganu.gov.my",
  },
  kelantan: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
    paymentPortal: "https://ptg.kelantan.gov.my",
  },
  perlis: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
    paymentPortal: "https://ptg.perlis.gov.my",
  },
  sabah: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
    paymentPortal: "https://www.jtu.sabah.gov.my",
  },
  sarawak: {
    deadline: "31 May",
    penalty: "5% penalty after deadline",
    paymentPortal: "https://landsurvey.sarawak.gov.my",
  },
};

export default function QuitRentCalculator() {
  const [propertyType, setPropertyType] = useState("residential");
  const [landArea, setLandArea] = useState(1500);
  const [state, setState] = useState("selangor");
  const [propertyValue, setPropertyValue] = useState(500000);

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
      paymentPortal: stateInfo.paymentPortal,
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

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Quit Rent Calculator Malaysia (Cukai Tanah)
        </h1>
        <p className="text-center text-slate-500 mb-8">
          Calculate your annual quit rent based on property type, land area, and state
        </p>

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
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-4">
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

                {/* Online Payment Link */}
                <a
                  href={calculation.paymentPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-4 rounded-xl bg-purple-600 text-white font-medium text-center hover:bg-purple-700 transition-all"
                >
                  Pay Online at {getStateName(state)} Portal →
                </a>
              </div>

              {/* Property Owner Tools */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🏠</span>
                  <h3 className="font-semibold text-slate-800">Tools for Property Owners</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Refinance & Save Box */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💰</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">Refinance & Save</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Homeowners are saving RM200-500/month by refinancing to lower rates
                        </p>
                        <Link
                          href="/loan/early-housing-loan-settlement-calculator-malaysia/"
                          className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 mt-3 transition-colors"
                        >
                          Check Your Savings
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Home Insurance Box */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🏡</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">Home Insurance</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Protect your property from flood, fire & theft
                        </p>
                        <a
                          href="https://bjak.my/?p=OOI-YING-JYE-AT9T1T"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 mt-3 transition-colors"
                        >
                          Get Quote
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
