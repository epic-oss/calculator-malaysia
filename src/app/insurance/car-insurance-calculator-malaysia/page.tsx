import CarInsuranceCalculator from "@/components/CarInsuranceCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Car Insurance Calculator Malaysia 2026 | Calculator Malaysia",
  description:
    "Calculate your car insurance premium and road tax in Malaysia. Compare comprehensive vs third party coverage. Get instant quotes for all vehicle types.",
  keywords: [
    "car insurance calculator malaysia",
    "motor insurance calculator",
    "car insurance premium calculator",
    "road tax calculator malaysia",
    "NCD calculator",
  ],
};

export default function CarInsuranceCalculatorPage() {
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

      <CarInsuranceCalculator />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Car Insurance in Malaysia: Everything You Need to Know
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              Whether you&apos;re buying your first Myvi or upgrading to a BMW, understanding car
              insurance in Malaysia is essential. This calculator helps you estimate your annual
              premium and road tax so you can budget accurately before buying or renewing.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Car insurance in Malaysia isn&apos;t optional – it&apos;s required by law. But beyond
              the legal requirement, it protects you financially if something goes wrong. Let&apos;s
              break down how it all works.
            </p>

            {/* How Premium is Calculated */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              How is Car Insurance Premium Calculated?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Your car insurance premium depends on several factors. Here&apos;s what insurers look at:
            </p>

            <div className="space-y-4 my-6">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="font-semibold text-blue-800 mb-2">1. Sum Insured (Market Value)</p>
                <p className="text-slate-600 text-base">
                  The higher your car&apos;s value, the more you pay. A RM150,000 car costs more to
                  insure than a RM50,000 car because the potential payout is higher.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="font-semibold text-blue-800 mb-2">2. Engine Capacity (CC)</p>
                <p className="text-slate-600 text-base">
                  Bigger engines = higher premiums. A 3.0L engine costs significantly more to insure
                  than a 1.5L engine because higher-powered cars are considered higher risk.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="font-semibold text-blue-800 mb-2">3. Vehicle Age</p>
                <p className="text-slate-600 text-base">
                  Older cars (5+ years) may have loading charges because parts are harder to find
                  and repairs cost more. However, their lower market value partially offsets this.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="font-semibold text-blue-800 mb-2">4. No Claim Discount (NCD)</p>
                <p className="text-slate-600 text-base">
                  Your biggest savings lever. Up to 55% discount if you haven&apos;t made claims for
                  5+ years. We&apos;ll explain NCD in detail below.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="font-semibold text-blue-800 mb-2">5. Coverage Type</p>
                <p className="text-slate-600 text-base">
                  Comprehensive coverage costs 3-5x more than third party because it covers your
                  own car too, not just damage to others.
                </p>
              </div>
            </div>

            {/* NCD Explained */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Understanding NCD (No Claim Discount)
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              NCD is Malaysia&apos;s reward system for safe drivers. Every year you go without making
              a claim, your discount increases:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Claim-Free Years</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">NCD Discount</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Example Savings*</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">0 (New/After Claim)</td>
                    <td className="border border-slate-200 px-4 py-3">0%</td>
                    <td className="border border-slate-200 px-4 py-3">RM0</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">1 year</td>
                    <td className="border border-slate-200 px-4 py-3">25%</td>
                    <td className="border border-slate-200 px-4 py-3">RM500</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">2 years</td>
                    <td className="border border-slate-200 px-4 py-3">30%</td>
                    <td className="border border-slate-200 px-4 py-3">RM600</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">3 years</td>
                    <td className="border border-slate-200 px-4 py-3">38.33%</td>
                    <td className="border border-slate-200 px-4 py-3">RM767</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">4 years</td>
                    <td className="border border-slate-200 px-4 py-3">45%</td>
                    <td className="border border-slate-200 px-4 py-3">RM900</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-slate-200 px-4 py-3 font-semibold">5+ years</td>
                    <td className="border border-slate-200 px-4 py-3 font-semibold text-green-700">55%</td>
                    <td className="border border-slate-200 px-4 py-3 font-semibold text-green-700">RM1,100</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mb-6">*Based on RM2,000 base premium</p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="font-semibold text-amber-800 mb-2">Important NCD Rules:</p>
              <ul className="text-slate-600 text-sm space-y-1">
                <li>• NCD follows YOU, not the car – it transfers when you sell and buy new</li>
                <li>• Making a claim resets your NCD to 0% immediately</li>
                <li>• NCD can be transferred between insurers when you switch</li>
                <li>• Some insurers offer NCD protection add-ons (worth considering at 55%)</li>
              </ul>
            </div>

            {/* Comprehensive vs Third Party */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Comprehensive vs Third Party: Which Should You Choose?
            </h3>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-3 text-lg">Third Party Only</p>
                <p className="text-green-600 font-bold mb-3">From ~RM150/year</p>
                <p className="text-slate-600 text-sm mb-4">
                  The legal minimum. Only covers damage you cause to OTHER people and their property.
                </p>
                <p className="font-medium text-slate-700 mb-2">Covers:</p>
                <ul className="text-slate-600 text-sm space-y-1 mb-4">
                  <li>✅ Damage to other vehicles</li>
                  <li>✅ Injury to other people</li>
                  <li>✅ Property damage (e.g., hitting a fence)</li>
                </ul>
                <p className="font-medium text-slate-700 mb-2">Does NOT cover:</p>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>❌ Damage to YOUR car</li>
                  <li>❌ Theft of your car</li>
                  <li>❌ Fire damage to your car</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-xl p-5">
                <p className="font-semibold text-blue-800 mb-3 text-lg">Comprehensive</p>
                <p className="text-blue-600 font-bold mb-3">From ~RM800/year</p>
                <p className="text-slate-600 text-sm mb-4">
                  Full protection. Covers third party damage PLUS your own car.
                </p>
                <p className="font-medium text-slate-700 mb-2">Covers everything in Third Party, plus:</p>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>✅ Accident damage to your car</li>
                  <li>✅ Theft</li>
                  <li>✅ Fire</li>
                  <li>✅ Windscreen damage (with add-on)</li>
                  <li>✅ Flood damage (with add-on)</li>
                  <li>✅ Personal accident (with add-on)</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 my-6">
              <p className="font-semibold text-slate-800">Our Recommendation:</p>
              <p className="text-slate-600 text-base">
                Get <strong>Comprehensive</strong> if your car is worth more than RM30,000 or you&apos;re
                still paying off a loan. Banks require comprehensive coverage anyway. Only consider
                Third Party for very old, low-value cars that you can afford to replace.
              </p>
            </div>

            {/* Road Tax by Engine CC */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Road Tax Rates by Engine CC (Peninsular Malaysia)
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Road tax in Malaysia is calculated based on engine capacity. Here are the 2026 rates
              for private vehicles in Peninsular Malaysia:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Engine CC</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Road Tax (Peninsular)</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Road Tax (East MY)</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Below 1,000cc</td>
                    <td className="border border-slate-200 px-4 py-3">RM20</td>
                    <td className="border border-slate-200 px-4 py-3">RM10</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">1,000cc - 1,400cc</td>
                    <td className="border border-slate-200 px-4 py-3">RM55</td>
                    <td className="border border-slate-200 px-4 py-3">~RM28</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">1,401cc - 1,600cc</td>
                    <td className="border border-slate-200 px-4 py-3">RM90</td>
                    <td className="border border-slate-200 px-4 py-3">~RM45</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">1,601cc - 1,800cc</td>
                    <td className="border border-slate-200 px-4 py-3">RM200</td>
                    <td className="border border-slate-200 px-4 py-3">~RM100</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">1,801cc - 2,000cc</td>
                    <td className="border border-slate-200 px-4 py-3">RM280</td>
                    <td className="border border-slate-200 px-4 py-3">~RM140</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">2,001cc - 2,500cc</td>
                    <td className="border border-slate-200 px-4 py-3">RM450</td>
                    <td className="border border-slate-200 px-4 py-3">~RM225</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">2,501cc - 3,000cc</td>
                    <td className="border border-slate-200 px-4 py-3">RM750</td>
                    <td className="border border-slate-200 px-4 py-3">~RM375</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">Above 3,000cc</td>
                    <td className="border border-slate-200 px-4 py-3">RM1,200+</td>
                    <td className="border border-slate-200 px-4 py-3">~RM600+</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-600 leading-relaxed">
              <strong>Note:</strong> East Malaysia (Sabah &amp; Sarawak) road tax is approximately
              50% of Peninsular rates. This is one reason why car ownership is slightly cheaper
              in East Malaysia.
            </p>

            {/* Tips to Lower Premium */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              7 Ways to Lower Your Car Insurance Premium
            </h3>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-slate-800">1. Protect your NCD at all costs</p>
                <p className="text-slate-600 text-base">
                  Don&apos;t claim for small scratches. A RM500 repair isn&apos;t worth losing your 55% NCD
                  which could save you RM1,000+ annually.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-slate-800">2. Compare quotes from multiple insurers</p>
                <p className="text-slate-600 text-base">
                  Prices vary by 20-30% between insurers for the same coverage. Use comparison
                  platforms or talk to an agent who represents multiple companies.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-slate-800">3. Choose a higher excess</p>
                <p className="text-slate-600 text-base">
                  Excess is the amount you pay first when claiming. Higher excess = lower premium.
                  Good option if you&apos;re a careful driver.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-slate-800">4. Install approved security devices</p>
                <p className="text-slate-600 text-base">
                  Some insurers offer 5-10% discount for cars with immobilizers, GPS tracking,
                  or other anti-theft systems.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-slate-800">5. Remove unnecessary add-ons</p>
                <p className="text-slate-600 text-base">
                  Review what you actually need. Windscreen coverage is useful, but do you really
                  need legal liability to passengers if you mostly drive alone?
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-slate-800">6. Renew on time</p>
                <p className="text-slate-600 text-base">
                  Letting your insurance lapse means starting NCD from 0%. Set calendar reminders
                  and renew before expiry.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-slate-800">7. Consider your car choice carefully</p>
                <p className="text-slate-600 text-base">
                  Before buying, check insurance costs. A 2.0L turbocharged engine costs significantly
                  more to insure than a 1.5L naturally aspirated one.
                </p>
              </div>
            </div>

            {/* How to Claim */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              How to Claim Car Insurance in Malaysia
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              If you&apos;re in an accident, here&apos;s what to do:
            </p>

            <div className="bg-slate-50 rounded-xl p-6 my-6">
              <ol className="space-y-4 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-semibold text-slate-800">Stay calm and ensure safety</p>
                    <p className="text-sm">Turn on hazard lights, set up warning triangle if needed. Check if anyone is injured.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-semibold text-slate-800">Document everything</p>
                    <p className="text-sm">Take photos/videos of damage, license plates, the scene, and exchange details with other parties.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-semibold text-slate-800">Lodge a police report within 24 hours</p>
                    <p className="text-sm">Required for all accidents in Malaysia. Go to nearest police station with your IC and driving license.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-semibold text-slate-800">Contact your insurer</p>
                    <p className="text-sm">Call their 24-hour hotline or use their app. They&apos;ll guide you on next steps and panel workshops.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                  <div>
                    <p className="font-semibold text-slate-800">Send car to panel workshop</p>
                    <p className="text-sm">Using panel workshops means cashless repairs. Non-panel requires you to pay first and claim back.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">6</span>
                  <div>
                    <p className="font-semibold text-slate-800">Submit claim documents</p>
                    <p className="text-sm">Police report, photos, repair quotation, and claim form. Your workshop usually handles this.</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-5 my-6">
              <p className="font-semibold text-red-800 mb-2">Before You Claim, Consider:</p>
              <p className="text-slate-600 text-sm">
                Small claims (under RM1,000) might not be worth it. Calculate whether the repair cost
                is less than your potential NCD loss over the next few years. Sometimes paying out
                of pocket saves money long-term.
              </p>
            </div>

            {/* Popular Car Examples */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Insurance Cost Examples for Popular Malaysian Cars
            </h3>

            <div className="space-y-4 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">Perodua Myvi 1.5 (New)</p>
                <p className="text-slate-600 text-sm">
                  Value: ~RM55,000 | Engine: 1.5L | Comprehensive: ~RM1,400/yr | Road Tax: RM90
                </p>
                <p className="text-xs text-slate-500 mt-2">With 55% NCD: ~RM700/yr</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">Honda City 1.5 V</p>
                <p className="text-slate-600 text-sm">
                  Value: ~RM90,000 | Engine: 1.5L | Comprehensive: ~RM2,200/yr | Road Tax: RM90
                </p>
                <p className="text-xs text-slate-500 mt-2">With 55% NCD: ~RM1,100/yr</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">Toyota Camry 2.5V</p>
                <p className="text-slate-600 text-sm">
                  Value: ~RM200,000 | Engine: 2.5L | Comprehensive: ~RM5,500/yr | Road Tax: RM450
                </p>
                <p className="text-xs text-slate-500 mt-2">With 55% NCD: ~RM2,750/yr</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">BMW 330i</p>
                <p className="text-slate-600 text-sm">
                  Value: ~RM280,000 | Engine: 2.0L Turbo | Comprehensive: ~RM7,500/yr | Road Tax: RM280
                </p>
                <p className="text-xs text-slate-500 mt-2">With 55% NCD: ~RM3,750/yr</p>
              </div>
            </div>

            {/* Final CTA */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Ready to Get Your Quote?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Use the calculator above to estimate your premium, then click &quot;Get Free Quote&quot;
              to compare prices from 15+ insurers. Our agents will help you find the
              best coverage at the best price, handle all the paperwork, and assist with claims.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Drive safe, and make sure you&apos;re properly protected.
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
