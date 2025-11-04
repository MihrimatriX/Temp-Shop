import { Metadata } from "next";
import { getCategoryByName, getProductsByCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Ev & Mobilya Ürünleri | TempShop",
  description: "Mobilya, ev tekstili, mutfak ve dekorasyon ürünleri. Evinizi güzelleştirin!",
  keywords: ["mobilya", "ev tekstili", "mutfak", "dekorasyon", "ev eşyası"],
  openGraph: {
    title: "Ev & Mobilya Kategorisi | TempShop",
    description: "Mobilya, ev tekstili, mutfak ve dekorasyon ürünleri. Evinizi güzelleştirin!",
    url: "https://tempshop.com/categories/home-furniture",
    images: ["https://picsum.photos/800/600?random=home-furniture"],
  },
};

export default function HomeFurniturePage() {
  const category = getCategoryByName("Ev & Mobilya");
  const products = getProductsByCategory("Ev & Mobilya");

  if (!category) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={category.categoryName}
        description="Evinizi bir cennete dönüştürün! Modern mobilyalardan şık ev tekstillerine, pratik mutfak eşyalarından dekoratif aksesuarlara kadar geniş ürün yelpazemizle yaşam alanınızı yenileyin. Konfor, stil ve fonksiyonelliği bir araya getiren ürünlerle evinizi kişiselleştirin. Her oda için özel tasarlanmış çözümlerle yaşam kalitenizi artırın!"
        imageUrl={category.imageUrl || "https://picsum.photos/800/600?random=home-furniture"}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Ev & Mobilya Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
