import { Metadata } from "next";
import { getCategoryByName, getSubCategoryByName, getProductsByCategoryAndSubCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Çanta | TempShop",
  description: "El çantası, sırt çantası, bel çantası ve daha fazlası. Çanta modelleri ile stilinizi tamamlayın!",
  keywords: ["çanta", "el çantası", "sırt çantası", "bel çantası", "çanta modelleri"],
  openGraph: {
    title: "Çanta | TempShop",
    description: "El çantası, sırt çantası, bel çantası ve daha fazlası. Çanta modelleri ile stilinizi tamamlayın!",
    url: "https://tempshop.com/categories/shoes-bags/bags",
    images: ["https://picsum.photos/800/600?random=bags"],
  },
};

export default function BagsPage() {
  const category = getCategoryByName("Ayakkabı & Çanta");
  const subCategory = getSubCategoryByName("Çanta", "Ayakkabı & Çanta");
  const products = getProductsByCategoryAndSubCategory("Ayakkabı & Çanta", "Çanta");

  if (!category || !subCategory) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori veya alt kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={`${category.categoryName} - ${subCategory.subCategoryName}`}
        description="Eşyalarınızı şıklıkla taşıyın! El çantalarından sırt çantalarına, bel çantalarından omuz çantalarına kadar geniş çanta koleksiyonumuzla her anınıza uygun seçenekler bulun. Fonksiyonel bölmeler, kaliteli malzemeler ve modern tasarımlarla eşyalarınızı güvenle taşıyın. Günlük kullanımdan özel günlere kadar her duruma uygun çantalarla stilinizi tamamlayın!"
        imageUrl={`https://picsum.photos/800/400?random=bags`}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Çanta Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
