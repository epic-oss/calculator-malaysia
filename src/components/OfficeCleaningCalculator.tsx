"use client";

import { useState, useMemo } from "react";

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

const OFFICE_SIZES = [
  { label: "Small (500 - 1,000 sq ft)", value: "small", baseMin: 120, baseMax: 180 },
  { label: "Medium (1,000 - 2,000 sq ft)", value: "medium", baseMin: 180, baseMax: 300 },
  { label: "Large (2,000 - 3,500 sq ft)", value: "large", baseMin: 300, baseMax: 500 },
  { label: "Very Large (3,500+ sq ft)", value: "very_large", baseMin: 0, baseMax: 0 },
];

const CLEANING_TYPES = [
  { label: "Basic Clean (dusting, mopping, trash)", value: "basic", multiplier: 1.0 },
  { label: "Standard Clean (basic + windows, pantry)", value: "standard", multiplier: 1.3 },
  { label: "Deep Clean (scrubbing, sanitization, carpet)", value: "deep", multiplier: 1.8 },
];

const FREQUENCIES = [
  { label: "One-time", value: "one_time", multiplier: 1.0, discount: "No discount", visitsPerMonth: 1 },
  { label: "Weekly", value: "weekly", multiplier: 0.85, discount: "15% discount", visitsPerMonth: 4 },
  { label: "Twice a week", value: "twice_weekly", multiplier: 0.80, discount: "20% discount", visitsPerMonth: 8 },
  { label: "Daily (Mon-Fri)", value: "daily", multiplier: 0.75, discount: "25% discount", visitsPerMonth: 22 },
];

const ADDONS = [
  { id: "carpet", label: "Carpet cleaning", price: 150 },
  { id: "window", label: "Window cleaning", price: 100 },
  { id: "aircon", label: "Aircon cleaning (per unit)", price: 80 },
  { id: "pantry", label: "Pantry deep clean", price: 120 },
  { id: "toilet", label: "Toilet deep clean", price: 100 },
];

const LOCATIONS = [
  { label: "Kuala Lumpur - City Centre", value: "kl_city", multiplier: 1.0 },
  { label: "Kuala Lumpur - Other areas", value: "kl_other", multiplier: 1.0 },
  { label: "Selangor - Petaling Jaya", value: "pj", multiplier: 1.0 },
  { label: "Selangor - Shah Alam", value: "shah_alam", multiplier: 1.0 },
  { label: "Selangor - Subang Jaya", value: "subang", multiplier: 1.0 },
  { label: "Selangor - Klang", value: "klang", multiplier: 1.0 },
  { label: "Selangor - Other areas", value: "selangor_other", multiplier: 1.05 },
];

interface CapturedCalculation {
  officeSize: string;
  cleaningType: string;
  frequency: string;
  addons: string;
  location: string;
  estimatedCostMin: number;
  estimatedCostMax: number;
  monthlyCost: number;
}

export default function OfficeCleaningCalculator() {
  const [officeSize, setOfficeSize] = useState(OFFICE_SIZES[0].value);
  const [cleaningType, setCleaningType] = useState(CLEANING_TYPES[0].value);
  const [frequency, setFrequency] = useState(FREQUENCIES[0].value);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [location, setLocation] = useState(LOCATIONS[0].value);
  const [showModal, setShowModal] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(true);
  const [ctaSource, setCtaSource] = useState<"sticky_bar" | "results_card">("results_card");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "+60",
    companyName: "",
    officeAddress: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });
  const [capturedCalc, setCapturedCalc] = useState<CapturedCalculation | null>(null);

  const selectedSize = OFFICE_SIZES.find((s) => s.value === officeSize) || OFFICE_SIZES[0];
  const selectedCleanType = CLEANING_TYPES.find((c) => c.value === cleaningType) || CLEANING_TYPES[0];
  const selectedFreq = FREQUENCIES.find((f) => f.value === frequency) || FREQUENCIES[0];
  const selectedLoc = LOCATIONS.find((l) => l.value === location) || LOCATIONS[0];

  const isVeryLarge = officeSize === "very_large";

  const calculation = useMemo(() => {
    if (isVeryLarge) {
      return { baseMin: 0, baseMax: 0, addonsTotal: 0, costMin: 0, costMax: 0, monthlyCostMin: 0, monthlyCostMax: 0 };
    }

    const baseMin = selectedSize.baseMin * selectedCleanType.multiplier;
    const baseMax = selectedSize.baseMax * selectedCleanType.multiplier;

    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = ADDONS.find((a) => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);

    const subtotalMin = baseMin + addonsTotal;
    const subtotalMax = baseMax + addonsTotal;

    const costMin = Math.round(subtotalMin * selectedLoc.multiplier * selectedFreq.multiplier);
    const costMax = Math.round(subtotalMax * selectedLoc.multiplier * selectedFreq.multiplier);

    const monthlyCostMin = costMin * selectedFreq.visitsPerMonth;
    const monthlyCostMax = costMax * selectedFreq.visitsPerMonth;

    return {
      baseMin: Math.round(baseMin),
      baseMax: Math.round(baseMax),
      addonsTotal,
      costMin,
      costMax,
      monthlyCostMin,
      monthlyCostMax,
    };
  }, [officeSize, cleaningType, frequency, selectedAddons, location, isVeryLarge, selectedSize, selectedCleanType, selectedFreq, selectedLoc]);

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  const openModal = (source: "sticky_bar" | "results_card" = "results_card") => {
    setCtaSource(source);
    const addonLabels = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.label)
      .filter(Boolean)
      .join(", ");
    setCapturedCalc({
      officeSize: selectedSize.label,
      cleaningType: selectedCleanType.label,
      frequency: selectedFreq.label,
      addons: addonLabels || "None",
      location: selectedLoc.label,
      estimatedCostMin: calculation.costMin,
      estimatedCostMax: calculation.costMax,
      monthlyCost: calculation.monthlyCostMax,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ fullName: "", phone: "+60", companyName: "", officeAddress: "" });
    setCapturedCalc(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!capturedCalc) {
      showToast("error", "Something went wrong. Please try again.");
      setIsSubmitting(false);
      return;
    }

    const deviceType = typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop";
    const leadData = {
      timestamp: new Date().toISOString(),
      full_name: formData.fullName,
      whatsapp_number: formData.phone,
      company_name: formData.companyName,
      office_address: formData.officeAddress || "",
      calculator_type: "office_cleaning",
      office_size: capturedCalc.officeSize,
      cleaning_type: capturedCalc.cleaningType,
      frequency: capturedCalc.frequency,
      addons: capturedCalc.addons,
      location: capturedCalc.location,
      estimated_cost_min: capturedCalc.estimatedCostMin,
      estimated_cost_max: capturedCalc.estimatedCostMax,
      monthly_cost: capturedCalc.monthlyCost,
      source_url: typeof window !== "undefined" ? window.location.href : "",
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

      if (response.ok) {
        closeModal();
        showToast("success", "Thanks! Our cleaning team will WhatsApp you within 24 hours");
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("error", "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div
            className={`px-6 py-4 rounded-2xl shadow-2xl text-white font-medium ${
              toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            🧹 Free Calculator
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            Office Cleaning Cost Calculator Malaysia
          </h1>
          <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto">
            Estimate your office cleaning cost based on size, cleaning type, and frequency
          </p>
        </div>
      </div>

      {/* Calculator Card */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Office Size */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  📐 Office Size
                </label>
                <select
                  value={officeSize}
                  onChange={(e) => setOfficeSize(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {OFFICE_SIZES.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type of Cleaning */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  🧼 Type of Cleaning
                </label>
                <select
                  value={cleaningType}
                  onChange={(e) => setCleaningType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {CLEANING_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  📅 Frequency
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {FREQUENCIES.map((freq) => (
                    <option key={freq.value} value={freq.value}>
                      {freq.label} {freq.discount !== "No discount" ? `(${freq.discount})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  📍 Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc.value} value={loc.value}>
                      {loc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Add-ons */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                ➕ Add-ons (optional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {ADDONS.map((addon) => (
                  <label
                    key={addon.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedAddons.includes(addon.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 bg-slate-50 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={() => toggleAddon(addon.id)}
                      className="mt-0.5 accent-blue-600"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-700">{addon.label}</span>
                      <span className="block text-xs text-blue-600 font-semibold">+RM{addon.price}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100 p-6 md:p-8">
            {isVeryLarge ? (
              /* Very Large Office - Custom Quote */
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 rounded-full px-4 py-2 text-sm font-medium mb-4">
                  🏢 Large Office
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Custom Quote Required</h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  For offices above 3,500 sq ft, we recommend a site visit for accurate quotation.
                </p>
                <button
                  onClick={() => openModal("results_card")}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-200"
                >
                  Request Site Visit →
                </button>
              </div>
            ) : (
              /* Normal Results */
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Your Estimated Cleaning Cost</h3>

                {/* Cost Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Base cleaning cost</span>
                    <span className="font-semibold text-slate-800">
                      RM {calculation.baseMin} - RM {calculation.baseMax}
                    </span>
                  </div>
                  {calculation.addonsTotal > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Add-ons</span>
                      <span className="font-semibold text-slate-800">RM {calculation.addonsTotal}</span>
                    </div>
                  )}
                  {selectedFreq.multiplier < 1 && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Recurring discount</span>
                      <span className="font-semibold text-green-600">
                        {selectedFreq.discount}
                      </span>
                    </div>
                  )}
                  {selectedLoc.multiplier > 1 && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Location surcharge</span>
                      <span className="font-semibold text-amber-600">
                        +{Math.round((selectedLoc.multiplier - 1) * 100)}%
                      </span>
                    </div>
                  )}
                  <div className="border-t border-blue-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-slate-900">Estimated Cost</span>
                      <span className="text-2xl font-extrabold text-blue-600">
                        RM {calculation.costMin} - RM {calculation.costMax}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 text-right">per visit</p>
                  </div>
                  {frequency !== "one_time" && (
                    <div className="flex justify-between items-center bg-blue-100/50 rounded-xl p-3">
                      <span className="text-slate-700 font-medium">Monthly cost</span>
                      <span className="text-lg font-bold text-blue-700">
                        RM {calculation.monthlyCostMin.toLocaleString()} - RM {calculation.monthlyCostMax.toLocaleString()}/month
                      </span>
                    </div>
                  )}
                </div>

                {/* CTA Section */}
                <div className="bg-white rounded-xl p-6 border border-blue-200 text-center">
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Get Your Exact Quote</h4>
                  <p className="text-sm text-slate-500 mb-4">
                    Licensed cleaners in KL/Selangor. Free site assessment.
                  </p>
                  <button
                    onClick={() => openModal("results_card")}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-200"
                  >
                    Get Free Quote →
                  </button>
                  <p className="text-xs text-slate-400 mt-3">✓ 50+ offices cleaned monthly</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      {showStickyCTA && !isVeryLarge && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
          <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between shadow-2xl">
            <div className="flex-1">
              <p className="text-sm font-bold">
                Est: RM{calculation.costMin}-{calculation.costMax}/visit
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openModal("sticky_bar")}
                className="px-5 py-2.5 bg-white text-blue-600 font-bold text-sm rounded-lg"
              >
                Get Quote →
              </button>
              <button
                onClick={() => setShowStickyCTA(false)}
                className="text-white/80 hover:text-white p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lead Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center">
          <div className="bg-white w-full md:max-w-md md:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {isVeryLarge ? "Request Site Visit" : "Get Your Free Quote"}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">We&apos;ll WhatsApp you within 24 hours</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-slate-400 hover:text-slate-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Captured Calculation Summary */}
              {capturedCalc && !isVeryLarge && (
                <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-slate-500">Office Size</span>
                      <p className="font-semibold text-slate-800">{capturedCalc.officeSize}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Cleaning Type</span>
                      <p className="font-semibold text-slate-800">{capturedCalc.cleaningType}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Frequency</span>
                      <p className="font-semibold text-slate-800">{capturedCalc.frequency}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Estimated Cost</span>
                      <p className="font-bold text-blue-600">
                        RM {capturedCalc.estimatedCostMin} - RM {capturedCalc.estimatedCostMax}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+60123456789"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Your company name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Office Address</label>
                  <textarea
                    value={formData.officeAddress}
                    onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
                    placeholder="Office address (optional)"
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all mt-2"
                >
                  {isSubmitting ? "Submitting..." : isVeryLarge ? "Request Site Visit →" : "Get Free Quote →"}
                </button>
              </form>

              <p className="text-xs text-slate-400 text-center mt-4">
                By submitting, you agree to be contacted by our cleaning service partners.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
