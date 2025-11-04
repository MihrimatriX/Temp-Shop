import { Metadata } from "next";
import { getCategoryByName, getProductsByCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Anne & Çocuk Ürünleri | TempShop",
  description: "Bebek ve çocuk giyim, oyuncak, bakım ürünleri ve anne ihtiyaçları. Güvenli ve kaliteli ürünler!",
  keywords: ["bebek giyim", "çocuk giyim", "bebek bakım", "anne ihtiyaçları", "oyuncak"],
  openGraph: {
    title: "Anne & Çocuk Kategorisi | TempShop",
    description: "Bebek ve çocuk giyim, oyuncak, bakım ürünleri ve anne ihtiyaçları. Güvenli ve kaliteli ürünler!",
    url: "https://tempshop.com/categories/baby-kids",
    images: ["https://picsum.photos/800/600?random=baby-kids"],
  },
};

export default function BabyKidsPage() {
  const category = getCategoryByName("Anne & Çocuk");
  const products = getProductsByCategory("Anne & Çocuk");

  if (!category) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={category.categoryName}
        description="Çocuklarınızın sağlığı ve mutluluğu için en kaliteli ürünler! Bebek giyiminden çocuk oyuncaklarına, bakım ürünlerinden anne ihtiyaçlarına kadar geniş ürün yelpazemizle ailenizin ihtiyaçlarını karşılayın. Güvenli, sağlıklı ve eğlenceli ürünlerle çocuklarınızın gelişimini destekleyin. Her yaş grubuna uygun, renkli ve eğlenceli seçeneklerle çocuklarınızın dünyasını renklendirin!"
        imageUrl={category.imageUrl || "https://picsum.photos/800/600?random=baby-kids"}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Anne & Çocuk Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
