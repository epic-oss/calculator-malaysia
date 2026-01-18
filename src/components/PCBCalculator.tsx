"use client";

import { useState, useMemo } from "react";

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

// Malaysia Tax Brackets (Chargeable Income)
const TAX_BRACKETS = [
  { min: 0, max: 5000, rate: 0 },
  { min: 5001, max: 20000, rate: 0.01 },
  { min: 20001, max: 35000, rate: 0.03 },
  { min: 35001, max: 50000, rate: 0.06 },
  { min: 50001, max: 70000, rate: 0.11 },
  { min: 70001, max: 100000, rate: 0.19 },
  { min: 100001, max: 400000, rate: 0.25 },
  { min: 400001, max: 600000, rate: 0.26 },
  { min: 600001, max: 2000000, rate: 0.28 },
  { min: 2000001, max: Infinity, rate: 0.30 },
];

// Tax Reliefs
const RELIEFS = {
  individual: 9000,
  epfMax: 4000,
  spouseNotWorking: 4000,
  childUnder18: 2000,
  socsoMax: 350,
  eisMax: 250,
};

const EPF_RATES = [
  { label: "11% (Standard)", value: 0.11 },
  { label: "9% (Age 60+)", value: 0.09 },
  { label: "0% (Exempted)", value: 0 },
];

interface CapturedCalculation {
  monthlySalary: number;
  monthlyPCB: number;
  annualTax: number;
  effectiveRate: number;
  maritalStatus: string;
  children: number;
}

export default function PCBCalculator() {
  const currentYear = new Date().getFullYear();

  // Input states
  const [monthlySalary, setMonthlySalary] = useState(5000);
  const [epfRate, setEpfRate] = useState(0.11);
  const [maritalStatus, setMaritalStatus] = useState<"single" | "married">("single");
  const [children, setChildren] = useState(0);
  const [spouseWorking, setSpouseWorking] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [capturedCalc, setCapturedCalc] = useState<CapturedCalculation | null>(null);

  const calculation = useMemo(() => {
    // Annual gross income
    const annualGross = monthlySalary * 12;

    // EPF contribution (annual)
    const annualEPF = Math.min(monthlySalary * epfRate * 12, RELIEFS.epfMax * 12);
    const epfRelief = Math.min(annualEPF, RELIEFS.epfMax);

    // SOCSO & EIS (estimated)
    const socsoRelief = Math.min(monthlySalary * 0.005 * 12, RELIEFS.socsoMax);
    const eisRelief = Math.min(monthlySalary * 0.002 * 12, RELIEFS.eisMax);

    // Calculate total reliefs
    let totalReliefs = RELIEFS.individual + epfRelief + socsoRelief + eisRelief;

    // Spouse relief (only if married and spouse not working)
    const spouseRelief = maritalStatus === "married" && !spouseWorking ? RELIEFS.spouseNotWorking : 0;
    totalReliefs += spouseRelief;

    // Child relief
    const childRelief = children * RELIEFS.childUnder18;
    totalReliefs += childRelief;

    // Chargeable income
    const chargeableIncome = Math.max(0, annualGross - annualEPF - totalReliefs);

    // Calculate tax using brackets
    let annualTax = 0;
    let remainingIncome = chargeableIncome;

    for (const bracket of TAX_BRACKETS) {
      if (remainingIncome <= 0) break;

      const taxableInBracket = Math.min(
        remainingIncome,
        bracket.max - bracket.min + 1
      );

      if (chargeableIncome > bracket.min) {
        const incomeInBracket = Math.min(
          chargeableIncome - bracket.min,
          bracket.max - bracket.min
        );
        if (incomeInBracket > 0) {
          annualTax += incomeInBracket * bracket.rate;
        }
      }
      remainingIncome -= taxableInBracket;
    }

    // Recalculate using proper bracket method
    annualTax = 0;
    if (chargeableIncome > 0) {
      // First RM5,000: 0%
      // RM5,001 - RM20,000: 1%
      if (chargeableIncome > 5000) {
        annualTax += Math.min(chargeableIncome - 5000, 15000) * 0.01;
      }
      // RM20,001 - RM35,000: 3%
      if (chargeableIncome > 20000) {
        annualTax += Math.min(chargeableIncome - 20000, 15000) * 0.03;
      }
      // RM35,001 - RM50,000: 6%
      if (chargeableIncome > 35000) {
        annualTax += Math.min(chargeableIncome - 35000, 15000) * 0.06;
      }
      // RM50,001 - RM70,000: 11%
      if (chargeableIncome > 50000) {
        annualTax += Math.min(chargeableIncome - 50000, 20000) * 0.11;
      }
      // RM70,001 - RM100,000: 19%
      if (chargeableIncome > 70000) {
        annualTax += Math.min(chargeableIncome - 70000, 30000) * 0.19;
      }
      // RM100,001 - RM400,000: 25%
      if (chargeableIncome > 100000) {
        annualTax += Math.min(chargeableIncome - 100000, 300000) * 0.25;
      }
      // RM400,001 - RM600,000: 26%
      if (chargeableIncome > 400000) {
        annualTax += Math.min(chargeableIncome - 400000, 200000) * 0.26;
      }
      // RM600,001 - RM2,000,000: 28%
      if (chargeableIncome > 600000) {
        annualTax += Math.min(chargeableIncome - 600000, 1400000) * 0.28;
      }
      // Above RM2,000,000: 30%
      if (chargeableIncome > 2000000) {
        annualTax += (chargeableIncome - 2000000) * 0.30;
      }
    }

    // Monthly PCB
    const monthlyPCB = annualTax / 12;

    // Effective tax rate
    const effectiveRate = annualGross > 0 ? (annualTax / annualGross) * 100 : 0;

    return {
      annualGross,
      annualEPF,
      totalReliefs,
      reliefBreakdown: {
        individual: RELIEFS.individual,
        epf: epfRelief,
        socso: socsoRelief,
        eis: eisRelief,
        spouse: spouseRelief,
        children: childRelief,
      },
      chargeableIncome,
      annualTax,
      monthlyPCB,
      effectiveRate,
    };
  }, [monthlySalary, epfRate, maritalStatus, children, spouseWorking]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const openModal = () => {
    setCapturedCalc({
      monthlySalary,
      monthlyPCB: calculation.monthlyPCB,
      annualTax: calculation.annualTax,
      effectiveRate: calculation.effectiveRate,
      maritalStatus,
      children,
    });
    setShowModal(true);
    setSubmitSuccess(false);
    setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          whatsapp: formData.phone,
          email: formData.email,
          calculator_type: "pcb_calculator",
          monthly_salary: capturedCalc?.monthlySalary,
          monthly_pcb: capturedCalc?.monthlyPCB,
          annual_tax: capturedCalc?.annualTax,
          effective_rate: capturedCalc?.effectiveRate,
          marital_status: capturedCalc?.maritalStatus,
          children: capturedCalc?.children,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", phone: "", email: "" });
      } else {
        setSubmitError("Failed to submit. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Kalkulator PCB Malaysia {currentYear}
        </h1>
        <p className="text-center text-slate-500 mb-8">
          Kira Potongan Cukai Berjadual (PCB) bulanan daripada gaji anda
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Maklumat Gaji & Pelepasan
              </h2>

              {/* Monthly Salary */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gaji Bulanan Kasar (RM)
                </label>
                <input
                  type="number"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="100"
                />
                <input
                  type="range"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(Number(e.target.value))}
                  min="1000"
                  max="50000"
                  step="100"
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>RM1,000</span>
                  <span>RM50,000</span>
                </div>
              </div>

              {/* EPF Rate */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Kadar Caruman KWSP
                </label>
                <select
                  value={epfRate}
                  onChange={(e) => setEpfRate(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {EPF_RATES.map((rate) => (
                    <option key={rate.value} value={rate.value}>
                      {rate.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Marital Status */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status Perkahwinan
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setMaritalStatus("single")}
                    className={`py-3 px-4 rounded-xl border-2 transition-all ${
                      maritalStatus === "single"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    Bujang
                  </button>
                  <button
                    onClick={() => setMaritalStatus("married")}
                    className={`py-3 px-4 rounded-xl border-2 transition-all ${
                      maritalStatus === "married"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    Berkahwin
                  </button>
                </div>
              </div>

              {/* Spouse Working (only if married) */}
              {maritalStatus === "married" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Adakah pasangan bekerja?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSpouseWorking(true)}
                      className={`py-3 px-4 rounded-xl border-2 transition-all ${
                        spouseWorking
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      Ya
                    </button>
                    <button
                      onClick={() => setSpouseWorking(false)}
                      className={`py-3 px-4 rounded-xl border-2 transition-all ${
                        !spouseWorking
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      Tidak
                    </button>
                  </div>
                  {!spouseWorking && (
                    <p className="text-xs text-green-600 mt-2">
                      ✓ Layak pelepasan pasangan RM4,000
                    </p>
                  )}
                </div>
              )}

              {/* Number of Children */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Bilangan Anak (bawah 18 tahun)
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-12 h-12 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xl font-bold"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-slate-800 w-12 text-center">
                    {children}
                  </span>
                  <button
                    onClick={() => setChildren(Math.min(10, children + 1))}
                    className="w-12 h-12 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xl font-bold"
                  >
                    +
                  </button>
                </div>
                {children > 0 && (
                  <p className="text-xs text-green-600 mt-2">
                    ✓ Pelepasan anak: {formatCurrency(children * RELIEFS.childUnder18)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Anggaran PCB Anda
              </h2>

              {/* Main Result */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white mb-6">
                <p className="text-blue-100 text-sm mb-1">PCB Bulanan</p>
                <p className="text-4xl font-bold mb-4">
                  {formatCurrency(calculation.monthlyPCB)}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-400">
                  <div>
                    <p className="text-blue-100 text-xs">Cukai Tahunan</p>
                    <p className="text-xl font-semibold">
                      {formatCurrency(calculation.annualTax)}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-100 text-xs">Kadar Efektif</p>
                    <p className="text-xl font-semibold">
                      {calculation.effectiveRate.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800">Pecahan Pengiraan</h3>

                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-600">Pendapatan Tahunan</span>
                    <span className="font-medium">{formatCurrency(calculation.annualGross)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-600">Caruman KWSP</span>
                    <span className="font-medium text-red-600">- {formatCurrency(calculation.annualEPF)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-600">Jumlah Pelepasan</span>
                    <span className="font-medium text-red-600">- {formatCurrency(calculation.totalReliefs)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="font-semibold text-slate-800">Pendapatan Bercukai</span>
                    <span className="font-bold text-blue-600">{formatCurrency(calculation.chargeableIncome)}</span>
                  </div>
                </div>

                {/* Relief Breakdown */}
                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="font-medium text-green-800 mb-3">Pelepasan Cukai</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-700">Pelepasan Individu</span>
                      <span className="font-medium text-green-800">{formatCurrency(calculation.reliefBreakdown.individual)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">KWSP (max RM4,000)</span>
                      <span className="font-medium text-green-800">{formatCurrency(calculation.reliefBreakdown.epf)}</span>
                    </div>
                    {calculation.reliefBreakdown.spouse > 0 && (
                      <div className="flex justify-between">
                        <span className="text-green-700">Pelepasan Pasangan</span>
                        <span className="font-medium text-green-800">{formatCurrency(calculation.reliefBreakdown.spouse)}</span>
                      </div>
                    )}
                    {calculation.reliefBreakdown.children > 0 && (
                      <div className="flex justify-between">
                        <span className="text-green-700">Pelepasan Anak ({children}x RM2,000)</span>
                        <span className="font-medium text-green-800">{formatCurrency(calculation.reliefBreakdown.children)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tax Bracket Info */}
                <div className="bg-amber-50 rounded-xl p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Kadar Cukai {currentYear}:</strong> Berdasarkan pendapatan bercukai anda,
                    cukai dikira menggunakan kadar progresif LHDN.
                  </p>
                </div>
              </div>

              {/* CTA Card */}
              <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🎯</span>
                  <h3 className="text-lg font-bold text-slate-800">Perlukan Bantuan Cukai?</h3>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="text-green-500 font-bold">✓</span>
                    Semakan percuma dengan perunding cukai
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="text-green-500 font-bold">✓</span>
                    Jimat masa dengan e-filing
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="text-green-500 font-bold">✓</span>
                    Maksimumkan pelepasan cukai anda
                  </li>
                </ul>
                <button
                  onClick={openModal}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold transition-colors"
                >
                  Dapatkan Nasihat Percuma
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">
                  {submitSuccess ? "Terima Kasih! 🎉" : "Dapatkan Nasihat Cukai"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {submitSuccess ? (
                <div className="text-center py-4">
                  <div className="text-5xl mb-4">✅</div>
                  <p className="text-slate-600 mb-4">
                    Kami akan menghubungi anda dalam masa 24 jam untuk membincangkan strategi cukai anda.
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Summary */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-6">
                    <p className="text-sm text-slate-600 mb-2">Ringkasan PCB Anda:</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-slate-500">Gaji Bulanan:</span>
                        <span className="font-medium ml-1">{formatCurrency(capturedCalc?.monthlySalary || 0)}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">PCB Bulanan:</span>
                        <span className="font-medium ml-1 text-blue-600">{formatCurrency(capturedCalc?.monthlyPCB || 0)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nama</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nama penuh anda"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">No. WhatsApp</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="012-3456789"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="email@contoh.com"
                      />
                    </div>
                  </div>

                  {submitError && (
                    <p className="text-red-600 text-sm mt-4">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 mt-6 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 rounded-xl text-white font-semibold transition-colors"
                  >
                    {isSubmitting ? "Menghantar..." : "Hantar"}
                  </button>

                  <p className="text-xs text-slate-400 text-center mt-4">
                    Maklumat anda selamat dan tidak akan dikongsi.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
