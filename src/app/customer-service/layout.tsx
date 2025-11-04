import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Müşteri Hizmetleri - TempShop",
  description: "TempShop müşteri hizmetleri. Sıkça sorulan sorular, iletişim formu, canlı destek bilgisi ve sipariş takibi. 7/24 müşteri desteği.",
  keywords: "müşteri hizmetleri, destek, iletişim, canlı destek, sipariş takibi, TempShop",
  robots: "index, follow",
  openGraph: {
    title: "Müşteri Hizmetleri - TempShop",
    description: "TempShop müşteri hizmetleri. 7/24 müşteri desteği ve iletişim bilgileri.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://tempshop.com/customer-service",
  },
};

export default function CustomerServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
