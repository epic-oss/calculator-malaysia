import type { Metadata } from "next";
import JointHomeLoanCalculator from "@/components/JointHomeLoanCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Joint Home Loan Calculator Malaysia 2026 | Couples & Co-Borrowers",
  description:
    "Calculate joint home loan eligibility for couples and co-borrowers in Malaysia. Compare individual vs joint borrowing power. Free instant results.",
  keywords: [
    "joint home loan calculator malaysia",
    "joint housing loan eligibility",
    "couple home loan calculator",
    "co-borrower loan calculator",
    "combined income loan eligibility",
    "joint property loan malaysia",
    "married couple loan calculator",
    "dual income mortgage calculator",
    "joint dsr calculator",
    "housing loan for couples",
  ],
  openGraph: {
    title: "Joint Home Loan Calculator Malaysia 2026",
    description:
      "Calculate combined loan eligibility for couples and co-borrowers. Compare individual vs joint borrowing power.",
    type: "website",
    locale: "en_MY",
  },
};

export default function JointHomeLoanCalculatorPage() {
  return (
    <>
      <JointHomeLoanCalculator />

      {/* SEO Content Section */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/#loan" className="hover:text-blue-600">
              Loan Calculators
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800">Joint Home Loan Calculator</span>
          </nav>

          <article className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              What is a Joint Home Loan?
            </h2>

            <p className="text-slate-600 mb-6">
              A joint home loan is a housing loan where two or more individuals apply together and
              share responsibility for repayment. In Malaysia, joint ownership runs as{" "}
              <strong>tenancy-in-common</strong> under Section 343(1)(a) of the National Land Code,
              where each owner&apos;s shares are divided and treated as separate.
            </p>

            <p className="text-slate-600 mb-6">
              By combining incomes, couples and co-borrowers can significantly increase their
              borrowing capacity, making it possible to afford properties that would be out of reach
              for a single applicant.
            </p>

            {/* Who Can Be a Co-Borrower */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">👥</span>
                Who Can Be a Co-Borrower?
              </h3>

              <p className="text-slate-600 mb-4">
                Malaysian banks accept joint applications from:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4">
                  <p className="font-semibold text-emerald-800 mb-2">✅ Usually Accepted:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• <strong>Married couples</strong> (most common)</li>
                    <li>• <strong>Parent and child</strong> (child usually primary owner)</li>
                    <li>• <strong>Siblings</strong> (must be co-owners)</li>
                  </ul>
                </div>
                <div className="bg-red-50 rounded-xl p-4">
                  <p className="font-semibold text-red-800 mb-2">❌ Generally NOT Accepted:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Friends (non-family)</li>
                    <li>• Unmarried partners (limited acceptance)</li>
                    <li>• Business partners (for residential)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Friends or unmarried couples living together are generally
                  NOT allowed to take joint housing loans by most Malaysian banks. Some Islamic
                  banks may have different policies.
                </p>
              </div>
            </div>

            {/* Benefits of Joint Home Loan */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Benefits of Joint Home Loan
              </h3>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">1. Higher Borrowing Capacity</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Combined incomes significantly increase your loan eligibility. Two incomes of
                    RM5,000 each can qualify for almost double what one person earning RM5,000 could
                    get alone.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">2. Easier Loan Approval</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Higher combined income means better DSR, increasing approval chances even if one
                    applicant has moderate credit or income.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">3. Shared Down Payment</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Split the 10% down payment and upfront costs (legal fees, stamp duty) with your
                    partner, reducing individual financial burden.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">4. Shared Repayment Burden</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Monthly instalments are a joint responsibility, making it easier to manage
                    household finances and reducing individual stress.
                  </p>
                </div>
              </div>
            </div>

            {/* Important Considerations */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                Important Considerations Before Applying
              </h3>

              <div className="space-y-4">
                {/* MOF Impact */}
                <div className="bg-white rounded-xl p-4 border-l-4 border-amber-500">
                  <p className="font-semibold text-slate-800">Margin of Finance (MOF) Impact</p>
                  <p className="text-sm text-slate-600 mt-1">
                    According to Bank Negara Malaysia rules:
                  </p>
                  <ul className="text-sm text-slate-600 mt-2 space-y-1">
                    <li>• <strong>First two properties:</strong> Up to 90% loan</li>
                    <li>• <strong>Third property onwards:</strong> Limited to 70%</li>
                  </ul>
                  <p className="text-sm text-red-600 mt-2 font-medium">
                    ⚠️ If you use your 90% MOF eligibility on a joint purchase, you lose it for
                    future individual purchases. Consider this carefully.
                  </p>
                </div>

                {/* First-Time Buyer Benefits */}
                <div className="bg-white rounded-xl p-4 border-l-4 border-blue-500">
                  <p className="font-semibold text-slate-800">First-Time Buyer Benefits Lost</p>
                  <p className="text-sm text-slate-600 mt-1">
                    If both applicants are first-time buyers, only ONE can use the first-time buyer
                    benefits (stamp duty exemption for properties ≤RM500,000).
                  </p>
                  <p className="text-sm text-blue-600 mt-2">
                    Buying separately means BOTH can use their exemptions on two different
                    properties.
                  </p>
                </div>

                {/* Credit Score Linked */}
                <div className="bg-white rounded-xl p-4 border-l-4 border-red-500">
                  <p className="font-semibold text-slate-800">Credit Scores Are Linked</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Both applicants&apos; CCRIS and CTOS scores are checked.{" "}
                    <strong className="text-red-600">
                      If one partner has bad credit, it can cause rejection
                    </strong>{" "}
                    even if the other has excellent credit.
                  </p>
                </div>

                {/* Joint Liability */}
                <div className="bg-white rounded-xl p-4 border-l-4 border-purple-500">
                  <p className="font-semibold text-slate-800">Joint Liability</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Both parties are equally responsible for the entire loan. If one defaults, the
                    other must pay the full amount - not just their &quot;share&quot;.
                  </p>
                </div>
              </div>
            </div>

            {/* Ownership Structure */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📜</span>
                Ownership Structure in Malaysia
              </h3>

              <div className="bg-white rounded-xl p-4">
                <h4 className="font-semibold text-slate-800 mb-2">
                  Tenancy-in-Common (Malaysia Default)
                </h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>
                    • <strong>Shares can be divided unequally</strong> (e.g., 60/40, 70/30)
                  </li>
                  <li>
                    • Each owner can sell or transfer their share independently
                  </li>
                  <li>
                    • Upon death, share goes to estate/heirs (not automatically to co-owner)
                  </li>
                  <li>
                    • Ownership percentages should be documented in the SPA
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Discuss and agree on ownership percentages before signing
                  any documents. This affects property rights, tax implications, and what happens
                  in case of separation.
                </p>
              </div>
            </div>

            {/* Insurance for Joint Loans */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🛡️</span>
                Insurance for Joint Loans
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800 mb-2">MRTA (Reducing)</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Covers the bank if borrower dies/disabled</li>
                    <li>• Joint coverage available</li>
                    <li>• Coverage decreases as loan reduces</li>
                    <li>• One-time premium, cheaper</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800 mb-2">MLTA (Level)</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Pays off loan upon death/disability</li>
                    <li>• Each co-borrower should have coverage</li>
                    <li>• Coverage stays constant</li>
                    <li>• Builds cash value over time</li>
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mt-4">
                <p className="text-sm text-emerald-800">
                  <strong>Important:</strong> With proper insurance, if one co-owner can&apos;t pay
                  due to death or disability, the insurance covers their portion. Both parties
                  should be adequately insured.
                </p>
              </div>
            </div>

            {/* What If Relationship Ends */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">💔</span>
                What If the Relationship Ends?
              </h3>

              <p className="text-slate-600 mb-4">
                Options if joint owners separate or divorce:
              </p>

              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">1. Sell the Property</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Split proceeds according to ownership share. Cleanest option if both agree.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">2. One Party Buys Out the Other</p>
                  <p className="text-sm text-slate-600 mt-1">
                    One owner refinances in their name only and pays the other their share. Requires
                    new loan approval.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800">3. Continue Joint Ownership</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Rent out the property and split income. Requires cooperation and clear
                    agreements.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                <p className="text-sm text-amber-800">
                  <strong>Advice:</strong> Discuss exit strategy before committing to joint
                  purchase. Consider a formal agreement outlining what happens in various scenarios.
                </p>
              </div>
            </div>

            {/* When Joint Loan Makes Sense */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                When Joint Loan Makes Sense
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4">
                  <p className="font-semibold text-emerald-800 mb-2">Apply Jointly When:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Single income not enough for desired property</li>
                    <li>• Both have stable employment</li>
                    <li>• Both have clean credit records (CCRIS/CTOS)</li>
                    <li>• Long-term committed relationship</li>
                    <li>• Clear agreement on ownership shares</li>
                    <li>• Both willing to share liability</li>
                  </ul>
                </div>
                <div className="bg-red-50 rounded-xl p-4">
                  <p className="font-semibold text-red-800 mb-2">Apply Separately When:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• One applicant has bad credit score</li>
                    <li>• One has high existing commitments</li>
                    <li>• Uncertain relationship status</li>
                    <li>• Want to preserve first-time buyer benefits</li>
                    <li>• One already owns 2+ properties</li>
                    <li>• Planning separate investments</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Documents Required */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Documents Required (Both Applicants)
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800 mb-2">Personal Documents:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• IC (MyKad) - front and back</li>
                    <li>• Latest 3 months payslip</li>
                    <li>• Latest 6 months bank statements</li>
                    <li>• EA form / Income tax returns</li>
                    <li>• EPF statements</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold text-slate-800 mb-2">Relationship Proof:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Marriage certificate (if spouse)</li>
                    <li>• Birth certificate (if parent-child)</li>
                    <li>• Family register (if siblings)</li>
                    <li>• Statutory declaration (if required)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Banks Offering Joint Home Loans */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🏦</span>
                Banks Offering Joint Home Loans in Malaysia
              </h3>

              <p className="text-slate-600 mb-4">
                Most major banks in Malaysia offer joint home loans:
              </p>

              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  "Maybank",
                  "CIMB Bank",
                  "Public Bank",
                  "RHB Bank",
                  "Hong Leong Bank",
                  "HSBC",
                  "Bank Islam",
                  "AmBank",
                  "OCBC",
                ].map((bank) => (
                  <div
                    key={bank}
                    className="bg-white rounded-lg p-3 text-center text-sm text-slate-700 border border-slate-200"
                  >
                    {bank}
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Government Servants:</strong> The Joint Home Financing Scheme is available
                  through LPPSA with Bank Islam or Bank Simpanan Nasional as second mortgagee.
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
                    Can unmarried couples get a joint home loan?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Most conventional banks in Malaysia do not accept unmarried couples for joint
                    home loans. Some Islamic banks may have different policies. It&apos;s best to
                    check with individual banks for their specific requirements.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    What ownership split should we choose?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Common splits are 50/50 for married couples. However, you can choose any
                    percentage based on contribution or agreement. Consider tax implications and
                    what happens in case of separation. Consult a lawyer for advice.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    If one person defaults, what happens?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Both parties are jointly and severally liable for the entire loan. If one person
                    stops paying, the other must cover the full payment, not just their share. The
                    bank can pursue either or both parties for the full amount.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    Can I remove my name from a joint loan?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    To remove your name, the other party must refinance the loan in their name only.
                    This requires them to qualify for the loan individually and involves legal fees
                    and documentation. The bank must approve the transfer.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    Does joint loan affect my credit score?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Yes, the loan appears on both applicants&apos; CCRIS records. Timely payments
                    help both credit scores, while late payments hurt both. Even after selling, the
                    loan history remains on your record.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-4 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer">
                    Can parents and children apply together?
                  </summary>
                  <p className="text-sm text-slate-600 mt-2">
                    Yes, parent-child joint applications are accepted by most banks. The child is
                    usually the primary borrower (determines tenure based on age), and the parent
                    acts as co-borrower. Both must meet eligibility criteria.
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
                  href="/loan/home-loan-eligibility-calculator-malaysia/"
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏦</span>
                    <div>
                      <p className="font-semibold text-slate-800">Individual Eligibility</p>
                      <p className="text-xs text-slate-500">
                        Check your solo loan eligibility
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/loan/housing-loan-calculator-malaysia/"
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏡</span>
                    <div>
                      <p className="font-semibold text-slate-800">Housing Loan Calculator</p>
                      <p className="text-xs text-slate-500">
                        Calculate monthly instalment
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/loan/early-housing-loan-settlement-calculator-malaysia/"
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏠</span>
                    <div>
                      <p className="font-semibold text-slate-800">Early Settlement Calculator</p>
                      <p className="text-xs text-slate-500">Check if settling early saves money</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/salary/monthly-salary-calculator/"
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="font-semibold text-slate-800">Salary Calculator</p>
                      <p className="text-xs text-slate-500">Calculate your net take-home pay</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-slate-100 rounded-xl p-4 mt-8">
              <p className="text-xs text-slate-500">
                <strong>Disclaimer:</strong> This calculator provides estimates only. Actual joint
                loan approval depends on both applicants&apos; credit profiles, employment
                stability, existing commitments, and bank policies. Different banks may have
                different DSR thresholds and requirements for co-borrowers. Consult with a bank
                officer or mortgage specialist for accurate eligibility assessment.
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
