import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ürün Arama - TempShop",
  description: "TempShop'ta aradığınız ürünleri kolayca bulun. Gelişmiş filtreleme ve sıralama seçenekleri ile en uygun ürünleri keşfedin.",
  keywords: "ürün arama, e-ticaret arama, filtreleme, sıralama, TempShop",
  robots: "index, follow",
  openGraph: {
    title: "Ürün Arama - TempShop",
    description: "TempShop'ta aradığınız ürünleri kolayca bulun. Gelişmiş filtreleme ve sıralama seçenekleri ile en uygun ürünleri keşfedin.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://tempshop.com/search",
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
