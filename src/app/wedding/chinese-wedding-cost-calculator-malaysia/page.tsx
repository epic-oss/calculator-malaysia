import { Metadata } from "next";
import WeddingCostCalculator from "@/components/WeddingCostCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Chinese Wedding Cost Calculator Malaysia ${currentYear} | Calculator Malaysia`,
  description: `Calculate your Chinese wedding cost in Malaysia ${currentYear}. Estimate banquet, guo da li, si dian jin, angpao break-even and more. Free calculator for KL, Penang & JB.`,
  keywords: [
    "chinese wedding cost malaysia",
    "chinese wedding calculator",
    "chinese wedding banquet price",
    "guo da li cost malaysia",
    "si dian jin price",
    "angpao break even calculator",
    "chinese wedding budget",
    "wedding banquet kl price",
    "chinese tea ceremony cost",
    "chinese wedding planner malaysia",
  ],
  openGraph: {
    title: `Chinese Wedding Cost Calculator Malaysia ${currentYear}`,
    description: "Calculate your Chinese wedding cost. Estimate banquet, guo da li, angpao break-even and more.",
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
      "name": "How much does a Chinese wedding cost in Malaysia in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Chinese wedding in Malaysia typically costs between RM30,000 and RM150,000+. Budget weddings run RM30,000-60,000, mid-range weddings RM60,000-120,000, and premium weddings RM120,000 and above. The biggest expense is the wedding banquet, which can account for 50-60% of the total budget."
      }
    },
    {
      "@type": "Question",
      "name": "How much does a Chinese wedding banquet cost per table in Malaysia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chinese wedding banquet prices per table in Malaysia range from RM800-1,200 at 3-star hotels, RM1,200-2,000 at 4-star hotels, RM2,000-3,500 at 5-star hotels, and RM3,500-6,000+ at luxury venues like Mandarin Oriental or Grand Hyatt. Restaurant banquets can be more affordable at RM600-1,500 per table."
      }
    },
    {
      "@type": "Question",
      "name": "What is included in guo da li for a Chinese wedding in Malaysia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Guo da li (betrothal gifts) typically includes si dian jin (four gold jewelry pieces worth RM5,000-30,000+), betrothal money (pin jin) ranging from RM2,888 to RM18,888, wedding cakes, wine and liquor, dried goods and fruits, and other auspicious items. The total guo da li cost ranges from RM10,000 to RM50,000+ depending on the family's expectations."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate angpao break-even for my Chinese wedding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To calculate angpao break-even, divide your total wedding cost by the number of guests. For example, if your wedding costs RM100,000 and you have 300 guests (30 tables x 10 pax), each guest needs to give an average of RM333. Since typical angpao amounts are RM100-300 per person, most couples recover 50-70% of their wedding costs through angpao."
      }
    },
    {
      "@type": "Question",
      "name": "How can I save money on a Chinese wedding in Malaysia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To save on a Chinese wedding: choose a restaurant banquet instead of a hotel (saves 30-50%), book on weekday evenings or lunch sessions, negotiate package deals with the venue, opt for a smaller guest list, source your own wedding decorations and favors, and book vendors during off-peak wedding months (January, March, July). Many couples save RM20,000-40,000 with these strategies."
      }
    }
  ]
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `Chinese Wedding Cost Calculator Malaysia ${currentYear}`,
  "description": "Calculate Chinese wedding cost including banquet, guo da li, si dian jin, and angpao break-even",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MYR"
  }
};

export default function ChineseWeddingCostCalculatorPage() {
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
            <span className="text-slate-900">Chinese Wedding Cost Calculator</span>
          </div>
        </div>
      </div>

      <WeddingCostCalculator type="chinese" />

      {/* SEO Content Section */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">

          {/* Section 1: How Much Does a Chinese Wedding Cost */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              How Much Does a Chinese Wedding Cost in Malaysia {currentYear}?
            </h2>
            <p className="text-slate-600 mb-4">
              Planning a Chinese wedding in Malaysia involves many moving parts, from the wedding banquet and guo da li to the tea ceremony and photography. One of the first questions every couple asks is: how much will it all cost?
            </p>
            <p className="text-slate-600 mb-4">
              Based on {currentYear} market data, Chinese wedding costs in Malaysia fall into three broad tiers depending on your venue choice, guest count, and the level of formality your families expect:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-rose-50 rounded-xl p-4 border border-rose-200">
                <h3 className="font-bold text-rose-800 mb-2">Budget</h3>
                <p className="text-2xl font-bold text-rose-700 mb-1">RM30,000 - RM60,000</p>
                <ul className="text-sm text-rose-700 space-y-1">
                  <li>&#8226; Restaurant banquet</li>
                  <li>&#8226; 10-15 tables</li>
                  <li>&#8226; Simple decorations</li>
                  <li>&#8226; Basic photography</li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h3 className="font-bold text-red-800 mb-2">Mid-Range</h3>
                <p className="text-2xl font-bold text-red-700 mb-1">RM60,000 - RM120,000</p>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>&#8226; 4-star hotel banquet</li>
                  <li>&#8226; 20-30 tables</li>
                  <li>&#8226; Professional decor</li>
                  <li>&#8226; Full-day photography</li>
                </ul>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <h3 className="font-bold text-amber-800 mb-2">Premium</h3>
                <p className="text-2xl font-bold text-amber-700 mb-1">RM120,000+</p>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>&#8226; 5-star hotel / luxury venue</li>
                  <li>&#8226; 30+ tables</li>
                  <li>&#8226; Luxury floral design</li>
                  <li>&#8226; Cinematography package</li>
                </ul>
              </div>
            </div>
            <p className="text-slate-600">
              The wedding banquet is the single largest cost component, typically accounting for 50-60% of the total budget. Other significant expenses include guo da li (betrothal gifts), si dian jin (gold jewelry), wedding photography, bridal gowns, and the tea ceremony setup. Use our calculator above to get a personalized estimate based on your specific preferences.
            </p>
          </section>

          {/* Section 2: Chinese Wedding Banquet Pricing Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Chinese Wedding Banquet Pricing Guide
            </h2>
            <p className="text-slate-600 mb-4">
              The wedding banquet (also called the wedding dinner or xi jiu) is the centerpiece of a Chinese wedding in Malaysia. Prices vary significantly by venue type and location. Here is a detailed breakdown of banquet costs per table in {currentYear}:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-rose-50">
                    <th className="text-left p-3 border border-rose-200 font-semibold text-slate-800">Venue Type</th>
                    <th className="text-center p-3 border border-rose-200 font-semibold text-slate-800">Price Per Table</th>
                    <th className="text-center p-3 border border-rose-200 font-semibold text-slate-800">Typical Courses</th>
                    <th className="text-center p-3 border border-rose-200 font-semibold text-slate-800">Includes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Restaurant</td>
                    <td className="p-3 border border-slate-200 text-center">RM600 - RM1,500</td>
                    <td className="p-3 border border-slate-200 text-center">8-9 courses</td>
                    <td className="p-3 border border-slate-200 text-center">Food only</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">3-Star Hotel</td>
                    <td className="p-3 border border-slate-200 text-center">RM800 - RM1,200</td>
                    <td className="p-3 border border-slate-200 text-center">8-9 courses</td>
                    <td className="p-3 border border-slate-200 text-center">Basic setup</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">4-Star Hotel</td>
                    <td className="p-3 border border-slate-200 text-center">RM1,200 - RM2,000</td>
                    <td className="p-3 border border-slate-200 text-center">9-10 courses</td>
                    <td className="p-3 border border-slate-200 text-center">Stage + basic decor</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200 font-medium">5-Star Hotel</td>
                    <td className="p-3 border border-slate-200 text-center">RM2,000 - RM3,500</td>
                    <td className="p-3 border border-slate-200 text-center">10 courses</td>
                    <td className="p-3 border border-slate-200 text-center">Full setup + 1-night stay</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-medium">Luxury Venue</td>
                    <td className="p-3 border border-slate-200 text-center">RM3,500 - RM6,000+</td>
                    <td className="p-3 border border-slate-200 text-center">10-12 courses</td>
                    <td className="p-3 border border-slate-200 text-center">Premium all-inclusive</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              * Prices are per table (10 pax) estimates for KL/Selangor. Penang and JB prices are typically 10-20% lower. Prices may vary during peak wedding months (Oct-Dec).
            </p>
            <p className="text-slate-600 mt-4">
              When choosing a banquet venue, consider the minimum number of tables required. Most hotels impose a minimum of 15-20 tables, while restaurants may be more flexible with as few as 8-10 tables. Weekend dinner sessions (Friday and Saturday) are the most expensive, while Sunday lunch sessions can save you 15-20% per table.
            </p>
          </section>

          {/* Section 3: Guo Da Li Costs Breakdown */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Guo Da Li Costs Breakdown
            </h2>
            <p className="text-slate-600 mb-4">
              Guo da li (betrothal ceremony) is one of the most important traditions in a Chinese wedding. The groom&apos;s family presents betrothal gifts to the bride&apos;s family as a formal proposal of marriage. The cost of guo da li can vary widely depending on family expectations and regional customs.
            </p>

            <div className="bg-rose-50 rounded-xl p-5 border border-rose-200 mb-6">
              <h3 className="font-bold text-rose-800 mb-3">Si Dian Jin (Four Gold Jewelry Pieces)</h3>
              <p className="text-slate-600 mb-3">
                Si dian jin literally means &quot;four touches of gold&quot; and is the highlight of the guo da li. The groom&apos;s family gifts the bride with four pieces of gold jewelry, traditionally including a necklace, a bracelet, a ring, and a pair of earrings. In Malaysia, si dian jin costs typically range as follows:
              </p>
              <ul className="text-sm text-slate-700 space-y-2">
                <li><strong>Budget set:</strong> RM5,000 - RM10,000 (916 gold, simpler designs)</li>
                <li><strong>Mid-range set:</strong> RM10,000 - RM20,000 (916 gold, detailed designs with diamonds)</li>
                <li><strong>Premium set:</strong> RM20,000 - RM50,000+ (999 gold or designer pieces, heavy weight)</li>
              </ul>
              <p className="text-xs text-rose-600 mt-3">
                Gold prices fluctuate daily. In {currentYear}, 916 gold is approximately RM350-380 per gram. A standard si dian jin set weighs 20-50 grams.
              </p>
            </div>

            <div className="bg-rose-50 rounded-xl p-5 border border-rose-200">
              <h3 className="font-bold text-rose-800 mb-3">Other Betrothal Items</h3>
              <p className="text-slate-600 mb-3">
                Beyond the si dian jin, the guo da li tray includes a variety of auspicious items:
              </p>
              <ul className="text-sm text-slate-700 space-y-2">
                <li><strong>Pin Jin (betrothal money):</strong> RM2,888 - RM18,888 in auspicious amounts, presented in a red packet</li>
                <li><strong>Wedding cakes:</strong> RM500 - RM2,000 for traditional Chinese wedding pastries (number of boxes must be even)</li>
                <li><strong>Wine and liquor:</strong> RM200 - RM800 for branded liquor, usually presented as a pair</li>
                <li><strong>Dried goods and fruits:</strong> RM300 - RM800 for items like dried longan, red dates, lotus seeds, and oranges</li>
                <li><strong>Dragon and Phoenix candles:</strong> RM50 - RM150</li>
                <li><strong>Ang pow for bride&apos;s siblings:</strong> RM100 - RM500 each</li>
              </ul>
              <p className="text-sm text-slate-600 mt-3">
                The total cost of guo da li typically ranges from <strong>RM10,000 to RM50,000+</strong>, with the si dian jin making up the largest portion. Some modern families simplify the ceremony, while traditional families may add more items.
              </p>
            </div>
          </section>

          {/* Section 4: How to Calculate Angpao Break-even */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              How to Calculate Angpao Break-even
            </h2>
            <p className="text-slate-600 mb-4">
              One of the most common questions couples ask is whether the angpao (red packet gifts) collected at the wedding dinner will cover the banquet costs. While it should not be the primary motivation for your wedding, understanding the math helps with realistic budgeting.
            </p>

            <div className="bg-rose-50 rounded-xl p-5 border border-rose-200 mb-6">
              <h3 className="font-bold text-rose-800 mb-3">Angpao Break-even Formula</h3>
              <div className="bg-white rounded-lg p-4 mb-3">
                <p className="text-center font-mono text-slate-800 text-sm">
                  Break-even per guest = Total Banquet Cost / Total Number of Guests
                </p>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                <strong>Example:</strong> If your banquet costs RM2,000 per table (10 pax) and you have 25 tables, your total banquet cost is RM50,000. With 250 guests, each guest needs to give an average of RM200 for you to break even on the banquet alone.
              </p>
              <p className="text-sm text-slate-600">
                <strong>Typical angpao amounts in Malaysia ({currentYear}):</strong> Close friends RM100-200, colleagues RM100-150, relatives RM150-300, close family RM300-500+. Couples typically give more than singles.
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">Realistic Expectations</h3>
                <p className="text-slate-600">
                  Based on current trends, most Chinese weddings in Malaysia recover approximately 50-70% of the total banquet cost through angpao. Couples with a larger proportion of close family and relatives tend to recover more, while those with mostly friends and colleagues recover less. A 5-star hotel wedding generally has lower recovery rates because the per-table cost is much higher than what most guests will give.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">Tips to Maximize Angpao Collection</h3>
                <p className="text-slate-600">
                  Choose a venue that matches your guest profile. If most of your guests are young working adults, a mid-range venue will result in a better recovery rate. Ensure your invitation is clear about the dinner location and hotel star rating, as this sets guest expectations for angpao amounts. Some couples also list their bank account on the invitation for cashless angpao, which is increasingly common.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Tips to Save on Chinese Wedding */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Tips to Save on Chinese Wedding
            </h2>
            <p className="text-slate-600 mb-4">
              A beautiful Chinese wedding does not have to break the bank. Here are five practical tips that have helped Malaysian couples save RM20,000-40,000 on their weddings without compromising on the experience:
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-sm">1</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Choose a restaurant banquet over a hotel</h3>
                  <p className="text-slate-600">Restaurant banquets cost RM600-1,500 per table compared to RM1,200-3,500+ at hotels. The food quality at many Chinese restaurants is comparable to or even better than hotel banquets. You can save 30-50% on your biggest expense by choosing a reputable Chinese restaurant. Popular choices include established seafood restaurants with private event halls.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-sm">2</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Book during off-peak months and sessions</h3>
                  <p className="text-slate-600">Peak wedding season in Malaysia is October through December. Booking in January, March, or July can save you 10-20% on venue costs. Similarly, a Sunday lunch banquet is significantly cheaper than a Saturday dinner. Some venues offer weekday dinner packages at up to 25% discount.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-sm">3</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Negotiate package deals with your venue</h3>
                  <p className="text-slate-600">Hotels and restaurants often have room to negotiate, especially if you are booking 20+ tables. Ask for complimentary items such as a wedding cake, a bridal suite stay, LED screen usage, car park passes, or a cocktail reception. Getting 2-3 quotes from different venues and showing competing offers can help you secure better rates.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-sm">4</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Source your own decorations and favors</h3>
                  <p className="text-slate-600">Wedding decor packages from external vendors are often 20-40% cheaper than what the hotel offers. For door gifts and wedding favors, shopping on Shopee or Lazada in bulk can save you hundreds. DIY touches like hand-folded origami cranes or personalized tags add charm without the premium price tag.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-sm">5</div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Be strategic with your guest list</h3>
                  <p className="text-slate-600">Every additional table costs RM800-3,500+. Trimming your guest list by just 2-3 tables can save RM2,000-10,000. Focus on inviting people who are truly important to you. Some couples opt for a smaller, intimate dinner for family and close friends, followed by a casual celebration party for the wider circle.</p>
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
                  How much does a Chinese wedding cost in Malaysia in {currentYear}?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  A Chinese wedding in Malaysia typically costs between RM30,000 and RM150,000+. Budget weddings with a restaurant banquet and 10-15 tables run RM30,000-60,000. Mid-range weddings at 4-star hotels with 20-30 tables cost RM60,000-120,000. Premium weddings at luxury 5-star venues with full styling can exceed RM120,000. The banquet is the largest expense, followed by guo da li, photography, and bridal outfits.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  How much does a Chinese wedding banquet cost per table in Malaysia?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  Banquet prices per table (10 pax) vary by venue: restaurants charge RM600-1,500, 3-star hotels RM800-1,200, 4-star hotels RM1,200-2,000, 5-star hotels RM2,000-3,500, and luxury venues RM3,500-6,000+. Prices are for the KL/Selangor area and include a standard 8-10 course Chinese dinner. Weekend dinner sessions are the most expensive, while weekday and lunch sessions offer significant savings.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  What is included in guo da li for a Chinese wedding in Malaysia?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  Guo da li (betrothal gifts) includes si dian jin (four gold jewelry pieces worth RM5,000-50,000+), pin jin (betrothal money in auspicious amounts like RM8,888 or RM18,888), wedding cakes, wine and liquor, dried goods and fruits, dragon phoenix candles, and ang pow for the bride&apos;s siblings. Total guo da li costs range from RM10,000 to RM50,000+ depending on family expectations. Modern families may simplify the items but the si dian jin remains a must-have.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  How do I calculate angpao break-even for my Chinese wedding?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  Divide your total banquet cost by the total number of guests. For example, a RM50,000 banquet with 250 guests means each guest needs to give RM200 on average for you to break even on the banquet. Typical angpao amounts in Malaysia are RM100-200 for friends, RM150-300 for relatives, and RM300-500+ for close family. Most couples recover 50-70% of their banquet costs through angpao. Higher-end venues tend to have lower recovery rates.
                </div>
              </details>
              <details className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                <summary className="p-5 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors">
                  How can I save money on a Chinese wedding in Malaysia?
                </summary>
                <div className="px-5 pb-5 text-slate-600">
                  The top strategies to save on a Chinese wedding include: choosing a restaurant banquet over a hotel (saves 30-50%), booking during off-peak months like January or July, negotiating package deals and comparing 3+ venue quotes, sourcing decorations and favors independently, and being strategic with your guest list. Many couples save RM20,000-40,000 by combining these approaches without sacrificing the quality of their celebration.
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
