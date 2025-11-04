import { Metadata } from "next";
import { getCategoryByName, getSubCategoryByName, getProductsByCategoryAndSubCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Kadın Ayakkabı | TempShop",
  description: "Topuklu, babet, sneaker, bot, çizme ve daha fazlası. Kadın ayakkabı modelleri ile stilinizi tamamlayın!",
  keywords: ["kadın ayakkabı", "topuklu", "babet", "sneaker", "bot", "çizme", "kadın ayakkabı modelleri"],
  openGraph: {
    title: "Kadın Ayakkabı | TempShop",
    description: "Topuklu, babet, sneaker, bot, çizme ve daha fazlası. Kadın ayakkabı modelleri ile stilinizi tamamlayın!",
    url: "https://tempshop.com/categories/shoes-bags/women-shoes",
    images: ["https://picsum.photos/800/600?random=women-shoes"],
  },
};

export default function WomenShoesPage() {
  const category = getCategoryByName("Ayakkabı & Çanta");
  const subCategory = getSubCategoryByName("Kadın Ayakkabı", "Ayakkabı & Çanta");
  const products = getProductsByCategoryAndSubCategory("Ayakkabı & Çanta", "Kadın Ayakkabı");

  if (!category || !subCategory) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori veya alt kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={`${category.categoryName} - ${subCategory.subCategoryName}`}
        description="Ayaklarınızı şıklıkla taşıyın! Topuklu ayakkabılardan rahat babetlere, spor sneakerlardan şık botlara kadar geniş kadın ayakkabı koleksiyonumuzla her anınıza uygun seçenekler bulun. Konfor ve şıklığı bir araya getiren, kaliteli malzemelerden üretilmiş ayakkabılarla stilinizi tamamlayın. Günlük kullanımdan özel günlere kadar her duruma uygun modellerle gardırobunuzu zenginleştirin!"
        imageUrl={`https://picsum.photos/800/400?random=women-shoes`}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Kadın Ayakkabı Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
