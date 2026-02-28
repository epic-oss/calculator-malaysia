import { Metadata } from "next";
import WeddingCostCalculator from "@/components/WeddingCostCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Christian Wedding Cost Calculator Malaysia ${currentYear} | Calculator Malaysia`,
  description: `Calculate Christian wedding cost in Malaysia ${currentYear}. Compare church vs garden wedding prices, reception venue costs, and Western-style wedding budget breakdown. Free calculator for KL/Selangor.`,
  keywords: [
    "christian wedding cost malaysia",
    "church wedding cost malaysia",
    "christian wedding calculator",
    "garden wedding cost malaysia",
    "western wedding budget malaysia",
    "church wedding venue price",
    "christian wedding reception cost",
    "wedding planner malaysia",
    "church ceremony cost",
    "christian wedding package malaysia",
  ],
  openGraph: {
    title: `Christian Wedding Cost Calculator Malaysia ${currentYear}`,
    description: "Calculate Christian wedding cost in Malaysia. Compare church vs garden wedding, reception venues, and budget breakdown.",
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
      "name": "How much does a Christian wedding cost in Malaysia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Christian wedding in Malaysia typically costs between RM20,000 and RM100,000+. Budget weddings start around RM20,000-50,000, mid-range weddings cost RM50,000-100,000, and premium weddings can exceed RM100,000 depending on venue, catering, and guest count."
      }
    },
    {
      "@type": "Question",
      "name": "How much does a church wedding ceremony cost in Malaysia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A church wedding ceremony in Malaysia typically costs RM500-3,000 for the church booking fee, which covers the venue, pastor or priest officiation, and basic church decorations. Some churches charge a nominal fee for members and a higher rate for non-members."
      }
    },
    {
      "@type": "Question",
      "name": "Is a garden wedding more expensive than a church wedding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, garden weddings are generally more expensive than church weddings. Garden venues charge RM5,000-20,000+ for the venue alone, and you need additional setup costs for an arch, chairs, PA system, and weather backup plans. Church weddings benefit from existing infrastructure and are often subsidized for members."
      }
    },
    {
      "@type": "Question",
      "name": "What is the biggest expense in a Christian wedding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The reception dinner is typically the biggest expense, accounting for 40-50% of the total budget. This includes venue rental, catering (RM80-250 per guest), beverages, table setup, and service charges. For 200 guests, reception costs alone can range from RM16,000 to RM50,000."
      }
    },
    {
      "@type": "Question",
      "name": "How can I save money on a Christian wedding in Malaysia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To save money, consider having the ceremony at your home church (often free or minimal fee for members), choosing a weekday or lunch reception, limiting the guest list, DIY-ing decorations and favors, and booking vendors during off-peak months like January-March or July-September."
      }
    }
  ]
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `Christian Wedding Cost Calculator Malaysia ${currentYear}`,
  "description": "Calculate Christian wedding cost in Malaysia based on ceremony type, venue, catering, and guest count",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MYR"
  }
};

export default function ChristianWeddingCostCalculatorPage() {
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
            <span className="text-slate-400">Wedding</span>
            <span>›</span>
            <span className="text-slate-900">Christian Wedding Cost Calculator</span>
          </div>
        </div>
      </div>

      <WeddingCostCalculator type="christian" />

      {/* SEO Content Section */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">

          {/* Section 1: Christian Wedding Cost Tiers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Christian Wedding Cost in Malaysia {currentYear}
            </h2>
            <p className="text-slate-600 mb-4">
              Planning a Christian wedding in Malaysia involves balancing the solemnity of a church ceremony with the celebration of a joyous reception. Whether you envision a traditional church service followed by a banquet dinner or a romantic garden ceremony with a Western-style reception, understanding the costs involved is essential for stress-free planning.
            </p>
            <p className="text-slate-600 mb-4">
              Based on {currentYear} market data from wedding vendors across the Klang Valley, Penang, and Johor Bahru, here are the typical Christian wedding cost tiers:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-2">Budget</h3>
                <p className="text-2xl font-bold text-blue-700 mb-1">RM20,000 - RM50,000</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>- Church ceremony</li>
                  <li>- Restaurant reception</li>
                  <li>- 100-150 guests</li>
                  <li>- Basic photo & video</li>
                </ul>
              </div>
              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                <h3 className="font-bold text-indigo-800 mb-2">Mid-Range</h3>
                <p className="text-2xl font-bold text-indigo-700 mb-1">RM50,000 - RM100,000</p>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>- Church or garden ceremony</li>
                  <li>- Hotel ballroom reception</li>
                  <li>- 150-250 guests</li>
                  <li>- Professional vendors</li>
                </ul>
              </div>
              <div className="bg-blue-100 rounded-xl p-4 border border-blue-300">
                <h3 className="font-bold text-blue-900 mb-2">Premium</h3>
                <p className="text-2xl font-bold text-blue-800 mb-1">RM100,000+</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>- Premium venue ceremony</li>
                  <li>- Luxury hotel or resort</li>
                  <li>- 250+ guests</li>
                  <li>- Top-tier vendors & planner</li>
                </ul>
              </div>
            </div>
            <p className="text-slate-600">
              These estimates cover the full wedding experience including ceremony, reception, photography, bridal attire, decorations, and miscellaneous costs. Your actual spend will depend on guest count, venue selection, and the level of customization you desire.
            </p>
          </section>

          {/* Section 2: Church vs Garden Wedding Cost Comparison */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Church vs Garden Wedding - Cost Comparison
            </h2>
            <p className="text-slate-600 mb-4">
              One of the first decisions Christian couples face is choosing between a traditional church ceremony and a modern garden or outdoor ceremony. Each option has distinct cost implications that can significantly affect your overall budget.
            </p>
            <p className="text-slate-600 mb-4">
              A church wedding offers the beauty of sacred architecture, built-in seating, sound systems, and often comes at a fraction of the cost of an outdoor venue. Garden weddings, while visually stunning, require you to bring in nearly everything from scratch. Here&apos;s a detailed comparison:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="text-left p-3 border border-blue-200 font-semibold text-slate-800">Cost Item</th>
                    <th className="text-center p-3 border border-blue-200 font-semibold text-slate-800">Church Wedding</th>
                    <th className="text-center p-3 border border-blue-200 font-semibold text-slate-800">Garden Wedding</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Venue Rental</td>
                    <td className="p-3 border border-slate-200 text-center">RM500 - RM3,000</td>
                    <td className="p-3 border border-slate-200 text-center">RM5,000 - RM20,000</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">Ceremony Setup</td>
                    <td className="p-3 border border-slate-200 text-center">RM500 - RM2,000</td>
                    <td className="p-3 border border-slate-200 text-center">RM3,000 - RM8,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Sound System / PA</td>
                    <td className="p-3 border border-slate-200 text-center">Included</td>
                    <td className="p-3 border border-slate-200 text-center">RM1,000 - RM3,000</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">Seating for Guests</td>
                    <td className="p-3 border border-slate-200 text-center">Included</td>
                    <td className="p-3 border border-slate-200 text-center">RM1,500 - RM4,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Officiant Fee</td>
                    <td className="p-3 border border-slate-200 text-center">RM200 - RM500</td>
                    <td className="p-3 border border-slate-200 text-center">RM500 - RM1,500</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">Weather Backup Plan</td>
                    <td className="p-3 border border-slate-200 text-center">Not needed</td>
                    <td className="p-3 border border-slate-200 text-center">RM2,000 - RM5,000</td>
                  </tr>
                  <tr className="bg-blue-50 font-semibold">
                    <td className="p-3 border border-blue-200">Estimated Ceremony Total</td>
                    <td className="p-3 border border-blue-200 text-center">RM1,200 - RM5,500</td>
                    <td className="p-3 border border-blue-200 text-center">RM13,000 - RM41,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              * Church fees vary between denominations. Some churches offer free or discounted rates for active members. Garden venue prices are for KL/Selangor area.
            </p>
          </section>

          {/* Section 3: Reception Venue Pricing Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Reception Venue Pricing Guide
            </h2>
            <p className="text-slate-600 mb-4">
              The reception is where you celebrate with family and friends after the ceremony. For Christian weddings in Malaysia, the reception dinner is typically the single largest expense, often accounting for 40-50% of the total wedding budget. Choosing the right venue and catering package can make or break your budget.
            </p>
            <p className="text-slate-600 mb-4">
              Here are the typical reception venue costs across different venue types in {currentYear}:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="text-left p-3 border border-blue-200 font-semibold text-slate-800">Venue Type</th>
                    <th className="text-center p-3 border border-blue-200 font-semibold text-slate-800">Per Pax (RM)</th>
                    <th className="text-center p-3 border border-blue-200 font-semibold text-slate-800">200 Guests (RM)</th>
                    <th className="text-left p-3 border border-blue-200 font-semibold text-slate-800">Includes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Restaurant</td>
                    <td className="p-3 border border-slate-200 text-center">RM80 - RM120</td>
                    <td className="p-3 border border-slate-200 text-center">RM16,000 - RM24,000</td>
                    <td className="p-3 border border-slate-200 text-slate-600">Food, basic table setup</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">Church Hall</td>
                    <td className="p-3 border border-slate-200 text-center">RM60 - RM100</td>
                    <td className="p-3 border border-slate-200 text-center">RM12,000 - RM20,000</td>
                    <td className="p-3 border border-slate-200 text-slate-600">Venue + catering (external)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">3-Star Hotel</td>
                    <td className="p-3 border border-slate-200 text-center">RM100 - RM150</td>
                    <td className="p-3 border border-slate-200 text-center">RM20,000 - RM30,000</td>
                    <td className="p-3 border border-slate-200 text-slate-600">Ballroom, food, basic decor</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">4-Star Hotel</td>
                    <td className="p-3 border border-slate-200 text-center">RM150 - RM200</td>
                    <td className="p-3 border border-slate-200 text-center">RM30,000 - RM40,000</td>
                    <td className="p-3 border border-slate-200 text-slate-600">Ballroom, food, decor, bridal suite</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">5-Star Hotel</td>
                    <td className="p-3 border border-slate-200 text-center">RM200 - RM350</td>
                    <td className="p-3 border border-slate-200 text-center">RM40,000 - RM70,000</td>
                    <td className="p-3 border border-slate-200 text-slate-600">Premium package, full service</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">Garden / Outdoor Venue</td>
                    <td className="p-3 border border-slate-200 text-center">RM120 - RM200</td>
                    <td className="p-3 border border-slate-200 text-center">RM24,000 - RM40,000</td>
                    <td className="p-3 border border-slate-200 text-slate-600">Venue + external catering</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              * Hotel prices typically include 10% service charge and 6% SST. Prices are for KL/Selangor area and may vary by location.
            </p>
          </section>

          {/* Section 4: Western-style Wedding Budget Breakdown */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Western-style Wedding Budget Breakdown
            </h2>
            <p className="text-slate-600 mb-4">
              Christian weddings in Malaysia typically follow a Western-style format with a ceremony followed by a sit-down dinner reception. Understanding how your budget is distributed across different categories helps you prioritize spending and identify areas where you can save.
            </p>
            <p className="text-slate-600 mb-4">
              Here is the typical cost distribution for a mid-range Christian wedding budget of RM70,000:
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-slate-800">Reception & Catering (40-50%)</h3>
                  <span className="text-blue-700 font-bold">RM28,000 - RM35,000</span>
                </div>
                <p className="text-slate-600 text-sm">
                  This is the largest expense and covers venue rental, food and beverages, table setup, service staff, and service charges. For a hotel wedding with 200 guests at RM150 per pax, the reception alone costs RM30,000 before tax and service charge.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-slate-800">Photography & Videography (10-15%)</h3>
                  <span className="text-blue-700 font-bold">RM7,000 - RM10,500</span>
                </div>
                <p className="text-slate-600 text-sm">
                  Professional wedding photography packages range from RM3,000 for basic coverage to RM8,000+ for full-day packages with an album. Videography adds another RM2,000-5,000. Pre-wedding photoshoots cost RM1,500-4,000 including makeup and outfit rental.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-slate-800">Bridal Attire & Grooming (10-12%)</h3>
                  <span className="text-blue-700 font-bold">RM7,000 - RM8,400</span>
                </div>
                <p className="text-slate-600 text-sm">
                  Wedding gown rental or purchase (RM2,000-6,000), groom&apos;s suit (RM800-2,000), bridal makeup and hair (RM1,000-2,500), and accessories like veil, shoes, and jewellery. Renting a gown is more popular and cost-effective than buying.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-slate-800">Decorations & Flowers (8-10%)</h3>
                  <span className="text-blue-700 font-bold">RM5,600 - RM7,000</span>
                </div>
                <p className="text-slate-600 text-sm">
                  Church decorations (RM1,000-3,000), reception floral arrangements and centerpieces (RM2,000-5,000), bridal bouquet (RM300-800), and arch or backdrop setup (RM1,000-3,000). Fresh flowers cost more than artificial arrangements.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-slate-800">Ceremony, Music & Misc (10-15%)</h3>
                  <span className="text-blue-700 font-bold">RM7,000 - RM10,500</span>
                </div>
                <p className="text-slate-600 text-sm">
                  Church or venue booking (RM500-3,000), live band or DJ (RM2,000-5,000), emcee (RM800-1,500), wedding favors (RM1,000-2,000), invitation cards (RM500-1,500), and transportation. A live worship band during the church ceremony adds a meaningful touch.
                </p>
              </div>
            </div>
            <p className="text-slate-600">
              The remaining 5-10% of the budget should be set aside as a contingency fund for last-minute additions, tips for vendors, and unexpected expenses. Experienced wedding planners recommend keeping at least RM3,000-5,000 as a buffer regardless of your total budget.
            </p>
          </section>

          {/* Section 5: Tips to Save on Church Wedding */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Tips to Save on Church Wedding
            </h2>
            <p className="text-slate-600 mb-4">
              A beautiful Christian wedding doesn&apos;t have to break the bank. With smart planning and strategic choices, you can have a meaningful celebration while keeping costs under control. Here are five proven tips from Malaysian couples who&apos;ve done it:
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">1</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Have your ceremony at your home church</h3>
                  <p className="text-slate-600">Most churches offer free or heavily discounted venue fees for active members. If you&apos;ve been attending regularly, speak to your pastor about member rates. Some churches only charge a small donation of RM200-500 for the ceremony, compared to RM5,000-20,000 for a separate venue. The church also comes with built-in seating, a sound system, and a sacred atmosphere.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">2</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Choose a lunch reception over dinner</h3>
                  <p className="text-slate-600">Lunch receptions are 20-30% cheaper than dinner receptions at most hotels and restaurants. A lunch banquet at a 4-star hotel might cost RM120-150 per pax compared to RM180-220 for dinner. You also save on venue rental as lunch slots are less in demand. Saturday lunch receptions are becoming increasingly popular among Christian couples.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">3</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Leverage your church community for talents</h3>
                  <p className="text-slate-600">Your church community is full of talented people. Ask the worship team to perform during the ceremony, have a church member with photography skills assist your main photographer, and invite friends to help with decorations. Many church members are happy to contribute their talents as a wedding gift. This can save RM3,000-8,000 on vendor costs.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">4</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Book during off-peak months and weekdays</h3>
                  <p className="text-slate-600">Avoid peak wedding months (October-December and June). Booking your reception during January-March or July-September can save 10-20% on venue costs. Some hotels offer even bigger discounts for weekday weddings. Friday evening receptions are a great compromise that still feels like a weekend celebration.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">5</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">DIY decorations and wedding favors</h3>
                  <p className="text-slate-600">Simple, elegant decorations can be made at home for a fraction of the cost. Use candles and greenery instead of expensive floral arrangements, create your own invitation cards using online design tools, and make personalized wedding favors in bulk. Pinterest and YouTube have countless tutorials for beautiful DIY wedding projects that can save you RM2,000-5,000.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  How much does a Christian wedding cost in Malaysia?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  A Christian wedding in Malaysia typically costs between RM20,000 and RM100,000+. Budget weddings with a simple church ceremony and restaurant reception start around RM20,000-50,000. Mid-range weddings with a hotel ballroom reception cost RM50,000-100,000. Premium weddings at luxury hotels or resorts can exceed RM100,000. The largest cost driver is the reception dinner, which depends on guest count and venue selection.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  How much does a church wedding ceremony cost in Malaysia?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  A church wedding ceremony in Malaysia typically costs RM500-3,000 for the church booking fee. This usually covers the venue, pastor or priest officiation, and basic church setup. Active church members often receive discounted rates or may only need to pay a nominal donation. Non-members typically pay a higher fee. Additional costs include church decorations (RM1,000-3,000) and musicians if not using the church worship team.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  Is a garden wedding more expensive than a church wedding?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  Yes, garden weddings are generally significantly more expensive than church weddings for the ceremony portion. Garden venues charge RM5,000-20,000+ for the venue alone, and you&apos;ll need to budget for additional setup costs including an arch or gazebo, chairs, PA system, canopy or tent as weather backup, and portable restrooms. A church wedding ceremony can cost as little as RM1,000-5,000 total since the infrastructure is already in place.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  What is the biggest expense in a Christian wedding?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  The reception dinner is consistently the biggest expense, accounting for 40-50% of the total wedding budget. This includes venue rental, catering (RM80-350 per guest depending on venue type), beverages, table setup, floral centerpieces, and service charges. For a mid-range wedding with 200 guests at a 4-star hotel, the reception alone can cost RM30,000-40,000. Photography and videography is the second largest expense at 10-15%.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  How can I save money on a Christian wedding in Malaysia?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  The most effective ways to save are: use your home church for the ceremony (free or minimal fee for members), choose a lunch reception over dinner (20-30% cheaper), limit your guest list to close family and friends, leverage church community talents for music and photography, book during off-peak months (January-March, July-September), DIY decorations and favors, and get at least 3 quotes from every vendor to compare prices.
                </div>
              </details>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm">
          <p className="mb-2">
            &copy; {currentYear} Calculator Malaysia. All rights reserved.
          </p>
          <p>
            Disclaimer: Wedding costs are estimates based on average market rates in Malaysia. Actual prices may vary by vendor, location, and season.
          </p>
        </div>
      </footer>
    </div>
  );
}
