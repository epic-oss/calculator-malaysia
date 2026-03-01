"use client";

import { useState, useMemo, useEffect } from "react";
import { weddingConfigs, calculateHantaranCost, type WeddingType, type WItem, type WSection } from "@/data/weddingConfigs";

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

function getItemCost(item: WItem, values: Record<string, number | boolean>, allValues: Record<string, number | boolean>): { min: number; max: number } {
  if (item.showIf && !allValues[item.showIf]) return { min: 0, max: 0 };

  let min = 0, max = 0;

  switch (item.type) {
    case "dropdown": {
      const idx = (values[item.id] as number) ?? 0;
      const opt = item.options?.[idx];
      if (opt) { min = opt.min; max = opt.max; }
      break;
    }
    case "toggle":
      if (values[item.id]) { min = item.addMin || 0; max = item.addMax || 0; }
      break;
    case "input":
      min = max = (values[item.id] as number) || 0;
      break;
    case "slider":
      return { min: 0, max: 0 }; // sliders are quantities, not costs
  }

  if (item.multiplyBy) {
    const multiplier = (allValues[item.multiplyBy] as number) || 1;
    min *= multiplier;
    max *= multiplier;
  }

  return { min: Math.round(min), max: Math.round(max) };
}

function getSectionCost(section: WSection, values: Record<string, number | boolean>): { min: number; max: number } {
  let totalMin = 0, totalMax = 0;
  for (const item of section.items) {
    const cost = getItemCost(item, values, values);
    totalMin += cost.min;
    totalMax += cost.max;
  }
  return { min: totalMin, max: totalMax };
}

export default function WeddingCostCalculator({ type }: { type: WeddingType }) {
  const config = weddingConfigs[type];

  // Initialize values from config defaults
  const initValues = useMemo(() => {
    const v: Record<string, number | boolean> = {};
    for (const section of config.sections) {
      for (const item of section.items) {
        v[item.id] = item.defaultValue;
      }
    }
    for (const item of config.giftSection.items) {
      v[item.id] = item.defaultValue;
    }
    return v;
  }, [config]);

  const [values, setValues] = useState<Record<string, number | boolean>>(initValues);
  const [showModal, setShowModal] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [ctaSource, setCtaSource] = useState<"sticky_bar" | "results_card" | "floating_cta">("results_card");
  const [formData, setFormData] = useState({ fullName: "", phone: "+60", email: "", weddingDate: "", preferredVendors: [] as string[] });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({ show: false, type: "success", message: "" });

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateValue = (id: string, val: number | boolean) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  const vendorOptions = ["Venue/Banquet", "Photographer/Videographer", "Bridal/Attire", "Catering", "Decor/Florist", "Music/Entertainment"];

  // Calculation
  const calculation = useMemo(() => {
    const sectionCosts: { title: string; min: number; max: number }[] = [];

    for (const section of config.sections) {
      // Special handling for Malay hantaran
      if (type === "malay" && section.title === "Hantaran") {
        const hc = calculateHantaranCost(values, config.sections);
        sectionCosts.push({ title: section.title, min: hc.min, max: hc.max });
        continue;
      }
      const cost = getSectionCost(section, values);
      sectionCosts.push({ title: section.title, ...cost });
    }

    const totalMin = sectionCosts.reduce((s, c) => s + c.min, 0);
    const totalMax = sectionCosts.reduce((s, c) => s + c.max, 0);
    const guestCount = config.getGuestCount(values);
    const giftOffset = config.calculateGifts(values, guestCount, config.giftSection.items);

    return { sectionCosts, totalMin, totalMax, guestCount, giftOffset, netMin: totalMin - giftOffset, netMax: totalMax - giftOffset };
  }, [values, config, type]);

  const showToast = (t: "success" | "error", message: string) => {
    setToast({ show: true, type: t, message });
    setTimeout(() => setToast((p) => ({ ...p, show: false })), 5000);
  };

  const openModal = (source: "sticky_bar" | "results_card" | "floating_cta" = "results_card") => {
    setCtaSource(source);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ fullName: "", phone: "+60", email: "", weddingDate: "", preferredVendors: [] });
  };

  // Resolve a dropdown item's index to its option label
  const getOptionLabel = (itemId: string): string => {
    for (const section of config.sections) {
      for (const item of section.items) {
        if (item.id === itemId && item.options) {
          const idx = (values[itemId] as number) || 0;
          return item.options[idx]?.label || "";
        }
      }
    }
    return "";
  };

  // Build type-specific fields for the webhook payload
  const getTypeSpecificFields = (): Record<string, string | number | boolean> => {
    if (type === "chinese") {
      return {
        venue_type: getOptionLabel("venue_type"),
        price_tier: getOptionLabel("price_per_table"),
        num_tables: (values.num_tables as number) || 30,
        si_dian_jin: getOptionLabel("bride_price"),
        include_guo_da_li: !!values.guo_da_li,
        bridal_package: getOptionLabel("photo_gown"),
      };
    }
    if (type === "indian") {
      return {
        ceremony_type: getOptionLabel("ceremony_type"),
        num_events: getOptionLabel("num_events"),
        catering_style: getOptionLabel("catering"),
        thali_budget: getOptionLabel("thali"),
        bride_saree_budget: getOptionLabel("bride_attire"),
        mandap_decor: getOptionLabel("mandap"),
      };
    }
    if (type === "malay") {
      return {
        venue_type: getOptionLabel("venue"),
        catering_tier: getOptionLabel("catering"),
        pelamin_package: getOptionLabel("pelamin"),
        bridal_package: getOptionLabel("bridal_package"),
        hantaran_trays: getOptionLabel("hantaran_trays"),
        hantaran_value: getOptionLabel("hantaran_value"),
      };
    }
    if (type === "christian") {
      return {
        ceremony_venue: getOptionLabel("ceremony_venue"),
        reception_venue: getOptionLabel("reception_venue"),
        catering_style: getOptionLabel("catering"),
        wedding_gown: getOptionLabel("wedding_gown"),
        photo_video_package: getOptionLabel("photo_video"),
      };
    }
    return {};
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const deviceType = typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop";
    const leadData = {
      timestamp: new Date().toISOString(),
      full_name: formData.fullName,
      whatsapp_number: formData.phone,
      email: formData.email || "",
      wedding_date: formData.weddingDate || "",
      preferred_vendors: formData.preferredVendors.join(", "),
      calculator_type: config.calculatorType,
      guest_count: calculation.guestCount,
      total_budget_min: calculation.totalMin,
      total_budget_max: calculation.totalMax,
      expected_gift_offset: calculation.giftOffset,
      net_cost: calculation.netMax,
      source_url: typeof window !== "undefined" ? window.location.href : "",
      device_type: deviceType,
      cta_source: ctaSource,
      referrer: typeof document !== "undefined" ? document.referrer : "",
      landing_page: typeof window !== "undefined" ? window.location.href : "",
      ...getTypeSpecificFields(),
    };
    try {
      const response = await fetch(WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(leadData) });
      if (response.ok) { closeModal(); showToast("success", "Thanks! Our wedding specialist will WhatsApp you within 24 hours"); }
      else showToast("error", "Something went wrong. Please try again.");
    } catch { showToast("error", "Something went wrong. Please try again."); }
    finally { setIsSubmitting(false); }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const toggleVendor = (v: string) => {
    setFormData((p) => ({
      ...p,
      preferredVendors: p.preferredVendors.includes(v)
        ? p.preferredVendors.filter((x) => x !== v)
        : [...p.preferredVendors, v],
    }));
  };

  const renderItem = (item: WItem) => {
    if (item.showIf && !values[item.showIf]) return null;

    switch (item.type) {
      case "dropdown":
        return (
          <div key={item.id}>
            <label className="block text-sm font-semibold text-slate-700 mb-2">{item.label}</label>
            <select
              value={(values[item.id] as number) ?? 0}
              onChange={(e) => updateValue(item.id, parseInt(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            >
              {item.options?.map((opt, i) => (
                <option key={i} value={i}>{opt.label}</option>
              ))}
            </select>
          </div>
        );
      case "slider":
        return (
          <div key={item.id}>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {item.label}: <span className="text-pink-600 font-bold">{(values[item.id] as number) ?? item.defaultValue}</span>
            </label>
            <input
              type="range"
              min={item.min} max={item.max} step={item.step}
              value={(values[item.id] as number) ?? item.defaultValue}
              onChange={(e) => updateValue(item.id, parseInt(e.target.value))}
              className="w-full accent-pink-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>{item.min}</span><span>{item.max}</span>
            </div>
          </div>
        );
      case "toggle":
        return (
          <div key={item.id} className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">{item.label}</label>
            <button
              type="button"
              onClick={() => updateValue(item.id, !values[item.id])}
              className={`relative w-12 h-6 rounded-full transition-colors ${values[item.id] ? "bg-pink-500" : "bg-slate-300"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${values[item.id] ? "translate-x-6" : "translate-x-0.5"}`} />
            </button>
          </div>
        );
      case "input":
        return (
          <div key={item.id}>
            <label className="block text-sm font-semibold text-slate-700 mb-2">{item.label}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">RM</span>
              <input
                type="number"
                value={(values[item.id] as number) ?? item.defaultValue}
                onChange={(e) => updateValue(item.id, parseInt(e.target.value) || 0)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        );
      default: return null;
    }
  };

  const fmt = (n: number) => n.toLocaleString("en-MY");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Toast */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-6 py-4 rounded-2xl shadow-2xl text-white font-medium ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Hero - gradient classes must be full strings for Tailwind JIT scanning */}
      <div className={
        type === "chinese" ? "relative overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-amber-600 text-white py-10 md:py-14" :
        type === "indian" ? "relative overflow-hidden bg-gradient-to-br from-red-800 via-red-700 to-orange-600 text-white py-10 md:py-14" :
        type === "malay" ? "relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-600 text-white py-10 md:py-14" :
        "relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-600 text-white py-10 md:py-14"
      }>
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium text-white mb-4">
            {config.heroBadge}
          </div>
          <div className="text-5xl md:text-6xl mb-4">{config.heroEmoji}</div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-white">{config.heroTitle}</h1>
          <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">{config.heroSubtitle}</p>
        </div>
        {/* Decorative bottom border - gold for Indian, white for others */}
        {type === "indian" ? (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400" />
        ) : (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
        )}
      </div>

      {/* Calculator */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Sections */}
          {config.sections.map((section, sIdx) => (
            <div key={sIdx} className={`p-6 md:p-8 ${sIdx > 0 ? "border-t border-slate-100" : ""}`}>
              <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span>{section.icon}</span> {section.title}
              </h3>
              <div className="grid md:grid-cols-2 gap-5">
                {section.items.map(renderItem)}
              </div>
            </div>
          ))}

          {/* Gift Offset Section */}
          <div className="p-6 md:p-8 border-t border-slate-100 bg-emerald-50/50">
            <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span>🎁</span> {config.giftSection.title}
            </h3>
            <div className="grid md:grid-cols-2 gap-5">
              {config.giftSection.items.map(renderItem)}
            </div>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-t border-pink-100 p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Budget Summary</h3>

            {/* Section breakdown */}
            <div className="space-y-2 mb-4">
              {calculation.sectionCosts.map((sc, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">{sc.title}</span>
                  <span className="font-semibold text-slate-800">RM {fmt(sc.min)} - RM {fmt(sc.max)}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-pink-200 pt-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">{config.labels.totalCost}</span>
                <span className="text-2xl font-extrabold text-pink-600">RM {fmt(calculation.totalMin)} - RM {fmt(calculation.totalMax)}</span>
              </div>
              <p className="text-xs text-slate-500 text-right mt-1">{calculation.guestCount} guests</p>
            </div>

            {/* Gift Offset */}
            <div className="bg-white rounded-xl p-4 border border-pink-200 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">{config.labels.giftTotal}</span>
                <span className="font-bold text-emerald-600">RM {fmt(calculation.giftOffset)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">{config.labels.netCost}</span>
                <span className={`text-lg font-extrabold ${calculation.netMax <= 0 ? "text-emerald-600" : "text-pink-600"}`}>
                  RM {fmt(Math.abs(calculation.netMin))} - RM {fmt(Math.abs(calculation.netMax))}
                </span>
              </div>
              <div className="text-right mt-1">
                {calculation.netMax <= 0 ? (
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">{config.labels.surplus}</span>
                ) : (
                  <span className="text-xs font-semibold text-pink-600 bg-pink-100 px-2 py-1 rounded-full">{config.labels.shortfall}</span>
                )}
              </div>
            </div>

            {/* Social Proof */}
            <p className="text-center text-xs text-slate-400 py-2">✓ {config.socialProof}</p>

            {/* CTA */}
            <div className="bg-white rounded-xl p-6 border border-pink-200 text-center">
              <h4 className="text-lg font-bold text-slate-900 mb-1">{config.cta.heading}</h4>
              <p className="text-sm text-slate-500 mb-4">{config.cta.subtext}</p>
              <button onClick={() => openModal("results_card")} className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-pink-200">
                {config.cta.button}
              </button>
              <p className={`text-[13px] mt-3 ${
                type === "indian" ? "text-pink-700" :
                type === "chinese" ? "text-red-700" :
                type === "malay" ? "text-green-700" :
                "text-blue-700"
              }`} dangerouslySetInnerHTML={{ __html: config.cta.trust.replace(/(\d[\d,+.]+\S*)/g, '<strong>$1</strong>') }} />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Stats Banner */}
      <div className="max-w-4xl mx-auto px-4 mt-8 mb-4">
        <div className={`rounded-2xl py-4 px-6 flex items-center justify-center gap-6 md:gap-10 ${
          type === "chinese" ? "bg-red-50" :
          type === "indian" ? "bg-pink-50" :
          type === "malay" ? "bg-green-50" :
          "bg-blue-50"
        }`} style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <div className="text-center">
            <div className={`text-lg md:text-xl font-bold ${
              type === "chinese" ? "text-red-700" :
              type === "indian" ? "text-pink-700" :
              type === "malay" ? "text-green-700" :
              "text-blue-700"
            }`}>150+</div>
            <div className="text-[11px] md:text-xs text-slate-500">Couples Helped</div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center">
            <div className={`text-lg md:text-xl font-bold ${
              type === "chinese" ? "text-red-700" :
              type === "indian" ? "text-pink-700" :
              type === "malay" ? "text-green-700" :
              "text-blue-700"
            }`}>RM3.8M</div>
            <div className="text-[11px] md:text-xs text-slate-500">Budgets Planned</div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center">
            <div className={`text-lg md:text-xl font-bold ${
              type === "chinese" ? "text-red-700" :
              type === "indian" ? "text-pink-700" :
              type === "malay" ? "text-green-700" :
              "text-blue-700"
            }`}>4.8/5</div>
            <div className="text-[11px] md:text-xs text-slate-500">Couple Rating</div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
          <div className="bg-pink-600 text-white px-4 py-3 flex items-center justify-between shadow-2xl">
            <p className="text-sm font-bold">Budget: RM{fmt(calculation.totalMax)}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => openModal("sticky_bar")} className="px-5 py-2.5 bg-white text-pink-600 font-bold text-sm rounded-lg">
                Get Quotes →
              </button>
              <button onClick={() => setShowStickyCTA(false)} className="text-white/80 hover:text-white p-1" aria-label="Close">✕</button>
            </div>
          </div>
        </div>
      )}

      {/* Floating CTA Stack - button hidden on mobile (sticky bar is sufficient) */}
      <div className="fixed bottom-20 md:bottom-5 right-4 md:right-6 z-50 flex flex-col items-end gap-2">
        {showBackToTop && (
          <button onClick={scrollToTop} className="w-10 h-10 bg-white border border-slate-200 rounded-full shadow-md hover:bg-slate-50 transition-all flex items-center justify-center" aria-label="Back to top">
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
          </button>
        )}
        <div className="hidden md:block bg-white px-3 py-1.5 rounded-full shadow-md text-xs text-slate-500">{config.socialProof}</div>
        <button onClick={() => openModal("floating_cta")} className="hidden md:block px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full shadow-lg transition-all">
          {config.cta.button}
        </button>
      </div>

      {/* Lead Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center">
          <div className="bg-white w-full md:max-w-md md:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{config.cta.heading}</h3>
                  <p className="text-sm text-slate-500 mt-1">We&apos;ll WhatsApp you within 24 hours</p>
                </div>
                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 text-2xl">×</button>
              </div>

              {/* Budget Summary in Modal */}
              <div className="bg-pink-50 rounded-xl p-4 mb-6 border border-pink-100">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">{config.labels.totalCost}</span>
                  <span className="font-bold text-pink-600">RM {fmt(calculation.totalMin)} - RM {fmt(calculation.totalMax)}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-slate-500">{config.labels.netCost}</span>
                  <span className="font-bold text-slate-800">RM {fmt(Math.abs(calculation.netMax))}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                  <input type="text" required autoComplete="name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Enter your full name" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">WhatsApp Number *</label>
                  <input type="tel" required autoComplete="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+60123456789" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com (optional)" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Wedding Date (Month/Year)</label>
                  <input type="month" value={formData.weddingDate} onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Vendors</label>
                  <div className="grid grid-cols-2 gap-2">
                    {vendorOptions.map((v) => (
                      <label key={v} className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer text-sm transition-all ${formData.preferredVendors.includes(v) ? "border-pink-500 bg-pink-50" : "border-slate-200 bg-slate-50"}`}>
                        <input type="checkbox" checked={formData.preferredVendors.includes(v)} onChange={() => toggleVendor(v)} className="accent-pink-500" />
                        {v}
                      </label>
                    ))}
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all mt-2">
                  {isSubmitting ? "Submitting..." : config.cta.button}
                </button>
              </form>
              <p className="text-xs text-slate-400 text-center mt-4">By submitting, you agree to be contacted by our wedding partners.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
