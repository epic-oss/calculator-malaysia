import QuitRentCalculator from "@/components/QuitRentCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Quit Rent Calculator Malaysia 2026 (Cukai Tanah) | Calculator Malaysia",
  description:
    "Calculate quit rent (cukai tanah) for all Malaysian states. Check rates for Selangor, KL, Penang, Johor & more. See payment deadlines and penalty info.",
  keywords: [
    "quit rent calculator",
    "cukai tanah calculator",
    "quit rent selangor",
    "cukai tanah selangor",
    "land tax malaysia",
    "quit rent payment online",
    "cukai tanah rate",
    "property tax malaysia",
  ],
};

export default function QuitRentCalculatorPage() {
  return (
    <div>
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to All Calculators
          </Link>
        </div>
      </div>

      <QuitRentCalculator />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Quit Rent (Cukai Tanah) Malaysia: Complete Guide for Property Owners
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              If you own property in Malaysia, you&apos;re required to pay quit rent (cukai tanah)
              annually. This guide explains everything you need to know about quit rent – what it is,
              how much you&apos;ll pay, and how to pay it online.
            </p>

            {/* What is Quit Rent */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              What is Quit Rent (Cukai Tanah)?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Quit rent is an annual tax paid by landowners to the state government for the use of
              land. It&apos;s called &quot;cukai tanah&quot; in Malay and applies to all types of
              land – residential, commercial, agricultural, and industrial.
            </p>

            <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 my-6">
              <p className="font-semibold text-purple-800 mb-3">Key Points About Quit Rent:</p>
              <ul className="text-slate-600 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>Payable <strong>annually</strong> to the State Land Office (Pejabat Tanah)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>Based on <strong>land area</strong>, not property value or building size</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>Rates vary by <strong>state, district (mukim), and land category</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>Must be paid even if the land is empty or undeveloped</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>Failure to pay can result in <strong>land forfeiture</strong></span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="font-semibold text-amber-800 mb-2">Important:</p>
              <p className="text-slate-600 text-sm">
                Quit rent is different from assessment tax (cukai taksiran/cukai pintu). Assessment
                tax is paid to the local council (majlis/DBKL), while quit rent is paid to the state
                land office. You need to pay <strong>both</strong> as a property owner.
              </p>
            </div>

            {/* Quit Rent Rates by State */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Quit Rent Rates by State (2026 Estimates)
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Quit rent rates are set by each state and vary significantly. Here are approximate
              rates for residential properties:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">State</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Residential Rate</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Commercial Rate</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Deadline</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr className="bg-purple-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Selangor</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.035/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.10/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">31 May</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Kuala Lumpur</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.04/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.12/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">28/29 Feb</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Penang</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.03/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.08/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">31 May</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Johor</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.025/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.07/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">31 May</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Perak</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.02/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.06/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">31 May</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Negeri Sembilan</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.025/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.07/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">31 May</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Melaka</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.028/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.075/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">31 May</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Sabah</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.022/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.06/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">31 May</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Sarawak</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.02/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">~RM0.055/sq ft</td>
                    <td className="border border-slate-200 px-4 py-3">31 May</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-500">
              *Rates are approximate and may vary by district (mukim). Agricultural and industrial
              properties have different rates. Always check with your state land office for exact
              amounts.
            </p>

            {/* How to Check Your Quit Rent */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              How to Check Your Quit Rent Amount
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              There are several ways to find out exactly how much quit rent you owe:
            </p>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-semibold text-slate-800">1. Check Your Land Title (Geran)</p>
                <p className="text-slate-600 text-base">
                  Your land title document shows the annual quit rent amount. Look for
                  &quot;Cukai Tahunan&quot; or &quot;Rent&quot; on the document.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-semibold text-slate-800">2. Visit the State Land Office Portal</p>
                <p className="text-slate-600 text-base">
                  Most states have online systems where you can check and pay quit rent. You&apos;ll
                  need your land title number (no. hakmilik) or lot number.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-semibold text-slate-800">3. Check Your Payment Bill</p>
                <p className="text-slate-600 text-base">
                  Some states send annual bills to property owners. Check your mail around January-March
                  each year.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-semibold text-slate-800">4. Visit Pejabat Tanah</p>
                <p className="text-slate-600 text-base">
                  Go to your district land office (Pejabat Tanah Daerah) with your land title number
                  to enquire in person.
                </p>
              </div>
            </div>

            {/* How to Pay Quit Rent Online */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              How to Pay Quit Rent Online (Step by Step)
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Most Malaysian states now offer online quit rent payment. Here&apos;s how to pay for
              major states:
            </p>

            {/* Selangor */}
            <div className="bg-slate-50 rounded-xl p-6 my-6">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-xl">🏛️</span> Selangor (e-Bayar Selangor)
              </h4>
              <ol className="text-slate-600 text-sm space-y-2 list-decimal list-inside">
                <li>Go to <strong>ebayar.selangor.gov.my</strong></li>
                <li>Select &quot;Cukai Tanah&quot; under Pejabat Tanah dan Galian</li>
                <li>Enter your land title number (No. Hakmilik) or lot number</li>
                <li>Verify the amount and property details</li>
                <li>Pay using FPX, credit card, or JomPAY</li>
                <li>Save your receipt for records</li>
              </ol>
            </div>

            {/* Kuala Lumpur */}
            <div className="bg-slate-50 rounded-xl p-6 my-6">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-xl">🏛️</span> Kuala Lumpur (DBKL e-Services)
              </h4>
              <ol className="text-slate-600 text-sm space-y-2 list-decimal list-inside">
                <li>Go to <strong>ptgwp.kl.gov.my</strong> or <strong>ehasil.hasil.gov.my</strong></li>
                <li>Register or log in to your account</li>
                <li>Select &quot;Cukai Tanah&quot; payment</li>
                <li>Enter your property details or title number</li>
                <li>Verify and proceed to payment</li>
                <li>Download receipt after successful payment</li>
              </ol>
              <p className="text-xs text-slate-500 mt-3">
                Note: KL quit rent is managed by the Federal Territory Land Office (Pejabat Tanah
                dan Galian Wilayah Persekutuan).
              </p>
            </div>

            {/* Penang */}
            <div className="bg-slate-50 rounded-xl p-6 my-6">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-xl">🏛️</span> Penang (e-Bayar Penang)
              </h4>
              <ol className="text-slate-600 text-sm space-y-2 list-decimal list-inside">
                <li>Go to <strong>ebayar.penang.gov.my</strong></li>
                <li>Select &quot;Pejabat Tanah dan Galian&quot;</li>
                <li>Choose &quot;Cukai Tanah&quot;</li>
                <li>Enter your lot number and mukim</li>
                <li>Check the amount and pay online</li>
              </ol>
            </div>

            {/* Johor */}
            <div className="bg-slate-50 rounded-xl p-6 my-6">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-xl">🏛️</span> Johor (PTG Johor)
              </h4>
              <ol className="text-slate-600 text-sm space-y-2 list-decimal list-inside">
                <li>Go to <strong>ptgj.johor.gov.my</strong></li>
                <li>Navigate to e-Services or online payment</li>
                <li>Enter your title number or account number</li>
                <li>Verify details and make payment</li>
              </ol>
            </div>

            {/* Other Payment Methods */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Other Payment Methods
            </h3>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">🏧 Self-Service Kiosk</p>
                <p className="text-slate-600 text-sm">
                  Many state land offices have self-service kiosks. Bring your title number and pay
                  using cash or card.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">🏢 Counter Payment</p>
                <p className="text-slate-600 text-sm">
                  Visit your district land office (Pejabat Tanah) during working hours. Bring your
                  title number and previous receipts.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">📱 JomPAY / FPX</p>
                <p className="text-slate-600 text-sm">
                  Available through most online banking apps. Search for your state land office as
                  the biller.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">🏦 Post Office</p>
                <p className="text-slate-600 text-sm">
                  Some post offices accept quit rent payments. Check with Pos Malaysia for
                  participating branches.
                </p>
              </div>
            </div>

            {/* Late Payment Penalty */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Late Payment Penalty
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Missing the payment deadline results in penalties, and prolonged non-payment can lead
              to serious consequences:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Duration</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Typical Penalty</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Consequence</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">1 month late</td>
                    <td className="border border-slate-200 px-4 py-3 text-amber-600">5-6% of amount due</td>
                    <td className="border border-slate-200 px-4 py-3">Penalty added to bill</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">2-12 months late</td>
                    <td className="border border-slate-200 px-4 py-3 text-amber-600">+1% per month (varies)</td>
                    <td className="border border-slate-200 px-4 py-3">Accumulating penalties</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">3+ years unpaid</td>
                    <td className="border border-slate-200 px-4 py-3 text-red-600">Full arrears + penalties</td>
                    <td className="border border-slate-200 px-4 py-3 text-red-600 font-medium">Risk of land forfeiture</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-5 my-6">
              <p className="font-semibold text-red-800 mb-2">⚠️ Land Forfeiture Warning</p>
              <p className="text-slate-600 text-sm">
                Under the National Land Code, if quit rent remains unpaid for more than 3 years, the
                State Authority can issue a notice of demand. If still unpaid, the land can be
                forfeited (dirampas) and ownership revoked. Always pay your quit rent on time!
              </p>
            </div>

            {/* Quit Rent vs Assessment Tax */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Quit Rent vs Assessment Tax: What&apos;s the Difference?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Many property owners confuse quit rent (cukai tanah) with assessment tax (cukai taksiran).
              Here&apos;s how they differ:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Aspect</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Quit Rent (Cukai Tanah)</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Assessment Tax (Cukai Taksiran)</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Paid To</td>
                    <td className="border border-slate-200 px-4 py-3">State Land Office (Pejabat Tanah)</td>
                    <td className="border border-slate-200 px-4 py-3">Local Council (Majlis/DBKL/MBPJ)</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Based On</td>
                    <td className="border border-slate-200 px-4 py-3">Land area (sq ft)</td>
                    <td className="border border-slate-200 px-4 py-3">Annual rental value of property</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Purpose</td>
                    <td className="border border-slate-200 px-4 py-3">Tax for using the land</td>
                    <td className="border border-slate-200 px-4 py-3">Funding local services (roads, drains, waste)</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Payment</td>
                    <td className="border border-slate-200 px-4 py-3">Once a year (by May 31)</td>
                    <td className="border border-slate-200 px-4 py-3">Twice a year (Feb & Aug typically)</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Amount</td>
                    <td className="border border-slate-200 px-4 py-3">Usually RM50-200/year for homes</td>
                    <td className="border border-slate-200 px-4 py-3">Usually RM500-2,000/year for homes</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Other Names</td>
                    <td className="border border-slate-200 px-4 py-3">Land tax, cukai petak</td>
                    <td className="border border-slate-200 px-4 py-3">Cukai pintu, rates</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5 my-6">
              <p className="font-semibold text-purple-800 mb-2">Remember:</p>
              <p className="text-slate-600 text-sm">
                As a property owner, you must pay <strong>both</strong> quit rent and assessment tax.
                They are two separate bills from different government bodies. Missing either can
                result in penalties.
              </p>
            </div>

            {/* FAQ Section */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Frequently Asked Questions
            </h3>

            <div className="space-y-6 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Do I pay quit rent if I own a condo or apartment?
                </p>
                <p className="text-slate-600 text-sm">
                  For strata properties (condos, apartments), the quit rent is usually paid
                  collectively by the management corporation (MC) and included in your maintenance
                  fees. Individual strata owners typically don&apos;t pay quit rent directly.
                  However, for landed strata (townhouses), you may need to pay separately.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Can I claim quit rent as a tax deduction?
                </p>
                <p className="text-slate-600 text-sm">
                  If you rent out your property, quit rent can be claimed as an expense against
                  rental income. For owner-occupied homes, quit rent is not tax deductible.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  What if I just bought the property mid-year?
                </p>
                <p className="text-slate-600 text-sm">
                  Quit rent is typically the responsibility of whoever owns the property at the
                  time of billing. During property transactions, this is usually pro-rated between
                  buyer and seller through the lawyer.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  How do I know my land title number?
                </p>
                <p className="text-slate-600 text-sm">
                  Your land title number (No. Hakmilik) is printed on your land title document
                  (geran tanah). If you have a mortgage, the bank holds the original, but you
                  should have a copy. It&apos;s also on your S&P agreement and previous quit rent
                  receipts.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  What if I lost my previous quit rent receipts?
                </p>
                <p className="text-slate-600 text-sm">
                  Visit your district land office with your IC and property address. They can look
                  up your payment history and issue replacement receipts if needed.
                </p>
              </div>
            </div>

            {/* Tips Section */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Tips for Property Owners
            </h3>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-semibold text-slate-800">1. Set a payment reminder</p>
                <p className="text-slate-600 text-base">
                  Mark your calendar for April each year to pay quit rent before the May 31 deadline.
                  Better early than late!
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-semibold text-slate-800">2. Keep all receipts</p>
                <p className="text-slate-600 text-base">
                  Store quit rent receipts safely. You&apos;ll need proof of payment when selling
                  your property or for any land office matters.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-semibold text-slate-800">3. Register for e-billing</p>
                <p className="text-slate-600 text-base">
                  Many states offer email notifications when your bill is due. Register on your
                  state&apos;s land office portal.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-semibold text-slate-800">4. Check for arrears when buying property</p>
                <p className="text-slate-600 text-base">
                  Always verify quit rent and assessment tax status during property purchase. Your
                  lawyer should do this as part of due diligence.
                </p>
              </div>
            </div>

            {/* Related Calculators */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Related Calculators for Property Owners
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              If you&apos;re a property owner, these calculators might also help you manage your
              finances:
            </p>

            <div className="grid md:grid-cols-3 gap-4 my-6">
              <Link
                href="/loan/early-housing-loan-settlement-calculator-malaysia/"
                className="block bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-start gap-2">
                  <div className="text-2xl">🏠</div>
                  <div>
                    <p className="font-semibold text-green-800">Early Housing Loan Settlement Calculator</p>
                    <p className="text-sm text-slate-600 mt-1">
                      Find out if settling your housing loan early saves money. Calculate penalties
                      vs interest savings.
                    </p>
                    <span className="text-sm text-green-600 font-medium mt-2 inline-block">
                      Calculate now →
                    </span>
                  </div>
                </div>
              </Link>
              <Link
                href="/loan/home-loan-eligibility-calculator/"
                className="block bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-start gap-2">
                  <div className="text-2xl">🏦</div>
                  <div>
                    <p className="font-semibold text-blue-800">Home Loan Eligibility Calculator</p>
                    <p className="text-sm text-slate-600 mt-1">
                      Check how much housing loan you qualify for based on your income and existing
                      commitments.
                    </p>
                    <span className="text-sm text-blue-600 font-medium mt-2 inline-block">
                      Check eligibility →
                    </span>
                  </div>
                </div>
              </Link>
              <Link
                href="/loan/housing-loan-calculator/"
                className="block bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-start gap-2">
                  <div className="text-2xl">🏡</div>
                  <div>
                    <p className="font-semibold text-purple-800">Housing Loan Calculator</p>
                    <p className="text-sm text-slate-600 mt-1">
                      Calculate monthly installment for your dream home. See total interest and
                      amortization schedule.
                    </p>
                    <span className="text-sm text-purple-600 font-medium mt-2 inline-block">
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
