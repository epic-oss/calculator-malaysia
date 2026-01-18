# Calculator Build Standards

This document defines the standards for building calculator pages on Calculator Malaysia.

## Content Standards

### Dynamic Year
- **NEVER hardcode years** like 2025, 2026, etc.
- Use `new Date().getFullYear()` for dynamic year display
- Title format: `[Calculator Name] Malaysia {currentYear}`
- All rate references should use dynamic year

```tsx
// CORRECT
const currentYear = new Date().getFullYear();
<h1>PCB Calculator Malaysia {currentYear}</h1>
<p>Updated for {currentYear} tax rates</p>

// WRONG
<h1>PCB Calculator Malaysia 2026</h1>
<p>Updated for 2026 tax rates</p>
```

### SEO Metadata
- Title: Include dynamic year in metadata
- Description: 150-160 characters, include main keywords
- Keywords: 5-10 relevant terms

```tsx
export const metadata: Metadata = {
  title: `PCB Calculator Malaysia ${new Date().getFullYear()} | Monthly Tax Deduction`,
  description: "Calculate your monthly PCB tax deduction instantly...",
};
```

---

## CTA Standards

### Default: Lead Capture Form
Most calculators use lead capture with webhook to Make.com.

**Required fields:**
- Name (text)
- WhatsApp number (tel)
- Email (email)

**Webhook URL:** `https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe`

**Payload format:**
```json
{
  "name": "User Name",
  "whatsapp": "0123456789",
  "email": "user@email.com",
  "calculator_type": "pcb_calculator",
  // ... calculator-specific fields
}
```

### Motorcycle Insurance: Bjak Affiliate
Motorcycle insurance pages use direct Bjak affiliate link instead of lead capture.

**Affiliate URL:** `https://bjak.my/en/motorcycle-insurance?p=OOI-YING-JYE-AT9T1T`

### CTA Card Design
```tsx
<div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
  <div className="flex items-center gap-2 mb-3">
    <span className="text-2xl">🎯</span>
    <h3 className="text-lg font-bold text-slate-800">Get Free Quote</h3>
  </div>
  <ul className="space-y-2 mb-4">
    <li className="flex items-center gap-2 text-sm text-slate-600">
      <span className="text-green-500 font-bold">✓</span>
      Compare prices from 15+ insurers
    </li>
    {/* ... more benefits */}
  </ul>
  <button className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold">
    Get Free Quote
  </button>
</div>
```

---

## URL Standards

### Match WordPress URLs
When rebuilding from WordPress, match the exact URL structure:
- Old: `/insurance/ev-car-insurance-calculator-malaysia/`
- New: `/insurance/ev-car-insurance-calculator-malaysia/`

### URL Format
- Lowercase only
- Hyphens for spaces (no underscores)
- Descriptive, keyword-rich slugs
- Include "malaysia" for SEO
- Include "calculator" where appropriate

### Malay Pages
Use Malay URL slugs for Malay content:
- `/tax/kalkulator-pcb-bulanan-malaysia/`
- `/tax/kalkulator-kira-gaji-bulanan-malaysia/`
- `/insurance/kalkulator-insurans-motor-malaysia/`

---

## Code Standards

### File Structure
```
src/
├── app/
│   └── [category]/
│       └── [calculator-slug]/
│           └── page.tsx          # Page with metadata + SEO content
├── components/
│   └── [CalculatorName].tsx      # Calculator component
└── data/
    └── calculators.ts            # Calculator registry
```

### Component Pattern
```tsx
"use client";

import { useState, useMemo } from "react";

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

export default function CalculatorName() {
  const currentYear = new Date().getFullYear();

  // State
  const [inputs, setInputs] = useState({...});
  const [showModal, setShowModal] = useState(false);

  // Calculations
  const calculation = useMemo(() => {
    // ... calculation logic
  }, [inputs]);

  // Lead capture
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...}),
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      {/* Calculator UI */}
    </div>
  );
}
```

### Styling
- Use Tailwind CSS (no external UI libraries)
- Follow existing calculator patterns
- Mobile-first responsive design
- Consistent color scheme:
  - Primary: `blue-600`
  - Success: `green-600`
  - Warning: `amber-500`
  - Error: `red-600`
  - Background: `slate-50`
  - Cards: `white` with `border-slate-200`

### Calculator Registry
Add new calculators to `/src/data/calculators.ts`:

```tsx
{
  id: "pcb-calculator",
  name: "Kalkulator PCB Bulanan Malaysia",
  description: "Kira potongan cukai bulanan (PCB) daripada gaji anda",
  category: "tax",
  icon: "🧾",
  slug: "/tax/kalkulator-pcb-bulanan-malaysia/",
  colSpan: 6,
},
```

---

## Page Structure

### Calculator Page Template
```tsx
import CalculatorComponent from "@/components/CalculatorComponent";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: `Calculator Name Malaysia ${new Date().getFullYear()}`,
  description: "...",
};

export default function CalculatorPage() {
  return (
    <div>
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link href="/" className="...">Back to All Calculators</Link>
        </div>
      </div>

      {/* Calculator */}
      <CalculatorComponent />

      {/* SEO Content */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate max-w-none">
            {/* H2 sections with educational content */}
          </article>
        </div>
      </section>
    </div>
  );
}
```

---

## Checklist for New Calculators

- [ ] Dynamic year in all content
- [ ] SEO metadata with keywords
- [ ] Mobile responsive design
- [ ] Lead capture or affiliate CTA
- [ ] Added to calculators.ts
- [ ] URL matches WordPress (if rebuilding)
- [ ] Educational SEO content sections
- [ ] Tested calculations accuracy
- [ ] No unused variables (ESLint)
