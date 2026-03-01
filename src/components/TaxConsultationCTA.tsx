"use client";

import { useState } from "react";

interface TaxConsultationCTAProps {
  lang?: "en" | "ms";
}

const WEBHOOK_URL = "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe";

const SERVICE_OPTIONS = [
  { value: "e-filing", labelEn: "E-filing Assistance", labelMs: "Bantuan e-Filing" },
  { value: "tax-planning", labelEn: "Tax Planning", labelMs: "Perancangan Cukai" },
  { value: "ssm-registration", labelEn: "SSM/Company Registration", labelMs: "Pendaftaran SSM/Syarikat" },
  { value: "bookkeeping", labelEn: "Bookkeeping", labelMs: "Perakaunan" },
  { value: "other", labelEn: "Other", labelMs: "Lain-lain" },
];

const content = {
  en: {
    heading: "Need Tax Help?",
    bullets: [
      "E-filing assistance",
      "Tax consultation & planning",
      "SSM/Company registration",
    ],
    button: "Get Free Consultation",
    formLabels: {
      name: "Name",
      whatsapp: "WhatsApp",
      email: "Email",
      serviceType: "Service Needed",
      submit: "Submit",
      submitting: "Submitting...",
    },
    success: {
      title: "Thank you!",
      message: "We'll contact you within 24 hours.",
    },
    error: "Something went wrong. Please try again.",
  },
  ms: {
    heading: "Perlukan Bantuan Cukai?",
    bullets: [
      "Bantuan e-filing",
      "Perunding cukai & perancangan",
      "Pendaftaran SSM/Syarikat",
    ],
    button: "Dapatkan Konsultasi Percuma",
    formLabels: {
      name: "Nama",
      whatsapp: "WhatsApp",
      email: "Emel",
      serviceType: "Perkhidmatan Diperlukan",
      submit: "Hantar",
      submitting: "Menghantar...",
    },
    success: {
      title: "Terima kasih!",
      message: "Kami akan menghubungi anda dalam 24 jam.",
    },
    error: "Sesuatu tidak kena. Sila cuba lagi.",
  },
};

export default function TaxConsultationCTA({ lang = "en" }: TaxConsultationCTAProps) {
  const t = content[lang];
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    serviceType: "e-filing",
  });

  const openModal = () => {
    setShowModal(true);
    setIsSuccess(false);
    setError("");
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ name: "", whatsapp: "", email: "", serviceType: "e-filing" });
    setIsSuccess(false);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          whatsapp: formData.whatsapp,
          email: formData.email,
          service_type: formData.serviceType,
          calculator_type: "accounting",
          language: lang,
          source_url: typeof window !== "undefined" ? window.location.href : "",
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", whatsapp: "", email: "", serviceType: "e-filing" });
      } else {
        setError(t.error);
      }
    } catch {
      setError(t.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🎯</span>
          <h3 className="text-lg font-bold text-slate-800">{t.heading}</h3>
        </div>
        <ul className="space-y-2 mb-4">
          {t.bullets.map((bullet, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-green-500 font-bold">✓</span>
              {bullet}
            </li>
          ))}
        </ul>
        <button
          onClick={openModal}
          className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold transition-colors"
        >
          {t.button}
        </button>
      </div>

      {/* Lead Capture Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{t.success.title}</h3>
                <p className="text-slate-600">{t.success.message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{t.heading}</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {t.formLabels.name}
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {t.formLabels.whatsapp}
                    </label>
                    <input
                      type="tel"
                      required
                      autoComplete="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="60123456789"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {t.formLabels.email}
                    </label>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {t.formLabels.serviceType}
                    </label>
                    <select
                      required
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {lang === "ms" ? option.labelMs : option.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 rounded-xl text-white font-semibold transition-colors"
                  >
                    {isSubmitting ? t.formLabels.submitting : t.formLabels.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
