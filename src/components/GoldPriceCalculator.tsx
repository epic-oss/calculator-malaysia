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
  { value: 999, label: "Emas 999 (24 Karat) - Emas tulen", purity: 99.9 },
  { value: 916, label: "Emas 916 (22 Karat) - Paling popular", purity: 91.6 },
  { value: 875, label: "Emas 875 (21 Karat)", purity: 87.5 },
  { value: 750, label: "Emas 750 (18 Karat)", purity: 75.0 },
];

// Weight unit conversions
const WEIGHT_UNITS = {
  gram: { label: "Gram", toGram: 1 },
  tael: { label: "Tael / Tahil", toGram: 37.799 },
  tola: { label: "Tola", toGram: 11.664 },
  oz: { label: "Ounce (oz)", toGram: 31.1035 },
};

// Popular gold shops
const GOLD_SHOPS = [
  "Habib Jewels",
  "Poh Kong",
  "Tomei",
  "Public Gold",
  "Kedai Emas 916",
  "De Aurora",
];

// USD to MYR exchange rate (update periodically)
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

function formatNumber(num: number, decimals: number = 2): string {
  return new Intl.NumberFormat("ms-MY", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export default function GoldPriceCalculator() {
  const currentYear = new Date().getFullYear();
  // Live price state
  const [goldPrices, setGoldPrices] = useState<GoldPrices>(FALLBACK_PRICES);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>("Memuatkan...");
  const [priceSource, setPriceSource] = useState<"live" | "fallback">("fallback");

  // Calculator 1: Gold Value Calculator
  const [goldType, setGoldType] = useState<number>(916);
  const [weight, setWeight] = useState<string>("10");
  const [weightUnit, setWeightUnit] = useState<string>("gram");
  const [customPrice, setCustomPrice] = useState<string>("");
  const [useCustomPrice, setUseCustomPrice] = useState<boolean>(false);

  // Calculator 2: Buy vs Sell
  const [buyGoldType, setBuyGoldType] = useState<number>(916);
  const [buyWeight, setBuyWeight] = useState<string>("10");
  const [buyPrice, setBuyPrice] = useState<string>("520");
  const [currentSellPrice, setCurrentSellPrice] = useState<string>("539");

  // Calculator 3: Purity Converter
  const [converterWeight, setConverterWeight] = useState<string>("10");
  const [fromPurity, setFromPurity] = useState<number>(916);
  const [toPurity, setToPurity] = useState<number>(999);

  // Active tab
  const [activeTab, setActiveTab] = useState<string>("value");

  // Fetch live gold prices
  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        // Fetch from metals.live (free, no API key)
        const response = await fetch("https://api.metals.live/v1/spot/gold");
        const data = await response.json();

        // Price comes in USD per oz, convert to MYR per gram
        const usdPerOz = data[0]?.price || 2650; // fallback value
        const myrPerGram999 = (usdPerOz * USD_TO_MYR) / GRAMS_PER_OZ;

        // Calculate prices for different purities
        // Buy price is slightly higher (what shops charge you)
        // Sell price is what shops pay you (slightly lower)
        const spreadPercent = 0.02; // 2% spread

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

        // Update the sell price field for Calculator 2
        setCurrentSellPrice(String(newPrices[916].sell));
      } catch (error) {
        // Fallback to static prices if API fails
        console.error("Failed to fetch gold prices:", error);
        setGoldPrices(FALLBACK_PRICES);
        setLastUpdated("Harga anggaran");
        setPriceSource("fallback");
        setCurrentSellPrice(String(FALLBACK_PRICES[916].sell));
      }
      setLoading(false);
    };

    fetchGoldPrice();
  }, []);

  // Calculator 1: Gold Value calculations
  const valueResults = useMemo(() => {
    const weightNum = parseFloat(weight) || 0;
    const conversionFactor = WEIGHT_UNITS[weightUnit as keyof typeof WEIGHT_UNITS]?.toGram || 1;
    const weightInGrams = weightNum * conversionFactor;

    const pricePerGram = useCustomPrice && customPrice
      ? parseFloat(customPrice)
      : goldPrices[goldType as keyof GoldPrices]?.sell || 0;

    const goldTypeInfo = GOLD_TYPES.find(t => t.value === goldType);
    const purity = goldTypeInfo?.purity || 0;

    const totalValue = weightInGrams * pricePerGram;

    return {
      weightInGrams,
      pricePerGram,
      purity,
      totalValue,
    };
  }, [goldType, weight, weightUnit, customPrice, useCustomPrice, goldPrices]);

  // Calculator 2: Buy vs Sell calculations
  const buySellResults = useMemo(() => {
    const weightNum = parseFloat(buyWeight) || 0;
    const buyPriceNum = parseFloat(buyPrice) || 0;
    const sellPriceNum = parseFloat(currentSellPrice) || 0;

    const purchaseCost = weightNum * buyPriceNum;
    const currentValue = weightNum * sellPriceNum;
    const profitLoss = currentValue - purchaseCost;
    const returnPercent = purchaseCost > 0 ? (profitLoss / purchaseCost) * 100 : 0;

    return {
      purchaseCost,
      currentValue,
      profitLoss,
      returnPercent,
    };
  }, [buyWeight, buyPrice, currentSellPrice]);

  // Calculator 3: Purity Converter calculations
  const converterResults = useMemo(() => {
    const weightNum = parseFloat(converterWeight) || 0;
    const fromPurityPercent = GOLD_TYPES.find(t => t.value === fromPurity)?.purity || 0;
    const toPurityPercent = GOLD_TYPES.find(t => t.value === toPurity)?.purity || 0;

    const pureGoldWeight = weightNum * (fromPurityPercent / 100);
    const equivalentWeight = toPurityPercent > 0 ? pureGoldWeight / (toPurityPercent / 100) : 0;

    return {
      pureGoldWeight,
      equivalentWeight,
      fromPurityPercent,
      toPurityPercent,
    };
  }, [converterWeight, fromPurity, toPurity]);

  // Quick reference table data
  const quickReferenceData = [
    { weight: 1, label: "1g" },
    { weight: 5, label: "5g" },
    { weight: 10, label: "10g" },
    { weight: 37.799, label: "1 tael" },
    { weight: 100, label: "100g" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>🥇</span>
            <span>Kalkulator Emas Malaysia {currentYear}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Kalkulator Harga Emas Malaysia
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Kira nilai emas 916 dan 999 berdasarkan harga semasa. Semak harga emas hari ini.
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
                <span>Harga pasaran dunia • Dikemaskini: {lastUpdated}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                <span>{lastUpdated}</span>
              </div>
            )}
          </div>

          {priceSource === "fallback" && !loading && (
            <p className="text-xs text-slate-500 mt-2">
              Harga anggaran. Sila masukkan harga dari kedai emas anda.
            </p>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab("value")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "value"
                ? "bg-amber-600 text-white shadow-lg"
                : "bg-white text-slate-600 hover:bg-amber-50 border border-slate-200"
            }`}
          >
            💰 Kira Nilai Emas
          </button>
          <button
            onClick={() => setActiveTab("buysell")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "buysell"
                ? "bg-amber-600 text-white shadow-lg"
                : "bg-white text-slate-600 hover:bg-amber-50 border border-slate-200"
            }`}
          >
            📊 Untung / Rugi
          </button>
          <button
            onClick={() => setActiveTab("converter")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "converter"
                ? "bg-amber-600 text-white shadow-lg"
                : "bg-white text-slate-600 hover:bg-amber-50 border border-slate-200"
            }`}
          >
            🔄 Tukar Ketulenan
          </button>
        </div>

        {/* Calculator 1: Gold Value Calculator */}
        {activeTab === "value" && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Input Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Kira Nilai Emas Anda
              </h2>

              <div className="space-y-5">
                {/* Gold Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Jenis Emas
                  </label>
                  <select
                    value={goldType}
                    onChange={(e) => {
                      setGoldType(parseInt(e.target.value));
                      setUseCustomPrice(false);
                      setCustomPrice("");
                    }}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  >
                    {GOLD_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Weight with Unit Toggle */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Berat Emas
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Masukkan berat"
                      className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      min="0"
                      step="0.01"
                    />
                    <select
                      value={weightUnit}
                      onChange={(e) => setWeightUnit(e.target.value)}
                      className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                    >
                      {Object.entries(WEIGHT_UNITS).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Per Gram */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Harga Semasa (RM/gram)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">RM</span>
                    <input
                      type="number"
                      value={useCustomPrice ? customPrice : goldPrices[goldType as keyof GoldPrices]?.sell || ""}
                      onChange={(e) => {
                        setCustomPrice(e.target.value);
                        setUseCustomPrice(true);
                      }}
                      placeholder="Harga per gram"
                      className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {loading ? "Memuatkan harga..." : "Harga dikemaskini secara automatik dari pasaran dunia"}
                  </p>
                </div>

                {/* Info Box */}
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>💡 Tip:</strong> Harga pasaran dunia. Harga kedai mungkin berbeza RM 5-15 per gram.
                  </p>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Main Value Card */}
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-lg font-medium text-amber-100 mb-2">Nilai Emas Anda</h3>
                <div className="text-4xl md:text-5xl font-bold mb-4">
                  {loading ? (
                    <span className="opacity-50">Memuatkan...</span>
                  ) : (
                    formatCurrency(valueResults.totalValue)
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-amber-400/30">
                  <div>
                    <div className="text-amber-200 text-xs mb-1">Berat</div>
                    <div className="font-semibold">{formatNumber(valueResults.weightInGrams)} g</div>
                  </div>
                  <div>
                    <div className="text-amber-200 text-xs mb-1">Ketulenan</div>
                    <div className="font-semibold">{valueResults.purity}%</div>
                  </div>
                  <div>
                    <div className="text-amber-200 text-xs mb-1">Harga/gram</div>
                    <div className="font-semibold">{formatCurrency(valueResults.pricePerGram)}</div>
                  </div>
                </div>
              </div>

              {/* Price Reference */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900">📋 Harga Emas Semasa</h3>
                  {priceSource === "live" && (
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                      Live
                    </span>
                  )}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 font-semibold text-slate-700">Jenis</th>
                        <th className="text-right py-2 font-semibold text-slate-700">Beli</th>
                        <th className="text-right py-2 font-semibold text-slate-700">Jual</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={3} className="py-4 text-center text-slate-500">
                            <div className="flex items-center justify-center gap-2">
                              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Memuatkan...
                            </div>
                          </td>
                        </tr>
                      ) : (
                        GOLD_TYPES.map((type) => (
                          <tr key={type.value} className={`border-b border-slate-100 ${goldType === type.value ? "bg-amber-50" : ""}`}>
                            <td className="py-2 font-medium">{type.value} ({type.purity}%)</td>
                            <td className="py-2 text-right text-slate-600">
                              {formatCurrency(goldPrices[type.value as keyof GoldPrices]?.buy || 0)}
                            </td>
                            <td className="py-2 text-right text-slate-600">
                              {formatCurrency(goldPrices[type.value as keyof GoldPrices]?.sell || 0)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  * Harga per gram. {priceSource === "live" ? `Dikemaskini: ${lastUpdated}` : lastUpdated}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Calculator 2: Buy vs Sell */}
        {activeTab === "buysell" && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Input Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Kira Untung / Rugi
              </h2>

              <div className="space-y-5">
                {/* Gold Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Jenis Emas
                  </label>
                  <select
                    value={buyGoldType}
                    onChange={(e) => {
                      const type = parseInt(e.target.value);
                      setBuyGoldType(type);
                      setCurrentSellPrice(String(goldPrices[type as keyof GoldPrices]?.sell || 0));
                    }}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
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
                    Berat (gram)
                  </label>
                  <input
                    type="number"
                    value={buyWeight}
                    onChange={(e) => setBuyWeight(e.target.value)}
                    placeholder="Masukkan berat"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Buy Price */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Harga Beli Anda (RM/gram)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">RM</span>
                    <input
                      type="number"
                      value={buyPrice}
                      onChange={(e) => setBuyPrice(e.target.value)}
                      placeholder="Harga waktu beli"
                      className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Harga per gram yang anda bayar
                  </p>
                </div>

                {/* Current Sell Price */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Harga Jual Semasa (RM/gram)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">RM</span>
                    <input
                      type="number"
                      value={currentSellPrice}
                      onChange={(e) => setCurrentSellPrice(e.target.value)}
                      placeholder="Harga jual hari ini"
                      className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {loading ? "Memuatkan harga..." : "Harga dikemaskini secara automatik dari pasaran dunia"}
                  </p>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Profit/Loss Card */}
              <div className={`rounded-2xl shadow-xl p-6 text-white ${
                buySellResults.profitLoss >= 0
                  ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
                  : "bg-gradient-to-br from-red-500 to-red-600"
              }`}>
                <h3 className="text-lg font-medium opacity-90 mb-2">
                  {buySellResults.profitLoss >= 0 ? "Keuntungan" : "Kerugian"}
                </h3>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {buySellResults.profitLoss >= 0 ? "+" : ""}{formatCurrency(buySellResults.profitLoss)}
                </div>
                <div className="text-2xl font-semibold opacity-90">
                  {buySellResults.profitLoss >= 0 ? "+" : ""}{formatNumber(buySellResults.returnPercent)}%
                </div>
              </div>

              {/* Breakdown */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">📋 Pecahan</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">Kos Belian</span>
                    <span className="font-bold text-slate-900">{formatCurrency(buySellResults.purchaseCost)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">Nilai Semasa</span>
                    <span className="font-bold text-slate-900">{formatCurrency(buySellResults.currentValue)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-600 font-medium">Untung/Rugi</span>
                    <span className={`font-bold text-lg ${
                      buySellResults.profitLoss >= 0 ? "text-emerald-600" : "text-red-600"
                    }`}>
                      {buySellResults.profitLoss >= 0 ? "+" : ""}{formatCurrency(buySellResults.profitLoss)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Calculator 3: Purity Converter */}
        {activeTab === "converter" && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Input Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">🔄</span>
                Tukar Ketulenan Emas
              </h2>

              <div className="space-y-5">
                {/* Weight */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Berat Emas (gram)
                  </label>
                  <input
                    type="number"
                    value={converterWeight}
                    onChange={(e) => setConverterWeight(e.target.value)}
                    placeholder="Masukkan berat"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* From Purity */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Ketulenan Asal
                  </label>
                  <select
                    value={fromPurity}
                    onChange={(e) => setFromPurity(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  >
                    {GOLD_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.value} ({type.purity}%)
                      </option>
                    ))}
                  </select>
                </div>

                {/* To Purity */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Tukar Kepada
                  </label>
                  <select
                    value={toPurity}
                    onChange={(e) => setToPurity(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  >
                    {GOLD_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.value} ({type.purity}%)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Conversion Result */}
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-lg font-medium text-amber-100 mb-2">Berat Setara</h3>
                <div className="text-4xl md:text-5xl font-bold mb-4">
                  {formatNumber(converterResults.equivalentWeight)} gram
                </div>
                <div className="text-amber-100">
                  Emas {toPurity} ({converterResults.toPurityPercent}%)
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">📋 Penjelasan</h3>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-slate-700">
                    <strong>{formatNumber(parseFloat(converterWeight) || 0)}g emas {fromPurity}</strong> mengandungi <strong>{formatNumber(converterResults.pureGoldWeight)}g emas tulen</strong>.
                  </p>
                  <p className="text-slate-700 mt-2">
                    Ini bersamaan dengan <strong>{formatNumber(converterResults.equivalentWeight)}g emas {toPurity}</strong>.
                  </p>
                </div>
                <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>💡 Formula:</strong><br />
                    Emas tulen = Berat × (Ketulenan / 100)<br />
                    Berat setara = Emas tulen / (Ketulenan sasaran / 100)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Reference Table */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">📊 Jadual Rujukan Pantas</h2>
            {priceSource === "live" && !loading && (
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                Harga Live
              </span>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-2 font-bold text-slate-700">Berat</th>
                  <th className="text-right py-3 px-2 font-bold text-amber-600">Emas 999</th>
                  <th className="text-right py-3 px-2 font-bold text-amber-600">Emas 916</th>
                  <th className="text-right py-3 px-2 font-bold text-amber-600">Emas 875</th>
                  <th className="text-right py-3 px-2 font-bold text-amber-600">Emas 750</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Memuatkan harga...
                      </div>
                    </td>
                  </tr>
                ) : (
                  quickReferenceData.map((row) => (
                    <tr key={row.label} className="border-b border-slate-100 hover:bg-amber-50 transition-colors">
                      <td className="py-3 px-2 font-medium text-slate-900">{row.label}</td>
                      <td className="py-3 px-2 text-right text-slate-600">
                        {formatCurrency(row.weight * (goldPrices[999]?.sell || 0))}
                      </td>
                      <td className="py-3 px-2 text-right text-slate-600">
                        {formatCurrency(row.weight * (goldPrices[916]?.sell || 0))}
                      </td>
                      <td className="py-3 px-2 text-right text-slate-600">
                        {formatCurrency(row.weight * (goldPrices[875]?.sell || 0))}
                      </td>
                      <td className="py-3 px-2 text-right text-slate-600">
                        {formatCurrency(row.weight * (goldPrices[750]?.sell || 0))}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            * Harga berdasarkan harga jual semasa. {priceSource === "live" ? `Dikemaskini: ${lastUpdated}` : lastUpdated}
          </p>
        </div>

        {/* Gold Shops Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">🏪 Kedai Emas Popular di Malaysia</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {GOLD_SHOPS.map((shop) => (
              <div key={shop} className="bg-amber-50 rounded-xl p-4 text-center border border-amber-200">
                <span className="text-2xl mb-2 block">🏪</span>
                <span className="text-sm font-medium text-slate-700">{shop}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="text-sm text-emerald-800">
              <strong>✓</strong> Harga dikemaskini secara automatik dari pasaran dunia
            </p>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="space-y-8">
          {/* What is 916 Gold */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Apa Itu Emas 916?</h2>
            <p className="text-slate-600 mb-4">
              Emas 916 bermaksud emas dengan ketulenan 91.6% (22 karat). Ia adalah jenis emas paling popular di Malaysia untuk barang kemas kerana:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-amber-500">✓</span>
                <span>Lebih keras dan tahan lasak berbanding emas 999</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">✓</span>
                <span>Sesuai untuk rantai, cincin, gelang</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">✓</span>
                <span>Harga lebih berpatutan berbanding emas tulen</span>
              </li>
            </ul>
          </div>

          {/* Types of Gold */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Jenis-Jenis Emas di Malaysia</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-3 px-2 font-bold text-slate-700">Jenis</th>
                    <th className="text-center py-3 px-2 font-bold text-slate-700">Karat</th>
                    <th className="text-center py-3 px-2 font-bold text-slate-700">Ketulenan</th>
                    <th className="text-left py-3 px-2 font-bold text-slate-700">Kegunaan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">999</td>
                    <td className="py-3 px-2 text-center">24K</td>
                    <td className="py-3 px-2 text-center">99.9%</td>
                    <td className="py-3 px-2 text-slate-600">Pelaburan (gold bar), simpanan</td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-amber-50">
                    <td className="py-3 px-2 font-medium">916</td>
                    <td className="py-3 px-2 text-center">22K</td>
                    <td className="py-3 px-2 text-center">91.6%</td>
                    <td className="py-3 px-2 text-slate-600">Barang kemas popular</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">875</td>
                    <td className="py-3 px-2 text-center">21K</td>
                    <td className="py-3 px-2 text-center">87.5%</td>
                    <td className="py-3 px-2 text-slate-600">Barang kemas</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2 font-medium">750</td>
                    <td className="py-3 px-2 text-center">18K</td>
                    <td className="py-3 px-2 text-center">75.0%</td>
                    <td className="py-3 px-2 text-slate-600">Barang kemas dengan permata</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Calculate */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Cara Kira Harga Emas</h2>
            <div className="bg-slate-50 rounded-xl p-4 mb-4">
              <p className="font-mono text-slate-700">
                <strong>Formula:</strong> Nilai Emas = Berat (gram) × Harga per gram
              </p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <p className="text-slate-700 mb-2"><strong>Contoh:</strong></p>
              <ul className="text-slate-600 space-y-1">
                <li>• Rantai emas 916 seberat 10 gram</li>
                <li>• Harga emas 916: {formatCurrency(goldPrices[916]?.sell || 540)}/gram</li>
                <li>• Nilai = 10 × {formatCurrency(goldPrices[916]?.sell || 540)} = <strong>{formatCurrency(10 * (goldPrices[916]?.sell || 540))}</strong></li>
              </ul>
            </div>
          </div>

          {/* Weight Conversion */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Tukar Berat Emas</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-3 px-2 font-bold text-slate-700">Unit</th>
                    <th className="text-left py-3 px-2 font-bold text-slate-700">Bersamaan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">1 Gram</td>
                    <td className="py-3 px-2 text-slate-600">1 gram</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">1 Tael (Tahil)</td>
                    <td className="py-3 px-2 text-slate-600">37.799 gram</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">1 Tola</td>
                    <td className="py-3 px-2 text-slate-600">11.664 gram</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2 font-medium">1 Ounce (oz)</td>
                    <td className="py-3 px-2 text-slate-600">31.1035 gram</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 916 vs 999 Comparison */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Emas 916 vs Emas 999: Mana Lebih Baik?</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-3 px-2 font-bold text-slate-700">Faktor</th>
                    <th className="text-center py-3 px-2 font-bold text-amber-600">Emas 916</th>
                    <th className="text-center py-3 px-2 font-bold text-amber-600">Emas 999</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Ketulenan</td>
                    <td className="py-3 px-2 text-center">91.6%</td>
                    <td className="py-3 px-2 text-center">99.9%</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Ketahanan</td>
                    <td className="py-3 px-2 text-center">Lebih keras</td>
                    <td className="py-3 px-2 text-center">Lembut, mudah calar</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Kegunaan</td>
                    <td className="py-3 px-2 text-center">Barang kemas</td>
                    <td className="py-3 px-2 text-center">Pelaburan</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 font-medium">Harga</td>
                    <td className="py-3 px-2 text-center">Lebih rendah</td>
                    <td className="py-3 px-2 text-center">Lebih tinggi</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2 font-medium">Spread (beli-jual)</td>
                    <td className="py-3 px-2 text-center">Lebih besar</td>
                    <td className="py-3 px-2 text-center">Lebih kecil</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <p className="text-emerald-800">
                <strong>💡 Kesimpulan:</strong><br />
                • Untuk pakai → Pilih <strong>Emas 916</strong><br />
                • Untuk simpan/labur → Pilih <strong>Emas 999</strong>
              </p>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Tips Membeli Emas di Malaysia</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <h3 className="font-bold text-slate-900">Bandingkan harga</h3>
                  <p className="text-slate-600 text-sm">Setiap kedai ada harga berbeza. Semak beberapa kedai sebelum beli.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <h3 className="font-bold text-slate-900">Minta resit</h3>
                  <p className="text-slate-600 text-sm">Pastikan ada maklumat berat dan ketulenan pada resit.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                <span className="text-2xl">3️⃣</span>
                <div>
                  <h3 className="font-bold text-slate-900">Periksa cop</h3>
                  <p className="text-slate-600 text-sm">Emas tulen ada cop 916 atau 999 pada barang kemas.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                <span className="text-2xl">4️⃣</span>
                <div>
                  <h3 className="font-bold text-slate-900">Beli dari kedai berlesen</h3>
                  <p className="text-slate-600 text-sm">Pilih kedai berdaftar dengan FGJAM atau KPDNKK.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                <span className="text-2xl">5️⃣</span>
                <div>
                  <h3 className="font-bold text-slate-900">Simpan resit</h3>
                  <p className="text-slate-600 text-sm">Untuk jual balik kemudian dengan harga yang baik.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Options */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Pilihan Pelaburan Emas</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <h3 className="font-bold text-slate-900 mb-2">🏪 Emas Fizikal</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Public Gold - Gold bar & dinar</li>
                  <li>• Kijang Emas (Bank Negara)</li>
                  <li>• Kedai emas berlesen</li>
                </ul>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="font-bold text-slate-900 mb-2">🏦 Akaun Emas</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Maybank Gold Investment Account</li>
                  <li>• CIMB Gold Account</li>
                  <li>• Public Bank Gold Account</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Soalan Lazim (FAQ)</h2>
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">Berapa harga emas 916 hari ini?</h3>
                <p className="text-slate-600">
                  Harga emas 916 sekitar {formatCurrency(goldPrices[916]?.sell || 540)} per gram. Harga berubah setiap hari mengikut pasaran dunia.
                </p>
              </div>
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">Apa maksud emas 916?</h3>
                <p className="text-slate-600">
                  916 bermaksud 91.6% emas tulen, bersamaan 22 karat. Baki 8.4% adalah logam lain untuk kekuatan.
                </p>
              </div>
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">Di mana boleh jual emas terpakai?</h3>
                <p className="text-slate-600">
                  Anda boleh jual di kedai emas (Habib, Poh Kong), Ar-Rahnu, atau kedai pajak gadai berlesen.
                </p>
              </div>
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">Berapa spread harga emas?</h3>
                <p className="text-slate-600">
                  Biasanya RM 10-20 per gram antara harga beli dan jual. Spread lebih kecil untuk emas 999.
                </p>
              </div>
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">Adakah emas 916 sesuai untuk pelaburan?</h3>
                <p className="text-slate-600">
                  Untuk pelaburan jangka panjang, emas 999 (gold bar) lebih sesuai kerana spread lebih kecil. Emas 916 lebih sesuai untuk barang kemas.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Bagaimana nak tahu emas tulen?</h3>
                <p className="text-slate-600">
                  Periksa cop ketulenan (916, 999), minta sijil, dan beli dari kedai berlesen sahaja.
                </p>
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4">🔗 Kalkulator Berkaitan</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href="/investment/kalkulator-dividen-asb-malaysia/"
                className="block p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                <span className="text-2xl mb-2 block">📈</span>
                <span className="font-medium">Kalkulator Dividen ASB</span>
              </a>
              <a
                href="/tax/epf-retirement-calculator-malaysia/"
                className="block p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                <span className="text-2xl mb-2 block">💰</span>
                <span className="font-medium">Kalkulator EPF</span>
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
