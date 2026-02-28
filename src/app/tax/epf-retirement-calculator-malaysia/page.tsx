import EPFCalculator from "@/components/EPFCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "EPF Calculator Malaysia 2026 (KWSP) | Calculator Malaysia",
  description:
    "Calculate your EPF contributions and project retirement savings. See Account 1 & 2 breakdown, employer contributions, and dividend growth projection.",
  keywords: [
    "epf calculator malaysia",
    "kwsp calculator",
    "epf contribution calculator",
    "epf retirement calculator",
    "epf dividend calculator",
    "epf account 1 account 2",
    "caruman kwsp",
  ],
};

export default function EPFCalculatorPage() {
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
            <span className="text-slate-900">EPF Retirement Calculator</span>
          </div>
        </div>
      </div>

      <EPFCalculator />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              EPF Malaysia (KWSP): Complete Guide to Your Retirement Savings
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              The Employees Provident Fund (EPF) or Kumpulan Wang Simpanan Pekerja (KWSP) is
              Malaysia&apos;s mandatory retirement savings scheme. Every month, you and your employer
              contribute a portion of your salary to build your retirement nest egg. This guide
              explains everything you need to know about EPF contributions, dividends, and withdrawals.
            </p>

            {/* EPF Contribution Rates 2026 */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              EPF Contribution Rates 2026
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              EPF contributions come from both employees and employers. The rates depend on your
              age and salary level:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Category</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Employee</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Employer</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Total</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Below 60 years (Salary &gt; RM5,000)</td>
                    <td className="border border-slate-200 px-4 py-3">11%</td>
                    <td className="border border-slate-200 px-4 py-3">12%</td>
                    <td className="border border-slate-200 px-4 py-3 font-semibold text-blue-600">23%</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Below 60 years (Salary ≤ RM5,000)</td>
                    <td className="border border-slate-200 px-4 py-3">11%</td>
                    <td className="border border-slate-200 px-4 py-3">13%</td>
                    <td className="border border-slate-200 px-4 py-3 font-semibold text-blue-600">24%</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Age 60 and above</td>
                    <td className="border border-slate-200 px-4 py-3">5.5%</td>
                    <td className="border border-slate-200 px-4 py-3">6.5%</td>
                    <td className="border border-slate-200 px-4 py-3 font-semibold text-blue-600">12%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 my-6">
              <p className="font-semibold text-blue-800 mb-2">Optional Lower Rate</p>
              <p className="text-slate-600 text-sm">
                Employees below 60 can apply to reduce their contribution to 9% or 7% to increase
                take-home pay. However, this reduces your retirement savings and dividend earnings.
                Consider carefully before opting for a lower rate.
              </p>
            </div>

            {/* Account 1 vs Account 2 */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Account 1 vs Account 2 Explained
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Your EPF savings are split into two accounts with different purposes:
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <p className="font-bold text-blue-800 text-lg mb-2">Account 1 (Akaun 1)</p>
                <p className="text-2xl font-bold text-blue-600 mb-3">70%</p>
                <p className="text-slate-600 text-sm mb-3">
                  Strictly for retirement. Can only be withdrawn at age 55 (full) or age 50 (partial).
                </p>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• Locked for retirement savings</li>
                  <li>• Higher balance for compound growth</li>
                  <li>• Can invest in approved funds (EPF Members Investment Scheme)</li>
                </ul>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
                <p className="font-bold text-indigo-800 text-lg mb-2">Account 2 (Akaun 2)</p>
                <p className="text-2xl font-bold text-indigo-600 mb-3">30%</p>
                <p className="text-slate-600 text-sm mb-3">
                  For pre-retirement needs. Can be withdrawn for specific purposes before age 55.
                </p>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• Housing (down payment, mortgage)</li>
                  <li>• Education (self or children)</li>
                  <li>• Medical expenses (critical illness)</li>
                  <li>• Age 50 withdrawal</li>
                </ul>
              </div>
            </div>

            {/* EPF Dividend History */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              EPF Dividend History
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              EPF declares dividends annually, distributed to members in the first quarter of each
              year. Here&apos;s the historical dividend rates:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Year</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Conventional</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Shariah</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">2023</td>
                    <td className="border border-slate-200 px-4 py-3 text-emerald-600 font-semibold">5.50%</td>
                    <td className="border border-slate-200 px-4 py-3">5.40%</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">2022</td>
                    <td className="border border-slate-200 px-4 py-3 text-emerald-600 font-semibold">5.35%</td>
                    <td className="border border-slate-200 px-4 py-3">5.25%</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">2021</td>
                    <td className="border border-slate-200 px-4 py-3 text-emerald-600 font-semibold">6.10%</td>
                    <td className="border border-slate-200 px-4 py-3">5.65%</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">2020</td>
                    <td className="border border-slate-200 px-4 py-3 text-emerald-600 font-semibold">5.20%</td>
                    <td className="border border-slate-200 px-4 py-3">4.90%</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">2019</td>
                    <td className="border border-slate-200 px-4 py-3 text-emerald-600 font-semibold">5.45%</td>
                    <td className="border border-slate-200 px-4 py-3">5.00%</td>
                  </tr>
                  <tr className="bg-emerald-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">5-Year Average</td>
                    <td className="border border-slate-200 px-4 py-3 text-emerald-700 font-bold">5.52%</td>
                    <td className="border border-slate-200 px-4 py-3 font-bold">5.24%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="font-semibold text-amber-800 mb-2">EPF Dividend vs Fixed Deposit</p>
              <p className="text-slate-600 text-sm">
                EPF consistently outperforms bank fixed deposits (currently 2.5-3.5%). Over 30 years,
                this difference compounds significantly. A RM100,000 balance at 5.5% grows to RM498,000
                in 30 years, vs RM228,000 at 2.8% FD rate.
              </p>
            </div>

            {/* EPF Withdrawal Rules */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              EPF Withdrawal Rules (Updated 2026)
            </h3>

            {/* New Account Structure */}
            <h4 className="text-xl font-bold text-slate-800 mt-8 mb-3">
              New Account Structure
            </h4>

            <p className="text-slate-600 leading-relaxed mb-4">
              EPF now uses:
            </p>

            <div className="grid md:grid-cols-3 gap-4 my-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="font-bold text-blue-800 mb-1">Akaun Persaraan</p>
                <p className="text-lg font-bold text-blue-600 mb-2">70%</p>
                <p className="text-slate-600 text-sm">Retirement Account - for long-term savings</p>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                <p className="font-bold text-indigo-800 mb-1">Akaun Sejahtera</p>
                <p className="text-lg font-bold text-indigo-600 mb-2">30%</p>
                <p className="text-slate-600 text-sm">Wellbeing Account - for pre-retirement needs</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="font-bold text-emerald-800 mb-1">Akaun Fleksibel</p>
                <p className="text-lg font-bold text-emerald-600 mb-2">Optional</p>
                <p className="text-slate-600 text-sm">Account 3 - flexible savings option</p>
              </div>
            </div>

            {/* Age-Based Withdrawals */}
            <h4 className="text-xl font-bold text-slate-800 mt-8 mb-3">
              Age-Based Withdrawals
            </h4>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-slate-800">Age 55 - Partial Withdrawal</p>
                <p className="text-slate-600 text-base">
                  Withdraw from Akaun Persaraan. Can choose monthly pension or lump sum.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-slate-800">Age 60 - Full Withdrawal</p>
                <p className="text-slate-600 text-base">
                  Full withdrawal of all savings from both accounts.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-slate-800">Age 50 - Partial Withdrawal</p>
                <p className="text-slate-600 text-base">
                  Withdraw savings exceeding the Basic Savings amount for your age from Akaun Persaraan.
                </p>
              </div>
            </div>

            {/* RIA Framework 2026 */}
            <h4 className="text-xl font-bold text-slate-800 mt-8 mb-3">
              Retirement Income Adequacy (RIA) Framework 2026
            </h4>

            <p className="text-slate-600 leading-relaxed mb-4">
              New savings benchmarks effective January 2026:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Category</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Amount</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Basic Savings</td>
                    <td className="border border-slate-200 px-4 py-3 font-bold text-blue-600">RM 390,000</td>
                    <td className="border border-slate-200 px-4 py-3">Minimum for basic retirement</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Adequate Savings</td>
                    <td className="border border-slate-200 px-4 py-3 font-bold text-emerald-600">RM 650,000</td>
                    <td className="border border-slate-200 px-4 py-3">Reasonable standard of living</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Enhanced Savings</td>
                    <td className="border border-slate-200 px-4 py-3 font-bold text-purple-600">RM 1.3 million</td>
                    <td className="border border-slate-200 px-4 py-3">Comfortable retirement</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Savings Above RM1 Million */}
            <h4 className="text-xl font-bold text-slate-800 mt-8 mb-3">
              Savings Above RM1 Million
            </h4>

            <p className="text-slate-600 leading-relaxed mb-4">
              Members with savings exceeding the threshold can withdraw excess funds:
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-700 font-medium">2026:</span>
                  <span className="text-amber-700 font-bold">Above RM 1.1 million</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700 font-medium">2027:</span>
                  <span className="text-amber-700 font-bold">Above RM 1.2 million</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700 font-medium">2028:</span>
                  <span className="text-amber-700 font-bold">Above RM 1.3 million</span>
                </div>
              </div>
            </div>

            {/* Akaun Sejahtera Withdrawals */}
            <h4 className="text-xl font-bold text-slate-800 mt-8 mb-3">
              Akaun Sejahtera Withdrawals
            </h4>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-indigo-500 pl-4">
                <p className="font-semibold text-slate-800">Housing Withdrawal</p>
                <p className="text-slate-600 text-base">
                  Down payment for first or second property, monthly mortgage payments, or home construction. Cannot be used for renovations or third property.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <p className="font-semibold text-slate-800">Education Withdrawal</p>
                <p className="text-slate-600 text-base">
                  For member&apos;s own or children&apos;s tertiary education. Must be at approved institutions.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <p className="font-semibold text-slate-800">Medical Withdrawal</p>
                <p className="text-slate-600 text-base">
                  Critical illness treatment for self, spouse, children, or parents. Covers treatment at approved hospitals.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <p className="font-semibold text-slate-800">Hajj Withdrawal</p>
                <p className="text-slate-600 text-base">
                  Increased limit: <strong>RM10,000</strong> (previously RM3,000). Must have Tabung Haji offer letter.
                </p>
              </div>
            </div>

            {/* Leaving Malaysia */}
            <div className="border-l-4 border-slate-400 pl-4 my-6">
              <p className="font-semibold text-slate-800">Leaving Malaysia Permanently</p>
              <p className="text-slate-600 text-base">
                Full withdrawal of all savings. Requires proof of permanent residency in another country. Foreign workers can withdraw when employment pass expires.
              </p>
            </div>

            {/* How Much Do You Need to Retire */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              How Much EPF Do You Need to Retire?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              EPF recommends a Basic Savings amount based on your age. This is the minimum you should
              have to support a basic retirement:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Age</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Basic Savings</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Age</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Basic Savings</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">25</td>
                    <td className="border border-slate-200 px-4 py-3">RM 17,000</td>
                    <td className="border border-slate-200 px-4 py-3">40</td>
                    <td className="border border-slate-200 px-4 py-3">RM 110,000</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">30</td>
                    <td className="border border-slate-200 px-4 py-3">RM 36,000</td>
                    <td className="border border-slate-200 px-4 py-3">45</td>
                    <td className="border border-slate-200 px-4 py-3">RM 155,000</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">35</td>
                    <td className="border border-slate-200 px-4 py-3">RM 66,000</td>
                    <td className="border border-slate-200 px-4 py-3">50</td>
                    <td className="border border-slate-200 px-4 py-3">RM 211,000</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-slate-200 px-4 py-3 font-semibold" colSpan={2}></td>
                    <td className="border border-slate-200 px-4 py-3 font-semibold">55</td>
                    <td className="border border-slate-200 px-4 py-3 font-bold text-blue-600">RM 240,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-5 my-6">
              <p className="font-semibold text-red-800 mb-2">Reality Check</p>
              <p className="text-slate-600 text-sm">
                RM240,000 at age 55 provides only about RM1,000/month for 20 years of retirement.
                With inflation, this may not be enough for a comfortable lifestyle. Financial experts
                recommend saving at least <strong>RM1,000,000</strong> or having other income sources
                (rental, investments, part-time work).
              </p>
            </div>

            {/* EPF vs PRS */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              EPF vs Private Retirement Scheme (PRS)
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              PRS is a voluntary supplement to EPF. Here&apos;s how they compare:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Feature</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">EPF</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">PRS</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Mandatory?</td>
                    <td className="border border-slate-200 px-4 py-3">Yes (for employees)</td>
                    <td className="border border-slate-200 px-4 py-3">No (voluntary)</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Returns</td>
                    <td className="border border-slate-200 px-4 py-3">Dividend (5-6% historically)</td>
                    <td className="border border-slate-200 px-4 py-3">Fund performance (varies widely)</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Risk</td>
                    <td className="border border-slate-200 px-4 py-3 text-emerald-600">Low (guaranteed min 2.5%)</td>
                    <td className="border border-slate-200 px-4 py-3 text-amber-600">Medium to High</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Tax Relief</td>
                    <td className="border border-slate-200 px-4 py-3">Up to RM4,000</td>
                    <td className="border border-slate-200 px-4 py-3">Additional RM3,000</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Withdrawal Age</td>
                    <td className="border border-slate-200 px-4 py-3">55</td>
                    <td className="border border-slate-200 px-4 py-3">55 (or early with penalty)</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Investment Control</td>
                    <td className="border border-slate-200 px-4 py-3">Limited (Simpanan Shariah or Conventional)</td>
                    <td className="border border-slate-200 px-4 py-3">Choose from many funds</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 my-6">
              <p className="font-semibold text-blue-800 mb-2">Recommendation</p>
              <p className="text-slate-600 text-sm">
                Max out your EPF tax relief (RM4,000) first, then consider PRS for additional
                RM3,000 tax relief. PRS suits those who want more control over investments and can
                tolerate some market risk.
              </p>
            </div>

            {/* i-Saraan for Self-Employed */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              i-Saraan: EPF for Self-Employed
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              If you&apos;re self-employed, freelance, or a gig worker, you can still build EPF
              savings through i-Saraan:
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 my-6">
              <p className="font-semibold text-emerald-800 mb-3">i-Saraan Benefits:</p>
              <ul className="text-slate-600 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span><strong>Government incentive:</strong> 15% matching contribution up to RM250/year (until 2024)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span><strong>Flexible contributions:</strong> Minimum RM1, maximum RM60,000/year</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span><strong>Same dividends:</strong> Enjoy the same dividend rate as regular EPF</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span><strong>Tax relief:</strong> Contributions qualify for income tax relief</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span><strong>Easy registration:</strong> Online via i-Akaun or at EPF counters</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 my-6">
              <p className="font-semibold text-slate-800 mb-2">Who Should Use i-Saraan?</p>
              <ul className="text-slate-600 text-sm space-y-1">
                <li>• Grab/Food Panda drivers</li>
                <li>• Freelancers and consultants</li>
                <li>• Small business owners</li>
                <li>• Farmers and fishermen</li>
                <li>• Housewives/househusbands (can contribute with spouse&apos;s support)</li>
                <li>• Anyone without formal employment</li>
              </ul>
            </div>

            {/* Tips to Maximize EPF */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Tips to Maximize Your EPF
            </h3>

            <div className="space-y-4 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">1. Don&apos;t reduce your contribution rate</p>
                <p className="text-slate-600 text-sm">
                  Lowering from 11% to 7% might give you extra cash now, but costs you significantly
                  in long-term compound growth. The difference can be hundreds of thousands at retirement.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">2. Avoid unnecessary withdrawals</p>
                <p className="text-slate-600 text-sm">
                  Each withdrawal disrupts compound growth. Only withdraw from Account 2 when truly
                  necessary. That RM20,000 withdrawn at 30 could be RM80,000+ at 55.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">3. Consider EPF investment scheme</p>
                <p className="text-slate-600 text-sm">
                  If you understand investing, you can invest up to 30% of Account 1 in approved
                  unit trusts. This can potentially earn higher returns, but also carries market risk.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">4. Make voluntary contributions</p>
                <p className="text-slate-600 text-sm">
                  You can contribute more than the mandatory amount. This is especially useful if
                  you receive bonuses or have extra cash. Enjoy dividend returns with no effort.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">5. Check your statement regularly</p>
                <p className="text-slate-600 text-sm">
                  Log in to i-Akaun to verify your employer is contributing correctly. Errors or
                  missing contributions should be reported to EPF immediately.
                </p>
              </div>
            </div>

            {/* FAQ */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Frequently Asked Questions
            </h3>

            <div className="space-y-6 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  When is EPF dividend credited?
                </p>
                <p className="text-slate-600 text-sm">
                  EPF announces dividends in February/March each year for the previous year. The
                  dividend is credited directly to your account – you don&apos;t need to do anything.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Can I withdraw EPF if I&apos;m unemployed?
                </p>
                <p className="text-slate-600 text-sm">
                  Not automatically. However, if you&apos;re 50+, you can make partial withdrawals.
                  There&apos;s no general unemployment withdrawal scheme, though special schemes
                  (like during COVID) may be introduced occasionally.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  What happens to EPF if I pass away?
                </p>
                <p className="text-slate-600 text-sm">
                  Your EPF will be distributed to your registered nominees. Make sure to update your
                  nomination (beneficiary) information via i-Akaun to avoid complications for your
                  family.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Is EPF savings taxable?
                </p>
                <p className="text-slate-600 text-sm">
                  No. EPF withdrawals are tax-free. Both your contributions (up to RM4,000 relief)
                  and the dividends you earn are not subject to income tax.
                </p>
              </div>
            </div>

            {/* Related Calculators */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Related Calculators
            </h3>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <Link
                href="/salary/monthly-salary-calculator/"
                className="block bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💰</div>
                  <div>
                    <p className="font-semibold text-teal-800">Monthly Salary Calculator</p>
                    <p className="text-sm text-slate-600 mt-1">
                      See your net salary after EPF, SOCSO, EIS, and PCB deductions.
                    </p>
                    <span className="text-sm text-teal-600 font-medium mt-2 inline-block">
                      Calculate now →
                    </span>
                  </div>
                </div>
              </Link>
              <Link
                href="/tax/pcb-calculator/"
                className="block bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🧾</div>
                  <div>
                    <p className="font-semibold text-red-800">PCB Calculator</p>
                    <p className="text-sm text-slate-600 mt-1">
                      Calculate your monthly tax deduction and annual tax liability.
                    </p>
                    <span className="text-sm text-red-600 font-medium mt-2 inline-block">
                      Calculate now →
                    </span>
                  </div>
                </div>
              </Link>
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
