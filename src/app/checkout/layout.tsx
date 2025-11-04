import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ödeme - TempShop",
  description: "Güvenli ödeme ile siparişinizi tamamlayın. Kredi kartı, banka kartı ve kapıda ödeme seçenekleri.",
  robots: "noindex, nofollow", // Ödeme sayfası indexlenmemeli
  openGraph: {
    title: "Ödeme - TempShop",
    description: "Güvenli ödeme ile siparişinizi tamamlayın.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
