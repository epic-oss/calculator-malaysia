import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Free Online Calculator Malaysia 2026 | Loan, Insurance, Tax Calculators",
  description:
    "Calculate loans, insurance, taxes, and more with our free Malaysian calculators. Instant results for car insurance, housing loans, EPF, PCB, and 30+ tools.",
  keywords: [
    "calculator malaysia",
    "loan calculator",
    "insurance calculator",
    "pcb calculator",
    "epf calculator",
    "ev insurance malaysia",
  ],
  icons: {
    icon: "/logo.webp",
    apple: "/logo.webp",
  },
  verification: {
    google: "pHajTQEkVWLylkbCmtJAgVL_pq6N1Mk_UJpJO8v2J6o",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
