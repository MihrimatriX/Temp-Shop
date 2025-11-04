import { Metadata } from "next";
import { getCategoryByName, getSubCategoryByName, getProductsByCategoryAndSubCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Kadın Çanta | TempShop",
  description: "El çantası, sırt çantası, bel çantası ve daha fazlası. Kadın çanta modelleri ile stilinizi tamamlayın!",
  keywords: ["kadın çanta", "el çantası", "sırt çantası", "bel çantası", "kadın çanta modelleri"],
  openGraph: {
    title: "Kadın Çanta | TempShop",
    description: "El çantası, sırt çantası, bel çantası ve daha fazlası. Kadın çanta modelleri ile stilinizi tamamlayın!",
    url: "https://tempshop.com/categories/women/bags",
    images: ["https://picsum.photos/800/600?random=women-bags"],
  },
};

export default function WomenBagsPage() {
  const category = getCategoryByName("Kadın");
  const subCategory = getSubCategoryByName("Çanta", "Kadın");
  const products = getProductsByCategoryAndSubCategory("Kadın", "Çanta");

  if (!category || !subCategory) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori veya alt kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={`${category.categoryName} - ${subCategory.subCategoryName}`}
        description="Eşyalarınızı şıklıkla taşıyın! El çantalarından sırt çantalarına, bel çantalarından omuz çantalarına kadar geniş kadın çanta koleksiyonumuzla her anınıza uygun seçenekler bulun. Fonksiyonel bölmeler, kaliteli malzemeler ve modern tasarımlarla eşyalarınızı güvenle taşıyın. Günlük kullanımdan özel günlere kadar her duruma uygun çantalarla stilinizi tamamlayın!"
        imageUrl={`https://picsum.photos/800/400?random=women-bags`}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Kadın Çanta Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
