"use client";

import { useState, useMemo, useEffect } from "react";
import MotorcycleInsuranceCTA from "./MotorcycleInsuranceCTA";
import InsurersLogoCarousel from "./InsurersLogoCarousel";

interface MotorcycleInsuranceCalculatorProps {
  lang?: "en" | "ms";
  title?: string;
  subtitle?: string;
}

const ENGINE_CC_OPTIONS = [
  { label: "Below 150cc", value: 75, roadTax: 2 },
  { label: "150cc - 200cc", value: 175, roadTax: 30 },
  { label: "201cc - 250cc", value: 225, roadTax: 60 },
  { label: "251cc - 500cc", value: 375, roadTax: 120 },
  { label: "501cc - 800cc", value: 650, roadTax: 180 },
  { label: "Above 800cc", value: 1000, roadTax: 250 },
];

const NCD_OPTIONS = [
  { label: "0% (New / No Claim)", value: 0 },
  { label: "25% (1 year claim-free)", value: 0.25 },
  { label: "30% (2 years claim-free)", value: 0.30 },
  { label: "38.33% (3 years claim-free)", value: 0.3833 },
  { label: "45% (4 years claim-free)", value: 0.45 },
  { label: "55% (5+ years claim-free)", value: 0.55 },
];

const SST_RATE = 0.08;
const STAMP_DUTY = 10;

export default function MotorcycleInsuranceCalculator({
  lang = "en",
  title = "Motorcycle Insurance Calculator",
  subtitle = "Calculate your motorcycle insurance premium in Malaysia"
}: MotorcycleInsuranceCalculatorProps) {
  const [engineCC, setEngineCC] = useState(ENGINE_CC_OPTIONS[0].value);
  const [vehicleAge, setVehicleAge] = useState(0);
  const [ncdDiscount, setNcdDiscount] = useState(0);
  const [coverageType, setCoverageType] = useState<"third-party" | "comprehensive">("third-party");
  const [region, setRegion] = useState<"peninsular" | "sabah-sarawak">("peninsular");
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(true);

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

  const selectedEngineOption = ENGINE_CC_OPTIONS.find(opt => opt.value === engineCC) || ENGINE_CC_OPTIONS[0];

  const calculation = useMemo(() => {
    // Base premium calculation based on engine CC and coverage type
    let basePremium: number;

    if (coverageType === "third-party") {
      // Third party is much cheaper
      if (engineCC <= 75) basePremium = 70;
      else if (engineCC <= 175) basePremium = 85;
      else if (engineCC <= 225) basePremium = 100;
      else if (engineCC <= 375) basePremium = 130;
      else if (engineCC <= 650) basePremium = 180;
      else basePremium = 250;
    } else {
      // Comprehensive pricing
      if (engineCC <= 75) basePremium = 200;
      else if (engineCC <= 175) basePremium = 280;
      else if (engineCC <= 225) basePremium = 380;
      else if (engineCC <= 375) basePremium = 520;
      else if (engineCC <= 650) basePremium = 750;
      else basePremium = 1100;
    }

    // Age loading (older motorcycles cost more to insure)
    const ageLoading = vehicleAge > 5 ? basePremium * 0.1 : 0;

    // Region adjustment (East Malaysia slightly cheaper)
    const regionMultiplier = region === "peninsular" ? 1 : 0.9;

    const adjustedPremium = (basePremium + ageLoading) * regionMultiplier;
    const ncdAmount = adjustedPremium * ncdDiscount;
    const afterNcd = adjustedPremium - ncdAmount;
    const sstAmount = afterNcd * SST_RATE;
    const totalPremium = afterNcd + sstAmount + STAMP_DUTY;

    // Road tax based on engine CC
    const roadTax = selectedEngineOption.roadTax;

    return {
      basePremium: adjustedPremium,
      ncdAmount,
      afterNcd,
      sstAmount,
      stampDuty: STAMP_DUTY,
      totalPremium,
      roadTax,
    };
  }, [engineCC, vehicleAge, ncdDiscount, coverageType, region, selectedEngineOption.roadTax]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-700 text-white py-10 md:py-14">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">🛡️ Motorcycle Insurance</div>
          <div className="text-5xl md:text-6xl mb-4">🏍️</div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{title}</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
              {/* Engine CC */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Engine Capacity (CC)
                </label>
                <select
                  value={engineCC}
                  onChange={(e) => setEngineCC(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  {ENGINE_CC_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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
                    onChange={(e) => setVehicleAge(Math.max(0, Math.min(30, Number(e.target.value))))}
                    min={0}
                    max={30}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={vehicleAge}
                    onChange={(e) => setVehicleAge(Number(e.target.value))}
                    min={0}
                    max={30}
                    step={1}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>New</span>
                    <span>30 years</span>
                  </div>
                </div>
              </div>

              {/* NCD Discount */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  NCD Discount (No Claim Discount)
                </label>
                <select
                  value={ncdDiscount}
                  onChange={(e) => setNcdDiscount(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
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
                        ? "bg-white text-orange-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    Third Party
                  </button>
                  <button
                    onClick={() => setCoverageType("comprehensive")}
                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                      coverageType === "comprehensive"
                        ? "bg-white text-orange-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    Comprehensive
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {coverageType === "third-party"
                    ? "Covers damage to other vehicles and property only"
                    : "Covers your motorcycle + third party damage"}
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
                        ? "bg-white text-orange-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    Peninsular
                  </button>
                  <button
                    onClick={() => setRegion("sabah-sarawak")}
                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                      region === "sabah-sarawak"
                        ? "bg-white text-orange-600 shadow-sm"
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
                <div className="text-center py-6 mb-4 bg-gradient-to-br from-orange-50 to-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 mb-1">Annual Premium</p>
                  <p className="text-4xl font-bold text-orange-600">
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
                      <span className="text-slate-500">NCD Discount</span>
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
                      <span className="text-slate-700 font-semibold">Total</span>
                      <span className="text-orange-600 font-bold">
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
                  <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl">
                    <div>
                      <p className="text-xs text-amber-600 mb-1">Motorcycle Road Tax</p>
                      <p className="text-2xl font-bold text-amber-700">
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

                {/* CTA Card - Bjak Affiliate */}
                <MotorcycleInsuranceCTA lang={lang} />
              </div>
            </div>
          </div>
        </div>

        {/* Insurers Logo Carousel */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm p-6">
          <InsurersLogoCarousel lang={lang} />
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-blue-600 shadow-lg safe-area-bottom">
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
              <p className="font-semibold">Premium: {formatCurrency(calculation.totalPremium)}</p>
              <p className="text-xs text-white/80">{lang === "ms" ? "Dapatkan sebut harga percuma" : "Get free quote now"}</p>
            </div>
            <a
              href="https://bjak.my/en/motorcycle-insurance?p=OOI-YING-JYE-AT9T1T"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg text-sm"
            >
              {lang === "ms" ? "Sebut Harga →" : "Get Quote →"}
            </a>
          </div>
        </div>
      )}

      {/* Floating Desktop CTA */}
      <div className="hidden md:flex fixed bottom-5 right-6 z-50 flex-col items-end gap-2">
        {showBackToTop && (
          <button onClick={scrollToTop} className="w-10 h-10 bg-white border border-slate-200 rounded-full shadow-md hover:bg-slate-50 transition-all flex items-center justify-center" aria-label="Back to top">
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
          </button>
        )}
        {showFloatingCTA && (
          <>
            <div className="bg-white px-3 py-1.5 rounded-full shadow-md text-xs text-slate-500">1,200+ riders compared · Instant quotes</div>
            <button onClick={scrollToTop} className="px-5 py-2.5 text-white font-bold rounded-full shadow-lg transition-all hover:opacity-90 text-sm" style={{ backgroundColor: "#1565C0" }}>
              Compare Now →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
