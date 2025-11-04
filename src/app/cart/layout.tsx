import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sepetim - TempShop",
  description: "Sepetinizdeki ürünleri görüntüleyin ve düzenleyin. Güvenli ödeme ile alışverişinizi tamamlayın.",
  robots: "noindex, nofollow", // Sepet sayfası indexlenmemeli
  openGraph: {
    title: "Sepetim - TempShop",
    description: "Sepetinizdeki ürünleri görüntüleyin ve düzenleyin.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
