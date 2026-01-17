"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { calculators, categories } from "@/data/calculators";
import { CalculatorCard, FeaturedCalculatorCard } from "@/components/CalculatorCard";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const featuredCalculator = calculators.find((c) => c.featured);
  const regularCalculators = calculators.filter((c) => !c.featured);

  const filteredCalculators = useMemo(() => {
    return regularCalculators.filter((calc) => {
      const matchesSearch =
        searchQuery === "" ||
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === null || calc.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [regularCalculators, searchQuery, selectedCategory]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCategoriesDropdownOpen(false);
    setMobileMenuOpen(false);
    // Scroll to calculators section
    document.getElementById("calculators")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Image
              src="/logo.webp"
              alt="Calculator Malaysia"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="font-bold text-xl"><span className="text-blue-800">Calculator</span> <span className="text-red-600">Malaysia</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#calculators"
              className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
            >
              All Calculators
            </a>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                onBlur={() => setTimeout(() => setCategoriesDropdownOpen(false), 150)}
                className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors font-medium"
              >
                Categories
                <svg
                  className={`w-4 h-4 transition-transform ${categoriesDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {categoriesDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="w-full px-4 py-2 text-left text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/20 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed top-16 right-0 bottom-0 w-72 bg-white shadow-xl md:hidden animate-in slide-in-from-right duration-300">
              <div className="p-4">
                <a
                  href="#calculators"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
                >
                  All Calculators
                </a>

                <div className="mt-4">
                  <p className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Categories
                  </p>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="w-full px-4 py-3 text-left text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Free Online Calculators
            <span className="block text-blue-600">for Malaysians</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Fast, accurate, and easy-to-use calculators. Calculate loans, insurance, tax, and more
            - all 100% free.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search calculators... (e.g., 'EV insurance', 'housing loan')"
                className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl border border-slate-200
                         bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              50,000+ calculations this month
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              100% Free
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              No Registration
            </span>
          </div>
        </div>
      </section>

      {/* Featured Calculator */}
      {featuredCalculator && !searchQuery && !selectedCategory && (
        <section className="px-4 pb-12">
          <div className="max-w-7xl mx-auto">
            <FeaturedCalculatorCard calculator={featuredCalculator} />
          </div>
        </section>
      )}

      {/* Category Navigation */}
      <section id="categories" className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${
                  selectedCategory === null
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${
                    selectedCategory === cat.id
                      ? `bg-${cat.color}-600 text-white`
                      : `bg-${cat.color}-50 text-${cat.color}-600 hover:bg-${cat.color}-100`
                  }`}
                style={
                  selectedCategory === cat.id
                    ? {
                        backgroundColor:
                          cat.color === "blue"
                            ? "#2563eb"
                            : cat.color === "green"
                              ? "#16a34a"
                              : cat.color === "purple"
                                ? "#9333ea"
                                : cat.color === "orange"
                                  ? "#ea580c"
                                  : cat.color === "red"
                                    ? "#dc2626"
                                    : "#4f46e5",
                        color: "white",
                      }
                    : {}
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section id="calculators" className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {filteredCalculators.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No calculators found</h3>
              <p className="text-slate-500 mb-4">
                Try a different search term or browse all categories
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Show All Calculators
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
              {filteredCalculators.map((calculator, index) => {
                // Determine column span based on calculator config or pattern
                let colSpanClass = "lg:col-span-4";
                if (calculator.colSpan === 6) colSpanClass = "lg:col-span-6";
                else if (calculator.colSpan === 3) colSpanClass = "lg:col-span-3";
                else if (calculator.colSpan === 4) colSpanClass = "lg:col-span-4";
                else {
                  // Default pattern: alternate sizes for visual interest
                  const pattern = index % 6;
                  if (pattern === 0 || pattern === 1 || pattern === 2) {
                    colSpanClass = "lg:col-span-4";
                  } else if (pattern === 3) {
                    colSpanClass = "lg:col-span-6";
                  } else {
                    colSpanClass = "lg:col-span-3";
                  }
                }

                return (
                  <div key={calculator.id} className={`${colSpanClass}`}>
                    <CalculatorCard calculator={calculator} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-16">
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
              <a href="/about" className="hover:text-white transition-colors">
                About
              </a>
              <a href="/contact" className="hover:text-white transition-colors">
                Contact
              </a>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms
              </a>
            </nav>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
            © 2026 Calculator Malaysia. All calculators are free to use.
          </div>
        </div>
      </footer>
    </div>
  );
}
