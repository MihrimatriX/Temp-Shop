import { Metadata } from "next";
import { CategoryGrid } from "@/components/category-grid";
import { HeroSection } from "@/components/hero-section";

export const metadata: Metadata = {
  title: "Kategoriler - TempShop",
  description: "TempShop'ta tüm ürün kategorilerini keşfedin. Elektronik, moda, ev & yaşam, spor, anne & bebek ve daha fazlası. Her kategoride en kaliteli ürünler.",
  keywords: "kategoriler, elektronik, moda, ev yaşam, spor, anne bebek, kozmetik, TempShop",
  robots: "index, follow",
  openGraph: {
    title: "Kategoriler - TempShop",
    description: "TempShop'ta tüm ürün kategorilerini keşfedin. Her kategoride en kaliteli ürünler.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://tempshop.com/categories",
  },
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      <HeroSection
        title="Kategoriler"
        subtitle="İhtiyacınız olan ürünleri kategorilere göre keşfedin"
        showSearch={true}
      />
      <div className="container mx-auto px-4 py-8">
        <CategoryGrid />
      </div>
    </div>
  );
}
