import { Metadata } from "next";
import { getCategoryByName, getSubCategoryByName, getProductsByCategoryAndSubCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Kadın Giyim Ürünleri | TempShop",
  description: "En şık kadın giyim ürünleri, elbiseler, pantolonlar, etekler ve daha fazlası. Tarzınızı yansıtan parçaları keşfedin!",
  keywords: ["kadın giyim", "elbise", "pantolon", "etek", "bluz", "kadın moda"],
  openGraph: {
    title: "Kadın Giyim | TempShop",
    description: "En şık kadın giyim ürünleri, elbiseler, pantolonlar, etekler ve daha fazlası. Tarzınızı yansıtan parçaları keşfedin!",
    url: "https://tempshop.com/categories/women/clothing",
    images: ["https://picsum.photos/800/600?random=women-clothing"],
  },
};

export default function WomenClothingPage() {
  const category = getCategoryByName("Kadın");
  const subCategory = getSubCategoryByName("Giyim", "Kadın");
  const products = getProductsByCategoryAndSubCategory("Kadın", "Giyim");

  if (!category || !subCategory) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori veya alt kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={`${category.categoryName} - ${subCategory.subCategoryName}`}
        description="Kadın giyim dünyasının en trend ve şık parçaları burada! Günlük kombinlerinizden özel davetlere kadar her anınıza eşlik edecek elbiseler, bluzlar, pantolonlar, etekler ve dış giyim ürünleri sizi bekliyor. Kumaş kalitesi, modern kesimler ve geniş renk seçenekleriyle tarzınızı en iyi şekilde yansıtın. Gardırobunuzu güncelleyin ve her ortamda dikkat çeken bir şıklığa sahip olun!"
        imageUrl={`https://picsum.photos/800/400?random=women-clothing`}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Kadın Giyim Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
