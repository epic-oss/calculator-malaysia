"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

// Service Groups
const SERVICE_GROUPS = [
  { id: "pelaksana", label: "Pelaksana", phase1Rate: 0.08, phase2Rate: 0.07, minIncrease: 250 },
  { id: "pnp", label: "Pengurusan & Profesional (P&P)", phase1Rate: 0.08, phase2Rate: 0.07, minIncrease: 250 },
  { id: "pengurusan-tertinggi", label: "Pengurusan Tertinggi", phase1Rate: 0.04, phase2Rate: 0.03, minIncrease: 0 },
];

// Service Schemes based on group
const SERVICE_SCHEMES: Record<string, Array<{ id: string; label: string }>> = {
  pelaksana: [
    { id: "sokongan", label: "Sokongan Am (H/N)" },
  ],
  pnp: [
    { id: "pendidikan", label: "Pendidikan (DG)" },
    { id: "pentadbiran", label: "Pentadbiran (M/PTD)" },
    { id: "perubatan", label: "Perubatan (U)" },
    { id: "polis", label: "Polis (YA/YT)" },
    { id: "tentera", label: "Tentera (ATM)" },
  ],
  "pengurusan-tertinggi": [
    { id: "jusa", label: "JUSA/Turus" },
  ],
};

// Grades with salary ranges and KGT
interface GradeInfo {
  id: string;
  label: string;
  min: number;
  max: number;
  kgt: number;
}

const GRADES: Record<string, GradeInfo[]> = {
  sokongan: [
    { id: "H1", label: "Gred H1 (Pembantu Am)", min: 1500, max: 4680, kgt: 100 },
    { id: "H2", label: "Gred H2", min: 1600, max: 5080, kgt: 100 },
    { id: "N1", label: "Gred N1 (Pembantu Tadbir)", min: 1500, max: 4680, kgt: 100 },
    { id: "N2", label: "Gred N2", min: 1600, max: 5080, kgt: 100 },
    { id: "N3", label: "Gred N3", min: 1700, max: 5480, kgt: 100 },
    { id: "N4", label: "Gred N4", min: 1800, max: 5880, kgt: 100 },
  ],
  pendidikan: [
    { id: "DG29", label: "Gred DG29 (PPPS)", min: 2081, max: 9547, kgt: 225 },
    { id: "DG32", label: "Gred DG32", min: 2299, max: 9547, kgt: 225 },
    { id: "DG41", label: "Gred DG41 (Guru)", min: 2422, max: 9631, kgt: 225 },
    { id: "DG44", label: "Gred DG44", min: 4220, max: 10576, kgt: 250 },
    { id: "DG48", label: "Gred DG48 (Guru Cemerlang)", min: 5138, max: 11678, kgt: 250 },
    { id: "DG52", label: "Gred DG52", min: 6089, max: 12780, kgt: 280 },
    { id: "DG54", label: "Gred DG54 (Pengetua Kanan)", min: 6563, max: 13460, kgt: 280 },
  ],
  pentadbiran: [
    { id: "M41", label: "Gred M41 (PTD)", min: 2422, max: 9631, kgt: 225 },
    { id: "M44", label: "Gred M44", min: 4220, max: 10576, kgt: 250 },
    { id: "M48", label: "Gred M48", min: 5138, max: 11678, kgt: 250 },
    { id: "M52", label: "Gred M52", min: 6089, max: 12780, kgt: 280 },
    { id: "M54", label: "Gred M54", min: 6563, max: 13460, kgt: 280 },
  ],
  perubatan: [
    { id: "U29", label: "Gred U29 (Pegawai Perubatan HO)", min: 2081, max: 9547, kgt: 225 },
    { id: "U32", label: "Gred U32 (Pegawai Perubatan)", min: 2299, max: 9547, kgt: 225 },
    { id: "U41", label: "Gred U41 (Pakar)", min: 2422, max: 9631, kgt: 225 },
    { id: "U44", label: "Gred U44", min: 4220, max: 10576, kgt: 250 },
    { id: "U48", label: "Gred U48 (Pakar Kanan)", min: 5138, max: 11678, kgt: 250 },
    { id: "U52", label: "Gred U52", min: 6089, max: 12780, kgt: 280 },
    { id: "U54", label: "Gred U54", min: 6563, max: 13460, kgt: 280 },
  ],
  polis: [
    { id: "YA1", label: "Gred YA1 (Konstabel)", min: 1500, max: 4680, kgt: 100 },
    { id: "YA13", label: "Gred YA13 (Koperal)", min: 1900, max: 5680, kgt: 120 },
    { id: "YT1", label: "Gred YT1 (Inspektor)", min: 2422, max: 9631, kgt: 225 },
    { id: "YT6", label: "Gred YT6 (ASP)", min: 4220, max: 10576, kgt: 250 },
    { id: "YT8", label: "Gred YT8 (DSP)", min: 5138, max: 11678, kgt: 250 },
    { id: "YT10", label: "Gred YT10 (Supt)", min: 6089, max: 12780, kgt: 280 },
  ],
  tentera: [
    { id: "LT", label: "Leftenan (LT)", min: 2422, max: 9631, kgt: 225 },
    { id: "KAPT", label: "Kapten (KAPT)", min: 4220, max: 10576, kgt: 250 },
    { id: "MEJ", label: "Mejar (MEJ)", min: 5138, max: 11678, kgt: 250 },
    { id: "LTKOL", label: "Leftenan Kolonel (LT KOL)", min: 6089, max: 12780, kgt: 280 },
    { id: "KOL", label: "Kolonel (KOL)", min: 6563, max: 13460, kgt: 280 },
  ],
  jusa: [
    { id: "JUSA-C", label: "JUSA C", min: 11160, max: 16530, kgt: 400 },
    { id: "JUSA-B", label: "JUSA B", min: 13245, max: 18390, kgt: 450 },
    { id: "JUSA-A", label: "JUSA A", min: 15030, max: 20490, kgt: 500 },
    { id: "TURUS-III", label: "Turus III", min: 17820, max: 23730, kgt: 550 },
    { id: "TURUS-II", label: "Turus II", min: 20610, max: 26730, kgt: 600 },
    { id: "TURUS-I", label: "Turus I", min: 23400, max: 29730, kgt: 650 },
  ],
};

export default function SSPACalculator() {
  const currentYear = new Date().getFullYear();

  // Input states
  const [serviceGroup, setServiceGroup] = useState("pnp");
  const [serviceScheme, setServiceScheme] = useState("pendidikan");
  const [grade, setGrade] = useState("DG41");
  const [currentSalary, setCurrentSalary] = useState(4500);
  const [appointmentDate, setAppointmentDate] = useState("");
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

  // Get available schemes based on service group
  const availableSchemes = SERVICE_SCHEMES[serviceGroup] || [];

  // Get available grades based on scheme
  const availableGrades = GRADES[serviceScheme] || [];

  // Get selected grade info
  const selectedGrade = availableGrades.find(g => g.id === grade);

  // Get selected group info
  const selectedGroup = SERVICE_GROUPS.find(g => g.id === serviceGroup);

  // Handle service group change
  const handleGroupChange = (newGroup: string) => {
    setServiceGroup(newGroup);
    const schemes = SERVICE_SCHEMES[newGroup];
    if (schemes && schemes.length > 0) {
      setServiceScheme(schemes[0].id);
      const grades = GRADES[schemes[0].id];
      if (grades && grades.length > 0) {
        setGrade(grades[0].id);
        setCurrentSalary(grades[0].min);
      }
    }
  };

  // Handle scheme change
  const handleSchemeChange = (newScheme: string) => {
    setServiceScheme(newScheme);
    const grades = GRADES[newScheme];
    if (grades && grades.length > 0) {
      setGrade(grades[0].id);
      setCurrentSalary(grades[0].min);
    }
  };

  // Handle grade change
  const handleGradeChange = (newGrade: string) => {
    setGrade(newGrade);
    const gradeInfo = availableGrades.find(g => g.id === newGrade);
    if (gradeInfo) {
      setCurrentSalary(gradeInfo.min);
    }
  };

  const calculation = useMemo(() => {
    if (!selectedGroup || !selectedGrade) {
      return null;
    }

    // Phase 1 calculation (Dec 2024)
    const phase1Increase = Math.max(
      currentSalary * selectedGroup.phase1Rate,
      selectedGroup.minIncrease
    );
    const salaryAfterPhase1 = currentSalary + phase1Increase;

    // Phase 2 calculation (Jan 2026)
    const phase2Increase = salaryAfterPhase1 * selectedGroup.phase2Rate;
    const salaryAfterPhase2 = salaryAfterPhase1 + phase2Increase;

    // Total increase from original
    const totalIncrease = salaryAfterPhase2 - currentSalary;
    const totalIncreasePercent = (totalIncrease / currentSalary) * 100;

    // KGT (Annual Increment)
    const annualKGT = selectedGrade.kgt;

    // Projected salary next year (with KGT)
    const projectedNextYear = Math.min(salaryAfterPhase2 + annualKGT, selectedGrade.max);

    // Years of service calculation
    let yearsOfService = 0;
    if (appointmentDate) {
      const appointed = new Date(appointmentDate);
      const now = new Date();
      yearsOfService = Math.floor((now.getTime() - appointed.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    }

    return {
      phase1Increase,
      salaryAfterPhase1,
      phase2Increase,
      salaryAfterPhase2,
      totalIncrease,
      totalIncreasePercent,
      annualKGT,
      projectedNextYear,
      yearsOfService,
      gradeMin: selectedGrade.min,
      gradeMax: selectedGrade.max,
    };
  }, [currentSalary, selectedGroup, selectedGrade, appointmentDate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ms-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-10 md:py-14">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">📋 Kalkulator Gaji</div>
          <div className="text-5xl md:text-6xl mb-4">📝</div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Kalkulator SSPA Malaysia {currentYear}</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">Kira gaji baharu mengikut Sistem Saraan Perkhidmatan Awam (SSPA)</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Maklumat Perkhidmatan
              </h2>

              {/* Service Group */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Kumpulan Perkhidmatan
                </label>
                <select
                  value={serviceGroup}
                  onChange={(e) => handleGroupChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {SERVICE_GROUPS.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Scheme */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Skim Perkhidmatan
                </label>
                <select
                  value={serviceScheme}
                  onChange={(e) => handleSchemeChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {availableSchemes.map((scheme) => (
                    <option key={scheme.id} value={scheme.id}>
                      {scheme.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Grade */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gred Jawatan
                </label>
                <select
                  value={grade}
                  onChange={(e) => handleGradeChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {availableGrades.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.label}
                    </option>
                  ))}
                </select>
                {selectedGrade && (
                  <p className="text-xs text-slate-500 mt-2">
                    Julat gaji: {formatCurrency(selectedGrade.min)} - {formatCurrency(selectedGrade.max)}
                  </p>
                )}
              </div>

              {/* Current Salary */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gaji Hakiki Semasa (RM)
                </label>
                <input
                  type="number"
                  value={currentSalary}
                  onChange={(e) => setCurrentSalary(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={selectedGrade?.min || 0}
                  max={selectedGrade?.max || 50000}
                  step="10"
                />
                {selectedGrade && (
                  <input
                    type="range"
                    value={currentSalary}
                    onChange={(e) => setCurrentSalary(Number(e.target.value))}
                    min={selectedGrade.min}
                    max={selectedGrade.max}
                    step="10"
                    className="w-full mt-2"
                  />
                )}
              </div>

              {/* Appointment Date (Optional) */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tarikh Lantikan (Pilihan)
                </label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Untuk anggaran tempoh perkhidmatan dan KGT
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong>Nota:</strong> Pengiraan ini adalah anggaran berdasarkan kadar SSPA.
                  Rujuk{" "}
                  <a
                    href="https://sspa.jpa.gov.my/kiraan/kalkulator.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-600"
                  >
                    Kalkulator Rasmi JPA
                  </a>{" "}
                  untuk pengiraan tepat.
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Gaji SSPA Anda
              </h2>

              {calculation && (
                <>
                  {/* Current Salary Display */}
                  <div className="bg-slate-100 rounded-xl p-4 mb-4">
                    <p className="text-sm text-slate-500 mb-1">Gaji Hakiki Semasa</p>
                    <p className="text-2xl font-bold text-slate-700">
                      {formatCurrency(currentSalary)}
                    </p>
                    {calculation.yearsOfService > 0 && (
                      <p className="text-xs text-slate-500 mt-1">
                        Tempoh perkhidmatan: {calculation.yearsOfService} tahun
                      </p>
                    )}
                  </div>

                  {/* Phase 1 Result */}
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm text-amber-700 font-medium">Fasa 1 (1 Dis 2024)</p>
                        <p className="text-xs text-amber-600">
                          {serviceGroup === "pengurusan-tertinggi" ? "+4%" : "+8% atau min RM250"}
                        </p>
                      </div>
                      <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">
                        Selesai
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-amber-800">
                      {formatCurrency(calculation.salaryAfterPhase1)}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      +{formatCurrency(calculation.phase1Increase)}
                    </p>
                  </div>

                  {/* Phase 2 Result - Main Display */}
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-blue-100 text-sm">Fasa 2 (1 Jan 2026)</p>
                        <p className="text-blue-200 text-xs">
                          {serviceGroup === "pengurusan-tertinggi" ? "+3%" : "+7%"}
                        </p>
                      </div>
                      <span className="text-xs bg-blue-400 text-white px-2 py-1 rounded-full">
                        Semasa
                      </span>
                    </div>
                    <p className="text-4xl font-bold mb-2">
                      {formatCurrency(calculation.salaryAfterPhase2)}
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-400">
                      <div>
                        <p className="text-blue-100 text-xs">Jumlah Kenaikan</p>
                        <p className="text-xl font-semibold">
                          {formatCurrency(calculation.totalIncrease)}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-100 text-xs">Peratus Kenaikan</p>
                        <p className="text-xl font-semibold">
                          +{calculation.totalIncreasePercent.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* KGT Section */}
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-4">
                    <h3 className="font-semibold text-green-800 mb-3">
                      Kenaikan Gaji Tahunan (KGT)
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-green-600">KGT Tahunan</p>
                        <p className="text-xl font-bold text-green-800">
                          {formatCurrency(calculation.annualKGT)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-green-600">Gaji Tahun Hadapan</p>
                        <p className="text-xl font-bold text-green-800">
                          {formatCurrency(calculation.projectedNextYear)}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-3">
                      *KGT diberi setiap tahun sehingga mencapai gaji maksimum{" "}
                      {formatCurrency(calculation.gradeMax)}
                    </p>
                  </div>

                  {/* Grade Info */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-4">
                    <h3 className="font-semibold text-slate-700 mb-2">Maklumat Gred</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Gred:</span>
                        <span className="font-medium">{grade}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">KGT:</span>
                        <span className="font-medium">{formatCurrency(calculation.annualKGT)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Gaji Min:</span>
                        <span className="font-medium">{formatCurrency(calculation.gradeMin)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Gaji Max:</span>
                        <span className="font-medium">{formatCurrency(calculation.gradeMax)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Related Calculators */}
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-sm font-medium text-slate-700 mb-3">Kalkulator Berkaitan:</p>
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/tax/kalkulator-pcb-bulanan-malaysia/"
                        className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                      >
                        <span className="text-xl">🧾</span>
                        <span className="text-sm text-slate-700">Kalkulator PCB</span>
                      </Link>
                      <Link
                        href="/tax/kalkulator-kira-gaji-bulanan-malaysia/"
                        className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                      >
                        <span className="text-xl">💵</span>
                        <span className="text-sm text-slate-700">Kira Gaji Bersih</span>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Desktop CTA */}
      <div className="hidden md:flex fixed bottom-5 right-6 z-50 flex-col items-end gap-2">
        {showBackToTop && (
          <button onClick={scrollToTop} className="w-10 h-10 bg-white border border-slate-200 rounded-full shadow-md hover:bg-slate-50 transition-all flex items-center justify-center" aria-label="Back to top">
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
          </button>
        )}
        {showFloatingCTA && (
          <>
            <div className="bg-white px-3 py-1.5 rounded-full shadow-md text-xs text-slate-500">10,000+ calculations · Latest SSPA rates</div>
            <button onClick={scrollToTop} className="px-5 py-2.5 text-white font-bold rounded-full shadow-lg transition-all hover:opacity-90 text-sm" style={{ backgroundColor: "#6A1B9A" }}>
              Calculate Tax →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
