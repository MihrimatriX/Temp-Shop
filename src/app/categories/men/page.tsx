import { Metadata } from "next";
import { getCategoryByName, getProductsByCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Erkek Giyim, Ayakkabı ve Aksesuar | TempShop",
  description: "Modern erkek giyim ürünleri, kaliteli ayakkabılar ve şık aksesuarlar. Stilinizi tamamlayın!",
  keywords: ["erkek giyim", "erkek ayakkabı", "erkek çanta", "erkek moda", "erkek aksesuar"],
  openGraph: {
    title: "Erkek Kategorisi | TempShop",
    description: "Modern erkek giyim ürünleri, kaliteli ayakkabılar ve şık aksesuarlar. Stilinizi tamamlayın!",
    url: "https://tempshop.com/categories/men",
    images: ["https://picsum.photos/800/600?random=men"],
  },
};

export default function MenPage() {
  const category = getCategoryByName("Erkek");
  const products = getProductsByCategory("Erkek");

  if (!category) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={category.categoryName}
        description="Erkekler için stil ve konforun buluştuğu nokta! İş hayatından günlük yaşama, spor aktivitelerinden özel günlere kadar her anınıza uygun giyim seçenekleri. Klasik gömleklerden modern tişörtlere, şık ayakkabılardan fonksiyonel çantalara kadar geniş ürün yelpazemizle gardırobunuzu güncelleyin. Kalite, stil ve uygun fiyatın bir araya geldiği bu kategoride, kendinizi en iyi şekilde ifade edin!"
        imageUrl={category.imageUrl || "https://picsum.photos/800/600?random=men"}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Erkek Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
