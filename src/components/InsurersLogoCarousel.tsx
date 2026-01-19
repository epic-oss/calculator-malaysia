"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface InsurersLogoCarouselProps {
  lang?: "en" | "ms";
}

// Insurance companies with their logo paths (use null for text fallback)
const INSURERS = [
  { name: "Allianz", logo: "/insurer/Allian.png" },
  { name: "Etiqa", logo: "/insurer/etiqa.png" },
  { name: "Zurich", logo: "/insurer/zurich.png" },
  { name: "Zurich Takaful", logo: "/insurer/Zurich Takaful.png" },
  { name: "Tokio Marine", logo: null },
  { name: "AXA", logo: "/insurer/Axa.png" },
  { name: "Tune Protect", logo: "/insurer/Tune Protect.png" },
  { name: "RHB Insurance", logo: "/insurer/RHB Insurance.jpeg" },
  { name: "Pacific & Orient", logo: "/insurer/pacific.png" },
  { name: "Chubb", logo: "/insurer/chubb.png" },
  { name: "Takaful Malaysia", logo: "/insurer/Takaful Malaysia.png" },
  { name: "Takaful Ikhlas", logo: "/insurer/Takaful Ikhlas.jpeg" },
  { name: "Lonpac", logo: "/insurer/lonpac.png" },
  { name: "Berjaya Sompo", logo: null },
  { name: "MSIG", logo: "/insurer/msig.png" },
  { name: "AmGeneral", logo: "/insurer/kurnia.png" },
  { name: "Liberty", logo: "/insurer/Liberty.png" },
];

export default function InsurersLogoCarousel({ lang = "en" }: InsurersLogoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const heading = lang === "ms"
    ? "Bandingkan Harga Dari 15+ Syarikat Insurans"
    : "Compare Prices From 15+ Insurers";

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed;

        // Reset scroll position when we've scrolled through the first set
        const halfWidth = scrollContainer.scrollWidth / 2;
        if (scrollPosition >= halfWidth) {
          scrollPosition = 0;
        }

        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  // Duplicate the insurers array for seamless infinite scroll
  const duplicatedInsurers = [...INSURERS, ...INSURERS];

  return (
    <div className="py-8">
      <h3 className="text-center text-sm font-medium text-slate-500 mb-6">
        {heading}
      </h3>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-hidden whitespace-nowrap"
          style={{ scrollBehavior: "auto" }}
        >
          {duplicatedInsurers.map((insurer, index) => (
            <div
              key={`${insurer.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-12 px-4"
            >
              {insurer.logo ? (
                <Image
                  src={insurer.logo}
                  alt={insurer.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                  style={{ maxWidth: "120px" }}
                />
              ) : (
                <span className="text-sm font-medium text-slate-400 bg-slate-100 px-4 py-2 rounded-lg">
                  {insurer.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
