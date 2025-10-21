import { Suspense } from "react";
import { Metadata } from "next";
import { ProductGrid } from "@/components/product-grid";
import { SearchBar } from "@/components/search-bar";
import { CategoryFilter } from "@/components/category-filter";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const metadata: Metadata = {
  title: "Tüm Ürünler - TempShop",
  description: "TempShop'ta binlerce ürün arasından seçim yapın. Elektronik, moda, ev & yaşam, spor ve daha fazla kategoride en kaliteli ürünler.",
  keywords: "tüm ürünler, elektronik, moda, ev yaşam, spor, TempShop, online alışveriş",
  robots: "index, follow",
  openGraph: {
    title: "Tüm Ürünler - TempShop",
    description: "TempShop'ta binlerce ürün arasından seçim yapın. En kaliteli ürünler, uygun fiyatlar.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://tempshop.com/products",
  },
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tüm Ürünler</h1>
        <p className="text-muted-foreground">
          Geniş ürün yelpazemizden ihtiyacınız olanı bulun
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-1/4">
          <div className="sticky top-4 space-y-6">
            <SearchBar />
            <CategoryFilter />
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:w-3/4">
          <Suspense fallback={<LoadingSpinner />}>
            <ProductGrid />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
