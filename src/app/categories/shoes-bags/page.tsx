import { Metadata } from "next";
import { getCategoryByName, getProductsByCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Ayakkabı & Çanta | TempShop",
  description: "Kadın ve erkek ayakkabı, çanta, bavul ve aksesuar ürünleri. Stilinizi tamamlayın!",
  keywords: ["ayakkabı", "çanta", "bavul", "aksesuar", "kadın ayakkabı", "erkek ayakkabı"],
  openGraph: {
    title: "Ayakkabı & Çanta Kategorisi | TempShop",
    description: "Kadın ve erkek ayakkabı, çanta, bavul ve aksesuar ürünleri. Stilinizi tamamlayın!",
    url: "https://tempshop.com/categories/shoes-bags",
    images: ["https://picsum.photos/800/600?random=shoes-bags"],
  },
};

export default function ShoesBagsPage() {
  const category = getCategoryByName("Ayakkabı & Çanta");
  const products = getProductsByCategory("Ayakkabı & Çanta");

  if (!category) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={category.categoryName}
        description="Ayaklarınızı ve eşyalarınızı şıklıkla taşıyın! Kadın ve erkek ayakkabılarından şık çantalara, seyahat bavullarından günlük aksesuarlara kadar geniş ürün yelpazemizle stilinizi tamamlayın. Konfor ve şıklığı bir araya getiren ürünlerle her anınızda kendinizi en iyi hissettirin. Kaliteli malzemelerden üretilmiş, dayanıklı ve şık seçeneklerle gardırobunuzu zenginleştirin!"
        imageUrl={category.imageUrl || "https://picsum.photos/800/600?random=shoes-bags"}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Ayakkabı & Çanta Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
