"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/calculators";

const GUIDES = [
  { label: "Cash Out Refinance Guide", href: "/guides/cash-out-refinance-malaysia/" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [guidesDropdownOpen, setGuidesDropdownOpen] = useState(false);

  return (
    <>
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
            <Link
              href="/#calculators"
              className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
            >
              All Calculators
            </Link>

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
                    <Link
                      key={cat.id}
                      href={`/?category=${cat.id}#calculators`}
                      onClick={() => setCategoriesDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-left text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Guides Dropdown */}
            <div className="relative">
              <button
                onClick={() => setGuidesDropdownOpen(!guidesDropdownOpen)}
                onBlur={() => setTimeout(() => setGuidesDropdownOpen(false), 150)}
                className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors font-medium"
              >
                Guides
                <svg
                  className={`w-4 h-4 transition-transform ${guidesDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {guidesDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {GUIDES.map((guide) => (
                    <Link
                      key={guide.href}
                      href={guide.href}
                      onClick={() => setGuidesDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-left text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      {guide.label}
                    </Link>
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
                <Link
                  href="/#calculators"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
                >
                  All Calculators
                </Link>

                <div className="mt-4">
                  <p className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Categories
                  </p>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/?category=${cat.id}#calculators`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-left text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-4">
                  <p className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Guides
                  </p>
                  {GUIDES.map((guide) => (
                    <Link
                      key={guide.href}
                      href={guide.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-left text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      {guide.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
