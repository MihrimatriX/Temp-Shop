import { Metadata } from "next";
import { getCategoryByName, getProductsByCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Kozmetik & Kişisel Bakım | TempShop",
  description: "Makyaj, cilt bakımı, saç bakımı ve parfüm ürünleri. Güzelliğinizi öne çıkarın!",
  keywords: ["makyaj", "cilt bakımı", "saç bakımı", "parfüm", "kozmetik"],
  openGraph: {
    title: "Kozmetik Kategorisi | TempShop",
    description: "Makyaj, cilt bakımı, saç bakımı ve parfüm ürünleri. Güzelliğinizi öne çıkarın!",
    url: "https://tempshop.com/categories/cosmetics",
    images: ["https://picsum.photos/800/600?random=cosmetics"],
  },
};

export default function CosmeticsPage() {
  const category = getCategoryByName("Kozmetik & Kişisel Bakım");
  const products = getProductsByCategory("Kozmetik & Kişisel Bakım");

  if (!category) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={category.categoryName}
        description="Güzelliğinizi keşfedin ve öne çıkarın! Profesyonel makyaj ürünlerinden doğal cilt bakımına, saç bakımından etkileyici parfümlere kadar geniş kozmetik ürün yelpazemizle kendinizi en güzel halinizle ifade edin. Kaliteli markaların güvenilir ürünleriyle günlük bakım rutininizi oluşturun ve özel günlerde göz alıcı görünün!"
        imageUrl={category.imageUrl || "https://picsum.photos/800/600?random=cosmetics"}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Kozmetik Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
