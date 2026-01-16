import Link from "next/link";
import { Calculator, categoryColors } from "@/data/calculators";

interface CalculatorCardProps {
  calculator: Calculator;
  className?: string;
}

export function CalculatorCard({ calculator, className = "" }: CalculatorCardProps) {
  const colors = categoryColors[calculator.category];

  return (
    <Link
      href={calculator.slug}
      className={`group block bg-white rounded-xl border border-slate-200 p-6
                 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200
                 transition-all duration-300 h-full ${className}`}
    >
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.bg} mb-4`}
      >
        <span className="text-2xl">{calculator.icon}</span>
      </div>
      <h3
        className="text-lg font-semibold text-slate-900 mb-2
                     group-hover:text-blue-600 transition-colors line-clamp-2"
      >
        {calculator.name}
      </h3>
      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{calculator.description}</p>
      <div className="flex items-center text-blue-600 text-sm font-medium mt-auto">
        Calculate Now
        <svg
          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

interface FeaturedCalculatorCardProps {
  calculator: Calculator;
}

export function FeaturedCalculatorCard({ calculator }: FeaturedCalculatorCardProps) {
  return (
    <Link
      href={calculator.slug}
      className="group block bg-white rounded-2xl border border-slate-200 p-8 md:p-10
                 shadow-lg hover:shadow-xl hover:-translate-y-1
                 transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex-1">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 mb-4">
            Most Popular
          </span>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50">
              <span className="text-4xl">{calculator.icon}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {calculator.name}
            </h2>
          </div>
          <p className="text-slate-600 text-lg mb-6 max-w-2xl">{calculator.description}</p>

          {calculator.stats && (
            <div className="flex flex-wrap gap-4 mb-6">
              {calculator.stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg"
                >
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-slate-700">{stat}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:w-64">
          <div className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-center font-semibold transition-colors flex items-center justify-center gap-2">
            Calculate Now
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
