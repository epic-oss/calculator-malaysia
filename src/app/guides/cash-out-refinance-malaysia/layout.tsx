import { Metadata } from "next";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Cash Out Refinance Malaysia ${currentYear} - Complete Guide | Calculator Malaysia`,
  description: `Learn how to cash out from your property in Malaysia. Understand equity, LTV limits, bank requirements, pros & cons. Free cash out calculator included.`,
  keywords: [
    "cash out refinance malaysia",
    "home equity loan malaysia",
    "refinance cash out",
    "property equity withdrawal",
    "cash out mortgage malaysia",
    "home loan cash out",
    "unlock property equity",
    "cash out calculator malaysia",
  ],
  openGraph: {
    title: `Cash Out Refinance Malaysia ${currentYear} - Complete Guide`,
    description: "Learn how to cash out from your property in Malaysia. Understand equity, LTV limits, bank requirements, pros & cons.",
    type: "article",
    locale: "en_MY",
  },
};

export default function CashOutRefinanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
