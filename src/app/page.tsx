import { Suspense } from "react";
import { Metadata } from "next";
import { ProductGrid } from "@/components/product-grid";
import { SearchBar } from "@/components/search-bar";
import { CategoryFilter } from "@/components/category-filter";
import { HeroSection } from "@/components/hero-section";
import { CampaignGrid } from "@/components/campaign-grid";
import { CategoryGrid } from "@/components/category-grid";
import { PersonalizedRecommendations } from "@/components/personalized-recommendations";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "TempShop - Türkiye'nin En Güvenilir E-Ticaret Sitesi",
  description: "Modern e-ticaret deneyimi ile en kaliteli ürünleri keşfedin. Elektronik, moda, ev & yaşam, spor ve daha fazlası. Hızlı teslimat, güvenli ödeme ve 7/24 müşteri desteği.",
  keywords: "e-ticaret, online alışveriş, elektronik, moda, ev yaşam, spor, indirim, kampanya, güvenli ödeme, hızlı kargo",
  authors: [{ name: "TempShop" }],
  creator: "TempShop",
  publisher: "TempShop",
  robots: "index, follow",
  openGraph: {
    title: "TempShop - Türkiye'nin En Güvenilir E-Ticaret Sitesi",
    description: "Modern e-ticaret deneyimi ile en kaliteli ürünleri keşfedin. Hızlı teslimat, güvenli ödeme ve kaliteli hizmet.",
    type: "website",
    locale: "tr_TR",
    siteName: "TempShop",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TempShop - E-Ticaret Sitesi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TempShop - Türkiye'nin En Güvenilir E-Ticaret Sitesi",
    description: "Modern e-ticaret deneyimi ile en kaliteli ürünleri keşfedin.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://tempshop.com",
  },
  other: {
    "google-site-verification": "your-google-verification-code",
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData type="website" data={{}} />
      <StructuredData type="organization" data={{}} />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Campaign Section */}
      <div className="container mx-auto px-4 py-8">
        <CampaignGrid />
      </div>

      {/* Category Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Kategoriler</h2>
          <CategoryGrid />
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div className="container mx-auto px-4 py-8">
        <PersonalizedRecommendations />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
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
      </div>
    </>
  );
}
