"use client";

import { useState, useMemo } from "react";

// ASB Dividend Rates (Verified Data)
const ASB_DIVIDEND_RATES = [
  { year: 2025, dividend: 5.20, bonus: 0.55, total: 5.75, distribution: 10.4 },
  { year: 2024, dividend: 5.50, bonus: 0.25, total: 5.75, distribution: 10.1 },
  { year: 2023, dividend: 4.25, bonus: 1.00, total: 5.25, distribution: 9.3 },
  { year: 2022, dividend: 4.00, bonus: 0.50, total: 4.50, distribution: null },
  { year: 2021, dividend: 4.25, bonus: 0, total: 4.25, distribution: null },
  { year: 2020, dividend: 4.25, bonus: 0, total: 4.25, distribution: null },
];

const FD_MAYBANK_RATE = 2.29; // Average FD rate for comparison

export default function ASBDividendCalculator() {
  const currentYear = new Date().getFullYear();
  const [investmentAmount, setInvestmentAmount] = useState(50000);
  const [selectedYear, setSelectedYear] = useState(2025);

  const calculation = useMemo(() => {
    const selectedRate = ASB_DIVIDEND_RATES.find((r) => r.year === selectedYear);
    if (!selectedRate) return null;

    const dividendAmount = investmentAmount * (selectedRate.total / 100);
    const fdComparison = investmentAmount * (FD_MAYBANK_RATE / 100);
    const difference = dividendAmount - fdComparison;

    return {
      dividendAmount,
      effectiveRate: selectedRate.total,
      dividendRate: selectedRate.dividend,
      bonusRate: selectedRate.bonus,
      fdComparison,
      difference,
      distribution: selectedRate.distribution,
    };
  }, [investmentAmount, selectedYear]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-yellow-700 text-white py-10 md:py-14">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">📈 Kalkulator Pelaburan</div>
          <div className="text-5xl md:text-6xl mb-4">💰</div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Kalkulator Dividen ASB Malaysia {currentYear}</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">Kira pulangan dividen ASB anda berdasarkan kadar dividen terkini</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
              {/* Investment Amount */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Jumlah Unit ASB (RM)
                </label>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) =>
                      setInvestmentAmount(
                        Math.max(1000, Math.min(300000, Number(e.target.value)))
                      )
                    }
                    min={1000}
                    max={300000}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    min={1000}
                    max={300000}
                    step={1000}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>RM 1,000</span>
                    <span>RM 300,000 (Had maksimum)</span>
                  </div>
                </div>
              </div>

              {/* Dividend Year */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tahun Dividen
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {ASB_DIVIDEND_RATES.map((rate) => (
                    <option key={rate.year} value={rate.year}>
                      {rate.year} - {rate.total.toFixed(2)}%
                    </option>
                  ))}
                </select>
              </div>

              {/* Info Card */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong>Nota:</strong> Dividen ASB dikira berdasarkan baki minimum
                  bulanan. Pastikan simpanan anda tidak dikeluarkan sepanjang tahun
                  untuk mendapat dividen penuh.
                </p>
              </div>

              {/* Dividend Rates Table */}
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">
                  Sejarah Kadar Dividen ASB
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-3 py-2 text-left font-medium text-slate-600 rounded-tl-lg">
                          Tahun
                        </th>
                        <th className="px-3 py-2 text-right font-medium text-slate-600">
                          Dividen
                        </th>
                        <th className="px-3 py-2 text-right font-medium text-slate-600">
                          Bonus
                        </th>
                        <th className="px-3 py-2 text-right font-medium text-slate-600 rounded-tr-lg">
                          Jumlah
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {ASB_DIVIDEND_RATES.map((rate) => (
                        <tr
                          key={rate.year}
                          className={
                            rate.year === selectedYear
                              ? "bg-blue-50"
                              : "hover:bg-slate-50"
                          }
                        >
                          <td className="px-3 py-2 text-slate-700 font-medium">
                            {rate.year}
                            {rate.year >= 2024 && (
                              <span className="ml-1 text-xs text-emerald-600">
                                Tertinggi
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-2 text-right text-slate-600">
                            {rate.dividend.toFixed(2)}%
                          </td>
                          <td className="px-3 py-2 text-right text-slate-600">
                            {rate.bonus > 0 ? `${rate.bonus.toFixed(2)}%` : "-"}
                          </td>
                          <td className="px-3 py-2 text-right font-semibold text-blue-600">
                            {rate.total.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Result Card - Right Side */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">
                  Pulangan Dividen ASB Anda
                </h2>

                {calculation && (
                  <>
                    {/* Main Dividend Result */}
                    <div className="text-center py-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mb-4">
                      <p className="text-sm text-slate-500 mb-1">
                        Jumlah Dividen {selectedYear}
                      </p>
                      <p className="text-4xl font-bold text-blue-600">
                        {formatCurrency(calculation.dividendAmount)}
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        Berdasarkan pelaburan {formatCurrency(investmentAmount)}
                      </p>
                    </div>

                    {/* Rate Breakdown */}
                    <div className="bg-slate-50 rounded-xl p-4 mb-4">
                      <p className="text-sm font-medium text-slate-600 mb-3">
                        Pecahan Kadar {selectedYear}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Kadar Dividen</span>
                          <span className="text-slate-700 font-medium">
                            {calculation.dividendRate.toFixed(2)}%
                          </span>
                        </div>
                        {calculation.bonusRate > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Kadar Bonus</span>
                            <span className="text-slate-700 font-medium">
                              {calculation.bonusRate.toFixed(2)}%
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                          <span className="text-slate-700 font-semibold">
                            Kadar Efektif
                          </span>
                          <span className="text-blue-600 font-bold">
                            {calculation.effectiveRate.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* FD Comparison */}
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">📊</div>
                        <div className="flex-1">
                          <p className="font-semibold text-emerald-800 text-sm">
                            Perbandingan dengan FD Maybank
                          </p>
                          <div className="mt-2 space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">FD Maybank ({FD_MAYBANK_RATE}%)</span>
                              <span className="text-slate-700">
                                {formatCurrency(calculation.fdComparison)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">ASB ({calculation.effectiveRate}%)</span>
                              <span className="text-slate-700">
                                {formatCurrency(calculation.dividendAmount)}
                              </span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-emerald-200">
                              <span className="text-emerald-700 font-medium">
                                Lebihan ASB
                              </span>
                              <span className="text-emerald-700 font-bold">
                                +{formatCurrency(calculation.difference)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tax Free Notice */}
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">💰</div>
                        <div>
                          <p className="font-semibold text-amber-800 text-sm">
                            Dividen Dikecualikan Cukai
                          </p>
                          <p className="text-xs text-amber-700 mt-1">
                            Dividen ASB tidak dikenakan cukai pendapatan. Pulangan anda
                            adalah bebas cukai sepenuhnya.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Calculation Example */}
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-sm font-medium text-slate-600 mb-2">
                        Formula Pengiraan
                      </p>
                      <div className="text-xs text-slate-500 space-y-1 font-mono bg-white p-3 rounded-lg">
                        <p>Dividen = Jumlah Pelaburan × Kadar Dividen</p>
                        <p className="text-slate-700">
                          {formatCurrency(investmentAmount)} × {calculation.effectiveRate}% ={" "}
                          <span className="font-bold text-blue-600">
                            {formatCurrency(calculation.dividendAmount)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* ASB Financing CTA */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🏦</span>
                  <h3 className="text-lg font-bold text-slate-800">
                    Perlukan Pembiayaan ASB?
                  </h3>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="text-blue-600 font-bold">✓</span>
                    Gandakan pulangan dengan ASB Financing
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="text-blue-600 font-bold">✓</span>
                    Kadar pembiayaan serendah 3.5% p.a.
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="text-blue-600 font-bold">✓</span>
                    Proses kelulusan pantas
                  </li>
                </ul>
                <a
                  href="https://ringgitplus.com/en/personal-loan/?utm_source=calculator_malaysia&utm_medium=referral"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-blue-700 hover:bg-blue-800 rounded-xl text-white font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Semak Kelayakan Pinjaman
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
