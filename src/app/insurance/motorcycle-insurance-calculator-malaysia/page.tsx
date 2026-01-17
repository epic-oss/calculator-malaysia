import MotorcycleInsuranceCalculator from "@/components/MotorcycleInsuranceCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Motorcycle Insurance Calculator Malaysia 2026 | Calculator Malaysia",
  description:
    "Calculate your motorcycle insurance premium and road tax in Malaysia. Compare third party vs comprehensive coverage for kapchai, superbike, and all motorcycles.",
};

export default function MotorcycleInsuranceCalculatorPage() {
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

      <MotorcycleInsuranceCalculator />

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Motorcycle Insurance in Malaysia: What You Actually Need to Know
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              Whether you&apos;re riding a kapchai to work or cruising on a superbike during weekends,
              one thing&apos;s certain – you need insurance. But how much does motorcycle insurance
              actually cost in Malaysia? And should you go for third party or comprehensive?
            </p>

            <p className="text-slate-600 leading-relaxed">
              We built this calculator to give you instant estimates without the usual hassle of
              filling out lengthy forms or waiting for agents to call back. Just select your bike&apos;s
              engine capacity, choose your coverage type, and get your numbers in seconds.
            </p>

            {/* Third Party vs Comprehensive */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Third Party vs Comprehensive: Which One Do You Need?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              This is the biggest decision you&apos;ll make when insuring your motorcycle. Here&apos;s the
              honest breakdown:
            </p>

            <div className="space-y-4 my-6">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                <p className="font-semibold text-amber-800 mb-2">Third Party Coverage</p>
                <p className="text-slate-600 text-base mb-3">
                  The legal minimum. This covers damage you cause to other people and their property.
                  If you hit someone&apos;s car, the insurance pays for their repairs. But if YOUR bike
                  gets stolen or damaged? You&apos;re on your own.
                </p>
                <p className="text-sm text-slate-500">
                  <strong>Best for:</strong> Older motorcycles, budget kapchai under RM5,000, bikes
                  you can afford to replace
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
                <p className="font-semibold text-orange-800 mb-2">Comprehensive Coverage</p>
                <p className="text-slate-600 text-base mb-3">
                  Full protection. Covers third party damage PLUS theft, fire, and accidental damage
                  to your own motorcycle. Yes, it costs more, but you sleep better knowing you&apos;re
                  protected.
                </p>
                <p className="text-sm text-slate-500">
                  <strong>Best for:</strong> New motorcycles, expensive bikes, high-theft areas, anyone
                  who can&apos;t afford to lose their bike
                </p>
              </div>
            </div>

            {/* Cost by Engine CC */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              How Much Does Motorcycle Insurance Cost by Engine CC?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Here&apos;s a realistic breakdown based on 2026 rates (with 0% NCD):
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Engine CC</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Third Party</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Comprehensive</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Road Tax</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Below 150cc (Kapchai)</td>
                    <td className="border border-slate-200 px-4 py-3">RM70-90</td>
                    <td className="border border-slate-200 px-4 py-3">RM200-250</td>
                    <td className="border border-slate-200 px-4 py-3">RM2</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">150cc - 200cc</td>
                    <td className="border border-slate-200 px-4 py-3">RM85-110</td>
                    <td className="border border-slate-200 px-4 py-3">RM280-350</td>
                    <td className="border border-slate-200 px-4 py-3">RM30</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">201cc - 250cc</td>
                    <td className="border border-slate-200 px-4 py-3">RM100-130</td>
                    <td className="border border-slate-200 px-4 py-3">RM380-480</td>
                    <td className="border border-slate-200 px-4 py-3">RM60</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">251cc - 500cc</td>
                    <td className="border border-slate-200 px-4 py-3">RM130-170</td>
                    <td className="border border-slate-200 px-4 py-3">RM520-650</td>
                    <td className="border border-slate-200 px-4 py-3">RM120</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">501cc - 800cc</td>
                    <td className="border border-slate-200 px-4 py-3">RM180-230</td>
                    <td className="border border-slate-200 px-4 py-3">RM750-950</td>
                    <td className="border border-slate-200 px-4 py-3">RM180</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3">Above 800cc (Superbikes)</td>
                    <td className="border border-slate-200 px-4 py-3">RM250-320</td>
                    <td className="border border-slate-200 px-4 py-3">RM1,100-1,400</td>
                    <td className="border border-slate-200 px-4 py-3">RM250</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-600 leading-relaxed">
              <strong>Pro tip:</strong> If you&apos;ve been claim-free for 5+ years, your 55% NCD
              cuts these costs nearly in half. That&apos;s why safe riding literally pays.
            </p>

            {/* NCD Explained */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Understanding NCD (No Claim Discount) for Motorcycles
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              NCD is your reward for not making claims. The longer you go without a claim, the
              bigger your discount:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-slate-800">0%</p>
                <p className="text-xs text-slate-500">First Year / After Claim</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-slate-800">25%</p>
                <p className="text-xs text-slate-500">1 Year Claim-Free</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-slate-800">30%</p>
                <p className="text-xs text-slate-500">2 Years Claim-Free</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-slate-800">38.33%</p>
                <p className="text-xs text-slate-500">3 Years Claim-Free</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-slate-800">45%</p>
                <p className="text-xs text-slate-500">4 Years Claim-Free</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-green-700">55%</p>
                <p className="text-xs text-green-600">5+ Years Claim-Free</p>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed">
              <strong>Important:</strong> Your NCD is tied to YOU, not your motorcycle. When you
              sell your bike and buy a new one, your NCD follows you. But if you make a claim,
              you lose it all and start from 0%.
            </p>

            {/* Popular Motorcycle Examples */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Real Examples: Popular Malaysian Motorcycles
            </h3>

            <div className="space-y-4 my-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">Honda Wave 125 (Kapchai)</p>
                <p className="text-slate-600 text-sm">
                  Engine: 125cc | Third Party: ~RM75/year | Comprehensive: ~RM210/year | Road Tax: RM2
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Malaysia&apos;s most popular motorcycle. Third party is enough for most riders.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">Yamaha Y15ZR (Y-Suku)</p>
                <p className="text-slate-600 text-sm">
                  Engine: 150cc | Third Party: ~RM90/year | Comprehensive: ~RM300/year | Road Tax: RM30
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Hot target for theft. Comprehensive recommended if parking in public areas.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">Kawasaki Ninja 250</p>
                <p className="text-slate-600 text-sm">
                  Engine: 250cc | Third Party: ~RM110/year | Comprehensive: ~RM420/year | Road Tax: RM60
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Entry-level sportbike. Definitely get comprehensive for a bike worth RM20k+.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-800 mb-2">BMW R1250GS (Adventure)</p>
                <p className="text-slate-600 text-sm">
                  Engine: 1254cc | Third Party: ~RM280/year | Comprehensive: ~RM1,300/year | Road Tax: RM250
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Premium superbike. Comprehensive is a must – parts alone cost a fortune.
                </p>
              </div>
            </div>

            {/* Tips for Saving */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              5 Ways to Lower Your Motorcycle Insurance Cost
            </h3>

            <div className="space-y-4 my-6">
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-semibold text-slate-800">1. Don&apos;t claim for small repairs</p>
                <p className="text-slate-600 text-base">
                  A RM500 scratch isn&apos;t worth losing your NCD. Pay out of pocket for minor stuff.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-semibold text-slate-800">2. Compare quotes online</p>
                <p className="text-slate-600 text-base">
                  Different insurers charge different rates. Platforms like Bjak let you compare 15+
                  insurers in minutes.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-semibold text-slate-800">3. Install anti-theft devices</p>
                <p className="text-slate-600 text-base">
                  Some insurers give discounts for bikes with GPS trackers or disc locks. Worth asking.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-semibold text-slate-800">4. Consider higher excess</p>
                <p className="text-slate-600 text-base">
                  Agreeing to a higher excess (the amount you pay first when claiming) lowers your premium.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-semibold text-slate-800">5. Renew on time</p>
                <p className="text-slate-600 text-base">
                  Letting your insurance lapse means starting NCD from zero. Set a reminder!
                </p>
              </div>
            </div>

            {/* Regional Differences */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Does Location Affect Your Premium?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Yes. Insurance rates differ between Peninsular Malaysia and East Malaysia (Sabah/Sarawak).
              Generally, East Malaysia enjoys slightly lower premiums due to lower theft rates and
              different traffic patterns.
            </p>

            <p className="text-slate-600 leading-relaxed">
              High-theft areas in KL, Johor, and Penang may also see slightly higher rates, especially
              for popular models like the Y15ZR and Honda RS150.
            </p>

            {/* Final CTA */}
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              Ready to Get the Best Price?
            </h3>

            <p className="text-slate-600 leading-relaxed mb-4">
              Use the calculator above to estimate your costs, then click &quot;Get Best Price on Bjak&quot;
              to compare actual quotes from 15+ insurers. It takes 2 minutes and could save you
              RM50-200 on your annual renewal.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Ride safe, and make sure you&apos;re properly covered.
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
