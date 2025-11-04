import { Metadata } from "next";
import { getCategoryByName, getSubCategoryByName, getProductsByCategoryAndSubCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Mobilya Ürünleri | TempShop",
  description: "Yatak odası, oturma odası, yemek odası, çalışma odası mobilyaları. Evinizi güzelleştirin!",
  keywords: ["mobilya", "yatak odası", "oturma odası", "yemek odası", "çalışma odası", "kanepe", "yatak"],
  openGraph: {
    title: "Mobilya | TempShop",
    description: "Yatak odası, oturma odası, yemek odası, çalışma odası mobilyaları. Evinizi güzelleştirin!",
    url: "https://tempshop.com/categories/home-furniture/furniture",
    images: ["https://picsum.photos/800/600?random=furniture"],
  },
};

export default function FurniturePage() {
  const category = getCategoryByName("Ev & Mobilya");
  const subCategory = getSubCategoryByName("Mobilya", "Ev & Mobilya");
  const products = getProductsByCategoryAndSubCategory("Ev & Mobilya", "Mobilya");

  if (!category || !subCategory) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori veya alt kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={`${category.categoryName} - ${subCategory.subCategoryName}`}
        description="Evinizi modern ve şık mobilyalarla donatın! Yatak odasından oturma odasına, yemek odasından çalışma odasına kadar her alan için özel tasarlanmış mobilya seçenekleri. Konfor, stil ve fonksiyonelliği bir araya getiren ürünlerle yaşam alanınızı yenileyin. Kaliteli malzemelerden üretilmiş, dayanıklı ve estetik mobilyalarla evinizi kişiselleştirin!"
        imageUrl={`https://picsum.photos/800/400?random=furniture`}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Mobilya Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
