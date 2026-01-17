export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: "insurance" | "loan" | "property" | "credit-card" | "tax" | "salary" | "cgpa";
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
  cgpa: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
};

export const categoryLabels: Record<string, string> = {
  insurance: "Insurance",
  loan: "Loans",
  property: "Property",
  "credit-card": "Credit Cards",
  tax: "Tax & Salary",
  salary: "Salary",
  cgpa: "CGPA",
};

export const calculators: Calculator[] = [
  // FEATURED
  {
    id: "ev-insurance",
    name: "EV Car Insurance Calculator Malaysia 2026",
    description: "Calculate your electric vehicle insurance premium and road tax in seconds. Compare prices from 15+ insurers.",
    category: "insurance",
    icon: "🚗",
    slug: "/insurance/ev-insurance-calculator-malaysia/",
    featured: true,
    stats: ["28+ EV Models", "Instant Quote", "Free Comparison"],
  },

  // INSURANCE CALCULATORS
  {
    id: "motorcycle-insurance",
    name: "Motorcycle Insurance Calculator",
    description: "Calculate motorcycle insurance premium and road tax. Compare third party vs comprehensive coverage.",
    category: "insurance",
    icon: "🏍️",
    slug: "/insurance/motorcycle-insurance-calculator-malaysia/",
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
    slug: "/insurance/allianz-motorcycle-insurance-calculator/",
    colSpan: 4,
  },
  {
    id: "cheapest-motorcycle",
    name: "Cheapest Motorcycle Insurance",
    description: "Find the cheapest motorcycle insurance in Malaysia",
    category: "insurance",
    icon: "💸",
    slug: "/insurance/cheapest-motorcycle-insurance-calculator/",
    colSpan: 3,
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
    id: "housing-loan-settlement",
    name: "Early Housing Loan Settlement Calculator",
    description: "Find out if settling your housing loan early makes financial sense. Calculate savings, penalties & get recommendations.",
    category: "loan",
    icon: "🏠",
    slug: "/loan/early-housing-loan-settlement-calculator-malaysia/",
    colSpan: 6,
  },
  {
    id: "personal-loan",
    name: "Personal Loan Calculator",
    description: "Calculate monthly payment, total interest, and check DSR eligibility for personal loans.",
    category: "loan",
    icon: "💵",
    slug: "/loan/personal-loan-calculator-malaysia/",
    colSpan: 6,
  },
  {
    id: "joint-home-loan",
    name: "Joint Home Loan Calculator",
    description: "Calculate combined loan eligibility for couples & co-borrowers",
    category: "loan",
    icon: "👫",
    slug: "/loan/joint-home-loan-calculator-malaysia/",
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
  {
    id: "housing-loan",
    name: "Housing Loan Calculator",
    description: "Calculate monthly instalment, total interest, and upfront costs",
    category: "loan",
    icon: "🏡",
    slug: "/loan/housing-loan-calculator-malaysia/",
    colSpan: 6,
  },

  // PROPERTY CALCULATORS
  {
    id: "quit-rent",
    name: "Quit Rent Calculator Malaysia (Cukai Tanah)",
    description: "Calculate quit rent for all states. Check rates, deadlines, and pay online.",
    category: "property",
    icon: "📜",
    slug: "/property/quit-rent-calculator-malaysia/",
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
    slug: "/credit-card/calculator-malaysia/",
    colSpan: 6,
  },

  // TAX CALCULATORS
  {
    id: "epf-calculator",
    name: "EPF Calculator Malaysia (KWSP)",
    description: "Calculate EPF contributions, project retirement savings, and see Account 1 & 2 breakdown.",
    category: "tax",
    icon: "📊",
    slug: "/epf/epf-calculator-malaysia/",
    colSpan: 6,
  },
  {
    id: "pcb-calculator",
    name: "PCB Calculator (Kira Gaji)",
    description: "Calculate monthly tax deduction (PCB/MTD) from salary",
    category: "tax",
    icon: "🧾",
    slug: "/tax/pcb-calculator/",
    colSpan: 4,
  },
  {
    id: "simple-pcb",
    name: "Simple Monthly PCB Calculator",
    description: "Quick and easy PCB calculation for employees",
    category: "tax",
    icon: "✨",
    slug: "/tax/simple-pcb-calculator/",
    colSpan: 4,
  },

  // SALARY CALCULATORS
  {
    id: "monthly-salary",
    name: "Monthly Salary Calculator Malaysia",
    description: "Calculate net salary after EPF, SOCSO, EIS, and PCB deductions. See your take-home pay instantly.",
    category: "salary",
    icon: "💰",
    slug: "/salary/monthly-salary-calculator/",
    colSpan: 6,
  },
  {
    id: "salary-increment",
    name: "Salary Increment Calculator",
    description: "Calculate your new salary after increment or bonus",
    category: "salary",
    icon: "📈",
    slug: "/salary/increment-calculator/",
    colSpan: 3,
  },
  {
    id: "overtime-calculator",
    name: "Overtime Calculator Malaysia",
    description: "Calculate overtime pay based on Malaysian labor law",
    category: "salary",
    icon: "⏰",
    slug: "/salary/overtime-calculator/",
    colSpan: 3,
  },

  // CGPA CALCULATORS
  {
    id: "cgpa-calculator",
    name: "CGPA Calculator Malaysia",
    description: "Calculate your cumulative grade point average for Malaysian universities. Supports 4.0 and 5.0 grading scales.",
    category: "cgpa",
    icon: "🎓",
    slug: "/education/cgpa-calculator-malaysia/",
    colSpan: 6,
  },
  {
    id: "gpa-calculator",
    name: "GPA Calculator",
    description: "Calculate semester GPA for Malaysian universities",
    category: "cgpa",
    icon: "📚",
    slug: "/cgpa/gpa-calculator/",
    colSpan: 4,
  },
  {
    id: "pointer-calculator",
    name: "Pointer Calculator",
    description: "Convert grades to pointer for UiTM, UKM, UM, USM",
    category: "cgpa",
    icon: "🎯",
    slug: "/cgpa/pointer-calculator/",
    colSpan: 4,
  },
];

export const categories = [
  { id: "insurance", label: "Insurance", color: "blue" },
  { id: "loan", label: "Loans", color: "green" },
  { id: "property", label: "Property", color: "purple" },
  { id: "credit-card", label: "Credit Cards", color: "orange" },
  { id: "tax", label: "Tax & Salary", color: "red" },
  { id: "cgpa", label: "CGPA", color: "indigo" },
];
