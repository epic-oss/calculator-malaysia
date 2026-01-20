export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: "insurance" | "loan" | "property" | "credit-card" | "tax" | "salary" | "investment" | "cgpa" | "auto";
  icon: string;
  slug: string;
  featured?: boolean;
  stats?: string[];
  colSpan?: number;
}

export const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  insurance: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  loan: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
  property: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
  "credit-card": { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
  tax: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
  salary: { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200" },
  investment: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
  cgpa: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
  auto: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
};

export const categoryLabels: Record<string, string> = {
  insurance: "Insurance",
  loan: "Loans",
  property: "Property",
  "credit-card": "Credit Cards",
  tax: "Tax & Salary",
  salary: "Salary",
  investment: "Investment",
  cgpa: "CGPA",
  auto: "Auto",
};

export const calculators: Calculator[] = [
  // FEATURED - EV Insurance (1,374 clicks)
  {
    id: "ev-insurance",
    name: "EV Car Insurance Calculator Malaysia 2026",
    description: "Calculate your electric vehicle insurance premium and road tax in seconds. Compare prices from 15+ insurers.",
    category: "insurance",
    icon: "🚗",
    slug: "/insurance/ev-car-insurance-calculator-malaysia/",
    featured: true,
    stats: ["28+ EV Models", "Instant Quote", "Free Comparison"],
  },

  // INSURANCE CALCULATORS
  {
    id: "motorcycle-insurance",
    name: "Road Tax & Motorcycle Insurance Calculator",
    description: "Calculate motorcycle insurance premium and road tax. Compare third party vs comprehensive coverage.",
    category: "insurance",
    icon: "🏍️",
    slug: "/insurance/road-tax-and-motorcycle-insurance-calculator/",
    colSpan: 6,
  },
  {
    id: "car-insurance",
    name: "Car Insurance Calculator",
    description: "Calculate car insurance premium and road tax. Compare comprehensive vs third party coverage.",
    category: "insurance",
    icon: "🚙",
    slug: "/insurance/car-insurance-calculator-malaysia/",
    colSpan: 6,
  },
  {
    id: "allianz-motorcycle",
    name: "Allianz Motorcycle Insurance",
    description: "Get Allianz motorcycle insurance quote instantly",
    category: "insurance",
    icon: "🛡️",
    slug: "/insurance/allianz-motorcycle-insurance-calculator-malaysia/",
    colSpan: 4,
  },
  {
    id: "cheapest-motorcycle",
    name: "Cheapest Motorcycle Insurance",
    description: "Find the cheapest motorcycle insurance in Malaysia",
    category: "insurance",
    icon: "💸",
    slug: "/insurance/cheapest-motorcycle-insurance-calculator-malaysia/",
    colSpan: 4,
  },
  {
    id: "kalkulator-insurans-motor",
    name: "Kalkulator Insurans Motor Malaysia",
    description: "Kira premium insurans motor anda dengan segera",
    category: "insurance",
    icon: "🏍️",
    slug: "/insurance/kalkulator-insurans-motor-malaysia/",
    colSpan: 4,
  },

  // LOAN CALCULATORS
  {
    id: "car-loan-settlement",
    name: "Car Loan Early Settlement Calculator",
    description: "Calculate if settling your car loan early saves money. See penalties, interest savings & get recommendations.",
    category: "loan",
    icon: "🚗",
    slug: "/loan/car-loan-settlement-calculator-malaysia/",
    colSpan: 6,
  },
  {
    id: "car-loan",
    name: "Car Loan Calculator Malaysia",
    description: "Calculate car loan monthly payment and total interest for hire purchase.",
    category: "loan",
    icon: "🚙",
    slug: "/loan/car-loan-calculator-malaysia/",
    colSpan: 6,
  },
  {
    id: "housing-loan-settlement",
    name: "Early Housing Loan Settlement Calculator",
    description: "Find out if settling your housing loan early makes financial sense. Calculate savings, penalties & get recommendations.",
    category: "loan",
    icon: "🏠",
    slug: "/loan/early-housing-loan-settlement-calculator-malaysia/",
    colSpan: 6,
  },
  {
    id: "house-loan",
    name: "House Loan Calculator Malaysia",
    description: "Calculate monthly instalment, total interest, and upfront costs for housing loans.",
    category: "loan",
    icon: "🏡",
    slug: "/loan/house-loan-calculator-malaysia/",
    colSpan: 6,
  },
  {
    id: "personal-loan",
    name: "Personal Loan Calculator Based on Salary",
    description: "Calculate monthly payment, total interest, and check DSR eligibility for personal loans.",
    category: "loan",
    icon: "💵",
    slug: "/loan/personal-loan-calculator-malaysia-based-on-salary/",
    colSpan: 6,
  },
  {
    id: "joint-home-loan",
    name: "Joint Home Loan Eligibility Calculator",
    description: "Calculate combined loan eligibility for couples & co-borrowers",
    category: "loan",
    icon: "👫",
    slug: "/loan/joint-home-loan-eligibility-calculator-malaysia/",
    colSpan: 6,
  },
  {
    id: "home-loan-eligibility",
    name: "Home Loan Eligibility Calculator",
    description: "Check how much housing loan you qualify for based on DSR",
    category: "loan",
    icon: "🏦",
    slug: "/loan/home-loan-eligibility-calculator-malaysia/",
    colSpan: 6,
  },

  // PROPERTY CALCULATORS
  {
    id: "refinance-calculator",
    name: "Refinance Housing Loan Calculator",
    description: "Calculate how much you can save by refinancing your home loan. Compare rates from 15+ banks.",
    category: "property",
    icon: "🏠",
    slug: "/property/refinance-housing-loan-calculator-malaysia/",
    colSpan: 6,
  },
  {
    id: "kalkulator-refinance",
    name: "Kalkulator Refinance Pinjaman Rumah",
    description: "Kira penjimatan refinance pinjaman perumahan anda. Bandingkan kadar dari 15+ bank.",
    category: "property",
    icon: "🏠",
    slug: "/property/kalkulator-refinance-pinjaman-perumahan/",
    colSpan: 6,
  },
  {
    id: "quit-rent",
    name: "Quit Rent Calculator Selangor (Cukai Tanah)",
    description: "Calculate quit rent for Selangor and all states. Check rates, deadlines, and pay online.",
    category: "property",
    icon: "📜",
    slug: "/property/quit-rent-calculator-selangor/",
    colSpan: 6,
  },

  // CREDIT CARD CALCULATORS
  {
    id: "credit-card-minimum",
    name: "Credit Card Minimum Payment Calculator",
    description: "See how long it takes to pay off with minimum payments. Escape the debt trap.",
    category: "credit-card",
    icon: "💳",
    slug: "/credit-card/credit-card-minimum-payment-calculator-malaysia/",
    colSpan: 6,
  },
  {
    id: "credit-card-interest",
    name: "Credit Card Interest Calculator",
    description: "Calculate daily interest rate, time to pay off, and total interest",
    category: "credit-card",
    icon: "📈",
    slug: "/credit-card/credit-card-interest-calculator-malaysia/",
    colSpan: 6,
  },
  {
    id: "credit-card-malaysia",
    name: "Credit Card Calculator Malaysia",
    description: "Compare credit cards and calculate rewards",
    category: "credit-card",
    icon: "🎁",
    slug: "/credit-card/credit-card-calculator-malaysia/",
    colSpan: 6,
  },

  // TAX CALCULATORS
  {
    id: "epf-calculator",
    name: "EPF Retirement Calculator Malaysia (KWSP)",
    description: "Calculate EPF contributions, project retirement savings, and see Account 1 & 2 breakdown.",
    category: "tax",
    icon: "📊",
    slug: "/tax/epf-retirement-calculator-malaysia/",
    colSpan: 6,
  },
  {
    id: "pcb-calculator",
    name: "Kalkulator PCB Bulanan Malaysia",
    description: "Kira potongan cukai berjadual (PCB) bulanan daripada gaji anda.",
    category: "tax",
    icon: "🧾",
    slug: "/tax/kalkulator-pcb-bulanan-malaysia/",
    colSpan: 6,
  },
  {
    id: "kalkulator-gaji",
    name: "Kalkulator Kira Gaji Bulanan Malaysia",
    description: "Kira gaji bersih selepas potongan EPF, SOCSO, EIS, dan PCB.",
    category: "tax",
    icon: "💵",
    slug: "/tax/kalkulator-kira-gaji-bulanan-malaysia/",
    colSpan: 6,
  },
  {
    id: "monthly-salary",
    name: "Monthly Salary Calculator Malaysia",
    description: "Calculate net salary after EPF, SOCSO, EIS, and PCB deductions. See your take-home pay instantly.",
    category: "tax",
    icon: "💰",
    slug: "/tax/monthly-salary-calculator-malaysia/",
    colSpan: 6,
  },
  {
    id: "sspa-calculator",
    name: "Kalkulator SSPA Malaysia",
    description: "Kira gaji baharu SSPA untuk penjawat awam. Lihat kenaikan Fasa 1 & 2, KGT mengikut gred.",
    category: "tax",
    icon: "🏛️",
    slug: "/tax/sspa-calculator-malaysia/",
    colSpan: 6,
  },

  // INVESTMENT CALCULATORS
  {
    id: "asb-dividend",
    name: "ASB Dividend Calculator",
    description: "Kira dividen ASB anda berdasarkan kadar terkini 5.75%",
    category: "investment",
    icon: "📈",
    slug: "/investment/kalkulator-dividen-asb-malaysia/",
    colSpan: 6,
  },

  // CGPA CALCULATORS
  {
    id: "cgpa-calculator",
    name: "CGPA Calculator UIA",
    description: "Calculate your cumulative grade point average for Malaysian universities. Supports 4.0 and 5.0 grading scales.",
    category: "cgpa",
    icon: "🎓",
    slug: "/cgpa/cgpa-calculator-uia/",
    colSpan: 6,
  },

  // AUTO CALCULATORS
  {
    id: "car-refinance",
    name: "Car Refinance Calculator",
    description: "Calculate how much you can save by refinancing your car loan. Compare rates from banks.",
    category: "auto",
    icon: "🚗",
    slug: "/auto/car-refinance-calculator-malaysia/",
    colSpan: 6,
  },
  {
    id: "kalkulator-refinance-kereta",
    name: "Kalkulator Refinance Kereta Malaysia",
    description: "Kira berapa anda boleh jimat dengan refinance pinjaman kereta",
    category: "auto",
    icon: "🚗",
    slug: "/auto/kalkulator-refinance-kereta-malaysia/",
    colSpan: 6,
  },
];

export const categories = [
  { id: "insurance", label: "Insurance", color: "blue" },
  { id: "loan", label: "Loans", color: "green" },
  { id: "property", label: "Property", color: "purple" },
  { id: "credit-card", label: "Credit Cards", color: "orange" },
  { id: "tax", label: "Tax & Salary", color: "red" },
  { id: "investment", label: "Investment", color: "emerald" },
  { id: "auto", label: "Auto", color: "amber" },
  { id: "cgpa", label: "CGPA", color: "indigo" },
];
