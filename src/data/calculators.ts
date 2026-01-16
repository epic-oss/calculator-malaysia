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
    description: "Calculate motorcycle insurance premium based on CC and coverage type",
    category: "insurance",
    icon: "🏍️",
    slug: "/insurance/motorcycle-insurance-calculator/",
    colSpan: 4,
  },
  {
    id: "car-insurance",
    name: "Car Insurance Calculator",
    description: "Estimate your car insurance premium with NCD discount",
    category: "insurance",
    icon: "🚙",
    slug: "/insurance/car-insurance-calculator/",
    colSpan: 4,
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
    name: "Car Loan Settlement Calculator",
    description: "Calculate your car loan early settlement amount and savings",
    category: "loan",
    icon: "🚗",
    slug: "/loan/car-loan-settlement-calculator/",
    colSpan: 4,
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
    description: "Calculate personal loan eligibility based on salary",
    category: "loan",
    icon: "💵",
    slug: "/loan/personal-loan-calculator/",
    colSpan: 3,
  },
  {
    id: "joint-home-loan",
    name: "Joint Home Loan Eligibility",
    description: "Calculate combined loan eligibility for couples",
    category: "loan",
    icon: "👫",
    slug: "/loan/joint-home-loan-eligibility-calculator/",
    colSpan: 4,
  },
  {
    id: "home-loan-eligibility",
    name: "Home Loan Eligibility Calculator",
    description: "Check how much housing loan you qualify for",
    category: "loan",
    icon: "🏦",
    slug: "/loan/home-loan-eligibility-calculator/",
    colSpan: 4,
  },
  {
    id: "housing-loan",
    name: "Housing Loan Calculator",
    description: "Calculate monthly installment for your dream home",
    category: "loan",
    icon: "🏡",
    slug: "/loan/housing-loan-calculator/",
    colSpan: 4,
  },

  // PROPERTY CALCULATORS
  {
    id: "quit-rent-selangor",
    name: "Quit Rent Calculator Selangor",
    description: "Calculate Cukai Tanah (quit rent) for Selangor properties",
    category: "property",
    icon: "📜",
    slug: "/property/quit-rent-calculator-selangor/",
    colSpan: 4,
  },

  // CREDIT CARD CALCULATORS
  {
    id: "credit-card-minimum",
    name: "Credit Card Minimum Payment",
    description: "See how long it takes to pay off with minimum payments",
    category: "credit-card",
    icon: "💳",
    slug: "/credit-card/minimum-payment-calculator/",
    colSpan: 3,
  },
  {
    id: "credit-card-interest",
    name: "Credit Card Interest Calculator",
    description: "Calculate interest charges on your credit card balance",
    category: "credit-card",
    icon: "📈",
    slug: "/credit-card/interest-calculator/",
    colSpan: 3,
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
    id: "epf-statement",
    name: "EPF Statement Calculator",
    description: "Calculate EPF contributions and project retirement savings",
    category: "tax",
    icon: "📊",
    slug: "/tax/epf-statement-calculator/",
    colSpan: 3,
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
    description: "Calculate net salary after EPF, SOCSO, and PCB deductions",
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
    description: "Calculate your cumulative grade point average",
    category: "cgpa",
    icon: "🎓",
    slug: "/cgpa/cgpa-calculator/",
    colSpan: 4,
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
