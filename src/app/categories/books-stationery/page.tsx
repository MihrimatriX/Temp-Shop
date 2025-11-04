import { Metadata } from "next";
import { getCategoryByName, getProductsByCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Kitap & Kırtasiye | TempShop",
  description: "Kitaplar, kırtasiye ürünleri, ofis malzemeleri. Bilgi ve yaratıcılığınızı geliştirin!",
  keywords: ["kitap", "kırtasiye", "ofis malzemesi", "kalem", "defter"],
  openGraph: {
    title: "Kitap & Kırtasiye Kategorisi | TempShop",
    description: "Kitaplar, kırtasiye ürünleri, ofis malzemeleri. Bilgi ve yaratıcılığınızı geliştirin!",
    url: "https://tempshop.com/categories/books-stationery",
    images: ["https://picsum.photos/800/600?random=books-stationery"],
  },
};

export default function BooksStationeryPage() {
  const category = getCategoryByName("Kitap & Kırtasiye");
  const products = getProductsByCategory("Kitap & Kırtasiye");

  if (!category) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={category.categoryName}
        description="Bilgi ve yaratıcılığınızı geliştirin! En sevilen kitaplardan pratik kırtasiye ürünlerine, ofis malzemelerinden eğitim materyallerine kadar geniş ürün yelpazemizle öğrenme ve çalışma deneyiminizi zenginleştirin. Kaliteli kağıt ürünleri, renkli kalemler ve fonksiyonel ofis eşyalarıyla yaratıcılığınızı ortaya çıkarın!"
        imageUrl={category.imageUrl || "https://picsum.photos/800/600?random=books-stationery"}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Kitap & Kırtasiye Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
