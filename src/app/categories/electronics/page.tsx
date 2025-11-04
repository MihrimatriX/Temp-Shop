import { Metadata } from "next";
import { getCategoryByName, getProductsByCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Elektronik Ürünler | TempShop",
  description: "Telefon, bilgisayar, tablet ve diğer elektronik ürünler. En yeni teknoloji ürünleri!",
  keywords: ["telefon", "bilgisayar", "tablet", "elektronik", "teknoloji"],
  openGraph: {
    title: "Elektronik Kategorisi | TempShop",
    description: "Telefon, bilgisayar, tablet ve diğer elektronik ürünler. En yeni teknoloji ürünleri!",
    url: "https://tempshop.com/categories/electronics",
    images: ["https://picsum.photos/800/600?random=electronics"],
  },
};

export default function ElectronicsPage() {
  const category = getCategoryByName("Elektronik");
  const products = getProductsByCategory("Elektronik");

  if (!category) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={category.categoryName}
        description="Teknoloji dünyasının en yeni ve en gelişmiş ürünleri burada! Akıllı telefonlardan yüksek performanslı bilgisayarlara, tabletlerden ses sistemlerine kadar geniş elektronik ürün yelpazemizle dijital yaşamınızı kolaylaştırın. En son teknoloji trendlerini takip edin, iş ve eğlence dünyanızı geliştirin. Kaliteli markaların güvenilir ürünleriyle teknoloji ihtiyaçlarınızı karşılayın!"
        imageUrl={category.imageUrl || "https://picsum.photos/800/600?random=electronics"}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Elektronik Ürünler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
