import { Metadata } from "next";
import { ProductGrid } from "@/components/product-grid";
import { CategoryFilter } from "@/components/category-filter";
import { Breadcrumb } from "@/components/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generateExtendedProducts } from "@/data/mock-data-extended";
import {
  Utensils,
  Droplets,
  Sparkles,
  Apple,
  Coffee,
  Leaf,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Süpermarket - TempShop",
  description:
    "Gıda, içecek, temizlik ve kişisel bakım ürünleri. Taze ürünler, uygun fiyatlar ve hızlı teslimat. Evinizin ihtiyaçlarını karşılayın!",
  keywords:
    "süpermarket, gıda, içecek, temizlik, market, ev ihtiyaçları, taze ürünler",
  robots: "index, follow",
  openGraph: {
    title: "Süpermarket - TempShop",
    description:
      "Evinizin ihtiyaçlarını karşılayın! Taze ürünler, uygun fiyatlar.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://tempshop.com/categories/supermarket",
  },
};

export default function SupermarketPage() {
  // Mock data'dan süpermarket kategorisine ait ürünleri çek
  const allProducts = generateExtendedProducts();
  const supermarketProducts = allProducts.filter(
    (product) =>
      product.category?.categoryName?.toLowerCase().includes("süpermarket") ||
      product.category?.categoryName?.toLowerCase().includes("gıda") ||
      product.productName.toLowerCase().includes("gıda") ||
      product.productName.toLowerCase().includes("içecek") ||
      product.productName.toLowerCase().includes("temizlik"),
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Kategoriler", href: "/categories" },
            { label: "Süpermarket", href: "/categories/supermarket" },
          ]}
        />

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Utensils className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold mb-2">Süpermarket</h1>
              <p className="text-xl opacity-90">
                Evinizin ihtiyaçlarını karşılayın!
              </p>
            </div>
          </div>
        </div>

        {/* Category Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Apple className="w-6 h-6 text-green-500" />
                <CardTitle className="text-lg">Gıda & Taze Ürünler</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Taze meyve-sebze, et-tavuk, süt ürünleri ve günlük gıda
                ihtiyaçları. Sağlıklı ve taze ürünlerle beslenmenizi
                destekleyin!
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Droplets className="w-6 h-6 text-blue-500" />
                <CardTitle className="text-lg">İçecekler</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Su, meyve suları, gazlı içecekler, çay, kahve ve enerji
                içecekleri. Susuzluğunuzu giderin, enerjinizi artırın!
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-500" />
                <CardTitle className="text-lg">Temizlik & Bakım</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Çamaşır deterjanı, bulaşık deterjanı, temizlik ürünleri ve
                kişisel bakım ürünleri. Temizlik ve hijyen için gerekli her şey!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Fun Content Section */}
        <Card className="mb-8 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-700">
              🛒 Süpermarket Alışveriş Rehberi
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-orange-600">
                  🥗 Sağlıklı Beslenme
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Taze meyve ve sebzeleri mevsiminde tüketin</li>
                  <li>• Etiket okuma alışkanlığı edinin</li>
                  <li>• Organik ürünleri tercih edin</li>
                  <li>• Su tüketimini artırın</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-orange-600">
                  💰 Tasarruf İpuçları
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Alışveriş listesi yapın</li>
                  <li>• Kampanyaları takip edin</li>
                  <li>• Büyük paketleri tercih edin</li>
                  <li>• Son kullanma tarihlerini kontrol edin</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CategoryFilter categoryId={6} />
          </div>
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Süpermarket Ürünleri</h2>
              <p className="text-muted-foreground">
                {supermarketProducts.length} ürün bulundu
              </p>
            </div>
            <ProductGrid products={supermarketProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
