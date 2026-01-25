"use client";

import { useState, useMemo } from "react";
import InsurersLogoCarousel from "./InsurersLogoCarousel";

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

interface CapturedCalculation {
  vehicleModel: string;
  vehicleValue: number;
  ncdPercent: number;
  annualPremium: number;
  roadTax: number;
  coverageType: string;
  totalAmount: number;
  region: string;
  powerOutput: number;
}

const VEHICLE_MODELS = {
  "Mass Market (RM60k-200k)": [
    "Proton e.MAS 7",
    "Proton e.MAS 5",
    "BYD Atto 3",
    "BYD Atto 2",
    "BYD Sealion 7",
    "BYD Seal",
    "BYD Seal 6",
    "BYD Dolphin",
    "BYD M6",
    "MG ZS EV",
    "Ora Good Cat",
    "iCaur 03",
    "Xpeng G6",
    "Leapmotor C10",
  ],
  "Premium (RM200k-500k)": [
    "Tesla Model Y",
    "Tesla Model 3",
    "Zeekr 7X",
    "Zeekr 009",
    "BMW iX1",
    "BMW iX",
    "BMW i5",
    "Hyundai Ioniq 5",
    "Denza D9",
    "Xpeng X9",
    "MINI Aceman",
  ],
  "Luxury (RM500k+)": [
    "Porsche Taycan",
    "Mercedes EQS",
    "BMW iX xDrive40",
  ],
};

const OTHER_OPTION = "Other (Please specify)";

const NCD_OPTIONS = [
  { label: "0% (No NCD)", value: 0 },
  { label: "25% (1 year claim-free)", value: 0.25 },
  { label: "30% (2 years claim-free)", value: 0.30 },
  { label: "38.33% (3 years claim-free)", value: 0.3833 },
  { label: "45% (4 years claim-free)", value: 0.45 },
  { label: "55% (5+ years claim-free)", value: 0.55 },
];

const WINDSCREEN_OPTIONS = [
  { label: "RM 3,000", value: 3000 },
  { label: "RM 5,000", value: 5000 },
  { label: "RM 8,000", value: 8000 },
  { label: "RM 10,000", value: 10000 },
];

const SST_RATE = 0.08;
const STAMP_DUTY = 10;

// Tiered base rates for EV insurance (2026 actual rates)
function getBaseRate(sumInsured: number): number {
  if (sumInsured <= 50000) return 0.028;
  if (sumInsured <= 100000) return 0.026;
  if (sumInsured <= 200000) return 0.025;
  if (sumInsured <= 300000) return 0.024;
  if (sumInsured <= 400000) return 0.0238;
  return 0.0235;
}

export default function EVInsuranceCalculator() {
  const currentYear = new Date().getFullYear();
  const [selectedModel, setSelectedModel] = useState(VEHICLE_MODELS["Mass Market (RM60k-200k)"][0]);
  const [customModel, setCustomModel] = useState("");
  const [marketValue, setMarketValue] = useState(150000);
  const [powerOutput, setPowerOutput] = useState(150);
  const [ncdDiscount, setNcdDiscount] = useState(0.55);
  const [region, setRegion] = useState<"peninsular" | "sabah-sarawak">("peninsular");
  const [coverageType, setCoverageType] = useState<"comprehensive" | "third-party">("comprehensive");
  const [showBreakdown, setShowBreakdown] = useState(true);

  // Add-ons state
  const [windscreenEnabled, setWindscreenEnabled] = useState(true);
  const [windscreenAmount, setWindscreenAmount] = useState(5000);
  const [specialPerilsEnabled, setSpecialPerilsEnabled] = useState(true);
  const [evChargerEnabled, setEvChargerEnabled] = useState(false);
  const [evChargerAmount] = useState(12000);
  const [llpEnabled, setLlpEnabled] = useState(true);
  const [llpnEnabled, setLlpnEnabled] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(true);
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

  const isOtherSelected = selectedModel === OTHER_OPTION;
  const vehicleModel = isOtherSelected ? customModel || "Custom Vehicle" : selectedModel;

  const calculation = useMemo(() => {
    // Third party has fixed low premium
    if (coverageType === "third-party") {
      const thirdPartyPremium = 150;
      const sstAmount = thirdPartyPremium * SST_RATE;
      return {
        basePremium: thirdPartyPremium,
        ncdAmount: 0,
        netPremium: thirdPartyPremium,
        windscreenPremium: 0,
        specialPerilsPremium: 0,
        evChargerPremium: 0,
        llpPremium: 0,
        llpnPremium: 0,
        totalAddons: 0,
        grossPremium: thirdPartyPremium,
        sstAmount,
        stampDuty: STAMP_DUTY,
        totalPremium: thirdPartyPremium + sstAmount + STAMP_DUTY,
        roadTax: powerOutput <= 100 ? 20 : powerOutput <= 150 ? 40 : powerOutput <= 200 ? 80 : 120,
      };
    }

    // Comprehensive calculation with tiered rates
    const baseRate = getBaseRate(marketValue);
    // Apply region adjustment (Sabah/Sarawak is slightly lower)
    const regionMultiplier = region === "peninsular" ? 1 : 0.9;
    const basePremium = marketValue * baseRate * regionMultiplier;

    // Apply NCD discount
    const ncdAmount = basePremium * ncdDiscount;
    const netPremium = basePremium - ncdAmount;

    // Calculate add-ons
    const windscreenPremium = windscreenEnabled ? windscreenAmount * 0.15 : 0;
    const specialPerilsPremium = specialPerilsEnabled ? marketValue * 0.00225 : 0;
    const evChargerPremium = evChargerEnabled ? evChargerAmount * 0.0034 : 0;
    const llpPremium = llpEnabled ? 56.70 : 0;
    const llpnPremium = llpnEnabled ? 7.50 : 0;

    const totalAddons = windscreenPremium + specialPerilsPremium + evChargerPremium + llpPremium + llpnPremium;
    const grossPremium = netPremium + totalAddons;
    const sstAmount = grossPremium * SST_RATE;
    const totalPremium = grossPremium + sstAmount + STAMP_DUTY;

    // Road tax calculation for EV
    const roadTax = powerOutput <= 100 ? 20 : powerOutput <= 150 ? 40 : powerOutput <= 200 ? 80 : 120;

    return {
      basePremium,
      ncdAmount,
      netPremium,
      windscreenPremium,
      specialPerilsPremium,
      evChargerPremium,
      llpPremium,
      llpnPremium,
      totalAddons,
      grossPremium,
      sstAmount,
      stampDuty: STAMP_DUTY,
      totalPremium,
      roadTax,
    };
  }, [marketValue, ncdDiscount, region, powerOutput, coverageType, windscreenEnabled, windscreenAmount, specialPerilsEnabled, evChargerEnabled, evChargerAmount, llpEnabled, llpnEnabled]);

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
      vehicleModel,
      vehicleValue: marketValue,
      ncdPercent: Math.round(ncdDiscount * 100),
      annualPremium: Math.round(calculation.totalPremium),
      roadTax: Math.round(calculation.roadTax),
      coverageType: coverageType === "comprehensive" ? "Comprehensive" : "Third Party",
      totalAmount: Math.round(calculation.totalPremium + calculation.roadTax),
      region: region === "peninsular" ? "Peninsular Malaysia" : "Sabah/Sarawak",
      powerOutput,
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
      calculator_type: "ev_insurance",
      vehicle_value: capturedCalc.vehicleValue,
      vehicle_model: capturedCalc.vehicleModel,
      ncd_percent: capturedCalc.ncdPercent,
      calculated_premium: capturedCalc.annualPremium,
      road_tax: capturedCalc.roadTax,
      coverage_type: capturedCalc.coverageType,
      total_amount: capturedCalc.totalAmount,
      region: capturedCalc.region,
      power_output: capturedCalc.powerOutput,
      source_url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        closeModal();
        showToast("success", "Thanks! Our insurance expert will WhatsApp you within 24 hours");
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    } catch {
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
          EV Car Insurance Calculator Malaysia {currentYear}
        </h1>
        <p className="text-center text-slate-500 mb-8">
          Calculate your electric vehicle insurance premium in Malaysia
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
              {/* Vehicle Model */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Vehicle Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {Object.entries(VEHICLE_MODELS).map(([category, models]) => (
                    <optgroup key={category} label={category}>
                      {models.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  <option value={OTHER_OPTION}>{OTHER_OPTION}</option>
                </select>

                {isOtherSelected && (
                  <input
                    type="text"
                    value={customModel}
                    onChange={(e) => setCustomModel(e.target.value)}
                    placeholder="Enter your vehicle model"
                    className="w-full mt-3 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                )}
              </div>

              {/* Market Value */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Market Value / Sum Insured (RM)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={marketValue}
                    onChange={(e) => setMarketValue(Math.max(30000, Math.min(500000, Number(e.target.value))))}
                    min={30000}
                    max={500000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={marketValue}
                    onChange={(e) => setMarketValue(Number(e.target.value))}
                    min={30000}
                    max={500000}
                    step={5000}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>RM 30,000</span>
                    <span>RM 500,000</span>
                  </div>
                </div>
              </div>

              {/* Power Output */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Power Output (kW) - for Road Tax
                </label>
                <input
                  type="number"
                  value={powerOutput}
                  onChange={(e) => setPowerOutput(Number(e.target.value))}
                  min={50}
                  max={500}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
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

              {/* Coverage Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Coverage Type
                </label>
                <div className="flex rounded-xl bg-slate-100 p-1">
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
                </div>
              </div>

              {/* Region */}
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
                    onClick={() => setRegion("sabah-sarawak")}
                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                      region === "sabah-sarawak"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    Sabah/Sarawak
                  </button>
                </div>
              </div>

              {/* Add-ons Section */}
              {coverageType === "comprehensive" && (
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-sm font-semibold text-slate-700 mb-4">
                    Add-on Coverage
                  </h3>
                  <div className="space-y-4">
                    {/* Windscreen */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="windscreen"
                        checked={windscreenEnabled}
                        onChange={(e) => setWindscreenEnabled(e.target.checked)}
                        className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <label htmlFor="windscreen" className="text-sm font-medium text-slate-700 cursor-pointer">
                          Windscreen Coverage
                        </label>
                        {windscreenEnabled && (
                          <select
                            value={windscreenAmount}
                            onChange={(e) => setWindscreenAmount(Number(e.target.value))}
                            className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {WINDSCREEN_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                      {windscreenEnabled && (
                        <span className="text-sm font-medium text-slate-600">
                          {formatCurrency(calculation.windscreenPremium)}
                        </span>
                      )}
                    </div>

                    {/* Special Perils */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="specialPerils"
                        checked={specialPerilsEnabled}
                        onChange={(e) => setSpecialPerilsEnabled(e.target.checked)}
                        className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <label htmlFor="specialPerils" className="text-sm font-medium text-slate-700 cursor-pointer">
                          Special Perils (Flood, Storm, Landslide)
                        </label>
                        <p className="text-xs text-slate-400 mt-1">Recommended for EVs - battery damage from flood</p>
                      </div>
                      {specialPerilsEnabled && (
                        <span className="text-sm font-medium text-slate-600">
                          {formatCurrency(calculation.specialPerilsPremium)}
                        </span>
                      )}
                    </div>

                    {/* EV Charger */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="evCharger"
                        checked={evChargerEnabled}
                        onChange={(e) => setEvChargerEnabled(e.target.checked)}
                        className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <label htmlFor="evCharger" className="text-sm font-medium text-slate-700 cursor-pointer">
                          EV Home Wall Charger Coverage (RM12,000)
                        </label>
                      </div>
                      {evChargerEnabled && (
                        <span className="text-sm font-medium text-slate-600">
                          {formatCurrency(calculation.evChargerPremium)}
                        </span>
                      )}
                    </div>

                    {/* Legal Liability to Passengers */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="llp"
                        checked={llpEnabled}
                        onChange={(e) => setLlpEnabled(e.target.checked)}
                        className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <label htmlFor="llp" className="text-sm font-medium text-slate-700 cursor-pointer">
                          Legal Liability to Passengers
                        </label>
                      </div>
                      {llpEnabled && (
                        <span className="text-sm font-medium text-slate-600">
                          {formatCurrency(calculation.llpPremium)}
                        </span>
                      )}
                    </div>

                    {/* Legal Liability of Passengers */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="llpn"
                        checked={llpnEnabled}
                        onChange={(e) => setLlpnEnabled(e.target.checked)}
                        className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <label htmlFor="llpn" className="text-sm font-medium text-slate-700 cursor-pointer">
                          Legal Liability of Passengers for Negligent Acts
                        </label>
                      </div>
                      {llpnEnabled && (
                        <span className="text-sm font-medium text-slate-600">
                          {formatCurrency(calculation.llpnPremium)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
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
                    {coverageType === "comprehensive" ? "Comprehensive Coverage" : "Third Party Only"}
                  </p>
                </div>

                {/* Breakdown Toggle */}
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-all flex items-center justify-between"
                >
                  <span>View Breakdown</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${showBreakdown ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Breakdown Details */}
                {showBreakdown && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Basic Premium</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.basePremium)}
                      </span>
                    </div>
                    {coverageType === "comprehensive" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">NCD Discount ({Math.round(ncdDiscount * 100)}%)</span>
                        <span className="text-green-600 font-medium">
                          - {formatCurrency(calculation.ncdAmount)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Net Premium</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.netPremium)}
                      </span>
                    </div>

                    {/* Add-ons breakdown */}
                    {coverageType === "comprehensive" && calculation.totalAddons > 0 && (
                      <>
                        <div className="pt-2 border-t border-slate-100">
                          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Add-ons</p>
                        </div>
                        {windscreenEnabled && (
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Windscreen (RM{windscreenAmount.toLocaleString()})</span>
                            <span className="text-slate-700 font-medium">
                              {formatCurrency(calculation.windscreenPremium)}
                            </span>
                          </div>
                        )}
                        {specialPerilsEnabled && (
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Special Perils</span>
                            <span className="text-slate-700 font-medium">
                              {formatCurrency(calculation.specialPerilsPremium)}
                            </span>
                          </div>
                        )}
                        {evChargerEnabled && (
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">EV Charger Coverage</span>
                            <span className="text-slate-700 font-medium">
                              {formatCurrency(calculation.evChargerPremium)}
                            </span>
                          </div>
                        )}
                        {llpEnabled && (
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Legal Liability (Passengers)</span>
                            <span className="text-slate-700 font-medium">
                              {formatCurrency(calculation.llpPremium)}
                            </span>
                          </div>
                        )}
                        {llpnEnabled && (
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Legal Liability (Negligent Acts)</span>
                            <span className="text-slate-700 font-medium">
                              {formatCurrency(calculation.llpnPremium)}
                            </span>
                          </div>
                        )}
                      </>
                    )}

                    <div className="flex justify-between text-sm pt-2 border-t border-slate-100">
                      <span className="text-slate-500">Gross Premium</span>
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(calculation.grossPremium)}
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
                      <p className="text-xs text-green-600 mb-1">EV Road Tax</p>
                      <p className="text-2xl font-bold text-green-700">
                        {formatCurrency(calculation.roadTax)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Power Output</p>
                      <p className="text-sm font-medium text-slate-700">
                        {powerOutput} kW
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

                {/* Disclaimer */}
                <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                  <p className="text-xs text-amber-700">
                    <strong>Nota:</strong> Anggaran sahaja. Harga sebenar mungkin berbeza mengikut syarikat insurans.
                  </p>
                </div>

                {/* CTA Card */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🎯</span>
                    <h3 className="text-lg font-bold text-blue-800">
                      Dapatkan Sebut Harga {formatCurrency(calculation.totalPremium + calculation.roadTax)} Sekarang
                    </h3>
                  </div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="text-green-500 font-bold">✓</span>
                      Bandingkan harga dari Allianz, MSIG, Zurich, Etiqa
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="text-green-500 font-bold">✓</span>
                      Jimat sehingga 30% vs harga pasaran
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="text-green-500 font-bold">✓</span>
                      Sebut harga dalam 24 jam - percuma
                    </li>
                  </ul>
                  {/* Urgency */}
                  <p className="text-xs text-amber-600 font-medium mb-4">
                    ⏰ Harga insurans EV naik setiap tahun - kunci harga anda sekarang
                  </p>
                  <button
                    onClick={openModal}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    Dapatkan Sebut Harga Percuma
                    <span>→</span>
                  </button>
                  {/* Social Proof */}
                  <p className="text-xs text-blue-600 text-center mt-3">
                    ✓ 200+ pemilik EV telah dapatkan sebut harga bulan ini
                  </p>
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
              {capturedCalc && (
                <div className="mb-6 p-4 bg-slate-50 rounded-xl space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Vehicle</span>
                    <span className="text-slate-700 font-medium">{capturedCalc.vehicleModel}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Sum Insured</span>
                    <span className="text-slate-700 font-medium">{formatCurrency(capturedCalc.vehicleValue)}</span>
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
                    Phone Number *
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
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </form>

              <p className="text-xs text-slate-400 text-center mt-4">
                By submitting, you agree to be contacted by our insurance advisors.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile CTA */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-blue-600 shadow-lg safe-area-bottom">
          {/* Close button */}
          <button
            onClick={() => setShowStickyCTA(false)}
            className="absolute top-1 right-1 p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center justify-between py-3 px-4">
            <span className="text-white font-semibold text-sm">
              Insurans EV: {formatCurrency(calculation.totalPremium + calculation.roadTax)}
            </span>
            <button
              onClick={openModal}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors flex items-center gap-1"
            >
              Sebut Harga
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-bottom-4 fade-in duration-300">
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
