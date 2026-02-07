import { Metadata } from "next";
import OfficeCleaningCalculator from "@/components/OfficeCleaningCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Office Cleaning Cost Calculator Malaysia ${currentYear} | Calculator Malaysia`,
  description: `Calculate office cleaning cost in Malaysia ${currentYear}. Compare basic, standard & deep clean prices by office size. Get free quotes from licensed cleaners in KL/Selangor.`,
  keywords: [
    "office cleaning cost malaysia",
    "office cleaning calculator",
    "office cleaning price malaysia",
    "cleaning service pejabat",
    "harga cleaning service pejabat",
    "kos cleaning pejabat",
    "commercial cleaning rates malaysia",
    "office deep cleaning price",
    "cleaning company kl selangor",
    "office cleaning quote malaysia",
  ],
  openGraph: {
    title: `Office Cleaning Cost Calculator Malaysia ${currentYear}`,
    description: "Calculate office cleaning cost based on size, cleaning type, and frequency. Get free quotes.",
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
      "name": "How much does office cleaning cost per square foot in Malaysia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Office cleaning in Malaysia costs approximately RM0.15-0.30 per square foot for basic cleaning, RM0.20-0.40 for standard cleaning, and RM0.30-0.55 for deep cleaning. Prices vary by location, frequency, and the cleaning company."
      }
    },
    {
      "@type": "Question",
      "name": "What's included in basic office cleaning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Basic office cleaning typically includes dusting all surfaces, mopping and vacuuming floors, emptying trash bins, wiping down desks and common areas, and basic toilet cleaning. It does not include window washing, carpet shampooing, or deep sanitization."
      }
    },
    {
      "@type": "Question",
      "name": "How often should an office be professionally cleaned?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most offices benefit from professional cleaning 2-3 times per week. High-traffic offices or those in healthcare/food industries may need daily cleaning. Small offices with fewer than 10 people can manage with weekly cleaning."
      }
    },
    {
      "@type": "Question",
      "name": "Do cleaning companies bring their own supplies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, most professional cleaning companies in Malaysia bring their own cleaning supplies, equipment, and chemicals. Some may charge extra for specialized cleaning agents. Always confirm with your provider whether supplies are included in the quoted price."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a minimum office size for cleaning services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most cleaning companies in KL/Selangor have a minimum charge of RM120-150 per visit, which covers offices up to 500-1,000 sq ft. Some companies may decline very small spaces under 300 sq ft as it's not cost-effective for them."
      }
    }
  ]
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `Office Cleaning Cost Calculator Malaysia ${currentYear}`,
  "description": "Calculate office cleaning cost based on size, cleaning type, and frequency",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MYR"
  }
};

export default function OfficeCleaningCostCalculatorPage() {
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
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span>›</span>
            <span className="text-slate-400">Services</span>
            <span>›</span>
            <span className="text-slate-900">Office Cleaning Cost Calculator</span>
          </div>
        </div>
      </div>

      <OfficeCleaningCalculator />

      {/* SEO Content Section */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">

          {/* Section 1: Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              How Much Does Office Cleaning Cost in Malaysia {currentYear}?
            </h2>
            <p className="text-slate-600 mb-4">
              Keeping your office clean is essential for employee productivity, client impressions, and workplace health. But how much should you budget for professional office cleaning in Malaysia?
            </p>
            <p className="text-slate-600 mb-4">
              Based on {currentYear} market rates in the Klang Valley, here are the typical office cleaning costs by office size:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <h3 className="font-bold text-emerald-800 mb-2">Small Office</h3>
                <p className="text-2xl font-bold text-emerald-700 mb-1">RM120 - RM180</p>
                <p className="text-sm text-emerald-700">500 - 1,000 sq ft</p>
                <p className="text-xs text-emerald-600 mt-1">Ideal for startups & small teams</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <h3 className="font-bold text-amber-800 mb-2">Medium Office</h3>
                <p className="text-2xl font-bold text-amber-700 mb-1">RM180 - RM300</p>
                <p className="text-sm text-amber-700">1,000 - 2,000 sq ft</p>
                <p className="text-xs text-amber-600 mt-1">Most common office size</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-2">Large Office</h3>
                <p className="text-2xl font-bold text-blue-700 mb-1">RM300 - RM500</p>
                <p className="text-sm text-blue-700">2,000 - 3,500 sq ft</p>
                <p className="text-xs text-blue-600 mt-1">Corporate & multi-room offices</p>
              </div>
            </div>
            <p className="text-slate-600">
              These are base rates for basic cleaning. Standard and deep cleaning services cost 30-80% more depending on the scope of work. <strong>Harga cleaning service pejabat</strong> juga bergantung kepada lokasi dan kekerapan pembersihan.
            </p>
          </section>

          {/* Section 2: Factors */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Factors That Affect Office Cleaning Prices
            </h2>
            <p className="text-slate-600 mb-4">
              Understanding what drives cleaning costs helps you budget more accurately and negotiate better rates with service providers.
            </p>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">1. Office Size</h3>
                <p className="text-slate-600">
                  The biggest factor in pricing. Larger offices require more time, labor, and cleaning supplies. Most companies price by square footage, with rates decreasing slightly for larger spaces due to economies of scale.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">2. Type of Cleaning</h3>
                <p className="text-slate-600">
                  Basic cleaning (dusting, mopping, trash removal) is the most affordable. Standard cleaning adds window wiping and pantry cleaning. Deep cleaning includes carpet shampooing, sanitization, and thorough scrubbing of all surfaces.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">3. Cleaning Frequency</h3>
                <p className="text-slate-600">
                  One-time cleaning costs more per visit. Regular contracts (weekly, twice weekly, daily) offer significant discounts of 15-25% because the cleaning company can plan their workforce and routes more efficiently.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">4. Location</h3>
                <p className="text-slate-600">
                  Offices in central KL, Petaling Jaya, and Shah Alam enjoy standard rates due to high competition among cleaners. Areas outside the Klang Valley may incur a 5-10% surcharge for travel costs.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">5. Add-on Services</h3>
                <p className="text-slate-600">
                  Specialized services like carpet cleaning (RM150), window cleaning (RM100), aircon servicing (RM80/unit), and deep pantry/toilet cleaning (RM100-120) are typically priced separately from the base cleaning package.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Types of Cleaning */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Types of Office Cleaning Services
            </h2>
            <p className="text-slate-600 mb-4">
              Choosing the right cleaning type depends on your office needs, budget, and how frequently you want the service. Here&apos;s a detailed comparison:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="text-left p-3 border border-blue-200 font-semibold text-slate-800">Feature</th>
                    <th className="text-center p-3 border border-blue-200 font-semibold text-slate-800">Basic Clean</th>
                    <th className="text-center p-3 border border-blue-200 font-semibold text-slate-800">Standard Clean</th>
                    <th className="text-center p-3 border border-blue-200 font-semibold text-slate-800">Deep Clean</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Dusting & Wiping</td>
                    <td className="p-3 border border-slate-200 text-center">✅</td>
                    <td className="p-3 border border-slate-200 text-center">✅</td>
                    <td className="p-3 border border-slate-200 text-center">✅</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">Mopping & Vacuuming</td>
                    <td className="p-3 border border-slate-200 text-center">✅</td>
                    <td className="p-3 border border-slate-200 text-center">✅</td>
                    <td className="p-3 border border-slate-200 text-center">✅</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Trash Removal</td>
                    <td className="p-3 border border-slate-200 text-center">✅</td>
                    <td className="p-3 border border-slate-200 text-center">✅</td>
                    <td className="p-3 border border-slate-200 text-center">✅</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">Window Wiping</td>
                    <td className="p-3 border border-slate-200 text-center">❌</td>
                    <td className="p-3 border border-slate-200 text-center">✅</td>
                    <td className="p-3 border border-slate-200 text-center">✅</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Pantry Cleaning</td>
                    <td className="p-3 border border-slate-200 text-center">❌</td>
                    <td className="p-3 border border-slate-200 text-center">✅</td>
                    <td className="p-3 border border-slate-200 text-center">✅</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">Carpet Shampooing</td>
                    <td className="p-3 border border-slate-200 text-center">❌</td>
                    <td className="p-3 border border-slate-200 text-center">❌</td>
                    <td className="p-3 border border-slate-200 text-center">✅</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Sanitization</td>
                    <td className="p-3 border border-slate-200 text-center">❌</td>
                    <td className="p-3 border border-slate-200 text-center">❌</td>
                    <td className="p-3 border border-slate-200 text-center">✅</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">Scrubbing & Polishing</td>
                    <td className="p-3 border border-slate-200 text-center">❌</td>
                    <td className="p-3 border border-slate-200 text-center">❌</td>
                    <td className="p-3 border border-slate-200 text-center">✅</td>
                  </tr>
                  <tr className="bg-blue-50 font-semibold">
                    <td className="p-3 border border-blue-200">Price Multiplier</td>
                    <td className="p-3 border border-blue-200 text-center">1.0x</td>
                    <td className="p-3 border border-blue-200 text-center">1.3x</td>
                    <td className="p-3 border border-blue-200 text-center">1.8x</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Price Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Office Cleaning Rates by Size
            </h2>
            <p className="text-sm text-slate-500 mb-4">Harga Cleaning Service Pejabat {currentYear}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="text-left p-3 border border-blue-200 font-semibold text-slate-800">Office Size</th>
                    <th className="text-center p-3 border border-blue-200 font-semibold text-slate-800">Basic Clean</th>
                    <th className="text-center p-3 border border-blue-200 font-semibold text-slate-800">Standard Clean</th>
                    <th className="text-center p-3 border border-blue-200 font-semibold text-slate-800">Deep Clean</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Small (500-1,000 sqft)</td>
                    <td className="p-3 border border-slate-200 text-center">RM120 - RM180</td>
                    <td className="p-3 border border-slate-200 text-center">RM160 - RM230</td>
                    <td className="p-3 border border-slate-200 text-center">RM220 - RM320</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">Medium (1,000-2,000 sqft)</td>
                    <td className="p-3 border border-slate-200 text-center">RM180 - RM300</td>
                    <td className="p-3 border border-slate-200 text-center">RM230 - RM390</td>
                    <td className="p-3 border border-slate-200 text-center">RM320 - RM540</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Large (2,000-3,500 sqft)</td>
                    <td className="p-3 border border-slate-200 text-center">RM300 - RM500</td>
                    <td className="p-3 border border-slate-200 text-center">RM390 - RM650</td>
                    <td className="p-3 border border-slate-200 text-center">RM540 - RM900</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              * Prices are per visit estimates for KL/Selangor. Recurring contracts enjoy 15-25% discounts.
            </p>
          </section>

          {/* Section 5: Frequency Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              How Often Should You Clean Your Office?
            </h2>
            <p className="text-slate-600 mb-4">
              The right cleaning frequency depends on your office size, number of employees, and the nature of your business. Here&apos;s a general guide:
            </p>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">Daily Cleaning (Mon-Fri)</h3>
                <p className="text-slate-600">
                  <strong>Best for:</strong> Offices with 20+ employees, high foot traffic, client-facing businesses, healthcare or food-related offices. Daily cleaning ensures a consistently professional appearance and hygienic environment. You&apos;ll enjoy the maximum 25% discount on per-visit rates.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">Twice a Week</h3>
                <p className="text-slate-600">
                  <strong>Best for:</strong> Medium offices with 10-20 employees. This is the most popular frequency — it strikes a good balance between cleanliness and cost. Typically scheduled on Monday and Thursday to keep the office fresh throughout the week.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">Weekly Cleaning</h3>
                <p className="text-slate-600">
                  <strong>Best for:</strong> Small offices with fewer than 10 employees, or offices where employees maintain basic tidiness daily. Usually scheduled on Friday afternoon or Monday morning.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">One-Time / Ad-Hoc</h3>
                <p className="text-slate-600">
                  <strong>Best for:</strong> Move-in/move-out cleaning, post-renovation cleaning, annual deep cleaning, or before important events. One-time cleaning doesn&apos;t come with recurring discounts but is great for specific needs.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Tips to Save */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Tips to Save on Office Cleaning Costs
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">1</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Sign a recurring contract</h3>
                  <p className="text-slate-600">Long-term contracts save 15-25% compared to one-time cleaning. Most cleaning companies offer better rates for weekly or daily commitments.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">2</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Combine services for bundle pricing</h3>
                  <p className="text-slate-600">Many companies offer discounts when you bundle regular cleaning with add-ons like carpet or aircon cleaning. Ask for package deals.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">3</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Maintain basic daily tidiness</h3>
                  <p className="text-slate-600">Encourage employees to keep their desks tidy and clean up after themselves in the pantry. This reduces the cleaning scope and time, which can lower your rates.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">4</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Schedule deep cleaning quarterly</h3>
                  <p className="text-slate-600">Instead of deep cleaning every visit, use basic or standard cleaning regularly and schedule deep cleaning once every 3 months. This significantly reduces your monthly cleaning budget.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">5</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Get multiple quotes</h3>
                  <p className="text-slate-600">Always get at least 3 quotes from different cleaning companies. Prices can vary by 20-40% for the same scope of work. Use our calculator to get a baseline estimate before comparing.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: DIY vs Professional */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              DIY vs Professional Office Cleaning
            </h2>
            <p className="text-slate-600 mb-4">
              Many small business owners wonder whether they should hire professional cleaners or handle cleaning in-house. Here&apos;s a comparison to help you decide:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-3">DIY / In-House Cleaning</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Lower direct cost for small offices</li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Flexible schedule</li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Direct control over cleaning quality</li>
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✗</span> Takes time away from core business</li>
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✗</span> Need to buy and maintain equipment</li>
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✗</span> No deep cleaning capability</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-3">Professional Cleaning Service</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Consistent, reliable results</li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Professional equipment & chemicals</li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Insured & trained workers</li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Deep cleaning capabilities</li>
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✗</span> Higher monthly cost</li>
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✗</span> Need to manage the relationship</li>
                </ul>
              </div>
            </div>
            <p className="text-slate-600 mt-4">
              <strong>Our recommendation:</strong> If your office is over 1,000 sq ft or has more than 10 employees, professional cleaning is almost always more cost-effective when you factor in employee time and equipment costs. <strong>Berapa harga cuci pejabat</strong> bergantung kepada saiz dan jenis pembersihan yang diperlukan.
            </p>
          </section>

          {/* Section 8: FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  How much does office cleaning cost per square foot in Malaysia?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  Office cleaning costs approximately RM0.15-0.30 per square foot for basic cleaning, RM0.20-0.40 for standard cleaning, and RM0.30-0.55 for deep cleaning. Prices vary by location, frequency, and the cleaning company. Areas within KL and Selangor tend to have more competitive pricing due to higher competition.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  What&apos;s included in basic office cleaning?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  Basic office cleaning typically includes dusting all surfaces, mopping and vacuuming floors, emptying trash bins, wiping down desks and common areas, and basic toilet cleaning. It does not include window washing, carpet shampooing, or deep sanitization. These can be added as separate services.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  How often should an office be professionally cleaned?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  Most offices benefit from professional cleaning 2-3 times per week. High-traffic offices or those in healthcare/food industries may need daily cleaning. Small offices with fewer than 10 people can manage with weekly cleaning. We recommend scheduling a deep clean at least once per quarter regardless of your regular frequency.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  Do cleaning companies bring their own supplies?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  Yes, most professional cleaning companies in Malaysia bring their own cleaning supplies, equipment, and chemicals. Some may charge extra for specialized cleaning agents for deep cleaning or sanitization. Always confirm with your provider whether supplies are included in the quoted price to avoid surprises.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  Is there a minimum office size for cleaning services?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  Most cleaning companies in KL/Selangor have a minimum charge of RM120-150 per visit, which covers offices up to 500-1,000 sq ft. Some companies may decline very small spaces under 300 sq ft as it&apos;s not cost-effective for them. For very small offices, consider ad-hoc cleaning rather than regular contracts.
                </div>
              </details>
            </div>
          </section>

          {/* Bilingual SEO Keywords Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Office Cleaning Rates Malaysia {currentYear}
            </h2>
            <p className="text-slate-600 mb-4">
              Our office cleaning cost calculator provides up-to-date {currentYear} estimates for the Klang Valley area. Whether you&apos;re looking for a one-time deep clean or a regular cleaning contract, use our calculator above to get an instant estimate.
            </p>
            <p className="text-slate-600 mb-4">
              <strong>Kos cleaning pejabat Malaysia</strong> berbeza mengikut saiz pejabat, jenis pembersihan, dan kekerapan. Gunakan kalkulator percuma kami untuk mendapatkan anggaran kos yang tepat untuk pejabat anda di KL dan Selangor.
            </p>
            <p className="text-slate-600">
              Ready to get your office sparkling clean? Use the calculator above to estimate your cleaning costs, then click &quot;Get Free Quote&quot; to connect with licensed cleaning professionals in your area.
            </p>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm">
          <p className="mb-2">
            © {currentYear} Calculator Malaysia. All rights reserved.
          </p>
          <p>
            Disclaimer: Cleaning costs are estimates based on average market rates. Actual prices may vary by provider.
          </p>
        </div>
      </footer>
    </div>
  );
}
