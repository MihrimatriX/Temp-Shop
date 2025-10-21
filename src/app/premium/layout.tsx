import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Üyelik - TempShop",
  description: "TempShop Premium üyelik avantajları. Özel indirimler, ücretsiz kargo, öncelikli müşteri desteği ve daha fazlası. Premium üye olun, avantajları keşfedin.",
  keywords: "premium üyelik, özel indirimler, ücretsiz kargo, öncelikli destek, TempShop",
  robots: "index, follow",
  openGraph: {
    title: "Premium Üyelik - TempShop",
    description: "TempShop Premium üyelik avantajları. Özel indirimler ve ücretsiz kargo.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://tempshop.com/premium",
  },
};

export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
