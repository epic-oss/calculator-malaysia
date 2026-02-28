"use client";

import { useState, useMemo, useEffect } from "react";

// Fallback gold prices if API fails
const FALLBACK_PRICES = {
  999: { buy: 600, sell: 588 },
  916: { buy: 550, sell: 539 },
  875: { buy: 525, sell: 515 },
  750: { buy: 450, sell: 441 },
};

// Gold types for dropdown
const GOLD_TYPES = [
  { value: 999, label: "Emas 999 (24 Karat)", purity: 99.9 },
  { value: 916, label: "Emas 916 (22 Karat)", purity: 91.6 },
  { value: 875, label: "Emas 875 (21 Karat)", purity: 87.5 },
  { value: 750, label: "Emas 750 (18 Karat)", purity: 75.0 },
];

// Nisab for stored gold
const NISAB_EMAS_SIMPANAN = 85; // gram

// Nisab for silver
const NISAB_PERAK = 595; // gram
const DEFAULT_SILVER_PRICE = 3.5; // RM per gram

// Zakat rate
const ZAKAT_RATE = 0.025; // 2.5%

// Uruf by state (2026 rates)
const URUF_BY_STATE: Record<string, { uruf: number; fullAmount: boolean }> = {
  "Wilayah Persekutuan": { uruf: 800, fullAmount: false },
  "Selangor": { uruf: 800, fullAmount: false },
  "Johor": { uruf: 850, fullAmount: false },
  "Pulau Pinang": { uruf: 250, fullAmount: false },
  "Perak": { uruf: 500, fullAmount: false },
  "Kedah": { uruf: 150, fullAmount: true }, // Full amount if exceeds
  "Kelantan": { uruf: 200, fullAmount: false },
  "Terengganu": { uruf: 850, fullAmount: false },
  "Pahang": { uruf: 200, fullAmount: false },
  "Negeri Sembilan": { uruf: 200, fullAmount: false },
  "Melaka": { uruf: 200, fullAmount: false },
  "Sabah": { uruf: 250, fullAmount: false },
  "Sarawak": { uruf: 775, fullAmount: false },
  "Perlis": { uruf: 170, fullAmount: true }, // Full amount if exceeds
};

// USD to MYR exchange rate
const USD_TO_MYR = 4.45;
const GRAMS_PER_OZ = 31.1035;

interface GoldPrices {
  999: { buy: number; sell: number };
  916: { buy: number; sell: number };
  875: { buy: number; sell: number };
  750: { buy: number; sell: number };
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ms-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatCurrencyDecimal(amount: number): string {
  return new Intl.NumberFormat("ms-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatNumber(num: number, decimals: number = 2): string {
  return new Intl.NumberFormat("ms-MY", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export default function ZakatEmasCalculator() {
  const currentYear = new Date().getFullYear();
  // Live price state
  const [goldPrices, setGoldPrices] = useState<GoldPrices>(FALLBACK_PRICES);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>("Memuatkan...");
  const [priceSource, setPriceSource] = useState<"live" | "fallback">("fallback");

  // Active tab
  const [activeTab, setActiveTab] = useState<string>("simpanan");

  // Tab 1: Zakat Emas Simpanan
  const [simpananGoldType, setSimpananGoldType] = useState<number>(916);
  const [simpananWeight, setSimpananWeight] = useState<string>("100");
  const [simpananCustomPrice, setSimpananCustomPrice] = useState<string>("");
  const [simpananUseCustomPrice, setSimpananUseCustomPrice] = useState<boolean>(false);

  // Tab 2: Zakat Emas Perhiasan
  const [perhiasanState, setPerhiasanState] = useState<string>("Selangor");
  const [perhiasanGoldType, setPerhiasanGoldType] = useState<number>(916);
  const [perhiasanWeight, setPerhiasanWeight] = useState<string>("150");
  const [perhiasanCustomPrice, setPerhiasanCustomPrice] = useState<string>("");
  const [perhiasanUseCustomPrice, setPerhiasanUseCustomPrice] = useState<boolean>(false);

  // Tab 3: Zakat Perak
  const [silverWeight, setSilverWeight] = useState<string>("600");
  const [silverPrice, setSilverPrice] = useState<string>(String(DEFAULT_SILVER_PRICE));

  // Fetch live gold prices
  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch("https://api.metals.live/v1/spot/gold");
        const data = await response.json();

        const usdPerOz = data[0]?.price || 2650;
        const myrPerGram999 = (usdPerOz * USD_TO_MYR) / GRAMS_PER_OZ;

        const spreadPercent = 0.02;

        const newPrices: GoldPrices = {
          999: {
            buy: Math.round(myrPerGram999 * (1 + spreadPercent / 2)),
            sell: Math.round(myrPerGram999 * (1 - spreadPercent / 2)),
          },
          916: {
            buy: Math.round(myrPerGram999 * 0.916 * (1 + spreadPercent / 2)),
            sell: Math.round(myrPerGram999 * 0.916 * (1 - spreadPercent / 2)),
          },
          875: {
            buy: Math.round(myrPerGram999 * 0.875 * (1 + spreadPercent / 2)),
            sell: Math.round(myrPerGram999 * 0.875 * (1 - spreadPercent / 2)),
          },
          750: {
            buy: Math.round(myrPerGram999 * 0.75 * (1 + spreadPercent / 2)),
            sell: Math.round(myrPerGram999 * 0.75 * (1 - spreadPercent / 2)),
          },
        };

        setGoldPrices(newPrices);
        setLastUpdated(
          new Date().toLocaleString("ms-MY", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        setPriceSource("live");
      } catch (error) {
        console.error("Failed to fetch gold prices:", error);
        setGoldPrices(FALLBACK_PRICES);
        setLastUpdated("Harga anggaran");
        setPriceSource("fallback");
      }
      setLoading(false);
    };

    fetchGoldPrice();
  }, []);

  // Tab 1: Zakat Emas Simpanan calculations
  const simpananResults = useMemo(() => {
    const weight = parseFloat(simpananWeight) || 0;
    const pricePerGram = simpananUseCustomPrice && simpananCustomPrice
      ? parseFloat(simpananCustomPrice)
      : goldPrices[simpananGoldType as keyof GoldPrices]?.sell || 0;

    const totalValue = weight * pricePerGram;
    const nisabValue = NISAB_EMAS_SIMPANAN * pricePerGram;
    const isWajib = weight >= NISAB_EMAS_SIMPANAN;
    const zakatAmount = isWajib ? totalValue * ZAKAT_RATE : 0;
    const progressPercent = Math.min((weight / NISAB_EMAS_SIMPANAN) * 100, 100);

    return {
      weight,
      pricePerGram,
      totalValue,
      nisabValue,
      isWajib,
      zakatAmount,
      progressPercent,
    };
  }, [simpananWeight, simpananGoldType, simpananCustomPrice, simpananUseCustomPrice, goldPrices]);

  // Tab 2: Zakat Emas Perhiasan calculations
  const perhiasanResults = useMemo(() => {
    const weight = parseFloat(perhiasanWeight) || 0;
    const pricePerGram = perhiasanUseCustomPrice && perhiasanCustomPrice
      ? parseFloat(perhiasanCustomPrice)
      : goldPrices[perhiasanGoldType as keyof GoldPrices]?.sell || 0;

    const stateData = URUF_BY_STATE[perhiasanState] || { uruf: 800, fullAmount: false };
    const uruf = stateData.uruf;
    const useFullAmount = stateData.fullAmount;

    const totalValue = weight * pricePerGram;
    const urufValue = uruf * pricePerGram;
    const excessWeight = Math.max(0, weight - uruf);
    const isWajib = weight > uruf;

    let zakatAmount = 0;
    let zakatableValue = 0;

    if (isWajib) {
      if (useFullAmount) {
        // States like Kedah, Perlis - zakat on full amount
        zakatableValue = totalValue;
        zakatAmount = totalValue * ZAKAT_RATE;
      } else {
        // Most states - zakat only on excess
        zakatableValue = excessWeight * pricePerGram;
        zakatAmount = zakatableValue * ZAKAT_RATE;
      }
    }

    const progressPercent = Math.min((weight / uruf) * 100, 150);

    return {
      weight,
      pricePerGram,
      totalValue,
      uruf,
      urufValue,
      excessWeight,
      isWajib,
      zakatAmount,
      zakatableValue,
      useFullAmount,
      progressPercent,
    };
  }, [perhiasanWeight, perhiasanGoldType, perhiasanState, perhiasanCustomPrice, perhiasanUseCustomPrice, goldPrices]);

  // Tab 3: Zakat Perak calculations
  const silverResults = useMemo(() => {
    const weight = parseFloat(silverWeight) || 0;
    const pricePerGram = parseFloat(silverPrice) || DEFAULT_SILVER_PRICE;

    const totalValue = weight * pricePerGram;
    const nisabValue = NISAB_PERAK * pricePerGram;
    const isWajib = weight >= NISAB_PERAK;
    const zakatAmount = isWajib ? totalValue * ZAKAT_RATE : 0;
    const progressPercent = Math.min((weight / NISAB_PERAK) * 100, 100);

    return {
      weight,
      pricePerGram,
      totalValue,
      nisabValue,
      isWajib,
      zakatAmount,
      progressPercent,
    };
  }, [silverWeight, silverPrice]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>🕌</span>
            <span>Kalkulator Zakat Emas Malaysia {currentYear}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Kalkulator Zakat Emas Malaysia {currentYear}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Kira zakat emas simpanan dan perhiasan mengikut kadar uruf negeri. Nisab 85 gram, kadar 2.5%.
          </p>

          {/* Price Status Badge */}
          <div className="mt-4 inline-flex items-center gap-2">
            {loading ? (
              <div className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-sm">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Memuatkan harga emas...</span>
              </div>
            ) : priceSource === "live" ? (
              <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>Harga emas live • {lastUpdated}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                <span>{lastUpdated}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab("simpanan")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "simpanan"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200"
            }`}
          >
            🥇 Emas Simpanan
          </button>
          <button
            onClick={() => setActiveTab("perhiasan")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "perhiasan"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200"
            }`}
          >
            💍 Emas Perhiasan
          </button>
          <button
            onClick={() => setActiveTab("perak")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "perak"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200"
            }`}
          >
            🪙 Perak
          </button>
        </div>

        {/* Tab 1: Zakat Emas Simpanan */}
        {activeTab === "simpanan" && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Input Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🥇</span>
                Zakat Emas Simpanan
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Emas tidak dipakai: gold bar, jongkong, dinar, simpanan
              </p>

              <div className="space-y-5">
                {/* Gold Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Jenis Emas
                  </label>
                  <select
                    value={simpananGoldType}
                    onChange={(e) => {
                      setSimpananGoldType(parseInt(e.target.value));
                      setSimpananUseCustomPrice(false);
                      setSimpananCustomPrice("");
                    }}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  >
                    {GOLD_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Berat Emas (gram)
                  </label>
                  <input
                    type="number"
                    value={simpananWeight}
                    onChange={(e) => setSimpananWeight(e.target.value)}
                    placeholder="Masukkan berat"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Price Per Gram */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Harga Emas Semasa (RM/gram)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">RM</span>
                    <input
                      type="number"
                      value={simpananUseCustomPrice ? simpananCustomPrice : goldPrices[simpananGoldType as keyof GoldPrices]?.sell || ""}
                      onChange={(e) => {
                        setSimpananCustomPrice(e.target.value);
                        setSimpananUseCustomPrice(true);
                      }}
                      placeholder="Harga per gram"
                      className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {loading ? "Memuatkan harga..." : "Harga auto dari pasaran. Edit jika perlu."}
                  </p>
                </div>

                {/* Nisab Info */}
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <p className="text-sm text-emerald-800">
                    <strong>📋 Nisab Emas Simpanan:</strong> {NISAB_EMAS_SIMPANAN} gram<br />
                    <strong>Kadar Zakat:</strong> 2.5% daripada nilai emas
                  </p>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Status Card */}
              <div className={`rounded-2xl shadow-xl p-6 text-white ${
                simpananResults.isWajib
                  ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
                  : "bg-gradient-to-br from-slate-400 to-slate-500"
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{simpananResults.isWajib ? "✅" : "❌"}</span>
                  <div>
                    <h3 className="text-lg font-bold">
                      {simpananResults.isWajib ? "Wajib Zakat" : "Tidak Wajib Zakat"}
                    </h3>
                    <p className="text-sm opacity-90">
                      {simpananResults.isWajib
                        ? "Emas anda melebihi nisab 85 gram"
                        : `Emas anda belum mencapai nisab 85 gram`}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Berat: {formatNumber(simpananResults.weight, 1)}g</span>
                    <span>Nisab: {NISAB_EMAS_SIMPANAN}g</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        simpananResults.isWajib ? "bg-white" : "bg-white/60"
                      }`}
                      style={{ width: `${simpananResults.progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {simpananResults.isWajib && (
                  <div className="pt-4 border-t border-white/30">
                    <p className="text-sm opacity-90 mb-1">Jumlah Zakat</p>
                    <p className="text-3xl md:text-4xl font-bold">
                      {formatCurrencyDecimal(simpananResults.zakatAmount)}
                    </p>
                  </div>
                )}
              </div>

              {/* Wasiat & Hibah CTA - Only show when Wajib Zakat */}
              {simpananResults.isWajib && (
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-lg p-6 border border-amber-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Sudah ada perancangan harta Islam?
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Lindungi harta dan keluarga anda dengan Wasiat & Hibah yang sah mengikut syariah.
                  </p>
                  <a
                    href="https://wasiat.com.my?ref=calculatormy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Dapatkan konsultasi Wasiat & Hibah PERCUMA
                    <span>→</span>
                  </a>
                </div>
              )}

              {/* Breakdown */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">📋 Pecahan</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Berat Emas</span>
                    <span className="font-semibold text-slate-900">{formatNumber(simpananResults.weight, 1)} gram</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Harga Emas</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(simpananResults.pricePerGram)}/gram</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Nilai Emas</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(simpananResults.totalValue)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Nisab Semasa</span>
                    <span className="font-semibold text-slate-900">{NISAB_EMAS_SIMPANAN}g ({formatCurrency(simpananResults.nisabValue)})</span>
                  </div>
                  {simpananResults.isWajib && (
                    <div className="flex justify-between items-center py-2 bg-emerald-50 rounded-lg px-3">
                      <span className="text-emerald-700 font-medium">Zakat (2.5%)</span>
                      <span className="font-bold text-emerald-700">{formatCurrencyDecimal(simpananResults.zakatAmount)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Zakat Emas Perhiasan */}
        {activeTab === "perhiasan" && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Input Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">💍</span>
                Zakat Emas Perhiasan
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Emas dipakai: rantai, gelang, cincin, subang
              </p>

              <div className="space-y-5">
                {/* State Selection */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Negeri
                  </label>
                  <select
                    value={perhiasanState}
                    onChange={(e) => setPerhiasanState(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  >
                    {Object.keys(URUF_BY_STATE).map((state) => (
                      <option key={state} value={state}>
                        {state} (Uruf: {URUF_BY_STATE[state].uruf}g)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gold Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Jenis Emas
                  </label>
                  <select
                    value={perhiasanGoldType}
                    onChange={(e) => {
                      setPerhiasanGoldType(parseInt(e.target.value));
                      setPerhiasanUseCustomPrice(false);
                      setPerhiasanCustomPrice("");
                    }}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  >
                    {GOLD_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Berat Emas Perhiasan (gram)
                  </label>
                  <input
                    type="number"
                    value={perhiasanWeight}
                    onChange={(e) => setPerhiasanWeight(e.target.value)}
                    placeholder="Masukkan berat"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Price Per Gram */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Harga Emas Semasa (RM/gram)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">RM</span>
                    <input
                      type="number"
                      value={perhiasanUseCustomPrice ? perhiasanCustomPrice : goldPrices[perhiasanGoldType as keyof GoldPrices]?.sell || ""}
                      onChange={(e) => {
                        setPerhiasanCustomPrice(e.target.value);
                        setPerhiasanUseCustomPrice(true);
                      }}
                      placeholder="Harga per gram"
                      className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Uruf Info */}
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>📋 Uruf {perhiasanState}:</strong> {URUF_BY_STATE[perhiasanState]?.uruf || 0} gram<br />
                    {URUF_BY_STATE[perhiasanState]?.fullAmount ? (
                      <span className="text-red-600">⚠️ Zakat dikira atas SEMUA nilai jika melebihi uruf</span>
                    ) : (
                      <span>Zakat dikira atas nilai MELEBIHI uruf sahaja</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Status Card */}
              <div className={`rounded-2xl shadow-xl p-6 text-white ${
                perhiasanResults.isWajib
                  ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
                  : "bg-gradient-to-br from-slate-400 to-slate-500"
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{perhiasanResults.isWajib ? "✅" : "❌"}</span>
                  <div>
                    <h3 className="text-lg font-bold">
                      {perhiasanResults.isWajib ? "Wajib Zakat" : "Tidak Wajib Zakat"}
                    </h3>
                    <p className="text-sm opacity-90">
                      {perhiasanResults.isWajib
                        ? `Melebihi uruf ${perhiasanState} sebanyak ${formatNumber(perhiasanResults.excessWeight, 1)}g`
                        : `Emas anda dalam had uruf ${perhiasanState} (${perhiasanResults.uruf}g)`}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Berat: {formatNumber(perhiasanResults.weight, 1)}g</span>
                    <span>Uruf: {perhiasanResults.uruf}g</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        perhiasanResults.isWajib ? "bg-white" : "bg-white/60"
                      }`}
                      style={{ width: `${Math.min(perhiasanResults.progressPercent, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {perhiasanResults.isWajib && (
                  <div className="pt-4 border-t border-white/30">
                    <p className="text-sm opacity-90 mb-1">Jumlah Zakat</p>
                    <p className="text-3xl md:text-4xl font-bold">
                      {formatCurrencyDecimal(perhiasanResults.zakatAmount)}
                    </p>
                  </div>
                )}
              </div>

              {/* Wasiat & Hibah CTA - Only show when Wajib Zakat */}
              {perhiasanResults.isWajib && (
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-lg p-6 border border-amber-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Sudah ada perancangan harta Islam?
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Lindungi harta dan keluarga anda dengan Wasiat & Hibah yang sah mengikut syariah.
                  </p>
                  <a
                    href="https://wasiat.com.my?ref=calculatormy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Dapatkan konsultasi Wasiat & Hibah PERCUMA
                    <span>→</span>
                  </a>
                </div>
              )}

              {/* Breakdown */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">📋 Pecahan</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Berat Perhiasan</span>
                    <span className="font-semibold text-slate-900">{formatNumber(perhiasanResults.weight, 1)} gram</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Nilai Perhiasan</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(perhiasanResults.totalValue)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Uruf {perhiasanState}</span>
                    <span className="font-semibold text-slate-900">{perhiasanResults.uruf}g ({formatCurrency(perhiasanResults.urufValue)})</span>
                  </div>
                  {perhiasanResults.isWajib && (
                    <>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-slate-600">Berat Melebihi Uruf</span>
                        <span className="font-semibold text-amber-600">{formatNumber(perhiasanResults.excessWeight, 1)} gram</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-slate-600">
                          {perhiasanResults.useFullAmount ? "Nilai Kena Zakat (Semua)" : "Nilai Melebihi Uruf"}
                        </span>
                        <span className="font-semibold text-slate-900">{formatCurrency(perhiasanResults.zakatableValue)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 bg-emerald-50 rounded-lg px-3">
                        <span className="text-emerald-700 font-medium">Zakat (2.5%)</span>
                        <span className="font-bold text-emerald-700">{formatCurrencyDecimal(perhiasanResults.zakatAmount)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Zakat Perak */}
        {activeTab === "perak" && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Input Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🪙</span>
                Zakat Perak
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Perak simpanan dan perhiasan
              </p>

              <div className="space-y-5">
                {/* Weight */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Berat Perak (gram)
                  </label>
                  <input
                    type="number"
                    value={silverWeight}
                    onChange={(e) => setSilverWeight(e.target.value)}
                    placeholder="Masukkan berat"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Price Per Gram */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Harga Perak Semasa (RM/gram)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">RM</span>
                    <input
                      type="number"
                      value={silverPrice}
                      onChange={(e) => setSilverPrice(e.target.value)}
                      placeholder="Harga per gram"
                      className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Harga anggaran: RM 3.50/gram. Edit mengikut harga semasa.
                  </p>
                </div>

                {/* Nisab Info */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <p className="text-sm text-slate-700">
                    <strong>📋 Nisab Perak:</strong> {NISAB_PERAK} gram<br />
                    <strong>Kadar Zakat:</strong> 2.5% daripada nilai perak
                  </p>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Status Card */}
              <div className={`rounded-2xl shadow-xl p-6 text-white ${
                silverResults.isWajib
                  ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
                  : "bg-gradient-to-br from-slate-400 to-slate-500"
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{silverResults.isWajib ? "✅" : "❌"}</span>
                  <div>
                    <h3 className="text-lg font-bold">
                      {silverResults.isWajib ? "Wajib Zakat" : "Tidak Wajib Zakat"}
                    </h3>
                    <p className="text-sm opacity-90">
                      {silverResults.isWajib
                        ? "Perak anda melebihi nisab 595 gram"
                        : `Perak anda belum mencapai nisab 595 gram`}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Berat: {formatNumber(silverResults.weight, 1)}g</span>
                    <span>Nisab: {NISAB_PERAK}g</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        silverResults.isWajib ? "bg-white" : "bg-white/60"
                      }`}
                      style={{ width: `${silverResults.progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {silverResults.isWajib && (
                  <div className="pt-4 border-t border-white/30">
                    <p className="text-sm opacity-90 mb-1">Jumlah Zakat</p>
                    <p className="text-3xl md:text-4xl font-bold">
                      {formatCurrencyDecimal(silverResults.zakatAmount)}
                    </p>
                  </div>
                )}
              </div>

              {/* Wasiat & Hibah CTA - Only show when Wajib Zakat */}
              {silverResults.isWajib && (
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-lg p-6 border border-amber-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Sudah ada perancangan harta Islam?
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Lindungi harta dan keluarga anda dengan Wasiat & Hibah yang sah mengikut syariah.
                  </p>
                  <a
                    href="https://wasiat.com.my?ref=calculatormy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Dapatkan konsultasi Wasiat & Hibah PERCUMA
                    <span>→</span>
                  </a>
                </div>
              )}

              {/* Breakdown */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">📋 Pecahan</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Berat Perak</span>
                    <span className="font-semibold text-slate-900">{formatNumber(silverResults.weight, 1)} gram</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Harga Perak</span>
                    <span className="font-semibold text-slate-900">{formatCurrencyDecimal(silverResults.pricePerGram)}/gram</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Nilai Perak</span>
                    <span className="font-semibold text-slate-900">{formatCurrencyDecimal(silverResults.totalValue)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Nisab Semasa</span>
                    <span className="font-semibold text-slate-900">{NISAB_PERAK}g ({formatCurrencyDecimal(silverResults.nisabValue)})</span>
                  </div>
                  {silverResults.isWajib && (
                    <div className="flex justify-between items-center py-2 bg-emerald-50 rounded-lg px-3">
                      <span className="text-emerald-700 font-medium">Zakat (2.5%)</span>
                      <span className="font-bold text-emerald-700">{formatCurrencyDecimal(silverResults.zakatAmount)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Uruf Reference Table */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">📊 Kadar Uruf Mengikut Negeri 2026</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-2 font-bold text-slate-700">Negeri</th>
                  <th className="text-center py-3 px-2 font-bold text-slate-700">Uruf (gram)</th>
                  <th className="text-left py-3 px-2 font-bold text-slate-700">Cara Pengiraan</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(URUF_BY_STATE).map(([state, data]) => (
                  <tr key={state} className="border-b border-slate-100 hover:bg-emerald-50 transition-colors">
                    <td className="py-3 px-2 font-medium">{state}</td>
                    <td className="py-3 px-2 text-center">{data.uruf}g</td>
                    <td className="py-3 px-2 text-slate-600">
                      {data.fullAmount ? (
                        <span className="text-amber-600">Semua nilai jika melebihi uruf</span>
                      ) : (
                        <span>Nilai melebihi uruf sahaja</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            * Uruf adalah had pemakaian emas yang dibenarkan tanpa dikenakan zakat. Sila semak dengan pusat zakat negeri untuk maklumat terkini.
          </p>
        </div>

        {/* Pay Zakat CTA */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white mb-12">
          <div className="flex items-start gap-4">
            <span className="text-4xl">🕌</span>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">Bayar Zakat Emas Sekarang</h2>
              <p className="text-emerald-100 mb-4">
                Tunaikan zakat anda melalui portal rasmi negeri untuk memastikan agihan yang amanah.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.zakatselangor.com.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-emerald-700 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
                >
                  Zakat Selangor →
                </a>
                <a
                  href="https://www.zakat.com.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors"
                >
                  PPZ Wilayah →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="space-y-8">
          {/* What is Zakat Emas */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Apa Itu Zakat Emas?</h2>
            <p className="text-slate-600 mb-4">
              Zakat emas adalah zakat yang wajib dikeluarkan ke atas emas yang dimiliki apabila cukup nisab (85 gram untuk emas simpanan) dan haul (setahun). Kadar zakat adalah 2.5% daripada nilai emas.
            </p>
          </div>

          {/* Syarat Wajib */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Syarat Wajib Zakat Emas</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold">1.</span>
                <div>
                  <span className="font-semibold text-slate-900">Islam</span>
                  <span className="text-slate-600"> - Pemilik emas beragama Islam</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold">2.</span>
                <div>
                  <span className="font-semibold text-slate-900">Milik Sempurna</span>
                  <span className="text-slate-600"> - Emas dimiliki sepenuhnya</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold">3.</span>
                <div>
                  <span className="font-semibold text-slate-900">Cukup Nisab</span>
                  <span className="text-slate-600"> - Mencapai 85 gram (emas simpanan)</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold">4.</span>
                <div>
                  <span className="font-semibold text-slate-900">Cukup Haul</span>
                  <span className="text-slate-600"> - Dimiliki selama setahun Hijrah (354 hari)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Types of Gold */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Jenis Emas Yang Wajib Zakat</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <h3 className="font-bold text-slate-900 mb-2">🥇 Emas Simpanan (Tidak Dipakai)</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Gold bar, jongkong emas, dinar</li>
                  <li>• Emas perhiasan yang tidak dipakai langsung</li>
                  <li>• Nisab: <strong>85 gram</strong></li>
                  <li>• Zakat: 2.5% atas <strong>SEMUA</strong> nilai</li>
                </ul>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <h3 className="font-bold text-slate-900 mb-2">💍 Emas Perhiasan (Dipakai)</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Rantai, gelang, cincin yang dipakai</li>
                  <li>• Nisab: <strong>Mengikut uruf negeri</strong></li>
                  <li>• Zakat: 2.5% atas nilai <strong>MELEBIHI</strong> uruf</li>
                  <li>• Beberapa negeri kira atas semua nilai</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Calculation Formula */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Cara Kira Zakat Emas</h2>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-mono text-slate-700 mb-2">
                  <strong>Formula Emas Simpanan:</strong>
                </p>
                <p className="font-mono text-emerald-700">
                  Zakat = Berat Emas × Harga Semasa × 2.5%
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-mono text-slate-700 mb-2">
                  <strong>Formula Emas Perhiasan:</strong>
                </p>
                <p className="font-mono text-emerald-700">
                  Zakat = (Berat Emas - Uruf) × Harga Semasa × 2.5%
                </p>
              </div>
            </div>
          </div>

          {/* When to Pay */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Bila Perlu Bayar Zakat Emas?</h2>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">✓</span>
                <span>Selepas cukup haul (1 tahun pemilikan)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">✓</span>
                <span>Boleh bayar bila-bila masa dalam tahun tersebut</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">✓</span>
                <span>Ramai bayar semasa Ramadan untuk gandakan pahala</span>
              </li>
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Soalan Lazim (FAQ)</h2>
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">Berapa nisab zakat emas 2026?</h3>
                <p className="text-slate-600">
                  Nisab emas simpanan adalah 85 gram. Untuk emas perhiasan, ia bergantung kepada uruf negeri masing-masing.
                </p>
              </div>
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">Apa itu uruf dalam zakat emas?</h3>
                <p className="text-slate-600">
                  Uruf adalah kadar pemakaian emas yang dibenarkan tanpa dikenakan zakat. Ia berbeza mengikut negeri, contohnya 800g di Selangor dan 150g di Kedah.
                </p>
              </div>
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">Adakah emas 916 kena zakat?</h3>
                <p className="text-slate-600">
                  Ya, semua jenis emas (999, 916, 750) wajib zakat jika cukup nisab dan haul.
                </p>
              </div>
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">Bagaimana kira zakat emas akaun simpanan (GAP/GIA)?</h3>
                <p className="text-slate-600">
                  Jika akaun emas adalah fizikal (boleh dikeluarkan), kira seperti emas simpanan dengan nisab 85 gram.
                </p>
              </div>
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">Bolehkah bayar zakat emas secara online?</h3>
                <p className="text-slate-600">
                  Ya, setiap negeri ada portal zakat online. Contoh: zakatselangor.com.my, zakat.com.my (PPZ).
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Bila waktu terbaik bayar zakat emas?</h3>
                <p className="text-slate-600">
                  Boleh bayar bila-bila masa selepas cukup haul. Ramai pilih Ramadan untuk gandakan ganjaran.
                </p>
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4">🔗 Kalkulator Berkaitan</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href="/investment/gold-price-calculator-malaysia/"
                className="block p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                <span className="text-2xl mb-2 block">🥇</span>
                <span className="font-medium">Kalkulator Harga Emas</span>
              </a>
              <a
                href="/investment/kalkulator-dividen-asb-malaysia/"
                className="block p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                <span className="text-2xl mb-2 block">📈</span>
                <span className="font-medium">Kalkulator Dividen ASB</span>
              </a>
              <a
                href="/"
                className="block p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                <span className="text-2xl mb-2 block">🧮</span>
                <span className="font-medium">Semua Kalkulator</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
