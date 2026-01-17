import EVInsuranceCalculator from "@/components/EVInsuranceCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "EV Car Insurance Calculator Malaysia 2026 | Calculator Malaysia",
  description:
    "Calculate your electric vehicle insurance premium and road tax in Malaysia. Compare prices from 15+ insurers for Tesla, BYD, and more EVs.",
};

export default function EVInsuranceCalculatorPage() {
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

      <EVInsuranceCalculator />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Everything You Need to Know About EV Insurance & Road Tax in Malaysia
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              If you&apos;ve been thinking about buying a Tesla Model 3, BYD Atto 3, or the new Proton e.MAS 7,
              you&apos;ve probably wondered: <em>&quot;How much will insurance and road tax actually cost me?&quot;</em>
            </p>

            <p className="text-slate-600 leading-relaxed">
              It&apos;s a fair question. Unlike regular petrol cars where you can guess the ballpark figure,
              EVs work differently. The insurance calculations are unique, and road tax is based on power
              output (kW) instead of engine capacity (cc). That&apos;s exactly why we built this calculator.
            </p>

            {/* Why EV Insurance Feels More Complicated */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Why EV Insurance Feels More Complicated
            </h3>

            <p className="text-slate-600 leading-relaxed">
              Here&apos;s the thing about insuring an electric vehicle in Malaysia – it&apos;s not just about
              the car&apos;s value. Yes, that matters, but there are other factors insurers look at:
            </p>

            <div className="space-y-4 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-1">Higher replacement costs</p>
                <p className="text-slate-600 text-base">
                  A damaged EV battery can cost RM30,000-80,000 to replace. That&apos;s why premiums might
                  seem higher compared to a similar-priced petrol car.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-1">Specialized repairs</p>
                <p className="text-slate-600 text-base">
                  Not every workshop can handle EV repairs. When something goes wrong, you&apos;re often
                  dealing with authorized service centers and pricier parts.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-1">New add-on coverages</p>
                <p className="text-slate-600 text-base">
                  Should you add battery protection? What about home charger coverage? These weren&apos;t
                  things you had to think about with a Myvi.
                </p>
              </div>
            </div>

            {/* How the Calculator Works */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              How the Calculator Actually Works
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              We&apos;ve kept it simple. Just fill in:
            </p>

            <ol className="list-decimal list-inside space-y-2 text-slate-600 mb-6">
              <li><strong>Your EV model</strong> – we support 28+ models from Tesla, BYD, Proton, BMW, Hyundai, MG, and more</li>
              <li><strong>Market value</strong> – adjust based on current 2026 prices</li>
              <li><strong>Power output (kW)</strong> – determines your road tax</li>
              <li><strong>Your NCD</strong> – anywhere from 0% (first year) to 55% (claim-free for 5+ years)</li>
              <li><strong>Region</strong> – Peninsular Malaysia charges differently from Sabah/Sarawak</li>
            </ol>

            <p className="text-slate-600 leading-relaxed">
              Hit calculate, and you&apos;ll instantly see your estimated annual insurance premium (with full breakdown),
              road tax, and total yearly ownership cost. No email required. No signup. Just straight answers.
            </p>

            {/* Real Example */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Real Example: How Much for a BYD Atto 3?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Let&apos;s use real numbers. Say you&apos;re buying a BYD Atto 3:
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 my-6">
              <ul className="space-y-1 text-slate-700 mb-4">
                <li>Market value: <strong>RM150,000</strong></li>
                <li>Power output: <strong>150 kW</strong></li>
                <li>NCD: <strong>25%</strong> (second year, no claims)</li>
                <li>Region: <strong>Peninsular Malaysia</strong></li>
              </ul>
              <div className="border-t border-blue-200 pt-4 mt-4">
                <p className="font-semibold text-slate-800">Your estimated costs:</p>
                <ul className="mt-2 space-y-1 text-slate-700">
                  <li>Insurance premium: ~RM3,375/year</li>
                  <li>Road tax: ~RM40/year</li>
                  <li className="text-lg font-bold text-blue-700">Total: ~RM3,415/year</li>
                </ul>
              </div>
            </div>

            {/* Road Tax Explained */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              What About Road Tax? The kW System Explained
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Here&apos;s where EV ownership gets interesting. Instead of paying based on cc (like RM90 for
              a 1.5L sedan), EVs use power output:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Power (kW)</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Road Tax Formula</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">0-100 kW</td>
                    <td className="border border-slate-200 px-4 py-3">RM20/year</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">101-150 kW</td>
                    <td className="border border-slate-200 px-4 py-3">RM40/year</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">151-200 kW</td>
                    <td className="border border-slate-200 px-4 py-3">RM80/year</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">Above 200 kW</td>
                    <td className="border border-slate-200 px-4 py-3">RM120/year</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-600 leading-relaxed">
              <strong>What this means in real life:</strong> A Tesla Model 3 (239 kW) pays RM120/year road tax,
              while a BYD Dolphin (95 kW) pays just RM20/year. Performance EVs do pay more, but it&apos;s still
              far cheaper than equivalent petrol cars.
            </p>

            {/* Insurance Cost by Model */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              How Much Do Different EVs Cost to Insure?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Based on 2026 market rates with 0% NCD:
            </p>

            <div className="grid gap-4 my-6">
              <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                <p className="font-semibold text-green-800 mb-2">Budget EVs (RM60k-120k)</p>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>Proton e.MAS 5: ~RM1,800-2,200/year</li>
                  <li>BYD Dolphin: ~RM2,800-3,200/year</li>
                  <li>Ora Good Cat: ~RM2,400-2,800/year</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="font-semibold text-blue-800 mb-2">Mid-range EVs (RM120k-250k)</p>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>BYD Atto 3: ~RM3,300-3,800/year</li>
                  <li>BYD Sealion 7: ~RM4,200-4,800/year</li>
                  <li>Tesla Model 3: ~RM4,000-4,800/year</li>
                  <li>Proton e.MAS 7: ~RM2,700-3,400/year</li>
                </ul>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
                <p className="font-semibold text-purple-800 mb-2">Premium EVs (RM250k+)</p>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>BMW iX: ~RM7,000-9,000/year</li>
                  <li>Mercedes EQS: ~RM10,000+/year</li>
                  <li>Porsche Taycan: ~RM12,000+/year</li>
                </ul>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Remember: These drop significantly if you have good NCD. At 55% NCD, you&apos;re paying less than half.
            </p>

            {/* How to Use Calculator */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              How to Use This Calculator for Smarter Decisions
            </h3>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-slate-800">Before you buy an EV</p>
                <p className="text-slate-600 text-base">
                  Run the numbers for 2-3 models you&apos;re considering. The insurance + road tax difference
                  might surprise you.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-slate-800">When renewing</p>
                <p className="text-slate-600 text-base">
                  Use this to check if your current insurer&apos;s quote is reasonable. If they&apos;re quoting
                  significantly higher, you know to shop around.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-semibold text-slate-800">When comparing to petrol</p>
                <p className="text-slate-600 text-base">
                  Factor in the full picture. Yes, EV insurance is RM800-1,200/year higher, but you&apos;re
                  saving RM2,400-3,600/year on fuel.
                </p>
              </div>
            </div>

            {/* Why This Calculator is Different */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Why This Calculator is Different
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Most insurance calculators are generic (not Malaysia-specific), basic (just premium, no road tax),
              or hidden behind forms. Ours is:
            </p>

            <ul className="space-y-2 text-slate-600 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Malaysia-focused</strong> – uses actual JPJ road tax tiers and local insurance rates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Comprehensive</strong> – insurance + road tax in one place</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Transparent</strong> – see the full calculation breakdown</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Free</strong> – no signup, no spam</span>
              </li>
            </ul>

            {/* Final Thoughts */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Final Thoughts
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Owning an EV in Malaysia is more affordable than most people think – especially when you
              factor in fuel savings and lower maintenance costs. Yes, insurance and road tax are higher,
              but the monthly savings on petrol make up for it within 1-2 years.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Use this calculator to budget accurately before buying your first EV, compare ownership costs
              across different models, and make informed decisions. The EV revolution is happening in Malaysia
              right now. Make sure you&apos;re prepared for it.
            </p>
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
