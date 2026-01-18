"use client";

const BJAK_AFFILIATE_URL = "https://bjak.my/en/motorcycle-insurance?p=OOI-YING-JYE-AT9T1T";

interface MotorcycleInsuranceCTAProps {
  lang?: "en" | "ms";
}

const content = {
  en: {
    heading: "Renew with Bjak",
    bullets: [
      "Compare 15+ insurers instantly",
      "Pay in 3, 6, or 12 monthly instalments",
      "FREE VIP package (24/7 roadside assistance)",
    ],
    button: "Get Free Quote",
    paymentLabel: "Accepted payments:",
  },
  ms: {
    heading: "Renew dengan Bjak",
    bullets: [
      "Bandingkan 15+ syarikat insurans",
      "Bayar ansuran 3, 6, atau 12 bulan",
      "PERCUMA pakej VIP (bantuan jalan raya 24/7)",
    ],
    button: "Dapatkan Sebut Harga",
    paymentLabel: "Bayaran diterima:",
  },
};

// Bjak logo as inline SVG
function BjakLogo() {
  return (
    <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="16" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#1E40AF">
        bjak
      </text>
    </svg>
  );
}

export default function MotorcycleInsuranceCTA({ lang = "en" }: MotorcycleInsuranceCTAProps) {
  const t = content[lang];

  return (
    <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="flex items-center gap-2 mb-3">
        <BjakLogo />
        <h3 className="text-lg font-bold text-slate-800">{t.heading}</h3>
      </div>
      <ul className="space-y-2 mb-4">
        {t.bullets.map((bullet, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
            <span className="text-blue-600 font-bold">✓</span>
            {bullet}
          </li>
        ))}
      </ul>
      <a
        href={BJAK_AFFILIATE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3 bg-blue-700 hover:bg-blue-800 rounded-xl text-white font-semibold transition-colors flex items-center justify-center gap-2"
      >
        {t.button}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
      <div className="mt-4 pt-3 border-t border-slate-100">
        <p className="text-xs text-slate-500 mb-2">{t.paymentLabel}</p>
        <img
          src="/images/payment-logos/bnpl-providers.avif"
          alt="Atome, GrabPay, ShopeePay, TNG eWallet, FPX"
          className="h-6 object-contain"
        />
      </div>
    </div>
  );
}
