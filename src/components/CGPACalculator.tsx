"use client";

import { useState, useMemo, useEffect } from "react";

interface Subject {
  id: string;
  name: string;
  creditHours: number;
  grade: string;
}

interface Semester {
  id: string;
  subjects: Subject[];
}

const GRADE_POINTS_4: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.67,
  "B+": 3.33,
  B: 3.0,
  "B-": 2.67,
  "C+": 2.33,
  C: 2.0,
  "C-": 1.67,
  "D+": 1.33,
  D: 1.0,
  F: 0.0,
};

const GRADE_POINTS_5: Record<string, number> = {
  "A+": 5.0,
  A: 4.5,
  "A-": 4.0,
  "B+": 3.5,
  B: 3.0,
  "B-": 2.5,
  "C+": 2.0,
  C: 1.5,
  "C-": 1.0,
  "D+": 0.5,
  D: 0.0,
  F: 0.0,
};

const GRADES = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"];
const CREDIT_HOURS = [1, 2, 3, 4];

const createSubject = (): Subject => ({
  id: Math.random().toString(36).substr(2, 9),
  name: "",
  creditHours: 3,
  grade: "B",
});

const createSemester = (): Semester => ({
  id: Math.random().toString(36).substr(2, 9),
  subjects: [createSubject(), createSubject(), createSubject()],
});

export default function CGPACalculator() {
  const [gradingScale, setGradingScale] = useState<"4.0" | "5.0">("4.0");
  const [semesters, setSemesters] = useState<Semester[]>([createSemester()]);
  const [targetCGPA, setTargetCGPA] = useState(3.5);

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

  const gradePoints = gradingScale === "4.0" ? GRADE_POINTS_4 : GRADE_POINTS_5;
  const maxGPA = gradingScale === "4.0" ? 4.0 : 5.0;

  const calculation = useMemo(() => {
    let totalQualityPoints = 0;
    let totalCredits = 0;
    const semesterGPAs: { semester: number; gpa: number; credits: number }[] = [];

    semesters.forEach((semester, index) => {
      let semesterQP = 0;
      let semesterCredits = 0;

      semester.subjects.forEach((subject) => {
        const gradePoint = gradePoints[subject.grade] || 0;
        semesterQP += gradePoint * subject.creditHours;
        semesterCredits += subject.creditHours;
      });

      totalQualityPoints += semesterQP;
      totalCredits += semesterCredits;

      semesterGPAs.push({
        semester: index + 1,
        gpa: semesterCredits > 0 ? semesterQP / semesterCredits : 0,
        credits: semesterCredits,
      });
    });

    const cgpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

    // Classification
    let classification: string;
    let classificationColor: string;
    if (gradingScale === "4.0") {
      if (cgpa >= 3.67) {
        classification = "First Class Honours";
        classificationColor = "text-emerald-600";
      } else if (cgpa >= 3.0) {
        classification = "Second Class Upper (2:1)";
        classificationColor = "text-blue-600";
      } else if (cgpa >= 2.0) {
        classification = "Second Class Lower (2:2)";
        classificationColor = "text-amber-600";
      } else if (cgpa >= 1.0) {
        classification = "Third Class";
        classificationColor = "text-orange-600";
      } else {
        classification = "Fail";
        classificationColor = "text-red-600";
      }
    } else {
      // 5.0 scale classification
      if (cgpa >= 4.5) {
        classification = "First Class Honours";
        classificationColor = "text-emerald-600";
      } else if (cgpa >= 3.5) {
        classification = "Second Class Upper (2:1)";
        classificationColor = "text-blue-600";
      } else if (cgpa >= 2.5) {
        classification = "Second Class Lower (2:2)";
        classificationColor = "text-amber-600";
      } else if (cgpa >= 1.5) {
        classification = "Third Class";
        classificationColor = "text-orange-600";
      } else {
        classification = "Fail";
        classificationColor = "text-red-600";
      }
    }

    // Dean's List check (3.5+ for 4.0 scale, 4.25+ for 5.0 scale)
    const latestSemesterGPA = semesterGPAs[semesterGPAs.length - 1]?.gpa || 0;
    const isDeansList =
      gradingScale === "4.0" ? latestSemesterGPA >= 3.5 : latestSemesterGPA >= 4.25;

    // CGPA Predictor: Calculate credits needed at A grade to reach target
    const targetQP = targetCGPA * (totalCredits + 15); // Assume 15 credits per remaining semester
    const currentQP = totalQualityPoints;
    const neededQP = targetQP - currentQP;
    const creditsNeededAtA = neededQP / maxGPA;
    const semestersNeeded = creditsNeededAtA > 0 ? Math.ceil(creditsNeededAtA / 15) : 0;

    return {
      cgpa,
      totalCredits,
      totalQualityPoints,
      semesterGPAs,
      classification,
      classificationColor,
      latestSemesterGPA,
      isDeansList,
      creditsNeededAtA: Math.max(0, creditsNeededAtA),
      semestersNeeded,
      canAchieveTarget: cgpa < targetCGPA ? creditsNeededAtA <= 60 : true, // Max 4 semesters of 15 credits
    };
  }, [semesters, gradePoints, gradingScale, targetCGPA, maxGPA]);

  // Add semester
  const addSemester = () => {
    if (semesters.length < 8) {
      setSemesters([...semesters, createSemester()]);
    }
  };

  // Remove semester
  const removeSemester = (semesterId: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((s) => s.id !== semesterId));
    }
  };

  // Add subject to semester
  const addSubject = (semesterId: string) => {
    setSemesters(
      semesters.map((s) =>
        s.id === semesterId ? { ...s, subjects: [...s.subjects, createSubject()] } : s
      )
    );
  };

  // Remove subject from semester
  const removeSubject = (semesterId: string, subjectId: string) => {
    setSemesters(
      semesters.map((s) =>
        s.id === semesterId
          ? { ...s, subjects: s.subjects.filter((sub) => sub.id !== subjectId) }
          : s
      )
    );
  };

  // Update subject
  const updateSubject = (
    semesterId: string,
    subjectId: string,
    field: keyof Subject,
    value: string | number
  ) => {
    setSemesters(
      semesters.map((s) =>
        s.id === semesterId
          ? {
              ...s,
              subjects: s.subjects.map((sub) =>
                sub.id === subjectId ? { ...sub, [field]: value } : sub
              ),
            }
          : s
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-10 md:py-14">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">🎓 Education</div>
          <div className="text-5xl md:text-6xl mb-4">🎓</div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">CGPA Calculator Malaysia</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">Calculate your cumulative grade point average for Malaysian universities</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form - Left Side */}
          <div className="lg:w-2/3">
            <div className="space-y-6">
              {/* Grading Scale */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Grading Scale
                </label>
                <select
                  value={gradingScale}
                  onChange={(e) => setGradingScale(e.target.value as "4.0" | "5.0")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="4.0">4.0 Scale (Most Universities)</option>
                  <option value="5.0">5.0 Scale (Some Polytechnics)</option>
                </select>
              </div>

              {/* Semesters */}
              {semesters.map((semester, semesterIndex) => (
                <div key={semester.id} className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📚</span>
                      <h2 className="text-lg font-semibold text-slate-800">
                        Semester {semesterIndex + 1}
                      </h2>
                      {calculation.semesterGPAs[semesterIndex] && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg">
                          GPA: {calculation.semesterGPAs[semesterIndex].gpa.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {semesters.length > 1 && (
                      <button
                        onClick={() => removeSemester(semester.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Subjects Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-slate-500 border-b border-slate-200">
                          <th className="text-left py-2 font-medium">Subject (Optional)</th>
                          <th className="text-center py-2 font-medium w-24">Credits</th>
                          <th className="text-center py-2 font-medium w-24">Grade</th>
                          <th className="text-center py-2 font-medium w-20">Points</th>
                          <th className="w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {semester.subjects.map((subject) => (
                          <tr key={subject.id} className="border-b border-slate-100">
                            <td className="py-2 pr-2">
                              <input
                                type="text"
                                value={subject.name}
                                onChange={(e) =>
                                  updateSubject(semester.id, subject.id, "name", e.target.value)
                                }
                                placeholder="e.g. Mathematics"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </td>
                            <td className="py-2 px-1">
                              <select
                                value={subject.creditHours}
                                onChange={(e) =>
                                  updateSubject(
                                    semester.id,
                                    subject.id,
                                    "creditHours",
                                    Number(e.target.value)
                                  )
                                }
                                className="w-full px-2 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                {CREDIT_HOURS.map((ch) => (
                                  <option key={ch} value={ch}>
                                    {ch}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="py-2 px-1">
                              <select
                                value={subject.grade}
                                onChange={(e) =>
                                  updateSubject(semester.id, subject.id, "grade", e.target.value)
                                }
                                className="w-full px-2 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                {GRADES.map((g) => (
                                  <option key={g} value={g}>
                                    {g}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="py-2 px-1 text-center">
                              <span className="font-medium text-slate-700">
                                {(gradePoints[subject.grade] * subject.creditHours).toFixed(2)}
                              </span>
                            </td>
                            <td className="py-2 pl-1">
                              {semester.subjects.length > 1 && (
                                <button
                                  onClick={() => removeSubject(semester.id, subject.id)}
                                  className="text-red-400 hover:text-red-600 p-1"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button
                    onClick={() => addSubject(semester.id)}
                    className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Subject
                  </button>
                </div>
              ))}

              {/* Add Semester Button */}
              {semesters.length < 8 && (
                <button
                  onClick={addSemester}
                  className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Semester {semesters.length + 1}
                </button>
              )}
            </div>
          </div>

          {/* Result Card - Right Side */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">Your Results</h2>

                {/* CGPA Display */}
                <div className="text-center py-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mb-4">
                  <p className="text-sm text-slate-500 mb-1">Cumulative CGPA</p>
                  <p className="text-5xl font-bold text-blue-600">
                    {calculation.cgpa.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    out of {maxGPA.toFixed(1)}
                  </p>
                </div>

                {/* Classification */}
                <div
                  className={`text-center py-3 rounded-xl mb-4 ${
                    calculation.classification === "First Class Honours"
                      ? "bg-emerald-50"
                      : calculation.classification.includes("Upper")
                      ? "bg-blue-50"
                      : calculation.classification.includes("Lower")
                      ? "bg-amber-50"
                      : "bg-red-50"
                  }`}
                >
                  <p className={`font-bold ${calculation.classificationColor}`}>
                    {calculation.classification}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Total Credits</p>
                    <p className="text-xl font-bold text-slate-700">
                      {calculation.totalCredits}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Latest GPA</p>
                    <p className="text-xl font-bold text-slate-700">
                      {calculation.latestSemesterGPA.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Dean's List Status */}
                <div
                  className={`p-4 rounded-xl mb-4 ${
                    calculation.isDeansList
                      ? "bg-emerald-50 border border-emerald-200"
                      : "bg-slate-50 border border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{calculation.isDeansList ? "🎉" : "📊"}</span>
                    <div>
                      <p
                        className={`font-semibold ${
                          calculation.isDeansList ? "text-emerald-800" : "text-slate-700"
                        }`}
                      >
                        {calculation.isDeansList
                          ? "Dean's List Achieved!"
                          : "Dean's List Status"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {calculation.isDeansList
                          ? `Latest semester GPA: ${calculation.latestSemesterGPA.toFixed(2)}`
                          : `Need ${gradingScale === "4.0" ? "3.50" : "4.25"}+ GPA this semester`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Semester Breakdown */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-slate-600 mb-3">Semester Breakdown</p>
                  <div className="space-y-2">
                    {calculation.semesterGPAs.map((sem) => (
                      <div key={sem.semester} className="flex justify-between text-sm">
                        <span className="text-slate-500">Semester {sem.semester}</span>
                        <span className="text-slate-700 font-medium">
                          GPA {sem.gpa.toFixed(2)} ({sem.credits} credits)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CGPA Predictor */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🎯</span>
                  <h3 className="font-semibold text-slate-800">CGPA Predictor</h3>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Target CGPA
                  </label>
                  <input
                    type="number"
                    value={targetCGPA}
                    onChange={(e) =>
                      setTargetCGPA(
                        Math.max(0, Math.min(maxGPA, Number(e.target.value)))
                      )
                    }
                    min={0}
                    max={maxGPA}
                    step={0.01}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {calculation.cgpa >= targetCGPA ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <p className="text-sm text-emerald-800">
                      <strong>Congratulations!</strong> You&apos;ve already achieved your target
                      CGPA of {targetCGPA.toFixed(2)}.
                    </p>
                  </div>
                ) : calculation.canAchieveTarget ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-800">
                      To reach <strong>{targetCGPA.toFixed(2)}</strong>, you need approximately{" "}
                      <strong>{Math.ceil(calculation.creditsNeededAtA)} credit hours</strong> of
                      A grades (~{calculation.semestersNeeded} semester
                      {calculation.semestersNeeded !== 1 ? "s" : ""} of all A&apos;s).
                    </p>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-sm text-amber-800">
                      Target CGPA of {targetCGPA.toFixed(2)} may be difficult to achieve. Consider
                      setting a more realistic goal based on your current {calculation.cgpa.toFixed(2)}.
                    </p>
                  </div>
                )}
              </div>

              {/* Student Resources */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">📚</span>
                  <h3 className="font-semibold text-slate-800">Student Resources</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Part-Time Jobs Box */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl">💼</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">
                          Part-Time Jobs for Students
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Find flexible work that fits your class schedule
                        </p>
                      </div>
                    </div>
                    <a
                      href="https://www.jobstreet.com.my/part-time-jobs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium text-center hover:bg-blue-700 transition-all mt-3"
                    >
                      Browse Jobs
                    </a>
                  </div>

                  {/* Student Credit Cards Box */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl">💳</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">Student Credit Cards</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Build credit history with student-friendly cards
                        </p>
                      </div>
                    </div>
                    <a
                      href="https://invl.me/cln69f8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-2.5 px-4 rounded-lg bg-emerald-600 text-white text-sm font-medium text-center hover:bg-emerald-700 transition-all mt-3"
                    >
                      Compare Cards
                    </a>
                  </div>
                </div>
              </div>
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
            <div className="bg-white px-3 py-1.5 rounded-full shadow-md text-xs text-slate-500">10,000+ students · UIA grading scale</div>
            <button onClick={scrollToTop} className="px-5 py-2.5 text-white font-bold rounded-full shadow-lg transition-all hover:opacity-90 text-sm" style={{ backgroundColor: "#283593" }}>
              Calculate CGPA →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
