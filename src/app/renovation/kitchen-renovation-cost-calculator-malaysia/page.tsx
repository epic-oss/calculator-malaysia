import { Metadata } from "next";
import KitchenRenovationCalculator from "@/components/KitchenRenovationCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Kitchen Renovation Cost Calculator Malaysia ${currentYear} | Calculator Malaysia`,
  description: `Calculate your kitchen renovation cost in Malaysia. Compare cabinet prices for laminate, solid wood & aluminium. Free calculator for KL/Selangor.`,
  keywords: [
    "kitchen renovation cost malaysia",
    "kitchen renovation calculator",
    "kitchen cabinet price malaysia",
    "kitchen countertop cost",
    "kitchen remodel budget",
    "renovation contractor selangor",
    "kitchen makeover cost",
    "quartz countertop price",
    "laminate cabinet cost",
    "kitchen renovation estimate",
  ],
  openGraph: {
    title: `Kitchen Renovation Cost Calculator Malaysia ${currentYear}`,
    description: "Calculate your kitchen renovation cost. Compare cabinet & countertop prices.",
    type: "website",
    locale: "en_MY",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does kitchen renovation cost in Malaysia 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kitchen renovation in Malaysia starts from RM8,000 for budget options, RM15,000-35,000 for mid-range, and RM35,000+ for premium finishes. Cost depends on size, cabinet type, and finish level."
      }
    },
    {
      "@type": "Question",
      "name": "How much do laminate kitchen cabinets cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Laminate kitchen cabinets cost around RM80-120 per square foot in Malaysia. For a 100 sq ft kitchen, expect to pay RM8,000-12,000 for cabinets alone."
      }
    },
    {
      "@type": "Question",
      "name": "Which countertop offers the best value?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Local granite offers the best value at RM150-250 per sq ft. It's durable and easy to maintain. Quartz is pricier (RM250-400) but more stain-resistant."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a kitchen renovation take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A standard kitchen renovation takes 2-4 weeks. Major projects involving structural changes can take 6-8 weeks to complete."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a permit for kitchen renovation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cosmetic renovations (cabinets, countertops, tiles) don't require permits. However, structural changes, major plumbing, or electrical work may need approval from local authorities."
      }
    }
  ]
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `Kitchen Renovation Cost Calculator Malaysia ${currentYear}`,
  "description": "Calculate kitchen renovation cost based on size, cabinet type, and finish level",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MYR"
  }
};

export default function KitchenRenovationCostCalculatorPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />

      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/renovation" className="hover:text-slate-900 transition-colors">Renovation</Link>
            <span>›</span>
            <span className="text-slate-900">Kitchen Renovation Calculator</span>
          </div>
        </div>
      </div>

      <KitchenRenovationCalculator locale="en" />

      {/* SEO Content Section */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Section 1: Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              How Much Does Kitchen Renovation Cost in Malaysia {currentYear}?
            </h2>
            <p className="text-slate-600 mb-4">
              Kitchen renovation is one of the most popular home improvement projects in Malaysia. A beautiful, functional kitchen not only enhances your cooking experience but also increases your property value.
            </p>
            <p className="text-slate-600 mb-4">
              Based on {currentYear} market data, here are the estimated kitchen renovation costs by budget tier:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <h3 className="font-bold text-emerald-800 mb-2">Budget-Friendly</h3>
                <p className="text-2xl font-bold text-emerald-700 mb-1">RM8,000 - RM15,000</p>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• Laminate cabinets</li>
                  <li>• Local granite/concrete</li>
                  <li>• Basic finishes</li>
                </ul>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <h3 className="font-bold text-amber-800 mb-2">Mid-Range</h3>
                <p className="text-2xl font-bold text-amber-700 mb-1">RM15,000 - RM35,000</p>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Wood/aluminium cabinets</li>
                  <li>• Quartz countertop</li>
                  <li>• Standard finishes</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-2">Premium</h3>
                <p className="text-2xl font-bold text-blue-700 mb-1">RM35,000+</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Solid wood cabinets</li>
                  <li>• Marble/premium quartz</li>
                  <li>• Luxury finishes</li>
                </ul>
              </div>
            </div>
            <p className="text-slate-600">
              Prices above are for the Klang Valley area. Other regions may vary by 10-20% depending on labor costs and material transportation.
            </p>
          </section>

          {/* Section 2: Factors */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Factors That Affect Kitchen Renovation Cost
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">1. Kitchen Size</h3>
                <p className="text-slate-600">
                  Kitchen size is the primary factor determining cost. Smaller kitchens (50-80 sq ft) require fewer cabinets and materials, while larger kitchens (150+ sq ft) need more investment. The average apartment kitchen in Malaysia is 80-120 sq ft.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">2. Material Selection</h3>
                <p className="text-slate-600">
                  Materials account for 60-70% of total cost. Laminate cabinets are the most affordable but less durable compared to aluminium or solid wood. Marble countertops are more expensive but look premium compared to local granite.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">3. Labor Costs</h3>
                <p className="text-slate-600">
                  Installation costs vary by location and project complexity. Contractors in KL typically charge 15-20% more than those in outer Selangor areas. Work involving hacking and rewiring will add to the cost.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">4. Location Type</h3>
                <p className="text-slate-600">
                  High-rise homes (condos, apartments) may incur additional costs for material transportation and management approval. Landed properties are easier for large-scale renovations.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Cabinet Comparison */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Kitchen Cabinet Types & Prices in Malaysia {currentYear}
            </h2>
            <p className="text-slate-600 mb-4">
              Cabinets are the largest component of kitchen renovation costs. Here&apos;s a comparison of popular cabinet types in Malaysia:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left py-3 px-4 font-bold text-slate-700">Cabinet Type</th>
                    <th className="text-center py-3 px-4 font-bold text-slate-700">Price (RM/sq ft)</th>
                    <th className="text-center py-3 px-4 font-bold text-slate-700">Durability</th>
                    <th className="text-left py-3 px-4 font-bold text-slate-700">Advantages</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium">Laminate</td>
                    <td className="py-3 px-4 text-center">RM80 - RM120</td>
                    <td className="py-3 px-4 text-center">5-10 years</td>
                    <td className="py-3 px-4 text-slate-600">Affordable, variety of colors, easy to clean</td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <td className="py-3 px-4 font-medium">Aluminium</td>
                    <td className="py-3 px-4 text-center">RM100 - RM150</td>
                    <td className="py-3 px-4 text-center">15-20 years</td>
                    <td className="py-3 px-4 text-slate-600">Waterproof, termite-proof, modern look, durable</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Solid Wood</td>
                    <td className="py-3 px-4 text-center">RM150 - RM250</td>
                    <td className="py-3 px-4 text-center">20+ years</td>
                    <td className="py-3 px-4 text-slate-600">Premium, classic look, can be refinished</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 mt-3">
              * Prices include basic hardware. Soft-close hinges and premium accessories will add to the cost.
            </p>
          </section>

          {/* Section 4: Countertop Comparison */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Countertop Options & Price Comparison
            </h2>
            <p className="text-slate-600 mb-4">
              The countertop is your main work surface in the kitchen. The right choice depends on your budget and lifestyle:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left py-3 px-4 font-bold text-slate-700">Countertop Type</th>
                    <th className="text-center py-3 px-4 font-bold text-slate-700">Price (RM/sq ft)</th>
                    <th className="text-center py-3 px-4 font-bold text-slate-700">Maintenance</th>
                    <th className="text-left py-3 px-4 font-bold text-slate-700">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium">Concrete/Cement</td>
                    <td className="py-3 px-4 text-center">RM80 - RM150</td>
                    <td className="py-3 px-4 text-center">Low</td>
                    <td className="py-3 px-4 text-slate-600">Budget-conscious, industrial style</td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <td className="py-3 px-4 font-medium">Local Granite</td>
                    <td className="py-3 px-4 text-center">RM150 - RM250</td>
                    <td className="py-3 px-4 text-center">Medium</td>
                    <td className="py-3 px-4 text-slate-600">Best value, durable</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium">Quartz</td>
                    <td className="py-3 px-4 text-center">RM250 - RM400</td>
                    <td className="py-3 px-4 text-center">Very Low</td>
                    <td className="py-3 px-4 text-slate-600">Busy families, stain-resistant</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="py-3 px-4 font-medium">Marble</td>
                    <td className="py-3 px-4 text-center">RM300 - RM500</td>
                    <td className="py-3 px-4 text-center">High</td>
                    <td className="py-3 px-4 text-slate-600">Luxury, baking, decorative</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Hidden Costs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Hidden Costs Most People Miss
            </h2>
            <p className="text-slate-600 mb-4">
              Beyond the main costs, there are several additional expenses that often catch homeowners off guard:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h3 className="font-bold text-red-800 mb-2">Hacking Work</h3>
                <p className="text-sm text-red-700">
                  If you need to remove old tiles or change the layout, hacking costs can reach RM1,000-3,000 depending on the scope of work.
                </p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h3 className="font-bold text-red-800 mb-2">Electrical Wiring</h3>
                <p className="text-sm text-red-700">
                  Adding electrical points for new appliances (oven, microwave) can add RM500-1,500 for wiring work.
                </p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h3 className="font-bold text-red-800 mb-2">Debris Disposal</h3>
                <p className="text-sm text-red-700">
                  Cost to transport and dispose of old cabinets/tiles at a disposal site: RM300-800.
                </p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h3 className="font-bold text-red-800 mb-2">Plumbing Work</h3>
                <p className="text-sm text-red-700">
                  Relocating sink or adding water points (dishwasher, water filter) can add RM500-2,000.
                </p>
              </div>
            </div>
            <div className="mt-4 bg-amber-50 rounded-xl p-4 border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Tip:</strong> Set aside a 10-15% contingency budget for unexpected costs. Better to have more than less!
              </p>
            </div>
          </section>

          {/* Section 6: Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Tips to Save Money on Kitchen Renovation
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <span className="text-emerald-600 font-bold text-lg">1.</span>
                <div>
                  <h3 className="font-bold text-emerald-800">Keep the Original Layout</h3>
                  <p className="text-sm text-emerald-700">Avoid relocating the sink and stove. This saves expensive plumbing and gas piping work.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <span className="text-emerald-600 font-bold text-lg">2.</span>
                <div>
                  <h3 className="font-bold text-emerald-800">Choose Materials Wisely</h3>
                  <p className="text-sm text-emerald-700">Laminate for cabinets and local granite for countertops provide the best value for your money.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <span className="text-emerald-600 font-bold text-lg">3.</span>
                <div>
                  <h3 className="font-bold text-emerald-800">Get 3 Contractor Quotes</h3>
                  <p className="text-sm text-emerald-700">Always get at least 3 quotes to compare. Make sure the scope of work is identical for fair comparison.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <span className="text-emerald-600 font-bold text-lg">4.</span>
                <div>
                  <h3 className="font-bold text-emerald-800">Renovate Off-Peak</h3>
                  <p className="text-sm text-emerald-700">Avoid renovating during CNY or Raya seasons. Contractors are less busy in Jan-Mar and Jul-Sept.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <span className="text-emerald-600 font-bold text-lg">5.</span>
                <div>
                  <h3 className="font-bold text-emerald-800">Buy Appliances Yourself</h3>
                  <p className="text-sm text-emerald-700">Sink, hood, and hob can be purchased directly from hardware stores for cheaper prices. Contractors typically mark up 20-30%.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <span className="text-emerald-600 font-bold text-lg">6.</span>
                <div>
                  <h3 className="font-bold text-emerald-800">Reuse What You Can</h3>
                  <p className="text-sm text-emerald-700">If old cabinets are still structurally sound, consider refacing (changing doors only) instead of full replacement.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: DIY vs Contractor */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Should You Hire a Contractor or DIY?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-3">Hire a Contractor</h3>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>✓ Cabinet and countertop work</li>
                  <li>✓ Electrical and plumbing installation</li>
                  <li>✓ Tiling and hacking work</li>
                  <li>✓ Large projects with tight timelines</li>
                  <li>✓ Structural changes</li>
                </ul>
              </div>
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                <h3 className="font-bold text-emerald-800 mb-3">Suitable for DIY</h3>
                <ul className="text-sm text-emerald-700 space-y-2">
                  <li>✓ Painting walls and cabinets</li>
                  <li>✓ Changing hardware (handles, knobs)</li>
                  <li>✓ Installing vinyl backsplash</li>
                  <li>✓ Installing lights and accessories</li>
                  <li>✓ Decoration and organization</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 bg-slate-100 rounded-xl p-4">
              <p className="text-sm text-slate-700">
                <strong>Advice:</strong> For major renovations, always choose a licensed contractor with a verifiable portfolio and testimonials. Request a written contract with a clear payment schedule.
              </p>
            </div>
          </section>

          {/* Section 8: FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">How much does kitchen renovation cost in Malaysia {currentYear}?</h3>
                <p className="text-slate-600">
                  Kitchen renovation in Malaysia starts from RM8,000 for budget options, RM15,000-35,000 for mid-range, and RM35,000+ for premium finishes. Cost depends on size, cabinet type, and finish level.
                </p>
              </div>
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">How much do laminate kitchen cabinets cost?</h3>
                <p className="text-slate-600">
                  Laminate kitchen cabinets cost around RM80-120 per square foot in Malaysia. For a 100 sq ft kitchen, expect to pay RM8,000-12,000 for cabinets alone.
                </p>
              </div>
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">Which countertop offers the best value?</h3>
                <p className="text-slate-600">
                  Local granite offers the best value at RM150-250 per sq ft. It&apos;s durable and easy to maintain. Quartz is pricier (RM250-400) but more stain-resistant.
                </p>
              </div>
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-bold text-slate-900 mb-2">How long does a kitchen renovation take?</h3>
                <p className="text-slate-600">
                  A standard kitchen renovation takes 2-4 weeks. Major projects involving structural changes can take 6-8 weeks to complete.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Do I need a permit for kitchen renovation?</h3>
                <p className="text-slate-600">
                  Cosmetic renovations (cabinets, countertops, tiles) don&apos;t require permits. However, structural changes, major plumbing, or electrical work may need approval from local authorities.
                </p>
              </div>
            </div>
          </section>

          {/* Related Calculators */}
          <section>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Related Calculators</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a
                  href="/loan/personal-loan-calculator-malaysia-based-on-salary"
                  className="block p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <span className="text-2xl mb-2 block">💰</span>
                  <span className="font-medium">Personal Loan Calculator</span>
                </a>
                <a
                  href="/loan/home-loan-eligibility-calculator-malaysia"
                  className="block p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <span className="text-2xl mb-2 block">🏠</span>
                  <span className="font-medium">Home Loan Eligibility</span>
                </a>
                <a
                  href="/"
                  className="block p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <span className="text-2xl mb-2 block">🧮</span>
                  <span className="font-medium">All Calculators</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

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
                About Us
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
            © {currentYear} Calculator Malaysia. All calculators are free to use.
          </div>
        </div>
      </footer>
    </div>
  );
}
