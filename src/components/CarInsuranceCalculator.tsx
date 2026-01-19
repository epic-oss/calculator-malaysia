"use client";

import { useState, useMemo } from "react";
import InsurersLogoCarousel from "./InsurersLogoCarousel";

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

interface CapturedCalculation {
  vehicleType: string;
  vehicleValue: number;
  engineCC: string;
  ncdPercent: number;
  annualPremium: number;
  roadTax: number;
  coverageType: string;
}

const VEHICLE_TYPES = [
  "Sedan",
  "SUV",
  "MPV",
  "Hatchback",
  "Pickup / 4x4",
  "Coupe",
  "Wagon",
  "Sports Car",
];

const ENGINE_CC_OPTIONS = [
  { label: "Below 1,000cc", value: "below-1000", roadTax: 20, baseRate: 0.024 },
  { label: "1,000cc - 1,400cc", value: "1000-1400", roadTax: 55, baseRate: 0.026 },
  { label: "1,401cc - 1,600cc", value: "1401-1600", roadTax: 90, baseRate: 0.028 },
  { label: "1,601cc - 1,800cc", value: "1601-1800", roadTax: 200, baseRate: 0.030 },
  { label: "1,801cc - 2,000cc", value: "1801-2000", roadTax: 280, baseRate: 0.032 },
  { label: "2,001cc - 2,500cc", value: "2001-2500", roadTax: 450, baseRate: 0.034 },
  { label: "2,501cc - 3,000cc", value: "2501-3000", roadTax: 750, baseRate: 0.036 },
  { label: "Above 3,000cc", value: "above-3000", roadTax: 1200, baseRate: 0.038 },
];

const NCD_OPTIONS = [
  { label: "0% (New / After Claim)", value: 0 },
  { label: "25% (1 year claim-free)", value: 0.25 },
  { label: "30% (2 years claim-free)", value: 0.30 },
  { label: "38.33% (3 years claim-free)", value: 0.3833 },
  { label: "45% (4 years claim-free)", value: 0.45 },
  { label: "55% (5+ years claim-free)", value: 0.55 },
];

const SST_RATE = 0.08;
const STAMP_DUTY = 10;

export default function CarInsuranceCalculator() {
  const [vehicleType, setVehicleType] = useState(VEHICLE_TYPES[0]);
  const [marketValue, setMarketValue] = useState(80000);
  const [vehicleAge, setVehicleAge] = useState(0);
  const [engineCC, setEngineCC] = useState(ENGINE_CC_OPTIONS[2].value);
  const [ncdDiscount, setNcdDiscount] = useState(0);
  const [coverageType, setCoverageType] = useState<"third-party" | "comprehensive">("comprehensive");
  const [region, setRegion] = useState<"peninsular" | "east-malaysia">("peninsular");
  const [showBreakdown, setShowBreakdown] = useState(false);
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

  const selectedEngineOption = ENGINE_CC_OPTIONS.find(opt => opt.value === engineCC) || ENGINE_CC_OPTIONS[2];

  const calculation = useMemo(() => {
    // Base premium calculation
    let basePremium: number;

    if (coverageType === "third-party") {
      // Third party is much cheaper - flat rates based on engine CC
      if (engineCC === "below-1000") basePremium = 120;
      else if (engineCC === "1000-1400") basePremium = 150;
      else if (engineCC === "1401-1600") basePremium = 180;
      else if (engineCC === "1601-1800") basePremium = 220;
      else if (engineCC === "1801-2000") basePremium = 280;
      else if (engineCC === "2001-2500") basePremium = 350;
      else if (engineCC === "2501-3000") basePremium = 450;
      else basePremium = 600;
    } else {
      // Comprehensive - based on market value and engine CC rate
      basePremium = marketValue * selectedEngineOption.baseRate;
    }

    // Age loading (older cars cost more to insure)
    const ageLoading = vehicleAge > 5 ? basePremium * Math.min(vehicleAge - 5, 10) * 0.02 : 0;

    // Vehicle type loading (SUVs, Sports Cars cost slightly more)
    const typeMultiplier =
      vehicleType === "SUV" ? 1.05 :
      vehicleType === "Sports Car" ? 1.15 :
      vehicleType === "Pickup / 4x4" ? 1.08 :
      1;

    // Region adjustment (East Malaysia slightly cheaper)
    const regionMultiplier = region === "peninsular" ? 1 : 0.92;

    const adjustedPremium = (basePremium + ageLoading) * typeMultiplier * regionMultiplier;
    const ncdAmount = adjustedPremium * ncdDiscount;
    const afterNcd = adjustedPremium - ncdAmount;
    const sstAmount = afterNcd * SST_RATE;
    const totalPremium = afterNcd + sstAmount + STAMP_DUTY;

    // Road tax based on engine CC (Peninsular rates, East Malaysia is different)
    let roadTax = selectedEngineOption.roadTax;
    if (region === "east-malaysia") {
      roadTax = Math.round(roadTax * 0.5); // East Malaysia road tax is roughly half
    }

    return {
      basePremium: adjustedPremium,
      ncdAmount,
      afterNcd,
      sstAmount,
      stampDuty: STAMP_DUTY,
      totalPremium,
      roadTax,
    };
  }, [marketValue, vehicleAge, engineCC, ncdDiscount, coverageType, region, vehicleType, selectedEngineOption]);

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
    // Capture calculator values BEFORE opening modal
    setCapturedCalc({
      vehicleType,
      vehicleValue: marketValue,
      engineCC: selectedEngineOption.label,
      ncdPercent: Math.round(ncdDiscount * 100),
      annualPremium: Math.round(calculation.totalPremium),
      roadTax: Math.round(calculation.roadTax),
      coverageType: coverageType === "comprehensive" ? "Comprehensive" : "Third Party",
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
      calculator_type: "car_insurance",
      vehicle_value: capturedCalc.vehicleValue,
      vehicle_type: capturedCalc.vehicleType,
      engine_cc: capturedCalc.engineCC,
      ncd_percent: capturedCalc.ncdPercent,
      annual_premium: capturedCalc.annualPremium,
      road_tax: capturedCalc.roadTax,
      coverage_type: capturedCalc.coverageType,
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
        showToast("success", "Thanks! Our insurance expert will WhatsApp you within 24 hours");
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
          Car Insurance Calculator
        </h1>
        <p className="text-center text-slate-500 mb-8">
          Calculate your car insurance premium and road tax in Malaysia
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
              {/* Vehicle Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Vehicle Type
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {VEHICLE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Market Value */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Market Value (RM)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={marketValue}
                    onChange={(e) => setMarketValue(Math.max(20000, Math.min(500000, Number(e.target.value))))}
                    min={20000}
                    max={500000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={marketValue}
                    onChange={(e) => setMarketValue(Number(e.target.value))}
                    min={20000}
                    max={500000}
                    step={5000}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>RM 20,000</span>
                    <span>RM 500,000</span>
                  </div>
                </div>
              </div>

              {/* Vehicle Age */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Vehicle Age (Years)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={vehicleAge}
                    onChange={(e) => setVehicleAge(Math.max(0, Math.min(15, Number(e.target.value))))}
                    min={0}
                    max={15}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={vehicleAge}
                    onChange={(e) => setVehicleAge(Number(e.target.value))}
                    min={0}
                    max={15}
                    step={1}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Brand New</span>
                    <span>15 years</span>
                  </div>
                </div>
              </div>

              {/* Engine CC */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Engine Capacity (CC)
                </label>
                <select
                  value={engineCC}
                  onChange={(e) => setEngineCC(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {ENGINE_CC_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* NCD Discount */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  NCD Discount (No Claim Discount)
                </label>
                <select
                  value={ncdDiscount}
                  onChange={(e) => setNcdDiscount(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {NCD_OPTIONS.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Coverage Type Toggle */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Coverage Type
                </label>
                <div className="flex rounded-xl bg-slate-100 p-1">
                  <button
                    onClick={() => setCoverageType("third-party")}
                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                      coverageType === "third-party"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    Third Party
                  </button>
                  <button
                    onClick={() => setCoverageType("comprehensive")}
                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                      coverageType === "comprehensive"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    Comprehensive
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {coverageType === "third-party"
                    ? "Covers damage to other vehicles and property only"
                    : "Covers your car + third party damage, theft, and fire"}
                </p>
              </div>

              {/* Region Toggle */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Region
                </label>
                <div className="flex rounded-xl bg-slate-100 p-1">
                  <button
                    onClick={() => setRegion("peninsular")}
                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                      region === "peninsular"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    Peninsular
                  </button>
                  <button
                    onClick={() => setRegion("east-malaysia")}
                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                      region === "east-malaysia"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    Sabah/Sarawak
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Result Card - Right Side */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">
                  Your Insurance Premium
                </h2>

                {/* Main Premium Display */}
                <div className="text-center py-6 mb-4 bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 mb-1">Annual Premium</p>
                  <p className="text-4xl font-bold text-blue-600">
                    {formatCurrency(calculation.totalPremium)}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    {coverageType === "third-party" ? "Third Party Coverage" : "Comprehensive Coverage"}
                  </p>
                </div>

                {/* Breakdown Toggle */}
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-all flex items-center justify-between"
                >
                  <span>View Breakdown</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      showBreakdown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Breakdown Details */}
                {showBreakdown && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Base Premium</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.basePremium)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">NCD Discount ({Math.round(ncdDiscount * 100)}%)</span>
                      <span className="text-green-600 font-medium">
                        - {formatCurrency(calculation.ncdAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">After NCD</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.afterNcd)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">SST (8%)</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.sstAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Stamp Duty</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.stampDuty)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-3 border-t border-slate-100">
                      <span className="text-slate-700 font-semibold">Total Premium</span>
                      <span className="text-blue-600 font-bold">
                        {formatCurrency(calculation.totalPremium)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Road Tax Section */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">
                    Road Tax (Annual)
                  </h3>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="text-xs text-green-600 mb-1">Road Tax</p>
                      <p className="text-2xl font-bold text-green-700">
                        {formatCurrency(calculation.roadTax)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Engine</p>
                      <p className="text-sm font-medium text-slate-700">
                        {selectedEngineOption.label}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total Annual Cost */}
                <div className="mt-6 p-4 bg-slate-800 rounded-xl text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-slate-400">Total Annual Cost</p>
                      <p className="text-sm text-slate-300">Insurance + Road Tax</p>
                    </div>
                    <p className="text-2xl font-bold">
                      {formatCurrency(calculation.totalPremium + calculation.roadTax)}
                    </p>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🎯</span>
                    <h3 className="text-lg font-bold text-slate-800">Get Free Quote</h3>
                  </div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="text-green-500 font-bold">✓</span>
                      Compare prices from 15+ insurers
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="text-green-500 font-bold">✓</span>
                      Save up to 25% vs direct purchase
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="text-green-500 font-bold">✓</span>
                      Free claims assistance
                    </li>
                  </ul>
                  <button
                    onClick={openModal}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold transition-colors"
                  >
                    Get Free Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insurers Logo Carousel */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm p-6">
          <InsurersLogoCarousel lang="en" />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Get Expert Quote</h3>
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
                    <span className="text-slate-500">Vehicle</span>
                    <span className="text-slate-700 font-medium">{capturedCalc.vehicleType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Coverage</span>
                    <span className="text-slate-700 font-medium">{capturedCalc.coverageType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Estimated Premium</span>
                    <span className="text-blue-600 font-bold">{formatCurrency(capturedCalc.annualPremium)}</span>
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all mt-2"
                >
                  {isSubmitting ? "Submitting..." : "Get My Quote"}
                </button>
              </form>

              <p className="text-xs text-slate-400 text-center mt-4">
                By submitting, you agree to be contacted by our insurance advisors.
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
