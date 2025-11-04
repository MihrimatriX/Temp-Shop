import { Metadata } from "next";
import { getCategoryByName, getSubCategoryByName, getProductsByCategoryAndSubCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Erkek Ayakkabı | TempShop",
  description: "Sneaker, klasik, bot, spor ve daha fazlası. Erkek ayakkabı modelleri ile stilinizi tamamlayın!",
  keywords: ["erkek ayakkabı", "sneaker", "klasik", "bot", "spor", "erkek ayakkabı modelleri"],
  openGraph: {
    title: "Erkek Ayakkabı | TempShop",
    description: "Sneaker, klasik, bot, spor ve daha fazlası. Erkek ayakkabı modelleri ile stilinizi tamamlayın!",
    url: "https://tempshop.com/categories/men/shoes",
    images: ["https://picsum.photos/800/600?random=men-shoes"],
  },
};

export default function MenShoesPage() {
  const category = getCategoryByName("Erkek");
  const subCategory = getSubCategoryByName("Ayakkabı", "Erkek");
  const products = getProductsByCategoryAndSubCategory("Erkek", "Ayakkabı");

  if (!category || !subCategory) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori veya alt kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={`${category.categoryName} - ${subCategory.subCategoryName}`}
        description="Ayaklarınızı konfor ve şıklıkla taşıyın! Spor sneakerlardan klasik ayakkabılara, şık botlardan rahat spor ayakkabılara kadar geniş erkek ayakkabı koleksiyonumuzla her anınıza uygun seçenekler bulun. Kaliteli malzemelerden üretilmiş, dayanıklı ve şık ayakkabılarla stilinizi tamamlayın. Günlük kullanımdan özel günlere kadar her duruma uygun modellerle gardırobunuzu zenginleştirin!"
        imageUrl={`https://picsum.photos/800/400?random=men-shoes`}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Erkek Ayakkabı Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
