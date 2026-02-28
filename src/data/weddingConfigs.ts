export type WeddingType = "chinese" | "indian" | "malay" | "christian";

export interface WOption { label: string; min: number; max: number; }

export interface WItem {
  id: string;
  label: string;
  type: "dropdown" | "slider" | "toggle" | "input";
  options?: WOption[];
  defaultValue: number | boolean;
  min?: number; max?: number; step?: number;
  addMin?: number; addMax?: number;
  multiplyBy?: string;
  showIf?: string;
}

export interface WSection { title: string; icon: string; items: WItem[]; }

export interface WConfig {
  type: WeddingType;
  calculatorType: string;
  gradientFrom: string;
  gradientTo: string;
  gradientVia?: string;
  heroEmoji: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  socialProof: string;
  labels: { totalCost: string; giftTotal: string; netCost: string; surplus: string; shortfall: string; };
  cta: { heading: string; subtext: string; button: string; trust: string; };
  sections: WSection[];
  giftSection: { title: string; items: WItem[]; };
  getGuestCount: (v: Record<string, number | boolean>) => number;
  calculateGifts: (v: Record<string, number | boolean>, guestCount: number, giftItems: WItem[]) => number;
}

// ═══════════════════════════════════════════════
// CHINESE WEDDING CONFIG
// ═══════════════════════════════════════════════
const chineseConfig: WConfig = {
  type: "chinese",
  calculatorType: "chinese_wedding",
  gradientFrom: "from-red-700",
  gradientTo: "to-red-600",
  heroEmoji: "🏮",
  heroTitle: "Chinese Wedding Cost Calculator Malaysia",
  heroSubtitle: "Estimate your wedding budget and calculate angpao break-even",
  heroBadge: "🧧 Free Calculator",
  socialProof: "RM4.2M in weddings planned this year",
  labels: { totalCost: "Total Wedding Cost", giftTotal: "Expected Angpao Collection", netCost: "Net Cost (after angpao)", surplus: "Angpao Surplus", shortfall: "Shortfall" },
  cta: { heading: "Get Quotes from Top Wedding Vendors", subtext: "Compare banquet venues, bridal houses & photographers", button: "Get Free Quotes →", trust: "✓ 200+ couples planned with us" },
  sections: [
    {
      title: "Banquet", icon: "🏮",
      items: [
        { id: "num_tables", label: "Number of Tables", type: "slider", defaultValue: 30, min: 10, max: 50, step: 1 },
        { id: "price_per_table", label: "Price per Table", type: "dropdown", defaultValue: 1, multiplyBy: "num_tables", options: [
          { label: "Budget (RM800-1,200/table)", min: 800, max: 1200 },
          { label: "Standard (RM1,200-1,800/table)", min: 1200, max: 1800 },
          { label: "Premium (RM1,800-2,500/table)", min: 1800, max: 2500 },
          { label: "Luxury (RM2,500-4,000/table)", min: 2500, max: 4000 },
        ]},
        { id: "venue_type", label: "Venue Type", type: "dropdown", defaultValue: 0, options: [
          { label: "Restaurant", min: 0, max: 0 },
          { label: "3-star Hotel", min: 0, max: 0 },
          { label: "4-star Hotel", min: 0, max: 0 },
          { label: "5-star Hotel", min: 0, max: 0 },
        ]},
        { id: "corkage", label: "Corkage (own liquor)", type: "toggle", defaultValue: false, addMin: 30, addMax: 50, multiplyBy: "num_tables" },
      ],
    },
    {
      title: "Guo Da Li (Betrothal)", icon: "🎎",
      items: [
        { id: "guo_da_li", label: "Include Guo Da Li", type: "toggle", defaultValue: true, addMin: 0, addMax: 0 },
        { id: "bride_price", label: "Si Dian Jin (Bride Price)", type: "dropdown", defaultValue: 1, showIf: "guo_da_li", options: [
          { label: "RM5,000", min: 5000, max: 5000 },
          { label: "RM10,000", min: 10000, max: 10000 },
          { label: "RM18,000", min: 18000, max: 18000 },
          { label: "RM28,000", min: 28000, max: 28000 },
        ]},
        { id: "betrothal_items", label: "Betrothal Items", type: "dropdown", defaultValue: 1, showIf: "guo_da_li", options: [
          { label: "Basic (RM2,000)", min: 2000, max: 2000 },
          { label: "Standard (RM4,000)", min: 4000, max: 4000 },
          { label: "Premium (RM8,000)", min: 8000, max: 8000 },
        ]},
      ],
    },
    {
      title: "Bridal Package", icon: "👰",
      items: [
        { id: "photo_gown", label: "Photography + Gown Package", type: "dropdown", defaultValue: 1, options: [
          { label: "Basic (RM3,000-5,000)", min: 3000, max: 5000 },
          { label: "Standard (RM5,000-8,000)", min: 5000, max: 8000 },
          { label: "Premium (RM8,000-15,000)", min: 8000, max: 15000 },
          { label: "Luxury (RM15,000-25,000)", min: 15000, max: 25000 },
        ]},
        { id: "makeup", label: "Actual Day Makeup & Hair", type: "dropdown", defaultValue: 1, options: [
          { label: "RM800", min: 800, max: 800 },
          { label: "RM1,200", min: 1200, max: 1200 },
          { label: "RM1,800", min: 1800, max: 1800 },
          { label: "RM2,500", min: 2500, max: 2500 },
        ]},
      ],
    },
    {
      title: "Others", icon: "💍",
      items: [
        { id: "wedding_bands", label: "Wedding Bands", type: "dropdown", defaultValue: 0, options: [
          { label: "RM2,000", min: 2000, max: 2000 },
          { label: "RM5,000", min: 5000, max: 5000 },
          { label: "RM10,000", min: 10000, max: 10000 },
          { label: "RM20,000+", min: 20000, max: 20000 },
        ]},
        { id: "decoration", label: "Decoration Upgrade", type: "dropdown", defaultValue: 0, options: [
          { label: "None", min: 0, max: 0 },
          { label: "Basic (+RM1,500)", min: 1500, max: 1500 },
          { label: "Premium (+RM3,500)", min: 3500, max: 3500 },
        ]},
        { id: "entertainment", label: "Live Band / DJ", type: "dropdown", defaultValue: 0, options: [
          { label: "None", min: 0, max: 0 },
          { label: "DJ (RM1,500)", min: 1500, max: 1500 },
          { label: "Live Band (RM3,500)", min: 3500, max: 3500 },
        ]},
        { id: "favors", label: "Wedding Favors", type: "input", defaultValue: 500 },
        { id: "misc", label: "Miscellaneous", type: "input", defaultValue: 2000 },
      ],
    },
  ],
  giftSection: {
    title: "Angpao Offset Calculator", items: [
      { id: "angpao_per_guest", label: "Expected Angpao per Guest", type: "dropdown", defaultValue: 1, options: [
        { label: "RM100", min: 100, max: 100 },
        { label: "RM150", min: 150, max: 150 },
        { label: "RM200", min: 200, max: 200 },
        { label: "RM250", min: 250, max: 250 },
      ]},
    ],
  },
  getGuestCount: (v) => (v.num_tables as number || 30) * 10,
  calculateGifts: (v, guestCount, items) => {
    const idx = (v.angpao_per_guest as number) || 0;
    const opt = items[0]?.options?.[idx];
    return (opt?.min || 100) * guestCount;
  },
};

// ═══════════════════════════════════════════════
// INDIAN WEDDING CONFIG
// ═══════════════════════════════════════════════
const indianConfig: WConfig = {
  type: "indian",
  calculatorType: "indian_wedding",
  gradientFrom: "from-red-900",
  gradientVia: "via-red-800",
  gradientTo: "to-orange-700",
  heroEmoji: "🛕",
  heroTitle: "Indian Wedding Cost Calculator Malaysia",
  heroSubtitle: "Plan your dream wedding budget — from mehendi to reception",
  heroBadge: "🪔 Free Calculator",
  socialProof: "RM3.8M in weddings planned this year",
  labels: { totalCost: "Total Wedding Cost", giftTotal: "Expected Gift Collection", netCost: "Net Cost (after gifts)", surplus: "Gift Surplus", shortfall: "Shortfall" },
  cta: { heading: "Get Quotes from Indian Wedding Specialists", subtext: "Compare venues, caterers, decorators & photographers", button: "Get Free Quotes →", trust: "✓ 150+ couples planned with us" },
  sections: [
    {
      title: "Venue & Ceremony", icon: "🕉️",
      items: [
        { id: "ceremony_type", label: "Ceremony Type", type: "dropdown", defaultValue: 1, options: [
          { label: "Temple Wedding", min: 3000, max: 8000 },
          { label: "Hall/Hotel Wedding", min: 8000, max: 25000 },
          { label: "Outdoor/Destination", min: 15000, max: 50000 },
        ]},
        { id: "num_guests", label: "Number of Guests", type: "slider", defaultValue: 300, min: 100, max: 1000, step: 10 },
        { id: "num_events", label: "Number of Events", type: "dropdown", defaultValue: 1, options: [
          { label: "1 day (ceremony only)", min: 0, max: 0 },
          { label: "2 days (mehendi + wedding)", min: 5000, max: 10000 },
          { label: "3 days (mehendi + sangeet + wedding)", min: 12000, max: 20000 },
        ]},
      ],
    },
    {
      title: "Catering", icon: "🍛",
      items: [
        { id: "catering", label: "Catering Style", type: "dropdown", defaultValue: 1, multiplyBy: "num_guests", options: [
          { label: "Banana Leaf (RM25-35/pax)", min: 25, max: 35 },
          { label: "Buffet Standard (RM40-60/pax)", min: 40, max: 60 },
          { label: "Buffet Premium (RM60-100/pax)", min: 60, max: 100 },
          { label: "Fine Dining (RM100-150/pax)", min: 100, max: 150 },
        ]},
      ],
    },
    {
      title: "Attire & Jewelry", icon: "👗",
      items: [
        { id: "bride_attire", label: "Bride Saree/Lehenga", type: "dropdown", defaultValue: 1, options: [
          { label: "Budget (RM1,000-3,000)", min: 1000, max: 3000 },
          { label: "Standard (RM3,000-8,000)", min: 3000, max: 8000 },
          { label: "Designer (RM8,000-20,000)", min: 8000, max: 20000 },
          { label: "Luxury (RM20,000+)", min: 20000, max: 25000 },
        ]},
        { id: "groom_outfit", label: "Groom Outfit", type: "dropdown", defaultValue: 1, options: [
          { label: "RM500", min: 500, max: 500 },
          { label: "RM1,500", min: 1500, max: 1500 },
          { label: "RM3,000", min: 3000, max: 3000 },
          { label: "RM5,000+", min: 5000, max: 5000 },
        ]},
        { id: "thali", label: "Thali/Mangal Sutra", type: "dropdown", defaultValue: 1, options: [
          { label: "RM3,000", min: 3000, max: 3000 },
          { label: "RM5,000", min: 5000, max: 5000 },
          { label: "RM10,000", min: 10000, max: 10000 },
          { label: "RM20,000+", min: 20000, max: 20000 },
        ]},
        { id: "bride_jewelry", label: "Bride Jewelry Set", type: "dropdown", defaultValue: 0, options: [
          { label: "RM5,000", min: 5000, max: 5000 },
          { label: "RM15,000", min: 15000, max: 15000 },
          { label: "RM30,000", min: 30000, max: 30000 },
          { label: "RM50,000+", min: 50000, max: 50000 },
        ]},
      ],
    },
    {
      title: "Decor & Entertainment", icon: "🎭",
      items: [
        { id: "mandap", label: "Stage Decoration (Mandap)", type: "dropdown", defaultValue: 1, options: [
          { label: "Simple (RM2,000-5,000)", min: 2000, max: 5000 },
          { label: "Standard (RM5,000-12,000)", min: 5000, max: 12000 },
          { label: "Grand (RM12,000-25,000)", min: 12000, max: 25000 },
          { label: "Luxury (RM25,000+)", min: 25000, max: 30000 },
        ]},
        { id: "fresh_flowers", label: "Fresh Flowers", type: "toggle", defaultValue: false, addMin: 3000, addMax: 8000 },
        { id: "music", label: "Live Music / DJ", type: "dropdown", defaultValue: 0, options: [
          { label: "None", min: 0, max: 0 },
          { label: "DJ (RM2,000)", min: 2000, max: 2000 },
          { label: "Live Band (RM5,000)", min: 5000, max: 5000 },
          { label: "Orchestra (RM10,000+)", min: 10000, max: 10000 },
        ]},
      ],
    },
    {
      title: "Photography & Video", icon: "📸",
      items: [
        { id: "photo_video", label: "Package", type: "dropdown", defaultValue: 1, options: [
          { label: "Basic (RM3,000-5,000)", min: 3000, max: 5000 },
          { label: "Standard (RM5,000-10,000)", min: 5000, max: 10000 },
          { label: "Cinematic (RM10,000-20,000)", min: 10000, max: 20000 },
          { label: "Premium (RM20,000+)", min: 20000, max: 25000 },
        ]},
        { id: "drone", label: "Drone Coverage", type: "toggle", defaultValue: false, addMin: 1500, addMax: 1500 },
      ],
    },
    {
      title: "Others", icon: "📋",
      items: [
        { id: "invitations", label: "Wedding Invitations", type: "input", defaultValue: 1500 },
        { id: "priest_fees", label: "Priest/Ceremony Fees", type: "input", defaultValue: 1000 },
        { id: "transport", label: "Transport (Decorated Car)", type: "dropdown", defaultValue: 0, options: [
          { label: "None", min: 0, max: 0 },
          { label: "Standard (RM500)", min: 500, max: 500 },
          { label: "Luxury (RM1,500)", min: 1500, max: 1500 },
        ]},
        { id: "misc", label: "Miscellaneous", type: "input", defaultValue: 3000 },
      ],
    },
  ],
  giftSection: {
    title: "Gift Offset Calculator", items: [
      { id: "gift_per_family", label: "Expected Gift per Family", type: "dropdown", defaultValue: 1, options: [
        { label: "RM100", min: 100, max: 100 },
        { label: "RM200", min: 200, max: 200 },
        { label: "RM300", min: 300, max: 300 },
        { label: "RM500", min: 500, max: 500 },
      ]},
      { id: "est_families", label: "Estimated Families Giving", type: "slider", defaultValue: 40, min: 10, max: 200, step: 5 },
    ],
  },
  getGuestCount: (v) => (v.num_guests as number) || 300,
  calculateGifts: (v, _gc, items) => {
    const idx = (v.gift_per_family as number) || 0;
    const opt = items[0]?.options?.[idx];
    const families = (v.est_families as number) || 40;
    return (opt?.min || 100) * families;
  },
};

// ═══════════════════════════════════════════════
// MALAY WEDDING CONFIG
// ═══════════════════════════════════════════════
const malayConfig: WConfig = {
  type: "malay",
  calculatorType: "malay_wedding",
  gradientFrom: "from-violet-700",
  gradientTo: "to-purple-600",
  heroEmoji: "🪷",
  heroTitle: "Kalkulator Kos Kahwin Malaysia",
  heroSubtitle: "Rancang bajet perkahwinan anda dengan tepat",
  heroBadge: "💒 Kalkulator Percuma",
  socialProof: "RM6.5M kos kahwin dikira tahun ini",
  labels: { totalCost: "Jumlah Kos Kahwin", giftTotal: "Jangkaan Sumbangan", netCost: "Kos Bersih", surplus: "Lebihan", shortfall: "Kekurangan" },
  cta: { heading: "Dapatkan Sebut Harga Pakej Kahwin", subtext: "Bandingkan dewan, katering, pelamin & fotografi", button: "Minta Sebut Harga →", trust: "✓ 500+ pasangan telah merancang bersama kami" },
  sections: [
    {
      title: "Dewan & Katering", icon: "🏛️",
      items: [
        { id: "venue", label: "Jenis Majlis (Event Type)", type: "dropdown", defaultValue: 1, options: [
          { label: "Rumah Sahaja (Home)", min: 0, max: 0 },
          { label: "Dewan Komuniti (Community Hall)", min: 1000, max: 3000 },
          { label: "Dewan Hotel (Hotel Ballroom)", min: 5000, max: 15000 },
          { label: "Outdoor/Garden", min: 3000, max: 10000 },
        ]},
        { id: "num_guests", label: "Bilangan Tetamu (Guests)", type: "slider", defaultValue: 500, min: 200, max: 1500, step: 50 },
        { id: "catering", label: "Katering (per pax)", type: "dropdown", defaultValue: 1, multiplyBy: "num_guests", options: [
          { label: "Ekonomi (RM15-25/pax)", min: 15, max: 25 },
          { label: "Standard (RM25-40/pax)", min: 25, max: 40 },
          { label: "Premium (RM40-60/pax)", min: 40, max: 60 },
          { label: "Mewah (RM60-100/pax)", min: 60, max: 100 },
        ]},
      ],
    },
    {
      title: "Pelamin & Dekorasi", icon: "🪷",
      items: [
        { id: "pelamin", label: "Pakej Pelamin (Dais)", type: "dropdown", defaultValue: 1, options: [
          { label: "Simple (RM1,500-3,000)", min: 1500, max: 3000 },
          { label: "Moden (RM3,000-6,000)", min: 3000, max: 6000 },
          { label: "Grand (RM6,000-12,000)", min: 6000, max: 12000 },
          { label: "Luxury (RM12,000-25,000)", min: 12000, max: 25000 },
        ]},
        { id: "fresh_flowers", label: "Bunga Segar (Fresh Flowers)", type: "toggle", defaultValue: false, addMin: 2000, addMax: 5000 },
      ],
    },
    {
      title: "Pakaian Pengantin", icon: "👗",
      items: [
        { id: "bridal_package", label: "Pakej Pengantin (Dress + Makeup)", type: "dropdown", defaultValue: 1, options: [
          { label: "Budget (RM1,500-3,000)", min: 1500, max: 3000 },
          { label: "Standard (RM3,000-6,000)", min: 3000, max: 6000 },
          { label: "Premium (RM6,000-12,000)", min: 6000, max: 12000 },
          { label: "Designer (RM12,000+)", min: 12000, max: 15000 },
        ]},
        { id: "extra_outfits", label: "Persalinan Tambahan (Extra Outfits)", type: "dropdown", defaultValue: 0, options: [
          { label: "Tiada (None)", min: 0, max: 0 },
          { label: "1 set (+RM800)", min: 800, max: 800 },
          { label: "2 sets (+RM1,500)", min: 1500, max: 1500 },
        ]},
      ],
    },
    {
      title: "Hantaran", icon: "🎁",
      items: [
        { id: "hantaran_trays", label: "Bilangan Dulang (Trays)", type: "dropdown", defaultValue: 1, options: [
          { label: "5 dulang", min: 5, max: 5 },
          { label: "7 dulang", min: 7, max: 7 },
          { label: "9 dulang", min: 9, max: 9 },
          { label: "11 dulang", min: 11, max: 11 },
        ]},
        { id: "hantaran_value", label: "Nilai Setiap Dulang (per tray)", type: "dropdown", defaultValue: 1, options: [
          { label: "RM200", min: 200, max: 200 },
          { label: "RM300", min: 300, max: 300 },
          { label: "RM500", min: 500, max: 500 },
          { label: "RM800", min: 800, max: 800 },
        ]},
      ],
    },
    {
      title: "Kompang & Hiburan", icon: "🥁",
      items: [
        { id: "kompang", label: "Kompang", type: "dropdown", defaultValue: 0, options: [
          { label: "Tiada (None)", min: 0, max: 0 },
          { label: "Standard (RM800)", min: 800, max: 800 },
          { label: "Full Troupe (RM1,500)", min: 1500, max: 1500 },
        ]},
        { id: "dj_pa", label: "DJ/PA System", type: "dropdown", defaultValue: 0, options: [
          { label: "Tiada (None)", min: 0, max: 0 },
          { label: "Basic (RM800)", min: 800, max: 800 },
          { label: "Full (RM1,500)", min: 1500, max: 1500 },
        ]},
      ],
    },
    {
      title: "Fotografi & Video", icon: "📸",
      items: [
        { id: "photo_video", label: "Pakej (Package)", type: "dropdown", defaultValue: 1, options: [
          { label: "Basic (RM2,000-4,000)", min: 2000, max: 4000 },
          { label: "Standard (RM4,000-7,000)", min: 4000, max: 7000 },
          { label: "Premium (RM7,000-12,000)", min: 7000, max: 12000 },
          { label: "Cinematic (RM12,000+)", min: 12000, max: 15000 },
        ]},
      ],
    },
    {
      title: "Lain-lain (Others)", icon: "📋",
      items: [
        { id: "invitations", label: "Kad Jemputan (Invitations)", type: "input", defaultValue: 800 },
        { id: "door_gift", label: "Buah Tangan / Door Gift", type: "input", defaultValue: 1500 },
        { id: "tent", label: "Khemah (Tent)", type: "dropdown", defaultValue: 0, options: [
          { label: "Tiada (None)", min: 0, max: 0 },
          { label: "Small (RM2,000)", min: 2000, max: 2000 },
          { label: "Large (RM4,000)", min: 4000, max: 4000 },
        ]},
        { id: "misc", label: "Lain-lain (Miscellaneous)", type: "input", defaultValue: 2000 },
      ],
    },
  ],
  giftSection: {
    title: "Sumbangan Tetamu (Guest Contributions)", items: [
      { id: "contribution", label: "Jangkaan Sumbangan (per envelope)", type: "dropdown", defaultValue: 1, options: [
        { label: "RM30", min: 30, max: 30 },
        { label: "RM50", min: 50, max: 50 },
        { label: "RM100", min: 100, max: 100 },
      ]},
      { id: "pct_giving", label: "Peratus Tetamu Memberi (%)", type: "slider", defaultValue: 70, min: 30, max: 100, step: 5 },
    ],
  },
  getGuestCount: (v) => (v.num_guests as number) || 500,
  calculateGifts: (v, guestCount, items) => {
    const idx = (v.contribution as number) || 0;
    const opt = items[0]?.options?.[idx];
    const pct = (v.pct_giving as number) || 70;
    return Math.round((opt?.min || 30) * guestCount * pct / 100);
  },
};

// ═══════════════════════════════════════════════
// CHRISTIAN WEDDING CONFIG
// ═══════════════════════════════════════════════
const christianConfig: WConfig = {
  type: "christian",
  calculatorType: "christian_wedding",
  gradientFrom: "from-blue-700",
  gradientTo: "to-indigo-600",
  heroEmoji: "⛪",
  heroTitle: "Christian Wedding Cost Calculator Malaysia",
  heroSubtitle: "Plan your church or garden wedding budget",
  heroBadge: "💒 Free Calculator",
  socialProof: "RM2.1M in weddings planned this year",
  labels: { totalCost: "Total Wedding Cost", giftTotal: "Expected Gift Collection", netCost: "Net Cost (after gifts)", surplus: "Gift Surplus", shortfall: "Shortfall" },
  cta: { heading: "Find Your Perfect Wedding Vendors", subtext: "Compare venues, photographers, florists & planners", button: "Get Free Quotes →", trust: "✓ 100+ couples planned with us" },
  sections: [
    {
      title: "Ceremony Venue", icon: "⛪",
      items: [
        { id: "ceremony_venue", label: "Ceremony Type", type: "dropdown", defaultValue: 0, options: [
          { label: "Church (donation)", min: 500, max: 2000 },
          { label: "Chapel", min: 2000, max: 5000 },
          { label: "Garden/Outdoor", min: 5000, max: 15000 },
          { label: "Hotel Ballroom", min: 3000, max: 10000 },
        ]},
        { id: "church_donation", label: "Church Booking/Donation", type: "input", defaultValue: 1000 },
      ],
    },
    {
      title: "Reception", icon: "🥂",
      items: [
        { id: "reception_venue", label: "Reception Venue", type: "dropdown", defaultValue: 1, options: [
          { label: "Church Hall (RM1,000-3,000)", min: 1000, max: 3000 },
          { label: "Restaurant (RM3,000-8,000)", min: 3000, max: 8000 },
          { label: "Hotel Ballroom (RM8,000-25,000)", min: 8000, max: 25000 },
          { label: "Garden/Glasshouse (RM5,000-20,000)", min: 5000, max: 20000 },
        ]},
        { id: "num_guests", label: "Number of Guests", type: "slider", defaultValue: 150, min: 50, max: 500, step: 10 },
        { id: "catering", label: "Catering Style", type: "dropdown", defaultValue: 0, multiplyBy: "num_guests", options: [
          { label: "Buffet Standard (RM50-80/pax)", min: 50, max: 80 },
          { label: "Buffet Premium (RM80-120/pax)", min: 80, max: 120 },
          { label: "Plated Dinner (RM100-150/pax)", min: 100, max: 150 },
          { label: "Fine Dining (RM150-250/pax)", min: 150, max: 250 },
        ]},
      ],
    },
    {
      title: "Attire", icon: "👰",
      items: [
        { id: "wedding_gown", label: "Wedding Gown", type: "dropdown", defaultValue: 1, options: [
          { label: "Rental (RM1,000-3,000)", min: 1000, max: 3000 },
          { label: "Purchase Budget (RM3,000-6,000)", min: 3000, max: 6000 },
          { label: "Purchase Premium (RM6,000-15,000)", min: 6000, max: 15000 },
          { label: "Designer (RM15,000+)", min: 15000, max: 20000 },
        ]},
        { id: "groom_suit", label: "Groom Suit", type: "dropdown", defaultValue: 0, options: [
          { label: "Rental (RM500)", min: 500, max: 500 },
          { label: "Purchase (RM1,500)", min: 1500, max: 1500 },
          { label: "Tailored (RM3,000+)", min: 3000, max: 3000 },
        ]},
        { id: "bridesmaids", label: "Bridesmaids Dresses", type: "input", defaultValue: 1500 },
        { id: "groomsmen", label: "Groomsmen Attire", type: "input", defaultValue: 1000 },
      ],
    },
    {
      title: "Flowers & Decor", icon: "💐",
      items: [
        { id: "bouquet", label: "Bridal Bouquet", type: "dropdown", defaultValue: 1, options: [
          { label: "RM300", min: 300, max: 300 },
          { label: "RM500", min: 500, max: 500 },
          { label: "RM800", min: 800, max: 800 },
          { label: "RM1,200", min: 1200, max: 1200 },
        ]},
        { id: "venue_flowers", label: "Church/Venue Flowers", type: "dropdown", defaultValue: 1, options: [
          { label: "Simple (RM1,000-2,000)", min: 1000, max: 2000 },
          { label: "Standard (RM2,000-5,000)", min: 2000, max: 5000 },
          { label: "Elaborate (RM5,000-10,000)", min: 5000, max: 10000 },
        ]},
        { id: "reception_decor", label: "Reception Decor", type: "dropdown", defaultValue: 1, options: [
          { label: "DIY/Minimal (RM1,000-3,000)", min: 1000, max: 3000 },
          { label: "Standard (RM3,000-8,000)", min: 3000, max: 8000 },
          { label: "Premium (RM8,000-15,000)", min: 8000, max: 15000 },
        ]},
      ],
    },
    {
      title: "Music & Entertainment", icon: "🎵",
      items: [
        { id: "church_music", label: "Church Music", type: "dropdown", defaultValue: 0, options: [
          { label: "Church Choir (free/donation)", min: 0, max: 0 },
          { label: "Solo Singer (RM500-1,000)", min: 500, max: 1000 },
          { label: "Live Band (RM2,000-5,000)", min: 2000, max: 5000 },
        ]},
        { id: "reception_music", label: "Reception Entertainment", type: "dropdown", defaultValue: 0, options: [
          { label: "DJ (RM1,500)", min: 1500, max: 1500 },
          { label: "Live Band (RM3,500-8,000)", min: 3500, max: 8000 },
          { label: "String Quartet (RM2,500)", min: 2500, max: 2500 },
        ]},
      ],
    },
    {
      title: "Photography & Video", icon: "📸",
      items: [
        { id: "photo_video", label: "Package", type: "dropdown", defaultValue: 1, options: [
          { label: "Basic (RM3,000-5,000)", min: 3000, max: 5000 },
          { label: "Standard (RM5,000-10,000)", min: 5000, max: 10000 },
          { label: "Premium (RM10,000-18,000)", min: 10000, max: 18000 },
          { label: "Luxury (RM18,000+)", min: 18000, max: 22000 },
        ]},
      ],
    },
    {
      title: "Others", icon: "📋",
      items: [
        { id: "invitations", label: "Wedding Invitations", type: "input", defaultValue: 1000 },
        { id: "cake", label: "Wedding Cake", type: "dropdown", defaultValue: 1, options: [
          { label: "RM500", min: 500, max: 500 },
          { label: "RM1,000", min: 1000, max: 1000 },
          { label: "RM2,000", min: 2000, max: 2000 },
          { label: "RM3,000+", min: 3000, max: 3000 },
        ]},
        { id: "transport", label: "Transport", type: "dropdown", defaultValue: 0, options: [
          { label: "None", min: 0, max: 0 },
          { label: "Decorated Car (RM800)", min: 800, max: 800 },
          { label: "Vintage Car (RM2,000)", min: 2000, max: 2000 },
        ]},
        { id: "pastor_gift", label: "Officiant/Pastor Gift", type: "input", defaultValue: 500 },
        { id: "misc", label: "Miscellaneous", type: "input", defaultValue: 2000 },
      ],
    },
  ],
  giftSection: {
    title: "Gift Offset Calculator", items: [
      { id: "gift_per_couple", label: "Expected Gift per Couple", type: "dropdown", defaultValue: 1, options: [
        { label: "RM100", min: 100, max: 100 },
        { label: "RM150", min: 150, max: 150 },
        { label: "RM200", min: 200, max: 200 },
        { label: "RM300", min: 300, max: 300 },
      ]},
      { id: "est_couples", label: "Estimated Couples Giving", type: "slider", defaultValue: 60, min: 10, max: 200, step: 5 },
    ],
  },
  getGuestCount: (v) => (v.num_guests as number) || 150,
  calculateGifts: (v, _gc, items) => {
    const idx = (v.gift_per_couple as number) || 0;
    const opt = items[0]?.options?.[idx];
    const couples = (v.est_couples as number) || 60;
    return (opt?.min || 100) * couples;
  },
};

// Special handling for Malay hantaran calculation
function calculateHantaranCost(v: Record<string, number | boolean>, sections: WSection[]): { min: number; max: number } {
  const hantaranSection = sections.find(s => s.title === "Hantaran");
  if (!hantaranSection) return { min: 0, max: 0 };
  const traysIdx = (v.hantaran_trays as number) || 0;
  const valueIdx = (v.hantaran_value as number) || 0;
  const traysOpt = hantaranSection.items[0]?.options?.[traysIdx];
  const valueOpt = hantaranSection.items[1]?.options?.[valueIdx];
  const numTrays = traysOpt?.min || 5;
  const perTray = valueOpt?.min || 200;
  return { min: numTrays * perTray, max: numTrays * perTray };
}

export { calculateHantaranCost };

export const weddingConfigs: Record<WeddingType, WConfig> = {
  chinese: chineseConfig,
  indian: indianConfig,
  malay: malayConfig,
  christian: christianConfig,
};
