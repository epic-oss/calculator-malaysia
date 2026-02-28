import MonthlySalaryCalculator from "@/components/MonthlySalaryCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Monthly Salary Calculator Malaysia 2026 (Kira Gaji Bulanan) | Calculator Malaysia",
  description:
    "Calculate your take-home pay after EPF, SOCSO, EIS & PCB deductions. Understand your payslip and see how much you actually bring home each month.",
  keywords: [
    "salary calculator malaysia",
    "kira gaji bulanan",
    "net salary calculator",
    "EPF calculator",
    "SOCSO calculator",
    "PCB calculator",
    "take home pay calculator",
    "payslip calculator malaysia",
  ],
};

export default function MonthlySalaryCalculatorPage() {
  return (
    <div>
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/tax" className="hover:text-slate-900 transition-colors">Tax & Salary</Link>
            <span>›</span>
            <span className="text-slate-900">Kalkulator Gaji Bulanan</span>
          </div>
        </div>
      </div>

      <MonthlySalaryCalculator lang="ms" />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Understanding Your Malaysian Salary: Complete Guide to Payslip Deductions
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              Ever looked at your payslip and wondered why your take-home pay is so much less than
              your gross salary? In Malaysia, several mandatory deductions reduce your income before
              it reaches your bank account. Understanding these deductions helps you plan your
              finances better.
            </p>

            <p className="text-slate-600 leading-relaxed">
              This calculator breaks down all statutory deductions – EPF, SOCSO, EIS, and PCB – so
              you know exactly what to expect on payday.
            </p>

            {/* How Salary Deductions Work */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              How Salary Deductions Work in Malaysia
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Every month, your employer deducts several amounts from your gross salary before paying
              you. These are called statutory deductions because they&apos;re required by law:
            </p>

            <div className="bg-teal-50 border border-teal-100 rounded-xl p-6 my-6">
              <p className="font-semibold text-teal-800 mb-3">Monthly Deduction Flow:</p>
              <div className="bg-white rounded-lg p-4 border border-teal-200">
                <p className="text-center text-slate-700 font-mono">
                  Gross Salary − EPF − SOCSO − EIS − PCB = <span className="text-teal-600 font-bold">Net Salary</span>
                </p>
              </div>
              <p className="text-sm text-slate-600 mt-3">
                Your net salary (take-home pay) is what gets deposited into your bank account.
              </p>
            </div>

            {/* EPF Section */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              EPF (KWSP) – Employees Provident Fund
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              EPF is Malaysia&apos;s mandatory retirement savings scheme. Both you and your employer
              contribute a percentage of your salary every month. This money is saved for your
              retirement and can be withdrawn for specific purposes like buying a house or education.
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Contributor</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Rate (Age &lt; 60)</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Rate (Age 60+)</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Employee</td>
                    <td className="border border-slate-200 px-4 py-3">11% (can opt for 9% or 7%)</td>
                    <td className="border border-slate-200 px-4 py-3">5.5%</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Employer (salary &gt; RM5,000)</td>
                    <td className="border border-slate-200 px-4 py-3">13%</td>
                    <td className="border border-slate-200 px-4 py-3">6.5%</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Employer (salary ≤ RM5,000)</td>
                    <td className="border border-slate-200 px-4 py-3">12%</td>
                    <td className="border border-slate-200 px-4 py-3">6%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4 my-6">
              <div className="bg-teal-50 border border-teal-100 rounded-xl p-5">
                <p className="font-semibold text-teal-800 mb-2">EPF Contribution Options</p>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• <strong>11% (Standard)</strong> – Default rate for most employees</li>
                  <li>• <strong>9% (Reduced)</strong> – For those aged 60 and above</li>
                  <li>• <strong>7% (Optional)</strong> – Employees can apply to reduce (more take-home, less retirement savings)</li>
                  <li>• <strong>0% (Exempted)</strong> – Foreigners with work permits are exempt</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="font-semibold text-amber-800 mb-2">Should You Reduce Your EPF Rate?</p>
              <p className="text-slate-600 text-sm">
                While reducing from 11% to 7% gives you more cash now, you lose out on compound
                interest for retirement. Only consider this if you have pressing financial needs
                and a solid plan to invest the difference yourself.
              </p>
            </div>

            {/* SOCSO Section */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              SOCSO (PERKESO) – Social Security Organization
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              SOCSO provides protection against employment injuries and invalidity. It covers medical
              expenses if you get injured at work and provides income replacement if you become
              disabled.
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Category</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Employee</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Employer</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Coverage</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Category 1 (Age &lt; 55)</td>
                    <td className="border border-slate-200 px-4 py-3">0.5%</td>
                    <td className="border border-slate-200 px-4 py-3">1.75%</td>
                    <td className="border border-slate-200 px-4 py-3">Employment Injury + Invalidity</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Category 2 (Age 55+)</td>
                    <td className="border border-slate-200 px-4 py-3">0%</td>
                    <td className="border border-slate-200 px-4 py-3">1.25%</td>
                    <td className="border border-slate-200 px-4 py-3">Employment Injury only</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-slate-500 my-4">
              *SOCSO contributions are capped at a salary ceiling of RM5,000. The maximum employee
              contribution is RM24.75/month for Category 1.
            </p>

            <div className="bg-slate-50 rounded-xl p-6 my-6">
              <p className="font-semibold text-slate-800 mb-3">What SOCSO Covers:</p>
              <ul className="text-slate-600 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-0.5">✓</span>
                  <span><strong>Medical benefits</strong> – Treatment for work-related injuries/diseases</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-0.5">✓</span>
                  <span><strong>Temporary disability benefit</strong> – 80% of salary during recovery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-0.5">✓</span>
                  <span><strong>Permanent disability benefit</strong> – Pension for permanent disability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-0.5">✓</span>
                  <span><strong>Survivors&apos; pension</strong> – For dependents if employee dies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-0.5">✓</span>
                  <span><strong>Rehabilitation</strong> – Return to employment program</span>
                </li>
              </ul>
            </div>

            {/* EIS Section */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              EIS (SIP) – Employment Insurance System
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              EIS provides temporary financial assistance to workers who lose their jobs. It was
              introduced in 2018 and is mandatory for all employees aged 18-60.
            </p>

            <div className="bg-slate-50 rounded-xl p-6 my-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-2">Contribution Rates</p>
                  <ul className="text-slate-600 text-sm space-y-1">
                    <li>• Employee: 0.2% of salary</li>
                    <li>• Employer: 0.2% of salary</li>
                    <li>• Maximum salary cap: RM5,000</li>
                    <li>• Max contribution: RM10/month each</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-2">What You Get</p>
                  <ul className="text-slate-600 text-sm space-y-1">
                    <li>• Job search allowance (up to 6 months)</li>
                    <li>• Early re-employment allowance</li>
                    <li>• Training fee reimbursement</li>
                    <li>• Job placement services</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-xl p-5 my-6">
              <p className="font-semibold text-teal-800 mb-2">How Much Can You Claim from EIS?</p>
              <p className="text-slate-600 text-sm">
                If you lose your job involuntarily (retrenched, company closure), you can receive
                between 30-80% of your average monthly salary for up to 6 months, depending on your
                contribution period. You must have contributed for at least 12 months within the past
                24 months to be eligible.
              </p>
            </div>

            {/* PCB Section */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              PCB (MTD) – Monthly Tax Deduction
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              PCB (Potongan Cukai Bulanan) or MTD (Monthly Tax Deduction) is your income tax paid in
              advance. Instead of paying a lump sum at year-end, tax is deducted monthly based on
              your estimated annual income.
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Annual Income (RM)</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Tax Rate</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Cumulative Tax (RM)</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr className="bg-emerald-50">
                    <td className="border border-slate-200 px-4 py-3">First 5,000</td>
                    <td className="border border-slate-200 px-4 py-3 text-emerald-600">0%</td>
                    <td className="border border-slate-200 px-4 py-3">0</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">5,001 - 20,000</td>
                    <td className="border border-slate-200 px-4 py-3">1%</td>
                    <td className="border border-slate-200 px-4 py-3">150</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">20,001 - 35,000</td>
                    <td className="border border-slate-200 px-4 py-3">3%</td>
                    <td className="border border-slate-200 px-4 py-3">600</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">35,001 - 50,000</td>
                    <td className="border border-slate-200 px-4 py-3">6%</td>
                    <td className="border border-slate-200 px-4 py-3">1,500</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">50,001 - 70,000</td>
                    <td className="border border-slate-200 px-4 py-3">11%</td>
                    <td className="border border-slate-200 px-4 py-3">3,700</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">70,001 - 100,000</td>
                    <td className="border border-slate-200 px-4 py-3">19%</td>
                    <td className="border border-slate-200 px-4 py-3">9,400</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">100,001 - 400,000</td>
                    <td className="border border-slate-200 px-4 py-3">25%</td>
                    <td className="border border-slate-200 px-4 py-3">84,400</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">400,001 - 600,000</td>
                    <td className="border border-slate-200 px-4 py-3">26%</td>
                    <td className="border border-slate-200 px-4 py-3">136,400</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">600,001 - 2,000,000</td>
                    <td className="border border-slate-200 px-4 py-3">28%</td>
                    <td className="border border-slate-200 px-4 py-3">528,400</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Above 2,000,000</td>
                    <td className="border border-slate-200 px-4 py-3">30%</td>
                    <td className="border border-slate-200 px-4 py-3">-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              *Tax brackets shown are for Year of Assessment 2024/2025. Taxable income is calculated
              after deducting reliefs (personal relief RM9,000, EPF up to RM4,000, etc.).
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="font-semibold text-amber-800 mb-2">Why Is My PCB Different from the Table?</p>
              <p className="text-slate-600 text-sm">
                Your actual PCB depends on many factors: marital status, number of children, other
                income sources, and reliefs you&apos;ve claimed via Form TP1. The calculator above
                uses standard assumptions. For exact PCB, use LHDN&apos;s official e-PCB system or
                consult your HR department.
              </p>
            </div>

            {/* How to Read Your Payslip */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              How to Read Your Payslip
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              A typical Malaysian payslip contains several sections. Here&apos;s what each part means:
            </p>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-teal-500 pl-4">
                <p className="font-semibold text-slate-800">1. Gross Salary / Basic Pay</p>
                <p className="text-slate-600 text-base">
                  Your base monthly salary before any additions or deductions. This is the amount
                  stated in your employment contract.
                </p>
              </div>
              <div className="border-l-4 border-teal-500 pl-4">
                <p className="font-semibold text-slate-800">2. Allowances</p>
                <p className="text-slate-600 text-base">
                  Additional payments like transport allowance, meal allowance, phone allowance.
                  Some are taxable, some aren&apos;t (check with your HR).
                </p>
              </div>
              <div className="border-l-4 border-teal-500 pl-4">
                <p className="font-semibold text-slate-800">3. Overtime / Commission / Bonus</p>
                <p className="text-slate-600 text-base">
                  Variable pay based on extra hours worked or performance. These are fully taxable
                  and subject to EPF.
                </p>
              </div>
              <div className="border-l-4 border-teal-500 pl-4">
                <p className="font-semibold text-slate-800">4. Statutory Deductions</p>
                <p className="text-slate-600 text-base">
                  EPF, SOCSO, EIS, and PCB – the mandatory deductions explained in this guide.
                  These reduce your gross pay to arrive at net pay.
                </p>
              </div>
              <div className="border-l-4 border-teal-500 pl-4">
                <p className="font-semibold text-slate-800">5. Other Deductions</p>
                <p className="text-slate-600 text-base">
                  Salary advances, loans, unpaid leave, parking fees, or union dues that your
                  employer deducts on your behalf.
                </p>
              </div>
              <div className="border-l-4 border-teal-500 pl-4">
                <p className="font-semibold text-slate-800">6. Net Pay / Take Home</p>
                <p className="text-slate-600 text-base">
                  The final amount deposited into your bank account. This is what you actually
                  receive after all deductions.
                </p>
              </div>
            </div>

            {/* Employer Contributions Explained */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              What Your Employer Pays (That You Don&apos;t See)
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Beyond your visible deductions, your employer makes additional contributions on your
              behalf. This is your &quot;hidden&quot; compensation:
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 my-6">
              <p className="font-semibold text-blue-800 mb-3">Example: RM5,000 Gross Salary</p>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>EPF (12% of RM5,000)</span>
                  <span className="font-medium">RM 600</span>
                </div>
                <div className="flex justify-between">
                  <span>SOCSO (1.75%)</span>
                  <span className="font-medium">RM 86.65</span>
                </div>
                <div className="flex justify-between">
                  <span>EIS (0.2%)</span>
                  <span className="font-medium">RM 10</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-blue-200 font-bold text-blue-800">
                  <span>Total Employer Cost</span>
                  <span>RM 5,696.65</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Your total employment cost to the company is RM5,696.65/month, not just RM5,000.
              </p>
            </div>

            {/* Common Questions */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Frequently Asked Questions
            </h3>

            <div className="space-y-6 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Why is my take-home pay much less than my gross salary?
                </p>
                <p className="text-slate-600 text-sm">
                  For a typical employee, total deductions can be 15-25% of gross salary. If you earn
                  RM5,000, expect to take home around RM3,800-4,200 depending on your EPF rate and
                  tax bracket.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Can I reduce my EPF contribution to get more cash?
                </p>
                <p className="text-slate-600 text-sm">
                  Yes, you can apply to reduce from 11% to 7% or even lower. However, this means less
                  retirement savings. Only do this if you have a clear plan for the extra money.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  What happens if I overpay PCB during the year?
                </p>
                <p className="text-slate-600 text-sm">
                  When you file your annual tax return (Form BE), LHDN will calculate your actual tax.
                  If you&apos;ve overpaid via PCB, you&apos;ll get a tax refund. If underpaid, you&apos;ll
                  need to top up.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Do foreigners pay the same deductions?
                </p>
                <p className="text-slate-600 text-sm">
                  Foreigners are exempt from EPF but can contribute voluntarily. SOCSO and EIS apply
                  to all employees. Tax rates for non-residents are different (flat 30% without
                  reliefs).
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  How does bonus affect my salary deductions?
                </p>
                <p className="text-slate-600 text-sm">
                  Bonus is subject to EPF and PCB but usually not SOCSO/EIS (which are capped monthly).
                  Your bonus month PCB will be higher because it&apos;s calculated on a higher income.
                </p>
              </div>
            </div>

            {/* Tips Section */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Tips to Maximize Your Take-Home Pay Legally
            </h3>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-teal-500 pl-4">
                <p className="font-semibold text-slate-800">1. Claim all tax reliefs</p>
                <p className="text-slate-600 text-base">
                  Submit Form TP1 to your employer to reduce PCB. Claim reliefs for insurance,
                  medical, education, parents, and lifestyle expenses.
                </p>
              </div>
              <div className="border-l-4 border-teal-500 pl-4">
                <p className="font-semibold text-slate-800">2. Negotiate tax-exempt allowances</p>
                <p className="text-slate-600 text-base">
                  Some allowances like parking, petrol (for work travel), and mobile phone (for work)
                  can be tax-exempt up to certain limits.
                </p>
              </div>
              <div className="border-l-4 border-teal-500 pl-4">
                <p className="font-semibold text-slate-800">3. Use tax-advantaged accounts</p>
                <p className="text-slate-600 text-base">
                  Voluntary EPF contributions and PRS (Private Retirement Scheme) give you tax relief
                  while building retirement savings.
                </p>
              </div>
              <div className="border-l-4 border-teal-500 pl-4">
                <p className="font-semibold text-slate-800">4. Time your bonuses strategically</p>
                <p className="text-slate-600 text-base">
                  If possible, discuss with HR about bonus timing to optimize your tax position,
                  especially if you&apos;re near a tax bracket boundary.
                </p>
              </div>
            </div>

            {/* Final Note */}
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-6 mt-12">
              <p className="font-semibold text-teal-800 mb-2">Use This Calculator Regularly</p>
              <p className="text-slate-600 text-base">
                Before negotiating a salary raise or accepting a new job offer, use this calculator
                to understand your actual take-home pay. A RM500 raise doesn&apos;t mean RM500 more
                in your pocket – after EPF and higher taxes, you might only see RM350-400 more.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.webp"
                alt="Calculator Malaysia"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-bold text-xl"><span className="text-blue-400">Calculator</span> <span className="text-red-400">Malaysia</span></span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                All Calculators
              </Link>
              <a href="/about" className="hover:text-white transition-colors">
                About
              </a>
              <a href="/contact" className="hover:text-white transition-colors">
                Contact
              </a>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
            </nav>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
            © 2026 Calculator Malaysia. All calculators are free to use.
          </div>
        </div>
      </footer>
    </div>
  );
}
