"use client";

import { useState, useMemo } from "react";

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

// Cabinet cost per sq ft
const CABINET_COSTS = {
  laminate: { min: 80, max: 120 },
  solid_wood: { min: 150, max: 250 },
  aluminium: { min: 100, max: 150 },
};

// Countertop cost per sq ft
const COUNTERTOP_COSTS = {
  granite_local: { min: 150, max: 250 },
  quartz: { min: 250, max: 400 },
  marble: { min: 300, max: 500 },
  concrete: { min: 80, max: 150 },
};

// Fixed costs by finish tier
const FIXED_COSTS = {
  basic: { tiles: { min: 1500, max: 2500 }, plumbing: { min: 800, max: 1500 }, labor: { min: 2000, max: 3000 } },
  standard: { tiles: { min: 2500, max: 3500 }, plumbing: { min: 1500, max: 2000 }, labor: { min: 3000, max: 4000 } },
  premium: { tiles: { min: 3500, max: 4500 }, plumbing: { min: 2000, max: 2500 }, labor: { min: 4000, max: 5500 } },
};

// Finish level multiplier
const FINISH_MULTIPLIER = {
  basic: 1.0,
  standard: 1.3,
  premium: 1.6,
};

// Location options
const LOCATIONS_EN = [
  "Kuala Lumpur",
  "Selangor - Petaling Jaya",
  "Selangor - Shah Alam",
  "Selangor - Subang",
  "Selangor - Klang",
  "Selangor - Other",
];

const LOCATIONS_BM = [
  "Kuala Lumpur",
  "Selangor - Petaling Jaya",
  "Selangor - Shah Alam",
  "Selangor - Subang",
  "Selangor - Klang",
  "Selangor - Lain-lain",
];

// Labels by locale
const LABELS = {
  en: {
    title: `Kitchen Renovation Cost Calculator Malaysia ${new Date().getFullYear()}`,
    subtitle: "Estimate your kitchen renovation cost based on size, cabinet type, and finish level",
    kitchenSize: "Kitchen Size (sq ft)",
    cabinetType: "Cabinet Type",
    countertopType: "Countertop Type",
    finishLevel: "Finish Level",
    resultHeader: "Your Estimated Kitchen Renovation Cost",
    costBreakdown: "Cost Breakdown",
    cabinets: "Cabinets",
    countertop: "Countertop",
    tiles: "Tiles & Backsplash",
    plumbing: "Plumbing & Sink",
    labor: "Installation & Labor",
    totalEstimate: "Total Estimate",
    budgetTier: "Budget Tier",
    budgetLow: "Budget-Friendly",
    budgetMid: "Mid-Range",
    budgetPremium: "Premium",
    ctaHeading: "Get a Free Quote",
    ctaSubtext: "Licensed contractors in KL/Selangor. No obligation.",
    ctaButton: "Request Free Quote",
    formName: "Name",
    formWhatsapp: "WhatsApp Number",
    formEmail: "Email",
    formLocation: "Location",
    formSubmit: "Get My Free Quote",
    formSubmitting: "Submitting...",
    formSuccess: "Thank you!",
    formSuccessText: "A licensed contractor will contact you within 24 hours to discuss your kitchen renovation project.",
    cabinetOptions: {
      laminate: "Laminate (RM80-120/sq ft)",
      solid_wood: "Solid Wood (RM150-250/sq ft)",
      aluminium: "Aluminium (RM100-150/sq ft)",
    },
    countertopOptions: {
      granite_local: "Local Granite (RM150-250/sq ft)",
      quartz: "Quartz (RM250-400/sq ft)",
      marble: "Marble (RM300-500/sq ft)",
      concrete: "Concrete/Cement (RM80-150/sq ft)",
    },
    finishOptions: {
      basic: "Basic",
      standard: "Standard",
      premium: "Premium",
    },
    locations: LOCATIONS_EN,
    selectLocation: "Select your area",
    readOther: "Baca dalam Bahasa Melayu",
    readOtherUrl: "/renovation/kalkulator-kos-renovate-dapur/",
    financingCta: "Need financing for your renovation?",
    financingUrl: "/loan/personal-loan-calculator-malaysia-based-on-salary",
  },
  bm: {
    title: `Kalkulator Kos Renovate Dapur Malaysia ${new Date().getFullYear()}`,
    subtitle: "Anggar kos renovasi dapur anda berdasarkan saiz, jenis kabinet, dan tahap kemasan",
    kitchenSize: "Saiz Dapur (kaki persegi)",
    cabinetType: "Jenis Kabinet",
    countertopType: "Jenis Countertop",
    finishLevel: "Tahap Kemasan",
    resultHeader: "Anggaran Kos Renovasi Dapur Anda",
    costBreakdown: "Pecahan Kos",
    cabinets: "Kabinet",
    countertop: "Countertop",
    tiles: "Jubin & Backsplash",
    plumbing: "Paip & Sinki",
    labor: "Kos Pemasangan",
    totalEstimate: "Jumlah Anggaran",
    budgetTier: "Tahap Bajet",
    budgetLow: "Bajet Rendah",
    budgetMid: "Bajet Sederhana",
    budgetPremium: "Bajet Premium",
    ctaHeading: "Dapatkan Sebut Harga Percuma",
    ctaSubtext: "Kontraktor berlesen di KL/Selangor. Tiada komitmen.",
    ctaButton: "Minta Sebut Harga",
    formName: "Nama",
    formWhatsapp: "No. WhatsApp",
    formEmail: "Emel",
    formLocation: "Lokasi",
    formSubmit: "Dapatkan Sebut Harga Percuma",
    formSubmitting: "Menghantar...",
    formSuccess: "Terima kasih!",
    formSuccessText: "Kontraktor berlesen akan menghubungi anda dalam masa 24 jam untuk membincangkan projek renovasi dapur anda.",
    cabinetOptions: {
      laminate: "Laminate (RM80-120/kaki persegi)",
      solid_wood: "Kayu Solid (RM150-250/kaki persegi)",
      aluminium: "Aluminium (RM100-150/kaki persegi)",
    },
    countertopOptions: {
      granite_local: "Granite Lokal (RM150-250/kaki persegi)",
      quartz: "Quartz (RM250-400/kaki persegi)",
      marble: "Marble (RM300-500/kaki persegi)",
      concrete: "Konkrit/Simen (RM80-150/kaki persegi)",
    },
    finishOptions: {
      basic: "Asas / Basic",
      standard: "Standard",
      premium: "Premium",
    },
    locations: LOCATIONS_BM,
    selectLocation: "Pilih kawasan anda",
    readOther: "Read in English",
    readOtherUrl: "/renovation/kitchen-renovation-cost-calculator-malaysia/",
    financingCta: "Perlukan pembiayaan untuk renovasi?",
    financingUrl: "/loan/personal-loan-calculator-malaysia-based-on-salary",
  },
};

type CabinetType = keyof typeof CABINET_COSTS;
type CountertopType = keyof typeof COUNTERTOP_COSTS;
type FinishLevel = keyof typeof FINISH_MULTIPLIER;
type Locale = "en" | "bm";

interface KitchenRenovationCalculatorProps {
  locale: Locale;
}

export default function KitchenRenovationCalculator({ locale }: KitchenRenovationCalculatorProps) {
  const currentYear = new Date().getFullYear();
  const labels = LABELS[locale];

  // Calculator inputs
  const [kitchenSize, setKitchenSize] = useState(100);
  const [cabinetType, setCabinetType] = useState<CabinetType>("laminate");
  const [countertopType, setCountertopType] = useState<CountertopType>("quartz");
  const [finishLevel, setFinishLevel] = useState<FinishLevel>("standard");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    location: "",
  });
  const [showStickyCTA, setShowStickyCTA] = useState(true);
  const [ctaSource, setCtaSource] = useState<"sticky_bar" | "results_card">("results_card");

  // Calculate costs
  const calculation = useMemo(() => {
    const cabinetCost = CABINET_COSTS[cabinetType];
    const countertopCost = COUNTERTOP_COSTS[countertopType];
    const fixedCost = FIXED_COSTS[finishLevel];
    const multiplier = FINISH_MULTIPLIER[finishLevel];

    // Calculate cabinet and countertop costs based on size
    const cabinetMin = Math.round(kitchenSize * cabinetCost.min * multiplier);
    const cabinetMax = Math.round(kitchenSize * cabinetCost.max * multiplier);

    // Countertop typically covers about 30% of kitchen area
    const countertopArea = kitchenSize * 0.3;
    const countertopMin = Math.round(countertopArea * countertopCost.min * multiplier);
    const countertopMax = Math.round(countertopArea * countertopCost.max * multiplier);

    // Fixed costs
    const tilesMin = fixedCost.tiles.min;
    const tilesMax = fixedCost.tiles.max;
    const plumbingMin = fixedCost.plumbing.min;
    const plumbingMax = fixedCost.plumbing.max;
    const laborMin = fixedCost.labor.min;
    const laborMax = fixedCost.labor.max;

    // Totals
    const totalMin = cabinetMin + countertopMin + tilesMin + plumbingMin + laborMin;
    const totalMax = cabinetMax + countertopMax + tilesMax + plumbingMax + laborMax;

    // Budget tier based on average
    const avgTotal = (totalMin + totalMax) / 2;
    let budgetTier: "low" | "mid" | "premium";
    if (avgTotal < 15000) {
      budgetTier = "low";
    } else if (avgTotal <= 35000) {
      budgetTier = "mid";
    } else {
      budgetTier = "premium";
    }

    return {
      cabinet: { min: cabinetMin, max: cabinetMax },
      countertop: { min: countertopMin, max: countertopMax },
      tiles: { min: tilesMin, max: tilesMax },
      plumbing: { min: plumbingMin, max: plumbingMax },
      labor: { min: laborMin, max: laborMax },
      total: { min: totalMin, max: totalMax },
      budgetTier,
    };
  }, [kitchenSize, cabinetType, countertopType, finishLevel]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatRange = (min: number, max: number) => {
    return `${formatCurrency(min)} - ${formatCurrency(max)}`;
  };

  const getBudgetTierLabel = () => {
    switch (calculation.budgetTier) {
      case "low":
        return labels.budgetLow;
      case "mid":
        return labels.budgetMid;
      case "premium":
        return labels.budgetPremium;
    }
  };

  const getBudgetTierColor = () => {
    switch (calculation.budgetTier) {
      case "low":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "mid":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "premium":
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const openModal = (source: "sticky_bar" | "results_card" = "results_card") => {
    setCtaSource(source);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const deviceType = typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop";
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          full_name: formData.name,
          whatsapp_number: formData.whatsapp,
          location: formData.location,
          calculator_type: "kitchen_renovation",
          language: locale === "bm" ? "BM" : "EN",
          kitchen_size: kitchenSize,
          cabinet_type: cabinetType,
          countertop_type: countertopType,
          finish_level: finishLevel,
          estimated_cost_min: calculation.total.min,
          estimated_cost_max: calculation.total.max,
          source_url: typeof window !== "undefined" ? window.location.href : "",
          device_type: deviceType,
          cta_source: ctaSource,
          referrer: typeof document !== "undefined" ? document.referrer : "",
          landing_page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmitSuccess(false);
    setFormData({ name: "", whatsapp: "", email: "", location: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>🏠</span>
            <span>{locale === "bm" ? `Kalkulator Renovasi ${currentYear}` : `Renovation Calculator ${currentYear}`}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {labels.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {labels.subtitle}
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">🍳</span>
              {locale === "bm" ? "Maklumat Dapur" : "Kitchen Details"}
            </h2>

            <div className="space-y-6">
              {/* Kitchen Size Slider */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {labels.kitchenSize}
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={kitchenSize}
                    onChange={(e) => setKitchenSize(Math.max(50, Math.min(300, Number(e.target.value))))}
                    min={50}
                    max={300}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={kitchenSize}
                    onChange={(e) => setKitchenSize(Number(e.target.value))}
                    min={50}
                    max={300}
                    step={10}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>50 {locale === "bm" ? "kaki²" : "sq ft"}</span>
                    <span>300 {locale === "bm" ? "kaki²" : "sq ft"}</span>
                  </div>
                </div>
              </div>

              {/* Cabinet Type Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {labels.cabinetType}
                </label>
                <select
                  value={cabinetType}
                  onChange={(e) => setCabinetType(e.target.value as CabinetType)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="laminate">{labels.cabinetOptions.laminate}</option>
                  <option value="solid_wood">{labels.cabinetOptions.solid_wood}</option>
                  <option value="aluminium">{labels.cabinetOptions.aluminium}</option>
                </select>
              </div>

              {/* Countertop Type Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {labels.countertopType}
                </label>
                <select
                  value={countertopType}
                  onChange={(e) => setCountertopType(e.target.value as CountertopType)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="granite_local">{labels.countertopOptions.granite_local}</option>
                  <option value="quartz">{labels.countertopOptions.quartz}</option>
                  <option value="marble">{labels.countertopOptions.marble}</option>
                  <option value="concrete">{labels.countertopOptions.concrete}</option>
                </select>
              </div>

              {/* Finish Level Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {labels.finishLevel}
                </label>
                <select
                  value={finishLevel}
                  onChange={(e) => setFinishLevel(e.target.value as FinishLevel)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="basic">{labels.finishOptions.basic}</option>
                  <option value="standard">{labels.finishOptions.standard}</option>
                  <option value="premium">{labels.finishOptions.premium}</option>
                </select>
              </div>

              {/* Info Box */}
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <p className="text-sm text-orange-800">
                  <strong>💡 {locale === "bm" ? "Tip:" : "Tip:"}</strong>{" "}
                  {locale === "bm"
                    ? "Harga berbeza mengikut lokasi dan kontraktor. Anggaran ini untuk kawasan KL/Selangor."
                    : "Prices vary by location and contractor. This estimate is for KL/Selangor area."}
                </p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Main Result Card */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">{labels.resultHeader}</h3>
              <p className="text-4xl md:text-5xl font-bold mb-4">
                {formatRange(calculation.total.min, calculation.total.max)}
              </p>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getBudgetTierColor()}`}>
                <span>{labels.budgetTier}:</span>
                <span className="font-bold">{getBudgetTierLabel()}</span>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">📋 {labels.costBreakdown}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">{labels.cabinets}</span>
                  <span className="font-semibold text-slate-900">{formatRange(calculation.cabinet.min, calculation.cabinet.max)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">{labels.countertop}</span>
                  <span className="font-semibold text-slate-900">{formatRange(calculation.countertop.min, calculation.countertop.max)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">{labels.tiles}</span>
                  <span className="font-semibold text-slate-900">{formatRange(calculation.tiles.min, calculation.tiles.max)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">{labels.plumbing}</span>
                  <span className="font-semibold text-slate-900">{formatRange(calculation.plumbing.min, calculation.plumbing.max)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">{labels.labor}</span>
                  <span className="font-semibold text-slate-900">{formatRange(calculation.labor.min, calculation.labor.max)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-orange-50 rounded-lg px-3">
                  <span className="text-orange-700 font-bold">{labels.totalEstimate}</span>
                  <span className="font-bold text-orange-700">{formatRange(calculation.total.min, calculation.total.max)}</span>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{labels.ctaHeading}</h3>
                <p className="text-slate-600 text-sm mb-4">{labels.ctaSubtext}</p>
                <button
                  onClick={() => openModal("results_card")}
                  className="w-full py-4 bg-orange-600 hover:bg-orange-700 rounded-xl text-white font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {labels.ctaButton}
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Language Switch & Financing Link */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href={labels.readOtherUrl}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
          >
            🌐 {labels.readOther}
          </a>
          <a
            href={labels.financingUrl}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm font-medium"
          >
            💰 {labels.financingCta}
          </a>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-orange-600 shadow-lg safe-area-bottom">
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
              <p className="font-semibold">{formatRange(calculation.total.min, calculation.total.max)}</p>
              <p className="text-xs text-white/80">{locale === "bm" ? "Dapatkan sebut harga percuma" : "Get free quote now"}</p>
            </div>
            <button
              onClick={() => openModal("sticky_bar")}
              className="px-4 py-2 bg-white text-orange-600 font-semibold rounded-lg text-sm"
            >
              {locale === "bm" ? "Sebut Harga →" : "Get Quote →"}
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">{labels.ctaHeading}</h3>
                <button
                  onClick={closeModal}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">{labels.formSuccess}</h4>
                  <p className="text-slate-600">{labels.formSuccessText}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Calculator Summary */}
                  <div className="bg-orange-50 rounded-xl p-4 mb-2">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">
                      {locale === "bm" ? "Ringkasan Anggaran Anda" : "Your Estimate Summary"}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">{labels.kitchenSize}:</span>
                        <span className="font-bold text-slate-800">{kitchenSize} {locale === "bm" ? "kaki²" : "sq ft"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">{labels.totalEstimate}:</span>
                        <span className="font-bold text-orange-600">{formatRange(calculation.total.min, calculation.total.max)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{labels.formName} *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={locale === "bm" ? "Masukkan nama anda" : "Enter your name"}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{labels.formEmail} *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={locale === "bm" ? "anda@email.com" : "your@email.com"}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{labels.formWhatsapp} *</label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="012-3456789"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{labels.formLocation} *</label>
                    <select
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">{labels.selectLocation}</option>
                      {labels.locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 rounded-xl text-white font-semibold transition-all"
                  >
                    {isSubmitting ? labels.formSubmitting : labels.formSubmit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
