import type { Metadata } from "next";
import CGPACalculator from "@/components/CGPACalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CGPA Calculator Malaysia 2026 | University GPA Calculator",
  description:
    "Calculate your CGPA for Malaysian universities. Supports 4.0 and 5.0 grading scales. See degree classification and Dean's List eligibility instantly.",
  keywords: [
    "cgpa calculator malaysia",
    "gpa calculator malaysia",
    "university cgpa calculator",
    "uitm cgpa calculator",
    "um cgpa calculator",
    "upm cgpa calculator",
    "usm cgpa calculator",
    "malaysian university grading",
    "pointer calculator malaysia",
    "semester gpa calculator",
    "cumulative gpa calculator",
  ],
  openGraph: {
    title: "CGPA Calculator Malaysia 2026",
    description:
      "Calculate your cumulative grade point average for Malaysian universities. Supports all grading scales.",
    type: "website",
    locale: "en_MY",
  },
};

export default function CGPACalculatorPage() {
  return (
    <>
      <CGPACalculator />

      {/* SEO Content Section */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/#cgpa" className="hover:text-blue-600">
              Education Calculators
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800">CGPA Calculator</span>
          </nav>

          <article className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              How CGPA is Calculated in Malaysia
            </h2>

            <p className="text-slate-600 mb-6">
              CGPA (Cumulative Grade Point Average) measures your overall academic performance
              across all semesters. It&apos;s the number that appears on your transcript and what
              employers look at when hiring fresh graduates.
            </p>

            {/* Formula Section */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📐</span>
                CGPA Calculation Formula
              </h3>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800 mb-2">
                    GPA (Single Semester):
                  </p>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="font-mono text-blue-800">
                      GPA = Σ(Grade Points × Credit Hours) ÷ Total Credit Hours
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800 mb-2">CGPA (Cumulative):</p>
                  <div className="bg-indigo-50 rounded-lg p-3 text-center">
                    <p className="font-mono text-indigo-800">
                      CGPA = Σ(All Grade Points × Credit Hours) ÷ Total Credit Hours (all
                      semesters)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Calculation */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Example Calculation
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-200 px-4 py-2 text-left">Subject</th>
                      <th className="border border-slate-200 px-4 py-2 text-center">Credits</th>
                      <th className="border border-slate-200 px-4 py-2 text-center">Grade</th>
                      <th className="border border-slate-200 px-4 py-2 text-center">
                        Grade Point
                      </th>
                      <th className="border border-slate-200 px-4 py-2 text-center">
                        Quality Points
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2">Mathematics</td>
                      <td className="border border-slate-200 px-4 py-2 text-center">3</td>
                      <td className="border border-slate-200 px-4 py-2 text-center">A</td>
                      <td className="border border-slate-200 px-4 py-2 text-center">4.00</td>
                      <td className="border border-slate-200 px-4 py-2 text-center font-medium">
                        12.00
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2">English</td>
                      <td className="border border-slate-200 px-4 py-2 text-center">3</td>
                      <td className="border border-slate-200 px-4 py-2 text-center">B+</td>
                      <td className="border border-slate-200 px-4 py-2 text-center">3.33</td>
                      <td className="border border-slate-200 px-4 py-2 text-center font-medium">
                        9.99
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2">Physics</td>
                      <td className="border border-slate-200 px-4 py-2 text-center">4</td>
                      <td className="border border-slate-200 px-4 py-2 text-center">B</td>
                      <td className="border border-slate-200 px-4 py-2 text-center">3.00</td>
                      <td className="border border-slate-200 px-4 py-2 text-center font-medium">
                        12.00
                      </td>
                    </tr>
                    <tr className="bg-blue-50 font-bold">
                      <td className="border border-slate-200 px-4 py-2">Total</td>
                      <td className="border border-slate-200 px-4 py-2 text-center">10</td>
                      <td className="border border-slate-200 px-4 py-2 text-center">-</td>
                      <td className="border border-slate-200 px-4 py-2 text-center">-</td>
                      <td className="border border-slate-200 px-4 py-2 text-center text-blue-600">
                        33.99
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mt-4">
                <p className="text-emerald-800 font-medium">
                  GPA = 33.99 ÷ 10 = <strong className="text-xl">3.40</strong>
                </p>
              </div>
            </div>

            {/* Malaysian University Grading Scale */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📝</span>
                Malaysian University Grading Scale (4.0)
              </h3>

              <p className="text-slate-600 mb-4">
                Most Malaysian universities use the 4.0 scale. Here&apos;s the standard grade point
                assignment:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-200 px-4 py-2 text-left">Grade</th>
                      <th className="border border-slate-200 px-4 py-2 text-center">
                        Grade Point
                      </th>
                      <th className="border border-slate-200 px-4 py-2 text-center">
                        Percentage (Typical)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2 font-medium">A+ / A</td>
                      <td className="border border-slate-200 px-4 py-2 text-center font-bold text-emerald-600">
                        4.00
                      </td>
                      <td className="border border-slate-200 px-4 py-2 text-center">80-100%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium">A-</td>
                      <td className="border border-slate-200 px-4 py-2 text-center font-bold">
                        3.67
                      </td>
                      <td className="border border-slate-200 px-4 py-2 text-center">75-79%</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2 font-medium">B+</td>
                      <td className="border border-slate-200 px-4 py-2 text-center font-bold">
                        3.33
                      </td>
                      <td className="border border-slate-200 px-4 py-2 text-center">70-74%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium">B</td>
                      <td className="border border-slate-200 px-4 py-2 text-center font-bold">
                        3.00
                      </td>
                      <td className="border border-slate-200 px-4 py-2 text-center">65-69%</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2 font-medium">B-</td>
                      <td className="border border-slate-200 px-4 py-2 text-center font-bold">
                        2.67
                      </td>
                      <td className="border border-slate-200 px-4 py-2 text-center">60-64%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium">C+</td>
                      <td className="border border-slate-200 px-4 py-2 text-center font-bold">
                        2.33
                      </td>
                      <td className="border border-slate-200 px-4 py-2 text-center">55-59%</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2 font-medium">C</td>
                      <td className="border border-slate-200 px-4 py-2 text-center font-bold">
                        2.00
                      </td>
                      <td className="border border-slate-200 px-4 py-2 text-center">50-54%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium">C-</td>
                      <td className="border border-slate-200 px-4 py-2 text-center font-bold">
                        1.67
                      </td>
                      <td className="border border-slate-200 px-4 py-2 text-center">45-49%</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-2 font-medium">D+ / D</td>
                      <td className="border border-slate-200 px-4 py-2 text-center font-bold text-amber-600">
                        1.00-1.33
                      </td>
                      <td className="border border-slate-200 px-4 py-2 text-center">35-44%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium">F</td>
                      <td className="border border-slate-200 px-4 py-2 text-center font-bold text-red-600">
                        0.00
                      </td>
                      <td className="border border-slate-200 px-4 py-2 text-center">Below 35%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Percentage ranges vary by university. Always check your
                  institution&apos;s official grading policy for exact cutoffs.
                </p>
              </div>
            </div>

            {/* Degree Classification */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                Degree Classification
              </h3>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4 text-center border border-emerald-200">
                  <p className="text-2xl font-bold text-emerald-600">3.67 - 4.00</p>
                  <p className="font-semibold text-slate-800 mt-1">First Class Honours</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                  <p className="text-2xl font-bold text-blue-600">3.00 - 3.66</p>
                  <p className="font-semibold text-slate-800 mt-1">Second Upper (2:1)</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-200">
                  <p className="text-2xl font-bold text-amber-600">2.00 - 2.99</p>
                  <p className="font-semibold text-slate-800 mt-1">Second Lower (2:2)</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
                  <p className="text-2xl font-bold text-red-600">&lt; 2.00</p>
                  <p className="font-semibold text-slate-800 mt-1">Third Class / Fail</p>
                </div>
              </div>
            </div>

            {/* CGPA Requirements */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                CGPA Requirements in Malaysia
              </h3>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">Dean&apos;s List</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Most universities: <strong>CGPA 3.50+</strong> for the semester with no failed
                    subjects
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">Scholarships</p>
                  <ul className="text-sm text-slate-600 mt-1 space-y-1">
                    <li>• JPA Scholarship: Maintain CGPA 3.00+</li>
                    <li>• MARA: Maintain CGPA 3.00+</li>
                    <li>• PTPTN: No minimum but affects future applications</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">Graduation</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Minimum <strong>CGPA 2.00</strong> required to graduate from most Malaysian
                    universities
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">Postgraduate Studies</p>
                  <ul className="text-sm text-slate-600 mt-1 space-y-1">
                    <li>• Master&apos;s: Usually CGPA 2.75+ (some require 3.00+)</li>
                    <li>• PhD: Usually CGPA 3.00+ at Master&apos;s level</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tips to Improve CGPA */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Tips to Improve Your CGPA
              </h3>

              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">
                    1. Focus on High Credit Hour Subjects
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    Getting an A in a 4-credit subject impacts your CGPA more than in a 2-credit
                    subject. Prioritize accordingly.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">2. Retake Failed Subjects</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Most universities allow grade replacement - the new grade replaces the old one
                    in CGPA calculation.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">3. Don&apos;t Overload</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Taking too many credits can spread you thin. Better to take manageable load and
                    score well than overload and struggle.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">4. Start Strong</p>
                  <p className="text-sm text-slate-600 mt-1">
                    First year grades set the foundation. A strong start makes it easier to maintain
                    high CGPA throughout.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">5. Seek Help Early</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Use tutoring services, study groups, and consult lecturers BEFORE exams, not
                    after you&apos;re struggling.
                  </p>
                </div>
              </div>
            </div>

            {/* GPA vs CGPA */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚖️</span>
                GPA vs CGPA: What&apos;s the Difference?
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border-2 border-blue-200">
                  <p className="font-bold text-blue-800 text-lg mb-2">GPA</p>
                  <p className="text-slate-600 text-sm">
                    Grade Point Average for <strong>ONE semester</strong> only. Shows your
                    performance in that specific term.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 border-2 border-indigo-200">
                  <p className="font-bold text-indigo-800 text-lg mb-2">CGPA</p>
                  <p className="text-slate-600 text-sm">
                    <strong>Cumulative</strong> GPA across <strong>ALL semesters</strong>. This is
                    what appears on your transcript and what employers see.
                  </p>
                </div>
              </div>
            </div>

            {/* Popular Universities */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                Popular Universities in Malaysia
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800 mb-2">Public Universities (IPTA):</p>
                  <p className="text-sm text-slate-600">
                    UM, USM, UKM, UPM, UTM, UiTM, UPSI, UMT, UNIMAS, UMS, UTEM, UTHM, UniMAP, etc.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800 mb-2">Private Universities (IPTS):</p>
                  <p className="text-sm text-slate-600">
                    Taylor&apos;s, Sunway, Monash, Nottingham, HELP, UCSI, Multimedia, APU, INTI,
                    Limkokwing, etc.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Each university may have slightly different grading scales
                  and percentage cutoffs. Always verify with your institution&apos;s academic
                  handbook.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">❓</span>
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    Can I improve my CGPA after a bad semester?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Yes! Future good grades will pull up your CGPA. However, the more credits
                    you&apos;ve accumulated, the harder it is to significantly change your CGPA.
                    That&apos;s why starting strong is important.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    Does retaking a subject replace the old grade?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Most Malaysian universities allow grade replacement where the new grade replaces
                    the old one in CGPA calculation. However, both attempts may still appear on your
                    transcript. Check your university&apos;s policy.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    What CGPA do employers look for?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Most employers prefer CGPA 3.0+ for graduate positions. Top companies and
                    competitive roles may require 3.5+. However, work experience, skills, and
                    interview performance also matter significantly.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    How many credits should I take per semester?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Most students take 15-18 credits per semester. Minimum is usually 12 credits to
                    maintain full-time status. Maximum is often 21-22 credits with special
                    permission. Balance workload with your ability to score well.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    Is 4.0 scale the same across all universities?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    While the 4.0 scale is standard, grade point assignments may vary slightly. Some
                    universities give 4.0 for both A+ and A, others differentiate. Some polytechnics
                    use 5.0 scale. Always check your institution&apos;s specific grading scheme.
                  </p>
                </details>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 mt-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🧮</span>
                Related Calculators
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  href="/salary/monthly-salary-calculator/"
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="font-semibold text-slate-800">Salary Calculator</p>
                      <p className="text-xs text-slate-500">
                        Calculate your future take-home pay
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/loan/personal-loan-calculator-malaysia/"
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💵</span>
                    <div>
                      <p className="font-semibold text-slate-800">PTPTN Repayment</p>
                      <p className="text-xs text-slate-500">Plan your study loan repayment</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/epf/epf-calculator-malaysia/"
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="font-semibold text-slate-800">EPF Calculator</p>
                      <p className="text-xs text-slate-500">
                        Plan for retirement early
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/credit-card/credit-card-minimum-payment-calculator-malaysia/"
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💳</span>
                    <div>
                      <p className="font-semibold text-slate-800">Credit Card Calculator</p>
                      <p className="text-xs text-slate-500">Manage credit card wisely</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-slate-100 rounded-xl p-4 mt-8">
              <p className="text-xs text-slate-500">
                <strong>Disclaimer:</strong> This calculator provides estimates based on standard
                grading scales. Actual CGPA calculation may vary by institution. Grade point values
                and percentage cutoffs differ between universities. Always verify your calculation
                with your university&apos;s official academic records system.
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
