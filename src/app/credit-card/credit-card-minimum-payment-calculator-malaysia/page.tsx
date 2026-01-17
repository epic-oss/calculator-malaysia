import CreditCardMinimumPaymentCalculator from "@/components/CreditCardMinimumPaymentCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Credit Card Minimum Payment Calculator Malaysia 2026 | Calculator Malaysia",
  description:
    "Calculate how long it takes to pay off credit card debt with minimum payments. See total interest cost and compare faster payoff options.",
  keywords: [
    "credit card minimum payment calculator",
    "credit card payoff calculator malaysia",
    "credit card interest calculator",
    "minimum payment trap",
    "credit card debt calculator",
    "balance transfer malaysia",
  ],
};

export default function CreditCardMinimumPaymentCalculatorPage() {
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

      <CreditCardMinimumPaymentCalculator />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Credit Card Minimum Payment: The Debt Trap Explained
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              That small minimum payment on your credit card statement might seem convenient, but
              it&apos;s actually designed to keep you in debt longer. This guide explains why paying
              only the minimum is dangerous and what you can do to escape the credit card debt trap.
            </p>

            {/* Why Minimum Payment is a Trap */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Why Minimum Payment is a Debt Trap
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              When you pay only the minimum, most of your payment goes toward interest, not your
              actual debt. Here&apos;s what happens:
            </p>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6 my-6">
              <p className="font-semibold text-red-800 mb-3">Example: RM10,000 Credit Card Debt at 18% Interest</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-700">
                  <span>Paying 5% minimum:</span>
                  <span className="font-medium">Takes <strong className="text-red-600">9+ years</strong> to pay off</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Total interest paid:</span>
                  <span className="font-medium text-red-600">RM 6,000+ (60% of original debt!)</span>
                </div>
                <div className="flex justify-between text-slate-700 pt-2 border-t border-red-200">
                  <span>Total amount paid:</span>
                  <span className="font-bold text-red-700">RM 16,000+</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-semibold text-slate-800">1. Interest compounds monthly</p>
                <p className="text-slate-600 text-base">
                  At 18% annual rate, you&apos;re charged 1.5% interest every month. On a RM10,000
                  balance, that&apos;s RM150 in interest alone – before touching your principal.
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-semibold text-slate-800">2. Minimum payment decreases as balance drops</p>
                <p className="text-slate-600 text-base">
                  If your minimum is 5% of balance, it gets smaller every month. Smaller payments
                  = slower progress = more interest.
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-semibold text-slate-800">3. Banks profit from your debt</p>
                <p className="text-slate-600 text-base">
                  Credit card companies make money from interest. The longer you take to pay off,
                  the more they earn. Minimum payments are designed to maximize their profit.
                </p>
              </div>
            </div>

            {/* How Credit Card Interest Works */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              How Credit Card Interest is Calculated
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Understanding how interest works helps you see why debt grows so fast:
            </p>

            <div className="bg-slate-50 rounded-xl p-6 my-6">
              <p className="font-semibold text-slate-800 mb-3">Interest Calculation Formula:</p>
              <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
                <p className="text-lg font-mono text-slate-700">
                  Monthly Interest = Balance × (Annual Rate ÷ 12)
                </p>
              </div>
              <div className="mt-4 text-sm text-slate-600">
                <p className="font-medium mb-2">Example with RM10,000 at 18% p.a.:</p>
                <ul className="space-y-1">
                  <li>• Monthly rate: 18% ÷ 12 = <strong>1.5%</strong></li>
                  <li>• Month 1 interest: RM10,000 × 1.5% = <strong>RM150</strong></li>
                  <li>• If you pay RM500: RM150 goes to interest, only RM350 reduces your debt</li>
                </ul>
              </div>
            </div>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Type of Transaction</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Interest Rate</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">When It Applies</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Retail purchases</td>
                    <td className="border border-slate-200 px-4 py-3">15-18% p.a.</td>
                    <td className="border border-slate-200 px-4 py-3">If not paid in full by due date</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">Cash advance</td>
                    <td className="border border-slate-200 px-4 py-3 text-red-600 font-medium">18-20% p.a.</td>
                    <td className="border border-slate-200 px-4 py-3">Immediately (no grace period)</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Balance transfer</td>
                    <td className="border border-slate-200 px-4 py-3 text-emerald-600 font-medium">0-6% p.a.</td>
                    <td className="border border-slate-200 px-4 py-3">Promotional period only</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="font-semibold text-amber-800 mb-2">Avoid Cash Advances!</p>
              <p className="text-slate-600 text-sm">
                Cash advances from credit cards have no grace period – interest starts immediately.
                Plus, there&apos;s usually a 5% fee on top. If you need cash, a personal loan is
                almost always cheaper.
              </p>
            </div>

            {/* Balance Transfer Explained */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Balance Transfer: A Smarter Way to Pay Off Debt
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Balance transfer lets you move your credit card debt to a new card with 0% interest
              for a promotional period (usually 6-12 months). This gives you breathing room to
              pay off principal without interest eating your payments.
            </p>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 my-6">
              <p className="font-semibold text-emerald-800 mb-3">How Balance Transfer Works:</p>
              <ol className="text-slate-600 text-sm space-y-2 list-decimal list-inside">
                <li>Apply for a balance transfer credit card</li>
                <li>Transfer your existing debt to the new card</li>
                <li>Pay a one-time transfer fee (usually 3-5%)</li>
                <li>Enjoy 0% interest for the promotional period</li>
                <li>Pay off as much as possible before the period ends</li>
              </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-emerald-700 mb-2">✓ Pros</p>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• 0% interest = all payment goes to principal</li>
                  <li>• Can save thousands in interest</li>
                  <li>• Clear end date motivates faster payoff</li>
                </ul>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-red-700 mb-2">✗ Cons</p>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• Transfer fee adds to debt (3-5%)</li>
                  <li>• High interest after promo period ends</li>
                  <li>• New purchases may have different rates</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 my-6">
              <p className="font-semibold text-blue-800 mb-2">Best Strategy for Balance Transfer:</p>
              <p className="text-slate-600 text-sm">
                Divide your total debt by the number of promotional months. Pay that fixed amount
                every month. For example: RM12,000 debt ÷ 12 months = RM1,000/month. Don&apos;t use
                the card for new purchases – focus solely on paying off the transferred balance.
              </p>
            </div>

            {/* Debt Consolidation */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Debt Consolidation with Personal Loan
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Another option is taking a personal loan to pay off your credit card. This makes
              sense when:
            </p>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">Personal loan interest is much lower</p>
                <p className="text-slate-600 text-base">
                  Credit cards charge 15-18% p.a. Personal loans start from 6-8% p.a. On RM20,000
                  debt, this difference saves you thousands.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">Fixed monthly payments</p>
                <p className="text-slate-600 text-base">
                  Unlike credit cards where minimum payments fluctuate, personal loans have fixed
                  installments. You know exactly when you&apos;ll be debt-free.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-slate-800">Forces discipline</p>
                <p className="text-slate-600 text-base">
                  Credit cards tempt you to keep spending. A personal loan is purely for paying off
                  debt – there&apos;s no available credit to misuse.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Factor</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Credit Card</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Personal Loan</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Interest Rate</td>
                    <td className="border border-slate-200 px-4 py-3 text-red-600">15-18% p.a.</td>
                    <td className="border border-slate-200 px-4 py-3 text-emerald-600">6-12% p.a.</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Payment Type</td>
                    <td className="border border-slate-200 px-4 py-3">Variable (minimum %)</td>
                    <td className="border border-slate-200 px-4 py-3">Fixed monthly</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3 font-medium">Payoff Timeline</td>
                    <td className="border border-slate-200 px-4 py-3">Uncertain (years)</td>
                    <td className="border border-slate-200 px-4 py-3">Fixed (1-7 years)</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium">Discipline Required</td>
                    <td className="border border-slate-200 px-4 py-3">High (temptation to spend)</td>
                    <td className="border border-slate-200 px-4 py-3">Low (auto-debit)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Tips to Pay Off Faster */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              7 Tips to Pay Off Credit Card Debt Faster
            </h3>

            <div className="space-y-4 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">1. Pay more than the minimum</p>
                <p className="text-slate-600 text-sm">
                  Even an extra RM100/month makes a huge difference. Use our calculator to see how
                  much time and interest you&apos;ll save.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">2. Use the avalanche method</p>
                <p className="text-slate-600 text-sm">
                  If you have multiple cards, pay minimum on all, then put extra toward the
                  highest-interest card first. This saves the most money mathematically.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">3. Or try the snowball method</p>
                <p className="text-slate-600 text-sm">
                  Pay off the smallest balance first for quick wins and motivation. Less
                  mathematically optimal, but psychologically effective.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">4. Stop using the card</p>
                <p className="text-slate-600 text-sm">
                  Put the card in a drawer or freeze it (literally). Every new purchase sets you
                  back. Switch to debit or cash until you&apos;re debt-free.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">5. Negotiate a lower rate</p>
                <p className="text-slate-600 text-sm">
                  Call your bank and ask for a rate reduction. If you have good payment history,
                  they may agree. Even 2-3% less helps.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">6. Use windfalls wisely</p>
                <p className="text-slate-600 text-sm">
                  Bonus, tax refund, or birthday money? Put at least 50% toward your debt before
                  spending on wants.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">7. Consider balance transfer or personal loan</p>
                <p className="text-slate-600 text-sm">
                  If your debt is large (RM10,000+), moving to a lower-interest option can save
                  you thousands. Use our calculators to compare options.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Frequently Asked Questions
            </h3>

            <div className="space-y-6 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  What happens if I only pay the minimum every month?
                </p>
                <p className="text-slate-600 text-sm">
                  You&apos;ll stay in debt for years and pay more in interest than your original
                  balance. For a RM10,000 debt at 18%, paying only 5% minimum takes over 9 years
                  and costs RM6,000+ in interest.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Will missing the minimum payment affect my credit score?
                </p>
                <p className="text-slate-600 text-sm">
                  Yes. Late payments are reported to CCRIS/CTOS and can damage your credit score
                  for years. Always pay at least the minimum on time. Set up auto-debit to avoid
                  forgetting.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Is balance transfer better than personal loan?
                </p>
                <p className="text-slate-600 text-sm">
                  Balance transfer is better for short-term (you can pay off within 6-12 months).
                  Personal loan is better for larger debts or if you need a longer, structured
                  repayment plan with fixed installments.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">
                  Why is 5% minimum payment the standard in Malaysia?
                </p>
                <p className="text-slate-600 text-sm">
                  Bank Negara Malaysia requires a minimum 5% payment (up from previous 3%) to
                  prevent consumers from falling into perpetual debt. Some banks may have different
                  minimums – check your card terms.
                </p>
              </div>
            </div>

            {/* Final CTA */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mt-12">
              <p className="font-semibold text-orange-800 mb-2">Take Action Today</p>
              <p className="text-slate-600 text-base">
                Use the calculator above to see the true cost of minimum payments. Then make a
                plan – whether it&apos;s paying more each month, balance transfer, or debt
                consolidation. The sooner you start, the more you&apos;ll save.
              </p>
            </div>

            {/* Related Calculators */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Related Calculators
            </h3>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <Link
                href="/loan/personal-loan-calculator-malaysia/"
                className="block bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💵</div>
                  <div>
                    <p className="font-semibold text-green-800">Personal Loan Calculator</p>
                    <p className="text-sm text-slate-600 mt-1">
                      Compare loan options for debt consolidation. See monthly payments and total
                      interest at lower rates.
                    </p>
                    <span className="text-sm text-green-600 font-medium mt-2 inline-block">
                      Calculate now →
                    </span>
                  </div>
                </div>
              </Link>
              <Link
                href="/credit-card/interest-calculator/"
                className="block bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📈</div>
                  <div>
                    <p className="font-semibold text-orange-800">Credit Card Interest Calculator</p>
                    <p className="text-sm text-slate-600 mt-1">
                      Calculate how much interest you&apos;re paying on your credit card balance
                      each month.
                    </p>
                    <span className="text-sm text-orange-600 font-medium mt-2 inline-block">
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
