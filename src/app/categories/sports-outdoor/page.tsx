import { Metadata } from "next";
import { getCategoryByName, getProductsByCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Spor & Outdoor Ürünleri | TempShop",
  description: "Spor giyim, fitness ekipmanları, outdoor ürünleri. Aktif yaşamınızı destekleyin!",
  keywords: ["spor giyim", "fitness", "outdoor", "spor ekipmanı", "kamp"],
  openGraph: {
    title: "Spor & Outdoor Kategorisi | TempShop",
    description: "Spor giyim, fitness ekipmanları, outdoor ürünleri. Aktif yaşamınızı destekleyin!",
    url: "https://tempshop.com/categories/sports-outdoor",
    images: ["https://picsum.photos/800/600?random=sports-outdoor"],
  },
};

export default function SportsOutdoorPage() {
  const category = getCategoryByName("Spor & Outdoor");
  const products = getProductsByCategory("Spor & Outdoor");

  if (!category) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={category.categoryName}
        description="Aktif yaşamınızı destekleyen ürünlerle sağlıklı ve enerjik kalın! Spor giyiminden fitness ekipmanlarına, outdoor aktivitelerinden kamp malzemelerine kadar geniş ürün yelpazemizle spor tutkunuzu yaşayın. Konforlu ve performans odaklı ürünlerle hedeflerinize ulaşın. Doğayla iç içe geçen maceralarınız için gerekli tüm ekipmanları bulun!"
        imageUrl={category.imageUrl || "https://picsum.photos/800/600?random=sports-outdoor"}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Spor & Outdoor Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
