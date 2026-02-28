import { Metadata } from "next";
import WeddingCostCalculator from "@/components/WeddingCostCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Indian Wedding Cost Calculator Malaysia ${currentYear} | Calculator Malaysia`,
  description: `Calculate Indian wedding cost in Malaysia ${currentYear}. Compare budget, mid-range & grand wedding packages. Plan your temple or hall wedding with our free calculator.`,
  keywords: [
    "indian wedding cost malaysia",
    "indian wedding calculator",
    "hindu wedding cost malaysia",
    "indian wedding budget malaysia",
    "temple wedding cost malaysia",
    "thali cost malaysia",
    "indian bridal jewelry cost",
    "multi-day indian wedding cost",
    "indian wedding planner malaysia",
    "kos perkahwinan india malaysia",
  ],
  openGraph: {
    title: `Indian Wedding Cost Calculator Malaysia ${currentYear}`,
    description: "Calculate Indian wedding cost in Malaysia. Compare temple vs hall weddings, jewelry budgets, and multi-day event costs.",
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
      "name": "How much does an Indian wedding cost in Malaysia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An Indian wedding in Malaysia typically costs between RM30,000 and RM250,000 or more. A budget wedding starts around RM30,000-RM80,000, a mid-range wedding costs RM80,000-RM180,000, and a grand celebration can exceed RM180,000. The total depends on the venue, number of guests, catering, jewelry, and number of event days."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference in cost between a temple wedding and a hall wedding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A temple wedding ceremony in Malaysia typically costs RM2,000-RM8,000 for the venue and priest fees, making it significantly more affordable. A hall or hotel wedding venue can cost RM8,000-RM50,000 or more depending on the location and capacity. Many couples opt for the temple ceremony followed by a hall reception to balance tradition and celebration."
      }
    },
    {
      "@type": "Question",
      "name": "How much should I budget for Indian bridal jewelry in Malaysia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Indian bridal jewelry in Malaysia typically costs between RM10,000 and RM80,000 or more. The thali (mangalsutra) alone costs RM2,000-RM8,000. A complete bridal set including necklace, earrings, bangles, nose ring, and hair accessories ranges from RM15,000-RM60,000 depending on gold weight and gemstones used."
      }
    },
    {
      "@type": "Question",
      "name": "How many days does a traditional Indian wedding last in Malaysia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A traditional Indian wedding in Malaysia can span 1 to 3 days. A single-day wedding combines all ceremonies and the reception. A two-day wedding typically has the mehendi and sangeet on day one, with the ceremony and reception on day two. A grand three-day wedding adds separate events like haldi, sangeet night, and a post-wedding reception."
      }
    },
    {
      "@type": "Question",
      "name": "What are the biggest expenses in an Indian wedding in Malaysia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The biggest expenses in a Malaysian Indian wedding are catering (25-35% of budget), jewelry (15-25%), venue and decoration (15-20%), and photography/videography (8-12%). Catering is usually the largest single expense, especially for vegetarian and non-vegetarian multi-course meals served to 300-1,000+ guests."
      }
    }
  ]
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `Indian Wedding Cost Calculator Malaysia ${currentYear}`,
  "description": "Calculate Indian wedding cost in Malaysia based on venue, guests, jewelry, catering, and number of event days",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MYR"
  }
};

export default function IndianWeddingCostCalculatorPage() {
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
            <Link href="/wedding" className="hover:text-slate-900 transition-colors">
              Wedding
            </Link>
            <span>›</span>
            <span className="text-slate-900">Indian Wedding Cost Calculator</span>
          </div>
        </div>
      </div>

      <WeddingCostCalculator type="indian" />

      {/* SEO Content Section */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">

          {/* Section 1: Indian Wedding Cost Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Indian Wedding Cost in Malaysia {currentYear} - Complete Guide
            </h2>
            <p className="text-slate-600 mb-4">
              Planning an Indian wedding in Malaysia is a joyful yet complex affair that involves balancing tradition, family expectations, and budget. From the sacred temple ceremony to the vibrant reception, every element carries cultural significance and comes with its own cost considerations.
            </p>
            <p className="text-slate-600 mb-4">
              Based on {currentYear} market rates across Kuala Lumpur, Selangor, Penang, and Johor, here are the typical Indian wedding cost tiers in Malaysia:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-rose-50 rounded-xl p-4 border border-rose-200">
                <h3 className="font-bold text-rose-800 mb-2">Budget Wedding</h3>
                <p className="text-2xl font-bold text-rose-700 mb-1">RM30k - RM80k</p>
                <p className="text-sm text-rose-700">150 - 400 guests</p>
                <p className="text-xs text-rose-600 mt-1">Temple ceremony, simple hall reception, essential jewelry</p>
              </div>
              <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                <h3 className="font-bold text-pink-800 mb-2">Mid-Range Wedding</h3>
                <p className="text-2xl font-bold text-pink-700 mb-1">RM80k - RM180k</p>
                <p className="text-sm text-pink-700">400 - 800 guests</p>
                <p className="text-xs text-pink-600 mt-1">Hall ceremony, themed decor, professional photography, full bridal set</p>
              </div>
              <div className="bg-fuchsia-50 rounded-xl p-4 border border-fuchsia-200">
                <h3 className="font-bold text-fuchsia-800 mb-2">Grand Wedding</h3>
                <p className="text-2xl font-bold text-fuchsia-700 mb-1">RM180k+</p>
                <p className="text-sm text-fuchsia-700">800 - 1,500+ guests</p>
                <p className="text-xs text-fuchsia-600 mt-1">Hotel ballroom, multi-day events, designer outfits, premium jewelry</p>
              </div>
            </div>
            <p className="text-slate-600">
              These estimates cover all major wedding expenses including venue, catering, decoration, jewelry, attire, photography, and entertainment. The actual cost varies significantly based on the number of event days, guest count, and the level of customization you desire. Indian weddings in Malaysia are known for their grandeur, and families typically begin saving and planning 12-18 months in advance.
            </p>
          </section>

          {/* Section 2: Temple vs Hall Wedding Cost Comparison */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Temple vs Hall Wedding - Cost Comparison
            </h2>
            <p className="text-slate-600 mb-4">
              One of the first decisions Indian couples in Malaysia face is whether to hold the wedding ceremony at a temple or a banquet hall. Each option has distinct cost implications and cultural considerations. Many families choose a hybrid approach: conducting the sacred rituals at a temple and hosting the reception at a separate venue.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-rose-50">
                    <th className="text-left p-3 border border-rose-200 font-semibold text-slate-800">Cost Category</th>
                    <th className="text-center p-3 border border-rose-200 font-semibold text-slate-800">Temple Wedding</th>
                    <th className="text-center p-3 border border-rose-200 font-semibold text-slate-800">Hall / Hotel Wedding</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Venue Rental</td>
                    <td className="p-3 border border-slate-200 text-center">RM500 - RM3,000</td>
                    <td className="p-3 border border-slate-200 text-center">RM5,000 - RM30,000</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">Priest / Ceremony Fees</td>
                    <td className="p-3 border border-slate-200 text-center">RM1,500 - RM5,000</td>
                    <td className="p-3 border border-slate-200 text-center">RM2,000 - RM6,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Decoration</td>
                    <td className="p-3 border border-slate-200 text-center">RM3,000 - RM10,000</td>
                    <td className="p-3 border border-slate-200 text-center">RM8,000 - RM40,000</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">Catering (per pax)</td>
                    <td className="p-3 border border-slate-200 text-center">RM15 - RM35</td>
                    <td className="p-3 border border-slate-200 text-center">RM40 - RM120</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Parking & Logistics</td>
                    <td className="p-3 border border-slate-200 text-center">Limited (free)</td>
                    <td className="p-3 border border-slate-200 text-center">RM500 - RM2,000</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">Guest Capacity</td>
                    <td className="p-3 border border-slate-200 text-center">100 - 500</td>
                    <td className="p-3 border border-slate-200 text-center">200 - 2,000+</td>
                  </tr>
                  <tr className="bg-rose-50 font-semibold">
                    <td className="p-3 border border-rose-200">Estimated Total (500 guests)</td>
                    <td className="p-3 border border-rose-200 text-center">RM15,000 - RM35,000</td>
                    <td className="p-3 border border-rose-200 text-center">RM40,000 - RM120,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-600 mt-4">
              <strong>Key insight:</strong> A temple wedding can save you 50-70% on venue and decoration costs compared to a hotel or banquet hall wedding. However, temple weddings have limited capacity and may not offer the same level of comfort and amenities. Many Malaysian Indian families opt for a morning temple ceremony followed by an evening hall reception to get the best of both worlds.
            </p>
          </section>

          {/* Section 3: Jewelry Budget Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Jewelry Budget Guide for Indian Brides
            </h2>
            <p className="text-slate-600 mb-4">
              Jewelry is one of the most significant expenses in an Indian wedding and holds deep cultural importance. The <strong>thali</strong> (also known as mangalsutra) is the most sacred piece, symbolizing the marriage bond. Beyond the thali, a complete bridal jewelry set is considered essential for a traditional Indian bride in Malaysia.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-rose-50">
                    <th className="text-left p-3 border border-rose-200 font-semibold text-slate-800">Jewelry Item</th>
                    <th className="text-center p-3 border border-rose-200 font-semibold text-slate-800">Budget Range</th>
                    <th className="text-center p-3 border border-rose-200 font-semibold text-slate-800">Mid-Range</th>
                    <th className="text-center p-3 border border-rose-200 font-semibold text-slate-800">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Thali (Mangalsutra)</td>
                    <td className="p-3 border border-slate-200 text-center">RM2,000 - RM4,000</td>
                    <td className="p-3 border border-slate-200 text-center">RM4,000 - RM8,000</td>
                    <td className="p-3 border border-slate-200 text-center">RM8,000 - RM15,000</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">Bridal Necklace Set</td>
                    <td className="p-3 border border-slate-200 text-center">RM5,000 - RM10,000</td>
                    <td className="p-3 border border-slate-200 text-center">RM10,000 - RM25,000</td>
                    <td className="p-3 border border-slate-200 text-center">RM25,000 - RM50,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Earrings (Jhumkas)</td>
                    <td className="p-3 border border-slate-200 text-center">RM1,000 - RM3,000</td>
                    <td className="p-3 border border-slate-200 text-center">RM3,000 - RM8,000</td>
                    <td className="p-3 border border-slate-200 text-center">RM8,000 - RM15,000</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">Bangles & Bracelets</td>
                    <td className="p-3 border border-slate-200 text-center">RM2,000 - RM5,000</td>
                    <td className="p-3 border border-slate-200 text-center">RM5,000 - RM12,000</td>
                    <td className="p-3 border border-slate-200 text-center">RM12,000 - RM25,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Nose Ring & Hair Accessories</td>
                    <td className="p-3 border border-slate-200 text-center">RM500 - RM1,500</td>
                    <td className="p-3 border border-slate-200 text-center">RM1,500 - RM4,000</td>
                    <td className="p-3 border border-slate-200 text-center">RM4,000 - RM8,000</td>
                  </tr>
                  <tr className="bg-rose-50 font-semibold">
                    <td className="p-3 border border-rose-200">Total Bridal Jewelry</td>
                    <td className="p-3 border border-rose-200 text-center">RM10,500 - RM23,500</td>
                    <td className="p-3 border border-rose-200 text-center">RM23,500 - RM57,000</td>
                    <td className="p-3 border border-rose-200 text-center">RM57,000 - RM113,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-600 mb-4">
              Gold prices in Malaysia fluctuate daily, so your actual jewelry cost will depend on the current market rate. As of {currentYear}, 916 gold (22 karat) is the most popular choice for Indian wedding jewelry in Malaysia. Many jewelers in areas like Masjid India (KL), Little India (Penang), and Johor Bahru offer installment plans and gold savings schemes to help families manage this significant expense.
            </p>
            <p className="text-slate-600">
              <strong>Pro tip:</strong> Start a gold savings plan 1-2 years before the wedding. Many jewelers like Habib, Poh Kong, and specialized Indian jewelers offer monthly gold accumulation plans that help spread out this cost. Additionally, consider mixing real gold pieces (thali, main necklace) with gold-plated accessories for items worn only on the wedding day.
            </p>
          </section>

          {/* Section 4: Multi-day Wedding Cost Breakdown */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Multi-day Wedding Cost Breakdown
            </h2>
            <p className="text-slate-600 mb-4">
              Traditional Indian weddings in Malaysia can span multiple days, with each day featuring distinct ceremonies and celebrations. The number of event days is one of the biggest factors in your total wedding budget. Here&apos;s what each format typically involves and costs:
            </p>
            <div className="space-y-4">
              <div className="bg-rose-50 rounded-xl p-5 border border-rose-200">
                <h3 className="font-bold text-rose-800 mb-2">Single-Day Wedding (Most Common)</h3>
                <p className="text-slate-600 mb-2">
                  <strong>Estimated cost:</strong> RM30,000 - RM100,000
                </p>
                <p className="text-slate-600">
                  A single-day Indian wedding combines all essential ceremonies into one event. The morning typically begins with the temple or mandap ceremony including the thali tying, followed by lunch for guests, and an evening reception with dinner and entertainment. This format is increasingly popular among younger Malaysian Indian couples who want to honor tradition while keeping costs manageable. The compressed timeline means one venue booking, one catering arrangement, and one set of decorations.
                </p>
              </div>
              <div className="bg-pink-50 rounded-xl p-5 border border-pink-200">
                <h3 className="font-bold text-pink-800 mb-2">Two-Day Wedding (Traditional)</h3>
                <p className="text-slate-600 mb-2">
                  <strong>Estimated cost:</strong> RM60,000 - RM180,000
                </p>
                <p className="text-slate-600">
                  The two-day format is the traditional choice for many Malaysian Indian families. Day one features the <strong>mehendi</strong> (henna ceremony) and <strong>sangeet</strong> (musical night) at the bride&apos;s home or a smaller venue. Day two is the main wedding ceremony at the temple or hall, followed by the grand reception. This format allows families to celebrate each ritual properly and gives guests a more immersive experience. Budget roughly 30-40% of total cost for day one and 60-70% for day two.
                </p>
              </div>
              <div className="bg-fuchsia-50 rounded-xl p-5 border border-fuchsia-200">
                <h3 className="font-bold text-fuchsia-800 mb-2">Three-Day Grand Wedding</h3>
                <p className="text-slate-600 mb-2">
                  <strong>Estimated cost:</strong> RM150,000 - RM300,000+
                </p>
                <p className="text-slate-600">
                  A three-day grand wedding is the ultimate celebration. Day one features the <strong>haldi</strong> (turmeric ceremony) and mehendi at the bride&apos;s home. Day two includes the <strong>sangeet night</strong> with live music, dance performances, and dinner at a banquet hall. Day three is the main wedding ceremony and grand reception at a hotel ballroom or premium venue. This format requires separate venues, multiple catering arrangements, different outfits for each day, and additional logistics coordination. It&apos;s typically chosen by families who want to celebrate every aspect of their cultural heritage.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Tips to Save on Indian Wedding */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Tips to Save on Your Indian Wedding in Malaysia
            </h2>
            <p className="text-slate-600 mb-4">
              An Indian wedding is a once-in-a-lifetime celebration, but that doesn&apos;t mean you need to break the bank. Here are practical tips to reduce costs without sacrificing the beauty and significance of your special day:
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-sm">1</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Choose an off-peak wedding date</h3>
                  <p className="text-slate-600">Venues and vendors charge 20-40% more during peak wedding season (April-June and October-December). Consider weekday weddings or dates in January-March for significant savings. Many temples and halls offer discounted rates on weekdays, and vendors are more willing to negotiate when their calendars are open.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-sm">2</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Optimize your guest list strategically</h3>
                  <p className="text-slate-600">Catering is the largest expense, and every additional guest adds RM40-RM120 to your bill. Consider having a smaller, intimate ceremony with close family and a larger reception. Some couples host a separate open-house style reception with lighter refreshments to include extended family and friends at a fraction of the cost.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-sm">3</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Rent jewelry and designer outfits</h3>
                  <p className="text-slate-600">Bridal jewelry rental services in KL and Penang offer complete sets for RM2,000-RM8,000 - a fraction of buying. Similarly, designer sarees and lehengas can be rented for RM500-RM3,000. Keep the thali as a purchase since it&apos;s worn daily, but consider renting statement pieces like the heavy bridal necklace and jhumkas that are worn only on the wedding day.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-sm">4</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Bundle vendors and negotiate packages</h3>
                  <p className="text-slate-600">Many Indian wedding vendors in Malaysia offer bundled packages covering decoration, catering, and entertainment. Booking multiple services from the same provider can save 15-25%. Ask your venue if they have preferred vendor lists with pre-negotiated rates. Also, booking all vendors early (6-12 months ahead) locks in current-year pricing and avoids last-minute premium charges.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-sm">5</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">DIY decorations and digital invitations</h3>
                  <p className="text-slate-600">Replace expensive floral decorations with a mix of real flowers and high-quality artificial arrangements to save 30-50% on decor costs. Use digital wedding invitations (e-cards and WhatsApp invites) instead of printed cards to save RM1,000-RM3,000. Enlist creative family members to help with kolam designs, garland making, and venue setup. These personal touches often make the celebration more meaningful.</p>
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
                  How much does an Indian wedding cost in Malaysia?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  An Indian wedding in Malaysia typically costs between RM30,000 and RM250,000 or more depending on the scale. A budget-conscious wedding with a temple ceremony and simple reception starts around RM30,000-RM80,000. A mid-range wedding with a hall venue, professional photography, and full bridal jewelry costs RM80,000-RM180,000. A grand multi-day celebration at a hotel ballroom with premium vendors can exceed RM180,000. The biggest cost drivers are catering, jewelry, venue, and the number of event days.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  What is the difference in cost between a temple wedding and a hall wedding?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  A temple wedding ceremony in Malaysia typically costs RM2,000-RM8,000 for the venue and priest fees, while a hall or hotel wedding venue costs RM8,000-RM50,000 or more. The biggest price difference is in decoration and catering: temple weddings use simpler decor and serve banana leaf meals (RM15-RM35 per pax), while hall weddings feature elaborate mandap setups and plated or buffet meals (RM40-RM120 per pax). Many families choose a morning temple ceremony followed by an evening hall reception to honor tradition while accommodating a larger guest list.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  How much should I budget for Indian bridal jewelry in Malaysia?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  Indian bridal jewelry in Malaysia typically costs between RM10,000 and RM80,000 or more. The thali (mangalsutra) alone costs RM2,000-RM8,000 depending on gold weight and design. A complete bridal set including a necklace, earrings, bangles, nose ring, and hair accessories ranges from RM15,000-RM60,000 depending on gold purity (916 or 999), weight, and any gemstones used. To manage costs, consider starting a gold savings plan 1-2 years before the wedding, or rent premium pieces for the ceremony while purchasing only the thali and everyday jewelry.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  How many days does a traditional Indian wedding last in Malaysia?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  A traditional Indian wedding in Malaysia can span 1 to 3 days. The most common format today is a two-day wedding: day one features the mehendi (henna ceremony) and sangeet (musical night), while day two is the main ceremony and reception. A single-day wedding combines everything into one event and is increasingly popular for budget-conscious couples. Grand three-day weddings add separate haldi, sangeet night, and post-wedding events. Each additional day adds approximately 30-50% to the total wedding cost due to extra venue, catering, and vendor fees.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  What are the biggest expenses in an Indian wedding in Malaysia?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  The biggest expenses in a Malaysian Indian wedding are: (1) <strong>Catering</strong> at 25-35% of the total budget, especially for vegetarian and non-vegetarian multi-course banana leaf or buffet meals served to hundreds of guests. (2) <strong>Jewelry</strong> at 15-25%, including the thali, bridal set, and gifts. (3) <strong>Venue and decoration</strong> at 15-20%, covering the mandap, floral arrangements, and lighting. (4) <strong>Photography and videography</strong> at 8-12% for professional coverage across all events. (5) <strong>Bridal attire</strong> at 5-10%, including sarees or lehengas for multiple events. Use our calculator above to get a personalized breakdown based on your specific requirements.
                </div>
              </details>
            </div>
          </section>

          {/* Closing SEO Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Plan Your Indian Wedding Budget with Confidence
            </h2>
            <p className="text-slate-600 mb-4">
              Our Indian wedding cost calculator provides up-to-date {currentYear} estimates tailored to the Malaysian market. Whether you&apos;re planning an intimate temple ceremony or a grand multi-day celebration, use the calculator above to get an instant cost estimate based on your guest count, venue preference, jewelry budget, and number of event days.
            </p>
            <p className="text-slate-600 mb-4">
              Indian weddings in Malaysia are a beautiful blend of tradition, culture, and celebration. With proper planning and budgeting, you can create a memorable wedding experience that honors your heritage without unnecessary financial stress. Start by setting your total budget, prioritize the elements that matter most to you and your family, and use our calculator to see how different choices affect your bottom line.
            </p>
            <p className="text-slate-600">
              Remember, the most meaningful weddings are not always the most expensive ones. Focus on what truly matters - the union of two families, the sacred rituals, and the joy of celebrating with your loved ones. Use our free calculator above to begin planning your perfect Indian wedding in Malaysia.
            </p>
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
