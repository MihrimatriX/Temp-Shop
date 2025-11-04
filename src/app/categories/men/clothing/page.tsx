import { Metadata } from "next";
import { getCategoryByName, getSubCategoryByName, getProductsByCategoryAndSubCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Erkek Giyim Ürünleri | TempShop",
  description: "Gömlek, pantolon, tişört, mont ve daha fazlası. Erkek giyim modelleri ile stilinizi tamamlayın!",
  keywords: ["erkek giyim", "gömlek", "pantolon", "tişört", "mont", "erkek moda"],
  openGraph: {
    title: "Erkek Giyim | TempShop",
    description: "Gömlek, pantolon, tişört, mont ve daha fazlası. Erkek giyim modelleri ile stilinizi tamamlayın!",
    url: "https://tempshop.com/categories/men/clothing",
    images: ["https://picsum.photos/800/600?random=men-clothing"],
  },
};

export default function MenClothingPage() {
  const category = getCategoryByName("Erkek");
  const subCategory = getSubCategoryByName("Giyim", "Erkek");
  const products = getProductsByCategoryAndSubCategory("Erkek", "Giyim");

  if (!category || !subCategory) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori veya alt kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={`${category.categoryName} - ${subCategory.subCategoryName}`}
        description="Erkek giyim dünyasının en kaliteli ve şık parçaları burada! İş hayatından günlük yaşama, spor aktivitelerinden özel günlere kadar her anınıza uygun gömlekler, pantolonlar, tişörtler, montlar ve dış giyim ürünleri sizi bekliyor. Kumaş kalitesi, modern kesimler ve geniş renk seçenekleriyle tarzınızı en iyi şekilde yansıtın. Gardırobunuzu güncelleyin ve her ortamda dikkat çeken bir şıklığa sahip olun!"
        imageUrl={`https://picsum.photos/800/400?random=men-clothing`}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Erkek Giyim Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
